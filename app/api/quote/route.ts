import { NextRequest, NextResponse } from 'next/server';
import { createTextFile } from '@/lib/cloud-storage';
import { buildQuoteEmailHtml, buildQuoteSummaryText } from '@/lib/quote-email';

function generateReferenceNumber(): string {
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `QR-${date}-${code}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      firstName, lastName, email, phone, company,
      preferredContact, projectType, projectTypeOther,
      projectStage, suburb, state, storeys,
      estimatedTimeline, additionalDetails,
      files, folderId, folderUrl,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !projectType || !projectStage || !suburb || !storeys || !estimatedTimeline) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const referenceNumber = generateReferenceNumber();

    const emailData = {
      referenceNumber,
      firstName, lastName, email, phone, company,
      preferredContact: preferredContact || 'either',
      projectType, projectTypeOther,
      projectStage, suburb, state: state || 'VIC',
      storeys, estimatedTimeline, additionalDetails,
      files: files || [],
      folderUrl,
    };

    // Create summary.txt in GCS folder (if folder path exists)
    if (folderId) {
      try {
        const summaryText = buildQuoteSummaryText(emailData);
        await createTextFile(folderId, 'summary.txt', summaryText);
      } catch (err) {
        console.error('Failed to create summary file:', err);
        // Don't fail the whole submission over this
      }
    }

    // Send email notification via SendGrid
    const apiKey = process.env.SENDGRID_API_KEY;
    const contactEmails = process.env.CONTACT_EMAIL;
    const fromEmail = process.env.SENDGRID_FROM_EMAIL || contactEmails?.split(',')[0]?.trim() || 'info@thetrusspeople.com.au';

    if (!apiKey || apiKey === 'your_sendgrid_api_key_here') {
      // Dev mode — log and return success
      console.log('📧 Quote Submission (dev mode):', emailData);
      return NextResponse.json({ success: true, referenceNumber });
    }

    const sgMail = (await import('@sendgrid/mail')).default;
    sgMail.setApiKey(apiKey);

    const projectTypeDisplay =
      projectType === 'Other' ? projectTypeOther || 'Other' : projectType;

    // Support comma-separated CONTACT_EMAIL for multiple recipients
    const recipients = contactEmails
      ? contactEmails.split(',').map((e) => e.trim()).filter(Boolean)
      : ['info@thetrusspeople.com.au'];

    await sgMail.send({
      to: recipients,
      from: fromEmail,
      replyTo: email,
      subject: `Quote Request: ${firstName} ${lastName} — ${projectTypeDisplay} [${referenceNumber}]`,
      html: buildQuoteEmailHtml(emailData),
    });

    return NextResponse.json({ success: true, referenceNumber });
  } catch (error) {
    console.error('Quote submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit quote request' },
      { status: 500 }
    );
  }
}
