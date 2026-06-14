# Dr. Atoshe Islam — Dental Practice Website

A professional, bilingual (English + Bangla) dental practice website for **Dr. Atoshe Islam, BDS (DU), PGT Oral & Maxillofacial Surgery**.

Built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + next-intl**.

---

## Quick Start

### Requirements
- Node.js ≥ 20
- npm ≥ 10

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app auto-redirects to `/en`. Switch to `/bn` for Bangla.

### Production build

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
  app/
    [locale]/           # All pages scoped by locale (en | bn)
      page.tsx          # Home page
      about/page.tsx    # About Dr. Atoshe Islam
      services/page.tsx # Services card grid
      appointment/      # Booking form + AppointmentForm.tsx (client component)
      blog/             # Blog listing
        [slug]/page.tsx # Individual post (MDX rendered)
      contact/          # Contact page + ContactForm.tsx
    api/
      appointment/route.ts  # Server-side booking handler (POST)
    globals.css         # Brand tokens + Tailwind config
  components/
    layout/
      Navbar.tsx        # Sticky navbar with language switcher
      Footer.tsx        # Footer with addresses and social links
    sections/
      HeroSection.tsx
      WhyUsSection.tsx
      ServicesPreview.tsx
      TestimonialsSection.tsx
    ui/
      LogoSvg.tsx       # Inline SVG logo (swap for real logo)
  i18n/
    routing.ts          # next-intl routing config (locales: en, bn)
    request.ts          # next-intl server request config
    navigation.ts       # Typed navigation helpers
  lib/
    constants.ts        # Doctor info, chamber addresses, BMDC reg
    blog.ts             # MDX file reader (gray-matter)
messages/
  en.json               # All English UI strings
  bn.json               # All Bangla UI strings
content/
  blog/
    en/                 # English MDX posts (.mdx)
    bn/                 # Bangla MDX posts (.mdx)
```

---

## How to Edit Translations

All UI text lives in two files:
- `messages/en.json` — English
- `messages/bn.json` — Bangla

Each key mirrors the other file exactly. To change any string, edit the value under the matching key in both files.

**Example:** Change the hero tagline
```json
// messages/en.json
"hero": {
  "tagline": "Expert Dental Care You Can Trust"
}

// messages/bn.json
"hero": {
  "tagline": "বিশ্বস্ত ও দক্ষ দন্ত চিকিৎসা"
}
```

Strings marked `TODO` need real content from the practice.

---

## How to Add a Blog Post

1. Create a new `.mdx` file in `content/blog/en/` (and optionally `content/blog/bn/`).
2. Add frontmatter at the top:

```mdx
---
title: "Your Post Title"
description: "A short description for SEO and the blog card."
date: "2025-07-01"
author: "Dr. Atoshe Islam"
tags: ["tag1", "tag2"]
---

Your post content in Markdown here...
```

3. The slug is the filename (without `.mdx`). A post at `content/blog/en/my-post.mdx` is live at `/en/blog/my-post`.
4. No code changes, no rebuild needed in dev mode. Run `npm run build` for production.

---

## How to Swap in Your Branding

### Logo
Replace `src/components/ui/LogoSvg.tsx` with your own SVG or use `next/image` pointing to your logo file in `public/`.

### Colors
All brand colors are CSS variables in `src/app/globals.css` under `/* Brand tokens */`. Change `--brand-*` values to your palette — everything updates automatically.

```css
:root {
  --brand-500: #14b8a6; /* primary — change this */
  --brand-600: #0d9488; /* primary-dark */
  ...
}
```

### Doctor Photo
On the About page, find the `DoctorPlaceholderSvg` component and replace it with:
```tsx
import Image from "next/image";
<Image src="/images/dr-atoshe.jpg" alt={t("photoAlt")} fill className="object-cover" />
```
Place the photo at `public/images/dr-atoshe.jpg`.

---

## TODOs Checklist

Search the codebase for `TODO` to find everything that needs real content:

- [ ] `src/lib/constants.ts` — Add phone number, email, real domain URL
- [ ] `src/lib/constants.ts` — Confirm floor number for Mirpur chamber (1st or 2nd floor)
- [ ] `src/lib/constants.ts` — Add Google Maps embed URLs for both chambers
- [ ] `messages/en.json` + `messages/bn.json` — Confirm consultation hours for each chamber
- [ ] `src/app/[locale]/layout.tsx` — Update `metadataBase` to real domain
- [ ] `src/app/api/appointment/route.ts` — Connect to email service (Resend, SendGrid) or database
- [ ] `src/app/[locale]/contact/ContactForm.tsx` — Wire to real email backend
- [ ] Replace placeholder SVGs with real doctor photo and clinic photos
- [ ] Replace LogoSvg with real clinic logo
- [ ] Add Google Maps embed iframes in the Contact page

---

## Deploying to Vercel

1. Push the project to a GitHub / GitLab repository.
2. Import the repo on [vercel.com](https://vercel.com).
3. Vercel auto-detects Next.js — no framework config needed.
4. Set environment variables if you later add email/DB secrets.
5. Deploy. The site is live with automatic HTTPS and CDN.

```bash
# Or deploy directly from CLI
npx vercel
```

---

## Key Technology Choices

| Decision | Why |
|---|---|
| **Next.js App Router** | Server components + streaming + nested layouts |
| **next-intl** | Best-in-class i18n for App Router; type-safe translations |
| **Tailwind CSS v4** | CSS-variable-first theming; easy to override brand colors |
| **MDX + gray-matter** | Zero-dependency blog; adding a post is just a file drop |
| **react-hook-form** | Performant client validation without heavy libraries |
| **Inline SVGs** | No icon library dependency; crisp at any size |

---

## License

Private — for Dr. Atoshe Islam Dental Practice only.
