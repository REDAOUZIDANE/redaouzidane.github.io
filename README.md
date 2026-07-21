# LIMBO Consulting Website

Marketing website for LIMBO Consulting — industrial engineering & digital
transformation consulting (Industry 4.0, MES/ERP/WMS/CMMS, IIoT, AI,
Digital Twin, Power BI, Lean Six Sigma). Built with Next.js (App Router),
exported as a fully static site, bilingual in English and French, plus a
client portal backed by Supabase.

Live at: https://redaouzidane.github.io/limbo-consulting/

## Stack

- Next.js 16 (App Router, static export via `output: "export"`)
- TypeScript + Tailwind CSS v4
- lucide-react icons
- The public contact form opens the visitor's email client (`mailto:`) — no backend needed for it
- The client portal (`/portal`) uses [Supabase](https://supabase.com) for auth, database, storage, and realtime messaging — see below

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to `/en/` or `/fr/` based on browser language.

## Editing content

All page copy lives in two files, one per language:

- `src/lib/i18n/en.ts`
- `src/lib/i18n/fr.ts`

Both implement the same `Dictionary` type (`src/lib/i18n/types.ts`), so add
a field to the type first, then fill it in both files. The 6 service
categories and their 30 individual offerings live in `serviceCategories`
inside each dictionary — edit the `items` arrays there to add/remove
services.

Contact email, address text, and business hours are in `dict.contact` in
each language file.

## Brand

Colors and fonts are defined in `src/app/globals.css` (`--color-navy-*`,
`--color-green-*`) and `src/app/layout.tsx` (Inter + Manrope via
`next/font/google`). The header/footer logo is a placeholder SVG mark at
`src/components/LogoMark.tsx` built from the brand colors — swap in the
real LIMBO Consulting logo file by replacing that component (or dropping
`logo.svg`/`logo.png` into `public/` and rendering it with `next/image`
there instead).

## Client portal (`/portal`)

Clients sign in at `/[locale]/portal/login/` and land on a per-client
"room" (`/[locale]/portal/`) to exchange messages and delivered files with
LIMBO Consulting. It's built entirely client-side against Supabase, so it
still works from a static export with no server.

**One-time setup:**

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** and run `supabase/schema.sql` from this repo —
   it creates the `profiles`/`rooms`/`messages`/`files` tables, Row Level
   Security policies, the `deliverables` storage bucket, and a trigger
   that auto-provisions a profile + room for every new signed-up user.
3. In **Project Settings → API**, copy the **Project URL** and the
   **anon public** key.
4. For local dev: copy `.env.local.example` to `.env.local` and fill in
   those two values.
5. For production: add them as **repository secrets** (Settings →
   Secrets and variables → Actions) named exactly
   `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` — the
   deploy workflow already reads them from there.
6. Create your own account by signing in once through Supabase's
   dashboard (**Authentication → Users → Add user**), then in the SQL
   Editor run:
   ```sql
   update public.profiles set is_admin = true where email = 'you@example.com';
   ```
   Admins see a room-switcher and can view/message/upload files for every
   client. To onboard a client, invite them the same way (Authentication →
   Users → Invite) — the schema's trigger creates their profile and room
   automatically on first sign-in.

The anon key is meant to be public (same model as Firebase's client
config) — actual access control is enforced by the RLS policies in
`supabase/schema.sql`, not by keeping that key secret.

## Deploying to GitHub Pages

This repo is `redaouzidane.github.io` (a GitHub user-page repo, so Pages
is auto-enabled with no manual settings toggle). The workflow at
`.github/workflows/deploy.yml` builds on every push to `main` and
publishes the site under `/limbo-consulting/`, with a small redirect page
at the domain root sending visitors there. To reuse this setup for a
different repo/domain, adjust the hardcoded `NEXT_PUBLIC_BASE_PATH` in the
workflow (and the redirect HTML it generates) to match.

## Building manually

```bash
npm run build
```

Static output is written to `out/`. Serve it with any static host
(Netlify, Vercel, S3, Nginx, etc.) — no Node.js server required for the
marketing pages. The portal pages need `NEXT_PUBLIC_SUPABASE_URL` /
`NEXT_PUBLIC_SUPABASE_ANON_KEY` set at build time to function; without
them they render a graceful "not connected yet" message instead of
erroring.
