'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type Locale = 'en' | 'he';

type Dict = Record<string, string | string[] | Array<Record<string, string>>>;

// NOTE: credit numbers below (5 / 20 / 30 base · +15 / +50 / +150 add-ons ·
// 10 / 30 / 100 packs) MUST match the credit counts written in the App Store
// Connect product descriptions — ASC is the single source of truth. Prices are
// never listed here; they live only in the App Store.
const en: Dict = {
  // Nav
  navPrivacy: 'Privacy',
  navTerms: 'Terms',
  navSupport: 'Support',
  navFaq: 'FAQ',

  // Hero
  heroEyebrow: 'iOS · macOS · Family health records',
  heroTitleA: 'A calmer home',
  heroTitleB: 'for your family’s health.',
  heroSub:
    'Healthy Circle is a shared health record for families — appointments, prescriptions, lab results, and scans, gathered in one private place. AI reads your documents. You stay in control.',
  heroCtaPrimary: 'Download on the App Store',
  heroCtaSecondary: 'See how it works',

  // Features
  featuresEyebrow: 'Built around four ideas',
  featuresTitle: 'Made for families who care for each other.',
  feat1Title: 'A shared family record',
  feat1Body:
    'Invite parents, partners, and siblings into one private circle. Every member has a profile; everyone sees the same up-to-date health timeline.',
  feat2Title: 'AI that reads your documents',
  feat2Body:
    'Scan a lab report, prescription, or referral letter. On-device capture plus secure cloud AI extract the dates, doctors, and values — automatically tagged and searchable.',
  feat3Title: 'iCloud-grade privacy',
  feat3Body:
    'End-to-end secure storage backed by Supabase with strict Row-Level Security. Your records are visible only to your group. Never sold. Never shared. Never trained on.',
  feat4Title: 'Hebrew & English, side by side',
  feat4Body:
    'Full RTL support with bilingual UI and OCR. Designed in Tel Aviv for families who speak both languages — and for any family, anywhere.',

  // Tour / sections (homepage)
  tourEyebrow: 'A quiet, focused home for everything medical',
  tourTitle: 'Records that finally make sense.',
  tourSub:
    'A timeline view per family member. Filter by category. Tap to read the AI summary. Open the original document any time.',

  // Subscriptions (homepage section)
  subsEyebrow: 'Simple, family-friendly plans',
  subsTitle: 'Start free. Upgrade only if you need more.',
  subsSub:
    'Healthy Circle is free to use. AI features run on credits — a paid plan or a one-time pack adds more. You can see every price in the App Store before you confirm.',
  subsFreeName: 'Free',
  subsFreeTagline: 'For getting started',
  subsFreeF1: 'Up to 2 family members',
  subsFreeF2: 'Unlimited manual records & sharing',
  subsFreeF3: '5 AI credits every month',
  subsFamilyName: 'Family',
  subsFamilyTagline: 'For the whole family',
  subsFamilyBadge: 'Most popular',
  subsFamilyF1: 'Unlimited family members',
  subsFamilyF2: 'Full shared history & real-time sync',
  subsFamilyF3: '20 AI credits every month',
  subsLifetimeName: 'Family Lifetime',
  subsLifetimeTagline: 'One payment, forever',
  subsLifetimeF1: 'Everything in Family — for life',
  subsLifetimeF2: 'One-time purchase, never renews',
  subsLifetimeF3: '30 AI credits every month, forever',
  subsAiTitle: 'Need more AI? Add credits.',
  subsAiSub: 'Stack a monthly AI add-on on top of any plan:',
  subsAiStarter: 'AI Starter',
  subsAiStarterAmt: '+15 credits / month',
  subsAiPro: 'AI Pro',
  subsAiProAmt: '+50 credits / month',
  subsAiMax: 'AI Max',
  subsAiMaxAmt: '+150 credits / month',
  subsBundlesTitle: 'Or buy credits once',
  subsBundles:
    'Prefer not to subscribe? One-time packs of 10, 30, or 100 credits — they never expire and stack on top of whatever you have.',
  subsCreditNote:
    'Each AI action — a document scan, an analysis, or a chat message — uses 1 credit. Sharing a report with your doctor is always free.',
  subsPriceNote:
    'Prices appear in the App Store before you confirm. Subscriptions auto-renew until canceled in iOS Settings; refunds are handled by Apple.',
  subsCta: 'See plans in the App Store',

  // Trust strip — repeating values
  trust1: 'Made in Tel Aviv',
  trust2: 'iOS & macOS',
  trust3: 'No ads',
  trust4: 'No tracking',
  trust5: 'No data sold',
  trust6: 'You own your data',

  // Closing band
  closingTitle: 'Take a breath. Healthy Circle has it.',
  closingSub:
    'One private home for your family’s health. From scans to prescriptions. From parents to partners.',
  closingCta: 'Download on the App Store',

  // Footer
  footerTagline:
    'A shared, private home for your family’s health records — iOS & macOS.',
  footerLegal: '© 2026 Erez Cohen · All rights reserved.',
  footerMadeIn: 'Made in Tel Aviv, Israel',

  // Support page
  supportEyebrow: 'Support',
  supportTitle: 'We’re a small team. We answer.',
  supportSub:
    'Healthy Circle is built and supported by Erez Cohen. Real questions get real answers — usually within a day. Use the form, the email, or read the FAQ.',
  supportEmailCta: 'Email healthy.support@erezults.com',
  supportFaqLink: 'Browse the FAQ',
  supportFaqLinkSub: 'Privacy, AI, plans, credits, and your data — all answered.',

  // FAQ page
  faqPageEyebrow: 'FAQ',
  faqPageTitle: 'Questions, answered.',
  faqPageSub:
    'Everything about privacy, AI, plans, and your data. Still stuck? The support page has a direct line to the developer.',
  faqCatGeneral: 'General',
  faqCatPrivacy: 'Privacy & security',
  faqCatAi: 'AI & documents',
  faqCatPlans: 'Plans & credits',
  faqCatData: 'Your data',

  faq1Q: 'Who can see my family’s records?',
  faq1A:
    'Only members of your invited group. Healthy Circle uses Supabase Row-Level Security so the database itself refuses to return rows that don’t belong to your group — there is no admin override. You can remove a member at any time and revoke their access.',
  faq2Q: 'Is the AI reading my medical documents?',
  faq2A:
    'When you upload a document, we send it to Google’s Gemini model via a secure server-side Edge Function only to extract structured fields (dates, results, medication names). It is not used to train any model, and the raw document stays in your private storage bucket.',
  faq3Q: 'What happens if I delete a member or my account?',
  faq3A:
    'Deleting a member removes their profile and records permanently from the database and storage. Deleting your account removes you from every group; if you were the last member of a group, that group and its records are removed too. Deletion is final.',
  faq4Q: 'Does Healthy Circle work with Apple Health?',
  faq4A:
    'Not yet. We don’t read or write to HealthKit in this release. Records you add live only inside Healthy Circle. If we add HealthKit integration later, it will be opt-in per data type and clearly disclosed.',
  faq5Q: 'Can I export my data?',
  faq5A:
    'Yes. Open Settings → Export. You get a ZIP containing every record as a JSON file plus the original attachments. Bring your data with you, anywhere, anytime.',
  faq6Q: 'Is this a medical device or medical advice?',
  faq6A:
    'No. Healthy Circle is a personal record-keeping tool. It is not a medical device, does not diagnose, and is not a substitute for professional medical advice. Always consult a qualified doctor for medical decisions.',
  faq7Q: 'Do you support Hebrew and RTL?',
  faq7A:
    'Yes — fully. The entire UI mirrors for RTL, the AI reads Hebrew prescriptions and lab reports, and the typography uses Frank Ruhl Libre + Heebo for a clean Hebrew reading experience.',
  faq8Q: 'How much does it cost?',
  faq8A:
    'Healthy Circle is free to use, including 5 AI credits every month. Paid Family plans and AI add-ons give you more members and more monthly credits, and one-time credit packs are also available. Prices are shown in the App Store, and you can cancel anytime.',
  faq9Q: 'What’s free, and what needs a paid plan?',
  faq9A:
    'Manual records, family sharing, and sync are free, and every account gets 5 AI credits each month. A paid Family plan unlocks unlimited family members and a larger monthly credit allowance; AI add-ons and one-time credit packs add even more.',
  faq10Q: 'What is a “credit,” and what uses one?',
  faq10A:
    'AI features run on credits: each document scan, lab or metric analysis, AI summary, or chat message uses one credit. Sharing a report with your doctor is always free and never uses a credit.',
  faq11Q: 'What plans are available?',
  faq11A:
    'Free (up to 2 members, 5 credits/month), Family (unlimited members, 20 credits/month), and Family Lifetime (a one-time purchase with 30 credits/month for life). On top of any plan you can add AI Starter (+15), AI Pro (+50), or AI Max (+150) credits per month.',
  faq12Q: 'Can I buy credits without a subscription?',
  faq12A:
    'Yes. One-time credit packs of 10, 30, or 100 credits are available as a single purchase, and they never expire — they simply stack on top of whatever you already have.',
  faq13Q: 'Do credits expire, or shrink if I downgrade?',
  faq13A:
    'No. Credits accumulate and are never deleted — not monthly, not when you change plans. Downgrading only lowers your next monthly grant; the balance you’ve already built up stays.',
  faq14Q: 'How do I see prices, cancel, or get a refund?',
  faq14A:
    'Prices are shown in the App Store before you confirm anything. Subscriptions auto-renew until canceled in iOS Settings → Apple ID → Subscriptions. All refunds are handled by Apple at reportaproblem.apple.com.',

  // Legal page common
  legalLastUpdated: 'Last updated',
  legalBackHome: '← Back to home',
};

