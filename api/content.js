/** GET /api/content → everything the public site needs (texts, quiz, visible products, settings). */
import { getContent } from "./_lib/store.js";

export default async function handler(req, res) {
  const content = await getContent();
  content.products = content.products.filter((p) => p.visible);
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=30, stale-while-revalidate=300");
  res.status(200).json(content);
}
