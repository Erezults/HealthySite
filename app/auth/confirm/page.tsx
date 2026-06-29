'use client';

import { useEffect, useState } from 'react';

/**
 * Auth confirmation landing page.
 *
 * Supabase redirects here after email verification / password reset.
 * The URL fragment (#access_token=...&refresh_token=...&type=...) is passed
 * by Supabase after it verifies the OTP token from the email link.
 *
 * This page reads the fragment and deep-links into the Healthy Circle app.
 * If the app is not installed, it shows a download link.
 */

type AuthType = 'signup' | 'recovery' | 'invite' | 'email_change' | string;

export default function AuthConfirmPage() {
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading');
  const [authType, setAuthType] = useState<AuthType>('signup');

  useEffect(() => {
    const hash = window.location.hash.slice(1); // remove leading #
    const params = new URLSearchParams(hash);

    const accessToken  = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const type         = params.get('type') ?? 'signup';
    const errorDesc    = params.get('error_description');

    setAuthType(type);

    if (errorDesc) {
      setStatus('error');
      return;
    }

    if (!accessToken) {
      // Supabase may also send query params (PKCE flow)
      const qp = new URLSearchParams(window.location.search);
      const code = qp.get('code');
      if (code) {
        // PKCE — redirect to app with code so the app can exchange it
        const scheme = process.env.NEXT_PUBLIC_APP_SCHEME ?? 'healthynative';
        window.location.href = `${scheme}://auth/confirm?code=${encodeURIComponent(code)}&type=${type}`;
        setStatus('redirecting');
        return;
      }
      setStatus('error');
      return;
    }

    setStatus('redirecting');

    // Deep-link into the app with tokens in the fragment (never in query string)
    const scheme = process.env.NEXT_PUBLIC_APP_SCHEME ?? 'healthynative';
    const deepLink = `${scheme}://auth/confirm#access_token=${accessToken}&refresh_token=${encodeURIComponent(refreshToken ?? '')}&type=${type}`;
    window.location.href = deepLink;
  }, []);

  const isHe = typeof navigator !== 'undefined' && navigator.language.startsWith('he');

  return (
    <main
      dir={isHe ? 'rtl' : 'ltr'}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        background: '#f9fafb',
        color: '#111',
        textAlign: 'center',
        gap: '1rem',
      }}
    >
      {status === 'loading' && (
        <p style={{ fontSize: '1.1rem', color: '#555' }}>
          {isHe ? 'מאמת...' : 'Verifying…'}
        </p>
      )}

      {status === 'redirecting' && (
        <>
          <div style={{ fontSize: '2.5rem' }}>✅</div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>
            {isHe
              ? authType === 'recovery'
                ? 'מאמת את הבקשה...'
                : 'האימות הושלם!'
              : authType === 'recovery'
              ? 'Verifying your request…'
              : 'Email confirmed!'}
          </h1>
          <p style={{ color: '#555', margin: 0 }}>
            {isHe ? 'פותח את Healthy Circle...' : 'Opening Healthy Circle…'}
          </p>
          <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '1.5rem' }}>
            {isHe ? (
              <>
                לא נפתח אוטומטית?{' '}
                <a
                  href="https://apps.apple.com/app/id6772523166"
                  style={{ color: '#007aff', textDecoration: 'none' }}
                >
                  הורד את Healthy Circle מ-App Store
                </a>
              </>
            ) : (
              <>
                Didn't open automatically?{' '}
                <a
                  href="https://apps.apple.com/app/id6772523166"
                  style={{ color: '#007aff', textDecoration: 'none' }}
                >
                  Download Healthy Circle from the App Store
                </a>
              </>
            )}
          </p>
        </>
      )}

      {status === 'error' && (
        <>
          <div style={{ fontSize: '2.5rem' }}>⚠️</div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>
            {isHe ? 'הקישור לא תקין או פג תוקף' : 'This link is invalid or has expired'}
          </h1>
          <p style={{ color: '#555', margin: 0 }}>
            {isHe
              ? 'נסה להתחבר מחדש באפליקציה ולבקש קישור חדש.'
              : 'Please sign in again in the app to request a new link.'}
          </p>
        </>
      )}
    </main>
  );
}
