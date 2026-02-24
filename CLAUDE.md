# CLAUDE.md — Jarvis Operating Manual

This file is read automatically by Claude Code on every session.
It defines how to build, manage, and evolve websites using the Sanity CMS stack.

---

## 🧠 Philosophy

Every website in this system follows the same principle:
**Content lives in Sanity. Code lives in Next.js. Vercel renders it.**

The AI agent (you) is the hands. The human is the creative director.
Your job is to execute instructions precisely, propose improvements, and never break live sites.

We are building toward a system where:
- Clients have professionally managed websites on monthly retainer
- Content, images, pages, and structure can all be changed via agent instructions
- No client ever needs to touch code
- New websites can be spun up rapidly using established patterns

This is the beginning of Jarvis.

---

## 🏗️ Stack

| Layer | Tool | Purpose |
|---|---|---|
| Framework | Next.js (App Router) | Site rendering |
| CMS | Sanity v3 | All content + images |
| Hosting | Vercel | Deployment + CDN |
| Styling | Tailwind CSS v4 | UI |
| Animations | Framer Motion | Motion |
| Forms | React Hook Form + Zod | Contact/lead forms |
| Email | SendGrid | Form submissions |

---

## 📁 Project Structure

```
project/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Home page (fetches from Sanity)
│   ├── studio/[[...tool]]/     # Embedded Sanity Studio at /studio
│   └── [page-name]/page.tsx   # Each additional page
├── components/
│   ├── home/                   # Section components (Hero, About, etc.)
│   ├── layout/                 # Navigation, Footer
│   ├── ui/                     # Shared UI (Button, SectionHeader, etc.)
│   └── animations/             # ScrollReveal, motion wrappers
├── lib/
│   ├── constants.ts            # Fallback data (always keep in sync)
│   ├── types.ts                # TypeScript interfaces
│   ├── utils.ts                # Animation variants, helpers
│   └── sanity/
│       ├── client.ts           # Read client + write client
│       ├── image.ts            # urlFor() image helper
│       └── queries.ts          # All GROQ queries with fallbacks
├── sanity/
│   └── schemaTypes/            # One file per content type
│       ├── index.ts            # Registers all schemas
│       ├── siteSettings.ts     # Singleton: all site-wide content
│       ├── product.ts          # Product documents
│       ├── testimonial.ts      # Testimonial documents
│       ├── galleryItem.ts      # Gallery/portfolio images
│       └── productPage.ts      # Singleton: products page content
├── sanity.config.ts            # Sanity Studio configuration
├── next.config.ts              # Must include cdn.sanity.io in images
├── .env.local                  # Local secrets (never commit)
└── CLAUDE.md                   # This file
```

---

## 🔑 Environment Variables

Always required. Never commit to git.

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=   # From sanity.io/manage
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=                # Editor role token — used for writes
NEXT_PUBLIC_SITE_URL=            # Full production URL
```

In Vercel: set all three. Mark `SANITY_API_TOKEN` as Sensitive.
Locally: copy `.env.local.example` to `.env.local` and fill in values.

---

## 📡 Sanity Client Usage

### Reading content (public, cached)
```typescript
import { client } from '@/lib/sanity/client';

const data = await client.fetch(
  `*[_type == "product"] | order(order asc) { _id, title, description }`,
  {},
  { next: { revalidate: 60 } } // ISR: revalidate every 60 seconds
);
```

### Writing content (agent operations)
```typescript
import { writeClient } from '@/lib/sanity/client';

// Create a new document
await writeClient.create({
  _type: 'product',
  title: 'New Product',
  description: 'Product description',
  features: ['Feature 1', 'Feature 2'],
  order: 5,
});

// Update an existing document
await writeClient
  .patch('document-id-here')
  .set({ title: 'Updated Title' })
  .commit();

// Patch a specific field
await writeClient
  .patch('document-id-here')
  .setIfMissing({ features: [] })
  .append('features', ['New Feature'])
  .commit();

// Delete a document
await writeClient.delete('document-id-here');
```

### Uploading an image
```typescript
import { writeClient } from '@/lib/sanity/client';
import fs from 'fs';

