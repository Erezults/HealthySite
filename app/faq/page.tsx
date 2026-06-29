import type { Metadata } from 'next';
import { FaqContent } from '@/components/FaqContent';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about Healthy Circle — privacy, AI document scanning, plans and credits, and your data on iOS & macOS.',
};

export default function FaqPage() {
  return <FaqContent />;
}
