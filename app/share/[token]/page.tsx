import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { ShareReport, type ShareBundle } from './ShareReport';

/**
 * F2 Doctor Share — public, read-only medical report viewer.
 *
 * Security posture (see HealtyNative docs/plans/2026-06-14-doctor-share.md §1, §4, §5):
 *  - Server-rendered per request; never statically cached, never indexed.
 *  - Talks to the `doctor-share` Supabase Edge function (redeem mode) over plain
 *    `fetch` (no Supabase SDK in this repo). The function is `verify_jwt=false`,
 *    so the only credential needed is the public anon key sent as the `apikey`
 *    header (it is the API-gateway key, already public).
 *  - The browser NEVER sees group_id / member ids / row uuids — the edge function
 *    returns an already-sanitized, id-free bundle (whitelist projection).
 *  - The raw token lives only in the URL path, never in a querystring.
 */

// Per-request render only — no static cache of medical content.
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// Belt-and-suspenders against indexing/caching of PHI.
export const metadata: Metadata = {
  title: 'Shared health report',
  robots: { index: false, follow: false, nocache: true },
  referrer: 'no-referrer',
};

// Env (see .env.example; set in Vercel — NEVER the service-role key here):
//   NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL = https://sqksoiwzrbtkedsfucal.supabase.co/functions/v1
//   NEXT_PUBLIC_SUPABASE_ANON_KEY      = <public anon key>
// Documented in §5a of the share-link plan.
const FUNCTIONS_URL = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
  if (!FUNCTIONS_URL || !ANON_KEY) {
    // Misconfiguration — fail closed, leak nothing.
    return { ok: false, kind: 'unavailable' };
  }

  let res: Response;
  try {
    res = await fetch(`${FUNCTIONS_URL}/doctor-share`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'content-type': 'application/json',
        // Public anon key — gateway credential, not a user JWT.
        apikey: ANON_KEY,
        authorization: `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify({ mode: 'redeem', token }),
    });
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
    case 429:
      return { ok: false, kind: 'unavailable' };
    default:
      return { ok: false, kind: 'unavailable' };
  }
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // Touch headers() to force this segment onto the dynamic path (defense in
  // depth alongside `dynamic = 'force-dynamic'` — never prerendered).
  await headers();

  const result = await redeem(token);

  if (!result.ok) {
    return <ShareErrorState kind={result.kind} />;
  }

  return <ShareReport bundle={result.bundle} />;
}

/**
 * Friendly, leak-free error states. NO data, NO token, NO links into the app.
 * Bilingual is impossible to resolve server-side (locale is client-stored), so
 * we render both EN + HE lines stacked — short, calm, and self-explanatory.
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
    <section className="relative min-h-[70vh] grain">
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
        <p
          dir="rtl"
          className="mt-1 text-sm text-[var(--color-text-muted)]"
        >
          דוחות בריאות משותפים הם פרטיים ומוגבלים בזמן.
        </p>
      </div>
    </section>
  );
}
