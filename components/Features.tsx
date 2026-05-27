'use client';

import { useI18n } from '@/lib/i18n';
import { Users, Sparkles, ShieldCheck, Languages } from 'lucide-react';
import type { ReactNode } from 'react';

export function Features() {
  const { t } = useI18n();

  const items: Array<{
    icon: ReactNode;
    title: string;
    body: string;
    accent: string;
  }> = [
    {
      icon: <Users className="w-5 h-5" />,
      title: t('feat1Title'),
      body: t('feat1Body'),
      accent: '#2E5D44',
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: t('feat2Title'),
      body: t('feat2Body'),
      accent: '#C36A4B',
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: t('feat3Title'),
      body: t('feat3Body'),
      accent: '#D9A23B',
    },
    {
      icon: <Languages className="w-5 h-5" />,
      title: t('feat4Title'),
      body: t('feat4Body'),
      accent: '#6E9982',
    },
  ];

  return (
    <section
      id="features"
      className="relative py-24 sm:py-36 border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">
            <span className="dot" />
            <span>{t('featuresEyebrow')}</span>
          </span>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.05] tracking-tight text-[var(--color-text)]">
            {t('featuresTitle')}
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-px rounded-3xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-border)]">
          {items.map((it, i) => (
            <FeatureCell key={i} {...it} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCell({
  icon,
  title,
  body,
  accent,
  index,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  accent: string;
  index: number;
}) {
  return (
    <div
      className="group relative bg-[var(--color-paper)] p-8 sm:p-10 transition-colors hover:bg-[var(--color-bg-elev)]"
      style={
        {
          '--feature-accent': accent,
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 -end-12 w-44 h-44 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-700"
        style={{
          background: `radial-gradient(closest-side, ${accent}, transparent 70%)`,
        }}
      />

      <div className="flex items-center gap-3">
        <span
          className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elev)]"
          style={{ color: accent }}
        >
          {icon}
        </span>
        <span
          aria-hidden
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]"
        >
          0{index + 1}
        </span>
      </div>

      <h3 className="mt-6 font-display text-2xl sm:text-3xl tracking-tight text-[var(--color-text)]">
        {title}
      </h3>
      <p className="mt-3 text-[var(--color-text-soft)] leading-relaxed text-[0.98rem] max-w-prose">
        {body}
      </p>
    </div>
  );
}
