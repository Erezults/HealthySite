import { Hero } from '@/components/Hero';
import { Tour } from '@/components/Tour';
import { Features } from '@/components/Features';
import { TrustStrip } from '@/components/TrustStrip';
import { ClosingBand } from '@/components/ClosingBand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Tour />
      <Features />
      <TrustStrip />
      <ClosingBand />
    </>
  );
}
