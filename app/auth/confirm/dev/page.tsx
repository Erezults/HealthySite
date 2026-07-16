import type { Metadata } from 'next';
import AuthConfirmClient from '../AuthConfirmClient';

/**
 * DEV auth callback — `redirect_to` target of the dev app. dev/prod is carried
 * in the URL PATH (T358, Fundiva pattern): this route deep-links back with the
 * `healthynative-dev://` scheme so dev signups/resets always reopen the dev
 * app. Must stay in Supabase's `uri_allow_list` (exact URL is listed).
 */
export const metadata: Metadata = {
  title: 'Email verification (dev) · אימות אימייל',
  robots: { index: false, follow: false },
};

export default function AuthConfirmDevPage() {
  return <AuthConfirmClient dev />;
}
