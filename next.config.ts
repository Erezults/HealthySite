import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Doctor-share viewer renders private medical reports — never cache,
        // never index, never leak the token via Referer. Scoped to /share/*
        // only; the rest of the site keeps its defaults. (See share-link plan §5b.)
        source: "/share/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, private" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
    ];
  },
};

export default nextConfig;
