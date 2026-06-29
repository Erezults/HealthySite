'use client';

import { useI18n } from '@/lib/i18n';
import { APP_STORE_URL } from '@/lib/links';
import { Eyebrow } from './Eyebrow';
import { Check } from 'lucide-react';
import type { ReactNode } from 'react';

export function Subscriptions() {
  const { t } = useI18n();

  const plans = [
    {
      name: t('subsFreeName'),
      tag: t('subsFreeTagline'),
      feats: [t('subsFreeF1'), t('subsFreeF2'), t('subsFreeF3')],
      credits: t('subsFreeCredits'),
      featured: false,
    },
    {
      name: t('subsFamilyName'),
      tag: t('subsFamilyTagline'),
      badge: t('subsFamilyBadge'),
      feats: [t('subsFamilyF1'), t('subsFamilyF2'), t('subsFamilyF3'), t('subsFamilyF4')],
      credits: t('subsFamilyCredits'),
      featured: true,
    },
    {
      name: t('subsLifetimeName'),
      tag: t('subsLifetimeTagline'),
      feats: [t('subsLifetimeF1'), t('subsLifetimeF2'), t('subsLifetimeF3')],
      credits: t('subsLifetimeCredits'),
      featured: false,
    },
  ];

  const addons = [
    { name: t('subsAiStarter'), amt: '+15' },
    { name: t('subsAiPro'), amt: '+50' },
    { name: t('subsAiMax'), amt: '+150' },
  ];
  const packs = ['10', '30', '100'];

  return (
    <section id="plans" className="py-20 sm:py-24 bg-[var(--color-bg)]">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-7">
        <div className="max-w-[680px] mb-12 sm:mb-14 reveal">
          <Eyebrow>{t('subsEyebrow')}</Eyebrow>
          <h2 className="font-display font-medium leading-[1.05] tracking-[-0.02em] text-[var(--color-text)] mt-4 text-[clamp(32px,4.4vw,52px)]">
            <span className="block">{t('subsTitleA')}</span>
            <span className="block">{t('subsTitleB')}</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-soft)] text-[17px] sm:text-[18px] max-w-[560px] leading-relaxed">
            {t('subsSub')}
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`relative rounded-[24px] p-8 flex flex-col transition-all duration-300 hover:-translate-y-1.5 reveal ${
                p.featured
                  ? 'hc-feature-border'
                  : 'bg-[var(--color-paper)] border border-[var(--color-border)] hover:shadow-[0_18px_50px_-28px_rgba(60,40,120,0.22)]'
              }`}
              style={{ animationDelay: `${60 + i * 80}ms` }}
            >
              {p.badge && (
                <span
                  className="absolute -top-3 start-8 text-white text-[11.5px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-[0_8px_18px_-8px_rgba(225,91,214,0.6)]"
                  style={{ background: 'var(--accent-grad)' }}
                >
                  {p.badge}
                </span>
              )}
              <div className="font-display font-medium text-[26px] tracking-tight text-[var(--color-text)]">
                {p.name}
              </div>
              <div className="mt-1.5 text-[14px] font-medium text-[var(--color-text-muted)] min-h-5">
                {p.tag}
              </div>
              <ul className="mt-6 flex flex-col gap-3 flex-1">
                {p.feats.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-[15px] text-[var(--color-text-soft)] leading-snug">
                    <Check className="w-[17px] h-[17px] shrink-0 mt-0.5 text-[var(--color-brand-forest)]" strokeWidth={2.4} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <span
                className="mt-6 self-start inline-flex items-center gap-2 text-[13.5px] font-semibold text-[var(--color-text)] border border-[var(--color-border)] rounded-full px-3.5 py-1.5"
                style={{ background: 'linear-gradient(135deg, rgba(124,92,255,0.1), rgba(225,91,214,0.1))' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-grad)' }} />
                {p.credits}
              </span>
            </div>
          ))}
        </div>

        {/* Add-ons + packs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          <ExtraPanel title={t('subsAddonsTitle')} pill={t('subsAddonsPill')} desc={t('subsAddonsDesc')}>
            {addons.map((a) => (
              <Opt key={a.name}>
                {a.name} <span className="text-[var(--color-text-muted)] font-medium">{a.amt}</span>
              </Opt>
            ))}
          </ExtraPanel>
          <ExtraPanel title={t('subsPacksTitle')} pill={t('subsPacksPill')} desc={t('subsPacksDesc')}>
            {packs.map((n) => (
              <Opt key={n}>
                {n} <span className="text-[var(--color-text-muted)] font-medium">{t('subsPackUnit')}</span>
              </Opt>
            ))}
          </ExtraPanel>
        </div>

        {/* Fine print + CTA */}
        <div className="mt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-7 border border-dashed border-[var(--color-border)] rounded-[18px] bg-white/50 reveal">
          <p className="text-[13.5px] text-[var(--color-text-muted)] max-w-[560px] leading-relaxed">
            {t('subsFineprint')}
          </p>
          <a
            href={APP_STORE_URL}
            className="shrink-0 inline-flex items-center justify-center rounded-full border border-[var(--color-text)] text-[var(--color-text)] font-semibold text-[15px] px-5 py-3 transition-all duration-200 hover:-translate-y-px hover:bg-[var(--color-text)] hover:text-white"
          >
            {t('subsCta')}
          </a>
        </div>
      </div>
    </section>
  );
}

function ExtraPanel({
  title,
  pill,
  desc,
  children,
}: {
  title: string;
  pill: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-[var(--color-paper)] border border-[var(--color-border)] rounded-[20px] p-7">
      <h4 className="flex items-center gap-2.5 font-display font-medium text-[19px] text-[var(--color-text)]">
        {title}
        <span className="font-sans text-[10.5px] font-bold uppercase tracking-wider text-[var(--color-brand-forest)] bg-[rgba(124,92,255,0.1)] rounded-full px-2.5 py-1">
          {pill}
        </span>
      </h4>
      <p className="text-[14px] text-[var(--color-text-muted)] mt-1.5">{desc}</p>
      <div className="flex flex-wrap gap-2.5 mt-4 pt-1">{children}</div>
    </div>
  );
}

function Opt({ children }: { children: ReactNode }) {
  return (
    <span className="text-[14px] font-semibold text-[var(--color-text)] border border-[var(--color-border)] rounded-[12px] px-3.5 py-2.5 bg-[var(--color-bg)] hover:border-[var(--color-brand-forest)] hover:bg-white transition-colors whitespace-nowrap">
      {children}
    </span>
  );
}
