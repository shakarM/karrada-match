/**
 * POST /api/lead      → save quiz answers + contact, return the matched products
 * GET  /api/lead?id=  → a saved result (for the shareable result link)
 */
import { randomBytes } from "node:crypto";
import { addLead, getContent, getLead } from "./_lib/store.js";
import { recommend } from "../src/lib/engine.js";
import { normalizePhone } from "../src/lib/phone.js";

const text = (v, max = 100) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const num = (v, min, max) => {
  const n = Math.round(Number(v));
  return n >= min && n <= max ? n : undefined;
};
const oneOf = (v, list, fallback) => (list.includes(v) ? v : fallback);

/** What a visitor is allowed to see about a saved result (no phone or email). */
function publicView(lead) {
  return {
    id: lead.id,
    firstName: lead.name.split(" ")[0],
    lang: lead.lang,
    goal: lead.answers.goal,
    result: lead.result,
    products: lead.products,
  };
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const lead = await getLead(text(req.query.id, 20));
    return lead ? res.status(200).json(publicView(lead)) : res.status(404).json({ error: "Not found" });
  }
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const b = req.body ?? {};
  if (b.website) return res.status(200).json({ id: null }); // spam trap

  const name = text(b.name, 80);
  const phone = normalizePhone(text(b.phone, 30));
  const email = text(b.email, 120).toLowerCase();
  if (name.length < 2) return res.status(422).json({ error: "name" });
  if (!phone) return res.status(422).json({ error: "phone" });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(422).json({ error: "email" });

  const a = b.answers ?? {};
  const answers = {
    goal: oneOf(a.goal, ["gain", "lose", "muscle", "energy", "recovery", "health"], "health"),
    sex: oneOf(a.sex, ["male", "female"], "male"),
    age: num(a.age, 12, 80),
    height: num(a.height, 120, 230),
    weight: num(a.weight, 30, 250),
    level: oneOf(a.level, ["new", "mid", "pro"], "mid"),
    avoid: Array.isArray(a.avoid) ? a.avoid.filter((x) => ["none", "caffeine", "heart", "pregnant", "meds"].includes(x)) : [],
    budget: oneOf(a.budget, ["b1", "b2", "b3", "b4"], "b4"),
  };

  const content = await getContent();
  const result = recommend(answers, content.products, content.settings);
  const products = result.productIds.map((id) => content.products.find((p) => p.id === id));

  const lead = {
    id: randomBytes(6).toString("base64url"),
    createdAt: new Date().toISOString(),
    name,
    phone,
    email,
    city: text(b.city, 40),
    lang: oneOf(b.lang, ["en", "ar", "ku"], "en"),
    consent: !!b.consent,
    answers,
    result,
    products, // snapshot, so the result link keeps working if products change later
    status: "new",
    notes: "",
    source: Object.fromEntries(Object.entries(b.source ?? {}).slice(0, 6).map(([k, v]) => [text(k, 30), text(v, 120)])),
  };

  try {
    await addLead(lead);
    return res.status(200).json(publicView(lead));
  } catch (e) {
    // Still show the customer their result even if saving failed
    console.error("[lead] not saved:", e.message);
    return res.status(200).json({ ...publicView(lead), id: null });
  }
}
