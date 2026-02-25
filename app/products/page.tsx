import Link from 'next/link';
import { getProducts, getProductPage } from '@/lib/sanity/queries';
import { PRODUCTS } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products & Services',
  description:
    'Timber roof trusses, wall frames, floor joists and I-joists — all 100% Australian-made at our Coolaroo facility, engineered to AS/NZS standards.',
};

export default async function ProductsPage() {
  const [products, pageData] = await Promise.all([getProducts(), getProductPage()]);

  const hero = pageData?.hero ?? {
    label: 'What We Make',
    title: 'Our Products & Services',
    description:
      'Every product is manufactured from 100% Australian timber at our Coolaroo facility. Custom-engineered to your plans. Delivered on time.',
  };

  return (
    <main>
      {/* Page Hero */}
      <section className="bg-charcoal pt-[80px] pb-16 md:pb-20">
        <div className="mx-auto max-w-[1400px] px-6 pt-12">
          <span className="mb-4 inline-block rounded-full bg-terracotta/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta">
            {hero.label}
          </span>
          <h1 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl">
            {hero.title}
          </h1>
          <p className="max-w-2xl text-lg text-gray-300">{hero.description}</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="bg-warm-white py-20">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid gap-10 md:grid-cols-2">
            {products.map((product: typeof PRODUCTS[0] & { _id?: string }, i: number) => (
              <div
                key={product._id ?? i}
                className="group rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:shadow-lg"
              >
                <h2 className="mb-3 font-heading text-2xl font-bold text-charcoal">
                  {product.title}
                </h2>
                <p className="mb-6 leading-relaxed text-text-light">{product.description}</p>

                {/* Features */}
                <ul className="mb-6 space-y-2">
                  {product.features.map((feat: string, j: number) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-text-light">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-timber/10 text-xs text-timber">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* Specs if available */}
                {(product as { specs?: { label: string; value: string }[] }).specs?.length ? (
                  <div className="mb-6 rounded-xl bg-warm-white p-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal">Specifications</p>
                    <dl className="grid grid-cols-2 gap-2">
                      {(product as unknown as { specs: { label: string; value: string }[] }).specs.map((spec, k: number) => (
                        <div key={k}>
                          <dt className="text-xs text-gray-400">{spec.label}</dt>
                          <dd className="text-sm font-medium text-charcoal">{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ) : null}

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

      {/* Why section from CMS or default */}
      {pageData?.whySection && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-[1400px] px-6">
            <h2 className="mb-12 text-center font-heading text-3xl font-bold text-charcoal">
              {pageData.whySection.title}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pageData.whySection.points?.map(
                (point: { title: string; description: string }, i: number) => (
                  <div key={i} className="rounded-xl bg-warm-white p-6">
                    <h3 className="mb-2 font-heading text-lg font-semibold text-charcoal">{point.title}</h3>
                    <p className="text-sm leading-relaxed text-text-light">{point.description}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-charcoal py-16">
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-white">
            {pageData?.ctaSection?.title ?? 'Ready to Get a Quote?'}
          </h2>
          <p className="mb-8 text-gray-400">
            {pageData?.ctaSection?.description ??
              'Tell us about your project and we\'ll get back to you with a detailed quote.'}
          </p>
          <Link
            href={pageData?.ctaSection?.buttonHref ?? '/quote'}
            className="inline-flex items-center gap-2 rounded-lg bg-terracotta px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-terracotta/80"
          >
            {pageData?.ctaSection?.buttonText ?? 'Get a Free Quote'}
          </Link>
        </div>
      </section>
    </main>
  );
}
