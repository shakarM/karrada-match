/**
 * THE MATCHER
 * Takes the quiz answers + the product list and returns one product or a combo.
 *
 * How a product is chosen:
 *  1. It must be visible, in stock, and have the person's goal ticked in Admin → Products.
 *  2. Safety: caffeine / men-only / experienced-only products are hidden when they don't fit.
 *  3. Score = goal match (10) + how well the product type fits the goal (below) + 3 if featured.
 *  4. The best one is always picked. Others join only if they score at least 72% of it,
 *     are a different type, and fit the budget → otherwise the answer is ONE product.
 */

/** How well each product type serves each goal (higher = better). */
const FIT = {
  gain: { gainer: 9, carb: 6, protein: 5, creatine: 4 },
  lose: { appetite: 8, fatburner: 7, protein: 5, amino: 3 },
  muscle: { protein: 9, creatine: 8, amino: 3, gainer: 2, booster: 2 },
  energy: { preworkout: 9, carb: 5, creatine: 3, amino: 2 },
  recovery: { amino: 8, protein: 6, joint: 5, vitamin: 2, carb: 2 },
  health: { vitamin: 9, joint: 5, protein: 3 },
};

const COMBO_THRESHOLD = 0.72;
const MAX_BY_LEVEL = { new: 2, mid: 3, pro: 4 };
const BUDGET = { b1: 75000, b2: 150000, b3: 250000, b4: Infinity };
const ACTIVITY = { new: 1.375, mid: 1.55, pro: 1.725 };

export function recommend(answers, products, settings = {}) {
  const { goal, sex, age, height, weight, level = "mid", avoid = [], budget = "b4" } = answers;
  const minor = !!age && age < 18;
  const medical = avoid.some((a) => ["heart", "pregnant", "meds"].includes(a));
  const noCaffeine = minor || avoid.some((a) => ["caffeine", "heart", "pregnant"].includes(a));

  const allowed = (p) => {
    if (!p.visible || !p.inStock || !p.goals?.includes(goal)) return false;
    if (p.caffeine && noCaffeine) return false;
    if (p.menOnly && (sex === "female" || minor)) return false;
    if (p.advanced && (level === "new" || minor)) return false;
    if (minor && !["protein", "vitamin", "gainer"].includes(p.category)) return false;
    if (avoid.includes("pregnant") && !["protein", "vitamin"].includes(p.category)) return false;
    if ((avoid.includes("heart") || avoid.includes("meds")) && ["fatburner", "booster"].includes(p.category)) return false;
    return true;
  };

  const ranked = products
    .filter(allowed)
    .map((p) => ({ p, score: 10 + (FIT[goal]?.[p.category] ?? 0) + (p.featured ? 3 : 0) }))
    .sort((a, b) => b.score - a.score || a.p.price - b.p.price);

  const max = Math.max(1, Math.min(settings.maxProducts ?? 4, MAX_BY_LEVEL[level] ?? 3, minor || medical ? 1 : 99));
  const limit = BUDGET[budget] ?? Infinity;

  const picks = [];
  let total = 0;
  for (const c of ranked) {
    if (picks.length >= max) break;
    if (picks.length && c.score < picks[0].score * COMBO_THRESHOLD) break;
    if (picks.some((x) => x.p.category === c.p.category)) continue;
    if (c.p.caffeine && picks.some((x) => x.p.caffeine)) continue;
    if (total + c.p.price > limit) continue;
    picks.push(c);
    total += c.p.price;
  }
  // Never leave someone empty-handed: best match, even if a little over budget.
  if (!picks.length && ranked.length) {
    picks.push(ranked[0]);
    total = ranked[0].p.price;
  }

  return {
    mode: picks.length > 1 ? "combo" : "single",
    productIds: picks.map((x) => x.p.id),
    total,
    targets: targets({ goal, sex, age, height, weight, level }),
    minor,
    medical,
  };
}

/** Daily calories (Mifflin-St Jeor), protein and water. */
export function targets({ goal, sex, age, height, weight, level }) {
  if (!height || !weight || !age) return null;
  const bmr = 10 * weight + 6.25 * height - 5 * age + (sex === "female" ? -161 : 5);
  const adjust = { gain: 400, lose: -450, muscle: 200 }[goal] ?? 0;
  const bmi = weight / (height / 100) ** 2;
  const refWeight = bmi > 30 ? 27 * (height / 100) ** 2 : weight;
  const perKg = { lose: 2, muscle: 2, gain: 1.8, health: 1.4 }[goal] ?? 1.6;
  return {
    calories: Math.round((bmr * (ACTIVITY[level] ?? 1.55) + adjust) / 50) * 50,
    protein: Math.round((refWeight * perKg) / 5) * 5,
    water: Math.round(weight * 0.035 * 10) / 10,
  };
}
