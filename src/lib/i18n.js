/**
 * WEBSITE WORDS in English, Arabic and Kurdish (Sorani).
 * Headline, intro and quiz wording are editable in the admin; these are the fixed interface words.
 */

export const LANGS = ["en", "ar", "ku"];
export const LANG_NAME = { en: "English", ar: "العربية", ku: "کوردی" };
export const isRtl = (l) => l === "ar" || l === "ku";

/** Pick the right language from a {en, ar, ku} object, falling back to English. */
export const pick = (obj, l) => (obj && (obj[l] || obj.en || obj.ar || obj.ku)) || "";

export const iqd = (n, l) => `${new Intl.NumberFormat("en-US").format(n)} ${l === "en" ? "IQD" : "د.ع"}`;
export const fmt = (n) => new Intl.NumberFormat("en-US").format(n);

const W = {
  nav_how: { en: "How it works", ar: "كيف يعمل", ku: "چۆن کار دەکات" },
  nav_goals: { en: "Goals", ar: "الأهداف", ku: "ئامانجەکان" },
  nav_shop: { en: "Shop", ar: "المتجر", ku: "فرۆشگا" },
  cta_start: { en: "Find my stack", ar: "اكتشف تركيبتي", ku: "تێکەڵەکەم بدۆزەوە" },
  cta_short: { en: "Start the quiz", ar: "ابدأ الاختبار", ku: "دەست پێبکە" },
  hero_side: { en: "Your result is in the formula", ar: "نتيجتك تبدأ من التركيبة الصحيحة", ku: "ئەنجامەکەت لە تێکەڵە دروستەکەدایە" },
  quiz_time: { en: "5 taps, under a minute", ar: "٥ نقرات، أقل من دقيقة", ku: "٥ کرتە، کەمتر لە خولەکێک" },
  statement: {
    en: "Walking into a supplement store shouldn't feel like an exam. Tell us your goal, your body and your budget. We'll tell you exactly what to take, when to take it, and what to skip.",
    ar: "دخولك لمحل المكملات لازم ما يكون مثل الامتحان. خبرنا عن هدفك وجسمك وميزانيتك، ونحن نقلك بالضبط شنو تاخذ، ومتى تاخذه، وشنو تتجنب.",
    ku: "چوونە ناو دوکانی تەواوکەرەکان نابێت وەک تاقیکردنەوە بێت. باسی ئامانج و جەستە و بودجەکەتمان بۆ بکە. ئێمە پێت دەڵێین ڕێک چی بخۆیت، کەی بیخۆیت، و چی نەخۆیت.",
  },
  goals_title: { en: "Start from your goal", ar: "ابدأ من هدفك", ku: "لە ئامانجەکەتەوە دەست پێبکە" },
  how_title: { en: "How it works", ar: "كيف يعمل", ku: "چۆن کار دەکات" },
  how_1_t: { en: "Tap 5 answers", ar: "اختر ٥ إجابات", ku: "٥ وەڵام هەڵبژێرە" },
  how_1_d: { en: "Your goal, body, training, what to avoid and budget. Under a minute.", ar: "هدفك، جسمك، تمرينك، شنو تتجنب وميزانيتك. أقل من دقيقة.", ku: "ئامانج، جەستە، ڕاهێنان، چی دوور بخەینەوە و بودجە. کەمتر لە خولەکێک." },
  how_2_t: { en: "Get your match", ar: "استلم اختيارك", ku: "هەڵبژاردنەکەت وەربگرە" },
  how_2_d: { en: "One product or a full combo, only what you actually need, with when to take it.", ar: "منتج واحد أو تركيبة كاملة، فقط اللي تحتاجه فعلاً، ومتى تاخذه.", ku: "یەک بەرهەم یان تێکەڵەیەکی تەواو، تەنها ئەوەی پێویستتە، لەگەڵ کاتی خواردنی." },
  how_3_t: { en: "Order in one message", ar: "اطلب برسالة واحدة", ku: "بە یەک نامە داوای بکە" },
  how_3_d: { en: "Send it to us on WhatsApp. Cash on delivery, original products.", ar: "ابعثها لنا على واتساب. الدفع عند الاستلام، ومنتجات أصلية.", ku: "لە واتسئەپ بۆمانی بنێرە. پارەدان لە کاتی گەیاندن، بەرهەمی ئەسڵی." },
  trust_1: { en: "100% original products", ar: "منتجات أصلية ١٠٠٪", ku: "بەرهەمی ١٠٠٪ ئەسڵی" },
  trust_2: { en: "Cash on delivery", ar: "الدفع عند الاستلام", ku: "پارەدان لە کاتی گەیاندن" },
  trust_3: { en: "Easy returns", ar: "استرجاع سهل", ku: "گەڕاندنەوەی ئاسان" },
  trust_4: { en: "Real people on support", ar: "فريق دعم حقيقي", ku: "تیمی پشتگیری ڕاستەقینە" },
  final_title: { en: "One minute from now, you'll know exactly what to take.", ar: "بعد دقيقة، راح تعرف بالضبط شنو تاخذ.", ku: "خولەکێکی تر، ڕێک دەزانیت چی بخۆیت." },
  footer_note: {
    en: "Recommendations are general guidance, not medical advice. Check with a doctor if you have a medical condition.",
    ar: "التوصيات إرشادات عامة وليست نصيحة طبية. راجع الطبيب إذا كانت لديك حالة صحية.",
    ku: "پێشنیارەکان ڕێنمایی گشتین، ئامۆژگاری پزیشکی نین. ئەگەر کێشەیەکی تەندروستیت هەیە سەردانی پزیشک بکە.",
  },
  // quiz
  q_next: { en: "Next", ar: "التالي", ku: "دواتر" },
  q_back: { en: "Back", ar: "رجوع", ku: "گەڕانەوە" },
  q_last: { en: "Last step", ar: "آخر خطوة", ku: "دوا هەنگاو" },
  q_select_all: { en: "Tap all that apply", ar: "اختر كل ما ينطبق", ku: "هەموو ئەوانەی دەگونجێن هەڵبژێرە" },
  q_man: { en: "Man", ar: "رجل", ku: "پیاو" },
  q_woman: { en: "Woman", ar: "امرأة", ku: "ئافرەت" },
  q_age: { en: "Age", ar: "العمر", ku: "تەمەن" },
  q_height: { en: "Height", ar: "الطول", ku: "باڵا" },
  q_weight: { en: "Weight", ar: "الوزن", ku: "کێش" },
  q_years: { en: "years", ar: "سنة", ku: "ساڵ" },
  q_cm: { en: "cm", ar: "سم", ku: "سم" },
  q_kg: { en: "kg", ar: "كغ", ku: "کگ" },
  q_body_err: {
    en: "Pick man or woman, then enter age (12–80), height (120–230 cm) and weight (30–250 kg).",
    ar: "اختر رجل أو امرأة، ثم أدخل العمر (١٢–٨٠) والطول (١٢٠–٢٣٠ سم) والوزن (٣٠–٢٥٠ كغ).",
    ku: "پیاو یان ئافرەت هەڵبژێرە، پاشان تەمەن (١٢–٨٠)، باڵا (١٢٠–٢٣٠ سم) و کێش (٣٠–٢٥٠ کگ) بنووسە.",
  },
  c_title: { en: "Your match is ready", ar: "اختيارك جاهز", ku: "هەڵبژاردنەکەت ئامادەیە" },
  c_sub: { en: "Add your name and WhatsApp to see it now. We'll send you a copy to keep.", ar: "اكتب اسمك ورقم الواتساب حتى تشوفه هسة. وراح نرسل لك نسخة.", ku: "ناو و ژمارەی واتسئەپەکەت بنووسە بۆ ئەوەی ئێستا بیبینیت. کۆپییەکیشت بۆ دەنێرین." },
  c_match_one: { en: "1 product matched to you", ar: "منتج واحد مناسب لك", ku: "١ بەرهەم بۆت گونجاوە" },
  c_match_many: { en: "{n} products matched to you", ar: "{n} منتجات مناسبة لك", ku: "{n} بەرهەم بۆت گونجاون" },
  c_name: { en: "Full name", ar: "الاسم الكامل", ku: "ناوی تەواو" },
  c_phone: { en: "WhatsApp number", ar: "رقم الواتساب", ku: "ژمارەی واتسئەپ" },
  c_email: { en: "Email (optional)", ar: "البريد الإلكتروني (اختياري)", ku: "ئیمەیڵ (ئارەزوومەندانە)" },
  c_city: { en: "City (optional)", ar: "المدينة (اختياري)", ku: "شار (ئارەزوومەندانە)" },
  c_consent: {
    en: "Send me training tips, restock alerts and member offers on WhatsApp and email. Unsubscribe any time.",
    ar: "أرسلوا لي نصائح التمرين وتنبيهات توفر المنتجات والعروض على الواتساب والبريد. يمكنني إلغاء الاشتراك في أي وقت.",
    ku: "ئامۆژگاری ڕاهێنان، ئاگادارکردنەوەی گەڕانەوەی بەرهەم و ئۆفەرەکانم بۆ بنێرن لە واتسئەپ و ئیمەیڵ. هەر کاتێک دەتوانم وازی لێبهێنم.",
  },
  c_submit: { en: "Show my match", ar: "اعرض اختياري", ku: "هەڵبژاردنەکەم پیشان بدە" },
  c_privacy: { en: "We only use your details to send your plan and orders. Never shared.", ar: "نستخدم بياناتك فقط لإرسال خطتك وطلباتك. لا نشاركها أبداً.", ku: "زانیارییەکانت تەنها بۆ ناردنی پلان و داواکارییەکانت بەکاردێن. هەرگیز هاوبەش ناکرێن." },
  c_err_name: { en: "Enter your full name", ar: "أدخل اسمك الكامل", ku: "ناوی تەواوت بنووسە" },
  c_err_phone: { en: "Enter a valid Iraqi mobile, e.g. 0770 123 4567", ar: "أدخل رقم موبايل عراقي صحيح، مثل 0770 123 4567", ku: "ژمارەیەکی دروستی عێراقی بنووسە، وەک 0770 123 4567" },
  c_err_email: { en: "That email doesn't look right", ar: "البريد الإلكتروني غير صحيح", ku: "ئیمەیڵەکە دروست نییە" },
  c_err_net: { en: "Couldn't reach the server. Check your connection and try again.", ar: "تعذر الاتصال. تحقق من الإنترنت وحاول مرة أخرى.", ku: "پەیوەندی نەکرا. ئینتەرنێتەکەت بپشکنە و دووبارە هەوڵ بدەرەوە." },
  a_1: { en: "Calculating your targets", ar: "نحسب احتياجك", ku: "پێویستییەکانت دەژمێرین" },
  a_2: { en: "Matching products to your goal", ar: "نطابق المنتجات مع هدفك", ku: "بەرهەمەکان لەگەڵ ئامانجەکەت دەگونجێنین" },
  a_3: { en: "Fitting it to your budget", ar: "نضبطها حسب ميزانيتك", ku: "لەگەڵ بودجەکەتی ڕێکدەخەین" },
  // result
  r_daily: { en: "Your daily targets", ar: "أهدافك اليومية", ku: "ئامانجە ڕۆژانەکانت" },
  r_kcal: { en: "kcal / day", ar: "سعرة / يوم", ku: "کالۆری / ڕۆژ" },
  r_protein: { en: "g protein", ar: "غ بروتين", ku: "گ پرۆتین" },
  r_water: { en: "L water", ar: "لتر ماء", ku: "لیتر ئاو" },
  r_why: { en: "Why you", ar: "ليش إلك", ku: "بۆچی بۆ تۆ" },
  r_when: { en: "When", ar: "متى", ku: "کەی" },
  r_core: { en: "Your core", ar: "الأساس", ku: "بنەڕەت" },
  r_boost: { en: "Your boost", ar: "التعزيز", ku: "بەهێزکەر" },
  r_support: { en: "Support", ar: "دعم", ku: "پاڵپشت" },
  r_total: { en: "Total", ar: "المجموع", ku: "کۆی گشتی" },
  r_order: { en: "Order on WhatsApp", ar: "اطلب عبر واتساب", ku: "لە واتسئەپ داوا بکە" },
  r_view: { en: "View in store", ar: "شوف بالمتجر", ku: "لە فرۆشگا ببینە" },
  r_copy: { en: "Copy", ar: "نسخ", ku: "کۆپی" },
  r_copied: { en: "Copied", ar: "تم النسخ", ku: "کۆپی کرا" },
  r_share: { en: "Share my result", ar: "شارك نتيجتي", ku: "ئەنجامەکەم بڵاو بکەرەوە" },
  r_retake: { en: "Retake the quiz", ar: "أعد الاختبار", ku: "دووبارە تاقیکردنەوە" },
  r_code: { en: "Code", ar: "الكود", ku: "کۆد" },
  r_single_note: { en: "One product is all you need right now. Add more later as you progress.", ar: "منتج واحد يكفيك هسة. تقدر تضيف أكثر لاحقاً مع تقدمك.", ku: "ئێستا یەک بەرهەم بەسە. دواتر کە پێشکەوتیت دەتوانیت زیاتر زیاد بکەیت." },
  r_combo_note: { en: "These {n} work together, each covers a different part of your goal.", ar: "هذه الـ{n} تشتغل سوية، كل واحد يغطي جزء مختلف من هدفك.", ku: "ئەم {n}ـە پێکەوە کار دەکەن، هەریەکەیان بەشێکی جیاوازی ئامانجەکەت دادەپۆشێت." },
  r_medical: {
    en: "You mentioned a health consideration, so we kept it to one gentle product and left out stimulants. Please show this to your doctor before starting.",
    ar: "ذكرت حالة صحية، لذلك اكتفينا بمنتج واحد خفيف واستبعدنا المنبهات. يرجى عرض هذا على طبيبك قبل البدء.",
    ku: "باسی بارێکی تەندروستیت کرد، بۆیە تەنها یەک بەرهەمی سووکمان هەڵبژارد و وزەبەخشەکانمان لابرد. تکایە پێش دەستپێکردن پیشانی پزیشکەکەت بدە.",
  },
  r_minor: {
    en: "Because you're under 18, we only suggest food-based basics. Real food, sleep and consistent training do most of the work.",
    ar: "لأن عمرك أقل من ١٨، نقترح فقط الأساسيات الغذائية. الأكل الصحي والنوم والتمرين المنتظم يسوون أغلب الشغل.",
    ku: "لەبەر ئەوەی تەمەنت لە خوار ١٨ ساڵە، تەنها بنەماکانی خۆراک پێشنیار دەکەین. خواردن، خەو و ڕاهێنانی بەردەوام زۆربەی کارەکە دەکەن.",
  },
  r_empty: { en: "Your answers point to food first. Message us and a coach will build your plan by hand.", ar: "إجاباتك تشير إلى أن الأكل أولاً. راسلنا وراح يبني لك مدرب خطتك.", ku: "وەڵامەکانت دەڵێن یەکەم خۆراک. نامەمان بۆ بنێرە و ڕاهێنەرێک پلانەکەت دادەڕێژێت." },
  r_missing: { en: "We couldn't find that result.", ar: "ما لقينا هذه النتيجة.", ku: "ئەو ئەنجامە نەدۆزرایەوە." },
  wa_intro: { en: "Hi Karrada! I'd like to order", ar: "مرحبا كرادة! أريد أطلب", ku: "سڵاو کەڕادە! دەمەوێت داوا بکەم" },
  wa_ref: { en: "Ref", ar: "رقم المرجع", ku: "ژمارەی ئاماژە" },
  loading: { en: "Loading", ar: "جاري التحميل", ku: "بارکردن" },
};

