'use client';

import { useI18n } from '@/lib/i18n';
import { ShieldCheck, Sparkles, Users } from 'lucide-react';
import type { ReactNode } from 'react';

export function Values() {
  const { t } = useI18n();

  const items: Array<{ icon: ReactNode; title: string; body: string }> = [
    { icon: <ShieldCheck className="w-[23px] h-[23px]" />, title: t('valPrivacyTitle'), body: t('valPrivacyBody') },
    { icon: <Sparkles className="w-[23px] h-[23px]" />, title: t('valAiTitle'), body: t('valAiBody') },
    { icon: <Users className="w-[23px] h-[23px]" />, title: t('valFamilyTitle'), body: t('valFamilyBody') },
  ];

  return (
    <section className="pb-20 sm:pb-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-7">
        <div className="grid grid-cols-1 md:grid-cols-3 rounded-[22px] border border-[var(--color-border)] bg-[var(--color-paper)] overflow-hidden reveal divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)] rtl:md:divide-x-reverse">
          {items.map((it, i) => (
            <div key={i} className="p-9 sm:p-10">
              <div
                className="w-[46px] h-[46px] rounded-[14px] flex items-center justify-center mb-5 text-[var(--color-brand-forest)]"
                style={{ background: 'linear-gradient(135deg, rgba(124,92,255,0.12), rgba(225,91,214,0.12))' }}
              >
                {it.icon}
              </div>
              <h3 className="font-display font-medium text-[23px] tracking-tight text-[var(--color-text)]">
                {it.title}
              </h3>
              <p className="mt-2.5 text-[var(--color-text-soft)] text-[15.5px] leading-[1.55]">
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
