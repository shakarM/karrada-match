/** Building blocks for the admin dashboard. */
import { useEffect, useRef, useState } from "react";
import { Icon } from "../components/Icon.jsx";

export { Icon };

/* ---------- Talking to the server ---------- */
export function getToken() {
  try {
    return localStorage.getItem("kg_admin") || "";
  } catch {
    return "";
  }
}
export async function api(action, data = {}) {
  const res = await fetch("/api/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ action, ...data }),
  });
  const json = await res.json().catch(() => ({}));
  if (res.status === 401 && action !== "login") {
    localStorage.removeItem("kg_admin");
    window.location.reload();
  }
  if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
  return json;
}

/* ---------- Layout ---------- */
export function SectionTitle({ title, intro, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[30px] font-semibold tracking-tight">{title}</h1>
        {intro && <p className="mt-1 max-w-[62ch] text-[15px] leading-relaxed text-muted">{intro}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

/** The "How to use this section" card. Can be hidden; remembered per section. */
export function Guide({ id, steps, tip }) {
  const key = `kg_guide_${id}`;
  const [open, setOpen] = useState(() => {
    try {
      return localStorage.getItem(key) !== "closed";
    } catch {
      return true;
    }
  });
  const toggle = () => {
    setOpen(!open);
    try {
      localStorage.setItem(key, open ? "closed" : "open");
    } catch {
      /* ignore */
    }
  };
  if (!open)
    return (
      <button type="button" onClick={toggle} className="mb-5 inline-flex items-center gap-2 rounded-full bg-lilac-soft px-4 py-2 text-[13.5px] font-semibold text-plum hover:bg-lilac">
        <Icon name="bulb" size={17} /> Show the guide for this section
      </button>
    );
  return (
    <div className="mb-6 rounded-[22px] bg-plum p-5 text-white sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[15px] font-semibold"><Icon name="bulb" size={19} className="text-ember" /> How to use this section</p>
        <button type="button" onClick={toggle} className="rounded-full px-3 py-1 text-[13px] text-white/70 hover:bg-white/10 hover:text-white">Hide</button>
      </div>
      <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-3 rounded-[16px] bg-white/[.08] p-3.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ember text-[13px] font-bold text-ink">{i + 1}</span>
            <span className="text-[14px] leading-snug text-white/90">{s}</span>
          </li>
        ))}
      </ol>
      {tip && <p className="mt-4 text-[13.5px] leading-relaxed text-white/70"><b className="text-white">Tip:</b> {tip}</p>}
    </div>
  );
}

export function Card({ title, hint, children, className = "", actions }) {
  return (
    <section className={`rounded-[22px] border border-line bg-white p-5 sm:p-6 ${className}`}>
      {(title || actions) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && <h2 className="text-[17px] font-semibold">{title}</h2>}
            {hint && <p className="mt-0.5 text-[13.5px] leading-snug text-muted">{hint}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

/* ---------- Form fields ---------- */
export const inputCls = "w-full rounded-[12px] border border-line bg-white px-3.5 py-3 text-[15px] outline-none transition-colors placeholder:text-ink/30 focus:border-plum";

export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13.5px] font-semibold">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-[12.5px] leading-snug text-muted">{hint}</span>}
    </label>
  );
}

export function Text({ value, onChange, multiline, rows = 3, dir, ...rest }) {
  const props = { value: value ?? "", onChange: (e) => onChange(e.target.value), dir, className: inputCls, ...rest };
  return multiline ? <textarea rows={rows} {...props} /> : <input {...props} />;
}

export function Switch({ checked, onChange, label, hint }) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={!!checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-ok" : "bg-line"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? "left-[22px]" : "left-0.5"}`} />
      </button>
      <span>
        <span className="block text-[14.5px] font-semibold">{label}</span>
        {hint && <span className="block text-[12.5px] leading-snug text-muted">{hint}</span>}
      </span>
    </label>
  );
}

