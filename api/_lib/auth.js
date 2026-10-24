/**
 * ADMIN LOGIN
 * One password, set as ADMIN_PASSWORD on Vercel. Locally it defaults to "karrada-admin".
 * Changing the password signs everyone out (the password is also the signing key).
 */
import { createHmac, timingSafeEqual } from "node:crypto";

const DAYS = 14;

function password() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  return process.env.VERCEL ? null : "karrada-admin";
}

const sign = (value) => createHmac("sha256", `kg:${password()}`).update(value).digest("hex");

export function login(input) {
  const pw = password();
  if (!pw) return { error: "Set ADMIN_PASSWORD in Vercel → Settings → Environment Variables, then redeploy." };
  const a = Buffer.from(String(input ?? ""));
  const b = Buffer.from(pw);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return { error: "That password is incorrect." };
  const exp = String(Date.now() + DAYS * 864e5);
  return { token: `${exp}.${sign(exp)}` };
}

export function isAdmin(req) {
  const pw = password();
  const token = (req.headers.authorization ?? "").replace(/^Bearer\s+/i, "");
  const [exp, sig] = token.split(".");
  if (!pw || !exp || !sig || Number(exp) < Date.now()) return false;
  const expected = sign(exp);
  return sig.length === expected.length && timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}
