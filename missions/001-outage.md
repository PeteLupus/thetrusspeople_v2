# MISSION: 001-outage — Restore thetrusspeople.com.au

**Started:** 2026-04-30 (Thu evening)
**Status:** ACTIVE — site dark, recovery scheduled for Fri 2026-05-01 AM
**Codename:** polymorphic-trinket

---

## OBJECTIVE
Restore DNS resolution and email delivery for `thetrusspeople.com.au`. Migrate registrar-level nameservers to operator-controlled DNS over the following days so the dependency on WebStop is properly severed.

## AO
- **Project:** ~/Projects/clients/truss-people/v2/
- **Vercel project:** thetrusspeople-v2 (`prj_A6xaPDJrlvE6dz7HKAXQegQwqKjB`)
- **Registrar:** Instra (Domain Directors Pty Ltd) — operator has no account access
- **Authoritative NS (broken):** ns1/ns2.webstophosting.com.au — zone deleted on package termination
- **Old host:** WEBSTOP AUSTRALIA P/L — ACN 088372810 — director Leonard McQualter

## ROOT CAUSE (corrected ~21:02 AEST)
On 21 APR 2026 07:16 AEST, Leonard McQualter at WEBSTOP emailed Victor:
> *"Good morning Victor, please confirm your website has moved to new hosting so I can terminate this WebStop package ??"*

Victor (or operator on his behalf) replied "yeah we're good" — confirming termination. Leonard terminated the WebStop package as requested. **Because WebStop's nameservers were still the authoritative DNS for the domain at the registrar (Instra), the DNS zone went with the package.** Site dark globally. Email degrading silently as MX/SPF/DKIM resolution fails for senders without cached records.

**Not a non-payment suspension.** WebStop is not winding down. Leonard was acting professionally on a confirmed request. The miss was on our side: confirming migration without checking that the registrar-level NS were already off WebStop.

## INTEL
- Vercel deployment HEALTHY, domain configured, intended NS = `ns1.vercel-dns.com` / `ns2.vercel-dns.com`.
- WebStop nameservers return REFUSED for the zone (`dig @ns1.webstophosting.com.au thetrusspeople.com.au SOA` → REFUSED).
- Email outage observed by client today is real — caused by MX/SPF DNS lookup failures; "back" because of stale recursive resolver caches at sender networks. Will degrade further as caches expire over next 24–72h.
- Operator (Pits) attempted WebStop billing portal recovery tonight; portal showed an account contact email NOT matching `info@thetrusspeople.com.au` (hint: `i—f@k—v.com`). Without knowing the email, password reset is a dead end. Skip the portal — call Leonard directly tomorrow.

## OPERATOR CONTACT (key intel)
- **Leonard McQualter** — WEBSTOP AUSTRALIA P/L (ACN 088372810)
- Email: `leonard.mcqualter@webstop.com.au`
- **Mobile: 0417 386 551**  ← call this
- Landline: 03 4053 4608
- Office: 30 Church St, Camperdown VIC 3260

