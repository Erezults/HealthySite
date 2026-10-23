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
// 10 / 30 / 100 packs) MUST match the credit counts in the App Store Connect
// product descriptions — ASC is the single source of truth. No prices here.
const en: Dict = {
  // Nav
  navPrivacy: 'Privacy',
  navTerms: 'Terms',
  navSupport: 'Support',
  navFaq: 'FAQ',
  navFeatures: 'Features',
  navPlans: 'Plans',
  navDownload: 'Download',

  // Hero
  heroEyebrow: 'Family health, in one place',
  heroTitleA: 'Your family’s',
  heroTitleB: 'health,',
  heroTitleEm: 'at a glance.',
  heroSub:
    'Appointments, prescriptions, labs, scans and vaccines — for everyone you care for, kept private in one calm, shared place.',
  appStoreL1: 'Download on the',
  appStoreL2: 'App Store',
  heroMeta: 'iOS & macOS · Hebrew & English',
  trustPrivate: 'Private by design',
  trustAi: 'AI reads your documents',
  trustCircle: 'One circle for everyone',

  // Showcase
  showcaseEyebrow: 'A closer look',
  showcaseTitleA: 'Designed to be',
  showcaseTitleB: 'quietly powerful.',
  showcaseSub:
    'From a single dashboard to deep insights — beautiful in light and dark mode, on iPhone, iPad and Mac.',
  cap1: 'Your family, at a glance',
  cap2: 'Track every vital that matters',
  cap3: 'Deep health insights',
  cap4: 'Just describe it — AI does the rest',
  cap5: 'Health for the whole family',
  cap6: 'Beautiful in dark mode',

  // Value strip
  valPrivacyTitle: 'Private by design',
  valPrivacyBody:
    'Records are visible only to your circle — protected by row-level security. Never sold, never used to train models.',
  valAiTitle: 'AI reads your documents',
  valAiBody:
    'Snap a lab result, a script or a vaccine card — AI turns it into clean, structured fields you can trust.',
  valFamilyTitle: 'One circle for the family',
  valFamilyBody:
    'Invite the people you care for and share a complete history in real time — on iPhone, iPad and Mac, in Hebrew or English.',

  // Plans
  subsEyebrow: 'Plans',
  subsTitleA: 'Start free.',
  subsTitleB: 'Grow with your circle.',
  subsSub:
    'Every plan includes unlimited manual records and free doctor sharing. AI is metered with simple credits you control.',
  subsFreeName: 'Free',
  subsFreeTagline: 'For getting started',
  subsFreeF1: 'Up to 2 family members',
  subsFreeF2: 'Unlimited manual records & sharing',
  subsFreeF3: 'Free doctor report sharing',
  subsFreeCredits: '5 AI credits / month',
  subsFamilyName: 'Family',
  subsFamilyTagline: 'For the whole household',
  subsFamilyBadge: 'Most popular',
  subsFamilyF1: 'Unlimited family members',
  subsFamilyF2: 'Full shared health history',
  subsFamilyF3: 'Real-time sync across devices',
  subsFamilyF4: 'Free doctor report sharing',
  subsFamilyCredits: '20 AI credits / month',
  subsLifetimeName: 'Family Lifetime',
  subsLifetimeTagline: 'One-time — never renews',
  subsLifetimeF1: 'Everything in Family',
  subsLifetimeF2: 'One-time purchase, pay once',
  subsLifetimeF3: 'No subscription, ever',
  subsLifetimeCredits: '30 AI credits / month, forever',
  subsAddonsTitle: 'AI add-ons',
  subsAddonsPill: 'monthly',
  subsAddonsDesc: 'Stack on any plan for more credits every month.',
  subsAiStarter: 'AI Starter',
  subsAiPro: 'AI Pro',
  subsAiMax: 'AI Max',
  subsPacksTitle: 'Credit packs',
  subsPacksPill: 'one-time',
  subsPacksDesc: 'Top up whenever you like — credits never expire.',
  subsPackUnit: 'credits',
  subsFineprint:
    'Each AI action uses 1 credit. Sharing a report with your doctor is always free. Prices are shown in the App Store.',
  subsCta: 'See plans in the App Store',

  // Closing
  closingTitleA: 'Keep everyone’s health',
  closingEm: 'close.',
  closingSub:
    'One private circle for the records that matter most. Free to start — on iPhone, iPad and Mac.',

  // Footer
  footerTagline:
    'A shared, private health record for the people you care for. Built with care.',
  footerProduct: 'Product',
  footerCompany: 'Company',
  footerLegal: '© 2026 Erez Cohen',
  footerMadePrefix: 'Made in',
  footerMadeCity: 'Tel Aviv, Israel',

  // Support page
  supportEyebrow: 'Support',
  supportTitle: 'We’re a small team. We answer.',
  supportSub:
    'Healthy Circle is built and supported by Erez Cohen. Real questions get real answers — usually within a day. Use the email, or read the FAQ.',
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

  // Accessibility
  navAccessibility: 'Accessibility',
  skipToContent: 'Skip to main content',
  a11yWidgetLabel: 'Accessibility options',
  a11yPanelTitle: 'Accessibility',
  a11yTextSize: 'Text size',
  a11yTextIncrease: 'Increase text size',
  a11yTextDecrease: 'Decrease text size',
  a11yTextReset: 'Reset text size',
  a11yHighContrast: 'High contrast',
  a11yStopAnimations: 'Stop animations',
  a11yStatementLink: 'Accessibility statement',
  a11yClose: 'Close accessibility panel',
};

