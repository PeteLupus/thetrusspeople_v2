import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Work — Timber Truss & Wall Frame Projects Melbourne',
    description:
        'See our portfolio of timber roof truss and wall frame projects across Melbourne and Victoria. Custom residential homes, multi-unit developments, and commercial builds.',
    keywords:
        'timber truss projects Melbourne, wall frame projects Victoria, roof truss gallery, truss installation photos, residential trusses Melbourne, commercial trusses Victoria',
    openGraph: {
        title: 'Our Work — Timber Truss & Wall Frame Projects | The Truss People',
        description:
            'Explore our portfolio of precision-engineered timber roof trusses and wall frames delivered across Greater Melbourne and regional Victoria.',
    },
};

export default function OurWorkLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
