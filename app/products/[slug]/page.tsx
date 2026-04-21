import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Shield, TreePine, Ruler, Truck, Leaf, Users, Clock, Zap, ChevronRight } from 'lucide-react';
import { PRODUCT_PAGES, PRODUCTS } from '@/lib/constants';
import type { Metadata } from 'next';
import type { ProductBenefit } from '@/lib/types';

const ICON_MAP: Record<ProductBenefit['icon'], React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  timber: TreePine,
  ruler: Ruler,
  truck: Truck,
  leaf: Leaf,
  users: Users,
  clock: Clock,
  zap: Zap,
};

export function generateStaticParams() {
  return Object.keys(PRODUCT_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCT_PAGES[slug];
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.metaTitle,
    description: product.metaDescription,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCT_PAGES[slug];
  if (!product) notFound();

  const relatedProducts = PRODUCTS.filter((p) => {
    const pSlug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    // Map product titles to slugs
    const slugMap: Record<string, string> = {
      'timber-roof-trusses': 'timber-roof-trusses',
      'wall-frames': 'wall-frames',
      'floor-joists': 'floor-joists',
      'floor-joists---multistruts': 'floor-joists',
      'floor-joists-multistruts': 'floor-joists',
      'steelwood': 'steelwood',
      'site-measuring': 'site-measuring',
      'franna-crane-rental': 'franna-crane-rental',
    };
    return (slugMap[pSlug] || pSlug) !== slug;
  });

  const getProductSlug = (title: string): string => {
    const map: Record<string, string> = {
      'Timber Roof Trusses': 'timber-roof-trusses',
      'Wall Frames': 'wall-frames',
      'Floor Joists': 'floor-joists',
      'Steelwood': 'steelwood',
      'Site Measuring': 'site-measuring',
      'Franna Crane Rental': 'franna-crane-rental',
    };
    return map[title] || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-charcoal pt-[80px]">
        <div className="absolute inset-0">
          {product.heroImage && (
            <Image
              src={product.heroImage}
              alt={product.title}
              fill
              className="object-cover opacity-30"
              priority
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/60" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 pb-16 pt-12 md:pb-20">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="transition-colors hover:text-white">Products</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-terracotta">{product.title}</span>
          </nav>

          <span className="mb-4 inline-block rounded-full bg-terracotta/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta">
            Our Products
          </span>
          <h1 className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {product.title}
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-gray-300">{product.tagline}</p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-lg bg-terracotta px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-terracotta/80"
          >
            Get a Free Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-warm-white py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {product.benefits.map((benefit, i) => {
              const Icon = ICON_MAP[benefit.icon];
              return (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-terracotta/10">
                    <Icon className="h-6 w-6 text-terracotta" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-bold text-charcoal">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-text-light">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Content */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="mb-4 inline-block rounded-full bg-terracotta/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta">
                About This Product
              </span>
              <h2 className="mb-8 font-heading text-3xl font-bold text-charcoal md:text-4xl">
                {product.title} Built to Last
              </h2>
              <div className="space-y-4">
                {product.content.map((paragraph, i) => (
                  <p key={i} className="text-base leading-relaxed text-text-light">{paragraph}</p>
                ))}
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-light">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-xs text-terracotta">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            {product.heroImage ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-auto">
                <Image
                  src={product.heroImage}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-charcoal/5 lg:aspect-auto">
                <p className="text-sm text-text-light">Image coming soon</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-warm-white py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full bg-terracotta/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta">
              How It Works
            </span>
            <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
              From Plans to Delivery
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {product.process.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-terracotta font-heading text-xl font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-charcoal">{step.step}</h3>
                <p className="text-sm leading-relaxed text-text-light">{step.description}</p>
                {i < product.process.length - 1 && (
                  <div className="absolute right-0 top-7 hidden h-px w-full translate-x-1/2 bg-border md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full bg-terracotta/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta">
              Explore More
            </span>
            <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
              Other Products
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedProducts.map((rp, i) => (
              <Link
                key={i}
                href={`/products/${getProductSlug(rp.title)}`}
                className="group overflow-hidden rounded-xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {rp.image && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={rp.image}
                      alt={rp.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="mb-2 font-heading text-lg font-bold text-charcoal">{rp.title}</h3>
                  <p className="mb-4 text-sm text-text-light line-clamp-2">{rp.shortDescription}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-terracotta transition-all group-hover:gap-3">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">
            Ready to Start Your Project?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-base text-gray-300">
            Send us your plans and get a comprehensive quote within 24 hours.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-lg bg-terracotta px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-terracotta/80"
          >
            Get a Free Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
