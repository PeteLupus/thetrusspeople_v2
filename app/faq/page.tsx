'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { TESTIMONIALS, TESTIMONIALS_SECTION, PHONE, PHONE_HREF } from '@/lib/constants';
import { fadeInUp } from '@/lib/utils';

const FAQ_ITEMS = [
    {
        title: 'What is your typical lead time for trusses and wall frames?',
        content:
            'Lead times vary depending on project size and our current production schedule. For standard residential projects we typically quote 2–4 weeks from plan approval to delivery. We confirm dates upfront and keep you informed throughout production — no surprises. If your build schedule is tight, call us early and we\'ll do everything we can to work around it.',
    },
    {
        title: 'Do I need engineering drawings or architectural plans to get a quote?',
        content:
            'Yes — to provide an accurate quote and engineer your trusses and frames correctly, we need your architectural or engineering plans. You can upload them directly through our quote form (we accept PDF, DWG, DXF, and image files up to 100MB). If you only have sketches or rough plans, call us first and we can advise on what information we need.',
    },
    {
        title: 'What areas do you deliver to?',
        content:
            'We deliver across Greater Melbourne and regional Victoria from our Coolaroo facility. This includes Geelong, Ballarat, Bendigo, the Mornington Peninsula, and the Bellarine Peninsula. We operate our own delivery fleet — we don\'t outsource to third-party carriers. For oversize loads, we organise escort vehicles, VicRoads permits, and traffic management.',
    },
    {
        title: 'Can you manufacture trusses for complex or non-standard roof designs?',
        content:
            'Yes. Our detailers handle standard gable, hip, Dutch gable, scissor, attic, and multi-level complex configurations. Every truss is engineered in-house to your specific plans using Multinail engineering software. If you\'re unsure whether your design is achievable, send us your plans and we\'ll assess it.',
    },
    {
        title: 'What timber standard do your products comply with?',
        content:
            'Our timber roof trusses and wall frames are engineered to AS1684 — the Australian standard for residential timber-framed construction. We use Multinail nail plates and connector systems, and all timber is sourced from trusted Australian suppliers including Meyer Timber, VTW, and City Timber.',
    },
    {
        title: 'Do you supply wall frames and floor systems, or trusses only?',
        content:
            'We supply complete framing packages: timber roof trusses, wall frames, and floor systems (Multistrut, Span Joists, Steelwood, and I-joists). Ordering your full framing package from us means everything is engineered to integrate seamlessly — no coordination issues between separate suppliers.',
    },
    {
        title: 'What is the difference between Multistrut and Steelwood floor systems?',
        content:
            'Multistrut is our standard engineered floor joist system suited to most residential spans. Steelwood uses solid timber chords with galvanised steel diagonal webs — it\'s engineered for longer spans (floor spans up to 10 metres, roof spans up to 20 metres) and higher load requirements. Steelwood is often used in light commercial applications and can reduce the need for concrete slabs, potentially saving up to 50% on slab construction costs. Our team can advise which system suits your project.',
    },
    {
        title: 'Do you offer crane hire for truss installation?',
        content:
            'Yes. We offer Franna crane hire with experienced operators who are familiar with timber framing. Our crane service can be coordinated with your delivery for a streamlined installation day. Contact us when requesting your quote to include crane hire.',
    },
    {
        title: 'Do you do on-site measuring?',
        content:
            'Yes. We offer a professional site measuring service to ensure your trusses, frames, and floor systems are manufactured to exact specifications before production begins. This eliminates costly errors and is included in most framing packages. Ask us about it when you get in touch.',
    },
    {
        title: 'Are you a family business?',
        content:
            'Yes. The Truss People was founded in 2006 by brothers Victor and Tony Manoski, who stepped in to save a struggling truss plant from closing. We operate from our Coolaroo facility with long-term employees who know the building industry inside out. When you call, you speak directly with our detailers, engineers, production leads, or the business owners — not a call centre.',
    },
];

export default function FAQPage() {
    return (
        <div className="pt-[80px]">
            {/* Page Header */}
            <section className="bg-warm-white py-16 md:py-24">
                <div className="mx-auto max-w-[1400px] px-6">
                    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
                        <SectionHeader
                            label="Frequently Asked Questions"
                            title="Everything You Need to Know"
                            description="Questions about lead times, delivery, products, or engineering standards — answered."
                        />
                    </motion.div>
                </div>
            </section>

            {/* FAQ Accordion */}
            <section className="bg-white py-16 md:py-24">
                <div className="mx-auto max-w-[900px] px-6">
                    <ScrollReveal>
                        <Accordion items={FAQ_ITEMS} />
                    </ScrollReveal>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-warm-white py-16 md:py-24">
                <div className="mx-auto max-w-[1400px] px-6">
                    <ScrollReveal>
                        <SectionHeader
                            label={TESTIMONIALS_SECTION.label}
                            title="What Our Clients Say"
                            description={TESTIMONIALS_SECTION.description}
                        />
                    </ScrollReveal>
                    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {TESTIMONIALS.map((testimonial, i) => (
                            <ScrollReveal key={i} delay={i * 0.05}>
                                <div className="flex h-full flex-col rounded-xl border border-border bg-white p-8">
                                    <div className="mb-4 flex gap-1">
                                        {Array.from({ length: testimonial.stars }).map((_, j) => (
                                            <Star key={j} className="h-4 w-4 fill-terracotta text-terracotta" />
                                        ))}
                                    </div>
                                    <p className="mb-6 flex-1 text-base italic leading-relaxed text-text-light">
                                        &ldquo;{testimonial.text}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta text-sm font-semibold text-white">
                                            {testimonial.initials}
                                        </div>
                                        <div>
                                            <p className="font-heading text-sm font-semibold text-charcoal">
                                                {testimonial.author}
                                            </p>
                                            <p className="text-xs text-text-light">{testimonial.company}</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-charcoal py-16 md:py-24">
                <div className="mx-auto max-w-[1400px] px-6 text-center">
                    <ScrollReveal>
                        <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">
                            Still Have Questions?
                        </h2>
                        <p className="mx-auto mb-8 max-w-xl text-base text-gray-300">
                            Call us on{' '}
                            <a href={PHONE_HREF} className="text-terracotta hover:underline">
                                {PHONE}
                            </a>{' '}
                            or send us your plans and we&rsquo;ll get back to you within 24 hours.
                        </p>
                        <Button variant="primary" href="/quote">
                            Get a Free Quote
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
