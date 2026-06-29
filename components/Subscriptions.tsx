'use client';

import { useI18n } from '@/lib/i18n';
import { AppStoreBadge } from './AppStoreBadge';
import { Check, Sparkles, Coins } from 'lucide-react';
import type { ReactNode } from 'react';

export function Subscriptions() {
  const { t, locale } = useI18n();
  const creditsUnit = locale === 'he' ? 'קרדיטים' : 'credits';

  const plans: Array<{
    name: string;
    tagline: string;
    feats: string[];
    badge?: string;
    accent: string;
    featured?: boolean;
  }> = [
    {
      name: t('subsFreeName'),
      tagline: t('subsFreeTagline'),
      feats: [t('subsFreeF1'), t('subsFreeF2'), t('subsFreeF3')],
      accent: '#6E9982',
    },
    {
      name: t('subsFamilyName'),
      tagline: t('subsFamilyTagline'),
      feats: [t('subsFamilyF1'), t('subsFamilyF2'), t('subsFamilyF3')],
      badge: t('subsFamilyBadge'),
      accent: '#2E5D44',
      featured: true,
    },
    {
      name: t('subsLifetimeName'),
      tagline: t('subsLifetimeTagline'),
      feats: [t('subsLifetimeF1'), t('subsLifetimeF2'), t('subsLifetimeF3')],
      accent: '#D9A23B',
    },
  ];

  const addons: Array<{ name: string; amt: string }> = [
    { name: t('subsAiStarter'), amt: t('subsAiStarterAmt') },
    { name: t('subsAiPro'), amt: t('subsAiProAmt') },
    { name: t('subsAiMax'), amt: t('subsAiMaxAmt') },
  ];

  return (
    <section
      id="plans"
      className="relative py-24 sm:py-36 border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">
            <span className="dot" />
            <span>{t('subsEyebrow')}</span>
          </span>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.05] tracking-tight text-[var(--color-text)]">
            {t('subsTitle')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--color-text-soft)] leading-relaxed">
            {t('subsSub')}
          </p>
        </div>

        {/* Plan cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {plans.map((p, i) => (
            <PlanCard key={i} {...p} />
          ))}
        </div>

        {/* AI add-ons + one-time packs */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          <Panel
            icon={<Sparkles className="w-5 h-5" />}
            accent="#C36A4B"
            title={t('subsAiTitle')}
            sub={t('subsAiSub')}
          >
            <ul className="mt-5 space-y-2.5">
              {addons.map((a, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-4 py-3"
                >
                  <span className="font-medium text-[var(--color-text)]" dir="ltr">
                    {a.name}
                  </span>
                  <span className="text-sm text-[var(--color-text-soft)]" dir="auto">
                    {a.amt}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel
            icon={<Coins className="w-5 h-5" />}
            accent="#D9A23B"
            title={t('subsBundlesTitle')}
            sub={t('subsBundles')}
          >
            <div className="mt-6 flex items-center gap-3">
              {['10', '30', '100'].map((n) => (
                <span
                  key={n}
                  className="flex-1 text-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] py-5"
                >
                  <span className="block font-display text-3xl tracking-tight text-[var(--color-text)]">
                    {n}
                  </span>
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                    {creditsUnit}
                  </span>
                </span>
              ))}
            </div>
          </Panel>
        </div>

        {/* Notes + CTA */}
        <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-paper)]/70 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="text-sm text-[var(--color-text-soft)] leading-relaxed">
              {t('subsCreditNote')}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              {t('subsPriceNote')}
            </p>
          </div>
          <div className="shrink-0">
            <AppStoreBadge variant="secondary" />
          </div>
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  name,
  tagline,
  feats,
  badge,
  accent,
  featured,
}: {
  name: string;
  tagline: string;
  feats: string[];
  badge?: string;
  accent: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative rounded-3xl border p-7 sm:p-8 transition ${
        featured
          ? 'border-[var(--color-brand-forest)]/40 bg-[var(--color-paper)] shadow-[0_30px_60px_-40px_rgba(31,70,49,0.4)]'
          : 'border-[var(--color-border)] bg-[var(--color-paper)]/80 hover:bg-[var(--color-paper)]'
      }`}
      style={{ ['--feature-accent' as string]: accent }}
    >
      {badge && (
        <span
          className="absolute -top-3 inset-inline-start-7 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--color-paper)]"
          style={{ background: accent, insetInlineStart: '1.75rem' }}
        >
          {badge}
        </span>
      )}
      <h3 className="font-display text-2xl tracking-tight text-[var(--color-text)]">
        {name}
      </h3>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">{tagline}</p>
      <ul className="mt-6 space-y-3">
        {feats.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-[0.95rem] text-[var(--color-text-soft)]">
            <span
              className="mt-0.5 shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full"
              style={{ background: `${accent}1f`, color: accent }}
            >
              <Check className="w-3 h-3" strokeWidth={3} />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Panel({
  icon,
  accent,
  title,
  sub,
  children,
}: {
  icon: ReactNode;
  accent: string;
  title: string;
  sub: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-paper)]/80 p-7 sm:p-8">
      <div className="flex items-center gap-3">
        <span
          className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev)]"
          style={{ color: accent }}
        >
          {icon}
        </span>
        <h3 className="font-display text-xl tracking-tight text-[var(--color-text)]">
          {title}
        </h3>
      </div>
      <p className="mt-3 text-sm text-[var(--color-text-soft)] leading-relaxed">
        {sub}
      </p>
      {children}
    </div>
  );
}
