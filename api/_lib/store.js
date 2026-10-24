/**
 * DATA STORAGE
 * - Online (Vercel): Postgres via DATABASE_URL (Vercel → Storage → Neon).
 * - On your computer: a simple file at .data/db.json. Nothing to set up.
 */
import { withDefaults } from "../../src/lib/defaults.js";

const online = !!process.env.DATABASE_URL;

/* ---------- Postgres ---------- */
let sqlPromise;
function db() {
  sqlPromise ??= (async () => {
    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.DATABASE_URL);
    await sql`CREATE TABLE IF NOT EXISTS kg_content (id INT PRIMARY KEY, data JSONB NOT NULL, updated_at TIMESTAMPTZ DEFAULT now())`;
    await sql`CREATE TABLE IF NOT EXISTS kg_leads (id TEXT PRIMARY KEY, created_at TIMESTAMPTZ DEFAULT now(), data JSONB NOT NULL)`;
    return sql;
  })().catch((e) => {
    sqlPromise = undefined;
    throw e;
  });
  return sqlPromise;
}

/* ---------- Local file ---------- */
async function readFile() {
  const { readFile } = await import("node:fs/promises");
  try {
    return JSON.parse(await readFile(".data/db.json", "utf8"));
  } catch {
    return { content: null, leads: [] };
  }
}
async function writeFile(data) {
  const fs = await import("node:fs/promises");
  await fs.mkdir(".data", { recursive: true });
  await fs.writeFile(".data/db.json", JSON.stringify(data, null, 2));
}
function assertWritable() {
  if (!online && process.env.VERCEL) {
    throw new Error("No database connected. In Vercel open Storage → Create Database → Neon, connect it to this project, then redeploy.");
  }
}

/* ---------- Content (texts, quiz, products, settings) ---------- */
export async function getContent() {
  if (online) {
    const sql = await db();
    const rows = await sql`SELECT data FROM kg_content WHERE id = 1`;
    return withDefaults(rows[0]?.data);
  }
  return withDefaults((await readFile()).content ?? undefined);
}

export async function saveContent(content) {
  assertWritable();
  if (online) {
    const sql = await db();
    await sql`INSERT INTO kg_content (id, data, updated_at) VALUES (1, ${JSON.stringify(content)}::jsonb, now())
              ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`;
    return;
  }
  const file = await readFile();
  await writeFile({ ...file, content });
}

/* ---------- Leads ---------- */
export async function addLead(lead) {
  assertWritable();
  if (online) {
    const sql = await db();
    await sql`INSERT INTO kg_leads (id, created_at, data) VALUES (${lead.id}, ${lead.createdAt}, ${JSON.stringify(lead)}::jsonb)`;
    return;
  }
  const file = await readFile();
  file.leads.unshift(lead);
  await writeFile(file);
}

export async function getLead(id) {
  if (online) {
    const sql = await db();
    const rows = await sql`SELECT data FROM kg_leads WHERE id = ${id}`;
    return rows[0]?.data ?? null;
  }
  return (await readFile()).leads.find((l) => l.id === id) ?? null;
}

export async function listLeads() {
  if (online) {
    const sql = await db();
    const rows = await sql`SELECT data FROM kg_leads ORDER BY created_at DESC LIMIT 5000`;
    return rows.map((r) => r.data);
  }
  return (await readFile()).leads;
}

export async function updateLead(id, patch) {
  assertWritable();
  if (online) {
    const sql = await db();
    await sql`UPDATE kg_leads SET data = data || ${JSON.stringify(patch)}::jsonb WHERE id = ${id}`;
    return;
  }
  const file = await readFile();
  file.leads = file.leads.map((l) => (l.id === id ? { ...l, ...patch } : l));
  await writeFile(file);
}

export async function deleteLead(id) {
  assertWritable();
  if (online) {
    const sql = await db();
    await sql`DELETE FROM kg_leads WHERE id = ${id}`;
    return;
  }
  const file = await readFile();
  file.leads = file.leads.filter((l) => l.id !== id);
  await writeFile(file);
}

export const storageInfo = () => ({
  database: online ? "connected" : process.env.VERCEL ? "missing" : "local",
  photos: process.env.BLOB_READ_WRITE_TOKEN ? "connected" : process.env.VERCEL ? "missing" : "local",
  password: process.env.ADMIN_PASSWORD ? "set" : "default",
});
