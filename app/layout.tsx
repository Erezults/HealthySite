import type { Metadata, Viewport } from 'next';
import {
  Fraunces,
  Figtree,
  Geist_Mono,
  Frank_Ruhl_Libre,
  Heebo,
} from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import { SiteHeader } from '@/components/SiteHeader';
import { Footer } from '@/components/Footer';

const fraunces = Fraunces({
  variable: '--font-display',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const figtree = Figtree({
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

const frankRuhl = Frank_Ruhl_Libre({
  variable: '--font-display-he',
  weight: ['400', '500', '700'],
  subsets: ['hebrew', 'latin'],
  display: 'swap',
});

const heebo = Heebo({
  variable: '--font-sans-he',
  subsets: ['hebrew', 'latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#F7F1E5',
  width: 'device-width',
  initialScale: 1,
};

const siteUrl = 'https://healthy.erezults.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Healthy Circle — A calmer home for your family’s health.',
    template: '%s · Healthy Circle',
  },
  description:
    'A shared, private health record for families. Appointments, prescriptions, lab results, and scans — gathered into one place on iOS and macOS, with AI that reads your documents.',
  applicationName: 'Healthy Circle',
  authors: [{ name: 'Erez Cohen' }],
  creator: 'Erez Cohen',
  keywords: [
    'family health records',
    'shared medical records',
    'iOS health app',
    'macOS health app',
    'medical scan AI',
    'prescription tracker',
    'lab results',
    'Healthy Circle app',
    'private health vault',
  ],
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      he: '/',
    },
  },
  openGraph: {
    title: 'Healthy Circle — A calmer home for your family’s health.',
    description:
      'A shared, private health record for families. Records, prescriptions, lab results, scans — one private place on iOS and macOS.',
    url: siteUrl,
    siteName: 'Healthy Circle',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthy Circle — A calmer home for your family’s health.',
    description:
      'A shared, private health record for families. iOS & macOS.',
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={[
        fraunces.variable,
        figtree.variable,
        geistMono.variable,
        frankRuhl.variable,
        heebo.variable,
        'h-full antialiased',
      ].join(' ')}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <I18nProvider>
          <div className="relative flex min-h-full flex-1 flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
