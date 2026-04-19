'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import ScrollReveal, { ScrollRevealItem } from '@/components/animations/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { PRODUCTS_SECTION, PRODUCTS } from '@/lib/constants';
import type { Product } from '@/lib/types';

const SHORT_DESCRIPTIONS: Record<string, string> = {
  'Timber Roof Trusses':
    'Custom-engineered roof trusses for residential and light commercial builds. AS certified, 100% Australian timber.',
  'Wall Frames':
    'Precision timber wall frames, pre-cut and site-ready. Custom-designed to your plans and delivered on schedule.',
  'Floor Joists':
    'Multistrut, Span Joists, Steelwood and I-joist systems. Complete floor framing solutions — load-optimized and site-ready.',
  'Steelwood':
    'Timber and galvanised steel trusses spanning up to 10m floors. Reduces concrete slab costs by up to 50%.',
  'Site Measuring':
    'Professional on-site measuring to ensure your framing is manufactured to exact specifications.',
  'Franna Crane Rental':
    'Franna crane hire with experienced operators to safely lift and position your trusses on site.',
  'Delivery':
    'Direct-to-site delivery across Melbourne and regional Victoria with our own fleet. On time, every time.',
};

interface ProductsSectionData {
  label?: string;
  title?: string;
  description?: string;
}

interface ProductsProps {
  section?: ProductsSectionData;
  products?: Product[];
}

const SLUG_MAP: Record<string, string> = {
  'Timber Roof Trusses': 'timber-roof-trusses',
  'Wall Frames': 'wall-frames',
  'Floor Joists': 'floor-joists',
  'Steelwood': 'steelwood',
  'Site Measuring': 'site-measuring',
  'Franna Crane Rental': 'franna-crane-rental',
  'Delivery': 'delivery',
};

const TIMBER_TITLES = new Set([
  'Timber Roof Trusses',
  'Wall Frames',
  'Floor Joists',
  'Steelwood',
]);

function ProductCard({ product, index }: { product: Product; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 400, damping: 30 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <ScrollRevealItem key={product._id ?? index}>
      <div style={{ perspective: '1000px' }} className="h-full">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white transition-shadow duration-300 hover:shadow-xl"
        >
          {product.image && (
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/60 to-transparent" />
            </div>
          )}

          <div className="flex flex-1 flex-col p-5">
            <h3 className="mb-2 font-display text-lg font-bold uppercase tracking-tight text-charcoal">
              {product.title}
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-text-light">
              {SHORT_DESCRIPTIONS[product.title] ?? product.description}
            </p>

            <div className="mt-auto flex items-center gap-3">
              <Link
                href={`/products/${SLUG_MAP[product.title] || product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal transition-all duration-300 hover:text-terracotta"
              >
                Learn More
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
              </Link>
              <Link
                href="/quote"
                className="ml-auto inline-flex items-center rounded-lg bg-terracotta px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-terracotta/85 hover:shadow-md"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </ScrollRevealItem>
  );
}

export default function Products({ section, products }: ProductsProps) {
  const s = {
    label: section?.label ?? PRODUCTS_SECTION.label,
    title: section?.title ?? PRODUCTS_SECTION.title,
    description: section?.description ?? PRODUCTS_SECTION.description,
  };
  const items = products ?? PRODUCTS;

  const timberProducts = items.filter((p) => TIMBER_TITLES.has(p.title));
  const serviceProducts = items.filter((p) => !TIMBER_TITLES.has(p.title));

  return (
    <section id="products" className="bg-warm-white py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <ScrollReveal>
          <SectionHeader label={s.label} title={s.title} description={s.description} />
        </ScrollReveal>

        <ScrollReveal stagger className="mt-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {timberProducts.map((product, i) => (
              <ProductCard key={product._id ?? i} product={product} index={i} />
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal stagger className="mt-6">
          <div className="flex justify-center">
            <div className="grid w-full max-w-[1050px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {serviceProducts.map((product, i) => (
                <ProductCard key={product._id ?? `svc-${i}`} product={product} index={i + timberProducts.length} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
