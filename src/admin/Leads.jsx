/** LEADS: everyone who finished the quiz. Message them, track status, export. */
import { useMemo, useState } from "react";
import { CITIES, DEFAULT_QUIZ } from "../lib/defaults.js";
import { pick, STACK_NAME } from "../lib/i18n.js";
import { prettyPhone, waLink } from "../lib/phone.js";
import { api, btn, Guide, Icon, inputCls, SectionTitle, timeAgo } from "./ui.jsx";

const STATUSES = [
  { id: "new", label: "New", tone: "bg-lilac-soft text-plum" },
  { id: "contacted", label: "Contacted", tone: "bg-[#fff1e3] text-[#9a4a05]" },
  { id: "ordered", label: "Ordered", tone: "bg-[#e3f6ea] text-[#17703c]" },
  { id: "loyal", label: "Loyal", tone: "bg-ink text-white" },
  { id: "lost", label: "Not interested", tone: "bg-mist text-muted" },
];
const goalLabel = (g) => pick(DEFAULT_QUIZ.goal.options[g]?.label, "en") || g;
const levelLabel = (l) => pick(DEFAULT_QUIZ.level.options[l]?.label, "en") || l;
const budgetLabel = (b) => pick(DEFAULT_QUIZ.budget.options[b]?.label, "en") || b;

/** The follow-up message, already in the customer's language. */
function followUp(lead, code) {
  const first = lead.name.split(" ")[0];
  const stack = pick(STACK_NAME[lead.answers.goal], lead.lang);
  const link = `${window.location.origin}/r/${lead.id}`;
  return {
    en: `Hi ${first}! This is Karrada Group. Your ${stack} plan is ready: ${link}\nShall we deliver it to you? Use code ${code} for your first order.`,
    ar: `هلا ${first}! معك كرادة گروب. خطتك (${stack}) جاهزة: ${link}\nتريد نوصلها إلك؟ استخدم الكود ${code} لأول طلب.`,
    ku: `سڵاو ${first}! ئێمە کەڕادە گرووپین. پلانەکەت (${stack}) ئامادەیە: ${link}\nدەتەوێت بۆتی بگەیەنین؟ کۆدی ${code} بۆ یەکەم داواکاری بەکاربهێنە.`,
  }[lead.lang] ?? "";
}

