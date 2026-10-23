import type { Metadata } from 'next';
import { ShareViewer } from './ShareViewer';

/**
 * `/share/` — static shell of the doctor-share viewer (share/index.html). Every
 * `/share/<token>` and `/share/<token>/doc/<docId>` URL is served the 404.html
 * shell (app/not-found.tsx), which renders the same <ShareViewer/>. The shell
 * holds NO PHI; the report is fetched client-side. GitHub Pages cannot set HTTP
 * headers, so the old Vercel `/share/*` headers are replaced by these meta tags
 * (robots + referrer) and by robots.txt `Disallow: /share/`.
 */
export const metadata: Metadata = {
  title: 'Shared health report',
  robots: { index: false, follow: false, nocache: true },
  referrer: 'no-referrer',
};

export default function ShareIndexPage() {
  return <ShareViewer />;
}
