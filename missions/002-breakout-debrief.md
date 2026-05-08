## MISSION: BREAKOUT — 2026-05-09

**Objective:** Move thetrusspeople.com.au DNS to Cloudflare, break the WEBSTOP/Instra reseller chain that caused the 2026-04-30 and 2026-05-04 outages. Zero email/site downtime.

**Outcome:** SHIPPED (DNS phase). Registrar transfer to VentraIP queued for +3–7 days as planned phase-2.

**What worked:**
- Two-step phasing held — DNS cutover decoupled from registrar transfer means the high-stakes step (NS flip) was isolated and reversible. Rollback path stayed warm: revert WEBSTOP NS → ns1/ns2.vercel-dns.com.
- CF zone fully staged on 2026-05-08 in parity with the live Vercel zone (only what was actually serving — SPF + MX + autodiscover + A's). Refusing to blind-add the M365 hardening records (MS=, DKIM selectors, DMARC, Intune CNAMEs) before pulling exact values from the M365 tenant was the right call. Wrong DKIM selectors would have broken signed mail.
- TTL prep was a no-op (records already at 60s), so cutover was effectively instant — both 1.1.1.1 and 8.8.8.8 returned hera/paul on first dig, whois showed CF immediately.
- Mail flow verified end-to-end before declaring done: Gmail → petar@thetrusspeople.com.au landed in OWA inbox; reply petar@... → Gmail received, not spam-flagged.

**What broke:**
- Nothing on the cutover itself. Operator briefly thought the email signature was DNS-broken in Gmail. It wasn't — DNS routes envelopes, not message bodies. The signature's HTML table layout has always rendered badly in Gmail (no fixed `<td>` widths; logo column pushes address cells out of alignment). Pre-existing template bug, not a regression. False alarm cost ~5 min and required calm reassurance before continuing verification.

**Learnings:**
- When the operator is anxious mid-cutover, do not conflate "this looks weird" with "the change broke something." Diagnose the layer first (envelope vs. body, NS vs. zone, DNS vs. content). Anchor to "DNS routes, it doesn't transform" — that line settled the panic and let verification continue.
- `dig @1.1.1.1` + `dig @8.8.8.8` + `whois` in parallel is the right baseline at T+0. If all three converge on the new NS instantly, propagation is done — no need to wait the 15–60 min envelope.
- Refusing to combine cutover + registrar transfer was correct. One window, one variable. The operator's "I just can't handle this breaking one more time" was a clear signal to move slowly and verify each layer before declaring green.
- Parity-only zone migration is the safe default. Hardening (DKIM, DMARC, Intune, MS=) is a separate mission with separate verification — bundling them risks a DKIM selector mismatch that would silently break outbound mail signing.

**Open items (carried forward):**
- Fix M365 signature HTML — Gmail rendering bug, pre-existing.
- mail-tester score — establish baseline now that mail is on the CF-routed path.
- Invite OWL to TTP Cloudflare account with DNS-only role.
- Registrar transfer to VentraIP — +3–7 days, low-risk, site stays on CF NS through transfer.
- M365 hardening mission — pull live values from M365 Admin → Domains wizard, add to CF zone (DKIM selectors, DMARC, MS= ownership, Intune CNAMEs).
