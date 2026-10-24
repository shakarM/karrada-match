/** Iraqi phone numbers → international format without "+", e.g. 9647701234567 */
export function normalizePhone(input = "") {
  let d = String(input)
    .replace(/[٠-٩]/g, (c) => "٠١٢٣٤٥٦٧٨٩".indexOf(c))
    .replace(/[۰-۹]/g, (c) => "۰۱۲۳۴۵۶۷۸۹".indexOf(c))
    .replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (/^07\d{9}$/.test(d)) return "964" + d.slice(1);
  if (/^7\d{9}$/.test(d)) return "964" + d;
  if (/^9640?7\d{9}$/.test(d)) return "964" + d.slice(-10);
  if (String(input).trim().startsWith("+") && d.length >= 10 && d.length <= 15) return d;
  return null;
}

export const prettyPhone = (p = "") =>
  /^9647\d{9}$/.test(p) ? `+964 ${p.slice(3, 6)} ${p.slice(6, 9)} ${p.slice(9)}` : `+${p}`;

export const waLink = (phone, text) => `https://wa.me/${String(phone).replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
