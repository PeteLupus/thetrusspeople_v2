# CLAUDE.md — The Truss People V2

## MISSION
- **Client:** The Truss People (Victor & Tony Manoski)
- **Project:** Professional website — Melbourne roof truss & wall frame manufacturer
- **Status:** Live on Vercel
- **Phase:** Maintenance + Growth
- **Notion:** https://www.notion.so/e36726bb56804c8ca5d8f370572234c1
- **Vercel Project:** thetrusspeople-nextjs
- **Local Path:** ~/Projects/clients/truss-people/v2/
- **Repo:** PeteLupus/thetrusspeople_v2

## WHAT'S DONE
- [x] Full website built and deployed (Home, Our Work, Products, Quote)
- [x] All content hardcoded in `lib/constants.ts` — no CMS
- [x] Quote form — multi-step (4 steps), file uploads to GCS, SendGrid email notification
- [x] Framer Motion animations throughout
- [x] SEO basics (sitemap.ts, robots.ts, meta tags, JSON-LD LocalBusiness schema)
- [x] Mobile responsive
- [x] Victoria AI Agent — after-hours receptionist (Vapi + n8n, v4 production)

## WHAT'S NEXT
- [ ] SEO push — FAQ page, content for organic traffic
- [ ] Google Analytics — `NEXT_PUBLIC_GA_ID` env var (component already wired in)
- [ ] Google Search Console — submit sitemap
- [ ] Monthly project showcase content (photos → OUR_WORK_ITEMS in constants.ts)
- [ ] Victoria agent — live integration testing

## SUB-PROJECTS
- **Victoria AI Agent** — Notion: https://www.notion.so/337d422a3acb812098b0cd8aab010e22

---

# Jarvis Operating Manual

This file is read automatically by Claude Code on every session.
It defines how to build, manage, and evolve this website.

---

## Philosophy

**Content lives in `lib/constants.ts`. Code lives in Next.js. Vercel renders it.**

All content is hardcoded. No CMS is installed. Content changes go through `lib/constants.ts`
and the component files that import from it.

---

## Stack

| Layer | Tool | Purpose |
|---|---|---|
| Framework | Next.js 16 (App Router) | Site rendering |
| Hosting | Vercel | Deployment + CDN |
| Styling | Tailwind CSS v4 | UI |
| Animations | Framer Motion v12 | Motion |
| Forms | React Hook Form + Zod | Contact/lead forms |
| File Storage | Google Cloud Storage (GCS) | Quote file uploads (bucket: `ttp-quote-submissions`) |
| Google Auth | `google-auth-library` | Service account auth for GCS |
| Email | SendGrid (`@sendgrid/mail`) | Form notifications |
| Content | `lib/constants.ts` | All site content — hardcoded, no CMS |

**Note:** No Sanity CMS, no Nodemailer, no `googleapis` package. See FUTURE ROADMAP section below.

---

## Project Structure

```
project/
├── app/
│   ├── page.tsx                # Home page
│   ├── layout.tsx              # Root layout — metadata, fonts, GA4, JSON-LD
│   ├── sitemap.ts              # SEO sitemap
│   ├── robots.ts               # robots.txt generator
│   ├── not-found.tsx           # 404 page
│   ├── globals.css
│   ├── products/
│   │   ├── page.tsx            # Products listing
│   │   └── [slug]/page.tsx     # Dynamic product pages (7 slugs)
│   ├── our-work/
│   │   └── page.tsx            # Gallery/masonry grid
│   ├── quote/
│   │   └── page.tsx            # Multi-step quote form
│   └── api/
│       └── quote/
│           ├── route.ts        # Quote submit → SendGrid + GCS
│           ├── upload/route.ts # File upload to GCS
│           └── folder/route.ts # GCS folder creation
├── components/
│   ├── ui/                     # Button, SectionHeader, Accordion, Lightbox
│   ├── home/                   # Hero, About, Products, Stats, Gallery, Testimonials, Contact, ServiceAreas
│   ├── products/               # Product detail components
│   ├── quote/                  # QuoteForm, steps/, StepIndicator, SuccessState
│   ├── layout/                 # Navigation, Footer
│   ├── animations/             # ScrollReveal (Framer Motion wrapper)
│   └── analytics/              # GoogleAnalytics component (uses NEXT_PUBLIC_GA_ID)
├── lib/
│   ├── constants.ts            # ALL site content — 870+ lines, single source of truth
│   ├── types.ts                # TypeScript interfaces
│   ├── utils.ts                # Animation variants, helpers
│   ├── quote-email.ts          # SendGrid email templates
│   └── cloud-storage.ts        # GCS integration (google-auth-library)
└── public/assets/              # All static images
```

