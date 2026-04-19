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
```

---

## OPEN DECISIONS
> Things that need a human call before moving forward.

- [ ] GA4 — create property, get Measurement ID, add to site
- [ ] GSC — submit sitemap (thetrusspeople.com.au/sitemap.xml)
- [ ] Blog/FAQ strategy — what topics? Who writes? AI-assisted or manual?
- [ ] Monthly project showcase — process for getting photos from client + uploading to Sanity
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
