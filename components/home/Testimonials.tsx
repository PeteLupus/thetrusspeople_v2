'use client';

import { Star } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
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

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="group flex h-full w-[380px] flex-shrink-0 flex-col rounded-xl border border-gray-700 bg-gray-800 p-8 transition-all duration-300 hover:border-terracotta hover:shadow-lg">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: testimonial.stars }).map((_, j) => (
          <Star key={j} className="h-4 w-4 fill-terracotta text-terracotta" />
        ))}
      </div>
      <p className="mb-6 flex-1 text-base italic leading-relaxed text-gray-200">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta text-sm font-semibold text-white">
          {testimonial.initials}
        </div>
        <p className="font-display text-sm font-semibold text-white">{testimonial.author}</p>
      </div>
    </div>
  );
}

export default function Testimonials({ section, testimonials }: TestimonialsProps) {
  const s = {
    label: section?.label ?? TESTIMONIALS_SECTION.label,
    title: section?.title ?? TESTIMONIALS_SECTION.title,
    description: section?.description ?? TESTIMONIALS_SECTION.description,
  };
  const items = testimonials ?? TESTIMONIALS;

  // Duplicate items for seamless infinite scroll
  const marqueeItems = [...items, ...items];

  return (
    <section id="testimonials" className="bg-gray-900 py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6">
        <ScrollReveal>
          <SectionHeader label={s.label} title={s.title} description={s.description} light />
          <div className="mt-4 flex items-center justify-center gap-2">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-sm text-gray-400">Google Reviews</span>
          </div>
        </ScrollReveal>
      </div>

      {/* Infinite marquee */}
      <div className="relative mt-14">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-gray-900 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-gray-900 to-transparent" />

        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
          {marqueeItems.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