export function Chip({ on, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={!!on}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13.5px] font-semibold transition-colors ${on ? "border-plum bg-plum text-white" : "border-line bg-white hover:border-ink/30"}`}
    >
      {on && <Icon name="check" size={15} strokeWidth={2.4} />}
      {children}
    </button>
  );
}

const btnBase = "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[14px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";
export const btn = {
  primary: `${btnBase} bg-ink text-white hover:bg-ink/85`,
  accent: `${btnBase} bg-ember text-ink hover:bg-[#ff9d4d]`,
  soft: `${btnBase} bg-lilac-soft text-plum hover:bg-lilac`,
  ghost: `${btnBase} border border-line bg-white hover:border-ink/40`,
  danger: `${btnBase} border border-danger/30 bg-white text-danger hover:bg-danger hover:text-white`,
  wa: `${btnBase} bg-[#1fa855] text-white hover:bg-[#178a45]`,
};

/* ---------- Language tabs: edit English / Arabic / Kurdish ---------- */
export const LANG_TABS = [
  { id: "en", label: "English", dir: "ltr" },
  { id: "ar", label: "العربية", dir: "rtl" },
  { id: "ku", label: "کوردی", dir: "rtl" },
];

export function LangTabs({ value, onChange }) {
  return (
    <div className="inline-flex rounded-full bg-mist p-1" role="tablist" aria-label="Language to edit">
      {LANG_TABS.map((l) => (
        <button
          key={l.id}
          type="button"
          role="tab"
          aria-selected={value === l.id}
          onClick={() => onChange(l.id)}
          className={`rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${value === l.id ? "bg-ink text-white" : "text-muted hover:text-ink"}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

/** One text that exists in 3 languages. Shows only the selected language. */
export function T3Field({ label, hint, value, onChange, lang, multiline, rows, placeholder, badge = true }) {
  const dir = lang === "en" ? "ltr" : "rtl";
  const missing = badge && lang !== "en" && !value?.[lang]?.trim();
  return (
    <Field
      label={
        <span className="flex items-center gap-2">
          {label}
          {missing && <span className="rounded-full bg-[#fff1e3] px-2 py-0.5 text-[11px] font-semibold text-[#9a4a05]">Empty, English is shown</span>}
        </span>
      }
      hint={hint}
    >
      <Text value={value?.[lang]} onChange={(v) => onChange({ ...value, [lang]: v })} multiline={multiline} rows={rows} dir={dir} placeholder={placeholder?.[lang] ?? placeholder?.en ?? ""} />
    </Field>
  );
}

/* ---------- Photo upload (drag & drop or click) ---------- */

/** Shrinks big photos in the browser before upload so they load fast for customers. */
function shrink(file, max = 1000) {
  return new Promise((resolve, reject) => {
    if (file.type === "image/svg+xml") {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = reject;
      r.readAsDataURL(file);
      return;
    }
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL("image/webp", 0.86));
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => reject(new Error("That file isn't a picture we can read."));
    img.src = URL.createObjectURL(file);
  });
}

export function ImageDrop({ value, onChange, name = "image", tip, square = true }) {
  const input = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [over, setOver] = useState(false);

  const upload = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("Please choose a picture (PNG, JPG or WEBP).");
    setBusy(true);
    setError("");
    try {
      const image = await shrink(file);
      const { url } = await api("upload", { image, name });
      onChange(url);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div
        onDragOver={(e) => (e.preventDefault(), setOver(true))}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => (e.preventDefault(), setOver(false), upload(e.dataTransfer.files?.[0]))}
        className={`flex flex-col gap-4 rounded-[18px] border-2 border-dashed p-4 transition-colors sm:flex-row sm:items-center ${over ? "border-plum bg-lilac-soft" : "border-line"}`}
      >
        <div className={`grid shrink-0 place-items-center overflow-hidden rounded-[14px] bg-mist ${square ? "h-32 w-32" : "h-20 w-40"}`}>
          {busy ? (
            <div className="spin h-8 w-8 rounded-full border-4 border-line border-t-plum" />
          ) : value ? (
            <img src={value} alt="" className="h-full w-full object-contain p-1" />
          ) : (
            <Icon name="image" size={32} className="text-ink/25" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[14.5px] font-semibold">{value ? "Looks good. Want to change it?" : "Drag a photo here"}</p>
          <p className="mt-0.5 text-[13px] text-muted">{tip ?? "or click the button. Big photos are shrunk automatically."}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => input.current?.click()} disabled={busy} className={btn.soft}>
              <Icon name="upload" size={17} /> {value ? "Replace photo" : "Upload photo"}
            </button>
            {value && (
              <button type="button" onClick={() => onChange("")} className={btn.ghost}>Remove</button>
            )}
          </div>
          {error && <p role="alert" className="mt-2 text-[13px] text-danger">{error}</p>}
        </div>
      </div>
      <input ref={input} type="file" accept="image/*" hidden onChange={(e) => upload(e.target.files?.[0])} />
    </div>
  );
}

/* ---------- Feedback ---------- */
export function useToast() {
  const [msg, setMsg] = useState(null);
  useEffect(() => {
    if (!msg) return;
    const id = setTimeout(() => setMsg(null), 3200);
    return () => clearTimeout(id);
  }, [msg]);
  const view = msg && (
    <div role="status" className={`toast fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full px-5 py-3 text-[14.5px] font-semibold shadow-lg ${msg.error ? "bg-danger text-white" : "bg-ink text-white"}`}>
      <span className="flex items-center gap-2">
        <Icon name={msg.error ? "info" : "check"} size={18} strokeWidth={2.2} className={msg.error ? "" : "text-ember"} />
        {msg.text}
      </span>
    </div>
  );
  return [view, (text, error = false) => setMsg({ text, error })];
}

export function Drawer({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/40" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title} className="toast flex h-full w-full max-w-[640px] flex-col bg-mist" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-3 border-b border-line bg-white px-5 py-4">
          <h2 className="truncate text-[18px] font-semibold">{title}</h2>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full hover:bg-mist" aria-label="Close"><Icon name="close" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">{children}</div>
        {footer && <div className="border-t border-line bg-white px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
}

export const timeAgo = (iso) => {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  if (s < 86400 * 7) return `${Math.floor(s / 86400)} days ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};
