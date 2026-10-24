/**
 * ADMIN DASHBOARD (/admin)
 * Sign in → pick a section on the left → make changes → press "Save changes" at the bottom.
 * Leads save instantly; everything else waits for "Save changes" so you can review first.
 */
import { useCallback, useEffect, useState } from "react";
import { Mark } from "../components/Icon.jsx";
import { api, btn, getToken, Icon, inputCls, useToast } from "./ui.jsx";
import StartHere from "./StartHere.jsx";
import Leads from "./Leads.jsx";
import Products from "./Products.jsx";
import Landing from "./Landing.jsx";
import QuizWords from "./QuizWords.jsx";
import Settings from "./Settings.jsx";

const SECTIONS = [
  { id: "start", label: "Start here", icon: "flag", hint: "Launch checklist" },
  { id: "leads", label: "Leads", icon: "users", hint: "People who took the quiz" },
  { id: "products", label: "Products", icon: "bag", hint: "Photos, prices, stock" },
  { id: "landing", label: "Landing page", icon: "text", hint: "Headline & offer" },
  { id: "quiz", label: "Quiz wording", icon: "chat", hint: "Questions & answers" },
  { id: "settings", label: "Settings", icon: "settings", hint: "WhatsApp, logo, tracking" },
];

export default function Admin() {
  const [signedIn, setSignedIn] = useState(() => !!getToken());
  useEffect(() => {
    document.documentElement.dir = "ltr";
    document.documentElement.lang = "en";
    document.title = "Admin · Karrada Match";
  }, []);
  return signedIn ? <Dashboard /> : <Login onDone={() => setSignedIn(true)} />;
}

function Login({ onDone }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { token } = await api("login", { password });
      localStorage.setItem("kg_admin", token);
      onDone();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="grid min-h-dvh place-items-center bg-plum px-4">
      <form onSubmit={submit} className="w-full max-w-[400px] rounded-[28px] bg-white p-8">
        <div className="flex items-center gap-2.5"><Mark size={30} /><span className="text-[17px] font-semibold">Karrada admin</span></div>
        <h1 className="mt-8 text-[26px] font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-1 text-[14px] text-muted">Enter your admin password to manage the quiz, products and leads.</p>
        <input type="password" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={`${inputCls} mt-6`} />
        {error && <p role="alert" className="mt-2 text-[13.5px] text-danger">{error}</p>}
        <button disabled={busy} className={`${btn.primary} mt-4 w-full py-3`}>{busy ? "Checking…" : "Sign in"}</button>
        <p className="mt-4 text-[12.5px] text-muted">On your computer the password is <b>karrada-admin</b>. Online it's the one you set in Vercel (ADMIN_PASSWORD).</p>
      </form>
    </div>
  );
}

