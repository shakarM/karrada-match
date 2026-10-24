/**
 * DEFAULT CONTENT
 * Everything here can be changed from the admin dashboard (/admin).
 * These are only the starting values used before anything is saved.
 */

export const STORE = "https://karradagroup.com";

export const DEFAULT_SETTINGS = {
  brandName: "Karrada Group",
  logo: "",
  whatsapp: "9647700000000", // ⚠ placeholder: change it in Admin → Settings
  storeUrl: STORE,
  maxProducts: 4,
  metaPixel: "",
  tiktokPixel: "",
  ga4: "",
};

export const DEFAULT_TEXTS = {
  heroTitle: { en: "Lift.\nFuel.\nGrow.", ar: "تمرّن.\nتغذّى.\nتطوّر.", ku: "ڕاهێنان.\nخۆراک.\nگەشە." },
  heroSubtitle: {
    en: "Not sure what to take? Five quick taps and you'll know exactly what fits your body, goal and budget.",
    ar: "محتار شنو تاخذ؟ خمس نقرات سريعة وراح تعرف بالضبط شنو يناسب جسمك وهدفك وميزانيتك.",
    ku: "نازانیت چی بخۆیت؟ پێنج کرتەی خێرا و ڕێک دەزانیت چی گونجاوە بۆ جەستە و ئامانج و بودجەکەت.",
  },
  discountCode: "KGFIRST10",
  discountText: { en: "10% off your first order", ar: "خصم ١٠٪ على أول طلب", ku: "١٠٪ داشکاندن بۆ یەکەم داواکاری" },
};

/* ------------------------------------------------------------------ */
/* Product types                                                        */
/* ------------------------------------------------------------------ */

