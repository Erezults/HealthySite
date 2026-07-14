'use client';

import { useEffect, useState } from 'react';
import { Accessibility, Contrast, Minus, Plus, RotateCcw, X } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

const STORAGE_KEY = 'healthy-a11y';
const TEXT_STEPS = [0, 1, 2, 3] as const;
type TextStep = (typeof TEXT_STEPS)[number];

type A11yState = {
  textStep: TextStep;
  highContrast: boolean;
  noMotion: boolean;
};

const DEFAULT_STATE: A11yState = { textStep: 0, highContrast: false, noMotion: false };

function applyToDocument(state: A11yState) {
  const html = document.documentElement;
  html.classList.toggle('a11y-text-1', state.textStep === 1);
  html.classList.toggle('a11y-text-2', state.textStep === 2);
  html.classList.toggle('a11y-text-3', state.textStep === 3);
  html.classList.toggle('a11y-high-contrast', state.highContrast);
  html.classList.toggle('a11y-no-motion', state.noMotion);
}

export function AccessibilityWidget() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<A11yState>;
        const next: A11yState = {
          textStep: TEXT_STEPS.includes(parsed.textStep as TextStep) ? (parsed.textStep as TextStep) : 0,
          highContrast: !!parsed.highContrast,
          noMotion: !!parsed.noMotion,
        };
        setState(next);
        applyToDocument(next);
      }
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  const update = (partial: Partial<A11yState>) => {
    setState((prev) => {
      const next = { ...prev, ...partial };
      if (hydrated) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        applyToDocument(next);
      }
      return next;
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t('a11yWidgetLabel')}
        className="fixed bottom-5 end-5 z-[90] w-12 h-12 rounded-full bg-[var(--color-text)] text-white flex items-center justify-center shadow-[0_12px_30px_-10px_rgba(60,40,120,0.5)] hover:-translate-y-0.5 transition-transform"
      >
        <Accessibility className="w-6 h-6" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t('a11yPanelTitle')}
          className="fixed bottom-20 end-5 z-[90] w-[280px] rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] shadow-[0_24px_60px_-20px_rgba(60,40,120,0.35)] p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-semibold text-[var(--color-text)]">{t('a11yPanelTitle')}</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('a11yClose')}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mb-4">
            <span className="block text-[13px] text-[var(--color-text-muted)] mb-2">{t('a11yTextSize')}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => update({ textStep: Math.max(0, state.textStep - 1) as TextStep })}
                aria-label={t('a11yTextDecrease')}
                className="w-9 h-9 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-surface)]"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => update({ textStep: Math.min(3, state.textStep + 1) as TextStep })}
                aria-label={t('a11yTextIncrease')}
                className="w-9 h-9 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-surface)]"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => update({ textStep: 0 })}
                aria-label={t('a11yTextReset')}
                className="w-9 h-9 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-surface)]"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <ToggleRow
            icon={<Contrast className="w-4 h-4" />}
            label={t('a11yHighContrast')}
            checked={state.highContrast}
            onChange={(v) => update({ highContrast: v })}
          />
          <ToggleRow
            label={t('a11yStopAnimations')}
            checked={state.noMotion}
            onChange={(v) => update({ noMotion: v })}
          />

          <Link
            href="/accessibility"
            className="mt-4 block text-[13px] text-[var(--color-brand-forest)] hover:underline"
            onClick={() => setOpen(false)}
          >
            {t('a11yStatementLink')}
          </Link>
        </div>
      )}
    </>
  );
}

function ToggleRow({
  icon,
  label,
  checked,
  onChange,
}: {
  icon?: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 py-2 cursor-pointer">
      <span className="inline-flex items-center gap-2 text-[14px] text-[var(--color-text-soft)]">
        {icon}
        {label}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-[var(--color-brand-forest)]"
      />
    </label>
  );
}
