# HindoConsulting Website

Marketing website for HindoConsulting — industrial engineering & digital
transformation consulting (Industry 4.0, MES/ERP/WMS/CMMS, IIoT, AI,
Digital Twin, Power BI, Lean Six Sigma). Built with Next.js (App Router),
exported as a fully static site, bilingual in English and French.

## Stack

- Next.js 16 (App Router, static export via `output: "export"`)
- TypeScript + Tailwind CSS v4
- lucide-react icons
- No backend — the contact form opens the visitor's email client (`mailto:`) with a pre-filled message

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
real HindoConsulting logo file by replacing that component (or dropping
`logo.svg`/`logo.png` into `public/` and rendering it with `next/image`
there instead).

## Deploying to GitHub Pages

A workflow at `.github/workflows/deploy.yml` builds and deploys the site
automatically on every push to `main`.

**One-time setup:**

1. Create a GitHub repository and push this project to it.
2. In the repo, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).

The workflow auto-detects the correct base path for a project page
(`https://<user>.github.io/<repo>/`) or a user/organization page
(`https://<user>.github.io/`) — no manual configuration needed. If you
later attach a custom domain via **Settings → Pages → Custom domain**,
add a `public/CNAME` file with the domain name.

## Building manually

```bash
npm run build
```

Static output is written to `out/`. Serve it with any static host
(Netlify, Vercel, S3, Nginx, etc.) — no Node.js server required.
