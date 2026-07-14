'use client';

import { useI18n } from '@/lib/i18n';
import { Eyebrow } from './Eyebrow';
import { AppStoreBadge } from './AppStoreBadge';
import { ScreenImg } from './ScreenImg';
import { ShieldCheck, Sparkles, Users } from 'lucide-react';

const PHONE_SHADOW =
  'shadow-[0_40px_90px_-30px_rgba(60,40,120,0.30),0_12px_30px_-12px_rgba(60,40,120,0.18)]';

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative pt-12 sm:pt-[74px] pb-8">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-7 grid lg:grid-cols-[1.04fr_0.96fr] gap-2 lg:gap-10 items-center">
        {/* Copy */}
        <div className="order-1 max-w-[560px]">
          <div className="reveal" style={{ animationDelay: '40ms' }}>
            <Eyebrow>{t('heroEyebrow')}</Eyebrow>
          </div>
          <h1
            className="font-display font-medium leading-[1.02] tracking-[-0.02em] text-[var(--color-text)] mt-5 reveal text-[clamp(40px,7vw,76px)]"
            style={{ animationDelay: '120ms' }}
          >
            <span className="block">{t('heroTitleA')}</span>
            <span className="block">
              {t('heroTitleB')}{' '}
              <em className="italic font-normal text-[var(--color-brand-forest)]">
                {t('heroTitleEm')}
              </em>
            </span>
          </h1>
          <p
            className="mt-5 text-[17px] sm:text-[19px] leading-[1.55] text-[var(--color-text-soft)] max-w-[478px] reveal"
            style={{ animationDelay: '200ms' }}
          >
            {t('heroSub')}
          </p>
          <div
            className="mt-8 flex items-center gap-4 sm:gap-[18px] flex-wrap reveal"
            style={{ animationDelay: '280ms' }}
          >
            <AppStoreBadge />
            <span className="inline-flex items-center gap-2 text-[14px] font-medium text-[var(--color-text-muted)]">
              <span
                className="w-[7px] h-[7px] rounded-full hc-pulse"
                style={{ background: 'var(--accent-grad)' }}
              />
              {t('heroMeta')}
            </span>
          </div>
        </div>

        {/* Phone fan */}
        <div
          className="order-2 relative h-[420px] sm:h-[520px] lg:h-[560px] flex items-center justify-center reveal"
          style={{ animationDelay: '200ms' }}
        >
          <div
            className={`phone absolute w-[150px] sm:w-[200px] lg:w-[218px] rounded-[36px] sm:rounded-[42px] bg-white overflow-hidden border border-[rgba(60,40,120,0.06)] ${PHONE_SHADOW} opacity-90`}
            style={{ insetInlineStart: '2%', top: '14%', transform: 'rotate(-8deg)', zIndex: 1 }}
          >
            <div className="aspect-[60/100] overflow-hidden">
              <ScreenImg n={3} alt={t('cap2')} position="center 30%" eager />
            </div>
          </div>
          <div
            className={`phone absolute w-[156px] sm:w-[208px] lg:w-[228px] rounded-[36px] sm:rounded-[42px] bg-white overflow-hidden border border-[rgba(60,40,120,0.06)] ${PHONE_SHADOW} opacity-95`}
            style={{ insetInlineEnd: '2%', top: '11%', transform: 'rotate(7deg)', zIndex: 1 }}
          >
            <div className="aspect-[60/100] overflow-hidden">
              <ScreenImg n={6} alt={t('cap4')} position="center 30%" eager />
            </div>
          </div>
          <div
            className={`phone relative w-[196px] sm:w-[256px] lg:w-[280px] rounded-[38px] sm:rounded-[42px] bg-white overflow-hidden border border-[rgba(60,40,120,0.06)] ${PHONE_SHADOW}`}
            style={{ transform: 'rotate(-1.5deg)', zIndex: 3 }}
          >
            <div className="aspect-[60/100] overflow-hidden">
              <ScreenImg n={1} alt="Healthy Circle home dashboard" position="center 30%" eager />
            </div>
          </div>
          {/* floor shadow */}
          <span
            aria-hidden
            className="absolute bottom-7 left-1/2 -translate-x-1/2 w-[260px] h-[42px] rounded-[50%] blur-md"
            style={{
              background: 'radial-gradient(ellipse, rgba(60,40,120,0.16), transparent 70%)',
              zIndex: 0,
            }}
          />
        </div>
      </div>

      {/* Trustline */}
      <div className="mx-auto max-w-[1180px] px-5 sm:px-7">
        <div
          className="mt-10 sm:mt-12 pt-7 border-t border-[var(--color-border)] flex items-center justify-center gap-x-8 gap-y-3 flex-wrap text-[14px] font-medium text-[var(--color-text-muted)] reveal"
          style={{ animationDelay: '360ms' }}
        >
          <span className="inline-flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[var(--color-brand-forest)]" /> {t('trustPrivate')}
          </span>
          <span className="inline-flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[var(--color-brand-forest)]" /> {t('trustAi')}
          </span>
          <span className="inline-flex items-center gap-2.5">
            <Users className="w-4 h-4 text-[var(--color-brand-forest)]" /> {t('trustCircle')}
          </span>
        </div>
      </div>
    </section>
  );
}
