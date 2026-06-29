import type { Metadata } from 'next';
import { loadDoc } from '@/lib/content';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The legal terms governing use of the Healthy Circle iOS / macOS app and supporting website. Includes Apple HealthKit-style medical disclaimer.',
};

export default async function TermsPage() {
  const [en, he] = await Promise.all([
    loadDoc('terms', 'en'),
    loadDoc('terms', 'he'),
  ]);
  return <LegalPage en={en} he={he} />;
}
