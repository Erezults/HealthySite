'use client';

import { useI18n } from '@/lib/i18n';
import { FaqAccordion } from './FaqAccordion';
import { SUPPORT_EMAIL } from '@/lib/links';
import { Mail } from 'lucide-react';

export function FaqContent() {
  const { t } = useI18n();

  const groups: Array<{ title: string; items: Array<{ q: string; a: string }> }> = [
    {
      title: t('faqCatGeneral'),
      items: [
        { q: t('faq6Q'), a: t('faq6A') },
        { q: t('faq7Q'), a: t('faq7A') },
      ],
    },
    {
      title: t('faqCatPrivacy'),
      items: [
        { q: t('faq1Q'), a: t('faq1A') },
        { q: t('faq3Q'), a: t('faq3A') },
      ],
    },
    {
      title: t('faqCatAi'),
      items: [
        { q: t('faq2Q'), a: t('faq2A') },
        { q: t('faq10Q'), a: t('faq10A') },
      ],
    },
    {
      title: t('faqCatPlans'),
      items: [
        { q: t('faq8Q'), a: t('faq8A') },
        { q: t('faq9Q'), a: t('faq9A') },
        { q: t('faq11Q'), a: t('faq11A') },
        { q: t('faq12Q'), a: t('faq12A') },
        { q: t('faq13Q'), a: t('faq13A') },
        { q: t('faq14Q'), a: t('faq14A') },
      ],
    },
    {
      title: t('faqCatData'),
      items: [
        { q: t('faq4Q'), a: t('faq4A') },
        { q: t('faq5Q'), a: t('faq5A') },
      ],
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden">
        <span
          className="sun"
          style={{
            width: 760,
            height: 760,
            top: -360,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0.5,
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 pt-20 sm:pt-28 pb-10 text-center">
          <span className="eyebrow">
            <span className="dot" />
            <span>{t('faqPageEyebrow')}</span>
          </span>
          <h1 className="mt-8 font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.05] tracking-tight text-[var(--color-text)]">
            {t('faqPageTitle')}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[var(--color-text-soft)] max-w-xl mx-auto leading-relaxed">
            {t('faqPageSub')}
          </p>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 space-y-14">
          {groups.map((g, i) => (
            <div key={i}>
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-[var(--color-text)] mb-6">
                {g.title}
              </h2>
              <FaqAccordion items={g.items} />
            </div>
          ))}
        </div>
      </section>

      {/* Still stuck → support */}
      <section className="relative pb-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-paper)]/70 p-8 sm:p-10 text-center">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-[var(--color-text)]">
              {t('supportTitle')}
            </h2>
            <p className="mt-3 text-[var(--color-text-soft)] max-w-md mx-auto leading-relaxed">
              {t('supportSub')}
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="appstore-sheen mt-7 inline-flex items-center gap-3 rounded-2xl bg-[var(--color-brand-forest)] text-[var(--color-paper)] px-6 py-4 font-medium hover:scale-[1.02] transition-transform shadow-[0_22px_45px_-22px_rgba(31,70,49,0.55)]"
              dir="ltr"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm sm:text-base">{t('supportEmailCta')}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
