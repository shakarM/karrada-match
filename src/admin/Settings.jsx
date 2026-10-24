/** SETTINGS: brand, WhatsApp number, store link, number of products, tracking, publishing help. */
import { DEFAULT_SETTINGS } from "../lib/defaults.js";
import { normalizePhone, prettyPhone, waLink } from "../lib/phone.js";
import { btn, Card, Field, Guide, Icon, ImageDrop, inputCls, SectionTitle, Text } from "./ui.jsx";

export default function Settings({ draft, setDraft }) {
  const s = draft.settings;
  const set = (change) => setDraft((d) => ({ ...d, settings: { ...d.settings, ...change } }));
  const phone = normalizePhone(s.whatsapp);
  const placeholder = s.whatsapp === DEFAULT_SETTINGS.whatsapp;

  return (
    <>
      <SectionTitle title="Settings" intro="The basics of your website. Most of this you set once." />
      <Guide
        id="settings"
        steps={[
          "Set the WhatsApp number that receives orders. This is the most important setting.",
          "Upload your logo (optional). Without one, the name is shown with a small capsule mark.",
          "Check the link to your online store.",
          "Press “Save changes” at the bottom.",
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-2">
        <Card title="Orders on WhatsApp" hint="Customers' order messages go to this number.">
          <Field label="WhatsApp number" hint="Any format works: 0770 123 4567, +964 770 123 4567…">
            <input
              value={s.whatsapp}
              onChange={(e) => set({ whatsapp: e.target.value })}
              onBlur={(e) => {
                const n = normalizePhone(e.target.value);
                if (n) set({ whatsapp: n });
              }}
              dir="ltr"
              className={`${inputCls} ${placeholder ? "border-ember" : ""}`}
            />
          </Field>
          {placeholder && <p className="mt-2 rounded-[12px] bg-[#fff1e3] px-3 py-2 text-[13px] font-medium text-[#9a4a05]">This is a placeholder. Put your real number here before sharing the site.</p>}
          {phone && !placeholder && (
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="text-[14px]">Orders go to <b dir="ltr">{prettyPhone(phone)}</b></span>
              <a href={waLink(phone, "Test from the Karrada website")} target="_blank" rel="noopener" className={btn.wa}><Icon name="whatsapp" size={17} /> Send a test</a>
            </div>
          )}
          {!phone && !placeholder && s.whatsapp && <p className="mt-2 text-[13px] text-danger">That doesn't look like a phone number.</p>}
        </Card>

        <Card title="Brand">
          <div className="flex flex-col gap-4">
            <Field label="Brand name"><Text value={s.brandName} onChange={(brandName) => set({ brandName })} /></Field>
            <div>
              <p className="mb-1.5 text-[13.5px] font-semibold">Logo (optional)</p>
              <ImageDrop value={s.logo} onChange={(logo) => set({ logo })} name="logo" square={false} tip="A wide logo on a transparent background (PNG or SVG) looks best." />
            </div>
          </div>
        </Card>

        <Card title="Online store">
          <Field label="Link to your store" hint="Used for the “Shop” link at the top of the website.">
            <Text value={s.storeUrl} onChange={(storeUrl) => set({ storeUrl })} dir="ltr" />
          </Field>
        </Card>

        <Card title="How many products can one result have?" hint="The quiz picks 1 product or a combo by itself. This is only the upper limit.">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((n) => (
              <button key={n} onClick={() => set({ maxProducts: n })} className={`min-w-[64px] rounded-[14px] border px-4 py-3 text-[16px] font-semibold ${s.maxProducts === n ? "border-plum bg-plum text-white" : "border-line hover:border-ink/40"}`}>
                {n}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[13px] text-muted">Recommended: 4. Beginners are already limited to 2, and anyone with a health condition always gets 1.</p>
        </Card>

        <Card title="Ad tracking (optional)" hint="Lets your Meta, TikTok and Google ads count people who finish the quiz.">
          <div className="flex flex-col gap-4">
            <Field label="Meta (Facebook & Instagram) Pixel ID" hint="Meta Events Manager → Data sources → your pixel → the number under its name.">
              <Text value={s.metaPixel} onChange={(metaPixel) => set({ metaPixel })} placeholder="e.g. 123456789012345" dir="ltr" />
            </Field>
            <Field label="TikTok Pixel ID" hint="TikTok Ads Manager → Assets → Events → Web events.">
              <Text value={s.tiktokPixel} onChange={(tiktokPixel) => set({ tiktokPixel })} placeholder="e.g. C1A2B3C4D5E6F7G8H9" dir="ltr" />
            </Field>
            <Field label="Google Analytics ID" hint="Google Analytics → Admin → Data streams → Measurement ID.">
              <Text value={s.ga4} onChange={(ga4) => set({ ga4 })} placeholder="G-XXXXXXXXXX" dir="ltr" />
            </Field>
          </div>
        </Card>

        <Card title="Putting the site online (Vercel)" hint="One-time setup. Takes about 10 minutes.">
          <ol className="flex flex-col gap-3 text-[14px]">
            {[
              <>Upload this project to GitHub, then in <b>vercel.com</b> press <b>Add New → Project</b> and pick it. Press <b>Deploy</b>.</>,
              <>In the project open <b>Storage → Create Database → Neon</b> and connect it. This keeps leads and your changes.</>,
              <>Still in <b>Storage</b>, create a <b>Blob</b> store and connect it. This keeps product photos.</>,
              <>Open <b>Settings → Environment Variables</b> and add <code className="rounded bg-mist px-1">ADMIN_PASSWORD</code> with a strong password.</>,
              <>Open <b>Deployments</b>, press the three dots on the latest one → <b>Redeploy</b>. Done.</>,
            ].map((t, i) => (
              <li key={i} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lilac text-[13px] font-bold">{i + 1}</span>
                <span className="pt-0.5 leading-relaxed">{t}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </>
  );
}
