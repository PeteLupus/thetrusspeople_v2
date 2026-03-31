import Link from 'next/link';
import { PRODUCTS, PRODUCTS_SECTION } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products & Services',
  description:
    'Timber roof trusses, wall frames, floor joists and I-joists — all 100% Australian-made at our Coolaroo facility, engineered to AS/NZS standards.',
};

export default function ProductsPage() {
  return (
    <main>
      {/* Page Hero */}
      <section className="bg-charcoal pt-[80px] pb-16 md:pb-20">
        <div className="mx-auto max-w-[1400px] px-6 pt-12">
          <span className="mb-4 inline-block rounded-full bg-terracotta/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta">
            {PRODUCTS_SECTION.label}
          </span>
          <h1 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl">
            {PRODUCTS_SECTION.title}
          </h1>
          <p className="max-w-2xl text-lg text-gray-300">{PRODUCTS_SECTION.description}</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="bg-warm-white py-20">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid gap-10 md:grid-cols-2">
            {PRODUCTS.map((product, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:shadow-lg"
              >
                <h2 className="mb-3 font-heading text-2xl font-bold text-charcoal">
                  {product.title}
                </h2>
                <p className="mb-6 leading-relaxed text-text-light">{product.description}</p>

                <ul className="mb-6 space-y-2">
                  {product.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-text-light">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-timber/10 text-xs text-timber">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 rounded-lg bg-timber px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-terracotta"
                >
                  Request a Quote →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal py-16">
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-white">
            Ready to Get a Quote?
          </h2>
          <p className="mb-8 text-gray-400">
            Tell us about your project and we&apos;ll get back to you with a detailed quote.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-lg bg-terracotta px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-terracotta/80"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