export const CATEGORIES = {
  gainer: {
    label: { en: "Mass gainer", ar: "زيادة الوزن", ku: "زیادکردنی کێش" },
    desc: { en: "Dense, clean calories with protein and carbs in one shake, for people who struggle to eat enough.", ar: "سعرات نظيفة مع بروتين وكاربوهيدرات في شيك واحد، لمن يصعب عليه الأكل بكميات كافية.", ku: "کالۆری پاک لەگەڵ پرۆتین و کاربۆهیدرات لە یەک شەیکدا، بۆ ئەوانەی ناتوانن بەشی پێویست بخۆن." },
    how: { en: "1 shake after training + 1 between meals", ar: "شيك بعد التمرين وآخر بين الوجبات", ku: "شەیکێک دوای ڕاهێنان و یەکێک لە نێوان ژەمەکاندا" },
    why: { en: "Gets you into the calorie surplus you need to grow", ar: "يوصلك لفائض السعرات الذي تحتاجه للنمو", ku: "دەتگەیەنێتە ئەو زیادەی کالۆرییەی کە بۆ گەشەکردن پێویستتە" },
  },
  protein: {
    label: { en: "Protein", ar: "بروتين", ku: "پرۆتین" },
    desc: { en: "Fast-absorbing protein to build and repair muscle, easy to hit your daily target.", ar: "بروتين سريع الامتصاص لبناء العضلات وإصلاحها، ويسهّل الوصول لهدفك اليومي.", ku: "پرۆتینی خێرا هەڵمژراو بۆ دروستکردن و چاککردنەوەی ماسولکە، ئامانجی ڕۆژانەت ئاسان دەکات." },
    how: { en: "1 scoop after training or with breakfast", ar: "سكوب بعد التمرين أو مع الفطور", ku: "سکوپێک دوای ڕاهێنان یان لەگەڵ نانی بەیانی" },
    why: { en: "Makes your daily protein target effortless", ar: "يجعل هدف البروتين اليومي سهلاً", ku: "ئامانجی پرۆتینی ڕۆژانەت ئاسان دەکات" },
  },
  creatine: {
    label: { en: "Creatine", ar: "كرياتين", ku: "کریاتین" },
    desc: { en: "The most researched supplement for strength and power. More reps, more progress.", ar: "أكثر مكمل مدروس علمياً للقوة والطاقة. تكرارات أكثر، تقدم أسرع.", ku: "زۆرترین تەواوکەری لێکۆڵینەوەکراو بۆ هێز. دووبارەکردنەوەی زیاتر، پێشکەوتنی زیاتر." },
    how: { en: "3–5 g every day, any time, with water", ar: "٣–٥ غرام يومياً في أي وقت مع الماء", ku: "٣–٥ گرام هەموو ڕۆژێک، هەر کاتێک، لەگەڵ ئاو" },
    why: { en: "Adds strength fast, so every session counts more", ar: "يزيد القوة بسرعة لتصبح كل جلسة أكثر فائدة", ku: "بە خێرایی هێز زیاد دەکات، هەموو ڕاهێنانێک بەسوودتر دەبێت" },
  },
  preworkout: {
    label: { en: "Pre-workout", ar: "ما قبل التمرين", ku: "پێش ڕاهێنان" },
    desc: { en: "Energy, focus and pump so you show up strong to every session.", ar: "طاقة وتركيز وضخ عضلي لتدخل كل تمرين بقوة.", ku: "وزە و سەرنج و پەمپ بۆ ئەوەی بە هێزەوە بچیتە هەموو ڕاهێنانێک." },
    how: { en: "1 scoop 20–30 min before training", ar: "سكوب قبل التمرين بـ ٢٠–٣٠ دقيقة", ku: "سکوپێک ٢٠–٣٠ خولەک پێش ڕاهێنان" },
    why: { en: "Turns low-energy days into your best sessions", ar: "يحوّل أيام الطاقة المنخفضة إلى أفضل تمارينك", ku: "ڕۆژە کەم‌وزەکان دەکاتە باشترین ڕاهێنانەکانت" },
  },
  fatburner: {
    label: { en: "Fat burner", ar: "حارق دهون", ku: "چەوری‌سووتێنەر" },
    desc: { en: "Supports metabolism and energy while you are in a calorie deficit.", ar: "يدعم الحرق والطاقة أثناء العجز في السعرات.", ku: "پاڵپشتی مێتابۆلیزم و وزە دەکات لە کاتی کەمکردنەوەی کالۆری." },
    how: { en: "Morning, with water. Not after 4 pm", ar: "صباحاً مع الماء، وليس بعد الرابعة عصراً", ku: "بەیانیان لەگەڵ ئاو، دوای کاتژمێر ٤ی ئێوارە نا" },
    why: { en: "Keeps energy up while the fat comes off", ar: "يحافظ على طاقتك بينما تنزل الدهون", ku: "وزەت بەرز دەهێڵێتەوە کاتێک چەوری کەم دەبێتەوە" },
  },
  appetite: {
    label: { en: "Appetite control", ar: "التحكم بالشهية", ku: "کۆنترۆڵی ئارەزوو" },
    desc: { en: "Helps you feel full for longer so sticking to your plan feels easier.", ar: "يساعدك على الشعور بالشبع لفترة أطول ليصبح الالتزام أسهل.", ku: "یارمەتیت دەدات زیاتر تێر بیت، بۆ ئەوەی پابەندبوون بە پلانەکەت ئاسانتر بێت." },
    how: { en: "30 min before your biggest meal", ar: "قبل أكبر وجبة بـ ٣٠ دقيقة", ku: "٣٠ خولەک پێش گەورەترین ژەمت" },
    why: { en: "Quiets cravings so your plan actually sticks", ar: "يهدّئ الرغبة بالأكل لتلتزم بخطتك فعلاً", ku: "ئارەزووی خواردن ئارام دەکاتەوە بۆ ئەوەی پلانەکەت بەردەوام بێت" },
  },
  amino: {
    label: { en: "Amino acids", ar: "أحماض أمينية", ku: "ئەمینۆ ئەسید" },
    desc: { en: "Essential aminos that reduce soreness and keep you training consistently.", ar: "أحماض أمينية أساسية تقلل الألم العضلي وتساعدك على الاستمرار.", ku: "ئەمینۆی سەرەکی کە ئازاری ماسولکە کەم دەکاتەوە و بەردەوامت دەهێڵێتەوە." },
    how: { en: "Sip during training", ar: "اشربه خلال التمرين", ku: "لە کاتی ڕاهێناندا بیخۆرەوە" },
    why: { en: "Less soreness, more training days", ar: "ألم أقل، أيام تمرين أكثر", ku: "ئازاری کەمتر، ڕۆژی ڕاهێنانی زیاتر" },
  },
  carb: {
    label: { en: "Carb fuel", ar: "كاربوهيدرات", ku: "کاربۆهیدرات" },
    desc: { en: "Clean, steady carbs for endurance during training and faster refuelling after.", ar: "كاربوهيدرات نظيفة لتحمل أعلى أثناء التمرين وتعويض أسرع بعده.", ku: "کاربۆهیدراتی پاک بۆ بەرگەگرتن لە کاتی ڕاهێنان و پڕکردنەوەی خێراتر دواتر." },
    how: { en: "During long sessions or right after", ar: "خلال التمارين الطويلة أو بعدها مباشرة", ku: "لە کاتی ڕاهێنانی درێژ یان ڕاستەوخۆ دوای" },
    why: { en: "Steady fuel for harder, longer training", ar: "وقود ثابت لتمارين أقوى وأطول", ku: "سووتەمەنی جێگیر بۆ ڕاهێنانی بەهێزتر و درێژتر" },
  },
  vitamin: {
    label: { en: "Multivitamin", ar: "فيتامينات", ku: "ڤیتامین" },
    desc: { en: "Covers the daily micronutrient gaps that training and busy days create.", ar: "يغطي نقص الفيتامينات والمعادن اليومي الناتج عن التمرين وضغط الحياة.", ku: "کەموکوڕی ڤیتامین و کانزای ڕۆژانە پڕدەکاتەوە کە ڕاهێنان و ژیانی قەرەباڵغ دروستی دەکات." },
    how: { en: "Daily with breakfast", ar: "يومياً مع الفطور", ku: "ڕۆژانە لەگەڵ نانی بەیانی" },
    why: { en: "Fills the gaps your diet might be missing", ar: "يعوّض ما قد ينقص في نظامك الغذائي", ku: "ئەو کەموکوڕیانە پڕدەکاتەوە کە لە خۆراکەکەتدا هەیە" },
  },
  joint: {
    label: { en: "Joint support", ar: "دعم المفاصل", ku: "پاڵپشتی جومگە" },
    desc: { en: "Keeps joints comfortable so you can lift heavy for years, not months.", ar: "يحافظ على راحة المفاصل لتتمرن بأوزان ثقيلة لسنوات لا لأشهر.", ku: "جومگەکانت ئاسوودە دەهێڵێتەوە بۆ ئەوەی بۆ ساڵان قورس هەڵبگریت، نەک بۆ مانگەکان." },
    how: { en: "Daily with a meal", ar: "يومياً مع وجبة", ku: "ڕۆژانە لەگەڵ ژەمێک" },
    why: { en: "Protects the joints you train on", ar: "يحمي المفاصل التي تتمرن عليها", ku: "ئەو جومگانە دەپارێزێت کە ڕاهێنانیان پێدەکەیت" },
  },
  booster: {
    label: { en: "Natural booster", ar: "معزز طبيعي", ku: "بەهێزکەری سروشتی" },
    desc: { en: "Natural support for drive, strength and recovery for experienced lifters.", ar: "دعم طبيعي للحيوية والقوة والاستشفاء للمتمرسين.", ku: "پاڵپشتی سروشتی بۆ وزە و هێز و چاکبوونەوە بۆ وەرزشکارانی بەئەزموون." },
    how: { en: "Daily as directed on the label", ar: "يومياً حسب الإرشادات على العبوة", ku: "ڕۆژانە بەپێی ڕێنمایی سەر قوتووەکە" },
    why: { en: "Extra edge for an experienced lifter", ar: "ميزة إضافية للمتمرس", ku: "هێزێکی زیادە بۆ وەرزشکاری بەئەزموون" },
  },
  accessory: {
    label: { en: "Gear", ar: "إكسسوارات", ku: "کەلوپەل" },
    desc: { en: "Gear that protects your form and lets you lift with confidence.", ar: "معدات تحمي وضعيتك وتمنحك الثقة في الرفع.", ku: "کەلوپەلێک کە شێوازی ڕاهێنانت دەپارێزێت و متمانەت پێدەدات." },
    how: { en: "For your heaviest sets", ar: "للمجموعات الأثقل", ku: "بۆ قورسترین سێتەکانت" },
    why: { en: "Lift heavier with safer form", ar: "ارفع أثقل بوضعية أكثر أماناً", ku: "قورستر هەڵبگرە بە شێوازێکی سەلامەتتر" },
  },
};

