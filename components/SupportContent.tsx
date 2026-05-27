'use client';

import { useI18n } from '@/lib/i18n';
import { FaqAccordion } from './FaqAccordion';
import { Mail } from 'lucide-react';

export function SupportContent() {
  const { t } = useI18n();

  const items = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q'), a: t('faq5A') },
    { q: t('faq6Q'), a: t('faq6A') },
    { q: t('faq7Q'), a: t('faq7A') },
    { q: t('faq8Q'), a: t('faq8A') },
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
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 pt-20 sm:pt-28 pb-12 text-center">
          <span className="eyebrow">
            <span className="dot" />
            <span>{t('supportEyebrow')}</span>
          </span>
          <h1 className="mt-8 font-display text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.05] tracking-tight text-[var(--color-text)]">
            {t('supportTitle')}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[var(--color-text-soft)] max-w-xl mx-auto leading-relaxed">
            {t('supportSub')}
          </p>

          <a
            href="mailto:healthy.support@erezults.com"
            className="appstore-sheen mt-10 inline-flex items-center gap-3 rounded-2xl bg-[var(--color-brand-forest)] text-[var(--color-paper)] px-6 py-4 font-medium hover:scale-[1.02] transition-transform shadow-[0_22px_45px_-22px_rgba(31,70,49,0.55)]"
            dir="ltr"
          >
            <Mail className="w-5 h-5" />
            <span className="text-sm sm:text-base">{t('supportEmailCta')}</span>
          </a>

          <p className="mt-4 text-xs text-[var(--color-text-muted)]">
            <span dir="ltr" className="font-mono">
              healthy.support@erezults.com
            </span>
          </p>
        </div>
      </section>

      <section className="relative pb-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-[var(--color-text)] mb-8">
            {t('supportFaqTitle')}
          </h2>
          <FaqAccordion items={items} />
        </div>
      </section>
    </>
  );
}
