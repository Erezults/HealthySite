'use client';

/**
 * F2 Doctor Share — public, read-only medical report viewer (client-side).
 *
 * Security posture (see HealthyNative docs/plans/2026-06-14-doctor-share.md §1, §4, §5):
 *  - Static shell (GitHub Pages) with NO PHI: `/share/` is share/index.html and
 *    every `/share/<token>[/doc/<docId>]` URL is served the 404.html shell, which
 *    renders this component. The bundle is fetched in the browser, at view time,
 *    from the `doctor-share` edge function (CORS-locked to this origin, every
 *    response no-store / noindex / no-referrer).
 *  - The browser NEVER sees group_id / member ids / row uuids — the edge function
 *    returns an already-sanitized, id-free bundle (whitelist projection).
 *  - The raw token lives only in the URL path. It is NEVER put into
 *    document.title, logs or analytics (the site has none), and the page sends
 *    no Referer (meta referrer=no-referrer on the shell).
 */

import { useEffect, useState, useSyncExternalStore } from 'react';
import { callDoctorShare, parseSharePath, type SharePath } from '@/lib/shareApi';
import { ShareReport, type ShareBundle } from './ShareReport';
import DocRedirect from './DocRedirect';

type RedeemErrorKind =
  | 'invalid' // 404 not_found / bad token
  | 'expired' // 410 expired
  | 'revoked' // 410 revoked
  | 'exhausted' // 410 view-limit reached
  | 'unavailable'; // 5xx / network / misconfig

type RedeemResult =
  | { ok: true; bundle: ShareBundle }
  | { ok: false; kind: RedeemErrorKind };

async function redeem(token: string): Promise<RedeemResult> {
  let res: Response;
  try {
    res = await callDoctorShare({ mode: 'redeem', token });
  } catch {
    return { ok: false, kind: 'unavailable' };
  }

  if (res.ok) {
    try {
      const json = (await res.json()) as { ok?: boolean; bundle?: ShareBundle };
      if (json?.ok && json.bundle) return { ok: true, bundle: json.bundle };
    } catch {
      /* fall through */
    }
    return { ok: false, kind: 'unavailable' };
  }

  // Map the edge function's typed errors (§4b) → friendly states. Never echo
  // the server body (it could contain detail) — only the coarse kind.
  let code: string | undefined;
  try {
    const body = (await res.json()) as { error?: string };
    code = body?.error;
  } catch {
    /* ignore */
  }

  switch (res.status) {
    case 404:
      return { ok: false, kind: 'invalid' };
    case 410:
      if (code === 'revoked') return { ok: false, kind: 'revoked' };
      if (code === 'exhausted') return { ok: false, kind: 'exhausted' };
      return { ok: false, kind: 'expired' };
    default:
      return { ok: false, kind: 'unavailable' };
  }
}

// window.location is read via useSyncExternalStore so the statically
// prerendered HTML (no location → 'none'/loading) hydrates without mismatch.
const subscribeNoop = () => () => {};
const getLocationKey = () => window.location.pathname + window.location.search;
const getServerLocationKey = () => '';

/** Path-aware entry point: report, document redirect, or invalid-link state. */
export function ShareViewer() {
  const locKey = useSyncExternalStore(subscribeNoop, getLocationKey, getServerLocationKey);
  if (!locKey) return <ShareLoading />;
  const q = locKey.indexOf('?');
  const path: SharePath = parseSharePath(
    q === -1 ? locKey : locKey.slice(0, q),
    q === -1 ? '' : locKey.slice(q),
  );
  if (path.kind === 'doc') {
    return <DocRedirect token={path.token} docId={path.docId} kind={path.docKind} />;
  }
  if (path.kind === 'report') return <ShareReportLoader key={path.token} token={path.token} />;
  return <ShareErrorState kind="invalid" />;
}

function ShareReportLoader({ token }: { token: string }) {
  const [result, setResult] = useState<RedeemResult | null>(null);

  useEffect(() => {
    let cancelled = false;
    redeem(token).then((r) => {
      if (!cancelled) setResult(r);
    });
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (!result) return <ShareLoading />;
  if (!result.ok) return <ShareErrorState kind={result.kind} />;
  return <ShareReport bundle={result.bundle} />;
}

function ShareLoading() {
  return (
    <section className="relative min-h-[70vh]" aria-busy="true">
      <div className="relative mx-auto max-w-md px-6 py-32 text-center text-[var(--color-text-muted)]">
        <p>Loading report…</p>
        <p dir="rtl" className="mt-1">
          טוען דוח…
        </p>
      </div>
    </section>
  );
}

/**
 * Friendly, leak-free error states. NO data, NO token, NO links into the app.
 * Both EN + HE lines stacked — short, calm, and self-explanatory.
 */
function ShareErrorState({ kind }: { kind: RedeemErrorKind }) {
  const copy: Record<RedeemErrorKind, { en: string; he: string }> = {
    invalid: {
      en: 'This link is not valid.',
      he: 'הקישור אינו תקין.',
    },
    expired: {
      en: 'This link has expired.',
      he: 'תוקף הקישור פג.',
    },
    revoked: {
      en: 'This link has been revoked.',
      he: 'הקישור בוטל.',
    },
    exhausted: {
      en: 'This link has reached its view limit.',
      he: 'הקישור הגיע למספר הצפיות המרבי.',
    },
    unavailable: {
      en: 'This report is currently unavailable. Please try again later.',
      he: 'הדוח אינו זמין כעת. נסו שוב מאוחר יותר.',
    },
  };
  const c = copy[kind];

  return (
    <section className="relative min-h-[70vh] grain" data-share-state={kind}>
      <span
        className="sun"
        style={{
          width: 640,
          height: 640,
          top: -340,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.35,
        }}
      />
      <div className="relative mx-auto max-w-md px-6 py-32 text-center">
        <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-surface)] text-2xl">
          🔒
        </div>
        <p className="font-display text-2xl text-[var(--color-text)]">{c.en}</p>
        <p
          dir="rtl"
          className="mt-2 text-2xl text-[var(--color-text)]"
          style={{ fontFamily: 'var(--font-display-he), serif' }}
        >
          {c.he}
        </p>
        <p className="mt-8 text-sm text-[var(--color-text-muted)]">
          Shared health reports are private and time-limited.
        </p>
        <p dir="rtl" className="mt-1 text-sm text-[var(--color-text-muted)]">
          דוחות בריאות משותפים הם פרטיים ומוגבלים בזמן.
        </p>
      </div>
    </section>
  );
}