/* ------------------------------------------------------------------ */
/* Quiz: the 5 steps. Admin can change the words; the logic stays here. */
/* ------------------------------------------------------------------ */

export const GOALS = ["gain", "lose", "muscle", "energy", "recovery", "health"];

export const DEFAULT_QUIZ = {
  goal: {
    title: { en: "What's your goal?", ar: "شنو هدفك؟", ku: "ئامانجت چییە؟" },
    subtitle: { en: "Pick one. We'll build everything around it.", ar: "اختر واحد، وراح نبني كلشي حوله.", ku: "یەکێک هەڵبژێرە، هەموو شتێکی لەسەر دادەڕێژین." },
    options: {
      gain: { label: { en: "Gain weight", ar: "زيادة الوزن", ku: "زیادکردنی کێش" }, hint: { en: "I'm skinny and can't put on size", ar: "نحيف وما أقدر أزيد", ku: "لاوازم و کێشم زیاد ناکات" } },
      lose: { label: { en: "Lose fat", ar: "خسارة الدهون", ku: "کەمکردنەوەی چەوری" }, hint: { en: "Drop weight, keep the muscle", ar: "أنزل وزن وأحافظ على العضل", ku: "کێش کەم بکەمەوە و ماسولکە بپارێزم" } },
      muscle: { label: { en: "Build muscle", ar: "بناء العضل", ku: "دروستکردنی ماسولکە" }, hint: { en: "Get bigger and more defined", ar: "أكبر وأوضح", ku: "گەورەتر و ڕوونتر" } },
      energy: { label: { en: "More energy", ar: "طاقة أكثر", ku: "وزەی زیاتر" }, hint: { en: "Train harder, stop feeling flat", ar: "أتمرن بقوة بدون خمول", ku: "بە هێزتر ڕاهێنان بکەم، بێ ماندوویی" } },
      recovery: { label: { en: "Recover faster", ar: "استشفاء أسرع", ku: "خێراتر چاکبوونەوە" }, hint: { en: "Less soreness between sessions", ar: "ألم أقل بين التمارين", ku: "ئازاری کەمتر لە نێوان ڕاهێنانەکان" } },
      health: { label: { en: "Stay healthy", ar: "صحة ولياقة", ku: "تەندروستی و لەشجوانی" }, hint: { en: "Feel good, train smart", ar: "أحس بالراحة وأتمرن بذكاء", ku: "هەست بە باشی بکەم و ژیرانە ڕاهێنان بکەم" } },
    },
  },
  body: {
    title: { en: "About you", ar: "عنك", ku: "دەربارەی تۆ" },
    subtitle: { en: "So your calories and protein are exact.", ar: "حتى تكون سعراتك وبروتينك دقيقة.", ku: "بۆ ئەوەی کالۆری و پرۆتینەکەت ورد بێت." },
    options: {},
  },
  level: {
    title: { en: "How do you train?", ar: "شلون تتمرن؟", ku: "چۆن ڕاهێنان دەکەیت؟" },
    subtitle: { en: "Beginners need fewer products than you'd think.", ar: "المبتدئ يحتاج منتجات أقل مما تتوقع.", ku: "سەرەتاکان پێویستیان بە بەرهەمی کەمترە لەوەی بیری لێدەکەیتەوە." },
    options: {
      new: { label: { en: "Just starting", ar: "بديت هسة", ku: "تازە دەستم پێکردووە" }, hint: { en: "1–3 days a week", ar: "١–٣ أيام بالأسبوع", ku: "هەفتەی ١–٣ ڕۆژ" } },
      mid: { label: { en: "Training regularly", ar: "أتمرن بانتظام", ku: "بەردەوام ڕاهێنان دەکەم" }, hint: { en: "3–4 days a week", ar: "٣–٤ أيام بالأسبوع", ku: "هەفتەی ٣–٤ ڕۆژ" } },
      pro: { label: { en: "Training hard", ar: "أتمرن بقوة", ku: "بە توندی ڕاهێنان دەکەم" }, hint: { en: "5+ days a week", ar: "٥ أيام أو أكثر", ku: "هەفتەی ٥ ڕۆژ یان زیاتر" } },
    },
  },
  avoid: {
    title: { en: "Anything to avoid?", ar: "شي لازم نتجنبه؟", ku: "شتێک هەیە دووری بخەینەوە؟" },
    subtitle: { en: "Keeps your picks safe. Tap all that apply.", ar: "حتى تكون اختياراتك آمنة. اختر كل ما ينطبق.", ku: "بۆ ئەوەی هەڵبژاردنەکانت سەلامەت بن. هەموو ئەوانەی دەگونجێن هەڵبژێرە." },
    options: {
      none: { label: { en: "Nothing, I'm good", ar: "لا شي", ku: "هیچ شتێک نییە" } },
      caffeine: { label: { en: "Caffeine", ar: "الكافيين", ku: "کافین" }, hint: { en: "It keeps me up or makes me jittery", ar: "يسهرني أو يوترني", ku: "خەوم لێ دەزڕێنێت یان دەمشڵەژێنێت" } },
      heart: { label: { en: "Heart or blood pressure", ar: "القلب أو الضغط", ku: "دڵ یان پەستانی خوێن" } },
      pregnant: { label: { en: "Pregnant or breastfeeding", ar: "حامل أو مرضعة", ku: "دووگیان یان شیردەر" } },
      meds: { label: { en: "I take regular medication", ar: "آخذ أدوية بانتظام", ku: "بەردەوام دەرمان دەخۆم" } },
    },
  },
  budget: {
    title: { en: "Monthly budget?", ar: "ميزانيتك الشهرية؟", ku: "بودجەی مانگانەت؟" },
    subtitle: { en: "One great product or a full combo, we'll fit it in.", ar: "منتج واحد ممتاز أو تركيبة كاملة، راح نضبطها.", ku: "یەک بەرهەمی نایاب یان تێکەڵەیەکی تەواو، ڕێکی دەخەین." },
    options: {
      b1: { label: { en: "Up to 75,000 IQD", ar: "لغاية ٧٥٬٠٠٠ دينار", ku: "تا ٧٥٬٠٠٠ دینار" }, hint: { en: "Usually one essential product", ar: "عادة منتج أساسي واحد", ku: "زۆرجار یەک بەرهەمی سەرەکی" } },
      b2: { label: { en: "75,000 – 150,000 IQD", ar: "٧٥٬٠٠٠ – ١٥٠٬٠٠٠ دينار", ku: "٧٥٬٠٠٠ – ١٥٠٬٠٠٠ دینار" }, hint: { en: "A strong pair", ar: "ثنائي قوي", ku: "دوانەیەکی بەهێز" } },
      b3: { label: { en: "150,000 – 250,000 IQD", ar: "١٥٠٬٠٠٠ – ٢٥٠٬٠٠٠ دينار", ku: "١٥٠٬٠٠٠ – ٢٥٠٬٠٠٠ دینار" }, hint: { en: "A complete stack", ar: "تركيبة كاملة", ku: "تێکەڵەیەکی تەواو" } },
      b4: { label: { en: "Whatever works best", ar: "الأفضل بغض النظر عن السعر", ku: "باشترین، نرخ گرنگ نییە" } },
    },
  },
};

