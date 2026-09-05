import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';

// Victoria's tool server. Vapi posts "tool-calls" here when the assistant invokes a function tool.
// One tool so far: check_phone_number. The language model cannot count digits reliably (5 Sep 2026:
// Haiku called a ten-digit number nine and an eleven-digit number ten, and both went on the sheet
// as confirmed), so the number the caller spoke is normalised, expanded and validated here, and the
// model reads back exactly the words this returns. Auth: X-Vapi-Secret equals VICTORIA_WEBHOOK_SECRET.

type ToolArgs = Record<string, unknown> | string;
// Vapi's wire shape is OpenAI's: { id, type: "function", function: { name, arguments: "<json string>" } }.
// The docs example shows a flat { id, name, arguments: {} }. Building to that example is why call six on
// 5 Sep 2026 got "Unknown tool ." back three times: the request reached this route and the name read as
// undefined. Both shapes are accepted; the real one is tried first.
type ToolCall = { id: string; name?: string; arguments?: ToolArgs; function?: { name?: string; arguments?: ToolArgs } };

const WORDS: Record<string, string> = {
    zero: '0', oh: '0', o: '0', nought: '0', one: '1', won: '1', two: '2', to: '2', too: '2', three: '3', tree: '3',
    four: '4', for: '4', fore: '4', five: '5', six: '6', seven: '7', eight: '8', ate: '8', nine: '9', niner: '9',
};
const AU_NUMBER = /^(04\d{8}|0[2378]\d{8}|1[38]00\d{6}|13\d{4})$/;

// "oh four oh three, double seven, 4 double 2 1 8" -> "04037742218"
export function toDigits(spoken: string): string {
    const tokens = spoken
        .toLowerCase()
        .replace(/\+\s*61/g, ' plus61 ')
        .replace(/[^a-z0-9+]+/g, ' ')
        .trim()
        .split(/\s+/)
        .filter(Boolean);
    let out = '';
    let repeat = 1;
    for (const t of tokens) {
        if (t === 'double') { repeat = 2; continue; }
        if (t === 'triple' || t === 'treble') { repeat = 3; continue; }
        if (t === 'plus61') { out += '0'; repeat = 1; continue; }
        let digits = '';
        if (/^\d+$/.test(t)) digits = t;
        else if (WORDS[t] !== undefined) digits = WORDS[t];
        else { repeat = 1; continue; }
        // "double 22" is heard sometimes when the caller said "double two": repeat applies to a single digit only
        out += repeat > 1 && digits.length === 1 ? digits.repeat(repeat) : digits;
        repeat = 1;
    }
    if (out.startsWith('610') && out.length === 12) out = out.slice(2); // +61 0x written out in full
    if (out.startsWith('61') && out.length === 11) out = '0' + out.slice(2); // +61 4xx xxx xxx
    return out;
}

const COUNT = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen'];
const SAY: Record<string, string> = { '0': 'oh', '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine' };
const sayGroup = (g: string) => g.split('').map((d) => SAY[d]).join(' ');

function groups(digits: string): string[] {
    if (/^04/.test(digits)) return [digits.slice(0, 4), digits.slice(4, 7), digits.slice(7)];
    if (/^0[2378]/.test(digits)) return [digits.slice(0, 2), digits.slice(2, 6), digits.slice(6)];
    if (/^1[38]00/.test(digits)) return [digits.slice(0, 4), digits.slice(4, 7), digits.slice(7)];
    return [digits.slice(0, 2), digits.slice(2)];
}

export function checkPhoneNumber(spoken: string): string {
    const digits = toDigits(spoken);
    const n = digits.length;
    const count = COUNT[n] ?? String(n);
    if (AU_NUMBER.test(digits)) {
        const g = groups(digits);
        const kind = /^04/.test(digits) ? 'a mobile' : /^0[2378]/.test(digits) ? 'a landline' : 'a business number';
        return `VALID: ${g.join(' ')} is ${kind}, ${count} digits. Read it back once, exactly like this, pausing at each comma: "${g.map(sayGroup).join(', ')}". Then ask if that is right.`;
    }
    if (n === 0) return 'NOT VALID: no digits heard. Ask the caller to say the number again slowly.';
    if (n === 8) return `NOT VALID: ${count} digits heard, ${digits}. That looks like a landline without its area code. Ask the caller for the area code; Melbourne is oh three.`;
    if (n === 9 && digits.startsWith('4')) return `NOT VALID: ${count} digits heard, ${digits}, which looks like a mobile missing the leading zero. Ask the caller to say the whole number starting with oh four.`;
    return `NOT VALID: ${count} digits heard, ${digits}. An Australian mobile is ten digits starting with oh four, a landline ten digits starting with oh two, oh three, oh seven or oh eight. Tell the caller you have ${count} digits and ask them to say the number again slowly.`;
}

function secretMatches(header: string | null, expected: string): boolean {
    if (!header) return false;
    const a = Buffer.from(header);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET() {
    return NextResponse.json({ ok: true, tools: ['check_phone_number'] });
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
        let result: string;
        if (name === 'check_phone_number') {
            result = checkPhoneNumber(String(args.spoken ?? args.number ?? ''));
        } else {
            result = `Unknown tool ${name ?? ''}. Read the number back yourself in groups of three or four digits and ask the caller if that is right.`;
        }
        console.log('Victoria tool', name ?? '(no name)', call.function ? 'nested' : 'flat', JSON.stringify(args), '->', result.slice(0, 80));
        return { toolCallId: call.id, result };
    });
    return NextResponse.json({ results });
}

function safeParse(s: string): Record<string, unknown> {
    try { return JSON.parse(s); } catch { return { spoken: s }; }
}