const he: Dict = {
  // Nav
  navPrivacy: 'פרטיות',
  navTerms: 'תנאים',
  navSupport: 'תמיכה',
  navFaq: 'שאלות',
  navFeatures: 'תכונות',
  navPlans: 'מסלולים',
  navDownload: 'הורדה',

  // Hero
  heroEyebrow: 'בריאות המשפחה, במקום אחד',
  heroTitleA: 'הבריאות של',
  heroTitleB: 'המשפחה,',
  heroTitleEm: 'במבט אחד.',
  heroSub:
    'תורים, מרשמים, בדיקות מעבדה, צילומים וחיסונים — לכל מי שאתם דואגים לו, שמורים בפרטיות במקום אחד שקט ומשותף.',
  appStoreL1: 'הורד מ-',
  appStoreL2: 'App Store',
  heroMeta: 'iOS ו-macOS · עברית ואנגלית',
  trustPrivate: 'פרטי מעצם התכנון',
  trustAi: 'AI קורא את המסמכים',
  trustCircle: 'מעגל אחד לכולם',

  // Showcase
  showcaseEyebrow: 'מבט מקרוב',
  showcaseTitleA: 'תוכנן להיות',
  showcaseTitleB: 'חזק בשקט.',
  showcaseSub:
    'ממסך בית אחד ועד תובנות לעומק — יפהפה במצב בהיר וכהה, ב-iPhone, ב-iPad וב-Mac.',
  cap1: 'המשפחה שלך, במבט אחד',
  cap2: 'מעקב אחר כל מדד שחשוב',
  cap3: 'תובנות בריאות לעומק',
  cap4: 'פשוט תאר — וה-AI עושה את השאר',
  cap5: 'בריאות לכל המשפחה',
  cap6: 'יפהפה במצב כהה',

  // Value strip
  valPrivacyTitle: 'פרטי מעצם התכנון',
  valPrivacyBody:
    'הרשומות גלויות רק למעגל שלך — מוגנות ב-Row-Level Security. לעולם לא נמכרות, ולא משמשות לאימון מודלים.',
  valAiTitle: 'AI קורא את המסמכים',
  valAiBody:
    'צלם תוצאת מעבדה, מרשם או כרטיס חיסונים — וה-AI הופך אותו לשדות נקיים ומובנים שאפשר לסמוך עליהם.',
  valFamilyTitle: 'מעגל אחד למשפחה',
  valFamilyBody:
    'הזמן את מי שאתה דואג לו ושתף היסטוריה מלאה בזמן אמת — ב-iPhone, ב-iPad וב-Mac, בעברית או באנגלית.',

  // Plans
  subsEyebrow: 'מסלולים',
  subsTitleA: 'מתחילים בחינם.',
  subsTitleB: 'גדלים עם המעגל.',
  subsSub:
    'כל מסלול כולל רשומות ידניות ללא הגבלה ושיתוף חינם עם רופא. ה-AI נמדד בקרדיטים פשוטים בשליטתך.',
  subsFreeName: 'חינם',
  subsFreeTagline: 'להתחלה',
  subsFreeF1: 'עד 2 בני משפחה',
  subsFreeF2: 'רשומות ידניות ושיתוף ללא הגבלה',
  subsFreeF3: 'שיתוף דו״ח עם רופא — חינם',
  subsFreeCredits: '5 קרדיטי AI בחודש',
  subsFamilyName: 'משפחה',
  subsFamilyTagline: 'לכל הבית',
  subsFamilyBadge: 'הכי פופולרי',
  subsFamilyF1: 'בני משפחה ללא הגבלה',
  subsFamilyF2: 'היסטוריה רפואית משותפת מלאה',
  subsFamilyF3: 'סנכרון בזמן אמת בין מכשירים',
  subsFamilyF4: 'שיתוף דו״ח עם רופא — חינם',
  subsFamilyCredits: '20 קרדיטי AI בחודש',
  subsLifetimeName: 'משפחה לכל החיים',
  subsLifetimeTagline: 'חד-פעמי — בלי חידושים',
  subsLifetimeF1: 'כל מה שיש ב-Family',
  subsLifetimeF2: 'רכישה חד-פעמית, משלמים פעם אחת',
  subsLifetimeF3: 'בלי מנוי, לעולם',
  subsLifetimeCredits: '30 קרדיטי AI בחודש, לתמיד',
  subsAddonsTitle: 'תוספי AI',
  subsAddonsPill: 'חודשי',
  subsAddonsDesc: 'מתווספים על כל מסלול לעוד קרדיטים בכל חודש.',
  subsAiStarter: 'AI Starter',
  subsAiPro: 'AI Pro',
  subsAiMax: 'AI Max',
  subsPacksTitle: 'חבילות קרדיטים',
  subsPacksPill: 'חד-פעמי',
  subsPacksDesc: 'אפשר להוסיף מתי שרוצים — הקרדיטים לא פגים.',
  subsPackUnit: 'קרדיטים',
  subsFineprint:
    'כל פעולת AI צורכת קרדיט אחד. שיתוף דו״ח עם הרופא תמיד חינמי. המחירים מוצגים ב-App Store.',
  subsCta: 'צפה במסלולים ב-App Store',

  // Closing
  closingTitleA: 'שמרו את בריאות כולם',
  closingEm: 'קרוב.',
  closingSub:
    'מעגל פרטי אחד לרשומות שהכי חשובות. חינם להתחלה — ב-iPhone, ב-iPad וב-Mac.',

  // Footer
  footerTagline:
    'תיק בריאות משותף ופרטי לאנשים שאתם דואגים להם. נבנה בקפידה.',
  footerProduct: 'מוצר',
  footerCompany: 'החברה',
  footerLegal: '© 2026 ארז כהן',
  footerMadePrefix: 'נעשה ב',
  footerMadeCity: 'תל אביב, ישראל',

  // Support
  supportEyebrow: 'תמיכה',
  supportTitle: 'אנחנו צוות קטן. אנחנו עונים.',
  supportSub:
    'Healthy Circle מפותח ונתמך על-ידי ארז כהן. שאלות אמיתיות מקבלות תשובות אמיתיות — בדרך כלל תוך יום. כתבו לנו במייל, או עיינו בשאלות הנפוצות.',
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

  // Accessibility
  navAccessibility: 'נגישות',
  skipToContent: 'דלג לתוכן הראשי',
  a11yWidgetLabel: 'אפשרויות נגישות',
  a11yPanelTitle: 'נגישות',
  a11yTextSize: 'גודל טקסט',
  a11yTextIncrease: 'הגדל טקסט',
  a11yTextDecrease: 'הקטן טקסט',
  a11yTextReset: 'אפס גודל טקסט',
  a11yHighContrast: 'ניגודיות גבוהה',
  a11yStopAnimations: 'עצור אנימציות',
  a11yStatementLink: 'הצהרת נגישות',
  a11yClose: 'סגור פאנל נגישות',
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
        // No prior choice → auto-detect the browser language so a Hebrew visitor
        // landing directly on the site sees Hebrew first (matches /auth/confirm).
        else if (typeof navigator !== 'undefined' && navigator.language && navigator.language.toLowerCase().startsWith('he')) initial = 'he';
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
