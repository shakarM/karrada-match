/** RESULT: one big product, or a combo. Shareable at /r/<id>. */
import { useEffect, useState } from "react";
import { Link, loadPixels, track, useSite } from "../lib/app.jsx";
import { CATEGORIES } from "../lib/defaults.js";
import { fillN, fmt, iqd, pick, resultHeadline, STACK_NAME, t } from "../lib/i18n.js";
import { waLink } from "../lib/phone.js";
import { Footer, Header, Icon, ProductImage, Spinner } from "../components/Site.jsx";

function useResult(id) {
  const [data, setData] = useState(() => {
    try {
      const last = JSON.parse(sessionStorage.getItem("kg_last") || "null");
      if (last && (id === "latest" || last.id === id)) return last;
    } catch {
      /* ignore */
    }
    return null;
  });
  const [missing, setMissing] = useState(false);
  useEffect(() => {
    if (data || id === "latest") return;
    fetch(`/api/lead?id=${encodeURIComponent(id)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setMissing(true));
  }, [id, data]);
  return { data, missing: missing || (!data && id === "latest") };
}

export default function Result({ id }) {
  const { content, lang } = useSite();
  const { data, missing } = useResult(id);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (content) loadPixels(content.settings);
  }, [content]);

  if (missing)
    return (
      <div className="flex min-h-dvh flex-col">
        <Header />
        <main className="mx-auto w-full max-w-[1240px] px-4 py-20 sm:px-8">
          <p className="text-[22px]">{t("r_missing", lang)}</p>
          <Link to="/quiz" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3.5 font-semibold text-white">{t("cta_start", lang)}</Link>
        </main>
      </div>
    );
  if (!data || !content) return <Spinner />;

  const { settings, texts } = content;
  const products = data.products.filter(Boolean);
  const single = products.length === 1;
  const total = products.reduce((s, p) => s + p.price, 0);
  const stack = pick(STACK_NAME[data.goal], lang);
  const roles = [t("r_core", lang), t("r_boost", lang), t("r_support", lang), t("r_support", lang)];
  const targets = data.result.targets;

  const orderText = [
    `${t("wa_intro", lang)} (${stack}):`,
    ...products.map((p) => `• ${p.brand} ${p.name} – ${iqd(p.price, lang)}`),
    `${t("r_total", lang)}: ${iqd(total, lang)}`,
    texts.discountCode ? `${t("r_code", lang)}: ${texts.discountCode}` : "",
    data.id ? `${t("wa_ref", lang)}: ${data.id}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const orderLink = waLink(settings.whatsapp, orderText);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(texts.discountCode);
    } catch {
      /* ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ url, title: document.title });
      else await navigator.clipboard.writeText(url);
    } catch {
      /* ignore */
    }
  };

  const OrderButton = () => (
    <a href={orderLink} target="_blank" rel="noopener" onClick={() => track("whatsapp")} className="inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-4 text-[16px] font-semibold text-white transition-transform active:scale-[.98]">
      <Icon name="whatsapp" size={20} />
      {t("r_order", lang)}
    </a>
  );

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="mx-auto w-full max-w-[1240px] px-4 pb-36 sm:px-8 md:pb-16">
        <section className="reveal pb-8 pt-6 md:pt-14">
          <h1 className="display text-[clamp(44px,8.5vw,108px)] font-medium">
            {resultHeadline(lang, data.firstName, stack, single).map((line, i) => (
              <span key={i} className={`block ${i === 1 ? "text-ink/45" : ""}`}>{line}</span>
            ))}
          </h1>
          {products.length > 0 && (
            <p className="mt-6 max-w-[52ch] text-[18px] leading-relaxed text-ink/70">
              {single ? t("r_single_note", lang) : fillN(t("r_combo_note", lang), products.length)}
            </p>
          )}
        </section>

        {(data.result.minor || data.result.medical) && (
          <div className="mb-8 flex max-w-[760px] gap-3 rounded-[20px] border border-ember/50 bg-[#fff4ea] p-5 text-[15px] leading-relaxed">
            <Icon name="info" className="mt-0.5 shrink-0 text-[#e86f0e]" />
            <p>{data.result.minor ? t("r_minor", lang) : t("r_medical", lang)}</p>
          </div>
        )}

        {products.length === 0 ? (
          <section className="rounded-[28px] bg-mist p-8 text-[18px]">{t("r_empty", lang)}</section>
        ) : (
          <section className="flex flex-col gap-4">
            {products.map((p, i) => {
              const cat = CATEGORIES[p.category] ?? CATEGORIES.protein;
              return (
                <article
                  key={p.id}
                  className={`reveal grid gap-5 rounded-[28px] border border-line p-4 sm:items-center sm:gap-8 sm:p-5 ${single ? "md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]" : "sm:grid-cols-[200px_1fr_auto]"}`}
                  style={{ animationDelay: `${120 + i * 90}ms` }}
                >
                  <div className={`overflow-hidden rounded-[20px] bg-mist p-4 ${single ? "h-[280px] md:row-span-2 md:h-[380px]" : "h-[200px]"}`}>
                    <ProductImage p={p} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-muted">
                      {!single && <>{roles[i]} <span aria-hidden className="mx-1.5 inline-block h-1 w-1 rounded-full bg-muted align-middle" /> </>}
                      {pick(cat.label, lang)}
                    </p>
                    <h2 dir="ltr" style={{ textAlign: "start" }} className={`tight mt-1.5 font-semibold leading-tight ${single ? "text-[clamp(28px,3.4vw,40px)]" : "text-[26px]"}`}>
                      <span className="block text-[15px] font-medium text-muted">{p.brand}</span>
                      {p.name}
                    </h2>
                    <p className="mt-2 max-w-[60ch] text-[15.5px] leading-relaxed text-muted">{pick(p.desc, lang) || pick(cat.desc, lang)}</p>
                    <dl className="mt-4 grid gap-3 text-[15.5px] leading-snug sm:grid-cols-2 sm:gap-6">
                      <div>
                        <dt className="text-[13px] font-semibold text-muted">{t("r_why", lang)}</dt>
                        <dd className="mt-1">{pick(cat.why, lang)}</dd>
                      </div>
                      <div>
                        <dt className="text-[13px] font-semibold text-muted">{t("r_when", lang)}</dt>
                        <dd className="mt-1">{pick(p.how, lang) || pick(cat.how, lang)}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className={`flex items-center justify-between gap-4 border-t border-line pt-4 ${single ? "md:col-start-2" : "sm:flex-col sm:items-end sm:border-0 sm:pt-0"}`}>
                    <p dir="ltr" className="text-[20px] font-semibold">
                      {iqd(p.price, lang)}
                      {p.oldPrice > p.price && <span className="ms-2 text-[14px] font-normal text-muted line-through">{fmt(p.oldPrice)}</span>}
                    </p>
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-ink px-4 py-2.5 text-[14px] font-semibold transition-colors hover:bg-ink hover:text-white">
                        <Icon name="bag" size={17} />
                        {t("r_view", lang)}
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {targets && (
          <section aria-label={t("r_daily", lang)} className="mt-4 rounded-[28px] bg-ink p-6 text-white sm:p-8">
            <h2 className="text-[15px] font-medium text-white/60">{t("r_daily", lang)}</h2>
            <dl className="mt-5 grid grid-cols-3 gap-x-4">
              {[
                [fmt(targets.calories), t("r_kcal", lang)],
                [fmt(targets.protein), t("r_protein", lang)],
                [targets.water, t("r_water", lang)],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd>
                    <span className="block text-[clamp(28px,5vw,52px)] font-semibold leading-none tracking-tight">{v}</span>
                    <span className="mt-2 block text-[14px] text-white/60">{l}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <section className="mt-4 flex flex-col gap-6 rounded-[28px] bg-mist p-6 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div>
            <p className="text-[15px] text-muted">{t("r_total", lang)}</p>
            <p dir="ltr" style={{ textAlign: "start" }} className="mt-1 text-[36px] font-semibold tracking-tight">{iqd(total, lang)}</p>
            {texts.discountCode && (
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[15px]">
                <span>{pick(texts.discountText, lang)}</span>
                <button type="button" onClick={copyCode} className="inline-flex items-center gap-2 rounded-full bg-lilac px-3.5 py-1.5 font-semibold">
                  <span dir="ltr">{texts.discountCode}</span>
                  <span className="text-[13px] font-medium opacity-70">{copied ? t("r_copied", lang) : t("r_copy", lang)}</span>
                </button>
              </div>
            )}
          </div>
          <div className="hidden flex-col items-end gap-3 md:flex">
            <OrderButton />
            <div className="flex items-center gap-4 text-[14px]">
              <button type="button" onClick={share} className="inline-flex items-center gap-2 font-medium hover:opacity-60"><Icon name="share" size={17} />{t("r_share", lang)}</button>
              <Link to="/quiz" className="font-medium hover:opacity-60">{t("r_retake", lang)}</Link>
            </div>
          </div>
        </section>
        <div className="mt-6 flex items-center gap-5 text-[14px] md:hidden">
          <button type="button" onClick={share} className="inline-flex items-center gap-2 font-medium"><Icon name="share" size={17} />{t("r_share", lang)}</button>
          <Link to="/quiz" className="font-medium">{t("r_retake", lang)}</Link>
        </div>
      </main>

      {/* Sticky order bar on phones */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[12px] text-muted">{t("r_total", lang)}</p>
            <p dir="ltr" className="text-[18px] font-semibold">{iqd(total, lang)}</p>
          </div>
          <OrderButton />
        </div>
      </div>
      <Footer />
    </div>
  );
}
