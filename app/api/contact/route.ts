import { NextRequest, NextResponse } from 'next/server';
import { getResend } from '@/lib/mailer';

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

        const apiKey = process.env.RESEND_API_KEY;
        const contactEmails = process.env.CONTACT_EMAIL;

        if (!apiKey) {
            console.log('📧 Contact Form Submission (dev):', { name, email, phone, businessName, suburb, projectType, message });
            return NextResponse.json({ success: true, message: 'Form received (dev mode - email not sent)' });
        }

        const recipients = contactEmails
            ? contactEmails.split(',').map((e) => e.trim()).filter(Boolean)
            : ['info@thetrusspeople.com.au'];

        const resend = getResend();
        await resend.emails.send({
            from: 'The Truss People <notifications@thetrusspeople.com.au>',
            to: recipients,
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
