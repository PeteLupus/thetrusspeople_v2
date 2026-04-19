'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { HERO, TRUST_ITEMS } from '@/lib/constants';
import { slideInLeft, slideInRight, fadeInUp } from '@/lib/utils';
import { Shield, Check } from 'lucide-react';
import type { TrustItem } from '@/lib/types';

interface HeroData {
  label?: string;
  title?: string;
  description?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  backgroundImages?: string[];
}

interface HeroProps {
  data?: HeroData;
  trustItems?: TrustItem[];
}

export default function Hero({ data, trustItems }: HeroProps) {
  const hero = {
    label: data?.label ?? HERO.label,
    title: data?.title ?? HERO.title,
    description: data?.description ?? HERO.description,
    ctaPrimary: data?.ctaPrimary ?? HERO.ctaPrimary,
    ctaSecondary: data?.ctaSecondary ?? HERO.ctaSecondary,
    backgroundImages: data?.backgroundImages ?? HERO.backgroundImages,
  };
  const items = trustItems ?? TRUST_ITEMS;
  const [activeIndex, setActiveIndex] = useState(0);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % hero.backgroundImages.length);
  }, [hero.backgroundImages.length]);

  useEffect(() => {
    const timer = setInterval(advance, 5000);
    return () => clearInterval(timer);
  }, [advance]);

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
      {/* Full-bleed background images */}
      <div className="absolute inset-0 z-0">
        {hero.backgroundImages.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? "Timber roof trusses manufactured at The Truss People Coolaroo facility" : i === 1 ? "Wall frame and truss installation on a Melbourne residential build" : "Precision timber framing by The Truss People Melbourne"}
            fill
            className={`object-cover transition-opacity duration-1000 ${
              i === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
            priority={i === 0}
            sizes="100vw"
          />
        ))}
        {/* Gradient overlay — dark on left for text, fading to reveal image on right */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.10) 75%, rgba(0,0,0,0.15) 100%)',
          }}
        />
      </div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[5] opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-[1400px] items-center px-6 py-16">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_320px] lg:gap-12 xl:grid-cols-[1fr_360px]">
          {/* Text */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center"
          >
            <span className="mb-4 inline-block w-fit rounded-full bg-terracotta/20 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              {hero.label}
            </span>
            <h1
              className="mb-6 font-display text-4xl font-bold uppercase leading-none tracking-tight text-white md:text-6xl"
              style={{ color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
              <span className="block">Melbourne&apos;s Trusted</span>
              <span className="block">Timber Roof Truss,</span>
              <span className="block">Wall Frame &amp; Floor Joist</span>
              <span className="block">Manufacturer</span>
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
                href="/products"
              >
                {hero.ctaSecondary}
              </Button>
            </div>
          </motion.div>

          {/* Trust Card — compact */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center lg:justify-end"
          >
            <div className="w-full max-w-[320px] rounded-2xl border border-white/10 bg-black/30 p-6 shadow-xl backdrop-blur-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-heading text-base font-semibold text-white">Why Choose Us</h3>
              </div>
              <div className="space-y-3">
                {items.map((item, i) => {
                  const content = (
                    <motion.div
                      key={i}
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.5 + i * 0.15 }}
                      whileHover={{ scale: 1.04, x: 4 }}
                      className="flex cursor-pointer items-start gap-3 rounded-lg p-2 -ml-2 transition-colors duration-300 hover:bg-white/10"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 transition-all duration-300">
                        {item.icon === 'checkmark' ? (
                          <Check className="h-5 w-5 text-terracotta" />
                        ) : (
                          <span className="font-heading text-sm font-bold text-terracotta">{item.icon}</span>
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

      {/* Carousel indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {hero.backgroundImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-8 bg-terracotta' : 'w-2 bg-white/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
