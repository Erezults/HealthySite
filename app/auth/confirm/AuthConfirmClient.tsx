'use client';

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';

/**
 * Auth confirmation landing page (shared by the prod and dev routes).
 *
 * Supabase redirects here after email verification / password reset. dev/prod
 * is carried in the URL PATH — this component is rendered by BOTH
 * `/auth/confirm` (prod app) and `/auth/confirm/dev` (dev app) — the Fundiva
 * pattern. The legacy `?scheme=` query param is still honored as an
 * allow-listed override so links from emails sent before the path split keep
 * opening the right app.
 *
 * SECURITY (T358, Salarix F-703): session tokens are NEVER relayed into the
 * app. The only thing that may enter a deep link is the one-time PKCE ?code=,
 * which is useless without the code_verifier stored inside the app install
 * that initiated the flow. Legacy implicit links (#access_token=… from emails
 * sent before the app moved to PKCE) are handled entirely in the browser:
 *   • recovery  → the "set a new password" form below (GoTrue REST, in-page).
 *   • signup / email_change → the address is ALREADY verified by GoTrue's
 *     /verify step before this redirect, so we just say so and deep-link the
 *     app WITHOUT tokens — the user signs in normally.
 *
 * All copy is STACKED-BILINGUAL — English first, Hebrew beneath (owner
 * decision 2026-07-11): no language toggle, no navigator.language sniffing
 * (in-app email browsers misreport locales).
 */

type ParsedCallback = {
  status: 'redirecting' | 'redirect_recovery' | 'confirmed_manual' | 'recovery' | 'error';
  /** Deep link into the app: `scheme://auth/confirm?code=…` when we have a
   *  PKCE code, plain `scheme://` otherwise. Never carries tokens. */
  appUrl: string;
  /** Only set for legacy recovery links — consumed by the in-page reset form. */
  accessToken: string | null;
  /** token_hash recovery links: redeemed in-page against GoTrue /verify when the
   *  user chooses to reset here rather than in the app. */
  tokenHash?: string | null;
};

const FUNCTIONS_URL = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// GoTrue base, e.g. https://sqksoiwzrbtkedsfucal.supabase.co/auth/v1
const AUTH_BASE = (FUNCTIONS_URL?.replace('/functions/v1', '') ?? 'https://sqksoiwzrbtkedsfucal.supabase.co') + '/auth/v1';
const MIN_PW = 8;
const APP_STORE_URL = 'https://apps.apple.com/app/id6772523166';

function parseCallback(href: string, dev: boolean): ParsedCallback {
  const u = new URL(href);
  const hash = new URLSearchParams(u.hash.slice(1));
  const qp = u.searchParams;
  const at = hash.get('access_token');
  const type = hash.get('type') ?? qp.get('type');
  const code = qp.get('code');
  const tokenHash = qp.get('token_hash');
  const errorDesc =
    hash.get('error_description') ?? qp.get('error_description') ?? hash.get('error') ?? qp.get('error');

  // dev/prod comes from the route path (the `dev` prop). The legacy ?scheme=
  // param — used by emails sent before the path split — is honored only
  // against a hard allowlist, never verbatim.
  const ALLOWED_SCHEMES = ['healthynative', 'healthynative-dev'];
  const legacyScheme = qp.get('scheme');
  const scheme =
    legacyScheme && ALLOWED_SCHEMES.includes(legacyScheme)
      ? legacyScheme
      : dev ? 'healthynative-dev' : 'healthynative';

  if (errorDesc) return { status: 'error', appUrl: `${scheme}://`, accessToken: null };

  if (code) {
    // PKCE — relay the one-time code into the app, which exchanges it against
    // its stored code_verifier. This is the ONLY auth material that may ride
    // a deep link.
    const relay =
      `${scheme}://auth/confirm?code=${encodeURIComponent(code)}` +
      (type ? `&type=${encodeURIComponent(type)}` : '');
    return {
      status: type === 'recovery' ? 'redirect_recovery' : 'redirecting',
      appUrl: relay,
      accessToken: null,
    };
  }

  // token_hash links (2026-09-21, portfolio-wide): the PKCE code above only
  // works within GoTrue's FIVE-minute flow state on the device that signed
  // up; a token_hash is redeemed with verifyOtp for the OTP's lifetime, on
  // any device. Still no session material in the deep link.
  if (tokenHash) {
    const otpType = type ?? 'signup';
    const relay = `${scheme}://auth/confirm?token_hash=${encodeURIComponent(tokenHash)}&type=${encodeURIComponent(otpType)}`;
    return {
      status: otpType === 'recovery' ? 'redirect_recovery' : 'redirecting',
      appUrl: relay,
      accessToken: null,
      tokenHash: otpType === 'recovery' ? tokenHash : null,
    };
  }

  // Legacy implicit links (emails sent before the app moved to PKCE): the
  // tokens stay HERE in the browser — they are never deep-linked (F-703).
  if (at && type === 'recovery') return { status: 'recovery', appUrl: `${scheme}://`, accessToken: at };

  // signup / email_change: GoTrue's /verify already confirmed the address
  // before redirecting here — the account is verified. Open the app clean.
  if (at) return { status: 'confirmed_manual', appUrl: `${scheme}://`, accessToken: null };

  return { status: 'error', appUrl: `${scheme}://`, accessToken: null };
}

