import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS, PRODUCTS_SECTION } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products & Services | The Truss People',
  description:
    'Timber roof trusses, wall frames, floor joists, Multistruts and Steelwood systems — all 100% Australian-made at our Coolaroo facility, engineered to AS1684 and relevant building codes.',
};

const SLUG_MAP: Record<string, string> = {
  'Timber Roof Trusses': 'timber-roof-trusses',
  'Wall Frames': 'wall-frames',
  'Floor Joists': 'floor-joists',
  'Steelwood': 'steelwood',
  'Site Measuring': 'site-measuring',
  'Franna Crane Rental': 'franna-crane-rental',
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
          <div className="grid gap-8 md:grid-cols-2">
            {PRODUCTS.map((product, i) => {
              const slug = SLUG_MAP[product.title] || product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
                <Link
                  key={i}
                  href={`/products/${slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {product.image ? (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                      <h2 className="absolute bottom-4 left-6 font-heading text-2xl font-bold text-white">
                        {product.title}
                      </h2>
                    </div>
                  ) : (
                    <div className="relative flex aspect-[16/9] items-center justify-center bg-charcoal/5">
                      <h2 className="font-heading text-2xl font-bold text-charcoal">
                        {product.title}
                      </h2>
                    </div>
                  )}
                  <div className="p-8">
                    <p className="mb-6 leading-relaxed text-text-light">{product.shortDescription}</p>
                    <ul className="mb-6 space-y-2">
                      {product.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-text-light">
                          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-xs text-terracotta">✓</span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-terracotta transition-all duration-300 group-hover:gap-3">
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
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
