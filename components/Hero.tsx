'use client';

import { useI18n } from '@/lib/i18n';
import { HealthyMark } from './HealthyMark';
import { AppStoreBadge } from './AppStoreBadge';
import { ShieldCheck, Users, FileText } from 'lucide-react';

export function Hero() {
  const { t, locale } = useI18n();

  return (
    <section className="relative overflow-hidden">
      {/* warm light washes */}
      <span className="sun" style={{ width: 720, height: 720, top: -240, insetInlineStart: -180, opacity: 0.6 }} />
      <span className="leaf" style={{ width: 620, height: 620, top: 80, insetInlineEnd: -220, opacity: 0.5 }} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-20 sm:pt-28 pb-16 sm:pb-24">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow reveal" style={{ animationDelay: '0ms' }}>
            <span className="dot" />
            <span dir="ltr">{t('heroEyebrow')}</span>
          </span>

          <div className="mt-10 reveal" style={{ animationDelay: '90ms' }}>
            <HealthyMark size={96} priority withHalo />
          </div>

          <h1
            className="font-display mt-8 text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.04] tracking-tight text-[var(--color-text)] max-w-4xl reveal"
            style={{ animationDelay: '180ms' }}
          >
            <span className="block">{t('heroTitleA')}</span>
            <span className="block italic">
              <span className="accent-underline">{t('heroTitleB')}</span>
            </span>
          </h1>

          <p
            className="mt-6 max-w-2xl text-base sm:text-lg text-[var(--color-text-soft)] leading-relaxed reveal"
            style={{ animationDelay: '260ms' }}
          >
            {t('heroSub')}
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row items-center gap-3 reveal"
            style={{ animationDelay: '340ms' }}
          >
            <AppStoreBadge variant="primary" href="#" />
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm text-[var(--color-text)] hover:text-[var(--color-brand-forest-deep)] border border-transparent hover:border-[var(--color-border)] transition"
            >
              <span>{t('heroCtaSecondary')}</span>
              <span aria-hidden className="rtl:rotate-180">↓</span>
            </a>
          </div>

          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[var(--color-text-muted)] reveal"
            style={{ animationDelay: '420ms' }}
          >
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-brand-forest)]" />
              {locale === 'he' ? 'הגנת RLS מלאה' : 'Row-level security'}
            </span>
            <span aria-hidden className="opacity-50">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[var(--color-brand-terracotta)]" />
              {locale === 'he' ? 'שיתוף משפחתי' : 'Family sharing'}
            </span>
            <span aria-hidden className="opacity-50">·</span>
            <span className="inline-flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[var(--color-brand-mustard)]" />
              {locale === 'he' ? 'OCR ב-AI' : 'AI-powered OCR'}
            </span>
          </div>
        </div>

        <HeroShowcase />
      </div>
    </section>
  );
}

function HeroShowcase() {
  const { locale } = useI18n();
  return (
    <div className="mt-20 sm:mt-28 relative">
      <div className="relative mx-auto max-w-3xl">
        <div className="relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-paper)]/85 backdrop-blur p-6 sm:p-10 overflow-hidden shadow-[0_40px_80px_-40px_rgba(31,70,49,0.28)]">
          <div
            aria-hidden
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[120%] h-[260px] rounded-full blur-3xl opacity-50"
            style={{
              background:
                'radial-gradient(closest-side, rgba(217, 162, 59, 0.4), transparent 70%)',
            }}
          />

          <div className="relative flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            <span dir="ltr">/ healthy · timeline</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#16a34a66]" />
              <span dir="ltr">synced</span>
            </span>
          </div>

          <div className="relative flex justify-center my-10">
            <HealthyMark size={140} withHalo />
          </div>

          <div className="relative grid grid-cols-3 gap-3 sm:gap-6 text-center">
            <StatTile label={locale === 'he' ? 'בני משפחה' : 'Members'} value="5" />
            <StatTile label={locale === 'he' ? 'רשומות' : 'Records'} value="312" />
            <StatTile label={locale === 'he' ? 'הצפנה' : 'Security'} value="RLS" mono />
          </div>
        </div>

        <FloatingCallout
          className="hidden lg:flex top-6"
          style={{ insetInlineStart: '-9.5rem' }}
          dot="forest"
          text={locale === 'he' ? 'מסונכרן בענן' : 'Synced via iCloud-grade RLS'}
        />
        <FloatingCallout
          className="hidden lg:flex bottom-6"
          style={{ insetInlineEnd: '-11.5rem' }}
          dot="terracotta"
          text={
            locale === 'he'
              ? 'AI קורא את המסמך'
              : 'AI parsed · 12 fields'
          }
        />
      </div>
    </div>
  );
}

function StatTile({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] px-3 py-4">
      <div
        className={`text-2xl sm:text-3xl text-[var(--color-text)] tracking-tight ${
          mono ? 'font-mono text-base sm:text-lg' : 'font-display'
        }`}
      >
        {value}
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
        {label}
      </div>
    </div>
  );
}

function FloatingCallout({
  className = '',
  style,
  dot,
  text,
}: {
  className?: string;
  style?: React.CSSProperties;
  dot: 'forest' | 'terracotta';
  text: string;
}) {
  const dotColor = dot === 'forest' ? '#2E5D44' : '#C36A4B';
  return (
    <div
      style={style}
      className={`absolute ${className} items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-paper)] backdrop-blur shadow-[0_18px_36px_-18px_rgba(31,70,49,0.35)] text-xs text-[var(--color-text)] whitespace-nowrap`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: dotColor,
          boxShadow: `0 0 8px ${dotColor}88`,
        }}
      />
      {text}
    </div>
  );
}
