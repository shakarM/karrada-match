/**
 * POST /api/admin  { action, ...data }
 * One endpoint for everything the dashboard does. Every action except "login" needs the admin token.
 */
import { isAdmin, login } from "./_lib/auth.js";
import { deleteLead, getContent, listLeads, saveContent, storageInfo, updateLead } from "./_lib/store.js";

const STATUSES = ["new", "contacted", "ordered", "loyal", "lost"];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { action, ...data } = req.body ?? {};

  if (action === "login") {
    const r = login(data.password);
    return res.status(r.error ? 401 : 200).json(r);
  }
  if (!isAdmin(req)) return res.status(401).json({ error: "Please sign in again." });

  try {
    switch (action) {
      case "load":
        return res.status(200).json({ content: await getContent(), leads: await listLeads(), storage: storageInfo() });

      case "saveContent":
        if (!data.content?.settings || !Array.isArray(data.content?.products)) throw new Error("Nothing to save");
        await saveContent(data.content);
        return res.status(200).json({ ok: true });

      case "updateLead": {
        const patch = {};
        if (STATUSES.includes(data.status)) patch.status = data.status;
        if (typeof data.notes === "string") patch.notes = data.notes.slice(0, 4000);
        await updateLead(String(data.id), patch);
        return res.status(200).json({ ok: true });
      }

      case "deleteLead":
        await deleteLead(String(data.id));
        return res.status(200).json({ ok: true });

      case "upload": {
        // data.image is a data URL (the dashboard shrinks photos before sending)
        const match = /^data:(image\/(png|jpeg|webp|gif|svg\+xml));base64,(.+)$/.exec(data.image ?? "");
        if (!match) throw new Error("Please choose a PNG, JPG or WEBP image.");
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
          if (process.env.VERCEL) throw new Error("Photo storage isn't connected. In Vercel open Storage → Create → Blob and connect it to this project.");
          return res.status(200).json({ url: data.image }); // local: keep the image inside the data file
        }
        const { put } = await import("@vercel/blob");
        const ext = { png: "png", jpeg: "jpg", webp: "webp", gif: "gif", "svg+xml": "svg" }[match[2]];
        const safe = String(data.name ?? "image").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40) || "image";
        const blob = await put(`karrada/${safe}.${ext}`, Buffer.from(match[3], "base64"), {
          access: "public",
          contentType: match[1],
          addRandomSuffix: true,
        });
        return res.status(200).json({ url: blob.url });
      }

      default:
        return res.status(400).json({ error: "Unknown action" });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

