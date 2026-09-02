#!/usr/bin/env python3
"""prompt-test.py: the chat-test.py battery run straight against the model provider with the deployed
system prompt. Written because Vapi's Chat API answered 402 on 3 Sep 2026 (no card on file). Vapi
passes the system prompt through to the model, so this tests the prompt and the model; it cannot test
transcription, voice or turn-taking.

  prompt-test.py [--model openai:gpt-4.1] [--assistant <vapi id>] [--only fact,offtopic,adversarial,flow]
                 [--callerid +614...] [--out file.md]

Prompt source: --assistant reads the live system prompt off Vapi; otherwise victoria/v5-system-prompt.md.
The two Liquid pieces Vapi would render are rendered here: Melbourne time, and the caller ID line.
Every case starts with the fixed first message already spoken, as on a real call.
Keys: OPENAI_API_KEY / ANTHROPIC_API_KEY read from ~/Projects/products/content-engine/.env, never printed.
"""
import json, re, sys, time, pathlib, importlib.util, urllib.request, urllib.error
from datetime import datetime
from zoneinfo import ZoneInfo

HERE = pathlib.Path(__file__).resolve().parent
FIRST = "Thanks for calling The Truss People. This is Victoria. How can I help you today?"

spec = importlib.util.spec_from_file_location("chat_test", HERE / "chat-test.py")
ct = importlib.util.module_from_spec(spec); spec.loader.exec_module(ct)

def env_keys():
    keys = {}
    for line in (pathlib.Path.home() / "Projects/products/content-engine/.env").read_text().splitlines():
        for k in ("OPENAI_API_KEY", "ANTHROPIC_API_KEY"):
            if line.startswith(k + "="):
                keys[k] = line.split("=", 1)[1].strip().strip('"').strip("'")
    return keys

LIQUID_NODE_PATH = str(pathlib.Path.home() / ".claude/tools/liquid/node_modules")
LIQUID_JS = """const {Liquid}=require('liquidjs');const fs=require('fs');
const tpl=fs.readFileSync(process.argv[1],'utf8');const ctx=JSON.parse(process.argv[2]||'{}');
new Liquid().parseAndRender(tpl,ctx).then(s=>process.stdout.write(s)).catch(e=>{console.error(e.message);process.exit(1)});"""

def render(prompt, callerid=None):
    """LiquidJS is what Vapi renders prompts with, so use it when it is installed; the regex
    fallback only knows the 'now' line and the caller ID block."""
    import subprocess, os, tempfile
    with tempfile.NamedTemporaryFile("w", suffix=".liquid", delete=False) as f:
        f.write(prompt); path = f.name
    ctx = json.dumps({"customer": {"number": callerid}} if callerid else {})
    r = subprocess.run(["node", "-e", LIQUID_JS, path, ctx], capture_output=True, text=True,
                       env={**os.environ, "NODE_PATH": LIQUID_NODE_PATH})
    os.unlink(path)
    if r.returncode == 0 and r.stdout.strip():
        return r.stdout
    print("liquidjs render unavailable (" + r.stderr.strip()[:120] + "); regex fallback", file=sys.stderr)
    now = datetime.now(ZoneInfo("Australia/Melbourne")).strftime("%A, %d %B %Y, %I:%M %p")
    prompt = re.sub(r'\{\{\s*"now"[^}]*\}\}', now, prompt)
    if callerid:
        prompt = re.sub(r"\{%\s*if customer\.number\s*%\}(.*?)\{%\s*endif\s*%\}", lambda m: m.group(1).replace("{{ customer.number }}", callerid), prompt, flags=re.S)
    else:
        prompt = re.sub(r"\{%\s*if customer\.number\s*%\}.*?\{%\s*endif\s*%\}\n?", "", prompt, flags=re.S)
    return prompt

def post(url, headers, body):
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={"Content-Type": "application/json", **headers})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code} on {url}: {e.read()[:400]!r}")

