// Server only. Sends every enquiry to the Content Desk lead route after the
// enquiry email has gone out. No `@/` imports so plain Node can load this file
// (scripts/check-lead-ledger.ts does).

const DEFAULT_INGEST_URL = 'https://ttp-content-desk.vercel.app/api/cron/lead';
const TIMEOUT_MS = 3000;
const UTM_KEYS = ['source', 'medium', 'campaign', 'term', 'content'] as const;
const UTM_MAX_LENGTH = 200;

type UtmKey = (typeof UTM_KEYS)[number];

export type LeadUtm = Partial<Record<UtmKey, string>>;

// Key order is the contract's order, byte for byte.
export type LeadPayload = {
  client: 'trusspeople';
  type: 'quote' | 'contact';
  submittedAt: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  businessName: string | null;
  suburb: string | null;
  projectType: string | null;
  message: string | null;
  reference: string | null;
  page: string | null;
  referrer: string | null;
  utm: LeadUtm;
};

// Raw route fields, straight off the request body, so nothing is trusted.
export type LeadInput = {
  type: 'quote' | 'contact';
  firstName?: unknown;
  lastName?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  businessName?: unknown;
  suburb?: unknown;
  projectType?: unknown;
  projectTypeOther?: unknown;
  additionalDetails?: unknown;
  message?: unknown;
  reference?: unknown;
  page?: unknown;
  referrer?: unknown;
  utm?: unknown;
};

// Absent strings are null, never ''.
function str(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

// Keeps only the five utm keys, only as strings, each capped at 200 characters.
function cleanUtm(value: unknown): LeadUtm {
  const utm: LeadUtm = {};
  if (!value || typeof value !== 'object' || Array.isArray(value)) return utm;
  const raw = value as Record<string, unknown>;
  for (const key of UTM_KEYS) {
    const v = str(raw[key]);
    if (v) utm[key] = v.slice(0, UTM_MAX_LENGTH);
  }
  return utm;
}

export function buildLeadPayload(input: LeadInput): LeadPayload {
  const isQuote = input.type === 'quote';

  const name = isQuote
    ? [str(input.firstName), str(input.lastName)].filter(Boolean).join(' ') || null
    : str(input.name);

  // A quote marked Other carries what was typed, or the word Other when nothing was.
  const projectType = isQuote && input.projectType === 'Other'
    ? (str(input.projectTypeOther) ?? str(input.projectType))
    : str(input.projectType);

  return {
    client: 'trusspeople',
    type: isQuote ? 'quote' : 'contact',
    submittedAt: new Date().toISOString(),
    name,
    email: str(input.email),
    phone: str(input.phone),
    businessName: isQuote ? str(input.company) : str(input.businessName),
    suburb: str(input.suburb),
    projectType,
    message: isQuote ? str(input.additionalDetails) : str(input.message),
    reference: isQuote ? str(input.reference) : null,
    page: str(input.page),
    referrer: str(input.referrer),
    utm: cleanUtm(input.utm),
  };
}

// Bounded to three seconds, never throws. Every answer from the Desk is logged
// and the enquiry carries on either way.
export async function recordLead(payload: LeadPayload): Promise<void> {
  const secret = process.env.LEADS_INGEST_SECRET;
  if (!secret) {
    console.warn('[leadLedger] LEADS_INGEST_SECRET unset, enquiry not recorded');
    return;
  }

  try {
    const res = await fetch(process.env.LEADS_INGEST_URL || DEFAULT_INGEST_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (res.ok) {
      console.log('[leadLedger] enquiry recorded', res.status);
    } else {
      console.error('[leadLedger] Desk refused the enquiry', res.status);
    }
  } catch (error) {
    console.error('[leadLedger] enquiry not recorded', error instanceof Error ? error.message : String(error));
  }
}