/** Quiz structure (order, answer type, icons). Not editable in admin on purpose. */
export const QUIZ_STEPS = [
  { key: "goal", type: "single", icons: { gain: "gain", lose: "lose", muscle: "muscle", energy: "energy", recovery: "recovery", health: "health" } },
  { key: "body", type: "body" },
  { key: "level", type: "single", icons: { new: "seed", mid: "sprout", pro: "tree" } },
  { key: "avoid", type: "multi", icons: { none: "check", caffeine: "moon", heart: "heart", pregnant: "baby", meds: "pill" } },
  { key: "budget", type: "single", icons: {} },
];

/* ------------------------------------------------------------------ */
/* Products (snapshot of karradagroup.com, Oct 2026)                     */
/*  goals     → which quiz goals this product is suggested for          */
/*  caffeine  → hidden for people avoiding caffeine / heart / pregnancy  */
/*  menOnly   → hidden for women                                         */
/*  advanced  → hidden for beginners and under-18s                       */
/*  featured  → small boost when two products score the same            */
/* ------------------------------------------------------------------ */

const P = (id, name, brand, category, price, goals, extra = {}) => ({
  id,
  name,
  brand,
  category,
  price,
  oldPrice: null,
  image: "",
  url: `${STORE}/products/${extra.handle ?? id}`,
  goals,
  caffeine: false,
  menOnly: false,
  advanced: false,
  featured: false,
  inStock: true,
  visible: true,
  desc: {},
  how: {},
  ...extra,
});