// The callback URL (incl. the #fragment) is client-only external input; served
// HTML prerenders the 'loading' state (server snapshot = null) and hydration
// swaps in the parsed result. No subscription needed — the URL never changes
// under us (the only navigation we do is leaving to the app scheme).
const subscribeNever = () => () => {};
const getHref = () => window.location.href;
const getServerHref = () => null;

export default function AuthConfirmClient({ dev }: { dev: boolean }) {
  const href = useSyncExternalStore(subscribeNever, getHref, getServerHref);
  const parsed = useMemo(() => (href ? parseCallback(href, dev) : null), [href, dev]);

  // recovery form
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formErr, setFormErr] = useState<string | null>(null);
  const [resetDone, setResetDone] = useState(false);
  // token_hash recovery: the app may not be on this device — offer the form here.
  const [resetHere, setResetHere] = useState(false);

  const status = resetDone ? 'recovery_done' : resetHere ? 'recovery' : (parsed?.status ?? 'loading');
  const appUrl = parsed?.appUrl ?? (dev ? 'healthynative-dev://' : 'healthynative://');

  // Auto-open the app when we have a PKCE code to relay. A genuine side effect
  // (navigation) — on a device without the app this is a no-op and the button
  // below stays as the manual fallback.
  useEffect(() => {
    if (parsed && (parsed.status === 'redirecting' || parsed.status === 'redirect_recovery')) {
      window.location.href = parsed.appUrl;
    }
  }, [parsed]);

  async function submitNewPassword() {
    setFormErr(null);
    if (pw.length < MIN_PW) { setFormErr(`Password must be at least ${MIN_PW} characters · הסיסמה חייבת לכלול לפחות ${MIN_PW} תווים`); return; }
    if (pw !== pw2) { setFormErr('Passwords do not match · הסיסמאות אינן תואמות'); return; }
    if ((!parsed?.accessToken && !parsed?.tokenHash) || !ANON_KEY) { setFormErr('Configuration error — retry from the app · שגיאה בהגדרות, נסו שוב מהאפליקציה'); return; }
    setSubmitting(true);
    try {
      let accessToken = parsed.accessToken;
      if (!accessToken && parsed.tokenHash) {
        // Redeem the one-time token_hash here, in the browser, for a short-lived
        // session that only ever sets the password. Nothing leaves this page.
        const v = await fetch(`${AUTH_BASE}/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apikey: ANON_KEY },
          body: JSON.stringify({ type: 'recovery', token_hash: parsed.tokenHash }),
        });
        const vj = await v.json().catch(() => ({}));
        if (!v.ok || !vj?.access_token) {
          throw new Error(vj?.msg || vj?.error_description || 'This link has expired or was already used · הקישור פג תוקף או כבר נוצל');
        }
        accessToken = vj.access_token as string;
      }
      const res = await fetch(`${AUTH_BASE}/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          apikey: ANON_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ password: pw }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.msg || j?.error_description || j?.message || 'Failed to update password · עדכון הסיסמה נכשל');
      }
      setResetDone(true);
    } catch (e) {
      setFormErr(e instanceof Error ? e.message : String(e));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '2rem',
        fontFamily: 'system-ui, sans-serif', background: '#f9fafb', color: '#111',
        textAlign: 'center', gap: '1rem',
      }}
    >
      {status === 'loading' && (
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          Verifying…
          <span style={heLineStyle} lang="he" dir="rtl">מאמת…</span>
        </p>
      )}

      {(status === 'redirecting' || status === 'confirmed_manual') && (
        <>
          <div style={{ fontSize: '2.5rem' }}>✅</div>
          <h1 style={h1Style}>
            Your email is verified!
            <span style={heHeadStyle} lang="he" dir="rtl">האימייל שלך אומת!</span>
          </h1>
          {status === 'redirecting' ? (
            <p style={subStyle}>
              Opening Healthy Circle… if the app didn&apos;t open, tap the button below.
              <span style={heLineStyle} lang="he" dir="rtl">פותחים את Healthy Circle… אם האפליקציה לא נפתחה, לחצו על הכפתור.</span>
            </p>
          ) : (
            <p style={subStyle}>
              Open Healthy Circle and sign in.
              <span style={heLineStyle} lang="he" dir="rtl">פתחו את Healthy Circle והתחברו.</span>
            </p>
          )}
          <a href={appUrl} style={btnLinkStyle}>
            Open Healthy Circle
            <span style={btnHeLineStyle} lang="he" dir="rtl">פתחו את Healthy Circle</span>
          </a>
          <a href={APP_STORE_URL} style={storeLinkStyle}>
            Don&apos;t have the app? Get it on the App Store
            <span style={heLineStyle} lang="he" dir="rtl">אין לכם את האפליקציה? הורידו מה-App Store</span>
          </a>
        </>
      )}

      {status === 'redirect_recovery' && (
        <>
          <div style={{ fontSize: '2.5rem' }}>🔑</div>
          <h1 style={h1Style}>
            Continue in the app to set a new password
            <span style={heHeadStyle} lang="he" dir="rtl">המשיכו באפליקציה לבחירת סיסמה חדשה</span>
          </h1>
          <p style={subStyle}>
            Opening Healthy Circle… the reset finishes on the device where you requested it.
            <span style={heLineStyle} lang="he" dir="rtl">פותחים את Healthy Circle… האיפוס מסתיים במכשיר שממנו ביקשתם אותו.</span>
          </p>
          <a href={appUrl} style={btnLinkStyle}>
            Open Healthy Circle
            <span style={btnHeLineStyle} lang="he" dir="rtl">פתחו את Healthy Circle</span>
          </a>
          {parsed?.tokenHash && (
            <button onClick={() => setResetHere(true)} style={linkBtnStyle}>
              The app isn&apos;t on this device? Set the new password here
              <span style={heLineStyle} lang="he" dir="rtl">האפליקציה לא במכשיר הזה? בחרו סיסמה חדשה כאן</span>
            </button>
          )}
        </>
      )}

      {status === 'recovery' && (
        <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          <div style={{ fontSize: '2.2rem' }}>🔑</div>
          <h1 style={h1Style}>
            Set a new password
            <span style={heHeadStyle} lang="he" dir="rtl">בחרו סיסמה חדשה</span>
          </h1>
          <input
            type="password" autoFocus value={pw} onChange={(e) => setPw(e.target.value)}
            placeholder="New password · סיסמה חדשה"
            style={inputStyle}
          />
          <input
            type="password" value={pw2} onChange={(e) => setPw2(e.target.value)}
            placeholder="Confirm password · אימות סיסמה"
            onKeyDown={(e) => { if (e.key === 'Enter') submitNewPassword(); }}
            style={inputStyle}
          />
          {formErr && <p style={{ color: '#dc2626', fontSize: '0.85rem', margin: 0 }}>{formErr}</p>}
          <button onClick={submitNewPassword} disabled={submitting} style={btnStyle(submitting)}>
            {submitting ? 'Updating… · מעדכן…' : (
              <>
                Update password
                <span style={btnHeLineStyle} lang="he" dir="rtl">עדכון סיסמה</span>
              </>
            )}
          </button>
        </div>
      )}

      {status === 'recovery_done' && (
        <>
          <div style={{ fontSize: '2.5rem' }}>✅</div>
          <h1 style={h1Style}>
            Password updated!
            <span style={heHeadStyle} lang="he" dir="rtl">הסיסמה עודכנה!</span>
          </h1>
          <p style={subStyle}>
            Open Healthy Circle and sign in with your new password.
            <span style={heLineStyle} lang="he" dir="rtl">פתחו את Healthy Circle והתחברו עם הסיסמה החדשה.</span>
          </p>
          <a href={appUrl} style={btnLinkStyle}>
            Open Healthy Circle
            <span style={btnHeLineStyle} lang="he" dir="rtl">פתחו את Healthy Circle</span>
          </a>
          <a href={APP_STORE_URL} style={storeLinkStyle}>
            Don&apos;t have the app? Get it on the App Store
            <span style={heLineStyle} lang="he" dir="rtl">אין לכם את האפליקציה? הורידו מה-App Store</span>
          </a>
        </>
      )}

      {status === 'error' && (
        <>
          <div style={{ fontSize: '2.5rem' }}>⚠️</div>
          <h1 style={h1Style}>
            This link is invalid or has expired
            <span style={heHeadStyle} lang="he" dir="rtl">הקישור לא תקין או פג תוקף</span>
          </h1>
          <p style={subStyle}>
            Please request a new link from the app.
            <span style={heLineStyle} lang="he" dir="rtl">בקשו קישור חדש מהאפליקציה.</span>
          </p>
          <a href={appUrl} style={btnLinkStyle}>
            Open Healthy Circle
            <span style={btnHeLineStyle} lang="he" dir="rtl">פתחו את Healthy Circle</span>
          </a>
        </>
      )}
    </main>
  );
}

