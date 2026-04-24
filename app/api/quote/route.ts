import { NextRequest, NextResponse } from 'next/server';
import { buildQuoteEmailHtml } from '@/lib/quote-email';
import { getResend } from '@/lib/mailer';

const MAX_TOTAL_BYTES = 30 * 1024 * 1024; // 30MB combined attachment limit

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
    const formData = await request.formData();

    const rawData = formData.get('data');
    if (!rawData || typeof rawData !== 'string') {
      return NextResponse.json({ error: 'Missing form data' }, { status: 400 });
    }

    const body = JSON.parse(rawData);
    const {
      firstName, lastName, email, phone, company,
      preferredContact, projectType, projectTypeOther,
      projectStage, suburb, state, storeys,
      estimatedTimeline, additionalDetails,
    } = body;

    if (!firstName || !lastName || !email || !phone || !projectType || !projectStage || !suburb || !storeys || !estimatedTimeline) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Collect uploaded files
    const uploadedFiles = formData.getAll('files') as File[];
    const validFiles = uploadedFiles.filter((f) => f.size > 0);

    // Guard total size
    const totalBytes = validFiles.reduce((sum, f) => sum + f.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      return NextResponse.json(
        { error: 'Total file size exceeds 30 MB limit' },
        { status: 413 }
      );
    }

    const referenceNumber = generateReferenceNumber();

    const fileMeta = validFiles.map((f) => ({ name: f.name, size: f.size }));

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

    // Build attachments for Resend
    const attachments = await Promise.all(
      validFiles.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    const resend = getResend();
    await resend.emails.send({
      from: 'The Truss People <notifications@thetrusspeople.com.au>',
      to: recipients,
      replyTo: email,
      subject: `Quote Request: ${firstName} ${lastName} — ${projectTypeDisplay} [${referenceNumber}]`,
      html: buildQuoteEmailHtml(emailData),
      attachments: attachments.length > 0 ? attachments : undefined,
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
