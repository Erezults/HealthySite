'use client';

import { useI18n } from '@/lib/i18n';
import { CalendarDays, FlaskConical, Pill, ScanLine } from 'lucide-react';

export function Tour() {
  const { t, locale } = useI18n();

  const cards = [
    {
      icon: <CalendarDays className="w-5 h-5" />,
      title: locale === 'he' ? 'תורים ופגישות' : 'Appointments',
      body:
        locale === 'he'
          ? 'תזכורות אוטומטיות וציר זמן ברור לכל ביקור.'
          : 'Auto reminders. A clear timeline for every visit.',
      accent: '#2E5D44',
    },
    {
      icon: <Pill className="w-5 h-5" />,
      title: locale === 'he' ? 'מרשמים ותרופות' : 'Prescriptions',
      body:
        locale === 'he'
          ? 'נהל מרשמים, מינונים ותדירות לכל בן משפחה.'
          : 'Track active prescriptions, dosages, and refill dates.',
      accent: '#C36A4B',
    },
    {
      icon: <FlaskConical className="w-5 h-5" />,
      title: locale === 'he' ? 'מעבדה והדמיה' : 'Labs & imaging',
      body:
        locale === 'he'
          ? 'תוצאות מתויגות לפי תאריך, רופא וקטגוריה.'
          : 'Results tagged by date, clinician, and category.',
      accent: '#D9A23B',
    },
    {
      icon: <ScanLine className="w-5 h-5" />,
      title: locale === 'he' ? 'AI מבין מסמכים' : 'AI document scan',
      body:
        locale === 'he'
          ? 'צלם — וקבל סיכום מובנה תוך שניות.'
          : 'Scan a document — get a structured summary in seconds.',
      accent: '#6E9982',
    },
  ];

  return (
    <section
      id="tour"
      className="relative py-24 sm:py-32 border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">
            <span className="dot" />
            <span>{t('tourEyebrow')}</span>
          </span>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-tight text-[var(--color-text)]">
            {t('tourTitle')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--color-text-soft)] leading-relaxed max-w-xl">
            {t('tourSub')}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c, i) => (
            <div
              key={i}
              className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-paper)]/80 p-7 hover:bg-[var(--color-paper)] transition group"
              style={{ ['--feature-accent' as string]: c.accent }}
            >
              <span
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev)]"
                style={{ color: c.accent }}
              >
                {c.icon}
              </span>
              <h3 className="mt-5 font-display text-xl tracking-tight text-[var(--color-text)]">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-soft)] leading-relaxed">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
