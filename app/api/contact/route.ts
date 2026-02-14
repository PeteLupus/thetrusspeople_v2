import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { name, email, phone, businessName, suburb, projectType, message } =
            body;

        // Validate required fields
        if (!name || !email || !phone || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if SendGrid is configured
        const apiKey = process.env.SENDGRID_API_KEY;
        const contactEmail = process.env.CONTACT_EMAIL;

        if (!apiKey || apiKey === 'your_sendgrid_api_key_here') {
            // In development, log the form data and return success
            console.log('📧 Contact Form Submission:', {
                name,
                email,
                phone,
                businessName,
                suburb,
                projectType,
                message,
            });
            return NextResponse.json({
                success: true,
                message: 'Form received (dev mode - email not sent)',
            });
        }

        // Send email via SendGrid
        const sgMail = (await import('@sendgrid/mail')).default;
        sgMail.setApiKey(apiKey);

        await sgMail.send({
            to: contactEmail || 'info@thetrusspeople.com.au',
            from: contactEmail || 'info@thetrusspeople.com.au',
            replyTo: email,
            subject: `New Quote Request from ${name}${businessName ? ` (${businessName})` : ''
                }`,
            html: `
        <h2>New Quote Request</h2>
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
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
