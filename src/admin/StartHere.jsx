/** START HERE: what this site does, a launch checklist, and whether everything is connected. */
import { useState } from "react";
import { DEFAULT_SETTINGS } from "../lib/defaults.js";
import { btn, Card, Icon, SectionTitle } from "./ui.jsx";

function useManualChecks() {
  const [done, setDone] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("kg_checks") || "{}");
    } catch {
      return {};
    }
  });
  const toggle = (id) => {
    const next = { ...done, [id]: !done[id] };
    setDone(next);
    try {
      localStorage.setItem("kg_checks", JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };
  return [done, toggle];
}

export default function StartHere({ data, draft, go }) {
  const [manual, toggle] = useManualChecks();
  const [copied, setCopied] = useState(false);
  const site = window.location.origin;
  const visible = draft.products.filter((p) => p.visible);
  const withPhoto = visible.filter((p) => p.image).length;
  const leads = data.leads;
  const week = leads.filter((l) => Date.now() - new Date(l.createdAt) < 7 * 864e5).length;

  const steps = [
    {
      id: "whatsapp",
      title: "Add your orders WhatsApp number",
      text: "Customers press “Order on WhatsApp” and land in this chat. Right now it's a placeholder number.",
      done: draft.settings.whatsapp && draft.settings.whatsapp !== DEFAULT_SETTINGS.whatsapp,
      action: () => go("settings"),
      button: "Open Settings",
    },
    {
      id: "photos",
      title: "Add product photos",
      text: `${withPhoto} of ${visible.length} products have a photo. Products without one show a drawn tub.`,
      done: withPhoto === visible.length,
      action: () => go("products"),
      button: "Open Products",
    },
    {
      id: "stock",
      title: "Check prices and what's in stock",
      text: "The quiz only suggests products that are switched to “In stock”.",
      done: manual.stock,
      manual: true,
      action: () => go("products"),
      button: "Open Products",
    },
    {
      id: "landing",
      title: "Review the headline and first-order discount",
      text: "The big words on the front page and the code shown on every result.",
      done: manual.landing,
      manual: true,
      action: () => go("landing"),
      button: "Open Landing page",
    },
    {
      id: "test",
      title: "Take the quiz yourself",
      text: "Do it once on your phone and press the WhatsApp button to see the message you'll receive.",
      done: manual.test,
      manual: true,
      action: () => window.open("/quiz", "_blank"),
      button: "Open the quiz",
    },
    {
      id: "share",
      title: "Share the link",
      text: "Put it in your Instagram bio, stories, ads and WhatsApp status.",
      done: manual.share,
      manual: true,
      action: async () => {
        try {
          await navigator.clipboard.writeText(site);
        } catch {
          /* ignore */
        }
        setCopied(true);
        if (!manual.share) toggle("share");
      },
      button: copied ? "Link copied" : "Copy link",
    },
  ];
  const doneCount = steps.filter((s) => s.done).length;

  const connections = [
    {
      label: "Database (saves leads and your changes)",
      state: data.storage.database,
      ok: { connected: "Connected", local: "Saved on this computer" },
      fix: "In Vercel: Storage → Create Database → Neon → connect it to this project → Redeploy.",
    },
    {
      label: "Photo storage",
      state: data.storage.photos,
      ok: { connected: "Connected", local: "Saved on this computer" },
      fix: "In Vercel: Storage → Create → Blob → connect it to this project → Redeploy.",
    },
    {
      label: "Admin password",
      state: data.storage.password === "set" ? "connected" : "local",
      ok: { connected: "Your own password is set", local: "Using the default password (fine on your computer)" },
      fix: "",
    },
  ];

  return (
    <>
      <SectionTitle title="Start here" intro="This website asks visitors 5 quick questions, then suggests one product or a combo from your shop. Every person who finishes becomes a lead you can message on WhatsApp." />

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ["Leads in total", leads.length],
          ["New this week", week],
          ["Waiting for a reply", leads.filter((l) => l.status === "new").length],
          ["Products live", visible.filter((p) => p.inStock).length],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[20px] border border-line bg-white p-5">
            <p className="text-[13px] font-medium text-muted">{label}</p>
            <p className="mt-2 text-[32px] font-semibold leading-none tracking-tight">{value}</p>
          </div>
        ))}
      </div>

      <Card
        title="Launch checklist"
        hint={`${doneCount} of ${steps.length} done. Work through these once and the site is ready to share.`}
        actions={<span className="rounded-full bg-mist px-3 py-1.5 text-[13px] font-semibold">{Math.round((doneCount / steps.length) * 100)}%</span>}
      >
        <div className="mb-5 h-2 overflow-hidden rounded-full bg-mist">
          <div className="h-full rounded-full bg-ok transition-[width]" style={{ width: `${(doneCount / steps.length) * 100}%` }} />
        </div>
        <ol className="flex flex-col gap-2.5">
          {steps.map((s, i) => (
            <li key={s.id} className={`flex flex-col gap-3 rounded-[16px] border p-4 sm:flex-row sm:items-center ${s.done ? "border-ok/30 bg-[#f1faf4]" : "border-line"}`}>
              <button
                type="button"
                disabled={!s.manual}
                onClick={() => s.manual && toggle(s.id)}
                aria-label={s.manual ? (s.done ? "Mark as not done" : "Mark as done") : undefined}
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[14px] font-bold ${s.done ? "bg-ok text-white" : "bg-mist"} ${s.manual ? "cursor-pointer" : "cursor-default"}`}
              >
                {s.done ? <Icon name="check" size={18} strokeWidth={2.6} /> : i + 1}
              </button>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold">{s.title}</p>
                <p className="text-[13.5px] text-muted">{s.text}{s.manual && !s.done ? " Tick the circle when you're done." : ""}</p>
              </div>
              <button type="button" onClick={s.action} className={s.done ? btn.ghost : btn.primary}>{s.button}</button>
            </li>
          ))}
        </ol>
      </Card>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card title="How the website works">
          <ol className="flex flex-col gap-4">
            {[
              ["A visitor answers 5 questions", "Goal, body, training level, anything to avoid, budget. Under a minute."],
              ["They leave name and WhatsApp", "That's the moment they appear in Leads."],
              ["They see their products", "One product or a combo, picked from the goals you tick on each product."],
              ["They order on WhatsApp", "A ready-made message with the products and total arrives in your chat."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lilac text-[13px] font-bold">{i + 1}</span>
                <span>
                  <span className="block text-[14.5px] font-semibold">{t}</span>
                  <span className="block text-[13.5px] text-muted">{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </Card>
        <Card title="Connections" hint="What keeps the site working online.">
          <ul className="flex flex-col gap-4">
            {connections.map((c) => {
              const ok = c.state !== "missing";
              return (
                <li key={c.label} className="flex gap-3">
                  <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${c.state === "connected" ? "bg-ok" : ok ? "bg-ember" : "bg-danger"}`} />
                  <span>
                    <span className="block text-[14.5px] font-semibold">{c.label}</span>
                    <span className="block text-[13.5px] text-muted">{ok ? c.ok[c.state] : <>Not connected. {c.fix}</>}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </>
  );
}
