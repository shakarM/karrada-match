/**
 * THE QUIZ: 5 quick steps + contact details.
 * Wording comes from the admin (content.quiz); structure comes from QUIZ_STEPS.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { adSource, loadPixels, navigate, track, useSite } from "../lib/app.jsx";
import { CITIES, QUIZ_STEPS } from "../lib/defaults.js";
import { recommend } from "../lib/engine.js";
import { fillN, pick, t } from "../lib/i18n.js";
import { normalizePhone } from "../lib/phone.js";
import { Brand, Icon, LangSwitch, ProductImage, Spinner } from "../components/Site.jsx";

const SAVE_KEY = "kg_quiz";
const emptyContact = { name: "", phone: "", email: "", city: "", consent: false, website: "" };

export default function Quiz() {
  const { content, lang } = useSite();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ avoid: [] });
  const [contact, setContact] = useState(emptyContact);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const started = useRef(false);

  // Pick up the goal from the landing page, or restore progress after a refresh
  useEffect(() => {
    const goal = new URLSearchParams(window.location.search).get("goal");
    if (goal) {
      setAnswers({ avoid: [], goal });
      setStep(1);
      started.current = true;
      track("start");
      return;
    }
    try {
      const saved = JSON.parse(sessionStorage.getItem(SAVE_KEY) || "null");
      if (saved) {
        setAnswers(saved.answers);
        setStep(saved.step);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(SAVE_KEY, JSON.stringify({ answers, step }));
    } catch {
      /* ignore */
    }
  }, [answers, step]);

  useEffect(() => {
    if (content) loadPixels(content.settings);
  }, [content]);

  const isContact = step >= QUIZ_STEPS.length;
  const preview = useMemo(() => {
    if (!content || !isContact) return [];
    const r = recommend(answers, content.products, content.settings);
    return r.productIds.map((id) => content.products.find((p) => p.id === id));
  }, [content, answers, isContact]);

  if (!content) return <Spinner dark />;
  if (sending) return <Analyzing lang={lang} />;

  const def = QUIZ_STEPS[step];
  const words = def ? content.quiz[def.key] : null;
  const progress = ((step + (isContact ? 0.6 : 0)) / (QUIZ_STEPS.length + 1)) * 100;

  const go = (to) => {
    setErrors({});
    setStep(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pickOne = (key, value) => {
    if (!started.current) {
      started.current = true;
      track("start");
    }
    setAnswers((a) => ({ ...a, [key]: value }));
    setTimeout(() => go(step + 1), 220); // short pause so the tap is visible
  };

  const toggleAvoid = (id) =>
    setAnswers((a) => {
      const cur = a.avoid ?? [];
      if (id === "none") return { ...a, avoid: cur.includes("none") ? [] : ["none"] };
      const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur.filter((x) => x !== "none"), id];
      return { ...a, avoid: next };
    });

  const bodyOk = (a) => a.sex && a.age >= 12 && a.age <= 80 && a.height >= 120 && a.height <= 230 && a.weight >= 30 && a.weight <= 250;

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (contact.name.trim().length < 2) errs.name = t("c_err_name", lang);
    if (!normalizePhone(contact.phone)) errs.phone = t("c_err_phone", lang);
    if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) errs.email = t("c_err_email", lang);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSending(true);
    const minWait = new Promise((r) => setTimeout(r, 1200));
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, answers, lang, source: adSource() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSending(false);
        if (data.error) setErrors({ [data.error]: t(`c_err_${data.error}`, lang) });
        return;
      }
      track("lead", { goal: answers.goal });
      await minWait;
      sessionStorage.setItem("kg_last", JSON.stringify(data));
      sessionStorage.removeItem(SAVE_KEY);
      navigate(`/r/${data.id ?? "latest"}`);
    } catch {
      setSending(false);
      setErrors({ form: t("c_err_net", lang) });
    }
  };

  return (
    <div className="flex min-h-dvh flex-col bg-plum text-white">
      <header className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-3 px-4 py-5 sm:px-8">
        {step > 0 ? (
          <button type="button" onClick={() => go(step - 1)} aria-label={t("q_back", lang)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20">
            <Icon name="back" size={20} className="rtl:-scale-x-100" />
          </button>
        ) : (
          <Brand dark />
        )}
        <LangSwitch dark />
      </header>

      <main className="mx-auto grid w-full max-w-[1180px] flex-1 content-start gap-6 px-4 pb-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:pt-8">
        {/* Question */}
        <div>
          <p className="text-[17px] font-medium text-white/80" aria-live="polite">
            {isContact ? t("q_last", lang) : <span dir="ltr">{step + 1} / {QUIZ_STEPS.length}</span>}
          </p>
          <div className="mt-3 h-[5px] overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-ember transition-[width] duration-500" style={{ width: `${Math.max(progress, 4)}%` }} />
          </div>
          <div key={step} className="step-in mt-8 lg:mt-14">
            <h1 className="tight text-[clamp(30px,4.6vw,52px)] font-semibold leading-[1.05] rtl:leading-[1.3]">
              {isContact ? t("c_title", lang) : pick(words.title, lang)}
            </h1>
            <p className="mt-4 max-w-[44ch] text-[17px] leading-relaxed text-white/70">{isContact ? t("c_sub", lang) : pick(words.subtitle, lang)}</p>
          </div>
        </div>

        {/* Answer card */}
        <div key={`card-${step}`} className="step-in relative self-start lg:mt-12">
          <div aria-hidden className="absolute inset-x-6 -bottom-3 h-full rounded-[28px] bg-white/15" />
          <div aria-hidden className="absolute inset-x-12 -bottom-6 h-full rounded-[28px] bg-white/[.08]" />
          <div className="relative rounded-[28px] bg-white p-4 text-ink shadow-[0_30px_60px_-30px_rgba(10,0,30,.6)] sm:p-6">
            {isContact ? (
              <ContactForm lang={lang} contact={contact} setContact={setContact} errors={errors} preview={preview} onSubmit={submit} />
            ) : def.type === "body" ? (
              <BodyStep lang={lang} a={answers} setA={setAnswers} error={errors.body} onNext={() => (bodyOk(answers) ? go(step + 1) : setErrors({ body: t("q_body_err", lang) }))} />
            ) : (
              <Options
                lang={lang}
                def={def}
                words={words}
                multi={def.type === "multi"}
                selected={def.type === "multi" ? answers.avoid : [answers[def.key]]}
                onPick={(id) => (def.type === "multi" ? toggleAvoid(id) : pickOne(def.key, id))}
                onNext={() => go(step + 1)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function NextButton({ onClick, disabled, children, type = "button", wide }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-[16px] bg-ember px-6 py-3.5 text-[16px] font-semibold text-ink transition-colors hover:bg-[#ff9d4d] disabled:cursor-not-allowed disabled:opacity-40 ${wide ? "w-full py-4 text-[17px]" : ""}`}
    >
      {children}
      <Icon name="arrow" size={18} className="rtl:-scale-x-100" />
    </button>
  );
}

function Options({ lang, def, words, multi, selected, onPick, onNext }) {
  return (
    <>
      {multi && <p className="px-1 pb-3 text-[14px] text-muted">{t("q_select_all", lang)}</p>}
      <ul className="flex flex-col gap-2.5">
        {Object.entries(words.options).map(([id, o], i) => {
          const on = selected?.includes(id);
          const icon = def.icons?.[id];
          return (
            <li key={id}>
              <button
                type="button"
                role={multi ? "checkbox" : "radio"}
                aria-checked={!!on}
                onClick={() => onPick(id)}
                className={`group flex w-full items-center gap-4 rounded-[18px] border px-4 py-3.5 text-start transition-colors ${on ? "pop border-ember bg-ember" : "border-line bg-white hover:border-ink/30"}`}
              >
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${on ? "bg-white/40" : "bg-mist group-hover:bg-lilac-soft"}`}>
                  {on ? <Icon name="check" size={20} strokeWidth={2.2} /> : icon ? <Icon name={icon} size={20} /> : <span className="text-[14px] font-semibold text-muted">{i + 1}</span>}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[17px] font-semibold leading-snug">{pick(o.label, lang)}</span>
                  {pick(o.hint, lang) && <span className={`block text-[14px] ${on ? "text-ink/75" : "text-muted"}`}>{pick(o.hint, lang)}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {multi && (
        <div className="mt-5 flex justify-end">
          <NextButton onClick={onNext} disabled={!selected?.length}>{t("q_next", lang)}</NextButton>
        </div>
      )}
    </>
  );
}

function BodyStep({ lang, a, setA, error, onNext }) {
  const refs = useRef([]);
  const fields = [
    { key: "age", label: t("q_age", lang), unit: t("q_years", lang), ph: "24", digits: 2 },
    { key: "height", label: t("q_height", lang), unit: t("q_cm", lang), ph: "175", digits: 3 },
    { key: "weight", label: t("q_weight", lang), unit: t("q_kg", lang), ph: "70", digits: 3 },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-2.5" role="radiogroup">
        {["male", "female"].map((sx) => (
          <button
            key={sx}
            type="button"
            role="radio"
            aria-checked={a.sex === sx}
            onClick={() => {
              setA({ ...a, sex: sx });
              if (!a.age) setTimeout(() => refs.current[0]?.focus(), 50);
            }}
            className={`flex items-center justify-center gap-2.5 rounded-[18px] border px-4 py-4 text-[17px] font-semibold transition-colors ${a.sex === sx ? "pop border-ember bg-ember" : "border-line hover:border-ink/30"}`}
          >
            <Icon name={sx} size={20} />
            {t(sx === "male" ? "q_man" : "q_woman", lang)}
          </button>
        ))}
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-2.5">
        {fields.map((f, i) => (
          <label key={f.key} className="block rounded-[18px] border border-line px-3 py-3 focus-within:border-ember sm:px-4">
            <span className="block text-[13px] font-medium text-muted">{f.label}</span>
            <span className="mt-0.5 flex items-baseline gap-1" dir="ltr">
              <input
                ref={(el) => (refs.current[i] = el)}
                type="number"
                inputMode="numeric"
                enterKeyHint={i < 2 ? "next" : "done"}
                placeholder={f.ph}
                value={a[f.key] ?? ""}
                onChange={(e) => {
                  const v = e.target.value.slice(0, 3);
                  setA({ ...a, [f.key]: v === "" ? undefined : Number(v) });
                  if (v.length >= f.digits && i < 2) refs.current[i + 1]?.focus(); // jump to the next box
                }}
                onKeyDown={(e) => e.key === "Enter" && onNext()}
                className="w-full min-w-0 bg-transparent text-[28px] font-semibold tracking-tight outline-none placeholder:text-ink/20 sm:text-[32px]"
              />
              <span className="text-[13px] text-muted">{f.unit}</span>
            </span>
          </label>
        ))}
      </div>
      {error && <p role="alert" className="mt-3 text-[14px] text-danger">{error}</p>}
      <div className="mt-5 flex justify-end">
        <NextButton onClick={onNext}>{t("q_next", lang)}</NextButton>
      </div>
    </div>
  );
}

function ContactForm({ lang, contact, setContact, errors, preview, onSubmit }) {
  const set = (k) => (e) => setContact((c) => ({ ...c, [k]: k === "consent" ? e.target.checked : e.target.value }));
  const field = "w-full rounded-[14px] border border-line bg-white px-4 py-3.5 text-[17px] outline-none transition-colors placeholder:text-ink/35 focus:border-ember";
  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      {preview.length > 0 && (
        <div className="mb-1 flex items-center gap-4 rounded-[18px] bg-mist p-3">
          <div className="flex shrink-0 -space-x-5 rtl:space-x-reverse">
            {preview.slice(0, 3).map((p) => (
              <div key={p.id} className="h-16 w-14 overflow-hidden rounded-[12px] border-2 border-mist bg-white p-1">
                <div className="h-full w-full blur-[3px]"><ProductImage p={p} /></div>
              </div>
            ))}
          </div>
          <p className="text-[15px] font-semibold leading-snug">{preview.length === 1 ? t("c_match_one", lang) : fillN(t("c_match_many", lang), preview.length)}</p>
        </div>
      )}
      <div>
        <input autoFocus autoComplete="name" placeholder={t("c_name", lang)} aria-label={t("c_name", lang)} value={contact.name} onChange={set("name")} className={field} />
        {errors.name && <p className="mt-1 text-[13px] text-danger">{errors.name}</p>}
      </div>
      <div>
        <div className="relative">
          <Icon name="whatsapp" size={20} className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-[#1fa855]" />
          <input type="tel" inputMode="tel" autoComplete="tel" dir="ltr" placeholder={`${t("c_phone", lang)} · 0770 123 4567`} aria-label={t("c_phone", lang)} value={contact.phone} onChange={set("phone")} className={`${field} ps-12 rtl:text-end`} />
        </div>
        {errors.phone && <p className="mt-1 text-[13px] text-danger">{errors.phone}</p>}
      </div>
      <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
        <div>
          <input type="email" inputMode="email" autoComplete="email" dir="ltr" placeholder={t("c_email", lang)} aria-label={t("c_email", lang)} value={contact.email} onChange={set("email")} className={`${field} rtl:text-end`} />
          {errors.email && <p className="mt-1 text-[13px] text-danger">{errors.email}</p>}
        </div>
        <select value={contact.city} onChange={set("city")} aria-label={t("c_city", lang)} className={`${field} appearance-none ${contact.city ? "" : "text-ink/35"}`}>
          <option value="">{t("c_city", lang)}</option>
          {CITIES.map((c) => (
            <option key={c.id} value={c.id} className="text-ink">{c[lang]}</option>
          ))}
        </select>
      </div>
      <input tabIndex={-1} autoComplete="off" value={contact.website} onChange={set("website")} className="hidden" aria-hidden name="website" />
      <label className="flex cursor-pointer items-start gap-3 px-1 py-1">
        <input type="checkbox" checked={contact.consent} onChange={set("consent")} className="mt-0.5 h-4 w-4 shrink-0 accent-[#ff8a2a]" />
        <span className="text-[13.5px] leading-snug text-ink/75">{t("c_consent", lang)}</span>
      </label>
      {errors.form && <p role="alert" className="text-[14px] text-danger">{errors.form}</p>}
      <NextButton type="submit" wide>{t("c_submit", lang)}</NextButton>
      <p className="text-center text-[12.5px] text-muted">{t("c_privacy", lang)}</p>
    </form>
  );
}

function Analyzing({ lang }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => Math.min(x + 1, 3)), 380);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="grid min-h-dvh place-items-center bg-plum px-6 text-white">
      <div className="w-full max-w-[380px]">
        <div className="relative mx-auto mb-10 h-20 w-20">
          <div className="absolute inset-0 rounded-full border-[5px] border-white/15" />
          <div className="spin absolute inset-0 rounded-full border-[5px] border-transparent border-t-ember" />
        </div>
        <ul className="flex flex-col gap-3" aria-live="polite">
          {["a_1", "a_2", "a_3"].map((k, n) => (
            <li key={k} className={`flex items-center gap-3 text-[18px] transition-opacity ${n <= i ? "opacity-100" : "opacity-30"}`}>
              <span className={`grid h-6 w-6 place-items-center rounded-full ${n < i ? "bg-ember text-ink" : "bg-white/15"}`}>{n < i && <Icon name="check" size={14} strokeWidth={2.6} />}</span>
              {t(k, lang)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
