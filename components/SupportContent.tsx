'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { SUPPORT_EMAIL } from '@/lib/links';
import { Mail, ArrowRight } from 'lucide-react';

export function SupportContent() {
  const { t } = useI18n();

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
            href={`mailto:${SUPPORT_EMAIL}`}
            className="appstore-sheen mt-10 inline-flex items-center gap-3 rounded-2xl bg-[var(--color-brand-forest)] text-[var(--color-paper)] px-6 py-4 font-medium hover:scale-[1.02] transition-transform shadow-[0_22px_45px_-22px_rgba(31,70,49,0.55)]"
            dir="ltr"
          >
            <Mail className="w-5 h-5" />
            <span className="text-sm sm:text-base">{t('supportEmailCta')}</span>
          </a>

          <p className="mt-4 text-xs text-[var(--color-text-muted)]">
            <span dir="ltr" className="font-mono">
              {SUPPORT_EMAIL}
            </span>
          </p>
        </div>
      </section>

      <section className="relative pb-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link
            href="/faq"
            className="group flex items-center justify-between gap-5 rounded-3xl border border-[var(--color-border)] bg-[var(--color-paper)]/70 px-6 sm:px-8 py-7 hover:bg-[var(--color-paper)] transition"
          >
            <span className="text-start">
              <span className="block font-display text-xl sm:text-2xl tracking-tight text-[var(--color-text)]">
                {t('supportFaqLink')}
              </span>
              <span className="mt-1 block text-sm text-[var(--color-text-soft)]">
                {t('supportFaqLinkSub')}
              </span>
            </span>
            <span
              aria-hidden
              className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-border)] text-[var(--color-text-soft)] group-hover:text-[var(--color-brand-forest)] group-hover:border-[var(--color-brand-forest)]/40 transition"
            >
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
