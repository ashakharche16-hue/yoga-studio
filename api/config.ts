import kv from "@vercel/kv";

const SK = "yoga-studio-config";

const DEF = {
  password: "Yogawithp123#",
  business: {
    coachName: "Pallavi Vaibhav Kharchhe",
    short: "Pallavi Kharchhe",
    role: "Certified Fitness Coach and Nutritionist",
    roleMr: "प्रमाणित फिटनेस प्रशिक्षक व पोषणतज्ज्ञ",
    phone: "8329077521",
    wa: "918329077521",
    brand: "Transform With Pallavi",
    brandMr: "पल्लवीसोबत परिवर्तन",
    quote:
      "Every body is different. Every transformation is personal. I stay with you every step until you reach your goal.",
    quoteMr:
      "प्रत्येक शरीर वेगळे असते. प्रत्येक बदल वैयक्तिक असतो. तुम्ही ध्येय गाठेपर्यंत मी प्रत्येक पावलावर सोबत असते.",
  },
  program: {
    startDate: "13th June 2026",
    startDateMr: "१३ जून २०२६",
    days: 30,
    wlMin: 7,
    wlMax: 8,
    unit: "KG",
  },
  stats: [
    {
      num: "7–8",
      u: "KG",
      l: "Weight Lost",
      lm: "वजन कमी",
      s: "In 30 days",
      sm: "३० दिवसांत",
    },
    {
      num: "30",
      u: "D",
      l: "Day Challenge",
      lm: "दिवसांचे आव्हान",
      s: "Structured program",
      sm: "शिस्तबद्ध कार्यक्रम",
    },
    {
      num: "4",
      u: "x",
      l: "Batch Timings",
      lm: "बॅच वेळा",
      s: "Flexible slots",
      sm: "सोयीनुसार वेळ",
    },
    {
      num: "0",
      u: " GYM",
      l: "Required",
      lm: "आवश्यक",
      s: "100% from home",
      sm: "१००% घरून",
    },
  ],
  coachStats: [
    { num: "500+", l: "Clients", lm: "ग्राहक" },
    { num: "30D", l: "System", lm: "प्रणाली" },
    { num: "7kg", l: "Avg. Lost", lm: "सरासरी कमी" },
    { num: "100%", l: "Home", lm: "घरून" },
  ],
  batches: [
    { time: "5:00 – 6:00 AM", tag: "Early Bird", tagMr: "सकाळचे पक्षी" },
    { time: "6:15 – 7:15 AM", tag: "Morning", tagMr: "सकाळ" },
    { time: "10:30 – 11:30 AM", tag: "Mid-Morning", tagMr: "मध्य-सकाळ" },
    { time: "4:30 – 5:30 PM", tag: "Evening", tagMr: "संध्याकाळ" },
  ],
  hero: {
    eyebrow: "New Batch — 13th June 2026",
    eyebrowMr: "नवीन बॅच — १३ जून २०२६",
    action: "LOSE",
    actionMr: "घटवा",
    unit: "KILOS",
    unitMr: "किलो",
    sub: "30 days. No gym. Real results.",
    subMr: "३० दिवस. जिम नाही. खरे परिणाम.",
    desc: "A complete transformation system — custom home diet, easy daily workouts, and personal coaching.",
    descMr:
      "एक संपूर्ण परिवर्तन प्रणाली — घरचा कस्टम डाएट, सोपे रोजचे व्यायाम, आणि वैयक्तिक मार्गदर्शन.",
    cta1: "Start Free Trial",
    cta1Mr: "मोफत चाचणी सुरू करा",
    cta2: "See The Program",
    cta2Mr: "कार्यक्रम पहा",
  },
  features: [
    {
      icon: "🔥",
      en: "Fat Loss Goal",
      mr: "चरबी कमी करणे",
      d: "Science-backed strategies for the Indian body type. See the scale move every single week.",
      dm: "भारतीय शरीराच्या ठेवणीनुसार शास्त्रीय पद्धती.",
    },
    {
      icon: "🥗",
      en: "Custom Home Diet",
      mr: "घरचा कस्टम डाएट",
      d: "Your plan uses foods from your own kitchen. No supplements. Desi food, smart portions.",
      dm: "तुमच्या स्वयंपाकघरातील पदार्थांपासून बनवलेली योजना.",
    },
    {
      icon: "💪",
      en: "Easy Workouts",
      mr: "सोपे व्यायाम",
      d: "15–30 minute routines at home. No equipment. Progressive intensity keeps you improving.",
      dm: "१५-३० मिनिटांचे घरचे व्यायाम. कोणतेही साधन नाही.",
    },
    {
      icon: "📊",
      en: "Daily Tracking",
      mr: "रोजचे ट्रॅकिंग",
      d: "Daily check-ins and progress monitoring. Small wins compound into big results.",
      dm: "रोजची तपासणी. लहान जिंकण्याने मोठे यश.",
    },
    {
      icon: "🧠",
      en: "Mindset Coaching",
      mr: "मानसिकता प्रशिक्षण",
      d: "Break emotional eating, build discipline, create habits that last beyond the challenge.",
      dm: "भावनिक खाणे थांबवा, शिस्त निर्माण करा.",
    },
    {
      icon: "🤝",
      en: "Personal Support",
      mr: "वैयक्तिक आधार",
      d: "Direct daily access. Questions answered fast, adjustments made when needed.",
      dm: "रोज थेट संपर्क. प्रश्नांची लगेच उत्तरे.",
    },
  ],
  form: {
    title: "BOOK FREE TRIAL",
    titleMr: "मोफत चाचणी बुक करा",
    sub: "Fill in your details — we'll personally confirm your spot.",
    subMr: "तुमची माहिती भरा — आम्ही स्वतः तुमची जागा निश्चित करू.",
    btn: "RESERVE MY SPOT",
    btnMr: "माझी जागा निश्चित करा",
  },
  googleForms: {
    enabled: false,
    formUrl: "",
    fields: { firstName: "", lastName: "", phone: "", batch: "", goal: "" },
  },
  whatsapp: {
    enabled: true,
    number: "918329077521",
    delayMs: 1500,
    template:
      "Hi! 🔥 I just enrolled for the 30-Day Weight Loss Challenge.\n\nName: {firstName} {lastName}\nPhone: {phone}\nBatch: {batch}\nGoal: {goal}",
  },
  bubble: {
    enabled: true,
    number: "918329077521",
    msg: "Hi! I'm interested in the Weight Loss Challenge.",
  },
  notify: { enabled: true, number: "918329077521" },
};

const parseRequestBody = async (req) => {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
};

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const data = await kv.get(SK);
      return res.status(200).json(data ? JSON.parse(data) : DEF);
    }

    if (req.method === "POST") {
      const payload = await parseRequestBody(req);
      await kv.set(SK, JSON.stringify(payload));
      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", "GET, POST");
    res.status(405).end();
  } catch (error) {
    console.error("Config API error", error);
    res.status(500).json({ error: "Unable to access config store." });
  }
}
