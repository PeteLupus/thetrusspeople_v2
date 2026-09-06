// Victoria's phone-number rules, shared by the tool server (app/api/victoria/tools/route.ts) and the
// call sheet (app/api/victoria/route.ts). One source, so the number the caller spoke, the number on the
// sheet and the caller ID are all judged by the same patterns. The language model never counts digits:
// on 5 Sep 2026 it called ten digits nine and eleven digits ten, in one call, with the rule in front of it.

const WORDS: Record<string, string> = {
    zero: '0', oh: '0', o: '0', nought: '0', one: '1', won: '1', two: '2', to: '2', too: '2', three: '3', tree: '3',
    four: '4', for: '4', fore: '4', five: '5', six: '6', seven: '7', eight: '8', ate: '8', nine: '9', niner: '9',
};

export const AU_NUMBER = /^(04\d{8}|0[2378]\d{8}|1[38]00\d{6}|13\d{4})$/;

// "oh four oh three, double seven, 4 double 2 1 8" -> "04037742218"; "+61411773226" -> "0411773226"
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

export function groups(digits: string): string[] {
    if (/^04/.test(digits)) return [digits.slice(0, 4), digits.slice(4, 7), digits.slice(7)];
    if (/^0[2378]/.test(digits)) return [digits.slice(0, 2), digits.slice(2, 6), digits.slice(6)];
    if (/^1[38]00/.test(digits)) return [digits.slice(0, 4), digits.slice(4, 7), digits.slice(7)];
    return [digits.slice(0, 2), digits.slice(2)];
}

// "0411773226" -> "0411 773 226"; anything that is not a valid number comes back as it went in
export function prettyNumber(digits: string): string {
    return AU_NUMBER.test(digits) ? groups(digits).join(' ') : digits;
}

const COUNT = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen'];
const SAY: Record<string, string> = { '0': 'oh', '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine' };
const sayGroup = (g: string) => g.split('').map((d) => SAY[d]).join(' ');

// "0411773226" -> "oh four one one, seven seven three, two two six"
export function spokenNumber(digits: string): string {
    return groups(digits).map(sayGroup).join(', ');
}

export type PhoneCheck = {
    valid: boolean;
    digits: string;
    /** Goes to the model as the tool result, so it knows the state and what to wait for. */
    result: string;
    /** Spoken to the caller by Vapi word for word, as the tool's request-complete message. The model never paraphrases a number. */
    say: string;
};

export function checkPhoneNumber(spoken: string): PhoneCheck {
    const digits = toDigits(spoken);
    const n = digits.length;
    const count = COUNT[n] ?? String(n);
    if (AU_NUMBER.test(digits)) {
        const kind = /^04/.test(digits) ? 'a mobile' : /^0[2378]/.test(digits) ? 'a landline' : 'a business number';
        const words = spokenNumber(digits);
        return {
            valid: true,
            digits,
            result: `VALID: ${prettyNumber(digits)} is ${kind}, ${count} digits. The caller has just heard "${words}" and been asked if that is right. Say nothing until they answer. Yes means the number is confirmed; no means take it again through this tool.`,
            say: `I have ${words}. Is that right?`,
        };
    }
    if (n === 0) {
        return { valid: false, digits, result: 'NOT VALID: no digits heard. The caller has been asked to say the number again slowly. Wait for it, then send it to this tool.', say: "Sorry, I didn't get the number. Could you say it again slowly for me?" };
    }
    if (n === 8) {
        return { valid: false, digits, result: `NOT VALID: eight digits heard, ${digits}, a landline without its area code. The caller has been asked for the area code. When it comes, send the area code and the eight digits to this tool together.`, say: 'That sounds like a landline without the area code. What area code is that?' };
    }
    if (n === 9 && digits.startsWith('4')) {
        return { valid: false, digits, result: `NOT VALID: nine digits heard, ${digits}, a mobile missing the leading zero. The caller has been asked to say the whole number starting with oh four. Wait for it, then send it to this tool.`, say: 'Could you say the whole number for me, starting with oh four?' };
    }
    return { valid: false, digits, result: `NOT VALID: ${count} digits heard, ${digits}. An Australian number is ten digits. The caller has been told you have ${count} digits and asked to say it again slowly. Wait for it, then send it to this tool.`, say: `I've got ${count} digits there. Could you say the number again slowly for me?` };
}

export type PhoneVerdict = { text: string; ok: boolean; digits: string };

// The call sheet's judgement of the number: what to print beside "Call back on" and whether the team can dial it
// without checking. `confirmed` comes from the structured output: true = the caller said yes to a read-back or to
// the number they called from; false = never; undefined = the sheet did not say. Every form the extractor might
// write (+61411773226, 0411 773 226, "unknown") goes through toDigits first: call eight on 6 Sep 2026 copied the
// caller ID as +61 and the sheet flagged a confirmed number as invalid.
export function judgePhone(raw: string | undefined, confirmed: boolean | undefined, callerId: string): PhoneVerdict {
    const caller = callerId ? toDigits(callerId) : '';
    const callerValid = AU_NUMBER.test(caller);
    const digits = raw ? toDigits(raw) : '';
    const taken = digits !== '';
    if (callerValid && confirmed === true && (!taken || digits === caller)) {
        return { text: `${prettyNumber(caller)} ✔ the number they called from, confirmed as the best one`, ok: true, digits: caller };
    }
    if (!taken) {
        return callerId
            ? { text: `${callerValid ? prettyNumber(caller) : callerId} ✗ the number they called from, never confirmed as the best one`, ok: false, digits: caller }
            : { text: 'no number taken', ok: false, digits: '' };
    }
    const valid = AU_NUMBER.test(digits);
    const shown = valid ? prettyNumber(digits) : digits;
    const readBack = confirmed === true ? 'read back and confirmed' : confirmed === false ? 'never read back to the caller' : 'confirmation not recorded on the sheet, check the transcript';
    if (valid && confirmed === true) return { text: `${shown} ✔ ${digits.length} digits, ${readBack}`, ok: true, digits };
    if (valid) return { text: `${shown} ✗ ${readBack}, check before calling`, ok: false, digits };
    const why = `${digits.length} digits, not a valid Australian number`;
    return {
        text: confirmed === true ? `${shown} ✗ ${why} even though the caller said yes, check before calling` : `${shown} ✗ ${why}, and ${readBack}`,
        ok: false,
        digits,
    };
}
