'use client';

import { useI18n } from '@/lib/i18n';
import { APP_STORE_URL } from '@/lib/links';

type Props = {
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
};

export function AppStoreBadge({
  href = APP_STORE_URL,
  variant = 'primary',
  className = '',
}: Props) {
  const { locale } = useI18n();
  const subtitle = locale === 'he' ? 'הורד מה-' : 'Download on the';
  const main = 'App Store';

  const isPrimary = variant === 'primary';

  return (
    <a
      href={href}
      className={[
        'appstore-sheen inline-flex items-center gap-3 rounded-2xl px-5 py-3 transition-transform duration-300',
        isPrimary
          ? 'bg-[var(--color-brand-forest)] text-[var(--color-paper)] hover:scale-[1.02] shadow-[0_18px_36px_-18px_rgba(31,70,49,0.55)]'
          : 'border border-[var(--color-border-strong)] text-[var(--color-text)] hover:border-[var(--color-brand-forest)] hover:bg-[var(--color-surface)]',
        className,
      ].join(' ')}
      dir="ltr"
    >
      <AppleGlyph
        className={isPrimary ? 'text-[var(--color-paper)]' : 'text-[var(--color-text)]'}
      />
      <span className="flex flex-col leading-none">
        <span className="text-[10px] uppercase tracking-[0.16em] opacity-80 mb-1">
          {subtitle}
        </span>
        <span className="text-[17px] font-semibold tracking-tight">
          {main}
        </span>
      </span>
    </a>
  );
}

function AppleGlyph({ className = '' }: { className?: string }) {
  return (
    <svg
      width="22"
      height="26"
      viewBox="0 0 24 28"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M19.665 14.654c-.027-2.79 2.27-4.13 2.37-4.196-1.292-1.89-3.305-2.149-4.022-2.182-1.717-.173-3.347 1.014-4.218 1.014-.87 0-2.215-.988-3.638-.961-1.875.027-3.604 1.087-4.572 2.764-1.95 3.379-.498 8.385 1.405 11.13.93 1.345 2.04 2.853 3.494 2.8 1.4-.056 1.928-.905 3.62-.905 1.692 0 2.165.905 3.642.873 1.504-.026 2.46-1.36 3.378-2.71 1.067-1.555 1.504-3.063 1.53-3.14-.033-.013-2.925-1.122-2.95-4.487zM16.85 6.385c.767-.93 1.286-2.218 1.144-3.503-1.105.045-2.444.736-3.236 1.665-.71.824-1.332 2.144-1.163 3.402 1.232.095 2.488-.626 3.255-1.564z" />
    </svg>
  );
}