export const t = (key, l) => pick(W[key], l);
export const fillN = (s, n) => s.replace("{n}", String(n));

export const STACK_NAME = {
  gain: { en: "Mass Builder", ar: "بناء الكتلة", ku: "بنیاتنانی کێش" },
  lose: { en: "Lean Cut", ar: "التنشيف", ku: "ڕەقکردنەوە" },
  muscle: { en: "Lean Muscle", ar: "العضل الصافي", ku: "ماسولکەی پاک" },
  energy: { en: "Performance", ar: "الأداء العالي", ku: "توانای بەرز" },
  recovery: { en: "Fast Recovery", ar: "الاستشفاء السريع", ku: "چاکبوونەوەی خێرا" },
  health: { en: "Everyday Wellness", ar: "الصحة اليومية", ku: "تەندروستی ڕۆژانە" },
};

/** "Shakar, / here's your / Lean Cut stack." in natural word order per language. */
export function resultHeadline(l, first, stack, single) {
  if (single) {
    if (l === "ar") return [`${first}،`, "هذا اختيارك", `لـ${stack}.`];
    if (l === "ku") return [`${first}،`, "ئەمە هەڵبژاردەی", `${stack}ی تۆیە.`];
    return [`${first},`, "here's your", `${stack} pick.`];
  }
  if (l === "ar") return [`${first}،`, "هذه تركيبة", `${stack} الخاصة بك.`];
  if (l === "ku") return [`${first}،`, "ئەمە تێکەڵەی", `${stack}ی تۆیە.`];
  return [`${first},`, "here's your", `${stack} stack.`];
}
