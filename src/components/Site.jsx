/** Header, footer, language switch and product picture shared by the public pages. */
import { Link, useSite } from "../lib/app.jsx";
import { LANG_NAME, LANGS, t } from "../lib/i18n.js";
import { Icon, Mark } from "./Icon.jsx";

export function Brand({ dark = false }) {
  const { content } = useSite();
  const s = content?.settings ?? {};
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${dark ? "text-white" : "text-ink"}`} aria-label={s.brandName}>
      {s.logo ? (
        <img src={s.logo} alt={s.brandName} className="h-8 w-auto max-w-[160px] object-contain" />
      ) : (
        <>
          <Mark size={30} />
          <span dir="ltr" className="text-[17px] font-semibold tracking-tight">{s.brandName || "Karrada Group"}</span>
        </>
      )}
    </Link>
  );
}

export function LangSwitch({ dark = false }) {
  const { lang, setLang } = useSite();
  return (
    <div role="group" aria-label="Language" className={`inline-flex rounded-full p-1 text-[13px] ${dark ? "bg-white/10 text-white" : "bg-mist"}`}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={l === lang}
          className={`rounded-full px-3 py-1.5 font-medium transition-colors ${
            l === lang ? (dark ? "bg-white text-ink" : "bg-ink text-white") : "opacity-70 hover:opacity-100"
          }`}
        >
          {LANG_NAME[l]}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { lang, content } = useSite();
  const nav = [
    { href: "/#how", label: t("nav_how", lang) },
    { href: "/#goals", label: t("nav_goals", lang) },
    { href: content?.settings.storeUrl || "#", label: t("nav_shop", lang), external: true },
  ];
  return (
    <header className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-4 px-4 py-5 sm:px-8">
      <Brand />
      <nav aria-label="Main" className="hidden items-center gap-5 text-[14px] font-medium md:flex">
        {nav.map((n, i) => (
          <span key={n.label} className="flex items-center gap-5">
            {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-ink/40" />}
            <a href={n.href} {...(n.external ? { target: "_blank", rel: "noopener" } : {})} className="hover:opacity-60">
              {n.label}
            </a>
          </span>
        ))}
      </nav>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:block">
          <LangSwitch />
        </div>
        <Link to="/quiz" className="rounded-full bg-lilac px-4 py-2.5 text-[14px] font-semibold transition-colors hover:bg-[#bba6ff]">
          {t("cta_short", lang)}
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  const { lang, content } = useSite();
  const store = content?.settings.storeUrl ?? "";
  return (
    <footer className="mx-auto mt-auto w-full max-w-[1240px] px-4 pb-10 pt-12 sm:px-8">
      <div className="flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-start md:justify-between">
        <Brand />
        <p className="max-w-[56ch] text-[13px] leading-relaxed text-muted">{t("footer_note", lang)}</p>
        <a href={store} target="_blank" rel="noopener" dir="ltr" className="text-[14px] font-medium hover:opacity-60">
          {store.replace(/^https?:\/\//, "")}
        </a>
      </div>
    </footer>
  );
}

const TONE = {
  gainer: ["#ff8a2a", "#ffcf9e"], protein: ["#7b4dff", "#cdbdff"], creatine: ["#1d1d1f", "#cdbdff"],
  preworkout: ["#ff4f8b", "#ffc2d8"], fatburner: ["#e8452c", "#ffc1a8"], appetite: ["#3a1766", "#e3d9ff"],
  amino: ["#00a39a", "#b9f0e9"], carb: ["#f2b705", "#fff0b0"], vitamin: ["#2f9e44", "#cdf3d3"],
  joint: ["#3b82f6", "#cfe1ff"], booster: ["#111111", "#ffcf9e"], accessory: ["#444444", "#e6e4ee"],
};

/** The product photo, or a drawn tub in the product's colour until a photo is uploaded. */
export function ProductImage({ p, className = "" }) {
  if (p.image) return <img src={p.image} alt={p.name} loading="lazy" className={`h-full w-full object-contain ${className}`} />;
  const [main, soft] = TONE[p.category] ?? TONE.protein;
  return (
    <div className={`flex h-full w-full items-end justify-center ${className}`} role="img" aria-label={p.name}>
      <div className="relative w-[58%] max-w-[150px]" style={{ aspectRatio: "0.78" }}>
        <div className="absolute inset-x-[6%] top-0 h-[16%] rounded-b-[4px] rounded-t-[14px] bg-[#111]" />
        <div className="absolute inset-x-0 bottom-0 top-[13%] overflow-hidden rounded-[18px] shadow-[inset_-10px_0_18px_rgba(0,0,0,.18),inset_8px_0_14px_rgba(255,255,255,.35)]" style={{ background: main }}>
          <div className="absolute inset-x-0 bottom-[18%] top-[22%] flex flex-col items-center justify-center px-2 text-center" style={{ background: soft }}>
            <span dir="ltr" className="text-[9px] font-semibold uppercase tracking-wide opacity-70">{p.brand}</span>
            <span dir="ltr" className="mt-0.5 line-clamp-2 text-[11px] font-bold leading-tight">{p.name}</span>
          </div>
          <div className="absolute inset-y-0 left-[12%] w-[10%] bg-white/25 blur-[2px]" />
        </div>
      </div>
    </div>
  );
}

export function Spinner({ dark }) {
  return (
    <div className={`grid min-h-dvh place-items-center ${dark ? "bg-plum" : ""}`}>
      <div className="relative h-12 w-12">
        <div className={`absolute inset-0 rounded-full border-4 ${dark ? "border-white/15" : "border-line"}`} />
        <div className="spin absolute inset-0 rounded-full border-4 border-transparent border-t-ember" />
      </div>
    </div>
  );
}

export { Icon };
