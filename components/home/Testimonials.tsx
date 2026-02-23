'use client';

import { Star } from 'lucide-react';
import ScrollReveal, { ScrollRevealItem } from '@/components/animations/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { TESTIMONIALS_SECTION, TESTIMONIALS } from '@/lib/constants';
import type { Testimonial } from '@/lib/types';

interface TestimonialsSectionData {
  label?: string;
  title?: string;
  description?: string;
}

interface TestimonialsProps {
  section?: TestimonialsSectionData;
  testimonials?: Testimonial[];
}

export default function Testimonials({ section, testimonials }: TestimonialsProps) {
  const s = {
    label: section?.label ?? TESTIMONIALS_SECTION.label,
    title: section?.title ?? TESTIMONIALS_SECTION.title,
    description: section?.description ?? TESTIMONIALS_SECTION.description,
  };
  const items = testimonials ?? TESTIMONIALS;

  return (
    <section id="testimonials" className="bg-warm-white py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <ScrollReveal>
          <SectionHeader label={s.label} title={s.title} description={s.description} />
        </ScrollReveal>

        <ScrollReveal stagger className="mt-14">
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((testimonial, i) => (
              <ScrollRevealItem key={(testimonial as { _id?: string })._id ?? i}>
                <div
                  className={`group flex h-full flex-col rounded-xl border-l-4 border-timber bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2.5 hover:border-terracotta hover:shadow-lg ${
                    i % 2 === 1 ? 'md:mt-8' : ''
                  }`}
                >
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: testimonial.stars }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-terracotta text-terracotta" />
                    ))}
                  </div>
                  <p className="mb-6 flex-1 text-sm italic leading-relaxed text-text-light">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-timber text-sm font-semibold text-white">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-heading text-sm font-semibold text-charcoal">{testimonial.author}</p>
                      <p className="text-xs text-text-light">{testimonial.company}</p>
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