// From file path
const imageAsset = await writeClient.assets.upload(
  'image',
  fs.createReadStream('./path/to/image.jpg'),
  { filename: 'hero-image.jpg' }
);

// Then reference it in a document
await writeClient
  .patch('document-id')
  .set({
    image: {
      _type: 'image',
      asset: { _type: 'reference', _ref: imageAsset._id },
    },
  })
  .commit();
```

---

## 🖼️ Image Handling

All images go through Sanity's CDN. Never reference local `/public/assets/` images for CMS-managed content.

```typescript
import { urlFor } from '@/lib/sanity/image';

// In a component
<Image
  src={urlFor(sanityImageObject).width(1200).height(630).url()}
  alt="description"
  fill
/>
```

### Image helper pattern (use in all components)
```typescript
function getImageSrc(image: SanityImage | string | undefined, fallback: string): string {
  if (!image) return fallback;
  if (typeof image === 'string') return image; // legacy static path
  if (image?.asset?._ref) return urlFor(image).width(1200).url(); // Sanity image
  return fallback;
}
```

Next.js config must include:
```typescript
// next.config.ts
images: {
  remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
}
```

---

## 📝 GROQ Query Patterns

GROQ is Sanity's query language. Always add fallbacks.

```groq
# Fetch all of a type, ordered
*[_type == "testimonial"] | order(order asc) { _id, stars, text, author, company }

# Fetch singleton document
*[_type == "siteSettings"][0] { phone, email, hero, navLinks }

# Fetch with filter
*[_type == "galleryItem" && (page == "home" || page == "both")] | order(order asc)

# Fetch with image URL expansion
*[_type == "product"] { _id, title, image { asset -> { url } } }

# Fetch specific document by ID
*[_id == "specific-document-id"][0]
```

---

## 🗂️ Schema Patterns

### Singleton (one document, like Site Settings)
```typescript
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // no create/delete
  fields: [ ... ]
});
```

### Collection (many documents, like Products)
```typescript
export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'order', type: 'number', description: 'Lower = first' }),
    // Always add an order field for sorting
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title' } },
});
```

### Rich text field (portable text)
```typescript
defineField({
  name: 'body',
  title: 'Content',
  type: 'array',
  of: [{ type: 'block' }], // basic rich text
  // or with images:
  of: [
    { type: 'block' },
    { type: 'image', options: { hotspot: true } },
  ],
})
```

---

## 📐 Component Pattern

Every section component follows this pattern:
1. Accept data as optional props
2. Fall back to constants if no Sanity data
3. Never hardcode content inside the component

```typescript
// ✅ Correct pattern
interface HeroProps {
  data?: SanityHeroData;
}

export default function Hero({ data }: HeroProps) {
  const hero = {
    title: data?.title ?? HERO.title,      // Sanity first, constant fallback
    description: data?.description ?? HERO.description,
  };
  return <section>...</section>;
}

