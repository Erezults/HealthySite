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

const en: Dict = {
  // Nav
  navPrivacy: 'Privacy',
  navTerms: 'Terms',
  navSupport: 'Support',

  // Hero
  heroEyebrow: 'iOS · macOS · Family health records',
  heroTitleA: 'A calmer home',
  heroTitleB: 'for your family’s health.',
  heroSub:
    'Healthy is a shared health record for families — appointments, prescriptions, lab results, and scans, gathered in one private place. AI reads your documents. You stay in control.',
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

  // Trust strip — repeating values
  trust1: 'Made in Tel Aviv',
  trust2: 'iOS & macOS',
  trust3: 'No ads',
  trust4: 'No tracking',
  trust5: 'No data sold',
  trust6: 'You own your data',

  // Closing band
  closingTitle: 'Take a breath. Healthy has it.',
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
    'Healthy is built and supported by Erez Cohen. Real questions get real answers — usually within a day. Use the form, the email, or the FAQ below.',
  supportEmailCta: 'Email healthy.support@erezults.com',
  supportFaqTitle: 'Frequently asked',

  faq1Q: 'Who can see my family’s records?',
  faq1A:
    'Only members of your invited group. Healthy uses Supabase Row-Level Security so the database itself refuses to return rows that don’t belong to your group — there is no admin override. You can remove a member at any time and revoke their access.',
  faq2Q: 'Is the AI reading my medical documents?',
  faq2A:
    'When you upload a document, we send it to Google’s Gemini model via a secure server-side Edge Function only to extract structured fields (dates, results, medication names). It is not used to train any model, and the raw document stays in your private storage bucket.',
  faq3Q: 'What happens if I delete a member or my account?',
  faq3A:
    'Deleting a member removes their profile and records permanently from the database and storage. Deleting your account removes you from every group; if you were the last member of a group, that group and its records are removed too. Deletion is final.',
  faq4Q: 'Does Healthy work with Apple Health?',
  faq4A:
    'Not yet. We don’t read or write to HealthKit in this release. Records you add to Healthy live only inside Healthy. If we add HealthKit integration later, it will be opt-in per data type and clearly disclosed.',
  faq5Q: 'Can I export my data?',
  faq5A:
    'Yes. Open Settings → Export. You get a ZIP containing every record as a JSON file plus the original attachments. Bring your data with you, anywhere, anytime.',
  faq6Q: 'Is this a medical device or medical advice?',
  faq6A:
    'No. Healthy is a personal record-keeping tool. It is not a medical device, does not diagnose, and is not a substitute for professional medical advice. Always consult a qualified doctor for medical decisions.',
  faq7Q: 'Do you support Hebrew and RTL?',
  faq7A:
    'Yes — fully. The entire UI mirrors for RTL, the AI reads Hebrew prescriptions and lab reports, and the typography uses Frank Ruhl Libre + Heebo for a clean Hebrew reading experience.',
  faq8Q: 'How much does it cost?',
  faq8A:
    'The core app — manual records, group sharing, sync — is free. Document scanning powered by AI is included in a Premium tier (billing handled through the App Store; cancel any time in iOS Settings).',

  // Legal page common
  legalLastUpdated: 'Last updated',
  legalBackHome: '← Back to home',
};

const he: Dict = {
  // Nav
  navPrivacy: 'פרטיות',
  navTerms: 'תנאים',
  navSupport: 'תמיכה',

  // Hero
  heroEyebrow: 'iOS · macOS · רשומות בריאות למשפחה',
  heroTitleA: 'בית שקט',
  heroTitleB: 'לבריאות המשפחה.',
  heroSub:
    'Healthy הוא תיק בריאות משפחתי משותף — תורים, מרשמים, תוצאות מעבדה וצילומים, במקום פרטי אחד. בינה מלאכותית קוראת את המסמכים. השליטה תמיד אצלך.',
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

  // Trust strip
  trust1: 'תוצרת תל אביב',
  trust2: 'iOS ו-macOS',
  trust3: 'בלי פרסומות',
  trust4: 'בלי tracking',
  trust5: 'בלי מכירת נתונים',
  trust6: 'המידע שלך — שלך',

  // Closing
  closingTitle: 'נשום עמוק. Healthy איתך.',
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
    'Healthy מפותח ונתמך על-ידי ארז כהן. שאלות אמיתיות מקבלות תשובות אמיתיות — בדרך כלל תוך יום. השתמש בטופס, במייל או בשאלות הנפוצות.',
  supportEmailCta: 'שלח מייל ל-healthy.support@erezults.com',
  supportFaqTitle: 'שאלות נפוצות',

  faq1Q: 'מי יכול לראות את הרשומות של המשפחה שלי?',
  faq1A:
    'רק חברי הקבוצה שהוזמנו. Healthy משתמש ב-Row-Level Security של Supabase, כך שבסיס הנתונים עצמו מסרב להחזיר שורות שלא שייכות לקבוצה שלך — אין override של מנהל. ניתן להסיר חבר בכל עת ולשלול את הגישה שלו.',
  faq2Q: 'האם ה-AI קורא את המסמכים הרפואיים שלי?',
  faq2A:
    'כשמעלים מסמך, אנחנו שולחים אותו למודל Gemini של Google דרך Edge Function מאובטח רק כדי לחלץ שדות מובנים (תאריכים, תוצאות, שמות תרופות). הוא לא משמש לאימון אף מודל, והמסמך המקורי נשאר ב-storage הפרטי שלך.',
  faq3Q: 'מה קורה כשמוחקים בן משפחה או חשבון?',
  faq3A:
    'מחיקת בן משפחה מסירה לצמיתות את הפרופיל והרשומות מבסיס הנתונים ומה-storage. מחיקת חשבון מסירה אותך מכל הקבוצות; אם היית החבר האחרון בקבוצה — היא והרשומות שלה נמחקות גם. המחיקה סופית.',
  faq4Q: 'האם Healthy עובד עם Apple Health?',
  faq4A:
    'עדיין לא. בגרסה זו אנחנו לא קוראים או כותבים ל-HealthKit. הרשומות שתוסיף נשארות בתוך Healthy בלבד. אם נוסיף שילוב עם HealthKit בעתיד, זה יהיה opt-in לכל סוג מידע ועם גילוי מלא.',
  faq5Q: 'אפשר לייצא את המידע שלי?',
  faq5A:
    'כן. הגדרות ← ייצוא. תקבל ZIP עם כל רשומה כקובץ JSON וכל הקבצים המקוריים. קח את המידע שלך לכל מקום, בכל זמן.',
  faq6Q: 'האם זה התקן רפואי או ייעוץ רפואי?',
  faq6A:
    'לא. Healthy הוא כלי אישי לניהול רשומות. אינו התקן רפואי, אינו מאבחן, ואינו תחליף לייעוץ רפואי מקצועי. לכל החלטה רפואית — התייעץ עם רופא מוסמך.',
  faq7Q: 'יש תמיכה בעברית ו-RTL?',
  faq7A:
    'כן — מלאה. כל הממשק מתהפך ל-RTL, ה-AI קורא מרשמים ובדיקות מעבדה בעברית, והטיפוגרפיה משלבת Frank Ruhl Libre עם Heebo לחוויית קריאה נקייה בעברית.',
  faq8Q: 'כמה זה עולה?',
  faq8A:
    'הליבה — רשומות ידניות, שיתוף בקבוצה, סנכרון — בחינם. סריקת מסמכים ב-AI כלולה ב-Premium (חיוב דרך ה-App Store; ניתן לבטל בכל עת ב-iOS Settings).',

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
