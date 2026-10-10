// Prints the quote and contact payloads buildLeadPayload makes, one JSON line each.
// Run: node --experimental-strip-types scripts/check-lead-ledger.ts
// @ts-expect-error: Node needs the .ts extension to load this file; tsc refuses it without allowImportingTsExtensions.
import { buildLeadPayload } from '../lib/leadLedger.ts';

const quote = buildLeadPayload({
  type: 'quote',
  firstName: 'Test',
  lastName: 'Person',
  email: 'test@example.com',
  phone: '0400 000 000',
  company: 'Example Builds',
  suburb: 'Kew',
  projectType: 'Other',
  projectTypeOther: 'Custom thing',
  additionalDetails: 'Hello',
  reference: 'QR-20261010-TEST',
  page: '/quote',
  referrer: 'https://www.google.com/',
  utm: { source: 'google', medium: 'cpc', campaign: 'x', junk: 'dropped' },
});

const contact = buildLeadPayload({
  type: 'contact',
  name: 'Test Person',
  email: 'test@example.com',
  phone: '0400 000 000',
  message: 'Hi',
});

console.log(JSON.stringify(quote));
console.log(JSON.stringify(contact));