// ✅ Page fetches and passes down
export default async function Page() {
  const data = await getHomePageData();
  return <Hero data={data.hero} />;
}
```

---

## ➕ How to Add a New Page

1. **Create schema** in `sanity/schemaTypes/newPage.ts` and register in `index.ts`
2. **Add to Studio structure** in `sanity.config.ts`
3. **Add query** in `lib/sanity/queries.ts`
4. **Create page file** at `app/new-page/page.tsx`
5. **Update navigation** in siteSettings schema + nav component
6. **Update sitemap** in `app/sitemap.ts`

---

## 🌐 Website Archetypes

Different site types need different schemas. Always start from this list and extend.

### 🏗️ Trade / Construction Business
Core schemas: `siteSettings`, `service`, `project` (gallery), `testimonial`, `teamMember`
Key sections: Hero with CTA, Services grid, Project gallery, Trust indicators, Contact form
Special needs: Service area map, accreditations/logos, quote request form

### 🎨 Creative Portfolio (e.g. Yuri)
Core schemas: `siteSettings`, `project`, `category`, `about`
Key sections: Full-screen hero, filterable project grid, case study pages, contact
Special needs: Large image display, video embeds, custom cursors, heavy animation
Approach: Design-forward, minimal text, let the work speak. Floating elements, parallax.

### 🏢 Professional Services (Law, Finance, Consulting)
Core schemas: `siteSettings`, `service`, `teamMember`, `caseStudy`, `faq`
Key sections: Authority hero, services list, team section, results/stats, CTA
Special needs: Trust signals, professional tone, clear CTAs, no distractions

### 🛍️ Local Business / Retail
Core schemas: `siteSettings`, `product`, `category`, `promotion`, `testimonial`
Key sections: Hero, product grid, promotions, testimonials, location/hours
Special needs: Opening hours, Google Maps embed, social feed

### 🌟 Personal Brand
Core schemas: `siteSettings`, `post` (blog), `project`, `appearance` (speaking/media)
Key sections: Statement hero, recent work, writing, social proof
Special needs: Newsletter signup, RSS feed, SEO-heavy

---

## 🚀 Deployment Checklist

Before every deployment:
- [ ] `npm run build` passes locally
- [ ] All env vars are set in Vercel
- [ ] `next.config.ts` includes `cdn.sanity.io` in image domains
- [ ] Sanity CORS settings include the production URL
  - Go to sanity.io/manage → API → CORS Origins → add production URL
- [ ] `/studio` route is working
- [ ] Fallbacks tested — site renders even if Sanity returns nothing
- [ ] Sitemap updated if new pages were added

---

## ⚡ Adding Sanity to a New Project

Quick setup for a new client site:

```bash
# 1. Install packages
npm install next-sanity @sanity/image-url sanity @sanity/vision

# 2. Create Sanity project
# Go to sanity.io/manage → New Project

# 3. Copy these files from thetrusspeople_v2:
# - sanity.config.ts
# - sanity/schemaTypes/ (modify schemas for the new site)
# - lib/sanity/ (client.ts, image.ts, queries.ts)
# - app/studio/[[...tool]]/page.tsx

# 4. Update sanity.config.ts with new project name/ID
# 5. Add env vars to Vercel
# 6. Add cdn.sanity.io to next.config.ts images
# 7. Add CORS origin in Sanity manage
```

---

## 🤖 Agent Instructions

When given a task, always:

1. **Read this file first** to understand the current stack
2. **Check existing schemas** before creating new ones — reuse where possible
3. **Never edit `main` branch directly** — work on feature branches
4. **Always add fallbacks** to constants when writing queries
5. **Test image paths** — Sanity images use `urlFor()`, static images use `/assets/`
6. **Preserve existing content** — patch, don't overwrite entire documents
7. **Confirm before deleting** — always ask before any destructive operation
8. **Branch naming**: `feature/description`, `fix/description`, `content/description`

### Common agent tasks:

**Add a new page:**
> "Add a Services page with hero, services grid, and CTA section"
→ Create schema → add query → create page file → update nav → deploy

**Update content:**
> "Update the hero title to X"
→ Use writeClient.patch() on siteSettings document

**Upload and set image:**
> "Set the about section image to this file"
→ writeClient.assets.upload() → patch the document with the asset reference

**Add a product/service:**
> "Add a new product called X with description Y"
→ writeClient.create() with _type: 'product'

**Restructure navigation:**
> "Add Products page to the nav, remove Testimonials"
→ patch siteSettings.navLinks array

---

## 🔮 Future Capabilities (Jarvis Roadmap)

- [ ] Designer agent: receives client assets, proposes layouts, creates content
- [ ] Image agent: processes raw photos, crops, color-graded, uploads to Sanity
- [ ] Video agent: cuts hero videos from client footage, exports web-optimised
- [ ] SEO agent: monitors rankings, updates meta content, adds schema markup
- [ ] Analytics agent: reads traffic data, suggests content improvements
- [ ] Client portal: lightweight dashboard where clients request changes
- [ ] Multi-site orchestration: one agent managing all client sites from single interface

---

*Last updated: February 2026*
*Stack: Next.js 16 + Sanity v3 + Vercel + Tailwind v4*
