import type { MetadataRoute } from 'next';

/**
 * Marketing/legal pages are public and indexable. The doctor-share viewer
 * (`/share/*`) renders private medical reports — it must NEVER be crawled or
 * indexed (it is also `noindex` per-page; this is defense in depth).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/share/',
    },
    sitemap: 'https://healthy.erezults.com/sitemap.xml',
  };
}
