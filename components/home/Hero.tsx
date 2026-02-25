'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { HERO, TRUST_ITEMS } from '@/lib/constants';
import { slideInLeft, slideInRight, fadeInUp } from '@/lib/utils';
import { Shield, Check } from 'lucide-react';
import { urlFor } from '@/lib/sanity/image';
import type { TrustItem } from '@/lib/types';

interface HeroData {
  label?: string;
  title?: string;
  description?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  backgroundImage?: { asset?: { _ref?: string } } | string;
}

interface HeroProps {
  data?: HeroData;
  trustItems?: TrustItem[];
}

function getImageSrc(image: HeroData['backgroundImage']): string {
  if (!image) return HERO.backgroundImage;
  if (typeof image === 'string') return image;
  // Sanity image object
  if (image?.asset?._ref) return urlFor(image).width(1600).url();
  return HERO.backgroundImage;
}

export default function Hero({ data, trustItems }: HeroProps) {
  const hero = {
    label: data?.label ?? HERO.label,
    title: data?.title ?? HERO.title,
    description: data?.description ?? HERO.description,
    ctaPrimary: data?.ctaPrimary ?? HERO.ctaPrimary,
    ctaSecondary: data?.ctaSecondary ?? HERO.ctaSecondary,
    backgroundImage: getImageSrc(data?.backgroundImage),
  };
  const items = trustItems ?? TRUST_ITEMS;

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
        style={{ clipPath: 'polygon(0 0, 65% 0, 55% 100%, 0 100%)' }}
      >
        <Image
          src={hero.backgroundImage}
          alt="Timber roof trusses being manufactured"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/40" />
      </div>

      {/* Mobile background */}
      <div className="absolute inset-0 z-0 md:hidden">
        <Image
          src={hero.backgroundImage}
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
              {hero.label}
            </span>
            <h1
              className="mb-6 font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[3.2rem]"
              style={{ color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
              {hero.title}
            </h1>
            <p
              className="mb-8 max-w-xl text-base leading-relaxed text-white md:text-lg"
              style={{ color: '#ffffff', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
            >
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                href="/quote"
              >
                {hero.ctaPrimary}
              </Button>
              <Button
                variant="secondary"
                href="#products"
                onClick={(e) => handleScroll(e, '#products')}
              >
                {hero.ctaSecondary}
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
                <h3 className="font-heading text-lg font-semibold text-white">Why Choose Us</h3>
              </div>
              <div className="space-y-5">
                {items.map((item, i) => {
                  const content = (
                    <motion.div
                      key={i}
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.5 + i * 0.15 }}
                      whileHover={{ scale: 1.04, x: 4 }}
                      className="flex cursor-pointer items-start gap-4 rounded-xl p-3 -ml-3 transition-colors duration-300 hover:bg-white/10"
                    >
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 transition-all duration-300">
                        {item.icon === 'checkmark' ? (
                          <Check className="h-6 w-6 text-terracotta" />
                        ) : (
                          <span className="font-heading text-lg font-bold text-terracotta">{item.icon}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-heading text-sm font-semibold text-white">{item.title}</h4>
                        <p className="text-xs text-gray-400">{item.description}</p>
                      </div>
                    </motion.div>
                  );

                  if (item.href?.startsWith('#')) {
                    return (
                      <a key={i} href={item.href} onClick={(e) => handleScroll(e, item.href!)} className="block">
                        {content}
                      </a>
                    );
                  }
                  if (item.href) {
                    return <Link key={i} href={item.href} className="block">{content}</Link>;
                  }
                  return content;
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
