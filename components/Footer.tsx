'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { BrandMark } from './BrandMark';
import { SUPPORT_EMAIL } from '@/lib/links';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-7 pt-16 pb-14">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-10">
          <div className="max-w-[300px]">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <BrandMark size={22} />
              <span className="font-display text-[22px] font-semibold tracking-tight text-[var(--color-text)]">
                Healthy Circle
              </span>
            </Link>
            <p className="mt-3.5 text-[14px] text-[var(--color-text-muted)] leading-[1.55]">
              {t('footerTagline')}
            </p>
          </div>

          <div className="flex gap-12 sm:gap-[46px] flex-wrap">
            <FootCol title={t('footerProduct')}>
              <Link href="/#features">{t('navFeatures')}</Link>
              <Link href="/#plans">{t('navPlans')}</Link>
              <Link href="/faq">{t('navFaq')}</Link>
            </FootCol>
            <FootCol title={t('footerCompany')}>
              <Link href="/privacy">{t('navPrivacy')}</Link>
              <Link href="/terms">{t('navTerms')}</Link>
              <Link href="/accessibility">{t('navAccessibility')}</Link>
              <Link href="/support">{t('navSupport')}</Link>
              <a href={`mailto:${SUPPORT_EMAIL}`} dir="ltr" className="font-mono text-xs break-all">
                {SUPPORT_EMAIL}
              </a>
            </FootCol>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex items-center justify-between gap-4 flex-wrap text-[13.5px] text-[var(--color-text-muted)]">
          <span>{t('footerLegal')}</span>
          <span className="inline-flex items-center gap-1.5" dir="auto">
            {t('footerMadePrefix')} <b className="text-[var(--color-text-soft)] font-semibold">{t('footerMadeCity')}</b>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FootCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h5 className="text-[12px] uppercase tracking-[0.12em] text-[var(--color-text-muted)] font-bold mb-3.5">
        {title}
      </h5>
      <ul className="space-y-2.5 text-[14.5px]">
        {Array.isArray(children) ? (
          children.map((c, i) => (
            <li key={i} className="text-[var(--color-text-soft)] hover:text-[var(--color-brand-forest)] transition-colors">
              {c}
            </li>
          ))
        ) : (
          <li className="text-[var(--color-text-soft)]">{children}</li>
        )}
      </ul>
    </div>
  );
}
