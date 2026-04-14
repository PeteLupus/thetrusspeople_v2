# CLAUDE.md — The Truss People V2

## MISSION
- **Client:** The Truss People (Victor & Tony Manoski)
- **Project:** Professional website — Melbourne roof truss & wall frame manufacturer
- **Status:** Live on Vercel
- **Phase:** Maintenance + Growth
- **Notion:** https://www.notion.so/e36726bb56804c8ca5d8f370572234c1
- **Vercel Project:** thetrusspeople-v2 (prj_A6xaPDJrlvE6dz7HKAXQegQwqKjB)
- **Local Path:** ~/Projects/clients/truss-people/v2/

## WHAT'S DONE
- [x] Full website built and deployed (Home, Our Work, About, Contact, Services)
- [x] Sanity CMS v3 — all content managed via Studio at /studio
- [x] Contact form with Google Drive file uploads + Nodemailer email
- [x] Framer Motion animations throughout
- [x] SEO basics (sitemap.ts, robots.ts, meta tags)
- [x] Mobile responsive
- [x] Victoria AI Agent — after-hours receptionist (Vapi + n8n, v4 production)

## WHAT'S NEXT
- [ ] SEO push — blog/FAQ content for organic traffic
- [ ] Google Analytics setup
- [ ] Google Search Console — submit sitemap
- [ ] Monthly project showcase content (with images)
- [ ] Victoria agent — live integration testing
- [ ] Potential 3D upgrade (archived React Three Fiber experiment in ~/Projects/_archive/truss-people-v2123-3d/)

## SUB-PROJECTS
- **Victoria AI Agent** — Notion: https://www.notion.so/337d422a3acb812098b0cd8aab010e22
- **Victoria v4 Prompt (production)** — in Notion under Victoria AI Agent

---

# Jarvis Operating Manual

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
| File Storage | Google Drive API | Large file uploads (plans, docs) |
| Email | Nodemailer via Gmail | Form notifications — no third party |

---

## 📁 Project Structure

```
project/
├── app/
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
│       ├── index.ts
│       ├── siteSettings.ts     # Singleton: all site-wide content
│       ├── product.ts
│       ├── testimonial.ts
│       ├── galleryItem.ts
│       └── productPage.ts
├── sanity.config.ts
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

# Google — one dedicated Google account per agency (not the client's)
GOOGLE_CLIENT_EMAIL=             # Service account email
GOOGLE_PRIVATE_KEY=              # Service account private key
GOOGLE_DRIVE_FOLDER_ID=          # The Drive folder ID for this client's files

# Nodemailer — uses the same Google account to send email
GMAIL_USER=                      # The Gmail address (e.g. submissions@youragency.com)
GMAIL_APP_PASSWORD=              # Gmail App Password (not the account password)
NOTIFY_EMAIL=                    # Client's email to receive notifications
```

In Vercel: mark `SANITY_API_TOKEN` and `GOOGLE_PRIVATE_KEY` as Sensitive.
Locally: copy `.env.local.example` to `.env.local` and fill in values.

---

## 📬 Contact Form Architecture

**No third-party email services. No data leaving to external platforms.**

Every contact form in this system follows the same pattern:

```
User submits form
       ↓
Next.js API route (/api/contact)
       ↓
  ┌────┴────┐
  │         │
Files    Form data
  ↓         ↓
Google   Nodemailer
Drive    (Gmail SMTP)
  ↓         ↓
Client   Client inbox
folder   gets email with
         Drive link
```

### Why this approach:
- **No third-party SaaS** — client data never touches SendGrid, Mailgun, etc.
- **Free** — Google Drive free tier is 15GB, Gmail SMTP is free
- **Large files work** — architectural plans, engineering drawings, PDFs, DWGs — no size limits that matter
- **Client already uses Drive/Gmail** — zero new tools to learn
- **Selling point** — "Your leads and files are stored in your own Google account, not a third-party server"

---

## 📂 Google Drive File Upload Pattern

One dedicated Google account is used across all client sites (e.g. `submissions@youragency.com`).
Each client gets their own folder inside that Drive. Files from their forms land in their folder.

### Setup (once per client):
1. Create a folder in Google Drive for the client (e.g. `TrussPeople-Submissions`)
2. Note the folder ID from the URL: `drive.google.com/drive/folders/FOLDER_ID_HERE`
3. Share the folder with the client's Google account so they can access it
4. Set `GOOGLE_DRIVE_FOLDER_ID` env var to that folder ID

