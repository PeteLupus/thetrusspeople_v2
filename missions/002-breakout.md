## MISSION: BREAKOUT — 2026-05-07

**OBJECTIVE:** Move thetrusspeople.com.au DNS to Cloudflare and registrar to VentraIP. Break the WEBSTOP/Instra reseller chain that caused the 2026-04-30 and 2026-05-04 outages. Zero email/site downtime.

**AO:**
- WEBSTOP PartnerConsole (`webstop.partnerconsole.net`) — current registrar reseller + legacy zone
- Vercel DNS — current authoritative NS
- Instra — registrar of record (upstream of WEBSTOP)
- M365 tenant `thetrusspeople.onmicrosoft.com` — email + Intune
- New: Cloudflare (DNS) + VentraIP (registrar)

**INTEL:**
- Reseller chain: auDA → Instra → WEBSTOP → operator (memory `project_ttp_registrar_chain.md`)
- Auth code visible in WEBSTOP "Domain Password" field; domain status already Unlocked
- Registrant of record: Victor Manoski / `victor@thetrusspeople.com.au` — transfer approval lands there
- Full M365/Intune/DKIM record set captured from WEBSTOP legacy zone (selector1/2 values, MS=ms14685620, enterpriseenrollment, enterpriseregistration)
- Vercel auto-imported zone is missing the M365/Intune/DKIM records — gap to close at Cloudflare cutover
- Domain expires 07/06/2026; renewal at WEBSTOP $52.90/2yr, VentraIP ~$20/yr
- TTP Cloudflare account = NEW (separate from operator's existing CF / Aura Mist) — required because CF Free plan permissions are account-wide, must isolate before inviting OWL
- OWL gets scoped DNS access AFTER cutover, not during

**CONSTRAINTS:**
- Zero downtime on email + website
- OWL excluded from migration itself (operator brief)
- DNS-only mode in CF (grey cloud) — no proxy / double-CDN with Vercel
- Two-step phasing, days apart — never combined window

**DEFINITION OF DONE:**
- `dig NS thetrusspeople.com.au` returns `*.ns.cloudflare.com`
- `whois` returns VentraIP / Synergy Wholesale as registrar
- Site loads (HTTP/2 200), email in/out works, mail-tester score 8+/10 with SPF+DKIM+DMARC pass
- OWL invited to TTP CF account with DNS role
- WEBSTOP account marked decommissioned (kept open 30 days as insurance)

**OPEN QUESTIONS:** None — pre-flight complete, operator executing on own schedule.

**Plan file:** `~/.claude/plans/can-we-go-back-humble-emerson.md`
