'use client';

// Shared-document link target (/share/<token>/doc/<docId>?k=r|c — the links
// inside the doctor report PDF): calls redeem-doc (validates the share token
// WITHOUT consuming a view) and forwards the browser to the fresh, short-lived
// signed URL. PHI never touches this page. Errors show a plain bilingual line.

import { useEffect, useState } from 'react';
import { callDoctorShare } from '@/lib/shareApi';

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
      try {
        const res = await callDoctorShare({ mode: 'redeem-doc', token, docId, kind });
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
    <div
      style={{
        minHeight: '70vh',
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
    </div>
  );
}
