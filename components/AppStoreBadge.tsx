'use client';

import { useI18n } from '@/lib/i18n';
import { APP_STORE_URL } from '@/lib/links';

type Props = {
  light?: boolean;
  className?: string;
};

export function AppStoreBadge({ light = false, className = '' }: Props) {
  const { t } = useI18n();

  return (
    <a
      href={APP_STORE_URL}
      dir="ltr"
      aria-label="Download on the App Store"
      className={[
        'inline-flex items-center gap-[11px] rounded-[14px] px-[17px] py-[11px] transition-transform duration-200 ease-out hover:-translate-y-0.5',
        light
          ? 'bg-white text-[var(--color-text)] shadow-[0_10px_26px_-12px_rgba(124,92,255,0.5)] hover:shadow-[0_16px_40px_-14px_rgba(124,92,255,0.7)]'
          : 'bg-[var(--color-text)] text-white shadow-[0_10px_26px_-12px_rgba(21,19,31,0.55)] hover:shadow-[0_16px_34px_-14px_rgba(124,92,255,0.5)]',
        className,
      ].join(' ')}
    >
      <AppleGlyph />
      <span className="flex flex-col leading-none text-start">
        <span className={`text-[11px] font-medium mb-1 ${light ? 'opacity-65' : 'opacity-80'}`}>
          {t('appStoreL1')}
        </span>
        <span className="text-[18px] font-semibold tracking-tight">
          {t('appStoreL2')}
        </span>
      </span>
    </a>
  );
}

function AppleGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="w-[26px] h-[26px] shrink-0"
    >
      <path d="M16.36 12.84c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.62-1.71-3.19-1.73-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.73 1.06 1.6 2.25 2.74 2.21 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.71.71 2.88.69 1.19-.02 1.94-1.08 2.67-2.15.84-1.23 1.19-2.42 1.21-2.48-.03-.01-2.32-.89-2.34-3.54zM14.2 6.18c.6-.74 1.01-1.75.9-2.78-.87.04-1.94.59-2.57 1.31-.56.64-1.06 1.69-.93 2.69.97.07 1.97-.49 2.6-1.22z" />
    </svg>
  );
}
