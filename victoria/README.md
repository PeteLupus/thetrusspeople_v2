# Victoria, the after-hours voice agent

Archive of what exists in Vapi for The Truss People, pulled off the Vapi API on 2 Sep 2026 with
`~/.claude/scripts/vapi.py`. Until this folder existed the build lived only in Vapi and in Notion.

• `v4-system-prompt.md` · the production prompt, 9,869 characters, last edited 18 Jan 2026
• `knowledge-base-v4.txt` · text of the 1.7MB docx sitting in Vapi's file store, attached to nothing
• `structured-output-victoria-call-log.json` · the 15-field capture schema, attached to every version
• `assistant-v4-config.json` · the full assistant object as served, org id and the webhook path removed

## State on 2 Sep 2026

| Fact | Receipt |
|---|---|
| Five assistants: Victoria v1 to v4, plus Vapi's stock "Alex" template | `vapi.py assistants` |
| One number, Twilio, +61 485 002 210, attached to **v3**. Operator says the Twilio side is not active | `vapi.py numbers`, operator 2 Sep |
| Zero calls on record, any version | `vapi.py calls` |
| v4 logging posts the end-of-call report to n8n on `n8n.srv1176496.hstgr.cloud`, which no longer resolves | `dig`, `host` |
| v4 prompt orders an `n8n_victoria_tools` MCP tool that is not attached to v4 and points at the same dead host | `vapi.py assistant`, `GET /tool` |
| Recording off, call summary off, success evaluation off | `assistant-v4-config.json` |
| Prompt and knowledge base say "30+ years"; the live site says 20 years, Vic's wording, 27 Aug | `lib/constants.ts` |

Recon and next steps: `~/Projects/products/tradesorted/missions/036-switchboard-recon.md`.
