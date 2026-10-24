# Karrada Match

A quick quiz website for **Karrada Group**. Visitors answer 5 questions in under a minute, leave their name and WhatsApp number, and get **one product or a combo** from your shop. They can order it on WhatsApp in one tap, and every person who finishes becomes a **lead** in the admin dashboard.

- Plain **React + Vite + Tailwind**. No Next.js.
- English, Arabic and Kurdish, with right-to-left layout.
- Admin dashboard at **/admin**, with a step-by-step guide in every section.
- Ready for **Vercel**.

---

## Run it on your computer

```bash
npm install
npm run dev
```

Open **http://localhost:5173**

- Quiz: http://localhost:5173/quiz
- Admin: http://localhost:5173/admin (password **karrada-admin**)

Nothing else to set up. Your leads and changes are saved in the `.data` folder.

## Put it online (Vercel, about 10 minutes)

1. Upload this folder to a GitHub repository.
2. On **vercel.com** press **Add New → Project**, pick the repository and press **Deploy**. Vercel detects Vite by itself.
3. In the project: **Storage → Create Database → Neon** and connect it. This saves leads and your admin changes.
4. **Storage → Create → Blob** and connect it. This saves product photos.
5. **Settings → Environment Variables**: add `ADMIN_PASSWORD` with a strong password.
6. **Deployments → ⋯ → Redeploy.** Done.

Then open `/admin`, follow the **Start here** checklist, and share your link.

## How it's organised

```
index.html            The page shell
src/
  App.jsx             Which page shows for which address
  pages/              Home (landing), Quiz, Result
  admin/              The dashboard: one file per section
  components/         Header, footer, icons, product picture, hero artwork
  lib/
    defaults.js       ALL starting content: products, quiz wording, texts, settings
    engine.js         How products are picked (one or a combo)
    i18n.js           Interface words in English / Arabic / Kurdish
    app.jsx           Tiny router, site content, language, ad tracking
    phone.js          Iraqi phone number formatting
  index.css           Brand colours, fonts, animations
api/                  Small server functions (Vercel runs them automatically)
  content.js          GET  site content
  lead.js             POST a finished quiz / GET a saved result
  admin.js            Everything the dashboard does (password protected)
  _lib/store.js       Saving data: Postgres online, a local file on your computer
  _lib/auth.js        Admin password check
vite.config.js        Also runs the api/ files locally during npm run dev
vercel.json           Makes page links like /quiz work on Vercel
```

## How products are picked

In **Admin → Products**, each product has:

- **Suggest for these goals:** the quiz only suggests a product for goals that are ticked.
- **Safety switches:** contains caffeine, for men only, for experienced people only.
- **In stock / Show / Bestseller.**

The best match is always shown. Others are added only when they are almost as good a match (72% or more), are a different type of product, and fit the budget. Beginners get up to 2 products, regular trainers 3, and people who train hard 4. Anyone under 18 or with a health condition gets exactly 1 safe product. The full logic is in `src/lib/engine.js` and is commented.

Recommendations are general guidance, not medical advice. The site says so on every page.
