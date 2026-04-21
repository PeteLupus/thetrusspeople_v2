# WORKLOG.md — Shared Mission Log

> Drop this file in every project root. All operators read it on cold start. Update it before switching terminals.

**COLD START READ ORDER:** `~/.claude/CLAUDE.md` → `~/.claude/memories/BUGFIX.md` (global patterns) → this file

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
HOLDING — site is production-ready. Waiting on operator to flip DNS.
```

---

## CC LAST DECISION
> What did Claude Code decide? Architecture, structure, approach. Paste the key output.

```
OPERATION RIDGELINE complete (2026-04-22).
Stack confirmed: Next.js 15 App Router + Tailwind v4 + Framer Motion v12 + SendGrid + GCS + Vercel.
NO Sanity CMS — all content hardcoded in lib/constants.ts (deferred, see FUTURE ROADMAP in CLAUDE.md).
Contact form: GCS file uploads + SendGrid email. Honeypot + in-memory rate limit (5 req/15min).
Maps: Google Maps embed iframe (maps.google.com/maps?output=embed) — free, no API key.
Address text in Contact + Footer is clickable → opens Google Maps.
GA4: NEXT_PUBLIC_GA_ID = G-X60E19R004 — set in Vercel, baked in on last deploy (2026-04-22).
Nav breakpoint: lg (1024px). Hamburger at tablet, full desktop nav at desktop only.
OG image: /assets/og-image.jpg — 1200×630 confirmed.
```

**CC Session ended:** 2026-04-22  
**CC stopped at:** Site is fully production-ready. Parked at FLIP DAY checklist.

---

## FLIP DAY CHECKLIST
> Execute in order on the day DNS is flipped.

```
PRE-FLIP (do first):
[ ] Confirm preview.thetrusspeople.com.au loads correctly (sanity check before touching DNS)
[ ] Screenshot current thetrusspeople.com.au (old site, for before/after)

DNS FLIP (cPanel at webstophosting.com.au):
[ ] Edit apex A record: thetrusspeople.com.au → 76.76.21.21
    (www is already CNAME → apex, no change needed)
[ ] DO NOT touch MX records (Outlook 365)
[ ] DO NOT touch SPF, TXT (MS verify) records

POST-FLIP VERIFY (within 30 min):
[ ] thetrusspeople.com.au loads the new site
[ ] www.thetrusspeople.com.au loads the new site
[ ] Email still works (send test email to/from info@thetrusspeople.com.au)
[ ] Contact form submits successfully (test with dummy entry)
[ ] Quote form submits + file upload works (test with small PDF)
[ ] GA4 Real-Time shows active user (visit site, check GA4 dashboard)

SEO (same day, post-flip):
[ ] GSC: submit sitemap — node src/index.js sitemap submit -c trusspeople
    (run from ~/Projects/tools/seo-ops/)
[ ] GSC: request indexing on homepage manually (GSC → URL inspection → Request indexing)
[ ] Verify sitemap at https://thetrusspeople.com.au/sitemap.xml
```

---

## OPEN DECISIONS
> Things that need a human call before moving forward.

- [ ] FLIP DAY — see checklist above
- [ ] Blog/FAQ strategy — what topics? Who writes? AI-assisted or manual?
- [ ] Monthly project showcase — process for getting photos from client + uploading to constants.ts
- [ ] Victoria agent — live integration testing scheduled?

---

## NEXT HUMAN DECISION NEEDED
> Single most important thing YOU need to decide right now.

```
FLIP DAY — when are we flipping DNS? Everything else is ready.
```

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
2026-04-20 — Phases 1-3+5 complete. Branch pushed. Vercel preview building.
             4 commits on feature/content-seo-launch-prep. Merged to main.
2026-04-20 — Replaced about section image (two-brothers.jpg) with updated magazine article scan.
2026-04-21 — Mission 1 (TTP GSC + domain staging) complete.
             Domains staged on Vercel: thetrusspeople.com.au, www.thetrusspeople.com.au, preview.thetrusspeople.com.au
             preview.thetrusspeople.com.au CNAME live (cname.vercel-dns.com).
             GSC: sc-domain:thetrusspeople.com.au already verified. Sitemaps submitted 2025-10-30.
             DNS at webstophosting.com.au (operator has cPanel). Flip: 1x A record edit only.
             MX (Outlook 365), SPF, TXT (MS verify) must be preserved on flip.
2026-04-22 — OPERATION RIDGELINE: pre-launch readiness audit + gap closure. COMPLETE.
             Commits: b730321 (audit), 44178ca (maps + GA4 bake-in)
             DONE:
               - Contact form honeypot field + in-memory IP rate limit (5 req/15min)
               - Google Maps embed (free iframe, no API key) in Contact + Footer
               - Address text clickable → opens Google Maps (both Contact + Footer)  
               - Nav breakpoint fixed: md→lg (was overflowing at 768px)
               - OG image: proper 1200×630 crop at /assets/og-image.jpg
               - .env.example created from live process.env grep (8 vars)
               - .gitignore patched: !.env.example exception added
               - 19 Playwright screenshots in /audit/ (375/414/768/1024px, 5 pages)
               - GA4 ID G-X60E19R004 set in Vercel env, baked in on deploy
             BLOCKED/NEXT: DNS flip (operator action required)
```