### API Route pattern (`app/api/contact/route.ts`):
```typescript
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;
  const file = formData.get('file') as File | null;

  let driveLink = null;

  // 1. Upload file to Google Drive if attached
  if (file) {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const drive = google.drive({ version: 'v3', auth });
    const buffer = Buffer.from(await file.arrayBuffer());
    const { Readable } = await import('stream');

    const uploaded = await drive.files.create({
      requestBody: {
        name: `${name} - ${file.name}`,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
      },
      media: {
        mimeType: file.type,
        body: Readable.from(buffer),
      },
      fields: 'id, webViewLink',
    });

    driveLink = uploaded.data.webViewLink;
  }

  // 2. Send email notification via Nodemailer (Gmail SMTP)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.NOTIFY_EMAIL,
    subject: `New Quote Request from ${name}`,
    html: `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
      ${driveLink ? `<p><strong>Attached Plans:</strong> <a href="${driveLink}">View in Google Drive</a></p>` : ''}
    `,
  });

  return Response.json({ success: true });
}
```

### Required packages:
```bash
npm install googleapis nodemailer
npm install --save-dev @types/nodemailer
```

### Gmail App Password setup:
1. Google Account → Security → 2-Step Verification (must be on)
2. Security → App Passwords → create one for "Mail"
3. Use that 16-character password as `GMAIL_APP_PASSWORD`
4. Never use the actual account password

---

## 📡 Sanity Client Usage

### Reading content (public, cached)
```typescript
import { client } from '@/lib/sanity/client';

const data = await client.fetch(
  `*[_type == "product"] | order(order asc) { _id, title, description }`,
  {},
  { next: { revalidate: 60 } }
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

// Patch array field
await writeClient
  .patch('document-id-here')
  .setIfMissing({ features: [] })
  .append('features', ['New Feature'])
  .commit();

// Delete a document
await writeClient.delete('document-id-here');
```

### Uploading an image to Sanity
```typescript
import { writeClient } from '@/lib/sanity/client';
import fs from 'fs';

const imageAsset = await writeClient.assets.upload(
  'image',
  fs.createReadStream('./path/to/image.jpg'),
  { filename: 'hero-image.jpg' }
);

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

All CMS images go through Sanity's CDN. Never reference local `/public/assets/` for CMS-managed content.

```typescript
import { urlFor } from '@/lib/sanity/image';

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
  if (typeof image === 'string') return image;
  if (image?.asset?._ref) return urlFor(image).width(1200).url();
  return fallback;
}
```

`next.config.ts` must include:
```typescript
images: {
  remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
}
```

---

## 📝 GROQ Query Patterns

```groq
# Fetch all of a type, ordered
*[_type == "testimonial"] | order(order asc) { _id, stars, text, author, company }

# Fetch singleton
*[_type == "siteSettings"][0] { phone, email, hero, navLinks }

# Fetch with filter
*[_type == "galleryItem" && (page == "home" || page == "both")] | order(order asc)

