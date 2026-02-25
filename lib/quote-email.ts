import type { CompletedFile } from './types';

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface QuoteEmailData {
  referenceNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  preferredContact: string;
  projectType: string;
  projectTypeOther?: string;
  projectStage: string;
  suburb: string;
  state: string;
  storeys: string;
  estimatedTimeline: string;
  additionalDetails?: string;
  files?: CompletedFile[];
  folderUrl?: string;
}

export function buildQuoteEmailHtml(data: QuoteEmailData): string {
  const projectTypeDisplay =
    data.projectType === 'Other' ? data.projectTypeOther || 'Other' : data.projectType;

  const contactMethod =
    data.preferredContact === 'either'
      ? 'Either'
      : data.preferredContact === 'email'
        ? 'Email'
        : 'Phone';

  const fileRows = data.files?.length
    ? data.files
        .map(
          (f) =>
            `<tr><td style="padding: 8px; border: 1px solid #ddd;">${f.name}</td><td style="padding: 8px; border: 1px solid #ddd;">${formatFileSize(f.size)}</td></tr>`
        )
        .join('')
    : '<tr><td style="padding: 8px; border: 1px solid #ddd;" colspan="2">No files uploaded</td></tr>';

  const storageLink = data.folderUrl
    ? `<p style="margin: 16px 0;"><a href="${data.folderUrl}" style="display: inline-block; background: #2681BC; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600;">View Uploaded Files</a></p>`
    : '';

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #222222; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #EE8925; margin: 0; font-size: 20px;">New Quote Request</h1>
        <p style="color: #9CA3AF; margin: 8px 0 0; font-size: 14px;">Reference: ${data.referenceNumber}</p>
      </div>

      <div style="padding: 24px; background: #ffffff; border: 1px solid #E5E7EB; border-top: none;">
        <h2 style="color: #222222; font-size: 16px; margin: 0 0 12px;">Contact Details</h2>
        <table style="border-collapse: collapse; width: 100%; margin-bottom: 24px;">
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; width: 40%;">Name</td><td style="padding: 8px; border: 1px solid #ddd;">${data.firstName} ${data.lastName}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td><td style="padding: 8px; border: 1px solid #ddd;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
          ${data.company ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Company</td><td style="padding: 8px; border: 1px solid #ddd;">${data.company}</td></tr>` : ''}
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Preferred Contact</td><td style="padding: 8px; border: 1px solid #ddd;">${contactMethod}</td></tr>
        </table>

        <h2 style="color: #222222; font-size: 16px; margin: 0 0 12px;">Project Details</h2>
        <table style="border-collapse: collapse; width: 100%; margin-bottom: 24px;">
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; width: 40%;">Project Type</td><td style="padding: 8px; border: 1px solid #ddd;">${projectTypeDisplay}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Project Stage</td><td style="padding: 8px; border: 1px solid #ddd;">${data.projectStage}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Storeys</td><td style="padding: 8px; border: 1px solid #ddd;">${data.storeys}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Location</td><td style="padding: 8px; border: 1px solid #ddd;">${data.suburb}, ${data.state}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Timeline</td><td style="padding: 8px; border: 1px solid #ddd;">${data.estimatedTimeline}</td></tr>
          ${data.additionalDetails ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Additional Details</td><td style="padding: 8px; border: 1px solid #ddd;">${data.additionalDetails}</td></tr>` : ''}
        </table>

        <h2 style="color: #222222; font-size: 16px; margin: 0 0 12px;">Uploaded Files</h2>
        <table style="border-collapse: collapse; width: 100%; margin-bottom: 16px;">
          <tr style="background: #F8F9FA;"><th style="padding: 8px; border: 1px solid #ddd; text-align: left;">File</th><th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Size</th></tr>
          ${fileRows}
        </table>

        ${storageLink}
      </div>

      <div style="padding: 16px 24px; background: #F8F9FA; border: 1px solid #E5E7EB; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="color: #6B7280; font-size: 12px; margin: 0;">Submitted via thetrusspeople.com.au/quote</p>
      </div>
    </div>
  `;
}

export function buildQuoteSummaryText(data: QuoteEmailData): string {
  const projectTypeDisplay =
    data.projectType === 'Other' ? data.projectTypeOther || 'Other' : data.projectType;

  const contactMethod =
    data.preferredContact === 'either'
      ? 'Either'
      : data.preferredContact === 'email'
        ? 'Email'
        : 'Phone';

  const fileList = data.files?.length
    ? data.files.map((f, i) => `${i + 1}. ${f.name} (${formatFileSize(f.size)})`).join('\n')
    : 'No files uploaded';

  return `QUOTE REQUEST - ${data.referenceNumber}
================================
Date: ${new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}

CONTACT DETAILS
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}${data.company ? `\nCompany: ${data.company}` : ''}
Preferred Contact: ${contactMethod}

PROJECT DETAILS
Type: ${projectTypeDisplay}
Stage: ${data.projectStage}
Storeys: ${data.storeys}
Location: ${data.suburb}, ${data.state}
Timeline: ${data.estimatedTimeline}${data.additionalDetails ? `\nAdditional Details: ${data.additionalDetails}` : ''}

UPLOADED FILES
${fileList}

================================
Submitted via thetrusspeople.com.au/quote
`;
}
