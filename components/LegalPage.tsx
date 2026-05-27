'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { MarkdownContent } from './MarkdownContent';

type Props = {
  en: string;
  he: string;
};

export function LegalPage({ en, he }: Props) {
  const { locale, t } = useI18n();
  const source = locale === 'he' ? he : en;

  return (
    <section className="relative">
      {/* soft top wash */}
      <span
        className="sun"
        style={{
          width: 720,
          height: 720,
          top: -360,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.4,
        }}
      />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-8 pt-20 pb-32">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition"
        >
          {t('legalBackHome')}
        </Link>
        <div className="mt-10">
          <MarkdownContent source={source} />
        </div>
      </div>
    </section>
  );
}