function exportCsv(leads) {
  const cols = ["Date", "Name", "WhatsApp", "Email", "City", "Language", "Goal", "Gender", "Age", "Height", "Weight", "Training", "Avoid", "Budget", "Products", "Total IQD", "Status", "Marketing OK", "Notes", "Source"];
  const cell = (v) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows = leads.map((l) => [
    new Date(l.createdAt).toISOString().slice(0, 16).replace("T", " "),
    l.name, `+${l.phone}`, l.email, l.city, l.lang, goalLabel(l.answers.goal), l.answers.sex, l.answers.age, l.answers.height, l.answers.weight,
    levelLabel(l.answers.level), l.answers.avoid?.join(" "), budgetLabel(l.answers.budget), l.products.filter(Boolean).map((p) => p.name).join(" + "),
    l.result.total, l.status, l.consent ? "yes" : "no", l.notes, Object.values(l.source ?? {}).join(" / "),
  ].map(cell).join(","));
  const blob = new Blob(["﻿" + [cols.join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `karrada-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
}

export default function Leads({ data, draft, setLeads, toast }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [openId, setOpenId] = useState(null);
  const leads = data.leads;

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter(
      (l) => (status === "all" || l.status === status) && (!q || `${l.name} ${l.phone} ${l.email} ${l.city}`.toLowerCase().includes(q)),
    );
  }, [leads, query, status]);

  const update = async (lead, patch) => {
    setLeads((all) => all.map((l) => (l.id === lead.id ? { ...l, ...patch } : l)));
    try {
      await api("updateLead", { id: lead.id, ...patch });
    } catch (e) {
      toast(e.message, true);
    }
  };
  const remove = async (lead) => {
    if (!confirm(`Delete ${lead.name}? This can't be undone.`)) return;
    try {
      await api("deleteLead", { id: lead.id });
      setLeads((all) => all.filter((l) => l.id !== lead.id));
      toast("Lead deleted");
    } catch (e) {
      toast(e.message, true);
    }
  };

  return (
    <>
      <SectionTitle
        title="Leads"
        intro="Everyone who finished the quiz, newest first. Changes here save straight away."
        actions={<button onClick={() => exportCsv(shown)} disabled={!shown.length} className={btn.ghost}><Icon name="download" size={18} /> Download for Excel</button>}
      />
      <Guide
        id="leads"
        steps={[
          "New people appear here the moment they finish the quiz. The menu shows how many are waiting.",
          "Press the green WhatsApp button. A friendly message with their personal link is already written in their language.",
          "Change the status as you go: New → Contacted → Ordered → Loyal. It keeps your follow-ups organised.",
          "Download for Excel to upload to Meta ads (custom audiences) or an email tool. Only message people who ticked “Marketing OK”.",
        ]}
        tip="Reply to new leads within the same day. Click a name to see their answers and add notes."
      />

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Icon name="search" size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, phone, email or city" className={`${inputCls} pl-10`} />
        </div>
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
          {[{ id: "all", label: "All" }, ...STATUSES].map((s) => {
            const n = s.id === "all" ? leads.length : leads.filter((l) => l.status === s.id).length;
            return (
              <button key={s.id} onClick={() => setStatus(s.id)} className={`shrink-0 rounded-full px-3.5 py-2 text-[13.5px] font-semibold ${status === s.id ? "bg-ink text-white" : "bg-white text-ink hover:bg-line"}`}>
                {s.label} <span className="opacity-60">{n}</span>
              </button>
            );
          })}
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="rounded-[22px] border border-dashed border-line bg-white px-6 py-16 text-center">
          <p className="text-[17px] font-semibold">{leads.length ? "Nobody matches this search" : "No leads yet"}</p>
          <p className="mx-auto mt-1 max-w-[46ch] text-[14px] text-muted">
            {leads.length ? "Clear the search or pick “All”." : "Share your website link. When someone finishes the quiz they'll show up here."}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {shown.map((l) => {
            const open = openId === l.id;
            const products = l.products.filter(Boolean);
            return (
              <li key={l.id} className="rounded-[20px] border border-line bg-white">
                <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center">
                  <button onClick={() => setOpenId(open ? null : l.id)} className="flex min-w-0 flex-1 items-center gap-3 text-start">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lilac text-[16px] font-bold">{l.name[0]?.toUpperCase()}</span>
                    <span className="min-w-0">
                      <span className="block truncate text-[15.5px] font-semibold">{l.name}</span>
                      <span className="block truncate text-[13px] text-muted">
                        {goalLabel(l.answers.goal)} · {products.length === 1 ? products[0].name : `${products.length} products`} · {timeAgo(l.createdAt)}
                      </span>
                    </span>
                    <Icon name="back" size={16} className={`ms-auto shrink-0 text-muted transition-transform ${open ? "rotate-90" : "-rotate-90"}`} />
                  </button>
                  <div className="flex items-center gap-2">
                    <select
                      value={l.status}
                      onChange={(e) => update(l, { status: e.target.value })}
                      aria-label="Status"
                      className={`rounded-full border-0 px-3 py-2 text-[13px] font-semibold ${STATUSES.find((s) => s.id === l.status)?.tone}`}
                    >
                      {STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                    <a
                      href={waLink(l.phone, followUp(l, draft.texts.discountCode))}
                      target="_blank"
                      rel="noopener"
                      onClick={() => l.status === "new" && update(l, { status: "contacted" })}
                      className={btn.wa}
                    >
                      <Icon name="whatsapp" size={18} /> WhatsApp
                    </a>
                  </div>
                </div>

                {open && (
                  <div className="grid gap-5 border-t border-line p-4 md:grid-cols-[1fr_1fr_1.2fr]">
                    <dl className="flex flex-col gap-2 text-[14px]">
                      <Row k="WhatsApp" v={prettyPhone(l.phone)} />
                      <Row k="Email" v={l.email || "–"} />
                      <Row k="City" v={CITIES.find((c) => c.id === l.city)?.en ?? (l.city || "–")} />
                      <Row k="Language" v={{ en: "English", ar: "Arabic", ku: "Kurdish" }[l.lang]} />
                      <Row k="Marketing OK" v={l.consent ? "Yes" : "No"} />
                      <Row k="Came from" v={Object.values(l.source ?? {}).join(" / ") || "Direct"} />
                    </dl>
                    <dl className="flex flex-col gap-2 text-[14px]">
                      <Row k="Goal" v={goalLabel(l.answers.goal)} />
                      <Row k="Body" v={`${l.answers.sex === "female" ? "Woman" : "Man"}, ${l.answers.age ?? "–"} y, ${l.answers.height ?? "–"} cm, ${l.answers.weight ?? "–"} kg`} />
                      <Row k="Training" v={levelLabel(l.answers.level)} />
                      <Row k="Avoid" v={l.answers.avoid?.filter((a) => a !== "none").join(", ") || "Nothing"} />
                      <Row k="Budget" v={budgetLabel(l.answers.budget)} />
                      <Row k="Suggested" v={`${products.map((p) => p.name).join(" + ") || "–"} (${new Intl.NumberFormat("en-US").format(l.result.total)} IQD)`} />
                    </dl>
                    <div className="flex flex-col gap-2">
                      <label className="text-[13.5px] font-semibold" htmlFor={`n-${l.id}`}>Notes (only you see these)</label>
                      <textarea
                        id={`n-${l.id}`}
                        defaultValue={l.notes}
                        onBlur={(e) => e.target.value !== l.notes && update(l, { notes: e.target.value })}
                        rows={4}
                        placeholder="e.g. Ordered whey, check in after 30 days"
                        className={inputCls}
                      />
                      <div className="flex flex-wrap gap-2">
                        <a href={`/r/${l.id}`} target="_blank" className={btn.ghost}><Icon name="eye" size={17} /> See their result</a>
                        <button onClick={() => remove(l)} className={btn.danger}><Icon name="trash" size={17} /> Delete</button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

const Row = ({ k, v }) => (
  <div className="flex justify-between gap-4 border-b border-mist pb-2">
    <dt className="text-muted">{k}</dt>
    <dd className="text-end font-medium">{v}</dd>
  </div>
);
