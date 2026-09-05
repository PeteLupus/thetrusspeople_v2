import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { getResend } from '@/lib/mailer';

// Victoria's call sheet. Vapi posts an end-of-call report here after every call the
// Victoria assistant takes. This mails the sheet to VICTORIA_CALL_SHEET_TO through the
// same Resend path as the contact form. Vapi authenticates with the X-Vapi-Secret header,
// which must equal VICTORIA_WEBHOOK_SECRET. Nothing is sent when either key is missing.
//
// The sheet never trusts "confirmed" on its own: a number the caller said yes to can still
// be nine or eleven digits (both happened on 5 Sep 2026), so every number is counted and
// pattern-checked here and the subject carries CHECK NUMBER when it fails.

type Sheet = {
    caller_name?: string;
    phone_number?: string;
    phone_confirmed?: boolean;
    email?: string;
    email_confirmed?: boolean;
    company?: string;
    suburb?: string;
    inquiry_type?: string;
    project_type?: string;
    caller_type?: string;
    has_plans?: boolean;
    urgency?: string;
    out_of_scope?: boolean;
    action_required?: boolean;
    call_summary?: string;
};

type VapiMessage = {
    type?: string;
    endedReason?: string;
    startedAt?: string;
    endedAt?: string;
    durationSeconds?: number;
    summary?: string;
    transcript?: string;
    recordingUrl?: string;
    customer?: { number?: string };
    call?: { id?: string; startedAt?: string; endedAt?: string; customer?: { number?: string } };
    analysis?: { summary?: string };
    artifact?: {
        transcript?: string;
        recordingUrl?: string;
        structuredOutputs?: Record<string, { name?: string; result?: Sheet }>;
    };
};

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (v: unknown) => String(v ?? '').replace(/[&<>"']/g, (c) => ESCAPES[c] ?? c);
const given = (v?: string) => Boolean(v) && v !== 'unknown';
const words = (v?: string) => (given(v) ? (v as string).replace(/_/g, ' ') : 'not given');
const yesNo = (v?: boolean) => (v === true ? 'yes' : v === false ? 'no' : 'not given');

// Australian numbers as dialled locally: 04 mobiles, 02/03/07/08 landlines, 1300/1800, 13xxxx.
const AU_NUMBER = /^(04\d{8}|0[2378]\d{8}|1[38]00\d{6}|13\d{4})$/;

function prettyNumber(digits: string): string {
    if (/^04\d{8}$/.test(digits)) return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
    if (/^0[2378]\d{8}$/.test(digits)) return `${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
    if (/^1[38]00\d{6}$/.test(digits)) return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
    return digits;
}

function phoneCheck(raw: string | undefined, confirmed: boolean | undefined, callerId: string): { text: string; ok: boolean } {
    if (!given(raw)) {
        return callerId
            ? { text: `${callerId} (caller ID only, never read back)`, ok: false }
            : { text: 'no number taken', ok: false };
    }
    const digits = (raw as string).replace(/\D/g, '');
    const valid = AU_NUMBER.test(digits);
    const shown = valid ? prettyNumber(digits) : digits || (raw as string);
    // confirmed: true = read back and the caller said yes; false = never read back; undefined = the sheet did not say.
    const readBack = confirmed === true ? 'read back and confirmed' : confirmed === false ? 'never read back to the caller' : 'confirmation not recorded on the sheet, check the transcript';
    if (valid && confirmed === true) return { text: `${shown} ✔ ${digits.length} digits, ${readBack}`, ok: true };
    if (valid) return { text: `${shown} ✗ ${readBack}, check before calling`, ok: false };
    const why = `${digits.length} digits, not a valid Australian number`;
    return {
        text: confirmed === true ? `${shown} ✗ ${why} even though the caller said yes, check before calling` : `${shown} ✗ ${why}, and ${readBack}`,
        ok: false,
    };
}

function emailCheck(email: string | undefined, confirmed: boolean | undefined): { text: string; ok: boolean } {
    if (!email) return { text: 'not given', ok: true };
    const shape = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!shape) return { text: `${email} ✗ does not look like an address`, ok: false };
    if (confirmed === true) return { text: `${email} ✔ spelled back and confirmed`, ok: true };
    if (confirmed === false) return { text: `${email} ✗ never spelled back, check before emailing`, ok: false };
    return { text: `${email} ✗ confirmation not recorded on the sheet, check the transcript`, ok: false };
}

function secretMatches(header: string | null, expected: string): boolean {
    if (!header) return false;
    const a = Buffer.from(header);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
}

function melbourne(iso?: string): string {
    if (!iso) return 'time unknown';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return 'time unknown';
    return new Intl.DateTimeFormat('en-AU', {
        timeZone: 'Australia/Melbourne',
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        hour: 'numeric', minute: '2-digit', hour12: true,
    }).format(d);
}

function length(m: VapiMessage): string {
    let s = m.durationSeconds;
    const a = m.startedAt ?? m.call?.startedAt;
    const b = m.endedAt ?? m.call?.endedAt;
    if (s == null && a && b) s = (new Date(b).getTime() - new Date(a).getTime()) / 1000;
    if (s == null || Number.isNaN(s)) return 'unknown';
    return `${Math.floor(s / 60)} min ${Math.round(s % 60)} s`;
}

export async function GET() {
    return NextResponse.json({ ok: true, version: 2 });
}

export async function POST(request: NextRequest) {
    const expected = process.env.VICTORIA_WEBHOOK_SECRET;
    if (!expected) {
        return NextResponse.json({ error: 'VICTORIA_WEBHOOK_SECRET is not set' }, { status: 500 });
    }
    if (!secretMatches(request.headers.get('x-vapi-secret'), expected)) {
        return NextResponse.json({ error: 'unauthorised' }, { status: 401 });
    }

    let message: VapiMessage;
    try {
        message = (await request.json())?.message ?? {};
    } catch {
        return NextResponse.json({ error: 'body is not JSON' }, { status: 400 });
    }
    if (message.type !== 'end-of-call-report') {
        return NextResponse.json({ ok: true, ignored: message.type ?? 'no type' });
    }

    const to = (process.env.VICTORIA_CALL_SHEET_TO ?? '').split(',').map((e) => e.trim()).filter(Boolean);
    if (to.length === 0) {
        return NextResponse.json({ error: 'VICTORIA_CALL_SHEET_TO is not set' }, { status: 500 });
    }
    if (!process.env.RESEND_API_KEY) {
        return NextResponse.json({ error: 'RESEND_API_KEY is not set' }, { status: 500 });
    }

    const outputs = Object.values(message.artifact?.structuredOutputs ?? {});
    const sheet: Sheet = (outputs.find((o) => o?.name?.startsWith('Victoria_Call_Log')) ?? outputs[0])?.result ?? {};
    const summary = sheet.call_summary || message.analysis?.summary || message.summary || 'No summary was produced.';
    const transcript = message.artifact?.transcript || message.transcript || '';
    const recording = message.artifact?.recordingUrl || message.recordingUrl || '';
    const callerId = message.customer?.number || message.call?.customer?.number || '';
    const name = given(sheet.caller_name) ? (sheet.caller_name as string) : 'name not given';
    const wants = given(sheet.inquiry_type) ? words(sheet.inquiry_type) : 'no details taken';
    const urgent = sheet.urgency === 'high';
    const when = melbourne(message.startedAt ?? message.call?.startedAt);
    const phone = phoneCheck(sheet.phone_number, sheet.phone_confirmed, callerId);
    const email = emailCheck(sheet.email, sheet.email_confirmed);
    const needsCallback = sheet.action_required !== false;
    const numberProblem = needsCallback && !phone.ok;

    const rows: [string, string][] = [
        ['Caller', name + (sheet.company ? `, ${sheet.company} (as heard, not confirmed)` : '')],
        ['Call back on', phone.text],
        ['Email', email.text],
        ['Job suburb', sheet.suburb || 'not given'],
        ['Wants', wants],
        ['Project', words(sheet.project_type)],
        ['Who they are', words(sheet.caller_type)],
        ['Plans ready', yesNo(sheet.has_plans)],
        ['Urgency', sheet.urgency ? sheet.urgency.toUpperCase() : 'not rated'],
        ['Needs a call back', yesNo(sheet.action_required)],
        ['Pushed for a price or went off topic', yesNo(sheet.out_of_scope)],
        ['Call time', when],
        ['Length', length(message)],
    ];

    const flags = `${urgent ? 'URGENT: ' : ''}${numberProblem ? 'CHECK NUMBER: ' : ''}`;
    const subject = `${flags}Victoria took a call: ${name}, ${wants}${sheet.suburb ? ` in ${sheet.suburb}` : ''}`;
    const td = 'padding:8px;border:1px solid #ddd;';
    const banner = (text: string) => `<p style="margin:0 0 16px;padding:8px 12px;background:#fde8e8;color:#8a1c1c;font-weight:bold">${esc(text)}</p>`;
    const html = `
        <h2 style="margin:0 0 4px">Victoria took a call</h2>
        <p style="margin:0 0 16px;color:#555">${esc(when)}</p>
        ${urgent ? banner('The caller flagged this as urgent.') : ''}
        ${numberProblem ? banner('The callback number failed the check. Listen to the recording before ringing.') : ''}
        <p style="margin:0 0 16px"><strong>Summary:</strong> ${esc(summary)}</p>
        <table style="border-collapse:collapse;width:100%">
          ${rows.map(([k, v]) => `<tr><td style="${td}font-weight:bold;white-space:nowrap">${esc(k)}</td><td style="${td}">${esc(v)}</td></tr>`).join('\n          ')}
        </table>
        ${recording ? `<p style="margin:16px 0"><a href="${esc(recording)}">Listen to the recording</a></p>` : ''}
        ${transcript ? `<h3 style="margin:24px 0 8px">Transcript</h3><pre style="white-space:pre-wrap;font-family:monospace;font-size:13px;background:#f6f6f6;padding:12px">${esc(transcript)}</pre>` : ''}
        <p style="margin:24px 0 0;color:#888;font-size:12px">Sent by Victoria, the phone assistant for The Truss People. Call ${esc(message.call?.id ?? 'id unknown')}, ended: ${esc(message.endedReason ?? 'unknown')}.</p>
    `;
    const text = [
        `Victoria took a call, ${when}`,
        urgent ? 'THE CALLER FLAGGED THIS AS URGENT.' : '',
        numberProblem ? 'THE CALLBACK NUMBER FAILED THE CHECK. LISTEN TO THE RECORDING BEFORE RINGING.' : '',
        `Summary: ${summary}`,
        '',
        ...rows.map(([k, v]) => `${k}: ${v}`),
        recording ? `\nRecording: ${recording}` : '',
        transcript ? `\nTranscript:\n${transcript}` : '',
    ].filter((line) => line !== '').join('\n');

    const replyTo = email.ok && sheet.email ? { replyTo: sheet.email } : {};

    try {
        const { data, error } = await getResend().emails.send({
            from: 'Victoria at The Truss People <notifications@thetrusspeople.com.au>',
            to,
            subject,
            html,
            text,
            ...replyTo,
        });
        if (error) {
            console.error('Victoria call sheet: Resend refused', error);
            return NextResponse.json({ error: 'mail not sent' }, { status: 502 });
        }
        return NextResponse.json({ ok: true, id: data?.id ?? null });
    } catch (err) {
        console.error('Victoria call sheet error:', err);
        return NextResponse.json({ error: 'mail not sent' }, { status: 500 });
    }
}
