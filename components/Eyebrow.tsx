import type { ReactNode } from 'react';

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-[9px] text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-forest)]">
      <span
        aria-hidden
        className="inline-block h-[2px] w-[18px] rounded-sm"
        style={{ background: 'var(--accent-grad)' }}
      />
      <span>{children}</span>
    </span>
  );
}