function Dashboard() {
  const [section, setSection] = useState(() => window.location.hash.slice(1) || "start");
  const [data, setData] = useState(null); // { content, leads, storage }
  const [draft, setDraft] = useState(null); // content being edited
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [toastView, toast] = useToast();

  const load = useCallback(async () => {
    try {
      const d = await api("load");
      setData(d);
      setDraft(structuredClone(d.content));
    } catch (e) {
      setLoadError(e.message);
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  // Follow links like /admin#products and the browser's back button
  useEffect(() => {
    const onHash = () => setSection(window.location.hash.slice(1) || "start");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const dirty = data && draft && JSON.stringify(draft) !== JSON.stringify(data.content);

  // Warn before closing the tab with unsaved changes
  useEffect(() => {
    const warn = (e) => dirty && (e.preventDefault(), (e.returnValue = ""));
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const go = (id) => {
    setSection(id);
    window.location.hash = id;
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const save = async () => {
    setSaving(true);
    try {
      await api("saveContent", { content: draft });
      setData((d) => ({ ...d, content: structuredClone(draft) }));
      toast("Saved. Your website is updated.");
    } catch (e) {
      toast(e.message, true);
    } finally {
      setSaving(false);
    }
  };

  const setLeads = (fn) => setData((d) => ({ ...d, leads: fn(d.leads) }));
  const newLeads = data?.leads.filter((l) => l.status === "new").length ?? 0;
  const props = { data, draft, setDraft, setLeads, toast, go };

  if (loadError)
    return (
      <div className="grid min-h-dvh place-items-center p-6 text-center">
        <div>
          <p className="text-[18px] font-semibold">The dashboard couldn't load</p>
          <p className="mt-1 text-muted">{loadError}</p>
          <button onClick={() => (setLoadError(""), load())} className={`${btn.primary} mt-5`}>Try again</button>
        </div>
      </div>
    );

  return (
    <div className="min-h-dvh bg-mist lg:flex">
      {/* Menu */}
      <aside className="sticky top-0 z-30 bg-ink text-white lg:h-dvh lg:w-[260px] lg:shrink-0">
        <div className="flex items-center justify-between px-5 py-4 lg:py-6">
          <span className="flex items-center gap-2.5"><Mark size={28} /><span className="text-[16px] font-semibold">Karrada admin</span></span>
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Menu"><Icon name={menuOpen ? "close" : "menu"} /></button>
        </div>
        <nav className={`${menuOpen ? "block" : "hidden"} px-3 pb-4 lg:flex lg:h-[calc(100dvh-84px)] lg:flex-col`}>
          <ul className="flex flex-col gap-1">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => go(s.id)}
                  aria-current={section === s.id ? "page" : undefined}
                  className={`flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-start transition-colors ${section === s.id ? "bg-white text-ink" : "text-white/80 hover:bg-white/10"}`}
                >
                  <Icon name={s.icon} size={20} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14.5px] font-semibold">{s.label}</span>
                    <span className={`block text-[12px] ${section === s.id ? "text-muted" : "text-white/50"}`}>{s.hint}</span>
                  </span>
                  {s.id === "leads" && newLeads > 0 && <span className="rounded-full bg-ember px-2 py-0.5 text-[11.5px] font-bold text-ink">{newLeads}</span>}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-1 border-t border-white/10 pt-4 lg:mt-auto">
            <a href="/" target="_blank" className="flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-[14px] text-white/80 hover:bg-white/10"><Icon name="external" size={18} /> Open the website</a>
            <button onClick={() => (localStorage.removeItem("kg_admin"), window.location.reload())} className="flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-[14px] text-white/80 hover:bg-white/10"><Icon name="logout" size={18} /> Sign out</button>
          </div>
        </nav>
      </aside>

      {/* Section */}
      <main className="min-w-0 flex-1 px-4 pb-32 pt-6 sm:px-8 sm:pt-8 lg:px-10">
        {!draft ? (
          <div className="grid h-[60vh] place-items-center"><div className="spin h-10 w-10 rounded-full border-4 border-line border-t-plum" /></div>
        ) : (
          <div className="mx-auto max-w-[1180px]">
            {section === "start" && <StartHere {...props} />}
            {section === "leads" && <Leads {...props} />}
            {section === "products" && <Products {...props} />}
            {section === "landing" && <Landing {...props} />}
            {section === "quiz" && <QuizWords {...props} />}
            {section === "settings" && <Settings {...props} />}
          </div>
        )}
      </main>

      {/* Save bar: appears only when something changed */}
      {dirty && (
        <div className="toast fixed bottom-3 left-3 right-3 z-30 mx-auto flex max-w-[760px] flex-col gap-3 rounded-[20px] bg-ink p-3 ps-5 text-white shadow-2xl sm:flex-row sm:items-center sm:justify-between lg:left-[280px] lg:right-10">
          <p className="flex items-center gap-2 text-[14.5px]">
            <span className="h-2.5 w-2.5 rounded-full bg-ember" />
            You have unsaved changes. Customers see them after you save.
          </p>
          <div className="flex gap-2">
            <button onClick={() => setDraft(structuredClone(data.content))} className="rounded-full px-4 py-2.5 text-[14px] font-semibold text-white/80 hover:bg-white/10">Undo changes</button>
            <button onClick={save} disabled={saving} className={btn.accent}>{saving ? "Saving…" : "Save changes"}</button>
          </div>
        </div>
      )}
      {toastView}
    </div>
  );
}
