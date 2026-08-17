// app/share/[token]/doc/[docId]/page.tsx
//
// Document link target for the in-PDF doctor-report links (2026-08-17): the
// report links every chapter/record document as
//   /share/<token>/doc/<docId>?k=r|c
// so the doctor only ever sees the app's own domain. This page redeems the
// document via the doctor-share edge function (mode: 'redeem-doc' — validates
// the share token WITHOUT consuming a view) and forwards the browser to the
// fresh, short-lived signed URL it returns. PHI never touches this page.

import type { Metadata } from 'next';
import DocRedirect from './DocRedirect';

export const metadata: Metadata = {
  title: 'Shared document',
  robots: { index: false, follow: false, nocache: true },
  referrer: 'no-referrer',
};

export default async function SharedDocPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string; docId: string }>;
  searchParams: Promise<{ k?: string }>;
}) {
  const { token, docId } = await params;
  const { k } = await searchParams;
  return <DocRedirect token={token} docId={docId} kind={k === 'c' ? 'c' : 'r'} />;
}
