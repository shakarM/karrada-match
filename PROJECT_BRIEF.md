# Karrada Match: brief for AI agents

Read this before changing anything.

## What it is
A quiz website for Karrada Group (supplement shop in Iraq, karradagroup.com). Visitors answer 5 quick questions, leave name + WhatsApp, and get **one product or a combo**. They order on WhatsApp in one tap, and each completion becomes a lead in `/admin`.
Priorities: **fast, easy customer experience → premium look → an admin a non-technical person can use alone.**

## Stack (keep it simple)
- **React 19 + Vite 7 + Tailwind CSS 4, plain JavaScript (JSX). No Next.js, no TypeScript, no router library.**
- Back end: Vercel serverless functions in `/api` (`content.js`, `lead.js`, `admin.js`). `vite.config.js` runs them locally too.
- Data: Postgres via `DATABASE_URL` (Neon on Vercel). Locally: `.data/db.json`. One JSON document holds all editable content (`kg_content`); leads live in `kg_leads`.
- Photos: Vercel Blob (`BLOB_READ_WRITE_TOKEN`). Locally they are stored inline. The dashboard shrinks images before upload.
- Admin login: one password, `ADMIN_PASSWORD` (default `karrada-admin` locally). Token kept in localStorage.

## Content model (`src/lib/defaults.js`)
`{ settings, texts, quiz, products }`, merged with defaults by `withDefaults()` so new fields always have values.
- **products:** `id, name, brand, category, price, oldPrice, image, url, goals[], caffeine, menOnly, advanced, featured, inStock, visible, desc{en,ar,ku}, how{en,ar,ku}`
- **quiz:** wording only (title, subtitle, option labels/hints) per step. Structure and icons are in `QUIZ_STEPS` and are not editable in admin, on purpose.
- **texts:** heroTitle, heroSubtitle, discountCode, discountText. **settings:** brandName, logo, whatsapp, storeUrl, maxProducts, pixel IDs.

## The quiz (5 steps + contact)
goal → body (man/woman, age, height, weight on one screen) → level (new/mid/pro) → avoid (none/caffeine/heart/pregnant/meds, multi) → budget (b1 ≤75k, b2 ≤150k, b3 ≤250k, b4 any) → contact (name, WhatsApp; optional email, city, opt-in; shows a blurred preview of the match).

## Engine (`src/lib/engine.js`, pure function, used by browser and server)
Eligible = visible + in stock + goal ticked + passes safety. Score = 10 + type-fit for the goal + 3 if featured. The first pick is always added. Others are added only if they score ≥ 72% of the first pick, are a different category, fit the budget, and include at most 1 caffeine product. Max products = min(settings.maxProducts, level cap 2/3/4); 1 for minors or anyone with a health condition. It also returns calorie/protein/water targets.

## Admin UX rules (most important)
Sections: Start here (checklist + connections), Leads, Products, Landing page, Quiz wording, Settings.
- Every section opens with a **Guide** card (numbered steps + tip, can be hidden).
- Plain language, no technical words. Every field has a hint.
- Content edits go into a draft. A floating **Save changes / Undo changes** bar appears when something changed. Leads save instantly.
- Language tabs (English / العربية / کوردی) for any text shown to customers.

## Rules for changes
1. Every customer-facing word needs `en`, `ar`, `ku`, and the layout must work right-to-left (`ms-/me-/start/end`, `rtl:` variants, `dir="ltr"` on numbers and phones).
2. Keep the customer flow short. Don't add required fields or steps.
3. Keep `engine.js` pure. Never weaken the safety rules or the "not medical advice" note.
4. Keep the code simple: plain JS, small files, comments for non-developers.
5. Check with `npm run build` and a manual run of `npm run dev`.

## Open items
- The WhatsApp number is a placeholder: set it in Admin → Settings.
- Most products have no photo yet: upload them in Admin → Products.
- "Platinum P14 Extreme" was guessed as a caffeinated pre-workout. Confirm it.
- Not deployed yet (see README for the Vercel steps).
