/** PRODUCTS: photos, prices, stock, and which quiz goals each product is suggested for. */
import { useState } from "react";
import { CATEGORIES, DEFAULT_QUIZ, GOALS } from "../lib/defaults.js";
import { pick } from "../lib/i18n.js";
import { ProductImage } from "../components/Site.jsx";
import { btn, Card, Chip, Drawer, Field, Guide, Icon, inputCls, LangTabs, SectionTitle, Switch, T3Field, Text, ImageDrop } from "./ui.jsx";

const goalName = (g) => pick(DEFAULT_QUIZ.goal.options[g].label, "en");
const catName = (c) => pick(CATEGORIES[c]?.label, "en");

export default function Products({ draft, setDraft }) {
  const [editing, setEditing] = useState(null); // product id
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const products = draft.products;

  const setProducts = (fn) => setDraft((d) => ({ ...d, products: fn(d.products) }));
  const patch = (id, change) => setProducts((ps) => ps.map((p) => (p.id === id ? { ...p, ...change } : p)));

  const add = () => {
    const id = `p-${Date.now().toString(36)}`;
    setProducts((ps) => [
      { id, name: "", brand: "", category: "protein", price: 0, oldPrice: null, image: "", url: "", goals: [], caffeine: false, menOnly: false, advanced: false, featured: false, inStock: true, visible: true, desc: {}, how: {} },
      ...ps,
    ]);
    setEditing(id);
  };

  const filters = [
    { id: "all", label: "All", test: () => true },
    { id: "photo", label: "Missing photo", test: (p) => !p.image },
    { id: "out", label: "Out of stock", test: (p) => !p.inStock },
    { id: "nogoal", label: "No goal ticked", test: (p) => !p.goals?.length },
    { id: "hidden", label: "Hidden", test: (p) => !p.visible },
  ];
  const q = query.trim().toLowerCase();
  const shown = products.filter((p) => filters.find((f) => f.id === filter).test(p) && (!q || `${p.name} ${p.brand}`.toLowerCase().includes(q)));
  const current = products.find((p) => p.id === editing);

  return (
    <>
      <SectionTitle
        title="Products"
        intro="The quiz picks from these. Keep photos, prices and stock up to date, and tick the goals each product is good for."
        actions={<button onClick={add} className={btn.primary}><Icon name="plus" size={18} /> Add a product</button>}
      />
      <Guide
        id="products"
        steps={[
          "Click any product card to open it.",
          "Add a photo: drag it into the box or press “Upload photo”. Square photos on a white background look best.",
          "Tick “Suggest for” goals. The quiz only suggests a product for the goals you tick.",
          "Press “Save changes” at the bottom of the screen. Your edits go live straight away.",
        ]}
        tip="Sold out? Switch “In stock” off on the card. The quiz stops suggesting it immediately (after you save)."
      />

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Icon name="search" size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" className={`${inputCls} pl-10`} />
        </div>
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto">
          {filters.map((f) => (
            <button key={f.id} onClick={() => setFilter(f.id)} className={`shrink-0 rounded-full px-3.5 py-2 text-[13.5px] font-semibold ${filter === f.id ? "bg-ink text-white" : "bg-white hover:bg-line"}`}>
              {f.label} <span className="opacity-60">{products.filter(f.test).length}</span>
            </button>
          ))}
        </div>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((p) => (
          <li key={p.id} className={`flex flex-col overflow-hidden rounded-[22px] border border-line bg-white ${p.visible ? "" : "opacity-60"}`}>
            <button onClick={() => setEditing(p.id)} className="group flex flex-1 gap-4 p-4 text-start">
              <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[14px] bg-mist p-1.5">
                <ProductImage p={p} />
                {!p.image && <span className="absolute inset-x-1 bottom-1 rounded-full bg-ember px-1 py-0.5 text-center text-[10px] font-bold">Add photo</span>}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] text-muted">{p.brand || "No brand"} · {catName(p.category)}</span>
                <span className="block text-[15.5px] font-semibold leading-snug group-hover:underline">{p.name || "Untitled product"}</span>
                <span className="mt-1 block text-[14px] font-semibold">{new Intl.NumberFormat("en-US").format(p.price)} IQD</span>
                <span className="mt-2 flex flex-wrap gap-1">
                  {p.goals?.length ? p.goals.map((g) => <span key={g} className="rounded-md bg-lilac-soft px-1.5 py-0.5 text-[11px] font-semibold text-plum">{goalName(g)}</span>) : <span className="rounded-md bg-[#fff1e3] px-1.5 py-0.5 text-[11px] font-semibold text-[#9a4a05]">No goal ticked: never suggested</span>}
                </span>
              </span>
            </button>
            <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
              <Switch checked={p.inStock} onChange={(v) => patch(p.id, { inStock: v })} label={p.inStock ? "In stock" : "Out of stock"} />
              <button onClick={() => setEditing(p.id)} className="text-[13.5px] font-semibold text-plum hover:underline">Edit</button>
            </div>
          </li>
        ))}
      </ul>
      {!shown.length && <p className="rounded-[22px] border border-dashed border-line bg-white p-10 text-center text-muted">No products here.</p>}

      <Drawer
        open={!!current}
        onClose={() => setEditing(null)}
        title={current?.name || "New product"}
        footer={
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => {
                if (!confirm("Delete this product? It disappears from the website after you save.")) return;
                setProducts((ps) => ps.filter((p) => p.id !== current.id));
                setEditing(null);
              }}
              className={btn.danger}
            >
              <Icon name="trash" size={17} /> Delete
            </button>
            <button onClick={() => setEditing(null)} className={btn.primary}>Done</button>
          </div>
        }
      >
        {current && <ProductForm p={current} set={(change) => patch(current.id, change)} />}
      </Drawer>
    </>
  );
}

