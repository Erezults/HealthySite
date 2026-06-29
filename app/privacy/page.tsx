import type { Metadata } from 'next';
import { loadDoc } from '@/lib/content';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Healthy Circle handles your family’s health data. Special-category health data, encrypted storage, group-only sharing, no advertising, no model training.',
};

export default async function PrivacyPage() {
  const [en, he] = await Promise.all([
    loadDoc('privacy', 'en'),
    loadDoc('privacy', 'he'),
  ]);
  return <LegalPage en={en} he={he} />;
}
