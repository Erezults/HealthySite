'use client';

import { useI18n } from '@/lib/i18n';

export function SkipLink() {
  const { t } = useI18n();

  return (
    <a
      href="#main-content"
      className="fixed top-2 start-2 z-[100] -translate-y-[calc(100%+1rem)] focus:translate-y-0 rounded-full bg-[var(--color-text)] text-white text-sm font-semibold px-4 py-2.5 transition-transform duration-150"
    >
      {t('skipToContent')}
    </a>
  );
}
