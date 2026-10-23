'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { ShareViewer } from './share/ShareViewer';

const subscribeNoop = () => () => {};
const getIsShare = () => (window.location.pathname.startsWith('/share/') ? 'share' : 'other');
const getServerIsShare = () => 'pending';

/** 404 shell: `/share/*` paths render the doctor-share viewer, anything else a plain not-found. */
export function NotFoundOrShare() {
  const which = useSyncExternalStore(subscribeNoop, getIsShare, getServerIsShare);
  if (which === 'pending') return <section className="min-h-[70vh]" />;
  if (which === 'share') return <ShareViewer />;
  return (
    <section className="relative min-h-[70vh]">
      <div className="mx-auto max-w-md px-6 py-32 text-center">
        <p className="font-display text-2xl text-[var(--color-text)]">Page not found.</p>
        <p dir="rtl" className="mt-2 text-xl text-[var(--color-text)]">
          הדף לא נמצא.
        </p>
        <Link href="/" className="mt-8 inline-block text-sm underline text-[var(--color-text-muted)]">
          Healthy Circle
        </Link>
      </div>
    </section>
  );
}
