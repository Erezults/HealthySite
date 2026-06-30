'use client';

import { useEffect, useState } from 'react';

/**
 * Auth confirmation landing page.
 *
 * Supabase redirects here after email verification / password reset, with the
 * session token in the URL fragment (#access_token=...&type=...). We carry the
 * initiating app's custom scheme as ?scheme= so we deep-link back to the SAME
 * app (dev signups → dev app, prod → prod).
 *
 *   • signup / email_change → deep-link into the app ("email confirmed").
 *   • recovery              → show a "set a new password" form IN THIS PAGE and
 *                              complete it via the GoTrue REST API, so the reset
 *                              works even if the app isn't installed / the deep
 *                              link fails.
 */

type AuthType = 'signup' | 'recovery' | 'invite' | 'email_change' | string;
type Status = 'loading' | 'redirecting' | 'recovery' | 'recovery_done' | 'error';

const FUNCTIONS_URL = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// GoTrue base, e.g. https://sqksoiwzrbtkedsfucal.supabase.co/auth/v1
const AUTH_BASE = (FUNCTIONS_URL?.replace('/functions/v1', '') ?? 'https://sqksoiwzrbtkedsfucal.supabase.co') + '/auth/v1';
const MIN_PW = 8;

export default function AuthConfirmPage() {
  const [status, setStatus] = useState<Status>('loading');
  const [authType, setAuthType] = useState<AuthType>('signup');
  const [accessToken, setAccessToken] = useState<string | null>(null);
  // App scheme carried in ?scheme= so we deep-link back to the SAME app that
  // initiated the flow (dev signups → healthynative-dev, prod → healthynative).
  const [appScheme, setAppScheme] = useState<string>('healthynative');

  // recovery form
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formErr, setFormErr] = useState<string | null>(null);

  const isHe = typeof navigator !== 'undefined' && navigator.language.startsWith('he');

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const qp = new URLSearchParams(window.location.search);
    const at = params.get('access_token');
    const rt = params.get('refresh_token');
    const type = params.get('type') ?? qp.get('type') ?? 'signup';
    const errorDesc = params.get('error_description') ?? qp.get('error_description');
    const scheme = qp.get('scheme') || process.env.NEXT_PUBLIC_APP_SCHEME || 'healthynative';

    setAuthType(type);
    setAppScheme(scheme);

    if (errorDesc) { setStatus('error'); return; }

    // Recovery → complete the password reset HERE (works without the app installed).
    if (type === 'recovery' && at) {
      setAccessToken(at);
      setStatus('recovery');
      return;
    }

    if (at) {
      // signup / email_change → relay into the app
      setStatus('redirecting');
      window.location.href = `${scheme}://auth/confirm#access_token=${at}&refresh_token=${encodeURIComponent(rt ?? '')}&type=${type}`;
      return;
    }

    const code = qp.get('code');
    if (code) {
      setStatus('redirecting');
      window.location.href = `${scheme}://auth/confirm?code=${encodeURIComponent(code)}&type=${type}`;
      return;
    }

    setStatus('error');
  }, []);

  async function submitNewPassword() {
    setFormErr(null);
    if (pw.length < MIN_PW) { setFormErr(isHe ? `הסיסמה חייבת לכלול לפחות ${MIN_PW} תווים` : `Password must be at least ${MIN_PW} characters`); return; }
    if (pw !== pw2) { setFormErr(isHe ? 'הסיסמאות אינן תואמות' : 'Passwords do not match'); return; }
    if (!accessToken || !ANON_KEY) { setFormErr(isHe ? 'שגיאה בהגדרות. נסו שוב מהאפליקציה.' : 'Configuration error. Please retry from the app.'); return; }
    setSubmitting(true);
    try {
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
        throw new Error(j?.msg || j?.error_description || j?.message || (isHe ? 'עדכון הסיסמה נכשל' : 'Failed to update password'));
      }
      setStatus('recovery_done');
    } catch (e) {
      setFormErr(e instanceof Error ? e.message : String(e));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main
      dir={isHe ? 'rtl' : 'ltr'}
      style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '2rem',
        fontFamily: 'system-ui, sans-serif', background: '#f9fafb', color: '#111',
        textAlign: 'center', gap: '1rem',
      }}
    >
      {status === 'loading' && (
        <p style={{ fontSize: '1.1rem', color: '#555' }}>{isHe ? 'מאמת...' : 'Verifying…'}</p>
      )}

      {status === 'redirecting' && (
        <>
          <div style={{ fontSize: '2.5rem' }}>✅</div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>
            {isHe ? 'האימות הושלם!' : 'Email confirmed!'}
          </h1>
          <p style={{ color: '#555', margin: 0 }}>{isHe ? 'פותח את Healthy Circle...' : 'Opening Healthy Circle…'}</p>
          <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '1.5rem' }}>
            {isHe ? 'לא נפתח אוטומטית? ' : "Didn't open automatically? "}
            <a href="https://apps.apple.com/app/id6772523166" style={{ color: '#7C5CFF', textDecoration: 'none' }}>
              {isHe ? 'הורד את Healthy Circle מ-App Store' : 'Download Healthy Circle from the App Store'}
            </a>
          </p>
        </>
      )}

      {status === 'recovery' && (
        <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          <div style={{ fontSize: '2.2rem' }}>🔑</div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>
            {isHe ? 'בחרו סיסמה חדשה' : 'Set a new password'}
          </h1>
          <input
            type="password" autoFocus value={pw} onChange={(e) => setPw(e.target.value)}
            placeholder={isHe ? 'סיסמה חדשה' : 'New password'}
            style={inputStyle}
          />
          <input
            type="password" value={pw2} onChange={(e) => setPw2(e.target.value)}
            placeholder={isHe ? 'אימות סיסמה' : 'Confirm password'}
            onKeyDown={(e) => { if (e.key === 'Enter') submitNewPassword(); }}
            style={inputStyle}
          />
          {formErr && <p style={{ color: '#dc2626', fontSize: '0.85rem', margin: 0 }}>{formErr}</p>}
          <button onClick={submitNewPassword} disabled={submitting} style={btnStyle(submitting)}>
            {submitting ? (isHe ? 'מעדכן...' : 'Updating…') : (isHe ? 'עדכון סיסמה' : 'Update password')}
          </button>
        </div>
      )}

      {status === 'recovery_done' && (
        <>
          <div style={{ fontSize: '2.5rem' }}>✅</div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>
            {isHe ? 'הסיסמה עודכנה' : 'Password updated'}
          </h1>
          <p style={{ color: '#555', margin: 0 }}>
            {isHe ? 'פתחו את האפליקציה והתחברו עם הסיסמה החדשה.' : 'Open the app and sign in with your new password.'}
          </p>
          {/* Deep-link to the SAME app (dev/prod) that started the reset, so the
              INSTALLED app opens — not the App Store. App Store stays as a fallback
              for anyone without the app. */}
          <a
            href={`${appScheme}://`}
            style={{ display: 'inline-block', padding: '0.85rem 1.8rem', fontSize: '1rem', fontWeight: 600, borderRadius: 999, background: '#7C5CFF', color: '#fff', textDecoration: 'none', marginTop: '0.5rem' }}
          >
            {isHe ? 'פתח את Healthy Circle' : 'Open Healthy Circle'}
          </a>
          <a href="https://apps.apple.com/app/id6772523166" style={{ color: '#888', textDecoration: 'none', fontSize: '0.82rem', marginTop: '0.25rem' }}>
            {isHe ? 'אין לך את האפליקציה? הורד מ-App Store' : "Don't have the app? Get it on the App Store"}
          </a>
        </>
      )}

      {status === 'error' && (
        <>
          <div style={{ fontSize: '2.5rem' }}>⚠️</div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>
            {isHe ? 'הקישור לא תקין או פג תוקף' : 'This link is invalid or has expired'}
          </h1>
          <p style={{ color: '#555', margin: 0 }}>
            {isHe ? 'נסו לבקש קישור חדש מהאפליקציה.' : 'Please request a new link from the app.'}
          </p>
        </>
      )}
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.8rem 1rem', fontSize: '1rem', borderRadius: 12,
  border: '1px solid #e5e7eb', background: '#fff', color: '#111', outline: 'none',
};
const btnStyle = (disabled: boolean): React.CSSProperties => ({
  width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: 600, borderRadius: 999,
  border: 'none', cursor: disabled ? 'default' : 'pointer', color: '#fff',
  background: disabled ? '#b9a8ff' : '#7C5CFF',
});
