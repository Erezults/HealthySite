'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

type Item = { q: string; a: string };

export function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="rounded-3xl border border-[var(--color-border)] overflow-hidden divide-y divide-[var(--color-border)]">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`bg-[var(--color-paper)]/70 transition-colors ${
              isOpen ? 'bg-[var(--color-paper)]' : 'hover:bg-[var(--color-bg-elev)]'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-start gap-5 px-6 sm:px-8 py-6 text-start"
            >
              <span className="flex-1 font-display text-lg sm:text-xl text-[var(--color-text)] leading-snug">
                {it.q}
              </span>
              <span
                aria-hidden
                className={`mt-1 shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full border border-[var(--color-border)] text-[var(--color-text-soft)] transition-transform duration-300 ${
                  isOpen ? 'rotate-45 text-[var(--color-brand-forest)] border-[var(--color-brand-forest)]/40' : ''
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 sm:px-8 pb-6 -mt-1 text-[var(--color-text-soft)] leading-relaxed max-w-3xl">
                  {it.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
