// Client safe. First touch attribution for the enquiry forms: the utm values,
// referrer and landing page of the visit that brought someone to the site.

const STORAGE_KEY = 'ttp_attribution';
const UTM_PARAMS = [
  ['utm_source', 'source'],
  ['utm_medium', 'medium'],
  ['utm_campaign', 'campaign'],
  ['utm_term', 'term'],
  ['utm_content', 'content'],
] as const;

type UtmKey = (typeof UTM_PARAMS)[number][1];

export type Utm = Partial<Record<UtmKey, string>>;

type StoredAttribution = {
  utm: Utm;
  referrer: string;
  landingPage: string;
};

export type Attribution = {
  page: string;
  referrer: string;
  utm: Utm;
};

function utmFromUrl(): Utm {
  const utm: Utm = {};
  const params = new URLSearchParams(window.location.search);
  for (const [param, key] of UTM_PARAMS) {
    const value = params.get(param);
    if (value) utm[key] = value;
  }
  return utm;
}

function readStored(): StoredAttribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !parsed.utm || typeof parsed.utm !== 'object') return null;
    return parsed as StoredAttribution;
  } catch {
    return null;
  }
}

// Stores the first touch only, and only when the landing URL carries utm values.
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;
  const utm = utmFromUrl();
  if (Object.keys(utm).length === 0) return;
  if (readStored()) return;
  try {
    const stored: StoredAttribution = {
      utm,
      referrer: document.referrer,
      landingPage: window.location.pathname,
    };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Storage blocked: readAttribution falls back to the current URL.
  }
}

export function readAttribution(): Attribution {
  if (typeof window === 'undefined') return { page: '', referrer: '', utm: {} };
  const stored = readStored();
  return {
    page: window.location.pathname,
    referrer: stored ? stored.referrer : document.referrer,
    utm: stored ? stored.utm : utmFromUrl(),
  };
}
