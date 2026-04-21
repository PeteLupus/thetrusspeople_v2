import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limit: 5 requests per 15 minutes per IP
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const timestamps = (rateLimitMap.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS);
    if (timestamps.length >= RATE_LIMIT) return true;
    timestamps.push(now);
    rateLimitMap.set(ip, timestamps);
    return false;
}

export async function POST(request: NextRequest) {
    try {
        // Rate limit by IP
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await request.json();

        // Honeypot — bots fill this in, humans don't see it
        if (body.website) {
            return NextResponse.json({ success: true });
        }

        const { name, email, phone, businessName, suburb, projectType, message } = body;

        // Validate required fields
        if (!name || !email || !phone || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if SendGrid is configured
        const apiKey = process.env.SENDGRID_API_KEY;
        const contactEmails = process.env.CONTACT_EMAIL;
        const fromEmail = process.env.SENDGRID_FROM_EMAIL || contactEmails?.split(',')[0]?.trim() || 'info@thetrusspeople.com.au';

        if (!apiKey || apiKey === 'your_sendgrid_api_key_here') {
            console.log('📧 Contact Form Submission (dev):', { name, email, phone, businessName, suburb, projectType, message });
            return NextResponse.json({ success: true, message: 'Form received (dev mode - email not sent)' });
        }

        const sgMail = (await import('@sendgrid/mail')).default;
        sgMail.setApiKey(apiKey);

        const recipients = contactEmails
            ? contactEmails.split(',').map((e) => e.trim()).filter(Boolean)
            : ['info@thetrusspeople.com.au'];

        await sgMail.send({
            to: recipients,
            from: fromEmail,
            replyTo: email,
            subject: `New Contact Request from ${name}${businessName ? ` (${businessName})` : ''}`,
            html: `
        <h2>New Contact Request</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
          ${businessName ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Business</td><td style="padding: 8px; border: 1px solid #ddd;">${businessName}</td></tr>` : ''}
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>
          ${suburb ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Suburb</td><td style="padding: 8px; border: 1px solid #ddd;">${suburb}</td></tr>` : ''}
          ${projectType ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Project Type</td><td style="padding: 8px; border: 1px solid #ddd;">${projectType}</td></tr>` : ''}
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Message</td><td style="padding: 8px; border: 1px solid #ddd;">${message}</td></tr>
        </table>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