def make_caller(provider, model, keys, system):
    if provider == "openai":
        def call(messages):
            d = post("https://api.openai.com/v1/chat/completions", {"Authorization": "Bearer " + keys["OPENAI_API_KEY"]},
                     {"model": model, "temperature": 0.4, "max_tokens": 250, "messages": [{"role": "system", "content": system}] + messages})
            return d["choices"][0]["message"]["content"].strip()
    elif provider == "anthropic":
        def call(messages):
            d = post("https://api.anthropic.com/v1/messages", {"x-api-key": keys["ANTHROPIC_API_KEY"], "anthropic-version": "2023-06-01"},
                     {"model": model, "temperature": 0.4, "max_tokens": 250, "system": system, "messages": messages})
            return "".join(b.get("text", "") for b in d["content"]).strip()
    else:
        sys.exit("provider must be openai or anthropic")
    return call

def main():
    args = sys.argv[1:]
    model = args[args.index("--model") + 1] if "--model" in args else "openai:gpt-4.1"
    provider, name = model.split(":", 1)
    only = set(args[args.index("--only") + 1].split(",")) if "--only" in args else {"fact", "offtopic", "adversarial", "flow"}
    callerid = args[args.index("--callerid") + 1] if "--callerid" in args else None
    out_path = args[args.index("--out") + 1] if "--out" in args else None
    if "--assistant" in args:
        a = ct.api("GET", "/assistant/" + args[args.index("--assistant") + 1])
        raw = next(m["content"] for m in a["model"]["messages"] if m["role"] == "system"); src = "live Vapi prompt " + a["id"][:8]
    else:
        raw = (HERE / "v5-system-prompt.md").read_text(); src = "victoria/v5-system-prompt.md"
    keys = env_keys()
    if provider == "openai" and "OPENAI_API_KEY" not in keys: sys.exit("no OPENAI_API_KEY on disk")
    if provider == "anthropic" and "ANTHROPIC_API_KEY" not in keys: sys.exit("no ANTHROPIC_API_KEY on disk")
    system = render(raw, callerid)
    call = make_caller(provider, name, keys, system)
    lines = [f"# Prompt battery, {datetime.now(ZoneInfo('Australia/Melbourne')).strftime('%Y-%m-%d %H:%M %Z')}",
             "rendered callback words: " + (re.search(r'the words are "([^"]*)"', system).group(1) if re.search(r'the words are "([^"]*)"', system) else "not found"),
             f"model {model}, prompt from {src}, {len(system)} chars rendered" + (f", caller ID {callerid}" if callerid else ", no caller ID"), ""]
    total = flagged = 0
    singles = [c for c in ct.FACTS + ct.OFFTOPIC + ct.ADVERSARIAL if c[0] in only]
    if singles:
        lines += ["## Single turns", "", "| # | kind | question | answer | auto-check | verdict |", "|---|---|---|---|---|---|"]
    for i, (kind, q) in enumerate(singles, 1):
        t0 = time.time(); ans = call([{"role": "assistant", "content": FIRST}, {"role": "user", "content": q}]); dt = time.time() - t0
        hits = ct.check(ans); total += 1; flagged += bool(hits)
        lines.append(f"| {i} | {kind} | {q} | {ans.replace('|', '/').replace(chr(10), ' ')} | {'FLAG: ' + '; '.join(hits) if hits else 'clean'} ({dt:.1f}s) |  |")
        print(f"[{i}/{len(singles)}] {kind}: {q[:45]} -> {ans[:100]!r} {'FLAG ' + str(hits) if hits else ''}", flush=True)
    if "flow" in only:
        for fname, turns in ct.FLOWS.items():
            lines += ["", f"## {fname}", ""]
            msgs = [{"role": "assistant", "content": FIRST}]
            for t in turns:
                msgs.append({"role": "user", "content": t})
                t0 = time.time(); ans = call(msgs); dt = time.time() - t0
                msgs.append({"role": "assistant", "content": ans})
                hits = ct.check(ans); total += 1; flagged += bool(hits)
                lines += [f"Caller: {t}", f"Victoria: {ans}" + (f"  **FLAG: {'; '.join(hits)}**" if hits else "") + f"  ({dt:.1f}s)", ""]
                print(f"[{fname}] {t[:40]!r} -> {ans[:100]!r} {'FLAG ' + str(hits) if hits else ''}", flush=True)
    lines += ["", f"Turns: {total}. Auto-flagged: {flagged}. Human verdicts to follow."]
    text = "\n".join(lines) + "\n"
    if out_path: pathlib.Path(out_path).write_text(text); print("written", out_path)
    else: print(text)

if __name__ == "__main__":
    main()
