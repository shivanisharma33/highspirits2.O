# High Spirits — website

A multi-page Next.js rebuild of [highspirits.au](https://www.highspirits.au): authentic Indian fine dining on Victoria Street, Bunbury WA. The site keeps the High Spirits green and gold identity (luxury green `hsl(160 70% 12%)`, deep green `hsl(160 80% 8%)`, royal gold `hsl(42 78% 51%)`, Playfair Display + Inter) and presents it as an editorial, motion-led experience.

## Stack

- **Next.js 16** (App Router, Turbopack, React 19, Server Components by default)
- **TypeScript** (strict) and **Tailwind CSS v4**, with the design tokens in `app/globals.css`
- **Lenis** for smooth scrolling, driven by the **GSAP** ticker so **ScrollTrigger** stays in sync
- **Motion** (Framer Motion) only for the menu filtering and the gallery lightbox; the lightbox is lazy-loaded
- `next/image` with static imports, which give AVIF/WebP output, responsive `sizes` and blur placeholders

## Scripts

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the build
npm run lint
```

## Environment

Copy `.env.example` to `.env.local`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Origin for canonical URLs, Open Graph and the sitemap. |
| `ENQUIRY_ENDPOINT` | Where the contact, reservation and event forms are POSTed (server-side). The current site uses its Strapi `contact-forms` collection. When it is unset, development logs each submission, and production shows a phone/email fallback message. |

## Structure

```
app/                  routes: / about menu experiences gallery events blogs blogs/[slug]
                      contact reservation privacy terms, plus sitemap, robots, manifest, 404
components/
  motion/             RevealRoot (one IntersectionObserver), Reveal primitives (FadeUp, FadeIn,
                      ScaleReveal, ClipReveal, ImageReveal, TextReveal, IntroLines), SmoothScroll,
                      Parallax, ScrollScale, HorizontalScroll, Cursor
  navigation/ footer/ hero/ sections/ cards/ menu/ gallery/ experiences/ chef/ reviews/
  journal/ timeline/ forms/ ui/
lib/
  site.ts             business facts: address, phone, hours, links
  content/*.ts        menu, dishes, experiences, story, reviews, gallery, journal, events
  images.ts           every photograph, with alt text
  actions.ts          form server actions
  seo.ts              metadata helper and JSON-LD
assets/images/        optimised photography from the existing site and its CMS
```

## Motion principles

- Reveals are **declarative data attributes** on server-rendered markup. A single observer switches them on, so no per-element client code ships.
- Above-the-fold intros use **CSS keyframes** and never wait on JavaScript.
- Only `transform`, `opacity` and `clip-path` are animated.
- The horizontal experiences pin, pointer parallax and cursor run only on desktop with a fine pointer. Touch devices get native swipe rows.
- `prefers-reduced-motion` turns off Lenis, scrubbed effects and reveals. Everything is visible and static.

## Content

All copy, prices, dishes, reviews and photography come from the existing site and its CMS. Claims that could not be verified were left out on purpose. Update content in `lib/content/*` and `lib/site.ts`.
