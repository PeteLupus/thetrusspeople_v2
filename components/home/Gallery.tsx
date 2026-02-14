'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal, {
    ScrollRevealItem,
} from '@/components/animations/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { GALLERY_SECTION, GALLERY_ITEMS } from '@/lib/constants';

export default function Gallery() {
    return (
        <section id="gallery" className="bg-white py-20 md:py-28">
            <div className="mx-auto max-w-[1400px] px-6">
                <ScrollReveal>
                    <SectionHeader
                        label={GALLERY_SECTION.label}
                        title={GALLERY_SECTION.title}
                        description={GALLERY_SECTION.description}
                    />
                </ScrollReveal>

                <ScrollReveal stagger className="mt-14">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {GALLERY_ITEMS.map((item, i) => (
                            <ScrollRevealItem key={i}>
                                <Link href="/our-work" className="group block">
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        />
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/80 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            <h3 className="translate-y-4 font-heading text-base font-semibold text-white transition-transform duration-300 group-hover:translate-y-0">
                                                {item.title}
                                            </h3>
                                            <p className="translate-y-4 text-xs text-gray-300 transition-transform duration-300 delay-75 group-hover:translate-y-0">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </ScrollRevealItem>
                        ))}
                    </div>
                </ScrollReveal>

                {/* CTA */}
                <ScrollReveal className="mt-10 text-center">
                    <Link
                        href="/our-work"
                        className="group inline-flex items-center gap-2 rounded-[6px] border-2 border-timber px-7 py-3.5 text-sm font-semibold text-timber transition-all duration-300 hover:-translate-y-0.5 hover:bg-timber hover:text-white hover:shadow-md"
                    >
                        View All Projects
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </ScrollReveal>
            </div>
        </section>
    );
}
