'use client';

import { ArrowRight } from 'lucide-react';
import ScrollReveal, {
    ScrollRevealItem,
} from '@/components/animations/ScrollReveal';
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
            className="h-12 w-12 text-timber transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg]"
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

export default function Products() {
    return (
        <section id="products" className="bg-warm-white py-20 md:py-28">
            <div className="mx-auto max-w-[1400px] px-6">
                <ScrollReveal>
                    <SectionHeader
                        label={PRODUCTS_SECTION.label}
                        title={PRODUCTS_SECTION.title}
                        description={PRODUCTS_SECTION.description}
                    />
                </ScrollReveal>

                <ScrollReveal stagger className="mt-14">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {PRODUCTS.map((product, i) => (
                            <ScrollRevealItem key={i}>
                                <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                                    {/* Top border animation */}
                                    <div className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-terracotta transition-transform duration-500 group-hover:scale-x-100" />

                                    {/* Icon */}
                                    <div className="mb-5">
                                        <ProductIcon type={product.icon} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="mb-3 font-heading text-lg font-semibold text-charcoal">
                                        {product.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="mb-5 flex-1 text-sm leading-relaxed text-text-light">
                                        {product.description}
                                    </p>

                                    {/* Features */}
                                    <ul className="mb-5 space-y-2">
                                        {product.features.map((feat, j) => (
                                            <li
                                                key={j}
                                                className="flex items-start gap-2 text-xs text-text-light"
                                            >
                                                <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-timber/10 text-timber">
                                                    ✓
                                                </span>
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <a
                                        href="#contact"
                                        className="group/link mt-auto inline-flex items-center gap-2 text-sm font-semibold text-timber transition-all duration-300 hover:gap-3"
                                    >
                                        Request a Quote
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                                    </a>
                                </div>
                            </ScrollRevealItem>
                        ))}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
