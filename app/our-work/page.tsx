'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import Lightbox from '@/components/ui/Lightbox';
import Button from '@/components/ui/Button';
import { OUR_WORK_ITEMS, INTERSTATE_PROJECTS } from '@/lib/constants';
import { fadeInUp } from '@/lib/utils';

export default function OurWorkPage() {
    const [lightbox, setLightbox] = useState<{
        isOpen: boolean;
        src: string;
        alt: string;
    }>({ isOpen: false, src: '', alt: '' });

    return (
        <div className="pt-[80px]">
            {/* Page Header */}
            <section className="bg-warm-white py-16 md:py-24">
                <div className="mx-auto max-w-[1400px] px-6">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                    >
                        <SectionHeader
                            label="Our Portfolio"
                            title="Precision Engineering in Action"
                            description="From custom residential homes to large-scale commercial developments, explore how our timber trusses and wall frames bring projects to life across Victoria."
                        />
                    </motion.div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="bg-white py-16 md:py-24">
                <div className="mx-auto max-w-[1400px] px-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {OUR_WORK_ITEMS.map((item, i) => (
                            <ScrollReveal
                                key={i}
                                className={item.large ? 'md:col-span-2' : ''}
                            >
                                <div
                                    className="group relative isolate cursor-pointer overflow-hidden rounded-xl"
                                    onClick={() =>
                                        setLightbox({
                                            isOpen: true,
                                            src: item.image,
                                            alt: item.title,
                                        })
                                    }
                                >
                                    <div
                                        className={`relative overflow-hidden rounded-xl ${item.large ? 'aspect-[21/9]' : 'aspect-[4/3]'
                                            }`}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes={
                                                item.large
                                                    ? '100vw'
                                                    : '(max-width: 768px) 100vw, 50vw'
                                            }
                                        />
                                    </div>
                                    {/* Location badge — always visible */}
                                    {item.location && (
                                        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-charcoal/75 px-3 py-1 backdrop-blur-sm">
                                            <svg className="h-3 w-3 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-xs font-medium text-white">{item.location}</span>
                                        </div>
                                    )}
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <h3 className="translate-y-4 font-heading text-xl font-semibold text-white transition-transform duration-300 group-hover:translate-y-0">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Beyond Victoria */}
            <section className="bg-warm-white py-16 md:py-24">
                <div className="mx-auto max-w-[1400px] px-6">
                    <ScrollReveal>
                        <SectionHeader
                            label="Interstate Delivery"
                            title="Beyond Victoria"
                            description="Our delivery reach goes further than Melbourne and regional Victoria. We've delivered truss and frame packages interstate — including South Australia, Tasmania, and New South Wales — handling oversize-load logistics, VicRoads permits, escort vehicles, and interstate transport coordination end-to-end."
                        />
                    </ScrollReveal>
                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {INTERSTATE_PROJECTS.map((item, i) => (
                            <ScrollReveal key={i}>
                                <div
                                    className="group relative isolate cursor-pointer overflow-hidden rounded-xl"
                                    onClick={() =>
                                        setLightbox({
                                            isOpen: true,
                                            src: item.image,
                                            alt: item.title,
                                        })
                                    }
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className={`object-cover transition-transform duration-500 group-hover:scale-110 ${item.imageHover ? 'transition-opacity group-hover:opacity-0' : ''}`}
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        {item.imageHover && (
                                            <Image
                                                src={item.imageHover}
                                                alt={item.title}
                                                fill
                                                className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        )}
                                    </div>
                                    {item.location && (
                                        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-charcoal/75 px-3 py-1 backdrop-blur-sm">
                                            <svg className="h-3 w-3 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-xs font-medium text-white">{item.location}</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <h3 className="translate-y-4 font-heading text-xl font-semibold text-white transition-transform duration-300 group-hover:translate-y-0">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-charcoal py-16 md:py-24">
                <div className="mx-auto max-w-[1400px] px-6 text-center">
                    <ScrollReveal>
                        <h2 className="mb-4 font-heading text-3xl font-bold text-white md:text-4xl">
                            Ready to Start Your Project?
                        </h2>
                        <p className="mx-auto mb-8 max-w-xl text-base text-gray-300">
                            Send us your plans and get a comprehensive quote within 24 hours.
                        </p>
                        <Button variant="primary" href="/quote">
                            Get a Free Quote
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </ScrollReveal>
                </div>
            </section>

            <Lightbox
                isOpen={lightbox.isOpen}
                imageSrc={lightbox.src}
                imageAlt={lightbox.alt}
                onClose={() => setLightbox({ isOpen: false, src: '', alt: '' })}
            />
        </div>
    );
}
