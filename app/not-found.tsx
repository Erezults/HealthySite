import type { Metadata } from 'next';
import { NotFoundOrShare } from './NotFoundOrShare';

/**
 * Static export → out/404.html, which GitHub Pages serves for every unknown
 * path. That is how arbitrary `/share/<token>[/doc/<docId>]` links reach the
 * client-side share viewer (SPA fallback). The shell holds NO PHI.
 *
 * The robots/referrer metadata applies to every 404 (harmless for a missing
 * page) so the share viewer is never indexed and never leaks the token in a
 * Referer header.
 */
export const metadata: Metadata = {
  title: { absolute: 'Healthy Circle' },
  robots: { index: false, follow: false, nocache: true },
  referrer: 'no-referrer',
};

export default function NotFound() {
  return <NotFoundOrShare />;
}
