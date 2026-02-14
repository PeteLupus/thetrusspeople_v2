'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { HERO, TRUST_ITEMS } from '@/lib/constants';
import { slideInLeft, slideInRight, fadeInUp } from '@/lib/utils';
import { Shield, Check } from 'lucide-react';

export default function Hero() {
    const handleScroll = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <section
            id="home"
            className="relative min-h-screen overflow-hidden bg-charcoal pt-[80px]"
        >
            {/* Background Image with clip-path */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    clipPath: 'polygon(0 0, 65% 0, 55% 100%, 0 100%)',
                }}
            >
                <Image
                    src={HERO.backgroundImage}
                    alt="Timber roof trusses being manufactured"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/60 to-transparent" />
            </div>

            {/* Mobile background - full width */}
            <div className="absolute inset-0 z-0 md:hidden">
                <Image
                    src={HERO.backgroundImage}
                    alt=""
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-charcoal/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-[1400px] items-center px-6 py-16">
                <div className="grid w-full gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Text */}
                    <motion.div
                        variants={slideInLeft}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col justify-center"
                    >
                        <span className="mb-4 inline-block w-fit rounded-full bg-terracotta/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta">
                            {HERO.label}
                        </span>
                        <h1 className="mb-6 font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[3.2rem]">
                            {HERO.title}
                        </h1>
                        <p className="mb-8 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg">
                            {HERO.description}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button
                                variant="primary"
                                href="#contact"
                                onClick={(e) => handleScroll(e, '#contact')}
                            >
                                {HERO.ctaPrimary}
                            </Button>
                            <Button
                                variant="secondary"
                                href="#products"
                                onClick={(e) => handleScroll(e, '#products')}
                            >
                                {HERO.ctaSecondary}
                            </Button>
                        </div>
                    </motion.div>

                    {/* Trust Card */}
                    <motion.div
                        variants={slideInRight}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center justify-center lg:justify-end"
                    >
                        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-8 shadow-xl backdrop-blur-md">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta">
                                    <Shield className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="font-heading text-lg font-semibold text-white">
                                    Why Choose Us
                                </h3>
                            </div>
                            <div className="space-y-5">
                                {TRUST_ITEMS.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        variants={fadeInUp}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.5 + i * 0.15 }}
                                        whileHover={{ scale: 1.04, x: 4 }}
                                        className="flex cursor-pointer items-start gap-4 rounded-xl p-3 -ml-3 transition-colors duration-300 hover:bg-white/10"
                                    >
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 group-hover:bg-terracotta/20">
                                            {item.icon === 'checkmark' ? (
                                                <Check className="h-6 w-6 text-terracotta" />
                                            ) : (
                                                <span className="font-heading text-lg font-bold text-terracotta">
                                                    {item.icon}
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-heading text-sm font-semibold text-white">
                                                {item.title}
                                            </h4>
                                            <p className="text-xs text-gray-400">{item.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