## CONSTRAINTS
- After-hours at session park (~21:30 AEST 2026-04-30) — call Leonard from 8:30 AEST Fri 2026-05-01.
- Operator does not have Instra access (deferred — not needed for tomorrow's recovery).
- DO NOT touch MX/SPF/MS-verify/DKIM records when fixing DNS — Outlook 365 email depends on them. Apex A → 76.76.21.21, www CNAME → cname.vercel-dns.com, preview CNAME → cname.vercel-dns.com — that's all.

## DEFINITION OF DONE
- `dig @8.8.8.8 thetrusspeople.com.au A +short` returns `76.76.21.21`
- `curl -sI https://thetrusspeople.com.au/` returns `HTTP/2 200`
- Email send/receive on `info@thetrusspeople.com.au` verified working end-to-end (external sender → inbox; inbox → external recipient, not spam)
- NS pointed at `ns1/ns2.vercel-dns.com` (next 5–14 days, not Friday)
- BUGFIX.md and project memory updated

---

## TOMORROW MORNING — EXECUTION ORDER

### Step 0 (5 min) — situational awareness
```bash
dig @8.8.8.8 thetrusspeople.com.au A +short
dig @ns1.webstophosting.com.au thetrusspeople.com.au SOA +short +time=5
```
If the first command returns `76.76.21.21` → Leonard auto-restored overnight or somehow recovered, jump to verification. Otherwise call.

### Step 1 (8:30 AEST) — call Leonard's mobile 0417 386 551
Script (keep it short, mea culpa, named ask):

> *"Hey Leonard, it's Petar — developer for The Truss People. My bad mate, I confirmed the migration without transferring the DNS off your nameservers. The site and email went down with the termination. Can you reactivate the package for another month? I'll pay now. I just need cPanel access back to fix the DNS records to point at Vercel, and then I'll properly migrate the nameservers off you over the next few days so you can terminate cleanly."*

Expected outcome: Leonard reactivates, sends an invoice, you pay, cPanel access restored within minutes-to-an-hour.

### Step 2 — once cPanel is back: fix DNS in Zone Editor
Log in to cPanel. Open Zone Editor for `thetrusspeople.com.au`. Set/verify:

```
A     @           76.76.21.21               TTL 300
CNAME www         cname.vercel-dns.com.     TTL 300
CNAME preview     cname.vercel-dns.com.     TTL 300
```

**Preserve untouched** (verify present + correct before saving anything):
- MX (Outlook 365)
- TXT — SPF (`v=spf1 include:spf.protection.outlook.com -all`)
- TXT — MS verify
- TXT — DKIM (`selector1._domainkey` / `selector2._domainkey`)

**If the zone was wiped** and the email-related records are gone, pull live values from Microsoft 365 admin centre (admin.microsoft.com → Domains → thetrusspeople.com.au → DNS records) and re-add.

### Step 3 — verify (within 60 min)
DNS propagation 5–60 min. Run verification commands until A returns `76.76.21.21`:

```bash
dig @8.8.8.8 thetrusspeople.com.au A +short          # 76.76.21.21
dig @1.1.1.1 thetrusspeople.com.au A +short          # 76.76.21.21
dig @8.8.8.8 thetrusspeople.com.au MX +short         # Outlook 365 MX
dig @8.8.8.8 thetrusspeople.com.au TXT +short        # SPF + MS-verify + DKIM
curl -sI https://thetrusspeople.com.au/ | head -5    # HTTP/2 200
```

Email check (manual):
1. Send test email FROM Gmail TO `info@thetrusspeople.com.au` — confirm received.
2. Reply FROM `info@thetrusspeople.com.au` — confirm landed in Gmail inbox, not spam.

### Step 4 — clean migration (next 5–14 days, no fire)
Now that the site is live and we have cPanel access, migrate properly:

1. **Document** current MX/SPF/MS-verify/DKIM values from cPanel before any change.
2. **Decide**: claim Instra account via ABN + Victor's ID and change NS at Instra to `ns1.vercel-dns.com` / `ns2.vercel-dns.com` — OR — transfer the domain to an operator-controlled registrar (Crazy Domains / VentraIP / Synergy Wholesale) and set NS at the new registrar.
3. **Verify** Vercel-managed DNS works for site + email (test inbound + outbound).
4. **Tell Leonard** to terminate the WebStop package cleanly — this time it won't take anything down. Cancel any direct debits on WebStop.

### Step 5 — debrief
- Write `missions/001-outage-debrief.md`: what happened, what worked, what broke, lessons.
- Update project CLAUDE.md with the new DNS configuration.
- Confirm BUGFIX.md global pattern + memory entries are accurate (already done tonight).

---

## PRE-CALL READY KIT (sitting on disk)

- Leonard McQualter — `leonard.mcqualter@webstop.com.au` — mobile **0417 386 551** — landline 03 4053 4608
- The ask: reactivate cPanel package for one more month, pay now, get access back
- Vercel A target: `76.76.21.21`
- Vercel CNAME target: `cname.vercel-dns.com.`
- Vercel intended NS (later, for clean migration): `ns1.vercel-dns.com` / `ns2.vercel-dns.com`
- (Deferred, only if needed) ABN extract: https://abr.business.gov.au/ABN/View?id=43592069081 — Instra support: `support@instra.com`
