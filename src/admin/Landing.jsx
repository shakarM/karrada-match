/** LANDING PAGE: the big headline, the intro line and the first-order discount, with a live preview. */
import { useState } from "react";
import HeroRibbon from "../components/HeroRibbon.jsx";
import { pick } from "../lib/i18n.js";
import { Card, Field, Guide, LangTabs, SectionTitle, T3Field, Text } from "./ui.jsx";

export default function Landing({ draft, setDraft }) {
  const [lang, setLang] = useState("en");
  const texts = draft.texts;
  const set = (change) => setDraft((d) => ({ ...d, texts: { ...d.texts, ...change } }));
  const dir = lang === "en" ? "ltr" : "rtl";

  return (
    <>
      <SectionTitle title="Landing page" intro="The first thing visitors see. Keep it short and confident." />
      <Guide
        id="landing"
        steps={[
          "Pick the language you want to edit with the buttons (English, العربية, کوردی).",
          "Type the headline. Each line becomes its own big line on the page. 2–3 short lines look best.",
          "Edit the intro and the first-order offer. The preview on the right updates as you type.",
          "Repeat for the other languages, then press “Save changes” at the bottom.",
        ]}
        tip="If you leave a language empty, visitors in that language see the English text."
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card title="Edit the words" actions={<LangTabs value={lang} onChange={setLang} />}>
          <div className="flex flex-col gap-5">
            <T3Field label="Big headline" hint="Press Enter for a new line. Short words work best (e.g. Lift. Fuel. Grow.)" lang={lang} value={texts.heroTitle} onChange={(heroTitle) => set({ heroTitle })} multiline rows={3} />
            <T3Field label="Intro under the picture" hint="One or two sentences on what the quiz does." lang={lang} value={texts.heroSubtitle} onChange={(heroSubtitle) => set({ heroSubtitle })} multiline rows={3} />
            <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
              <Field label="Discount code" hint="Same in every language. Leave empty to hide the offer.">
                <Text value={texts.discountCode} onChange={(v) => set({ discountCode: v.toUpperCase().replace(/\s/g, "") })} placeholder="KGFIRST10" />
              </Field>
              <T3Field label="Offer text" hint="Shown next to the code on every result." lang={lang} value={texts.discountText} onChange={(discountText) => set({ discountText })} />
            </div>
          </div>
        </Card>

        <Card title="Preview" hint="How it looks on the website (simplified).">
          <div dir={dir} className="overflow-hidden rounded-[20px] border border-line bg-white p-5">
            <h3 className="display text-[44px] font-medium">
              {pick(texts.heroTitle, lang).split("\n").map((l, i) => <span key={i} className="block">{l || " "}</span>)}
            </h3>
            <div className="relative mt-4 overflow-hidden rounded-[18px] bg-ink">
              <HeroRibbon className="block h-[150px] w-full" />
              <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4 pt-10 text-[13px] leading-relaxed text-white">{pick(texts.heroSubtitle, lang)}</p>
            </div>
            {texts.discountCode && (
              <p className="mt-4 flex flex-wrap items-center gap-2 text-[14px]">
                {pick(texts.discountText, lang)}
                <span dir="ltr" className="rounded-full bg-lilac px-3 py-1 font-semibold">{texts.discountCode}</span>
              </p>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
