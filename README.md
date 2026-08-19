# SportFo

SportFo helps athletes build a professional digital sports identity, showcase
their achievements, and eventually get discovered by coaches, academies,
sponsors, employers, and sports professionals.

This repo currently contains the **MVP frontend**: the marketing landing page
and the athlete registration flow, built on a Supabase-ready foundation.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS
- React Hook Form + Zod validation
- Supabase (Postgres, Auth-ready, Storage) via `@supabase/supabase-js`

No animation or carousel libraries: the motion, slider, parallax, marquee and
mirror effects are plain CSS plus small components in `src/components/ui`.

## Imagery and fonts

**Images.** Everything in `public/images` is generated original artwork,
produced by `tools/generate-images.py` (Pillow + NumPy). They're deliberately
abstract editorial graphics rather than photographs, because this project has
no licensed photo library — inventing "real" sports photos wasn't an option.

To move to real photography, drop replacement JPGs into `public/images` using
the same filenames and aspect ratios. Nothing else changes: every image is
imported once in `src/lib/images.ts`.

| File | Ratio | Used by |
| --- | --- | --- |
| `hero-athletes.jpg` | 4:3 | Hero |
| `sport-*.jpg` (6) | 16:10 | Sports carousel |
| `athlete-portrait.jpg` | ~4:5 | Example profile card |
| `og-sportfo.jpg` | 1.91:1 | Social share preview |

Regenerate with `python3 tools/generate-images.py`.

**Fonts.** Inter (UI) and Archivo (display) are self-hosted as variable
`.woff2` files in `src/fonts`, loaded via `next/font/local`. There is no
request to Google Fonts at build time or runtime, and no font package in
`package.json`.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Supabase credentials — see supabase/README.md
npm run dev
```

Without Supabase credentials configured, the app still runs — the
registration flow falls back to a local-only draft mode and tells you so in
the UI. See `supabase/README.md` for the full setup.

## Project structure

```
src/
  app/
    page.tsx                  Landing page
    register/athlete/page.tsx Athlete registration flow
  components/
    layout/                   Header, Footer, Logo
    landing/                  Landing page sections
    registration/             Multi-step registration wizard + sections
    ui/                       Shared primitives — Button, Card, form fields,
                              Carousel, MirrorImage, Parallax, Reveal,
                              CountUp, Marquee, Toast, AvatarUpload
  fonts/                      Self-hosted variable font files
  lib/
    constants/                Sport lists, skill levels, etc.
    supabase/                 Supabase client, typed queries, DB types
    validation/               Zod schemas
    images.ts                 Static imports for all brand imagery
    draft-storage.ts          localStorage fallback for drafts
    profile-strength.ts       Profile completeness scoring
    use-object-url.ts         blob: previews for picked files
    use-prefers-reduced-motion.ts
  types/                      Shared TypeScript types
public/images/                Generated brand artwork (see above)
tools/generate-images.py      Regenerates public/images
supabase/
  migrations/0001_init.sql    Database schema + RLS + Storage bucket
  migrations/0002_athlete_photo.sql  Profile photo column + photos bucket
  README.md                   Supabase setup instructions
```

## Accessibility and motion

Every animated element respects `prefers-reduced-motion`: scroll reveals,
count-ups, parallax and carousel autoplay all switch off, and content lands in
its final state rather than disappearing. The carousel is keyboard-operable
with arrow keys, announces slide changes via an `aria-live` region, and keeps
off-screen slides out of the tab order.

## What's built vs. what's next

**Working today:** landing page (hero, stats, sports carousel, profile
preview), athlete registration (profile photo, personal info, sports info,
achievements with file upload and thumbnails, save draft, review, submit),
Supabase schema + Storage integration.

**Explicitly not built yet** (and not faked anywhere in the UI): mobile OTP
login/signup, profile verification, athlete discovery, academy/CSR/employer
dashboards, editing a profile after a fresh session. These are called out as
"Coming soon" wherever they're referenced on the landing page.
