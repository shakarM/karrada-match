/**
 * App-wide helpers: a tiny router, the site content, and the visitor's language.
 * No libraries, just React.
 */
import { createContext, useContext, useEffect, useState } from "react";
import { withDefaults } from "./defaults.js";
import { isRtl } from "./i18n.js";

/* ---------- Router ---------- */
export function usePath() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return path;
}

export function navigate(to) {
  window.history.pushState({}, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

export function Link({ to, children, ...rest }) {
  return (
    <a
      href={to}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || to.startsWith("http") || to.startsWith("#")) return;
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

/* ---------- Site content + language ---------- */
const SiteContext = createContext(null);

function startLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (["en", "ar", "ku"].includes(saved)) return saved;
  } catch {
    /* private mode */
  }
  const nav = navigator.language || "";
  return nav.startsWith("ar") ? "ar" : nav.startsWith("ckb") || nav.startsWith("ku") ? "ku" : "en";
}

export function SiteProvider({ children }) {
  const [content, setContent] = useState(null);
  const [lang, setLangState] = useState(startLang);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((c) => setContent(withDefaults(c)))
      .catch(() => setContent(withDefaults())); // still works with the built-in content
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "ku" ? "ckb" : lang;
    document.documentElement.dir = isRtl(lang) ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {
      /* ignore */
    }
  };

  return <SiteContext.Provider value={{ content, lang, setLang }}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);

/* ---------- Tracking (Meta / TikTok / Google, only if set in admin) ---------- */
let pixelsLoaded = false;
export function loadPixels(settings) {
  if (pixelsLoaded || !settings) return;
  pixelsLoaded = true;
  const add = (code) => {
    const s = document.createElement("script");
    s.text = code;
    document.head.appendChild(s);
  };
  const clean = (id) => String(id || "").replace(/[^\w-]/g, "");
  const meta = clean(settings.metaPixel);
  const tiktok = clean(settings.tiktokPixel);
  const ga = clean(settings.ga4);
  if (meta)
    add(`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${meta}');fbq('track','PageView');`);
  if (tiktok)
    add(`!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('${tiktok}');ttq.page();}(window,document,'ttq');`);
  if (ga) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`;
    document.head.appendChild(s);
    add(`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${ga}');`);
  }
}

/** Sends an event to the pixels that are installed. */
export function track(event, data = {}) {
  const names = { start: ["StartTrial", "begin_checkout"], lead: ["Lead", "generate_lead"], whatsapp: ["Contact", "contact"] }[event];
  if (!names) return;
  try {
    window.fbq?.("track", names[0], data);
    window.gtag?.("event", names[1], data);
    window.ttq?.track?.(names[0] === "Lead" ? "SubmitForm" : names[0], data);
  } catch {
    /* never break the page */
  }
}

/** UTM tags from ads (saved with each lead so you know where it came from). */
export function adSource() {
  try {
    const p = new URLSearchParams(window.location.search);
    const found = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "fbclid", "ttclid", "gclid"]) if (p.get(k)) found[k] = p.get(k);
    const saved = JSON.parse(sessionStorage.getItem("kg_src") || "{}");
    const merged = { ...saved, ...found };
    sessionStorage.setItem("kg_src", JSON.stringify(merged));
    return merged;
  } catch {
    return {};
  }
}