const he: Dict = {
  // Nav
  navPrivacy: 'פרטיות',
  navTerms: 'תנאים',
  navSupport: 'תמיכה',
  navFaq: 'שאלות',

  // Hero
  heroEyebrow: 'iOS · macOS · רשומות בריאות למשפחה',
  heroTitleA: 'בית שקט',
  heroTitleB: 'לבריאות המשפחה.',
  heroSub:
    'Healthy Circle הוא תיק בריאות משפחתי משותף — תורים, מרשמים, תוצאות מעבדה וצילומים, במקום פרטי אחד. בינה מלאכותית קוראת את המסמכים. השליטה תמיד אצלך.',
  heroCtaPrimary: 'הורד מה-App Store',
  heroCtaSecondary: 'איך זה עובד',

  // Features
  featuresEyebrow: 'בנוי סביב ארבעה רעיונות',
  featuresTitle: 'נבנה למשפחות שדואגות אחת לשנייה.',
  feat1Title: 'תיק בריאות משפחתי משותף',
  feat1Body:
    'הזמן הורים, בני זוג ואחים למעגל פרטי אחד. לכל בן משפחה יש פרופיל, וכולם רואים את אותו ציר זמן רפואי עדכני.',
  feat2Title: 'בינה מלאכותית שקוראת את המסמכים שלך',
  feat2Body:
    'סרוק דוח מעבדה, מרשם או הפניה. צילום במכשיר ו-AI מאובטח בענן שולפים את התאריכים, השמות והערכים — אוטומטית, מתויג וזמין לחיפוש.',
  feat3Title: 'פרטיות ברמת iCloud',
  feat3Body:
    'אחסון מאובטח על Supabase עם Row-Level Security נוקשה. הרשומות שלך גלויות רק לקבוצה שלך. לעולם לא נמכרות, לא משותפות, ולא משמשות לאימון מודלים.',
  feat4Title: 'עברית ואנגלית, זו לצד זו',
  feat4Body:
    'תמיכה מלאה ב-RTL עם ממשק דו-לשוני ו-OCR. תוכנן בתל אביב למשפחות דו-לשוניות — ולכל משפחה בכל מקום.',

  // Tour
  tourEyebrow: 'בית שקט וממוקד לכל מה שרפואי',
  tourTitle: 'רשומות שסוף-סוף מסודרות.',
  tourSub:
    'ציר זמן לכל בן משפחה. סינון לפי קטגוריה. נגיעה פותחת את סיכום ה-AI. המסמך המקורי תמיד זמין.',

  // Subscriptions (homepage section)
  subsEyebrow: 'מסלולים פשוטים, ידידותיים למשפחה',
  subsTitle: 'מתחילים בחינם. משדרגים רק אם צריך עוד.',
  subsSub:
    'Healthy Circle חינמי לשימוש. תכונות ה-AI פועלות על קרדיטים — מסלול בתשלום או חבילה חד-פעמית מוסיפים עוד. את כל המחירים אפשר לראות ב-App Store לפני האישור.',
  subsFreeName: 'חינם',
  subsFreeTagline: 'להתחלה',
  subsFreeF1: 'עד 2 בני משפחה',
  subsFreeF2: 'רשומות ידניות ושיתוף ללא הגבלה',
  subsFreeF3: '5 קרדיטי AI בכל חודש',
  subsFamilyName: 'משפחה',
  subsFamilyTagline: 'לכל המשפחה',
  subsFamilyBadge: 'הכי פופולרי',
  subsFamilyF1: 'בני משפחה ללא הגבלה',
  subsFamilyF2: 'היסטוריה משותפת מלאה וסנכרון בזמן אמת',
  subsFamilyF3: '20 קרדיטי AI בכל חודש',
  subsLifetimeName: 'משפחה לכל החיים',
  subsLifetimeTagline: 'תשלום אחד, לתמיד',
  subsLifetimeF1: 'כל מה שיש ב-Family — לכל החיים',
  subsLifetimeF2: 'רכישה חד-פעמית, בלי חידושים לעולם',
  subsLifetimeF3: '30 קרדיטי AI בכל חודש, לתמיד',
  subsAiTitle: 'צריך עוד AI? הוסף קרדיטים.',
  subsAiSub: 'אפשר להוסיף תוסף AI חודשי על גבי כל מסלול:',
  subsAiStarter: 'AI Starter',
  subsAiStarterAmt: '+15 קרדיטים בחודש',
  subsAiPro: 'AI Pro',
  subsAiProAmt: '+50 קרדיטים בחודש',
  subsAiMax: 'AI Max',
  subsAiMaxAmt: '+150 קרדיטים בחודש',
  subsBundlesTitle: 'או לקנות קרדיטים פעם אחת',
  subsBundles:
    'מעדיפים בלי מנוי? חבילות חד-פעמיות של 10, 30 או 100 קרדיטים — שאינן פגות ומתווספות על מה שכבר יש לכם.',
  subsCreditNote:
    'כל פעולת AI — סריקת מסמך, ניתוח או הודעת צ׳אט — צורכת קרדיט אחד. שיתוף דו״ח עם הרופא תמיד חינמי.',
  subsPriceNote:
    'המחירים מופיעים ב-App Store לפני האישור. המנויים מתחדשים אוטומטית עד לביטול ב-iOS Settings; החזרים מטופלים על-ידי Apple.',
  subsCta: 'צפה במסלולים ב-App Store',

  // Trust strip
  trust1: 'תוצרת תל אביב',
  trust2: 'iOS ו-macOS',
  trust3: 'בלי פרסומות',
  trust4: 'בלי tracking',
  trust5: 'בלי מכירת נתונים',
  trust6: 'המידע שלך — שלך',

  // Closing
  closingTitle: 'נשום עמוק. Healthy Circle איתך.',
  closingSub:
    'בית פרטי אחד לבריאות המשפחה. מצילומים ועד מרשמים. מהורים ועד בני זוג.',
  closingCta: 'הורד מה-App Store',

  // Footer
  footerTagline:
    'בית משותף ופרטי לרשומות הבריאות של המשפחה — iOS ו-macOS.',
  footerLegal: '© 2026 ארז כהן · כל הזכויות שמורות.',
  footerMadeIn: 'נעשה בתל אביב, ישראל',

  // Support
  supportEyebrow: 'תמיכה',
  supportTitle: 'אנחנו צוות קטן. אנחנו עונים.',
  supportSub:
    'Healthy Circle מפותח ונתמך על-ידי ארז כהן. שאלות אמיתיות מקבלות תשובות אמיתיות — בדרך כלל תוך יום. השתמש בטופס, במייל או בשאלות הנפוצות.',
  supportEmailCta: 'שלח מייל ל-healthy.support@erezults.com',
  supportFaqLink: 'לשאלות הנפוצות',
  supportFaqLinkSub: 'פרטיות, AI, מסלולים, קרדיטים והנתונים שלך — הכול במקום אחד.',

  // FAQ page
  faqPageEyebrow: 'שאלות נפוצות',
  faqPageTitle: 'שאלות, עם תשובות.',
  faqPageSub:
    'כל מה שצריך לדעת על פרטיות, AI, מסלולים והנתונים שלך. עדיין תקועים? בעמוד התמיכה יש קו ישיר למפתח.',
  faqCatGeneral: 'כללי',
  faqCatPrivacy: 'פרטיות ואבטחה',
  faqCatAi: 'AI ומסמכים',
  faqCatPlans: 'מסלולים וקרדיטים',
  faqCatData: 'הנתונים שלך',

  faq1Q: 'מי יכול לראות את הרשומות של המשפחה שלי?',
  faq1A:
    'רק חברי הקבוצה שהוזמנו. Healthy Circle משתמש ב-Row-Level Security של Supabase, כך שבסיס הנתונים עצמו מסרב להחזיר שורות שלא שייכות לקבוצה שלך — אין override של מנהל. ניתן להסיר חבר בכל עת ולשלול את הגישה שלו.',
  faq2Q: 'האם ה-AI קורא את המסמכים הרפואיים שלי?',
  faq2A:
    'כשמעלים מסמך, אנחנו שולחים אותו למודל Gemini של Google דרך Edge Function מאובטח רק כדי לחלץ שדות מובנים (תאריכים, תוצאות, שמות תרופות). הוא לא משמש לאימון אף מודל, והמסמך המקורי נשאר ב-storage הפרטי שלך.',
  faq3Q: 'מה קורה כשמוחקים בן משפחה או חשבון?',
  faq3A:
    'מחיקת בן משפחה מסירה לצמיתות את הפרופיל והרשומות מבסיס הנתונים ומה-storage. מחיקת חשבון מסירה אותך מכל הקבוצות; אם היית החבר האחרון בקבוצה — היא והרשומות שלה נמחקות גם. המחיקה סופית.',
  faq4Q: 'האם Healthy Circle עובד עם Apple Health?',
  faq4A:
    'עדיין לא. בגרסה זו אנחנו לא קוראים או כותבים ל-HealthKit. הרשומות שתוסיף נשארות בתוך Healthy Circle בלבד. אם נוסיף שילוב עם HealthKit בעתיד, זה יהיה opt-in לכל סוג מידע ועם גילוי מלא.',
  faq5Q: 'אפשר לייצא את המידע שלי?',
  faq5A:
    'כן. הגדרות ← ייצוא. תקבל ZIP עם כל רשומה כקובץ JSON וכל הקבצים המקוריים. קח את המידע שלך לכל מקום, בכל זמן.',
  faq6Q: 'האם זה התקן רפואי או ייעוץ רפואי?',
  faq6A:
    'לא. Healthy Circle הוא כלי אישי לניהול רשומות. אינו התקן רפואי, אינו מאבחן, ואינו תחליף לייעוץ רפואי מקצועי. לכל החלטה רפואית — התייעץ עם רופא מוסמך.',
  faq7Q: 'יש תמיכה בעברית ו-RTL?',
  faq7A:
    'כן — מלאה. כל הממשק מתהפך ל-RTL, ה-AI קורא מרשמים ובדיקות מעבדה בעברית, והטיפוגרפיה משלבת Frank Ruhl Libre עם Heebo לחוויית קריאה נקייה בעברית.',
  faq8Q: 'כמה זה עולה?',
  faq8A:
    'Healthy Circle חינמי לשימוש, כולל 5 קרדיטי AI בכל חודש. מסלולי Family בתשלום ותוספי AI נותנים יותר בני משפחה ויותר קרדיטים חודשיים, וקיימות גם חבילות קרדיטים חד-פעמיות. המחירים מוצגים ב-App Store, וניתן לבטל בכל עת.',
  faq9Q: 'מה חינמי, ומה דורש מסלול בתשלום?',
  faq9A:
    'רשומות ידניות, שיתוף משפחתי וסנכרון — חינמיים, וכל חשבון מקבל 5 קרדיטי AI בכל חודש. מסלול Family בתשלום פותח בני משפחה ללא הגבלה ומכסת קרדיטים חודשית גדולה יותר; תוספי AI וחבילות קרדיטים חד-פעמיות מוסיפים עוד.',
  faq10Q: 'מהו "קרדיט", ומה צורך אותו?',
  faq10A:
    'תכונות ה-AI פועלות על קרדיטים: כל סריקת מסמך, ניתוח מדד או בדיקה, סיכום AI או הודעת צ׳אט — צורכים קרדיט אחד. שיתוף דו״ח עם הרופא תמיד חינמי ולא צורך קרדיט.',
  faq11Q: 'אילו מסלולים קיימים?',
  faq11A:
    'חינם (עד 2 בני משפחה, 5 קרדיטים בחודש), Family (בני משפחה ללא הגבלה, 20 קרדיטים בחודש), ו-Family Lifetime (רכישה חד-פעמית עם 30 קרדיטים בחודש לכל החיים). על גבי כל מסלול אפשר להוסיף AI Starter (15+), AI Pro (50+) או AI Max (150+) קרדיטים בחודש.',
  faq12Q: 'אפשר לקנות קרדיטים בלי מנוי?',
  faq12A:
    'כן. חבילות קרדיטים חד-פעמיות של 10, 30 או 100 קרדיטים זמינות כרכישה בודדת, והן אינן פגות לעולם — הן פשוט מתווספות על מה שכבר יש לך.',
  faq13Q: 'האם קרדיטים פגים, או מתכווצים בהורדת מסלול?',
  faq13A:
    'לא. הקרדיטים נצברים ולעולם אינם נמחקים — לא חודשית, ולא במעבר בין מסלולים. הורדת מסלול רק מקטינה את ההקצאה החודשית הבאה; היתרה שכבר צברת נשמרת.',
  faq14Q: 'איך רואים מחירים, מבטלים, או מקבלים החזר?',
  faq14A:
    'המחירים מוצגים ב-App Store לפני כל אישור. מנויים מתחדשים אוטומטית עד לביטול ב-iOS Settings ← Apple ID ← Subscriptions. כל ההחזרים מטופלים על-ידי Apple בכתובת reportaproblem.apple.com.',

  // Legal common
  legalLastUpdated: 'עודכן לאחרונה',
  legalBackHome: 'חזרה לעמוד הבית →',
};

const dicts: Record<Locale, Dict> = { en, he };

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: keyof typeof en) => string;
  dir: 'ltr' | 'rtl';
};

const I18nContext = createContext<Ctx | null>(null);

const STORAGE_KEY = 'healthy-locale';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let initial: Locale | null = null;
    if (typeof window !== 'undefined') {
      const urlLang = new URLSearchParams(window.location.search).get('lang');
      if (urlLang === 'he' || urlLang === 'en') {
        initial = urlLang;
        localStorage.setItem(STORAGE_KEY, urlLang);
      } else {
        const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
        if (stored === 'en' || stored === 'he') initial = stored;
      }
    }
    if (initial) setLocaleState(initial);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === 'he' ? 'rtl' : 'ltr';
    html.dataset.locale = locale;
  }, [locale, hydrated]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const t = (key: keyof typeof en): string => {
    const v = dicts[locale][key as string];
    if (Array.isArray(v)) return v.join(', ');
    return (v as string) ?? (en[key as string] as string) ?? String(key);
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t,
        dir: locale === 'he' ? 'rtl' : 'ltr',
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
