// Client-side access to the `doctor-share` Supabase Edge function.
//
// The share viewer is a static page (GitHub Pages) — the browser calls the
// function directly. The function's CORS allows ONLY https://healthy.erezults.com
// and refuses any other browser Origin (HealthyNative a56c7395). Values below are
// PUBLIC: the functions base URL and the anon/publishable gateway key (never the
// service-role key). The anon key is injected at build time (GitHub Actions repo
// variable NEXT_PUBLIC_SUPABASE_ANON_KEY) so it never lands in git.

export const FUNCTIONS_URL =
  process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL ||
  'https://sqksoiwzrbtkedsfucal.supabase.co/functions/v1';
export const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export type SharePath =
  | { kind: 'report'; token: string }
  | { kind: 'doc'; token: string; docId: string; docKind: 'r' | 'c' }
  | { kind: 'none' };

/**
 * Parse `/share/<token>[/]` and `/share/<token>/doc/<docId>[/]` (+ `?k=r|c`).
 * Both shapes exist inside already-issued doctor-report PDFs, so both must keep
 * resolving with or without a trailing slash.
 */
export function parseSharePath(pathname: string, search: string): SharePath {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] !== 'share' || !parts[1]) return { kind: 'none' };
  let token: string;
  try {
    token = decodeURIComponent(parts[1]);
  } catch {
    return { kind: 'none' };
  }
  if (parts.length === 2) return { kind: 'report', token };
  if (parts.length === 4 && parts[2] === 'doc' && parts[3]) {
    let docId: string;
    try {
      docId = decodeURIComponent(parts[3]);
    } catch {
      return { kind: 'none' };
    }
    const k = new URLSearchParams(search).get('k');
    return { kind: 'doc', token, docId, docKind: k === 'c' ? 'c' : 'r' };
  }
  return { kind: 'none' };
}

/** POST to doctor-share. Never cached; the token is sent only in the body. */
export async function callDoctorShare(body: Record<string, unknown>): Promise<Response> {
  if (!ANON_KEY) throw new Error('misconfigured');
  return fetch(`${FUNCTIONS_URL}/doctor-share`, {
    method: 'POST',
    cache: 'no-store',
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    headers: {
      'content-type': 'application/json',
      // Public anon key — gateway credential, not a user JWT (verify_jwt=false).
      apikey: ANON_KEY,
      authorization: `Bearer ${ANON_KEY}`,
    },
    body: JSON.stringify(body),
  });
}
