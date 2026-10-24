import { useEffect } from "react";
import { Link, loadPixels, useSite } from "../lib/app.jsx";
import { pick, t } from "../lib/i18n.js";
import { GOALS, QUIZ_STEPS } from "../lib/defaults.js";
import HeroRibbon from "../components/HeroRibbon.jsx";
import { Footer, Header, Icon, LangSwitch, Spinner } from "../components/Site.jsx";

export default function Home() {
  const { content, lang } = useSite();
  useEffect(() => {
    if (content) loadPixels(content.settings);
  }, [content]);
  if (!content) return <Spinner />;

  const { texts, quiz, products } = content;
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))].slice(0, 6);
  const goalIcons = QUIZ_STEPS[0].icons;
  const steps = [1, 2, 3].map((n) => ({ title: t(`how_${n}_t`, lang), text: t(`how_${n}_d`, lang) }));
  const trust = [
    ["shield", t("trust_1", lang)],
    ["truck", t("trust_2", lang)],
    ["refresh", t("trust_3", lang)],
    ["chat", t("trust_4", lang)],
  ];

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="mx-auto w-full max-w-[1240px] px-4 sm:px-8">
        <div className="mb-6 sm:hidden">
          <LangSwitch />
        </div>

        {/* Hero */}
        <section className="grid gap-8 pb-8 pt-6 md:grid-cols-[1.1fr_1fr] md:items-end md:pb-10 md:pt-16">
          <h1 className="display reveal text-[clamp(64px,13vw,150px)] font-medium">
            {pick(texts.heroTitle, lang)
              .split("\n")
              .map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
          </h1>
          <div className="reveal flex flex-col gap-6 md:flex-row md:items-center md:justify-end md:gap-8" style={{ animationDelay: "120ms" }}>
            <div className="flex items-start gap-5">
              <span aria-hidden className="hidden text-[42px] font-light leading-none text-ink/80 md:block">/</span>
              <p className="max-w-[300px] text-[18px] leading-snug">{t("hero_side", lang)}</p>
            </div>
            <Link to="/quiz" className="group inline-flex w-fit items-center gap-3 rounded-full bg-ink px-6 py-4 text-[16px] font-semibold text-white">
              {t("cta_start", lang)}
              <Icon name="arrow" size={20} className="transition-transform group-hover:translate-x-1 rtl:-scale-x-100" />
            </Link>
          </div>
        </section>

        <section className="relative -mx-2 overflow-hidden rounded-[28px] bg-ink sm:mx-0 sm:rounded-[40px]">
          <HeroRibbon className="block h-[300px] w-full sm:h-[440px]" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black via-black/70 to-transparent p-5 pt-20 text-white sm:flex-row sm:items-end sm:justify-between sm:p-9 sm:pt-28">
            <p className="max-w-[480px] text-[15px] leading-relaxed sm:text-[17px]">{pick(texts.heroSubtitle, lang)}</p>
            <span className="text-[14px] font-medium text-white/80">{t("quiz_time", lang)}</span>
          </div>
        </section>

        {/* Brands */}
        <section aria-label="Brands" className="no-scrollbar flex items-center justify-between gap-10 overflow-x-auto py-10 sm:py-14">
          {brands.map((b) => (
            <span key={b} dir="ltr" className="shrink-0 text-[20px] font-bold tracking-tight text-ink/85 sm:text-[24px]">{b}</span>
          ))}
        </section>

        <section className="py-8 sm:py-14">
          <p className="tight max-w-[22ch] text-[clamp(30px,5vw,60px)] font-medium leading-[1.08] [text-wrap:balance] rtl:max-w-[26ch] rtl:leading-[1.35]">
            {t("statement", lang)}
          </p>
        </section>

        {/* Goals → each starts the quiz with that goal already picked */}
        <section id="goals" className="scroll-mt-8 py-10 sm:py-16">
          <h2 className="tight mb-8 text-[28px] font-semibold sm:text-[36px]">{t("goals_title", lang)}</h2>
          <ul className="grid gap-px overflow-hidden rounded-[28px] bg-line sm:grid-cols-2 lg:grid-cols-3">
            {GOALS.map((g) => (
              <li key={g} className="bg-paper">
                <Link to={`/quiz?goal=${g}`} className="group flex h-full items-center justify-between gap-6 p-6 transition-colors hover:bg-mist sm:p-8">
                  <span>
                    <span className="tight block text-[22px] font-semibold">{pick(quiz.goal.options[g].label, lang)}</span>
                    <span className="mt-1 block text-[15px] text-muted">{pick(quiz.goal.options[g].hint, lang)}</span>
                  </span>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-mist transition-colors group-hover:bg-lilac">
                    <Icon name={goalIcons[g]} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* How it works (a real sequence, so it's numbered) */}
        <section id="how" className="scroll-mt-8 py-10 sm:py-16">
          <h2 className="tight mb-10 text-[28px] font-semibold sm:text-[36px]">{t("how_title", lang)}</h2>
          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <li key={i} className="border-t border-ink pt-5">
                <span className="text-[15px] font-semibold text-muted">{i + 1}</span>
                <h3 className="tight mt-6 text-[22px] font-semibold">{s.title}</h3>
                <p className="mt-2 max-w-[34ch] text-[16px] leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {trust.map(([icon, label]) => (
            <div key={label} className="flex items-center gap-3 text-[15px] font-medium">
              <Icon name={icon} />
              {label}
            </div>
          ))}
        </section>

        <section className="my-10 overflow-hidden rounded-[28px] bg-plum px-6 py-14 text-white sm:rounded-[40px] sm:px-14 sm:py-20">
          <h2 className="tight max-w-[18ch] text-[clamp(32px,5vw,58px)] font-medium leading-[1.05] rtl:leading-[1.35]">{t("final_title", lang)}</h2>
          <Link to="/quiz" className="mt-10 inline-flex items-center gap-3 rounded-full bg-ember px-6 py-4 text-[16px] font-semibold text-ink transition-colors hover:bg-[#ff9d4d]">
            {t("cta_start", lang)}
            <Icon name="arrow" size={20} className="rtl:-scale-x-100" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
