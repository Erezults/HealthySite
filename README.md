# Healthy — Marketing Website

The marketing site for the [Healthy](https://healthy.erezults.com) iOS + macOS app — shared family health records.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **react-markdown** + remark-gfm for legal pages
- Custom i18n (EN / HE) with RTL support
- Edge-rendered Open Graph image (`/opengraph-image`)
- Deployed on **Vercel** at `healthy.erezults.com`

## Aesthetic

Editorial Wellness — warm cream background, forest green primary, terracotta accents, paired serif/sans typography (Fraunces + Geist for Latin, Frank Ruhl Libre + Heebo for Hebrew).

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in the values (also set them in Vercel).
Required for `/share/[token]` and `/auth/confirm`; the rest of the site runs without them.
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

Pushes to `main` auto-deploy on Vercel.

---

© 2026 Erez Cohen
