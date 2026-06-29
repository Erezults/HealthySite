'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { BrandMark } from './BrandMark';
import { LanguageToggle } from './LanguageToggle';

export function SiteHeader() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl bg-[var(--color-bg)]/75 transition-colors duration-300 border-b ${
        scrolled ? 'border-[var(--color-border)]' : 'border-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1180px] px-4 sm:px-7 h-[60px] sm:h-[66px] flex items-center justify-between gap-2 sm:gap-3.5">
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <BrandMark size={24} />
          <span className="font-display text-lg sm:text-xl font-semibold tracking-tight text-[var(--color-text)] whitespace-nowrap">
            Healthy Circle
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 lg:gap-[34px]">
          <HeadLink href="/#features">{t('navFeatures')}</HeadLink>
          <HeadLink href="/#plans">{t('navPlans')}</HeadLink>
          <HeadLink href="/faq">{t('navFaq')}</HeadLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <LanguageToggle compact />
          <Link
            href="/#plans"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-text)] text-white font-semibold text-[13px] sm:text-[15px] px-3.5 sm:px-5 py-2 sm:py-2.5 transition-all duration-200 hover:-translate-y-px hover:shadow-[0_12px_26px_-10px_rgba(124,92,255,0.5)] whitespace-nowrap"
          >
            {t('navDownload')}
          </Link>
        </div>
      </div>
    </header>
  );
}

function HeadLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative text-[15px] font-medium text-[var(--color-text-soft)] hover:text-[var(--color-text)] transition-colors after:absolute after:inset-x-0 after:-bottom-1.5 after:h-[1.5px] after:w-0 hover:after:w-full after:rounded-sm after:transition-all after:duration-300 after:[background:var(--accent-grad)]"
    >
      {children}
    </Link>
  );
}