export const DEFAULT_PRODUCTS = [
  P("mass-gainer-pro", "Mass Gainer Pro", "Team One Life", "gainer", 54000, ["gain"], { handle: "team-one-life-mass-gainer-pro", inStock: false, featured: true }),
  P("gold-standard-whey", "Gold Standard 100% Whey", "Optimum Nutrition", "protein", 135000, ["muscle", "gain", "lose", "recovery"], { handle: "optimum-nutrition-gold-standard-100-whey", featured: true }),
  P("hydro-whey", "Hydro Whey Protein", "Team One Life", "protein", 119000, ["muscle", "lose", "recovery"], { handle: "team-one-life-hydro-whey-protein", inStock: false }),
  P("creatine-unflavored", "Creatine Monohydrate", "Bucked Up", "creatine", 54000, ["muscle", "gain", "energy"], { handle: "bucked-up-creatine-monohydrate-unflavor", inStock: false }),
  P("creatine-mango", "Creatine Monohydrate Mango Pineapple", "Bucked Up", "creatine", 54000, ["muscle", "gain", "energy"], { handle: "bucked-up-creatine-monohydrate-flavor", inStock: false, image: "https://karradagroup.com/cdn/shop/files/61jY_IifguL._AC_UF1000_1000_QL80.jpg?v=1785680308&width=655" }),
  P("energizecore", "Energizecore Creatine + Glutamine", "Body Builder", "creatine", 55000, ["muscle", "gain", "recovery"], { handle: "body-builder-energizecore-creatine-glutamine" }),
  P("creakong", "CREAKONG CX8 Creatine", "Mutant", "creatine", 45000, ["muscle", "gain"], { handle: "mutant-creakong-cx8-advanced-creatine-multiplier-creatine-amino-acid-supplement", inStock: false }),
  P("bcaa", "BCAA", "Body Builder", "amino", 45000, ["recovery", "muscle"], { handle: "body-builder-bcaa" }),
  P("aminozorb", "Aminozorb Elite", "EFX Sports", "amino", 65000, ["recovery", "energy"], { handle: "efx-sports-aminozorb-elite" }),
  P("hmb", "HMB", "Bucked Up", "amino", 39000, ["recovery", "muscle", "lose"], { handle: "bucked-up-hmb" }),
  P("beta-alanine", "Beta-Alanine", "Team One Life", "amino", 29000, ["energy"], { handle: "team-one-life-beta-alanine", inStock: false }),
  P("karbolyn", "Karbolyn Fuel", "EFX Sports", "carb", 58000, ["gain", "energy", "recovery"], { handle: "efx-sports-karbolyn", featured: true }),
  P("bamf", "BAMF Pre-Workout", "Bucked Up", "preworkout", 55000, ["energy"], { handle: "buckedup-bamf", caffeine: true, advanced: true }),
  P("mother-bucker", "Mother Bucker Pre-Workout", "Bucked Up", "preworkout", 69000, ["energy"], { handle: "bucked-up-mother-bucker", caffeine: true, advanced: true }),
  P("woke-af", "Woke AF Pre-Workout", "Bucked Up", "preworkout", 65000, ["energy"], { handle: "bucked-up-woke-af", caffeine: true, advanced: true, inStock: false }),
  P("pump-ocalypse", "Pump-ocalypse Stim-Free", "Bucked Up", "preworkout", 58000, ["energy"], { handle: "bucked-up-pump-ocalypse" }),
  P("p14-extreme", "Platinum P14 Extreme", "Team One Life", "preworkout", 49000, ["energy"], { handle: "team-one-platinum-p14-extreme", caffeine: true, inStock: false }),
  P("heat", "Heat Fat Burner", "Bucked Up", "fatburner", 65000, ["lose"], { handle: "bucked-up-heat-fat-burner", caffeine: true }),
  P("cla-carnitine", "CLA + Carnitine Powder", "Team One Life", "fatburner", 49000, ["lose"], { handle: "team-one-life-cla-carnitine-powder-300gm", inStock: false }),
  P("jantee-block", "Jantee Block Appetite Control", "Team One Life", "appetite", 54000, ["lose"], { handle: "teamone-life-jantee-block-advanced-appetite-control-formula", featured: true }),
  P("janty-powder", "Janty Block Powder", "Team One Life", "appetite", 72000, ["lose"], { handle: "team-one-janty-block-powder" }),
  P("stag", "Stag Multivitamin", "Bucked Up", "vitamin", 49000, ["health", "recovery"], { handle: "bucked-up-stag-multivitamin" }),
  P("flex", "Flex Joint Support", "Bucked Up", "joint", 54000, ["health", "recovery"], { handle: "bucked-up-flex" }),
  P("rut", "Rut Testosterone Booster", "Bucked Up", "booster", 79000, ["muscle"], { handle: "bucked-up-rut-testosterone-booster", menOnly: true, advanced: true }),
  P("lifting-belt", "4 Inch Nylon Lifting Belt", "Gorilla Wear", "accessory", 25000, [], { handle: "gorilla-wear-4-inch-nylon-lifting-belt", oldPrice: 45000 }),
];

