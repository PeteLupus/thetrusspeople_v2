import type { Metadata } from 'next';
import QuoteForm from '@/components/quote/QuoteForm';
import { QUOTE_PAGE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Request a Quote',
  description:
    'Get a free quote for timber roof trusses, wall frames, and floor systems. Upload your plans and hear back within 24 hours.',
};

export default function QuotePage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="bg-charcoal pt-[80px] pb-16 md:pb-20">
        <div className="mx-auto max-w-[1400px] px-6 pt-12">
          <span className="mb-4 inline-block rounded-full bg-terracotta/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta">
            {QUOTE_PAGE.label}
          </span>
          <h1 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl">
            {QUOTE_PAGE.title}
          </h1>
          <p className="max-w-2xl text-lg text-gray-300">
            {QUOTE_PAGE.description}
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-warm-white py-16 md:py-20">
        <div className="mx-auto max-w-[1400px] px-6">
          <QuoteForm />
        </div>
      </section>
    </main>
  );
}
