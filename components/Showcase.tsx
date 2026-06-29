'use client';

import { useI18n } from '@/lib/i18n';
import { Eyebrow } from './Eyebrow';
import { ScreenImg } from './ScreenImg';

export function Showcase() {
  const { t } = useI18n();

  const shots: Array<{ num: string; cap: string; n: number; dark?: boolean }> = [
    { num: '01', cap: t('cap1'), n: 1 },
    { num: '02', cap: t('cap2'), n: 3 },
    { num: '03', cap: t('cap3'), n: 4 },
    { num: '04', cap: t('cap4'), n: 6 },
    { num: '05', cap: t('cap5'), n: 5 },
    { num: '06', cap: t('cap6'), n: 8, dark: true },
  ];

  return (
    <section id="features" className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-7">
        <div className="max-w-[660px] mb-12 sm:mb-14 reveal">
          <Eyebrow>{t('showcaseEyebrow')}</Eyebrow>
          <h2 className="font-display font-medium leading-[1.05] tracking-[-0.02em] text-[var(--color-text)] mt-4 text-[clamp(32px,4.4vw,52px)]">
            <span className="block">{t('showcaseTitleA')}</span>
            <span className="block">{t('showcaseTitleB')}</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-soft)] text-[17px] sm:text-[18px] max-w-[540px] leading-relaxed">
            {t('showcaseSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {shots.map((s, i) => (
            <div
              key={s.num}
              className={`group rounded-[26px] border pt-6 px-6 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 reveal ${
                s.dark
                  ? 'border-[#2A2438] bg-[linear-gradient(180deg,#1B1726_0%,#120F1C_100%)]'
                  : 'border-[var(--color-border)] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFAFF_100%)] hover:shadow-[0_18px_50px_-28px_rgba(60,40,120,0.22)] hover:border-[#E3DEF4]'
              }`}
              style={{ animationDelay: `${60 + (i % 3) * 80}ms` }}
            >
              <div className="flex items-center gap-2.5 mb-[18px]">
                <span
                  className={`font-display italic text-[15px] font-medium ${
                    s.dark ? 'text-[#C9A6FF]' : 'text-[var(--color-brand-forest)]'
                  }`}
                >
                  {s.num}
                </span>
                <h3
                  className={`text-[17px] font-semibold tracking-tight ${
                    s.dark ? 'text-[#F4F1FA]' : 'text-[var(--color-text)]'
                  }`}
                >
                  {s.cap}
                </h3>
              </div>
              <div
                className={`mx-auto w-[96%] rounded-t-[24px] overflow-hidden aspect-[60/82] border border-b-0 shadow-[0_22px_40px_-28px_rgba(60,40,120,0.4)] ${
                  s.dark ? 'border-[rgba(255,255,255,0.06)]' : 'border-[rgba(60,40,120,0.06)]'
                }`}
              >
                <ScreenImg n={s.n} alt={s.cap} position="center 36%" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
