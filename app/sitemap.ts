import type { MetadataRoute } from 'next';

const siteUrl = 'https://healthy.erezults.com';

/**
 * Only public marketing/legal pages are listed. The doctor-share viewer
 * (`/share/*`) and auth flows (`/auth/*`) are private and intentionally
 * excluded (`/share/` is also disallowed in robots.ts and noindex per-page).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/faq`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/support`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/privacy`,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${siteUrl}/terms`,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];
}
