'use client';

// Client half of the shared-document link: calls redeem-doc and forwards the
// browser to the signed URL. Kept tiny — errors show a plain bilingual line.

import { useEffect, useState } from 'react';

const FUNCTIONS_URL = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function DocRedirect({
  token,
  docId,
  kind,
}: {
  token: string;
  docId: string;
  kind: 'r' | 'c';
}) {
  const [state, setState] = useState<'loading' | 'error' | 'gone'>('loading');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!FUNCTIONS_URL || !ANON_KEY) {
        setState('error');
        return;
      }
      try {
        const res = await fetch(`${FUNCTIONS_URL}/doctor-share`, {
          method: 'POST',
          cache: 'no-store',
          headers: {
            'content-type': 'application/json',
            apikey: ANON_KEY,
            authorization: `Bearer ${ANON_KEY}`,
          },
          body: JSON.stringify({ mode: 'redeem-doc', token, docId, kind }),
        });
        if (cancelled) return;
        if (res.status === 410) {
          setState('gone');
          return;
        }
        const data = await res.json().catch(() => null);
        if (res.ok && data?.ok && data.url) {
          window.location.replace(data.url);
          return;
        }
        setState('error');
      } catch {
        if (!cancelled) setState('error');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, docId, kind]);

  const msg =
    state === 'loading'
      ? 'פותח מסמך… · Opening document…'
      : state === 'gone'
        ? 'הקישור פג תוקף או בוטל · This link has expired or was revoked'
        : 'המסמך אינו זמין · Document unavailable';

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        fontSize: 16,
        color: '#334155',
        padding: 24,
        textAlign: 'center',
      }}>
      {msg}
    </main>
  );
}
