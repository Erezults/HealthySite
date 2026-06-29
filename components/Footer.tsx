'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { HealthyMark } from './HealthyMark';
import { LanguageToggle } from './LanguageToggle';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-bg-soft)] mt-auto">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-12 gap-y-10 gap-x-8">
          <div className="col-span-2 sm:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <HealthyMark size={32} />
              <span className="font-display text-2xl tracking-tight text-[var(--color-text)] whitespace-nowrap">
                Healthy Circle
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-[var(--color-text-soft)] leading-relaxed">
              {t('footerTagline')}
            </p>
            <div className="mt-6">
              <LanguageToggle />
            </div>
          </div>

          <FooterColumn title={t('navPrivacy')} className="sm:col-span-2">
            <Link href="/privacy">{t('navPrivacy')}</Link>
            <Link href="/terms">{t('navTerms')}</Link>
          </FooterColumn>

          <FooterColumn title={t('navSupport')} className="sm:col-span-3">
            <Link href="/faq">{t('navFaq')}</Link>
            <Link href="/support">{t('navSupport')}</Link>
            <a
              href="mailto:healthy.support@erezults.com"
              dir="ltr"
              className="font-mono text-xs break-all"
            >
              healthy.support@erezults.com
            </a>
          </FooterColumn>

          <FooterColumn title="App" className="sm:col-span-2">
            <a href="#features">
              {t('feat1Title').split(' ').slice(0, 3).join(' ')}
            </a>
            <a href="#tour">{t('tourEyebrow')}</a>
          </FooterColumn>
        </div>

        <div className="mt-14 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            {t('footerLegal')}
          </p>
          <p className="text-xs text-[var(--color-text-dim)]" dir="auto">
            {t('footerMadeIn')}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)] font-semibold">
        {title}
      </h3>
      <ul className="mt-4 space-y-2 text-sm">
        {Array.isArray(children) ? (
          children.map((c, i) => (
            <li
              key={i}
              className="text-[var(--color-text-soft)] hover:text-[var(--color-text)] transition"
            >
              {c}
            </li>
          ))
        ) : (
          <li className="text-[var(--color-text-soft)] hover:text-[var(--color-text)] transition">
            {children}
          </li>
        )}
      </ul>
    </div>
  );
}