const h1Style: React.CSSProperties = {
  fontSize: '1.4rem', fontWeight: 600, margin: 0, lineHeight: 1.35,
};
const heHeadStyle: React.CSSProperties = {
  display: 'block', fontSize: '1.2rem', fontWeight: 600, marginTop: '0.15rem',
};
const subStyle: React.CSSProperties = {
  color: '#555', margin: 0, lineHeight: 1.5,
};
const heLineStyle: React.CSSProperties = {
  display: 'block', marginTop: '0.15rem',
};
const storeLinkStyle: React.CSSProperties = {
  color: '#888', textDecoration: 'none', fontSize: '0.85rem', marginTop: '0.5rem', lineHeight: 1.5,
};
const btnLinkStyle: React.CSSProperties = {
  display: 'inline-block', padding: '0.85rem 1.8rem', fontSize: '1rem', fontWeight: 600,
  borderRadius: 999, background: '#7C5CFF', color: '#fff', textDecoration: 'none',
  marginTop: '0.5rem', lineHeight: 1.35,
};
const btnHeLineStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,.9)',
};
const linkBtnStyle: React.CSSProperties = {
  background: 'none', border: 'none', color: '#7C5CFF', cursor: 'pointer',
  fontSize: '0.9rem', marginTop: '0.25rem', lineHeight: 1.5, fontFamily: 'inherit',
};
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.8rem 1rem', fontSize: '1rem', borderRadius: 12,
  border: '1px solid #e5e7eb', background: '#fff', color: '#111', outline: 'none',
};
const btnStyle = (disabled: boolean): React.CSSProperties => ({
  width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: 600, borderRadius: 999,
  border: 'none', cursor: disabled ? 'default' : 'pointer', color: '#fff',
  background: disabled ? '#b9a8ff' : '#7C5CFF', lineHeight: 1.35,
});
