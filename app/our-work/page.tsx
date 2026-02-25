'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal, {
    ScrollRevealItem,
} from '@/components/animations/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import Lightbox from '@/components/ui/Lightbox';
import Button from '@/components/ui/Button';
import { OUR_WORK_ITEMS } from '@/lib/constants';
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
                    <ScrollReveal stagger>
                        <div className="grid gap-6 md:grid-cols-2">
                            {OUR_WORK_ITEMS.map((item, i) => (
                                <ScrollRevealItem
                                    key={i}
                                    className={item.large ? 'md:col-span-2' : ''}
                                >
                                    <div
                                        className="group relative cursor-pointer overflow-hidden rounded-xl"
                                        onClick={() =>
                                            setLightbox({
                                                isOpen: true,
                                                src: item.image,
                                                alt: item.title,
                                            })
                                        }
                                    >
                                        <div
                                            className={`relative ${item.large ? 'aspect-[21/9]' : 'aspect-[4/3]'
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
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            <h3 className="translate-y-4 font-heading text-xl font-semibold text-white transition-transform duration-300 group-hover:translate-y-0">
                                                {item.title}
                                            </h3>
                                            <p className="translate-y-4 text-sm text-gray-300 transition-transform duration-300 delay-75 group-hover:translate-y-0">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </ScrollRevealItem>
                            ))}
                        </div>
                    </ScrollReveal>
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
