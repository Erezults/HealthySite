import type { NextConfig } from "next";

// Static export for GitHub Pages (2026-10-23; previously Vercel). GitHub Pages
// cannot send per-path HTTP headers, so the former `/share/*` headers
// (Cache-Control no-store, X-Robots-Tag, Referrer-Policy) now live as:
//  • <meta name="robots" noindex,nofollow> + <meta name="referrer" no-referrer>
//    on the share shells (app/share/page.tsx, app/not-found.tsx → 404.html),
//  • robots.txt `Disallow: /share/`,
//  • no-store / noindex / no-referrer on every doctor-share edge-function
//    response (the only place PHI travels — the HTML shell holds none).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