# Fetch with image URL
*[_type == "product"] { _id, title, image { asset -> { url } } }
```

---

## 🗂️ Schema Patterns

### Singleton
```typescript
export default defineType({
  name: 'siteSettings',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // no create/delete
  fields: [ ... ]
});
```

### Collection
```typescript
export default defineType({
  name: 'product',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: R => R.required() }),
    defineField({ name: 'order', type: 'number', description: 'Lower = first' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title' } },
});
```

---

## 📐 Component Pattern

Every section component:
1. Accepts data as optional props
2. Falls back to constants if no Sanity data
3. Never has hardcoded content inside

```typescript
interface HeroProps {
  data?: SanityHeroData;
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

## ➕ How to Add a New Page

1. Create schema in `sanity/schemaTypes/newPage.ts`, register in `index.ts`
2. Add to Studio structure in `sanity.config.ts`
3. Add query in `lib/sanity/queries.ts`
4. Create page file at `app/new-page/page.tsx`
5. Update navigation in siteSettings + nav component
6. Update sitemap in `app/sitemap.ts`

---

## 🌐 Website Archetypes

### 🏗️ Trade / Construction Business
Core schemas: `siteSettings`, `service`, `project`, `testimonial`, `teamMember`
Key sections: Hero with CTA, Services grid, Project gallery, Trust indicators, Contact form with file upload
Special needs: Service area map, accreditations, quote request form accepting large files (plans, drawings)
Form pattern: Google Drive upload + Nodemailer notification

### 🎨 Creative Portfolio (e.g. Yuri)
Core schemas: `siteSettings`, `project`, `category`, `about`
Key sections: Full-screen hero, filterable project grid, case study pages, contact
Special needs: Large image display, video embeds, custom cursors, heavy animation
Approach: Design-forward, minimal text, let the work speak. Floating elements, parallax.

### 🏢 Professional Services (Law, Finance, Consulting)
Core schemas: `siteSettings`, `service`, `teamMember`, `caseStudy`, `faq`
Key sections: Authority hero, services list, team, results/stats, CTA
Special needs: Trust signals, professional tone, clear CTAs

### 🛍️ Local Business / Retail
Core schemas: `siteSettings`, `product`, `category`, `promotion`, `testimonial`
Key sections: Hero, product grid, promotions, testimonials, location/hours
Special needs: Opening hours, Google Maps embed, social feed

### 🌟 Personal Brand
Core schemas: `siteSettings`, `post`, `project`, `appearance`
Key sections: Statement hero, recent work, writing, social proof
Special needs: Newsletter signup, RSS, SEO-heavy

---

## 🚀 Deployment Checklist

- [ ] `npm run build` passes locally
- [ ] All env vars set in Vercel (`SANITY_API_TOKEN` and `GOOGLE_PRIVATE_KEY` marked Sensitive)
- [ ] `next.config.ts` includes `cdn.sanity.io`
- [ ] Sanity CORS settings include the production URL
- [ ] `/studio` route working
- [ ] Fallbacks tested — site renders with no Sanity data
- [ ] Google Drive folder created and shared with client
- [ ] Gmail App Password created and tested
- [ ] Sitemap updated if new pages added

---

## ⚡ Adding Sanity to a New Project

```bash
# 1. Install packages
npm install next-sanity @sanity/image-url sanity @sanity/vision googleapis nodemailer
npm install --save-dev @types/nodemailer

# 2. Create Sanity project at sanity.io/manage

# 3. Copy from thetrusspeople_v2:
#    - sanity.config.ts
#    - sanity/schemaTypes/ (modify for new site)
#    - lib/sanity/
#    - app/studio/[[...tool]]/page.tsx
#    - app/api/contact/route.ts

# 4. Update sanity.config.ts with new project name/ID
# 5. Add all env vars to Vercel
# 6. Create Google Drive folder for client, share with them
# 7. Set up Gmail App Password
# 8. Add CORS origin in Sanity manage
```

---

## 🤖 Agent Instructions

When given a task, always:

1. **Read this file first**
2. **Check existing schemas** before creating new ones
3. **Never edit `main` branch directly** — work on feature branches
4. **Always add fallbacks** to constants in queries
5. **Test image paths** — Sanity images use `urlFor()`, static use `/assets/`
6. **Preserve existing content** — patch, don't overwrite
7. **Confirm before deleting** — always ask before destructive operations
8. **Branch naming**: `feature/description`, `fix/description`, `content/description`

### Common tasks:

**Add a new page:**
→ Create schema → add query → create page file → update nav → deploy

**Update content:**
→ `writeClient.patch()` on the relevant document

**Upload and set image:**
→ `writeClient.assets.upload()` → patch document with asset reference

**Add a product/service:**
→ `writeClient.create()` with correct `_type`

**Restructure navigation:**
→ patch `siteSettings.navLinks` array

---

## 🔮 Future Capabilities (Jarvis Roadmap)

- [ ] Designer agent: receives client assets, proposes layouts, creates content
- [ ] Image agent: processes raw photos, crops, colour grades, uploads to Sanity
- [ ] Video agent: cuts hero videos from client footage, exports web-optimised
- [ ] SEO agent: monitors rankings, updates meta content, adds schema markup
- [ ] Analytics agent: reads traffic data, suggests content improvements
- [ ] Client portal: lightweight dashboard where clients can request changes
- [ ] Multi-site orchestration: one agent managing all client sites from single interface
- [ ] Advanced form storage: write submissions to Sanity as documents (full lead database)
- [ ] Cloudflare R2 upgrade: replace Google Drive with R2 for high-volume file storage

---

*Last updated: February 2026*
*Stack: Next.js 16 + Sanity v3 + Vercel + Tailwind v4*
*Form pattern: Google Drive (files) + Nodemailer/Gmail (notifications) — no third-party email services*