function ProductForm({ p, set }) {
  const [lang, setLang] = useState("en");
  const cat = CATEGORIES[p.category] ?? CATEGORIES.protein;
  const toggleGoal = (g) => set({ goals: p.goals?.includes(g) ? p.goals.filter((x) => x !== g) : [...(p.goals ?? []), g] });

  return (
    <div className="flex flex-col gap-4">
      <p className="rounded-[14px] bg-lilac-soft px-4 py-3 text-[13.5px] text-plum">
        Changes are kept while you edit. Press <b>Done</b>, then <b>Save changes</b> at the bottom of the page to publish.
      </p>

      <Card title="1. Photo">
        <ImageDrop value={p.image} onChange={(image) => set({ image })} name={p.name} tip="Square, on a white or plain background. PNG, JPG or WEBP." />
      </Card>

      <Card title="2. Basics">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Product name"><Text value={p.name} onChange={(name) => set({ name })} placeholder="e.g. Gold Standard 100% Whey" /></Field>
          <Field label="Brand"><Text value={p.brand} onChange={(brand) => set({ brand })} placeholder="e.g. Optimum Nutrition" /></Field>
          <Field label="Price (IQD)" hint="Numbers only, e.g. 54000">
            <input type="number" min={0} step={500} value={p.price || ""} onChange={(e) => set({ price: Number(e.target.value) || 0 })} className={inputCls} />
          </Field>
          <Field label="Old price (optional)" hint="Shown crossed out to show a discount">
            <input type="number" min={0} step={500} value={p.oldPrice || ""} onChange={(e) => set({ oldPrice: Number(e.target.value) || null })} className={inputCls} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Link to this product in your online store" hint="Copy it from the browser's address bar on the product page.">
              <Text value={p.url} onChange={(url) => set({ url })} placeholder="https://karradagroup.com/products/…" dir="ltr" />
            </Field>
          </div>
        </div>
      </Card>

      <Card title="3. When should the quiz suggest it?" hint="Pick what kind of product it is, then tick every goal it helps with.">
        <Field label="Product type">
          <select value={p.category} onChange={(e) => set({ category: e.target.value })} className={inputCls}>
            {Object.keys(CATEGORIES).map((c) => <option key={c} value={c}>{catName(c)}</option>)}
          </select>
        </Field>
        <p className="mb-2 mt-4 text-[13.5px] font-semibold">Suggest for these goals</p>
        <div className="flex flex-wrap gap-2">
          {GOALS.map((g) => <Chip key={g} on={p.goals?.includes(g)} onClick={() => toggleGoal(g)}>{goalName(g)}</Chip>)}
        </div>
        {!p.goals?.length && <p className="mt-2 text-[13px] text-[#9a4a05]">No goal ticked, so the quiz will never suggest this product (fine for gear like belts).</p>}
      </Card>

      <Card title="4. Safety" hint="Keeps suggestions safe. Switch on whatever is true for this product.">
        <div className="flex flex-col gap-4">
          <Switch checked={p.caffeine} onChange={(caffeine) => set({ caffeine })} label="Contains caffeine or stimulants" hint="Hidden for people avoiding caffeine, with heart conditions, pregnant, or under 18." />
          <Switch checked={p.menOnly} onChange={(menOnly) => set({ menOnly })} label="For men only" hint="Hidden for women and under-18s (e.g. testosterone boosters)." />
          <Switch checked={p.advanced} onChange={(advanced) => set({ advanced })} label="For experienced people only" hint="Hidden for beginners and under-18s (e.g. very strong pre-workouts)." />
        </div>
      </Card>

      <Card title="5. Show on the website">
        <div className="flex flex-col gap-4">
          <Switch checked={p.inStock} onChange={(inStock) => set({ inStock })} label="In stock" hint="Out-of-stock products are never suggested." />
          <Switch checked={p.visible} onChange={(visible) => set({ visible })} label="Show this product" hint="Switch off to hide it completely without deleting it." />
          <Switch checked={p.featured} onChange={(featured) => set({ featured })} label="Bestseller" hint="Gets picked first when two products fit equally well." />
        </div>
      </Card>

      <Card title="6. Words on the result page (optional)" hint="Leave empty to use the standard text for this product type, shown in grey." actions={<LangTabs value={lang} onChange={setLang} />}>
        <div className="flex flex-col gap-4">
          <T3Field label="What it does" lang={lang} value={p.desc} onChange={(desc) => set({ desc })} multiline rows={3} placeholder={cat.desc} badge={false} />
          <T3Field label="How to take it" lang={lang} value={p.how} onChange={(how) => set({ how })} placeholder={cat.how} badge={false} />
        </div>
      </Card>
    </div>
  );
}
