'use client';

import { useI18n } from '@/lib/i18n';
import { AppStoreBadge } from './AppStoreBadge';

export function ClosingBand() {
  const { t } = useI18n();

  return (
    <section className="px-4 sm:px-7 pb-4">
      <div className="mx-auto max-w-[1180px] relative overflow-hidden rounded-[32px] px-7 sm:px-14 py-16 sm:py-[72px] text-center bg-[linear-gradient(180deg,#1A1626,#120F1C)] reveal">
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(700px 300px at 50% -20%, rgba(124,92,255,0.32), transparent 60%), radial-gradient(500px 260px at 90% 120%, rgba(225,91,214,0.22), transparent 60%)',
          }}
        />
        <h2 className="relative font-display font-medium text-white leading-[1.06] tracking-[-0.02em] text-[clamp(30px,4.4vw,48px)]">
          <span className="block">{t('closingTitleA')}</span>
          <em className="italic font-normal text-[#D9C6FF]">{t('closingEm')}</em>
        </h2>
        <p className="relative mt-4 text-white/65 text-[17px] sm:text-[18px] max-w-[480px] mx-auto leading-relaxed">
          {t('closingSub')}
        </p>
        <div className="relative mt-8 flex justify-center">
          <AppStoreBadge light />
        </div>
      </div>
    </section>
  );
}
