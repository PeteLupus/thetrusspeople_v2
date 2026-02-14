'use client';

import { Star } from 'lucide-react';
import ScrollReveal, {
    ScrollRevealItem,
} from '@/components/animations/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { TESTIMONIALS_SECTION, TESTIMONIALS } from '@/lib/constants';

export default function Testimonials() {
    return (
        <section id="testimonials" className="bg-warm-white py-20 md:py-28">
            <div className="mx-auto max-w-[1400px] px-6">
                <ScrollReveal>
                    <SectionHeader
                        label={TESTIMONIALS_SECTION.label}
                        title={TESTIMONIALS_SECTION.title}
                        description={TESTIMONIALS_SECTION.description}
                    />
                </ScrollReveal>

                <ScrollReveal stagger className="mt-14">
                    <div className="grid gap-6 md:grid-cols-3">
                        {TESTIMONIALS.map((testimonial, i) => (
                            <ScrollRevealItem key={i}>
                                <div
                                    className={`group flex h-full flex-col rounded-xl border-l-4 border-timber bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2.5 hover:border-terracotta hover:shadow-lg ${i % 2 === 1 ? 'md:mt-8' : ''
                                        }`}
                                >
                                    {/* Stars */}
                                    <div className="mb-4 flex gap-1">
                                        {Array.from({ length: testimonial.stars }).map((_, j) => (
                                            <Star
                                                key={j}
                                                className="h-4 w-4 fill-terracotta text-terracotta"
                                            />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <p className="mb-6 flex-1 text-sm italic leading-relaxed text-text-light">
                                        &ldquo;{testimonial.text}&rdquo;
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-timber text-sm font-semibold text-white">
                                            {testimonial.initials}
                                        </div>
                                        <div>
                                            <p className="font-heading text-sm font-semibold text-charcoal">
                                                {testimonial.author}
                                            </p>
                                            <p className="text-xs text-text-light">
                                                {testimonial.company}
                                            </p>
                                        </div>
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
