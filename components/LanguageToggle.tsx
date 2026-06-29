'use client';

import { useI18n } from '@/lib/i18n';

export function LanguageToggle({ compact }: { compact?: boolean }) {
  const { locale, setLocale } = useI18n();

  const opts: Array<{ code: 'en' | 'he'; label: string }> = [
    { code: 'en', label: 'EN' },
    { code: 'he', label: 'HE' },
  ];

  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-paper)]/70 backdrop-blur p-0.5 ${
        compact ? 'text-[11px]' : 'text-xs'
      } font-medium`}
      dir="ltr"
    >
      {opts.map((o) => {
        const active = locale === o.code;
        return (
          <button
            key={o.code}
            type="button"
            onClick={() => setLocale(o.code)}
            aria-pressed={active}
            className={`relative ${compact ? 'px-2 sm:px-3' : 'px-3'} py-1.5 rounded-full transition-colors ${
              active
                ? 'bg-[var(--color-text)] text-white'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
