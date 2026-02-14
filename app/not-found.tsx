import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <h1 className="mb-4 font-heading text-7xl font-bold text-charcoal">
                404
            </h1>
            <h2 className="mb-2 font-heading text-2xl font-semibold text-charcoal">
                Page Not Found
            </h2>
            <p className="mb-8 max-w-md text-text-light">
                Sorry, the page you&apos;re looking for doesn&apos;t exist. Let&apos;s
                get you back on track.
            </p>
            <Link
                href="/"
                className="rounded-[6px] bg-terracotta px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:shadow-lg"
            >
                Back to Home
            </Link>
        </div>
    );
}
