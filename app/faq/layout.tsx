import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thetrusspeople.com.au';

export const metadata: Metadata = {
    title: 'FAQ | The Truss People',
    description:
        'Frequently asked questions about timber roof trusses, wall frames, floor joists and delivery from The Truss People — Melbourne\'s trusted truss manufacturer since 2006.',
    alternates: {
        canonical: `${BASE_URL}/faq`,
    },
    openGraph: {
        title: 'FAQ | The Truss People',
        description:
            'Answers to common questions about trusses, lead times, delivery, AS1684 standards, and our complete framing products.',
        type: 'website',
        url: `${BASE_URL}/faq`,
        locale: 'en_AU',
        siteName: 'The Truss People',
    },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
