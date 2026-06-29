import type { Metadata } from 'next';
import { SupportContent } from '@/components/SupportContent';

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Need help with the Healthy Circle app? Email the developer directly, or browse the FAQ.',
};

export default function SupportPage() {
  return <SupportContent />;
}