---

## Environment Variables

Always required. Never commit to git. Use `.env.local` for local dev.

```bash
NEXT_PUBLIC_SITE_URL=https://thetrusspeople.com.au

# SendGrid
SENDGRID_API_KEY=
CONTACT_EMAIL=                  # Receives quote notifications
SENDGRID_FROM_EMAIL=            # Sender address

# Google Cloud Storage (service account)
GOOGLE_DRIVE_CLIENT_EMAIL=      # Service account email (ignore naming — this is GCS, not Drive)
GOOGLE_DRIVE_PRIVATE_KEY=       # Service account private key
GOOGLE_CLOUD_STORAGE_BUCKET=ttp-quote-submissions

# Google Analytics
NEXT_PUBLIC_GA_ID=              # Format: G-XXXXXXXXXX (component already wired, just needs the ID)
```

Vercel: mark `GOOGLE_DRIVE_PRIVATE_KEY` and `SENDGRID_API_KEY` as Sensitive.

---

## Quote Form Architecture

```
User submits 4-step form
        ↓
Files upload to GCS (up to 10 files, 100MB total)
        ↓
/api/quote (POST) — builds summary, creates GCS folder
        ↓
SendGrid sends HTML email to CONTACT_EMAIL
        ↓
User sees success screen with reference number (QR-YYYYMMDD-XXXX)
```

**File types accepted:** `.pdf`, `.dwg`, `.dxf`, `.jpg`, `.jpeg`, `.png`, `.zip`, `.rar`

### Why this approach:
- Files stay in TTP's own Google Cloud Storage bucket
- SendGrid for reliable transactional email
- Reference numbers allow tracking without a database

---

## Content Architecture

All content lives in `lib/constants.ts`. Components import from it.
To change any site copy: edit `lib/constants.ts`.

Key exports:
- `TRUST_ITEMS` — hero trust badges
- `ABOUT` — about section title/description/image
- `ACCORDION_ITEMS` — "Why choose us" accordion
- `PRODUCTS_SECTION` — products section header
- `PRODUCTS` — product grid items (7 products)
- `PRODUCT_PAGES` — full product detail pages with SEO metadata
- `STATS` — stats bar
- `OUR_WORK_ITEMS` — gallery items (19 items)
- `TESTIMONIALS` — 6 client testimonials
- `SERVICE_AREAS` — service area list
- `HERO` — hero title/description/CTAs

---

## Image Handling

All images are static files in `public/assets/`. Reference with `/assets/filename.jpg`.

```typescript
// In components — all images via next/image
import Image from 'next/image';

<Image
  src="/assets/product-roof-trusses.jpg"
  alt="Descriptive alt text"
  fill
  className="object-cover"
/>
```

`next.config.ts` — no remote patterns needed (all images are local).

---

## Component Pattern

Every section component:
1. Accepts data as optional props
2. Falls back to `lib/constants.ts` if no props
3. Never has hardcoded content inside

```typescript
interface HeroProps {
  data?: HeroData;
}

export default function Hero({ data }: HeroProps) {
  const hero = {
    title: data?.title ?? HERO.title,
    description: data?.description ?? HERO.description,
  };
  return <section>...</section>;
}
```

---

## How to Add a New Page

1. Create page file at `app/new-page/page.tsx`
2. Add content constants to `lib/constants.ts`
3. Update navigation in `components/layout/Navigation.tsx`
4. Update `app/sitemap.ts`
5. Add `export const metadata` to the page for SEO

---

## Website Archetypes

