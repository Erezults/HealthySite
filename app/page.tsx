import { Hero } from '@/components/Hero';
import { Showcase } from '@/components/Showcase';
import { Values } from '@/components/Values';
import { Subscriptions } from '@/components/Subscriptions';
import { ClosingBand } from '@/components/ClosingBand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Showcase />
      <Values />
      <Subscriptions />
      <ClosingBand />
    </>
  );
}
