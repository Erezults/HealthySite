'use client';

import { useI18n } from '@/lib/i18n';

type Props = {
  n: number;
  alt: string;
  position?: string;
  eager?: boolean;
};

// Locale-aware App Store screenshot. The source canvases have a baked-in
// headline band at the top, so we crop with object-fit/position to show only
// the clean app UI. Hebrew locale serves the Hebrew app screenshots.
export function ScreenImg({ n, alt, position = 'center 34%', eager = false }: Props) {
  const { locale } = useI18n();
  const src = `/screens/${locale}/shot${String(n).padStart(2, '0')}.png`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      className="w-full h-full object-cover"
      style={{ objectPosition: position }}
    />
  );
}