---

## COMPLETED — FULL BUILD LOG
> Everything that's been built. Accurate record.

- [x] Full site: Home, Products, Our Work, Quote, FAQ pages
- [x] All content in lib/constants.ts — no CMS
- [x] Quote form: 4-step, GCS file uploads, SendGrid notifications, reference numbers
- [x] Contact form: honeypot + rate limit + SendGrid
- [x] Framer Motion animations throughout (ScrollReveal, 3D card tilt, word-by-word reveal, pill stagger)
- [x] SEO: sitemap.ts, robots.ts, JSON-LD LocalBusiness schema, OG image 1200×630
- [x] Mobile responsive — nav breakpoint at lg (1024px)
- [x] Victoria AI Agent v4 — production (Vapi + n8n)
- [x] GA4 wired: GoogleAnalytics component + NEXT_PUBLIC_GA_ID env var (G-X60E19R004)
- [x] Maps: Google Maps embed iframe in Contact + Footer
- [x] Domains staged on Vercel (apex + www + preview subdomain)
- [x] preview.thetrusspeople.com.au live for client review

---

## GIT STATUS
**Last commit:** 44178ca [fix] Google Maps embed + clickable address + GA4 redeploy trigger  
**Branch:** main  
**Vercel deploy:** [x] Green

---

## NOTES / INTEL
> Anything that doesn't fit above. Edge cases, gotchas, decisions to remember.

```
Vercel project: thetrusspeople-v2 (prj_A6xaPDJrlvE6dz7HKAXQegQwqKjB)
Notion: https://www.notion.so/e36726bb56804c8ca5d8f370572234c1
Victoria AI Agent Notion: https://www.notion.so/337d422a3acb812098b0cd8aab010e22

GA4 Measurement ID: G-X60E19R004 (set in Vercel env as NEXT_PUBLIC_GA_ID)
GA4 Property: TTP_Website under The Truss People account

Maps: Using maps.google.com/maps?output=embed (free iframe, no API key, no billing).
      NOT the Maps JavaScript API. Do not switch to JS API without operator approval.
      Clicking map → opens Google Maps at 37-39 Glenelg Street Coolaroo VIC 3048.

NEXT_PUBLIC_ vars are baked at BUILD TIME in Next.js.
If you add/change a NEXT_PUBLIC_ env var in Vercel, a new deploy is required to activate it.

cPanel DNS at webstophosting.com.au (operator has access).
Flip is 1x edit: apex A record → 76.76.21.21. www is CNAME → apex (no change).
MX, SPF, TXT records must NOT be touched (Outlook 365 email).

Archived: ~/Projects/_archive/truss-people-v2123-3d/ — Vite + React Three Fiber experiment.

GCS bucket: ttp-quote-submissions
Service account env vars named GOOGLE_DRIVE_* (legacy naming, but it's GCS not Drive).
```
