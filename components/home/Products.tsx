'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import ScrollReveal, { ScrollRevealItem } from '@/components/animations/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { PRODUCTS_SECTION, PRODUCTS } from '@/lib/constants';
import type { Product } from '@/lib/types';

function ProductIcon({ type }: { type: Product['icon'] }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-12 w-12 text-terracotta transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg]"
    >
      {type === 'truss' && (
        <>
          <path d="M4 38L24 8L44 38" />
          <path d="M10 38L24 18L38 38" />
          <line x1="4" y1="38" x2="44" y2="38" />
        </>
      )}
      {type === 'frame' && (
        <>
          <rect x="6" y="8" width="36" height="32" rx="2" />
          <line x1="16" y1="8" x2="16" y2="40" />
          <line x1="26" y1="8" x2="26" y2="40" />
          <line x1="36" y1="8" x2="36" y2="40" />
        </>
      )}
      {type === 'floor' && (
        <>
          <rect x="4" y="14" width="40" height="6" rx="1" />
          <rect x="4" y="24" width="40" height="6" rx="1" />
          <rect x="4" y="34" width="40" height="6" rx="1" />
        </>
      )}
      {type === 'ijoist' && (
        <>
          <line x1="4" y1="16" x2="44" y2="16" strokeWidth={3} />
          <line x1="4" y1="32" x2="44" y2="32" strokeWidth={3} />
          <line x1="24" y1="16" x2="24" y2="32" strokeWidth={2} />
          <circle cx="12" cy="24" r="3" />
          <circle cx="36" cy="24" r="3" />
        </>
      )}
    </svg>
  );
}

interface ProductsSectionData {
  label?: string;
  title?: string;
  description?: string;
}

interface ProductsProps {
  section?: ProductsSectionData;
  products?: Product[];
}

export default function Products({ section, products }: ProductsProps) {
  const s = {
    label: section?.label ?? PRODUCTS_SECTION.label,
    title: section?.title ?? PRODUCTS_SECTION.title,
    description: section?.description ?? PRODUCTS_SECTION.description,
  };
  const items = products ?? PRODUCTS;

  return (
    <section id="products" className="bg-warm-white py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <ScrollReveal>
          <SectionHeader label={s.label} title={s.title} description={s.description} />
        </ScrollReveal>

        <ScrollReveal stagger className="mt-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((product, i) => (
              <ScrollRevealItem key={product._id ?? i}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border border-t-4 border-t-transparent bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-t-terracotta hover:shadow-xl">
                  {/* Photo background */}
                  {product.image && (
                    <div className="absolute inset-0 opacity-[0.30] transition-opacity duration-500 group-hover:opacity-[0.45]">
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  {/* Light overlay for text readability */}
                  {product.image && (
                    <div className="absolute inset-0 bg-white/50 transition-colors duration-500 group-hover:bg-white/40" />
                  )}
                  <div className="relative z-10">
                    <div className="mb-5">
                      <ProductIcon type={product.icon} />
                    </div>
                    <h3 className="mb-3 font-display text-lg font-bold uppercase tracking-tight text-charcoal">{product.title}</h3>
                    <p className="mb-5 flex-1 text-sm leading-relaxed text-text-light">{product.description}</p>
                    <ul className="mb-5 space-y-2">
                      {product.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-text-light">
                          <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">✓</span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/quote"
                      className="group/link mt-auto inline-flex items-center gap-2 text-sm font-semibold text-terracotta transition-all duration-300 hover:gap-3 hover:text-terracotta/80"
                    >
                      Request a Quote
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>
              </ScrollRevealItem>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
