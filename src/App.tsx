import { useState, useEffect, useCallback, useRef } from "react";
import {
  Settings,
  LogOut,
  Save,
  Plus,
  Trash2,
  Eye,
  Lock,
  Phone,
  Calendar,
  ChevronDown,
  ChevronRight,
  Check,
  X,
  AlertCircle,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   COLOR PALETTE
═══════════════════════════════════════════════════════════ */
const C = {
  fire: "#FF4D1C",
  fire2: "#FF8C42",
  bg: "#080B0F",
  bg2: "#0D1117",
  surface: "#161D26",
  white: "#F0F4F8",
  muted: "#6B7E93",
  muted2: "#4A5568",
  green: "#22c55e",
  red: "#ef4444",
};

/* ═══════════════════════════════════════════════════════════
   DEFAULT CONFIG
═══════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════
   STORAGE
═══════════════════════════════════════════════════════════ */
const SK = "yoga-studio-config";
const API_ENDPOINT = "/api/config";
function mergeConfig(base, override) {
  if (!override || typeof override !== "object") return base;
  const result = Array.isArray(base) ? [...base] : { ...base };
  Object.entries(override).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      result[key] = value.slice();
    } else if (value && typeof value === "object") {
      result[key] = mergeConfig(base?.[key] ?? {}, value);
    } else {
      result[key] = value;
    }
  });
  return result;
}
async function loadCfg() {
  try {
    const res = await fetch(API_ENDPOINT, { cache: "no-store" });
    if (res.ok) {
      const cfg = await res.json();
      return mergeConfig(DEF, cfg);
    }
  } catch (e) {
    console.warn("Remote config load failed, falling back to localStorage:", e);
  }

  try {
    const v = window.localStorage.getItem(SK);
    return v ? mergeConfig(DEF, JSON.parse(v)) : null;
  } catch (e) {
    console.warn("Failed to load saved config from localStorage:", e);
    return null;
  }
}
async function saveCfg(cfg) {
  let savedRemotely = false;
  try {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cfg),
    });
    savedRemotely = res.ok;
  } catch (e) {
    console.warn("Remote config save failed, storing locally:", e);
  }

  try {
    window.localStorage.setItem(SK, JSON.stringify(cfg));
  } catch (e) {
    console.warn("Failed to save config to localStorage:", e);
  }

  return savedRemotely;
}

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════ */
const GCSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@300;400;600;700;800&family=Barlow:wght@300;400;500&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
.bb{font-family:'Bebas Neue',sans-serif}
.bc{font-family:'Barlow Condensed',sans-serif}
.mr-font{font-family:'Tiro Devanagari Hindi',serif}
input,select,textarea{font-family:inherit}
.clip{clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)}
.clip-sm{clip-path:polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%)}
@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes pa{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
@keyframes fw{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes dIn{to{stroke-dashoffset:164}}
@keyframes gP{0%,100%{filter:drop-shadow(0 0 6px rgba(255,77,28,.6))}50%{filter:drop-shadow(0 0 18px rgba(255,77,28,.9))}}
.fade-up{animation:fadeUp .6s ease both}
.wa-float{position:fixed;bottom:1.5rem;right:1.5rem;z-index:200;width:54px;height:54px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;text-decoration:none;font-size:1.4rem;box-shadow:0 5px 20px rgba(37,211,102,.4);animation:fw 3s ease-in-out infinite;cursor:pointer;border:none}
.wa-float:hover{animation:none;transform:scale(1.1)}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center}
.g2s{display:grid;grid-template-columns:1fr 1fr;gap:.7rem}
.g2b{display:grid;grid-template-columns:1.1fr 1fr;gap:3rem;align-items:start}
.stats-g{display:grid;gap:1rem}
.ring-box{display:flex;justify-content:center;align-items:center;overflow:hidden}
.ring-sz{position:relative;width:240px;height:240px;max-width:100%}
.feat-g{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.adm-row{display:grid;grid-template-columns:1fr 1fr;gap:.8rem}
.adm-row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.8rem}
.adm-batch-add{display:grid;grid-template-columns:1.5fr 1fr 1fr auto;gap:.4rem;margin-top:.8rem}
@media(max-width:768px){
  .g2,.g2b{grid-template-columns:1fr;gap:2rem}
  .g2s{grid-template-columns:1fr 1fr}
  .feat-g{grid-template-columns:1fr}
  .ring-sz{width:180px;height:180px}
  section{padding-left:1.2rem !important;padding-right:1.2rem !important}
  nav{padding-left:1rem !important;padding-right:1rem !important}
  footer{padding-left:1.2rem !important;padding-right:1.2rem !important;flex-direction:column;text-align:center}
  .adm-row,.adm-row3{grid-template-columns:1fr}
  .adm-batch-add{grid-template-columns:1fr 1fr;gap:.4rem}
}
@media(max-width:480px){
  .g2s{grid-template-columns:1fr}
  .stats-g{grid-template-columns:repeat(2,1fr) !important}
  .ring-sz{width:160px;height:160px}
}
`;

/* ═══════════════════════════════════════════════════════════
   ADMIN LOGIN
═══════════════════════════════════════════════════════════ */
function AdminLogin({ onLogin, onBack, password }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const handleLogin = () => {
    if (pw === password) {
      onLogin();
    } else {
      setErr(true);
      setTimeout(() => setErr(false), 2000);
    }
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Barlow',sans-serif",
      }}
    >
      <div
        style={{
          background: C.surface,
          border: `1px solid rgba(255,77,28,.2)`,
          padding: "2.5rem",
          width: 360,
          maxWidth: "90vw",
        }}
        className="fade-up"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".6rem",
            marginBottom: "1.8rem",
          }}
        >
          <Lock size={20} color={C.fire} />
          <span
            className="bb"
            style={{ fontSize: "1.5rem", letterSpacing: 3, color: C.white }}
          >
            ADMIN LOGIN
          </span>
        </div>
        <label
          style={{
            display: "block",
            fontSize: ".72rem",
            letterSpacing: 2,
            textTransform: "uppercase",
            color: C.muted,
            fontWeight: 700,
            marginBottom: ".4rem",
          }}
          className="bc"
        >
          Password
        </label>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          placeholder="Enter admin password"
          style={{
            width: "100%",
            background: C.bg,
            border: `1px solid ${err ? C.red : "rgba(255,255,255,.08)"}`,
            padding: ".8rem",
            color: C.white,
            fontSize: ".9rem",
            outline: "none",
            marginBottom: "1rem",
            transition: "border-color .2s",
          }}
        />
        {err && (
          <p
            style={{
              color: C.red,
              fontSize: ".8rem",
              marginBottom: ".8rem",
              display: "flex",
              alignItems: "center",
              gap: ".4rem",
            }}
          >
            <AlertCircle size={14} /> Wrong password
          </p>
        )}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            background: `linear-gradient(135deg,${C.fire},${C.fire2})`,
            color: "#fff",
            padding: ".9rem",
            border: "none",
            fontSize: "1rem",
            letterSpacing: 3,
            cursor: "pointer",
            marginBottom: ".8rem",
          }}
          className="bb clip"
        >
          LOGIN
        </button>
        <button
          onClick={onBack}
          style={{
            width: "100%",
            background: "transparent",
            border: `1px solid rgba(255,255,255,.1)`,
            color: C.muted,
            padding: ".7rem",
            cursor: "pointer",
            fontSize: ".8rem",
            letterSpacing: 1,
          }}
          className="bc"
        >
          ← Back to Website
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ADMIN DASHBOARD
═══════════════════════════════════════════════════════════ */
function AdminDash({ config, onSave, onExit }) {
  const cfgRef = useRef(JSON.parse(JSON.stringify(config)));
  const [tab, setTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newBatch, setNewBatch] = useState({ time: "", tag: "", tagMr: "" });
  const [tick, setTick] = useState(0);

  const getCfg = () => cfgRef.current;

  const upd = (path, val) => {
    const keys = path.split(".");
    let obj = cfgRef.current;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = val;
  };

  const updAndRender = (path, val) => {
    upd(path, val);
    setTick((t) => t + 1);
  };

  const doSave = async () => {
    setSaving(true);
    const snapshot = JSON.parse(JSON.stringify(cfgRef.current));
    await onSave(snapshot);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const removeBatch = (i) => {
    cfgRef.current.batches.splice(i, 1);
    setTick((t) => t + 1);
  };

  const addBatch = () => {
    if (!newBatch.time) return;
    if (!cfgRef.current.batches) cfgRef.current.batches = [];
    cfgRef.current.batches.push({ ...newBatch });
    setNewBatch({ time: "", tag: "", tagMr: "" });
    setTick((t) => t + 1);
  };

  const tabs = [
    { id: "general", label: "General" },
    { id: "program", label: "Program & Schedule" },
    { id: "content", label: "Website Content" },
    { id: "integrations", label: "Integrations" },
    { id: "security", label: "Security" },
  ];

  const S = {
    wrap: {
      minHeight: "100vh",
      background: "#0a0e14",
      fontFamily: "'Barlow',sans-serif",
      color: C.white,
    },
    top: {
      background: C.surface,
      borderBottom: `1px solid rgba(255,77,28,.2)`,
      padding: "1rem 1.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 50,
      flexWrap: "wrap",
      gap: ".5rem",
    },
    main: { maxWidth: 800, margin: "0 auto", padding: "1.5rem" },
    card: {
      background: C.surface,
      border: "1px solid rgba(255,255,255,.06)",
      padding: "1.5rem",
      marginBottom: "1rem",
    },
    label: {
      display: "block",
      fontSize: ".7rem",
      letterSpacing: 2,
      textTransform: "uppercase",
      color: C.muted,
      fontWeight: 700,
      marginBottom: ".35rem",
    },
    input: {
      width: "100%",
      background: C.bg,
      border: "1px solid rgba(255,255,255,.08)",
      padding: ".65rem .8rem",
      color: C.white,
      fontSize: ".85rem",
      outline: "none",
      marginBottom: ".8rem",
    },
    row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".8rem" },
    sectionTitle: {
      fontSize: ".75rem",
      letterSpacing: 3,
      textTransform: "uppercase",
      color: C.fire,
      fontWeight: 700,
      marginBottom: "1rem",
      paddingBottom: ".5rem",
      borderBottom: "1px solid rgba(255,77,28,.15)",
    },
    toggle: (on) => ({
      width: 44,
      height: 24,
      borderRadius: 12,
      background: on ? C.green : "rgba(255,255,255,.1)",
      border: "none",
      cursor: "pointer",
      position: "relative",
      transition: "background .2s",
      flexShrink: 0,
    }),
    toggleDot: (on) => ({
      position: "absolute",
      top: 3,
      left: on ? 23 : 3,
      width: 18,
      height: 18,
      borderRadius: 9,
      background: "#fff",
      transition: "left .2s",
    }),
  };

  const Toggle = ({ value, onChange }) => (
    <button style={S.toggle(value)} onClick={() => onChange(!value)}>
      <div style={S.toggleDot(value)} />
    </button>
  );

  const Field = ({ label, path, type = "text", placeholder = "" }) => {
    const value = path.split(".").reduce((o, k) => o?.[k], getCfg()) ?? "";
    return (
      <div>
        <label style={S.label} className="bc">
          {label}
        </label>
        <input
          type={type}
          value={value}
          onChange={(e) => upd(path, e.target.value)}
          placeholder={placeholder}
          style={S.input}
        />
      </div>
    );
  };

  return (
    <div style={S.wrap}>
      <div style={S.top}>
        <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
          <Settings size={18} color={C.fire} />
          <span className="bb" style={{ fontSize: "1.3rem", letterSpacing: 3 }}>
            ADMIN DASHBOARD
          </span>
        </div>
        <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
          {saved && (
            <span
              style={{
                color: C.green,
                fontSize: ".78rem",
                display: "flex",
                alignItems: "center",
                gap: ".3rem",
              }}
            >
              <Check size={14} /> Saved!
            </span>
          )}
          <button
            onClick={doSave}
            disabled={saving}
            style={{
              background: `linear-gradient(135deg,${C.fire},${C.fire2})`,
              color: "#fff",
              border: "none",
              padding: ".5rem 1.2rem",
              fontSize: ".78rem",
              letterSpacing: 2,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: ".4rem",
              opacity: saving ? 0.6 : 1,
            }}
            className="bc clip-sm"
          >
            <Save size={14} /> {saving ? "SAVING..." : "SAVE CHANGES"}
          </button>
          <button
            onClick={onExit}
            style={{
              background: "transparent",
              border: `1px solid rgba(255,255,255,.1)`,
              color: C.muted,
              padding: ".5rem .8rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: ".3rem",
              fontSize: ".78rem",
            }}
            className="bc"
          >
            <Eye size={14} /> View Site
          </button>
          <button
            onClick={onExit}
            style={{
              background: "transparent",
              border: "none",
              color: C.muted,
              cursor: "pointer",
              padding: ".4rem",
            }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: ".3rem",
          padding: ".8rem 1.5rem",
          overflowX: "auto",
          background: "rgba(0,0,0,.2)",
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="bc"
            style={{
              padding: ".5rem 1rem",
              border: "none",
              background: tab === t.id ? C.fire : "transparent",
              color: tab === t.id ? "#fff" : C.muted,
              cursor: "pointer",
              fontSize: ".75rem",
              letterSpacing: 1.5,
              fontWeight: 700,
              borderRadius: 3,
              whiteSpace: "nowrap",
              textTransform: "uppercase",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={S.main}>
        {/* GENERAL TAB */}
        {tab === "general" && (
          <>
            <div style={S.card}>
              <div style={S.sectionTitle} className="bc">
                Business Information
              </div>
              <div style={S.row}>
                <Field label="Coach Full Name" path="business.coachName" />
                <Field label="Coach Short Name" path="business.short" />
              </div>
              <div style={S.row}>
                <Field label="Role (English)" path="business.role" />
                <Field label="Role (Marathi)" path="business.roleMr" />
              </div>
              <div style={S.row}>
                <Field label="Phone Number" path="business.phone" />
                <Field
                  label="WhatsApp (Intl)"
                  path="business.wa"
                  placeholder="918329077521"
                />
              </div>
              <div style={S.row}>
                <Field label="Brand Name (English)" path="business.brand" />
                <Field label="Brand Name (Marathi)" path="business.brandMr" />
              </div>
            </div>
            <div style={S.card}>
              <div style={S.sectionTitle} className="bc">
                Coach Quote
              </div>
              <Field label="Quote (English)" path="business.quote" />
              <Field label="Quote (Marathi)" path="business.quoteMr" />
            </div>
          </>
        )}

        {/* PROGRAM TAB */}
        {tab === "program" && (
          <>
            <div style={S.card}>
              <div style={S.sectionTitle} className="bc">
                Program Details
              </div>
              <div style={S.row}>
                <Field
                  label="Start Date (English)"
                  path="program.startDate"
                  placeholder="13th June 2026"
                />
                <Field
                  label="Start Date (Marathi)"
                  path="program.startDateMr"
                  placeholder="१३ जून २०२६"
                />
              </div>
              <div style={{ ...S.row, gridTemplateColumns: "1fr 1fr 1fr" }}>
                <Field
                  label="Duration (Days)"
                  path="program.days"
                  type="number"
                />
                <Field
                  label="Weight Loss Min"
                  path="program.wlMin"
                  type="number"
                />
                <Field
                  label="Weight Loss Max"
                  path="program.wlMax"
                  type="number"
                />
              </div>
            </div>
            <div style={S.card}>
              <div style={S.sectionTitle} className="bc">
                Batch Timings
              </div>
              {getCfg().batches.map((b, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: ".5rem",
                    alignItems: "center",
                    marginBottom: ".5rem",
                    padding: ".6rem .8rem",
                    background: C.bg,
                    border: "1px solid rgba(255,255,255,.05)",
                  }}
                >
                  <span
                    style={{ flex: 1, fontWeight: 600, fontSize: ".9rem" }}
                    className="bc"
                  >
                    {b.time}
                  </span>
                  <span style={{ color: C.muted, fontSize: ".8rem" }}>
                    {b.tag}
                  </span>
                  <span style={{ color: C.muted2, fontSize: ".75rem" }}>
                    {b.tagMr}
                  </span>
                  <button
                    onClick={() => removeBatch(i)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: C.red,
                      cursor: "pointer",
                      padding: ".2rem",
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 1fr 1fr auto",
                  gap: ".4rem",
                  marginTop: ".8rem",
                }}
              >
                <input
                  value={newBatch.time}
                  onChange={(e) =>
                    setNewBatch({ ...newBatch, time: e.target.value })
                  }
                  placeholder="e.g. 7:00 – 8:00 AM"
                  style={{ ...S.input, marginBottom: 0 }}
                />
                <input
                  value={newBatch.tag}
                  onChange={(e) =>
                    setNewBatch({ ...newBatch, tag: e.target.value })
                  }
                  placeholder="Tag (EN)"
                  style={{ ...S.input, marginBottom: 0 }}
                />
                <input
                  value={newBatch.tagMr}
                  onChange={(e) =>
                    setNewBatch({ ...newBatch, tagMr: e.target.value })
                  }
                  placeholder="Tag (MR)"
                  style={{ ...S.input, marginBottom: 0 }}
                />
                <button
                  onClick={addBatch}
                  style={{
                    background: C.fire,
                    border: "none",
                    color: "#fff",
                    padding: ".5rem",
                    cursor: "pointer",
                    borderRadius: 3,
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </>
        )}

        {/* CONTENT TAB */}
        {tab === "content" && (
          <>
            <div style={S.card}>
              <div style={S.sectionTitle} className="bc">
                Hero Section
              </div>
              <div style={S.row}>
                <Field label="Eyebrow (EN)" path="hero.eyebrow" />
                <Field label="Eyebrow (MR)" path="hero.eyebrowMr" />
              </div>
              <div style={S.row}>
                <Field label="Headline Action (EN)" path="hero.action" />
                <Field label="Headline Action (MR)" path="hero.actionMr" />
              </div>
              <div style={S.row}>
                <Field label="Unit Word (EN)" path="hero.unit" />
                <Field label="Unit Word (MR)" path="hero.unitMr" />
              </div>
              <div style={S.row}>
                <Field label="Sub-headline (EN)" path="hero.sub" />
                <Field label="Sub-headline (MR)" path="hero.subMr" />
              </div>
              <div style={S.row}>
                <Field label="Description (EN)" path="hero.desc" />
                <Field label="Description (MR)" path="hero.descMr" />
              </div>
              <div style={S.row}>
                <Field label="CTA Button 1 (EN)" path="hero.cta1" />
                <Field label="CTA Button 1 (MR)" path="hero.cta1Mr" />
              </div>
              <div style={S.row}>
                <Field label="CTA Button 2 (EN)" path="hero.cta2" />
                <Field label="CTA Button 2 (MR)" path="hero.cta2Mr" />
              </div>
            </div>
            <div style={S.card}>
              <div style={S.sectionTitle} className="bc">
                Booking Form
              </div>
              <div style={S.row}>
                <Field label="Form Title (EN)" path="form.title" />
                <Field label="Form Title (MR)" path="form.titleMr" />
              </div>
              <div style={S.row}>
                <Field label="Subtitle (EN)" path="form.sub" />
                <Field label="Subtitle (MR)" path="form.subMr" />
              </div>
              <div style={S.row}>
                <Field label="Submit Button (EN)" path="form.btn" />
                <Field label="Submit Button (MR)" path="form.btnMr" />
              </div>
            </div>
          </>
        )}

        {/* INTEGRATIONS TAB */}
        {tab === "integrations" && (
          <>
            <div style={S.card}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <div style={S.sectionTitle} className="bc">
                  Google Forms / Sheets
                </div>
                <Toggle
                  value={getCfg().googleForms?.enabled}
                  onChange={(v) => updAndRender("googleForms.enabled", v)}
                />
              </div>
              {getCfg().googleForms?.enabled && (
                <>
                  <Field
                    label="Form URL (ending in /formResponse)"
                    path="googleForms.formUrl"
                    placeholder="https://docs.google.com/forms/d/e/YOUR_ID/formResponse"
                  />
                  <p
                    style={{
                      fontSize: ".75rem",
                      color: C.muted,
                      marginBottom: ".8rem",
                      lineHeight: 1.6,
                    }}
                  >
                    Go to your Google Form → 3-dot menu → "Get pre-filled link"
                    → fill dummy values → copy the entry IDs below.
                  </p>
                  <div style={S.row}>
                    <Field
                      label="Entry ID: First Name"
                      path="googleForms.fields.firstName"
                      placeholder="entry.000000001"
                    />
                    <Field
                      label="Entry ID: Last Name"
                      path="googleForms.fields.lastName"
                      placeholder="entry.000000002"
                    />
                  </div>
                  <div style={{ ...S.row, gridTemplateColumns: "1fr 1fr 1fr" }}>
                    <Field
                      label="Entry: Phone"
                      path="googleForms.fields.phone"
                      placeholder="entry.000000003"
                    />
                    <Field
                      label="Entry: Batch"
                      path="googleForms.fields.batch"
                      placeholder="entry.000000004"
                    />
                    <Field
                      label="Entry: Goal"
                      path="googleForms.fields.goal"
                      placeholder="entry.000000005"
                    />
                  </div>
                </>
              )}
            </div>
            <div style={S.card}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <div style={S.sectionTitle} className="bc">
                  WhatsApp Auto-Message
                </div>
                <Toggle
                  value={getCfg().whatsapp?.enabled}
                  onChange={(v) => updAndRender("whatsapp.enabled", v)}
                />
              </div>
              {getCfg().whatsapp?.enabled && (
                <>
                  <div style={S.row}>
                    <Field
                      label="WhatsApp Number"
                      path="whatsapp.number"
                      placeholder="918329077521"
                    />
                    <Field
                      label="Delay (ms)"
                      path="whatsapp.delayMs"
                      type="number"
                    />
                  </div>
                  <label style={S.label} className="bc">
                    Message Template (use {"{firstName}"} {"{lastName}"}{" "}
                    {"{phone}"} {"{batch}"} {"{goal}"})
                  </label>
                  <textarea
                    defaultValue={getCfg().whatsapp?.template || ""}
                    onChange={(e) => upd("whatsapp.template", e.target.value)}
                    rows={4}
                    style={{ ...S.input, resize: "vertical", minHeight: 80 }}
                  />
                </>
              )}
            </div>
            <div style={S.card}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <div style={S.sectionTitle} className="bc">
                  Floating WhatsApp Bubble
                </div>
                <Toggle
                  value={getCfg().bubble?.enabled}
                  onChange={(v) => updAndRender("bubble.enabled", v)}
                />
              </div>
              {getCfg().bubble?.enabled && (
                <>
                  <Field
                    label="Bubble WhatsApp Number"
                    path="bubble.number"
                    placeholder="918329077521"
                  />
                  <Field label="Pre-filled Message" path="bubble.msg" />
                </>
              )}
            </div>
            <div style={S.card}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <div style={S.sectionTitle} className="bc">
                  New Lead Notification (WhatsApp to Admin)
                </div>
                <Toggle
                  value={getCfg().notify?.enabled}
                  onChange={(v) => updAndRender("notify.enabled", v)}
                />
              </div>
              {getCfg().notify?.enabled && (
                <>
                  <Field
                    label="Admin WhatsApp Number"
                    path="notify.number"
                    placeholder="918329077521"
                  />
                  <p
                    style={{
                      fontSize: ".75rem",
                      color: C.muted,
                      lineHeight: 1.6,
                    }}
                  >
                    When a new lead submits the form, a WhatsApp notification
                    with their details will be sent to this number. Also enable
                    email notifications inside Google Forms → Responses → 3-dot
                    menu → "Get email notifications".
                  </p>
                </>
              )}
            </div>
          </>
        )}

        {/* SECURITY TAB */}
        {tab === "security" && (
          <>
            <div style={S.card}>
              <div style={S.sectionTitle} className="bc">
                Change Admin Password
              </div>
              <Field label="New Password" path="password" type="text" />
              <p
                style={{
                  fontSize: ".75rem",
                  color: C.muted,
                  marginTop: "-.4rem",
                }}
              >
                Save changes after updating. Current password:{" "}
                {"•".repeat((getCfg().password || "").length)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PUBLIC SITE
═══════════════════════════════════════════════════════════ */
function PublicSite({ config: cfg, onAdmin }) {
  const [lang, setLang] = useState("en");
  const [formData, setFormData] = useState({
    fn: "",
    ln: "",
    ph: "",
    bat: "",
    gl: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const reserveSeat = () => {
    if (cfg.googleForms?.enabled) {
      document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
    } else {
      setShowFull(true);
      setTimeout(() => setShowFull(false), 4000);
    }
  };

  const t = (en, mr) => (lang === "mr" ? mr || en : en);
  const b = cfg.business || {};
  const p = cfg.program || {};
  const h = cfg.hero || {};
  const f = cfg.form || {};

  /* Form submit */
  const handleSubmit = async () => {
    if (!formData.fn || !formData.ph) {
      alert(
        t(
          "Please enter your name and WhatsApp number.",
          "कृपया नाव आणि व्हॉट्सअप नंबर टाका."
        )
      );
      return;
    }
    setSubmitting(true);
    const lead = {
      firstName: formData.fn,
      lastName: formData.ln || "",
      phone: formData.ph,
      batch: formData.bat || "Not selected",
      goal: formData.gl || "Weight loss",
    };

    /* Google Forms silent submit */
    if (cfg.googleForms?.enabled && cfg.googleForms?.formUrl) {
      try {
        const iframe = document.createElement("iframe");
        iframe.name = "gf_" + Date.now();
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        const form = document.createElement("form");
        form.method = "POST";
        form.action = cfg.googleForms.formUrl;
        form.target = iframe.name;
        form.style.display = "none";
        const fields = cfg.googleForms.fields || {};
        Object.entries(fields).forEach(([key, entryId]) => {
          if (!entryId) return;
          const inp = document.createElement("input");
          inp.type = "hidden";
          inp.name = entryId;
          inp.value = lead[key] || "";
          form.appendChild(inp);
        });
        document.body.appendChild(form);
        form.submit();
        setTimeout(() => {
          try {
            document.body.removeChild(iframe);
            document.body.removeChild(form);
          } catch (e) {}
        }, 5000);
      } catch (e) {
        console.warn("GF error:", e);
      }
    }

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);

      /* Admin WhatsApp notification */
      if (cfg.notify?.enabled && cfg.notify?.number) {
        const notifyMsg = `🔔 New Lead!\n\nName: ${lead.firstName} ${lead.lastName}\nPhone: ${lead.phone}\nBatch: ${lead.batch}\nGoal: ${lead.goal}`;
        window.open(
          "https://wa.me/" +
            cfg.notify.number +
            "?text=" +
            encodeURIComponent(notifyMsg),
          "_blank"
        );
      }

      /* Visitor WhatsApp auto-message */
      if (cfg.whatsapp?.enabled && cfg.whatsapp?.number) {
        const delay = cfg.whatsapp.delayMs || 1500;
        setTimeout(() => {
          const tpl =
            cfg.whatsapp.template ||
            "Hi!\nName: {firstName} {lastName}\nPhone: {phone}\nBatch: {batch}\nGoal: {goal}";
          const msg = tpl
            .replace(/{firstName}/g, lead.firstName)
            .replace(/{lastName}/g, lead.lastName)
            .replace(/{phone}/g, lead.phone)
            .replace(/{batch}/g, lead.batch)
            .replace(/{goal}/g, lead.goal);
          window.open(
            "https://wa.me/" +
              cfg.whatsapp.number +
              "?text=" +
              encodeURIComponent(msg),
            "_blank"
          );
        }, delay);
      }
    }, 800);
  };

  const setField = (key, val) =>
    setFormData((prev) => ({ ...prev, [key]: val }));

  /* Styles */
  const nav = {
    position: "sticky",
    top: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: ".8rem 2rem",
    background: "rgba(8,11,15,.95)",
    backdropFilter: "blur(16px)",
    borderBottom: `1px solid rgba(255,77,28,.12)`,
    flexWrap: "wrap",
    gap: ".5rem",
  };

  return (
    <div
      style={{
        background: C.bg,
        color: C.white,
        fontFamily: "'Barlow',sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* NAV */}
      <nav style={nav}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              background: C.fire,
              clipPath: "polygon(50% 0%,100% 100%,0% 100%)",
              flexShrink: 0,
            }}
          />
          <span
            className="bb"
            style={{
              fontSize: "clamp(.9rem,3vw,1.3rem)",
              letterSpacing: 2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {t(b.brand, b.brandMr)}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,77,28,.3)",
              borderRadius: 30,
              padding: 2,
              gap: 2,
            }}
          >
            <button
              onClick={() => setLang("en")}
              className="bc"
              style={{
                padding: ".3rem .7rem",
                borderRadius: 20,
                border: "none",
                background: lang === "en" ? C.fire : "transparent",
                color: lang === "en" ? "#fff" : C.muted,
                cursor: "pointer",
                fontSize: ".75rem",
                fontWeight: 700,
              }}
            >
              EN
            </button>
            <button
              onClick={() => setLang("mr")}
              className={lang === "mr" ? "" : "mr-font"}
              style={{
                padding: ".3rem .7rem",
                borderRadius: 20,
                border: "none",
                background: lang === "mr" ? C.fire : "transparent",
                color: lang === "mr" ? "#fff" : C.muted,
                cursor: "pointer",
                fontSize: ".8rem",
                fontFamily: "'Tiro Devanagari Hindi',serif",
              }}
            >
              मराठी
            </button>
          </div>
          <button
            onClick={reserveSeat}
            className="bc clip-sm"
            style={{
              border: `1.5px solid ${C.fire}`,
              color: C.fire,
              padding: ".4rem 1rem",
              fontSize: ".78rem",
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {t("Reserve Seat", "जागा राखा")}
          </button>
        </div>
      </nav>

      {/* BATCHES FULL TOAST */}
      {showFull && (
        <div
          style={{
            position: "fixed",
            top: 70,
            left: "1rem",
            right: "1rem",
            margin: "0 auto",
            transform: "translateX(-50%)",
            zIndex: 150,
            background: C.surface,
            border: `1px solid ${C.fire}`,
            padding: "1rem 1.5rem",
            maxWidth: "90vw",
            width: 380,
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(0,0,0,.5)",
          }}
          className="fade-up"
        >
          <div style={{ fontSize: "1.5rem", marginBottom: ".5rem" }}>🔒</div>
          <p
            className="bb"
            style={{
              color: C.fire,
              fontSize: "1.1rem",
              letterSpacing: 2,
              marginBottom: ".3rem",
            }}
          >
            {t("BATCHES ARE CURRENTLY FULL", "बॅच सध्या भरलेले आहेत")}
          </p>
          <p style={{ color: C.muted, fontSize: ".82rem", lineHeight: 1.5 }}>
            {t(
              "Seat reservations will be enabled on availability basis. Please check back soon or contact us on WhatsApp.",
              "उपलब्धतेनुसार जागा राखीव होतील. कृपया लवकरच पुन्हा तपासा किंवा व्हॉट्सअपवर संपर्क करा."
            )}
          </p>
          <button
            onClick={() => setShowFull(false)}
            style={{
              marginTop: ".7rem",
              background: "transparent",
              border: `1px solid rgba(255,255,255,.1)`,
              color: C.muted,
              padding: ".4rem 1rem",
              cursor: "pointer",
              fontSize: ".75rem",
            }}
            className="bc"
          >
            ✕ {t("Close", "बंद करा")}
          </button>
        </div>
      )}

      {/* HERO */}
      <section
        style={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "3rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-10%",
            top: "50%",
            transform: "translateY(-50%)",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(255,77,28,.12) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".7rem",
            marginBottom: "1.2rem",
          }}
          className="fade-up"
        >
          <div style={{ width: 32, height: 2, background: C.fire }} />
          <span
            className="bc"
            style={{
              fontSize: ".75rem",
              letterSpacing: 4,
              textTransform: "uppercase",
              color: C.fire,
              fontWeight: 600,
            }}
          >
            {t(h.eyebrow, h.eyebrowMr)}
          </span>
        </div>
        <h1
          className="bb fade-up"
          style={{
            fontSize: "clamp(3.5rem,8vw,7rem)",
            lineHeight: 0.95,
            letterSpacing: 2,
            marginBottom: "1.2rem",
          }}
        >
          {t(h.action, h.actionMr)}
          <br />
          <span
            style={{ WebkitTextStroke: `2px ${C.fire}`, color: "transparent" }}
          >
            {p.wlMin}–{p.wlMax}
          </span>
          <br />
          <span style={{ color: C.fire }}>{t(h.unit, h.unitMr)}</span>
        </h1>
        <p
          className="fade-up"
          style={{
            fontSize: "1rem",
            color: C.muted,
            lineHeight: 1.8,
            maxWidth: 440,
            marginBottom: "2rem",
          }}
        >
          <strong style={{ color: C.white }}>{t(h.sub, h.subMr)}</strong>
          <br />
          {t(h.desc, h.descMr)}
        </p>
        <div
          style={{ display: "flex", gap: ".7rem", flexWrap: "wrap" }}
          className="fade-up"
        >
          <button
            onClick={reserveSeat}
            className="bc clip"
            style={{
              background: `linear-gradient(135deg,${C.fire},${C.fire2})`,
              color: "#fff",
              padding: ".85rem 2rem",
              fontWeight: 700,
              fontSize: ".9rem",
              letterSpacing: 2,
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
            }}
          >
            {t(h.cta1, h.cta1Mr)}
          </button>
          <a
            href="#prog"
            className="bc clip"
            style={{
              border: "1.5px solid rgba(240,244,248,.2)",
              color: C.white,
              padding: ".85rem 1.8rem",
              fontWeight: 600,
              fontSize: ".9rem",
              letterSpacing: 2,
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            {t(h.cta2, h.cta2Mr)}
          </a>
        </div>
      </section>

      {/* STATS */}
      <div
        className="stats-g"
        style={{
          background: C.surface,
          borderTop: `1px solid rgba(255,77,28,.12)`,
          borderBottom: `1px solid rgba(255,77,28,.12)`,
          padding: "1.5rem 2rem",
          gridTemplateColumns: `repeat(${(cfg.stats || []).length || 4},1fr)`,
        }}
      >
        {(cfg.stats || []).map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div
              className="bb"
              style={{ fontSize: "2.2rem", letterSpacing: 2, lineHeight: 1 }}
            >
              {s.num}
              <span style={{ color: C.fire, fontSize: "1.3rem" }}>{s.u}</span>
            </div>
            <div
              className="bc"
              style={{
                fontSize: ".68rem",
                letterSpacing: 2,
                textTransform: "uppercase",
                color: C.muted,
                fontWeight: 600,
              }}
            >
              {t(s.l, s.lm)}
            </div>
            <div style={{ fontSize: ".62rem", color: C.muted2 }}>
              {t(s.s, s.sm)}
            </div>
          </div>
        ))}
      </div>

      {/* MARQUEE */}
      <div
        style={{ overflow: "hidden", padding: ".5rem 0", background: C.fire }}
      >
        <div
          style={{
            display: "flex",
            animation: "mq 18s linear infinite",
            whiteSpace: "nowrap",
          }}
        >
          {[...Array(2)].map((_, k) =>
            (cfg.features || []).map((f, i) => (
              <div
                key={k + "-" + i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "0 1rem",
                  flexShrink: 0,
                }}
              >
                <span
                  className="bb"
                  style={{
                    fontSize: ".85rem",
                    letterSpacing: 3,
                    color: "rgba(8,11,15,.8)",
                  }}
                >
                  {t(f.en, f.mr)}
                </span>
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "rgba(8,11,15,.3)",
                  }}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* FEATURES */}
      <section id="prog" style={{ padding: "4rem 2rem", background: C.bg }}>
        <div
          className="bc"
          style={{
            fontSize: ".72rem",
            letterSpacing: 4,
            textTransform: "uppercase",
            color: C.fire,
            fontWeight: 700,
            marginBottom: ".6rem",
          }}
        >
          {t("Program", "कार्यक्रम")}
        </div>
        <div
          className="bb"
          style={{
            fontSize: "clamp(2rem,4vw,3.2rem)",
            lineHeight: 0.97,
            letterSpacing: 2,
            marginBottom: "2.5rem",
          }}
        >
          {t("WHAT'S INCLUDED", "काय मिळेल")}
          <br />
          {t("IN YOUR ", "तुमच्या ")}
          <span
            style={{
              WebkitTextStroke: "1.5px " + C.white,
              color: "transparent",
            }}
          >
            {t("PLAN", "योजनेत")}
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "1rem",
          }}
        >
          {(cfg.features || []).map((feat, i) => (
            <div
              key={i}
              style={{
                background: C.surface,
                border: "1px solid rgba(255,255,255,.05)",
                padding: "1.5rem",
                position: "relative",
                overflow: "hidden",
                transition: "transform .3s",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div
                className="bb"
                style={{
                  position: "absolute",
                  top: ".6rem",
                  right: ".8rem",
                  fontSize: "3rem",
                  color: "rgba(255,77,28,.08)",
                  lineHeight: 1,
                }}
              >
                {"0" + (i + 1)}
              </div>
              <div
                className="clip"
                style={{
                  width: 40,
                  height: 40,
                  background: "rgba(255,77,28,.1)",
                  border: "1px solid rgba(255,77,28,.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  marginBottom: "1rem",
                }}
              >
                {feat.icon}
              </div>
              <h3
                className="bc"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  letterSpacing: 1,
                  marginBottom: ".4rem",
                  textTransform: "uppercase",
                }}
              >
                {t(feat.en, feat.mr)}
              </h3>
              <p
                style={{ fontSize: ".84rem", color: C.muted, lineHeight: 1.6 }}
              >
                {t(feat.d, feat.dm)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SCHEDULE */}
      <section style={{ padding: "4rem 2rem", background: C.bg2 }}>
        <div className="g2">
          <div>
            <div
              className="bc"
              style={{
                fontSize: ".72rem",
                letterSpacing: 4,
                textTransform: "uppercase",
                color: C.fire,
                fontWeight: 700,
                marginBottom: ".6rem",
              }}
            >
              {t("Batch Schedule", "बॅच वेळापत्रक")}
            </div>
            <div
              className="bb"
              style={{
                fontSize: "clamp(2rem,4vw,3.2rem)",
                lineHeight: 0.97,
                letterSpacing: 2,
                marginBottom: "1.5rem",
              }}
            >
              {t("CHOOSE YOUR ", "तुमची ")}
              <span
                style={{
                  WebkitTextStroke: "1.5px " + C.white,
                  color: "transparent",
                }}
              >
                {t("SLOT", "वेळ निवडा")}
              </span>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: ".7rem" }}
            >
              {(cfg.batches || []).map((batch, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".8rem",
                    padding: "1rem 1.2rem",
                    background: C.surface,
                    border: "1px solid rgba(255,255,255,.05)",
                    borderLeft: `3px solid ${C.fire}`,
                    transition: "transform .3s",
                    cursor: "default",
                    flexWrap: "wrap",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateX(5px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateX(0)")
                  }
                >
                  <span
                    className="bb"
                    style={{ fontSize: "1.3rem", letterSpacing: 2 }}
                  >
                    {batch.time}
                  </span>
                  <div
                    style={{
                      width: 1,
                      height: 22,
                      background: "rgba(255,255,255,.1)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="bc"
                    style={{
                      fontSize: ".68rem",
                      letterSpacing: 3,
                      textTransform: "uppercase",
                      fontWeight: 700,
                      color: C.muted,
                    }}
                  >
                    {t(batch.tag, batch.tagMr)}
                  </span>
                  <span
                    className="bc clip-sm"
                    style={{
                      marginLeft: "auto",
                      background: "rgba(255,77,28,.12)",
                      border: "1px solid rgba(255,77,28,.2)",
                      color: C.fire,
                      fontSize: ".62rem",
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      padding: ".2rem .6rem",
                      fontWeight: 700,
                    }}
                  >
                    {t("Open", "उपलब्ध")}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="ring-box">
            <div className="ring-sz">
              <svg
                viewBox="0 0 280 280"
                style={{
                  width: "100%",
                  height: "100%",
                  transform: "rotate(-90deg)",
                }}
              >
                <circle
                  cx="140"
                  cy="140"
                  r="130"
                  fill="none"
                  stroke="rgba(255,255,255,.05)"
                  strokeWidth="2"
                />
                <circle
                  cx="140"
                  cy="140"
                  r="130"
                  fill="none"
                  stroke={C.fire}
                  strokeWidth="2"
                  strokeDasharray="816"
                  strokeLinecap="round"
                  style={{
                    strokeDashoffset: 816,
                    animation:
                      "dIn 2s ease-out forwards .5s, gP 2s ease-in-out infinite 2.5s",
                    filter: "drop-shadow(0 0 6px rgba(255,77,28,.6))",
                  }}
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div
                  className="bc"
                  style={{
                    fontSize: ".6rem",
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    color: C.muted,
                    fontWeight: 700,
                  }}
                >
                  {t("Challenge", "आव्हान")}
                </div>
                <div
                  className="bb"
                  style={{
                    fontSize: "3.5rem",
                    letterSpacing: 3,
                    lineHeight: 1,
                  }}
                >
                  {p.days || 30}
                </div>
                <div
                  className="bc"
                  style={{
                    fontSize: ".65rem",
                    letterSpacing: 4,
                    textTransform: "uppercase",
                    color: C.muted,
                    fontWeight: 700,
                  }}
                >
                  {t("Days", "दिवस")}
                </div>
                <div
                  className="bc"
                  style={{
                    fontSize: ".8rem",
                    color: C.fire,
                    letterSpacing: 2,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    marginTop: ".2rem",
                  }}
                >
                  {t(p.startDate, p.startDateMr)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COACH */}
      <section style={{ padding: "4rem 2rem", background: C.bg }}>
        <div className="g2">
          <div
            style={{
              background: C.surface,
              border: `1px solid rgba(255,77,28,.12)`,
              padding: "1.8rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: `linear-gradient(90deg,${C.fire},${C.fire2})`,
              }}
            />
            <div
              className="bb"
              style={{
                fontSize: "2.2rem",
                letterSpacing: 3,
                lineHeight: 1.05,
                marginBottom: ".3rem",
              }}
            >
              {(b.short || b.coachName || "").toUpperCase()}
            </div>
            <div
              className="bc"
              style={{
                fontSize: ".72rem",
                letterSpacing: 4,
                textTransform: "uppercase",
                color: C.fire,
                fontWeight: 700,
                marginBottom: "1.2rem",
              }}
            >
              {t(b.role, b.roleMr)}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: ".7rem",
                marginBottom: "1.2rem",
              }}
            >
              {(cfg.coachStats || []).map((cs, i) => (
                <div
                  key={i}
                  style={{
                    background: C.bg,
                    padding: ".7rem .8rem",
                    border: "1px solid rgba(255,255,255,.05)",
                  }}
                >
                  <div
                    className="bb"
                    style={{ fontSize: "1.4rem", color: C.fire }}
                  >
                    {cs.num}
                  </div>
                  <div
                    className="bc"
                    style={{
                      fontSize: ".62rem",
                      color: C.muted,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      fontWeight: 600,
                    }}
                  >
                    {t(cs.l, cs.lm)}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                borderLeft: `3px solid ${C.fire}`,
                paddingLeft: ".8rem",
                fontStyle: "italic",
                color: C.muted,
                lineHeight: 1.6,
                fontSize: ".85rem",
              }}
            >
              "{t(b.quote, b.quoteMr)}"
            </div>
          </div>
          <div>
            <div
              className="bc"
              style={{
                fontSize: ".72rem",
                letterSpacing: 4,
                textTransform: "uppercase",
                color: C.fire,
                fontWeight: 700,
                marginBottom: ".5rem",
              }}
            >
              {t("Your Coach", "तुमचे प्रशिक्षक")}
            </div>
            <div
              className="bb"
              style={{
                fontSize: "clamp(2rem,4vw,3rem)",
                letterSpacing: 2,
                marginBottom: "1rem",
              }}
            >
              {t("COACHED BY ", "सर्वोत्तम ")}
              <span
                style={{
                  WebkitTextStroke: "1.5px " + C.white,
                  color: "transparent",
                }}
              >
                {t("THE BEST", "मार्गदर्शन")}
              </span>
            </div>
            <p
              style={{
                color: C.muted,
                lineHeight: 1.8,
                marginBottom: "1rem",
                fontSize: ".88rem",
              }}
            >
              {t(
                b.coachName +
                  " has helped hundreds of women and men lose weight without a gym — using whole foods, structured movement, and personal support.",
                (b.coachName || "") +
                  " यांनी शेकडो लोकांना जिमशिवाय वजन कमी करण्यास मदत केली आहे."
              )}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".5rem",
                marginBottom: "1.2rem",
              }}
            >
              {[
                {
                  icon: "📞",
                  l: t("Call or WhatsApp", "फोन / व्हॉट्सअप"),
                  v: b.phone,
                },
                {
                  icon: "📅",
                  l: t("Batch Starts", "बॅच सुरू"),
                  v: t(p.startDate, p.startDateMr),
                },
                {
                  icon: "⚡",
                  l: t("Availability", "उपलब्धता"),
                  v: t("Limited seats — filling fast!", "मर्यादित जागा!"),
                },
              ].map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".7rem",
                    padding: ".7rem .9rem",
                    background: C.surface,
                    border: "1px solid rgba(255,255,255,.05)",
                  }}
                >
                  <div
                    className="clip"
                    style={{
                      width: 30,
                      height: 30,
                      background: "rgba(255,77,28,.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: ".8rem",
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <div
                      className="bc"
                      style={{
                        fontSize: ".62rem",
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: C.fire,
                        fontWeight: 700,
                      }}
                    >
                      {c.l}
                    </div>
                    <div style={{ fontSize: ".85rem" }}>{c.v}</div>
                  </div>
                </div>
              ))}
            </div>
            <a
              href={`https://wa.me/${b.wa}?text=${encodeURIComponent(
                "Hi " + b.short + "!"
              )}`}
              target="_blank"
              className="bc clip"
              style={{
                background: `linear-gradient(135deg,${C.fire},${C.fire2})`,
                color: "#fff",
                padding: ".8rem 1.8rem",
                fontWeight: 700,
                fontSize: ".88rem",
                letterSpacing: 2,
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              {t("Message on WhatsApp", "व्हॉट्सअपवर संदेश")}
            </a>
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section
        id="book"
        style={{
          padding: "4rem 2rem",
          background: C.bg2,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: `linear-gradient(90deg,transparent,${C.fire},transparent)`,
          }}
        />
        <div className="g2b">
          <div>
            <div
              className="bc"
              style={{
                fontSize: ".72rem",
                letterSpacing: 4,
                textTransform: "uppercase",
                color: C.fire,
                fontWeight: 700,
                marginBottom: ".6rem",
              }}
            >
              {t("Enroll Now", "आत्ता नोंदणी करा")}
            </div>
            <div
              className="bb"
              style={{
                fontSize: "clamp(2rem,4vw,3.2rem)",
                lineHeight: 0.97,
                letterSpacing: 2,
                marginBottom: "1rem",
              }}
            >
              {t("SECURE YOUR SPOT", "तुमची जागा")}
              <br />
              {t("IN THE ", "निश्चित करा ")}
              <span
                style={{
                  WebkitTextStroke: "1.5px " + C.white,
                  color: "transparent",
                }}
              >
                {t("CHALLENGE", "आव्हानात")}
              </span>
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: ".5rem",
                background: "rgba(255,77,28,.1)",
                border: "1px solid rgba(255,77,28,.25)",
                padding: ".4rem .9rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  background: C.fire,
                  borderRadius: "50%",
                  animation: "pa 1.5s infinite",
                }}
              />
              <span
                className="bc"
                style={{
                  fontSize: ".72rem",
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: C.fire,
                  fontWeight: 700,
                }}
              >
                {t("Limited Seats Available", "मर्यादित जागा उपलब्ध")}
              </span>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
            >
              {[
                {
                  en: "Free Trial",
                  mr: "मोफत चाचणी",
                  s: t("no commitment", "कोणतेही बंधन नाही"),
                },
                {
                  en: "Personal Diet Plan",
                  mr: "वैयक्तिक डाएट",
                  s: t("for your kitchen", "तुमच्यासाठी"),
                },
                {
                  en: "Home Workouts",
                  mr: "घरचे व्यायाम",
                  s: t("zero equipment", "कोणतेही साधन नाही"),
                },
                {
                  en: "Daily Coaching",
                  mr: "रोजचे मार्गदर्शन",
                  s: t("direct access", "थेट संपर्क"),
                },
                {
                  en: "WhatsApp Support",
                  mr: "व्हॉट्सअप आधार",
                  s: t("reply within 24 hrs", "२४ तासांत उत्तर"),
                },
              ].map((pk, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: ".7rem",
                    fontSize: ".88rem",
                    color: C.muted,
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      background: `linear-gradient(135deg,${C.fire},${C.fire2})`,
                      clipPath: "polygon(50% 0%,100% 100%,0% 100%)",
                      flexShrink: 0,
                      marginTop: 3,
                    }}
                  />
                  <span>
                    <strong style={{ color: C.white }}>
                      {t(pk.en, pk.mr)}
                    </strong>{" "}
                    — {pk.s}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: C.surface,
              border: "1px solid rgba(255,255,255,.06)",
              borderTop: `3px solid ${C.fire}`,
              padding: "1.8rem",
            }}
          >
            {!submitted ? (
              <>
                <h3
                  className="bb"
                  style={{
                    fontSize: "1.6rem",
                    letterSpacing: 2,
                    marginBottom: ".2rem",
                  }}
                >
                  {t(f.title, f.titleMr)}
                </h3>
                <p
                  style={{
                    fontSize: ".8rem",
                    color: C.muted,
                    marginBottom: "1.2rem",
                  }}
                >
                  {t(f.sub, f.subMr)}
                </p>
                <div className="g2s">
                  <div>
                    <label
                      className="bc"
                      style={{
                        display: "block",
                        fontSize: ".66rem",
                        letterSpacing: 2.5,
                        textTransform: "uppercase",
                        color: C.muted,
                        fontWeight: 700,
                        marginBottom: ".35rem",
                      }}
                    >
                      {t("First Name", "पहिले नाव")}
                    </label>
                    <input
                      value={formData.fn}
                      onChange={(e) => setField("fn", e.target.value)}
                      placeholder={t("Priya", "प्रिया")}
                      className="clip"
                      style={{
                        width: "100%",
                        background: C.bg,
                        border: "1px solid rgba(255,255,255,.08)",
                        padding: ".7rem .8rem",
                        color: C.white,
                        fontSize: ".85rem",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="bc"
                      style={{
                        display: "block",
                        fontSize: ".66rem",
                        letterSpacing: 2.5,
                        textTransform: "uppercase",
                        color: C.muted,
                        fontWeight: 700,
                        marginBottom: ".35rem",
                      }}
                    >
                      {t("Last Name", "आडनाव")}
                    </label>
                    <input
                      value={formData.ln}
                      onChange={(e) => setField("ln", e.target.value)}
                      placeholder={t("Sharma", "शर्मा")}
                      className="clip"
                      style={{
                        width: "100%",
                        background: C.bg,
                        border: "1px solid rgba(255,255,255,.08)",
                        padding: ".7rem .8rem",
                        color: C.white,
                        fontSize: ".85rem",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>
                <div style={{ marginTop: ".7rem" }}>
                  <label
                    className="bc"
                    style={{
                      display: "block",
                      fontSize: ".66rem",
                      letterSpacing: 2.5,
                      textTransform: "uppercase",
                      color: C.muted,
                      fontWeight: 700,
                      marginBottom: ".35rem",
                    }}
                  >
                    {t("WhatsApp Number", "व्हॉट्सअप नंबर")}
                  </label>
                  <input
                    type="tel"
                    value={formData.ph}
                    onChange={(e) => setField("ph", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="clip"
                    style={{
                      width: "100%",
                      background: C.bg,
                      border: "1px solid rgba(255,255,255,.08)",
                      padding: ".7rem .8rem",
                      color: C.white,
                      fontSize: ".85rem",
                      outline: "none",
                    }}
                  />
                </div>
                <div style={{ marginTop: ".7rem" }}>
                  <label
                    className="bc"
                    style={{
                      display: "block",
                      fontSize: ".66rem",
                      letterSpacing: 2.5,
                      textTransform: "uppercase",
                      color: C.muted,
                      fontWeight: 700,
                      marginBottom: ".35rem",
                    }}
                  >
                    {t("Preferred Batch", "पसंतीचा बॅच")}
                  </label>
                  <select
                    value={formData.bat}
                    onChange={(e) => setField("bat", e.target.value)}
                    className="clip"
                    style={{
                      width: "100%",
                      background: C.bg,
                      border: "1px solid rgba(255,255,255,.08)",
                      padding: ".7rem .8rem",
                      color: C.white,
                      fontSize: ".85rem",
                      outline: "none",
                    }}
                  >
                    <option value="">
                      {t("Select a time slot...", "वेळ निवडा...")}
                    </option>
                    {(cfg.batches || []).map((b, i) => (
                      <option key={i} value={b.time}>
                        {b.time} ({t(b.tag, b.tagMr)})
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ marginTop: ".7rem" }}>
                  <label
                    className="bc"
                    style={{
                      display: "block",
                      fontSize: ".66rem",
                      letterSpacing: 2.5,
                      textTransform: "uppercase",
                      color: C.muted,
                      fontWeight: 700,
                      marginBottom: ".35rem",
                    }}
                  >
                    {t("Your Goal (optional)", "तुमचे ध्येय (पर्यायी)")}
                  </label>
                  <textarea
                    value={formData.gl}
                    onChange={(e) => setField("gl", e.target.value)}
                    placeholder={t("E.g. Lose 8 kg...", "उदा. ८ किलो कमी...")}
                    rows={3}
                    style={{
                      width: "100%",
                      background: C.bg,
                      border: "1px solid rgba(255,255,255,.08)",
                      padding: ".7rem .8rem",
                      color: C.white,
                      fontSize: ".85rem",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="bb clip"
                  style={{
                    width: "100%",
                    background: `linear-gradient(135deg,${C.fire},${C.fire2})`,
                    color: "#fff",
                    padding: ".9rem",
                    border: "none",
                    fontSize: "1.05rem",
                    letterSpacing: 4,
                    cursor: "pointer",
                    marginTop: ".8rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: ".5rem",
                    opacity: submitting ? 0.6 : 1,
                  }}
                >
                  {submitting && (
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        border: "2px solid rgba(255,255,255,.3)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        animation: "spin .7s linear infinite",
                      }}
                    />
                  )}
                  {t(f.btn, f.btnMr)}
                </button>
              </>
            ) : (
              <div
                style={{ textAlign: "center", padding: "2rem 0" }}
                className="fade-up"
              >
                <div style={{ fontSize: "2.5rem", marginBottom: ".8rem" }}>
                  🔥
                </div>
                <h3
                  className="bb"
                  style={{
                    fontSize: "1.8rem",
                    letterSpacing: 3,
                    color: C.fire,
                    marginBottom: ".4rem",
                  }}
                >
                  {t("YOU'RE IN!", "तुम्ही नोंदणी केली!")}
                </h3>
                <p
                  style={{
                    color: C.muted,
                    fontSize: ".85rem",
                    lineHeight: 1.6,
                  }}
                >
                  {t(
                    "We will reach out within 24 hours. Your transformation starts now!",
                    "आम्ही २४ तासांत संपर्क करू. तुमचे परिवर्तन आता सुरू!"
                  )}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: ".4rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    marginTop: ".8rem",
                  }}
                >
                  {cfg.googleForms?.enabled && (
                    <span
                      className="bc"
                      style={{
                        fontSize: ".68rem",
                        letterSpacing: 1.5,
                        textTransform: "uppercase",
                        padding: ".25rem .6rem",
                        fontWeight: 700,
                        borderRadius: 3,
                        background: "rgba(66,133,244,.15)",
                        border: "1px solid rgba(66,133,244,.3)",
                        color: "#93c5fd",
                      }}
                    >
                      ✓ Saved to Sheets
                    </span>
                  )}
                  {cfg.whatsapp?.enabled && (
                    <span
                      className="bc"
                      style={{
                        fontSize: ".68rem",
                        letterSpacing: 1.5,
                        textTransform: "uppercase",
                        padding: ".25rem .6rem",
                        fontWeight: 700,
                        borderRadius: 3,
                        background: "rgba(37,211,102,.12)",
                        border: "1px solid rgba(37,211,102,.3)",
                        color: "#6ee7b7",
                      }}
                    >
                      ✓ WhatsApp Sent
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: C.bg,
          borderTop: "1px solid rgba(255,255,255,.04)",
          padding: "1.5rem 2rem 5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: ".8rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <div
            style={{
              width: 16,
              height: 16,
              background: C.fire,
              clipPath: "polygon(50% 0%,100% 100%,0% 100%)",
            }}
          />
          <span className="bb" style={{ fontSize: ".95rem", letterSpacing: 2 }}>
            {t(b.brand, b.brandMr)}
          </span>
        </div>
        <span style={{ fontSize: ".72rem", color: C.muted2 }}>
          2026 {b.coachName}. All rights reserved.
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
          <button
            onClick={onAdmin}
            style={{
              background: "transparent",
              border: "none",
              color: C.muted2,
              cursor: "pointer",
              padding: ".3rem",
              opacity: 0.4,
              transition: "opacity .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.4)}
            title="Admin"
          >
            <Settings size={14} />
          </button>
          <span
            className="bc"
            style={{ fontSize: ".78rem", color: C.muted, letterSpacing: 1.5 }}
          >
            {b.phone}
          </span>
        </div>
      </footer>

      {/* WHATSAPP BUBBLE */}
      {cfg.bubble?.enabled && (
        <a
          href={`https://wa.me/${cfg.bubble?.number}?text=${encodeURIComponent(
            cfg.bubble?.msg || "Hi!"
          )}`}
          target="_blank"
          className="wa-float"
          title="Chat on WhatsApp"
        >
          💬
        </a>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [view, setView] = useState("loading");
  const [config, setConfig] = useState(DEF);

  useEffect(() => {
    (async () => {
      const stored = await loadCfg();
      if (stored) setConfig({ ...DEF, ...stored });
      setView("site");
    })();
  }, []);

  const handleSave = async (newCfg) => {
    setConfig(newCfg);
    await saveCfg(newCfg);
  };

  if (view === "loading")
    return (
      <div
        style={{
          minHeight: "100vh",
          background: C.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            border: `3px solid rgba(255,77,28,.2)`,
            borderTopColor: C.fire,
            borderRadius: "50%",
            animation: "spin .8s linear infinite",
          }}
        />
      </div>
    );

  return (
    <>
      <style>{GCSS}</style>
      {view === "site" && (
        <PublicSite config={config} onAdmin={() => setView("login")} />
      )}
      {view === "login" && (
        <AdminLogin
          password={config.password || DEF.password}
          onLogin={() => setView("admin")}
          onBack={() => setView("site")}
        />
      )}
      {view === "admin" && (
        <AdminDash
          config={config}
          onSave={handleSave}
          onExit={() => setView("site")}
        />
      )}
    </>
  );
}
