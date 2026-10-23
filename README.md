# Healthy — Marketing Website

The marketing site for the [Healthy](https://healthy.erezults.com) iOS + macOS app — shared family health records.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **react-markdown** + remark-gfm for legal pages
- Custom i18n (EN / HE) with RTL support
- Static Open Graph image (`app/opengraph-image.png`)
- Static export (`output: 'export'`) deployed on **GitHub Pages** at `healthy.erezults.com`

## Aesthetic

Editorial Wellness — warm cream background, forest green primary, terracotta accents, paired serif/sans typography (Fraunces + Geist for Latin, Frank Ruhl Libre + Heebo for Hebrew).

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in the values (for deploys they are GitHub Actions repo variables).
Required for the `/share` viewer and `/auth/confirm`; the rest of the site runs without them.
All are public `NEXT_PUBLIC_*` values — never add secrets (e.g. the Supabase service-role key) to this app.

## Pages

| Path        | Purpose                                                       |
|-------------|---------------------------------------------------------------|
| `/`         | Landing — hero, tour, features, pricing, trust, closing      |
| `/privacy`  | Privacy Policy (EN + HE) — special-category health data      |
| `/terms`    | Terms of Service (EN + HE) — Apple HealthKit-style disclaimer|
| `/support`  | FAQ + mailto `healthy.support@erezults.com`                   |

## Editing legal content

Source: `content/{privacy,terms}.{en,he}.md`. Keep EN and HE in sync.

## Editing copy

UI strings live in `lib/i18n.tsx` as keyed dictionaries (`en` / `he`).

## Deploy

Pushes to `main` build the static export (`out/`) and deploy to GitHub Pages (`.github/workflows/pages.yml`).

The doctor-share viewer is client-side: `/share/` is `share/index.html`, and every
`/share/<token>` or `/share/<token>/doc/<docId>?k=r|c` URL is served `404.html`
(`app/not-found.tsx`), which renders the viewer and fetches the report from the
`doctor-share` edge function (CORS-locked to this origin). The shells hold no PHI.

---

© 2026 Erez Cohen