### Trade / Construction Business (this project)
Core content: `siteSettings` equiv in constants, service, project, testimonial
Key sections: Hero with CTA, Services grid, Project gallery, Trust indicators, Quote form with file upload
Special needs: Service area coverage, certifications, quote form accepting large files (plans, drawings)
Form pattern: Google Cloud Storage (files) + SendGrid (notifications)

---

## Deployment Checklist

- [ ] `npm run build` passes locally
- [ ] All env vars set in Vercel
- [ ] `GOOGLE_DRIVE_PRIVATE_KEY` and `SENDGRID_API_KEY` marked Sensitive in Vercel
- [ ] Sitemap updated if new pages added
- [ ] OG image present at `/assets/og-image.jpg`
- [ ] Fallbacks tested — site renders with constants when env vars are missing

---

## Agent Instructions

When given a task, always:

1. **Read this file first**
2. **Content changes go in `lib/constants.ts`** — not in component files
3. **Never edit `main` branch directly** — work on feature branches
4. **Run `npm run build` after changes** — confirm zero errors before commit
5. **Preserve existing content** — surgical edits, don't overwrite whole sections
6. **Confirm before deleting** — ask before destructive operations
7. **Branch naming:** `feature/description`, `fix/description`, `content/description`

### Common tasks:

**Update site copy:** → Edit the relevant constant in `lib/constants.ts`

**Add a new product:** → Add to `PRODUCTS` array + `PRODUCT_PAGES` object in constants.ts

**Add a new page:** → Create `app/page-name/page.tsx`, add to sitemap.ts, update nav

**Update gallery:** → Edit `OUR_WORK_ITEMS` in constants.ts, add image to `public/assets/`

**Update SEO metadata:** → Edit `app/layout.tsx` (site-wide) or add `export const metadata` to page files

---

## FUTURE ROADMAP (evaluated and deferred)

> Sanity CMS integration was evaluated on 19 APR 2026 and deferred. Current content volume
> and client editing patterns do not justify the migration cost. Victor and Tony will not
> self-edit in a Studio — content changes go through the developer. AI-agent content edits
> work identically against `lib/constants.ts` as against Sanity.
> Migration is a 4–8 hour project. Re-evaluate if client requests self-service editing,
> or if content volume grows past ~50 documents. See OPS-ORDER-TTP-001 for full reasoning.

### Sanity CMS Integration (when re-evaluated)
```bash
npm install next-sanity @sanity/image-url sanity @sanity/vision
```
- Create Sanity project at sanity.io/manage
- Schema types: `siteSettings` (singleton), `product`, `testimonial`, `galleryItem`, `blogPost`, `faqItem`
- Embedded Studio at `app/studio/[[...tool]]/page.tsx`
- Replace constants with GROQ queries + fallbacks
- writeClient for agent-driven content updates

### Sanity env vars (when applicable):
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
```

### Agent-driven content ops (with Sanity):
```typescript
// Create document
await writeClient.create({ _type: 'product', title: '...', ... });

// Update document
await writeClient.patch('doc-id').set({ title: 'Updated' }).commit();

// Upload image
const asset = await writeClient.assets.upload('image', fs.createReadStream('./image.jpg'));
await writeClient.patch('doc-id').set({ image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } }).commit();
```

### GROQ query patterns (with Sanity):
```groq
*[_type == "product"] | order(order asc) { _id, title, description }
*[_type == "siteSettings"][0] { phone, email, hero }
*[_type == "testimonial"] | order(order asc)
```

### Future Capabilities (Jarvis Roadmap):
- [ ] Designer agent: receives client assets, proposes layouts, creates content
- [ ] Image agent: processes raw photos, crops, colour grades, uploads
- [ ] SEO agent: monitors rankings, updates meta content, adds schema markup
- [ ] Analytics agent: reads traffic data, suggests content improvements
- [ ] Advanced form storage: write submissions to CMS as documents (full lead database)
- [ ] Cloudflare R2 upgrade: replace GCS with R2 for high-volume file storage

---

*Last updated: 20 APR 2026*
*Stack: Next.js 16 + Tailwind v4 + Framer Motion v12 + SendGrid + GCS + Vercel*
*Form pattern: Google Cloud Storage (files) + SendGrid (notifications)*
*Content: hardcoded in lib/constants.ts — no CMS*