export const CITIES = [
  { id: "Baghdad", en: "Baghdad", ar: "بغداد", ku: "بەغدا" },
  { id: "Erbil", en: "Erbil", ar: "أربيل", ku: "هەولێر" },
  { id: "Sulaymaniyah", en: "Sulaymaniyah", ar: "السليمانية", ku: "سلێمانی" },
  { id: "Basra", en: "Basra", ar: "البصرة", ku: "بەسرە" },
  { id: "Duhok", en: "Duhok", ar: "دهوك", ku: "دهۆک" },
  { id: "Kirkuk", en: "Kirkuk", ar: "كركوك", ku: "کەرکووک" },
  { id: "Najaf", en: "Najaf", ar: "النجف", ku: "نەجەف" },
  { id: "Karbala", en: "Karbala", ar: "كربلاء", ku: "کەربەلا" },
  { id: "Mosul", en: "Mosul", ar: "الموصل", ku: "مووسڵ" },
  { id: "Other", en: "Other", ar: "أخرى", ku: "تر" },
];

/** Combine saved content with the defaults, so new fields always have a value. */
export function withDefaults(saved = {}) {
  const quiz = {};
  for (const key of Object.keys(DEFAULT_QUIZ)) {
    const d = DEFAULT_QUIZ[key];
    const s = saved.quiz?.[key] ?? {};
    const options = {};
    for (const id of Object.keys(d.options)) options[id] = { ...d.options[id], ...(s.options?.[id] ?? {}) };
    quiz[key] = { ...d, ...s, options };
  }
  return {
    settings: { ...DEFAULT_SETTINGS, ...(saved.settings ?? {}) },
    texts: { ...DEFAULT_TEXTS, ...(saved.texts ?? {}) },
    quiz,
    products: Array.isArray(saved.products) ? saved.products : DEFAULT_PRODUCTS,
  };
}
