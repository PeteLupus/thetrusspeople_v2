# WORKLOG.md — Shared Mission Log

> Drop this file in every project root. All operators read it on cold start. Update it before switching terminals.

**COLD START READ ORDER:** `~/.claude/CLAUDE.md` → `~/.claude/memories/BUGFIX.md` (global patterns) → this file → `CODEX_LOG.md` (Codex execution log)

---

## PROJECT
**Name:** The Truss People V2  
**Path:** ~/Projects/clients/truss-people/v2/  
**Client:** The Truss People (Victor & Tony Manoski)  
**Phase:** [ ] Planning  [ ] Building  [ ] Testing  [x] Delivering  

---

## CURRENT OBJECTIVE
> One sentence. What are we trying to complete RIGHT NOW?

```
SEO push — blog/FAQ content for organic traffic + GA4 + GSC setup.
```

---

## CC LAST DECISION
> What did Claude Code decide? Architecture, structure, approach. Paste the key output.

```
Site is LIVE. Next.js + Sanity CMS v3 + Vercel. All pages live (Home, Our Work, About, Contact, Services).
Sanity Studio at /studio — all content CMS-managed.
Contact form: Google Drive file uploads + Nodemailer/Gmail. No third-party email service.
Victoria AI Agent (Vapi + n8n) — after-hours receptionist — v4 in production.
Framer Motion animations throughout.
Remaining work is content/growth ops, not build phase.
```

**CC Session ended:** 2026-04-11  
**CC stopped at:** Site complete. Remaining tasks are SEO content + post-deploy ops.

---

## CODEX CURRENT TASK
> What is Codex working on right now? Narrow scope only.

```
N/A — no active implementation task.
If blog/FAQ schema needs building in Sanity → CC will architect first, then hand to Codex.
```

**Status:** [x] Not started  [ ] In progress  [ ] Done  [ ] Blocked  
**Blocked by:** Content strategy decision — what blog/FAQ topics to build first.

---

## GEMINI DESIGN DIRECTION
> What design brief was given? What direction was chosen?

```
No active design brief. Site design is complete and live.
If blog/FAQ section needs new page design → brief Gemini with: 
"Trade/construction business. Professional, clean corporate. Match existing Truss People aesthetic."
```

**Design assets location:** Sanity CMS — all design managed via existing component system.

---

## GROQ OPS LOG
> Status checks, summaries, quick triage. Running log format.

```
2026-04-11 — Initial WORKLOG seeded. Site LIVE on Vercel. 
             Victoria AI Agent v4 in production. No GA4 or GSC yet.
             Blog/FAQ content: not started.
2026-04-20 — OPS-ORDER-TTP-001 initiated. Branch: feature/content-seo-launch-prep.
             Phase 0: CLAUDE.md/GEMINI.md/CODEX.md rectified. Sanity CMS deferred, reasoning documented.
             GCS (not Drive) confirmed as file storage. Stack in all docs now matches package.json.
             Phase 0 commit: docs: rectify CLAUDE.md/GEMINI.md/CODEX.md to match actual stack; defer Sanity integration
2026-04-20 — Phases 1-3+5 complete. Branch pushed. Vercel preview building.
             Preview URL: https://thetrusspeople-v2-git-feature-c-7214cc-petars-projects-a03b8a08.vercel.app
             4 commits on feature/content-seo-launch-prep. Awaiting boss approval to merge to main.
             Phase 6 (domain/Google) blocked on operator intel from Annex E.
2026-04-20 — Replaced about section image (two-brothers.jpg) with updated magazine article scan.
             Committed [content] replace brothers in trusses about section image → pushed to main → Vercel auto-deploy triggered.
2026-04-21 — Mission 1 (TTP GSC + domain staging) complete.
             Domains staged on Vercel: thetrusspeople.com.au, www.thetrusspeople.com.au, preview.thetrusspeople.com.au
             preview.thetrusspeople.com.au CNAME live (cname.vercel-dns.com) — client can review site at preview subdomain.
             GSC intel: sc-domain:thetrusspeople.com.au already verified. Sitemaps previously submitted (http+https, 7 URLs, last 2025-10-30).
             seo-ops CLI registered: clients/trusspeople.json. Sitemap submit deferred to flip day (canonical domain not live yet).
             DNS at webstophosting.com.au (operator has cPanel access). Flip day: 1x A record edit only (www is CNAME → apex).
             MX (Outlook 365), SPF, TXT (MS verify) must be preserved on flip.
2026-04-22 — OPERATION RIDGELINE: pre-launch readiness audit complete.
             Fixed: map embed in Contact section, OG image (proper 1200×630 crop), .env.example created,
             .gitignore patched to track .env.example. Pushed to main. Vercel deploy triggered.
             Blocked items: GA4 ID (need from client), blog scaffolding (Sanity deferred).
```

---

## OPEN DECISIONS
> Things that need a human call before moving forward.

- [ ] FLIP DAY — edit apex A record in cPanel: thetrusspeople.com.au → 76.76.21.21 (www is CNAME → apex, no change needed)
- [ ] FLIP DAY — verify site loads at thetrusspeople.com.au post-flip
- [ ] FLIP DAY — confirm MX/email still live post-flip
- [ ] FLIP DAY — seo-ops confirm sitemap: node src/index.js sitemap list -c trusspeople
- [ ] FLIP DAY — seo-ops submit sitemap if needed: node src/index.js sitemap submit -c trusspeople
- [ ] GA4 — create property, get Measurement ID, add to site (NEXT_PUBLIC_GA_ID env var)
- [ ] Blog/FAQ strategy — what topics? Who writes? AI-assisted or manual?
- [ ] Monthly project showcase — process for getting photos from client + uploading to constants.ts
- [ ] Victoria agent — live integration testing scheduled?

---

## NEXT HUMAN DECISION NEEDED
> Single most important thing YOU need to decide right now.

```
Blog/FAQ strategy: decide on 5–10 target topics so Codex can build the Sanity schema
and we can start producing content for organic search.
```

---

## COMPLETED THIS SESSION
> Running list of done items. Keep it tight.

- [x] Full site built and deployed (Home, Our Work, About, Contact, Services)
- [x] Sanity CMS v3 — all content CMS-managed
- [x] Contact form — Google Drive uploads + Nodemailer
- [x] Framer Motion animations
- [x] Victoria AI Agent v4 — production
- [x] 4-operator protocol bootstrapped — WORKLOG seeded

---

## GIT STATUS
**Last commit:** [check git log]  
**Branch:** main  
**Vercel deploy:** [x] Green  [ ] Failed  [ ] Not deployed yet

---

## NOTES / INTEL
> Anything that doesn't fit above. Edge cases, gotchas, decisions to remember.

```
Vercel project: thetrusspeople-v2 (prj_A6xaPDJrlvE6dz7HKAXQegQwqKjB)
Notion: https://www.notion.so/e36726bb56804c8ca5d8f370572234c1
Victoria AI Agent Notion: https://www.notion.so/337d422a3acb812098b0cd8aab010e22

Archived: ~/Projects/_archive/truss-people-v2123-3d/ — Vite + React Three Fiber experiment.
Could be used for future 3D upgrade. NOTE.md inside for context.

Form pattern: Google Drive (files) + Nodemailer/Gmail (notifications) — no third-party email.
One agency Google account used for all client submissions.
```
