import type { Metadata } from 'next';
import AuthConfirmClient from './AuthConfirmClient';

/**
 * PROD auth callback — `redirect_to` target of the production app
 * (`healthynative://`). The dev app uses `/auth/confirm/dev` (path-based
 * routing, T358); both routes render the same client component.
 * This URL is Supabase's `site_url` AND is in its `uri_allow_list`.
 */
export const metadata: Metadata = {
  title: 'Email verification · אימות אימייל',
  robots: { index: false, follow: false },
};

export default function AuthConfirmPage() {
  return <AuthConfirmClient dev={false} />;
}
