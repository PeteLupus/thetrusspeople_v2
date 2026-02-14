'use client';

import Image from 'next/image';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import Accordion from '@/components/ui/Accordion';
import { ABOUT, ACCORDION_ITEMS } from '@/lib/constants';

export default function About() {
    return (
        <section id="about" className="bg-white py-20 md:py-28">
            <div className="mx-auto max-w-[1400px] px-6">
                <ScrollReveal>
                    <SectionHeader
                        label={ABOUT.label}
                        title={ABOUT.title}
                        centered={false}
                    />
                </ScrollReveal>

                <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Image */}
                    <ScrollReveal>
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                            <Image
                                src={ABOUT.image}
                                alt="The Truss People factory"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </ScrollReveal>

                    {/* Text + Accordion */}
                    <ScrollReveal delay={0.2}>
                        <p className="mb-8 text-base leading-relaxed text-text-light">
                            {ABOUT.description}
                        </p>
                        <Accordion items={ACCORDION_ITEMS} />
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
