<div align="center">

# SportFo

**A professional digital sports identity for athletes: showcase achievements and get discovered.**

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React_19-1a1a1a?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-1e3a5f?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0f172a?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-1c1c1c?style=for-the-badge&logo=supabase&logoColor=3ECF8E)](https://supabase.com)
[![Zod](https://img.shields.io/badge/React_Hook_Form_+_Zod-1a1a2e?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev)
[![Live Demo](https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://sportfo.vercel.app)

<img src="public/images/hero-athletes.svg" alt="SportFo hero artwork" width="640">

</div>

---

## ✨ Overview

SportFo helps athletes build a professional digital sports identity, showcase their achievements, and eventually get discovered by coaches, academies, sponsors, employers and sports professionals.

This repo contains the **MVP frontend**: the marketing landing page and the athlete registration flow, built on a Supabase-ready foundation. The original product spec is in [`docs/sportfo-product-spec.docx`](docs/sportfo-product-spec.docx).

## 🚀 Features

**Working today**

- **Landing page:** hero, stats band, sports carousel, example athlete profile preview, how-it-works and ecosystem sections.
- **Multi-step athlete registration:** profile photo, personal info, sports info, achievements with file upload and thumbnails, review and submit.
- **Drafts:** save progress to Supabase, or to `localStorage` when Supabase isn't configured (the UI says so).
- **Profile strength meter** that scores how complete a profile is.
- **Supabase schema and Storage:** SQL migrations with RLS, plus buckets for achievements and athlete photos.
- **Accessible motion:** scroll reveals, count-ups, parallax and carousel autoplay all respect `prefers-reduced-motion`. The carousel is keyboard-operable, announces slide changes via `aria-live`, and keeps off-screen slides out of the tab order.
- **No animation libraries:** motion, slider, parallax, marquee and mirror effects are plain CSS plus small components in `src/components/ui`.
- **Self-hosted fonts:** Inter (UI) and Archivo (display) as variable `.woff2` files via `next/font/local`, with no Google Fonts request.

**Not built yet** (shown as "Coming soon", never faked): mobile OTP login/signup, profile verification, athlete discovery, academy/CSR/employer dashboards, and editing a profile after a fresh session.

## 🧱 Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Zod
- **Backend:** Supabase (Postgres, Storage, Auth-ready) via `@supabase/supabase-js`
- **Artwork tooling:** Python (Pillow + NumPy) image generator
- **Hosting:** Vercel

## 🗂️ Project Structure

```
src/
  app/
    page.tsx                    Landing page
    register/athlete/page.tsx   Athlete registration flow
  components/
    layout/                     Header, Footer, Logo
    landing/                    Landing page sections
    registration/               Multi-step wizard + sections
    ui/                         Button, Card, form fields, Carousel, MirrorImage,
                                Parallax, Reveal, CountUp, Marquee, Toast, AvatarUpload
  fonts/                        Self-hosted variable fonts
  lib/
    supabase/                   Client, typed queries, DB types
    validation/                 Zod schemas
    images.ts                   Static imports for all brand imagery
    draft-storage.ts            localStorage fallback for drafts
    profile-strength.ts         Profile completeness scoring
  types/                        Shared TypeScript types
public/images/                  Generated brand artwork
tools/generate-images.py        Regenerates public/images
supabase/
  migrations/                   Schema, RLS, Storage buckets
  README.md                     Supabase setup instructions
docs/sportfo-product-spec.docx  Product/requirements spec
```

## ⚡ Getting Started

```bash
npm install
cp .env.example .env.local   # fill in Supabase credentials (see supabase/README.md)
npm run dev
```

Environment variables (from `.env.example`):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SUPABASE_ACHIEVEMENTS_BUCKET`
- `NEXT_PUBLIC_SUPABASE_PHOTOS_BUCKET`
- `NEXT_PUBLIC_SITE_URL`

Without Supabase credentials the app still runs, and registration falls back to local-only draft mode. See [`supabase/README.md`](supabase/README.md) for database setup.

Other scripts:

```bash
npm run build       # production build
npm run lint
npm run typecheck
```

### Imagery

Everything in [`public/images`](public/images) is generated original artwork (abstract editorial graphics, not photographs), produced by `tools/generate-images.py`:

```bash
python3 tools/generate-images.py
```

To switch to real photography, drop replacement images into `public/images` with the same filenames and aspect ratios. Every image is imported once in `src/lib/images.ts`.

| File | Ratio | Used by |
| --- | --- | --- |
| `hero-athletes.svg` | 4:3 | Hero |
| `sport-*.svg` (6) | 16:10 | Sports carousel |
| `athlete-portrait.svg` | ~4:5 | Example profile card |
| `og-sportfo.svg` | 1.91:1 | Social share preview |

### Deployment

Deployed on Vercel at https://sportfo.vercel.app. To connect a real Supabase project, set the variables from `.env.example` in the Vercel project's environment settings and redeploy.

## 🛣️ Roadmap

- Mobile OTP login and signup
- Profile verification
- Athlete discovery
- Dashboards for academies, CSR partners and employers
- Editing a profile after a fresh session

## 👤 Author

**Mohammed Shoaeb Malik** · AI & Full-Stack Developer, Bengaluru

[![GitHub](https://img.shields.io/badge/GitHub-ShoaebMalik19-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ShoaebMalik19)
