import { NextRequest, NextResponse } from 'next/server';
import { buildQuoteEmailHtml } from '@/lib/quote-email';
import { getResend } from '@/lib/mailer';

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
      estimatedTimeline, additionalDetails, files,
    } = body;

    if (!firstName || !lastName || !email || !phone || !projectType || !projectStage || !suburb || !storeys || !estimatedTimeline) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const referenceNumber = generateReferenceNumber();
    const fileMeta = (files || []) as { name: string; size: number; url: string }[];

    const emailData = {
      referenceNumber,
      firstName, lastName, email, phone, company,
      preferredContact: preferredContact || 'either',
      projectType, projectTypeOther,
      projectStage, suburb, state: state || 'VIC',
      storeys, estimatedTimeline, additionalDetails,
      files: fileMeta,
    };

    const apiKey = process.env.RESEND_API_KEY;
    const contactEmails = process.env.CONTACT_EMAIL;

    if (!apiKey) {
      console.log('📧 Quote Submission (dev mode):', emailData);
      return NextResponse.json({ success: true, referenceNumber });
    }

    const projectTypeDisplay =
      projectType === 'Other' ? projectTypeOther || 'Other' : projectType;

    const recipients = contactEmails
      ? contactEmails.split(',').map((e: string) => e.trim()).filter(Boolean)
      : ['info@thetrusspeople.com.au'];

    const resend = getResend();
    await resend.emails.send({
      from: 'The Truss People <notifications@thetrusspeople.com.au>',
      to: recipients,
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
