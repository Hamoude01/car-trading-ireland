# HamoudeCarTrade (car-trading-ireland)

## Overview
Next.js 16 + Supabase car dealership site for Ireland. Deploys to Netlify → hamoudecartrade.ie.
- Frontend: Next.js App Router, React 19, Tailwind v4
- Data: Supabase (cars, submissions, contact_messages tables) + Supabase Storage bucket `car-images`
- Admin: password-gated (session storage) dashboard for cars/submissions/messages

## Work Log
### 2026-06 — Photo gallery bug fix
- Root cause: car detail page rendered only `car.images[0]`. Data layer stored full array correctly.
- Fix: `src/app/cars/[id]/page.tsx` now shows full gallery (main image + thumbnails + prev/next arrows + counter).

### 2026-06 — Premium dark redesign
- Replicated the "Fixed-Car-Trading" (car-trade-fix) premium dark aesthetic into this repo.
- Theme: near-black background (#0a0a0b), champagne-gold accent (#c9a15a), Fraunces (display serif) + Manrope (body).
- `globals.css`: dark tokens + legacy light-utility remaps (bg-white→surface, gray text→light, red boxes, etc.) so all pages theme consistently.
- Rewrote: layout, Header (sticky transparent→blur, nav Home/Inventory/Sell Your Car/About/Contact), Footer, home page (hero "The car you want. Delivered right.", brand marquee, The Collection, Attention to detail, Sell with us), CarCard (adds photo-count badge).
- Patched dark heroes/headers on: about, contact, sell-your-car, cars list, admin login, admin dashboard, CarForm.
- All functionality preserved: Supabase reads/writes, admin login, image upload, gallery. TypeScript compiles clean.

## Deployment
- Repo pushes to GitHub (Hamoude01/car-trading-ireland) via "Save to Github", Netlify auto-builds.
- Supabase creds live in netlify.toml (NEXT_PUBLIC_SUPABASE_URL / ANON_KEY). Local dev uses /app/.env.local (gitignored).

### 2026-06 — Apple/Huawei-style cinematic scroll
- Added motion to landing: `HeroParallax` (hero image zoom/drift + text fade on scroll), `CinematicShowcase` (pinned full-screen section, headlight image scales up as you scroll through it, statement text fades in/out — Apple product-page style), and `Reveal` (IntersectionObserver scroll-in on every section). Lightweight, no extra deps. TS clean, verified via scroll screenshots.

### 2026-06 — Gallery lightbox + pro polish
- `Lightbox` (fullscreen, keyboard + swipe nav, zoom/pan, thumbnail strip, counter) opened from car detail main image / expand button.
- Working Share button (Web Share API + clipboard fallback), "Similar cars" section on detail page.
- `FloatingActions` (site-wide WhatsApp float + scroll-triggered back-to-top).
- Skeleton loaders (`CarCardSkeleton`) replace spinners on home featured + inventory. TS clean, verified.

## Backlog
- P1: Fullscreen lightbox + swipe on car gallery (mobile zoom).
- P2: SEO/OpenGraph images per listing; sitemap.
- P2: Admin image reordering (choose primary/cover photo).
