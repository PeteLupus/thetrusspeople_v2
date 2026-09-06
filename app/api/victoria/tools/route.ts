import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { checkPhoneNumber } from '@/lib/victoria/phone';

// Victoria's tool server. Vapi posts "tool-calls" here when the assistant invokes a function tool.
// One tool so far: check_phone_number. The rules live in lib/victoria/phone.ts, shared with the call
// sheet. Auth: X-Vapi-Secret equals VICTORIA_WEBHOOK_SECRET.
//
// Two lessons from the first live calls (5 and 6 Sep 2026):
// 1. Vapi's wire shape is OpenAI's: { id, type: "function", function: { name, arguments: "<json string>" } }.
//    The docs example shows a flat { id, name, arguments: {} }; building to that example is why call six got
//    "Unknown tool ." back three times. Both shapes are read, the real one first.
// 2. The model paraphrases numbers. In call seven Haiku read the digits out itself before the tool answered
//    and never used the tool's words. So the response carries a `message` of type request-complete, which
//    Vapi speaks to the caller word for word, and the model is not asked to respond at all.

type ToolArgs = Record<string, unknown> | string;
type ToolCall = { id: string; name?: string; arguments?: ToolArgs; function?: { name?: string; arguments?: ToolArgs } };

export async function GET() {
    return NextResponse.json({ ok: true, tools: ['check_phone_number'], version: 2 });
}

export async function POST(request: NextRequest) {
    const expected = process.env.VICTORIA_WEBHOOK_SECRET;
    if (!expected) return NextResponse.json({ error: 'VICTORIA_WEBHOOK_SECRET is not set' }, { status: 500 });
    if (!secretMatches(request.headers.get('x-vapi-secret'), expected)) return NextResponse.json({ error: 'unauthorised' }, { status: 401 });

    let message: { type?: string; toolCallList?: ToolCall[] };
    try {
        message = (await request.json())?.message ?? {};
    } catch {
        return NextResponse.json({ error: 'body is not JSON' }, { status: 400 });
    }
    if (message.type !== 'tool-calls') return NextResponse.json({ results: [] });

    const results = (message.toolCallList ?? []).map((call) => {
        const name = call.function?.name ?? call.name;
        const rawArgs = call.function?.arguments ?? call.arguments;
        const args = typeof rawArgs === 'string' ? safeParse(rawArgs) : rawArgs ?? {};
        if (name === 'check_phone_number') {
            const check = checkPhoneNumber(String(args.spoken ?? args.number ?? ''));
            console.log('Victoria tool', name, call.function ? 'nested' : 'flat', JSON.stringify(args), '->', check.result.slice(0, 60));
            return {
                toolCallId: call.id,
                result: check.result,
                message: { type: 'request-complete', role: 'assistant', content: check.say },
            };
        }
        const result = `Unknown tool ${name ?? ''}. Read the number back yourself in groups of three or four digits and ask the caller if that is right.`;
        console.log('Victoria tool', name ?? '(no name)', call.function ? 'nested' : 'flat', JSON.stringify(args), '->', result.slice(0, 60));
        return { toolCallId: call.id, result };
    });
    return NextResponse.json({ results });
}

function safeParse(s: string): Record<string, unknown> {
    try { return JSON.parse(s); } catch { return { spoken: s }; }
}

function secretMatches(header: string | null, expected: string): boolean {
    if (!header) return false;
    const a = Buffer.from(header);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
}
