# Victoria, the after-hours voice agent

What exists in Vapi for The Truss People, kept here so the build is not only in Vapi and Notion.
Reader and writer for the account: `~/.claude/scripts/vapi.py` (writes need `--confirm` and are
logged). Every fact the agent can say is checked against `lib/constants.ts` and `app/faq/page.tsx`
in this repo.

## Files

• `v5-system-prompt.md` · the live prompt on Victoria TTP_v5, byte for byte. Edit here, then patch.
• `structured-output-victoria-call-log-v5.json` · the capture schema attached to v5, as served
• `chat-test.py` · the question battery. Runs through Vapi's Chat API when the account has a card
• `prompt-test.py` · the same battery run straight against the model with the rendered prompt.
  Built on 3 Sep because Vapi's Chat API answered 402, no card on file
• `v5-test-log.md` · the final run of the battery against the live prompt, with a verdict per turn
• `v4-system-prompt.md`, `knowledge-base-v4.txt`, `structured-output-victoria-call-log.json`,
  `assistant-v4-config.json` · the January build, archived 2 Sep

## State on 3 Sep 2026

| Fact | Receipt |
|---|---|
| Six assistants: Victoria v1 to v5, plus Vapi's stock "Alex" template | `vapi.py assistants` |
| The Twilio number +61 485 002 210 is a dead pointer. On 5 Sep Twilio's own API answered error 20003, "account with status 4 is not active", for the account SID Vapi holds, and the Twilio Admin console under the TTP work Gmail lists zero accounts, closed filter included. Vapi still calls the number "active" because it never asks Twilio. No phone call can reach Victoria until a new number exists | Twilio REST API + admin.twilio.com, 5 Sep |
| v5 model is Claude Haiku 4.5 through Vapi's own integration, temperature 0.4, 250 token cap | `vapi.py assistant "Victoria TTP_v5"` |
| v5 voice is the same ElevenLabs voice as v4 on the Flash v2.5 model; transcriber Deepgram Nova 3, Australian English, twelve trade key terms | same |
| Recording on, call summary on, success checklist on, fixed opening line, end-call tool attached | same |
| The v4 schema's phone pattern was stored double-escaped and could never match a number; v5 has its own schema with five required fields instead of eight | `GET /structured-output` |
| Vapi's Chat API refuses this account: "Add a payment method to use chat" | HTTP 402, 3 Sep 00:45 |
| Zero calls on record, any version | `vapi.py calls` |
| v4's n8n webhook host does not resolve; v5 has no server URL and no tools beyond end call | `dig`, `vapi.py assistant` |

## How v5 was built

Read first: Vapi's prompting guide and the Vapi Skills plugin for Claude Code, then the site. The
prompt follows the six sections Vapi asks for: identity, response guidelines, guardrails, context,
workflow, examples. Facts the site does not state are out: opening hours, lead times, quote
turnaround, the "30+ years" line. The callback wording is computed in Liquid from Melbourne time,
so the model never does the day arithmetic itself.

Testing: the battery in `chat-test.py` (sixteen factual questions, seven off-topic, seven
adversarial, three call flows) was run on Claude Haiku 4.5 and Claude Sonnet 4.6 with the same
prompt. Both passed every turn. Haiku answered faster and shorter, which is what a phone line
needs, so it is the v5 model. The full record is `v5-test-log.md`.

## Still Vic's call before the line goes public

• The callback promise itself ("later today or tomorrow during business hours" and the Monday
  variant). Victoria says nothing more specific than that, and nothing about lead times.
• Whether the opening line should mention that calls are recorded.
• Opening hours, if he wants her to state them. They are not on the website, so she does not.
