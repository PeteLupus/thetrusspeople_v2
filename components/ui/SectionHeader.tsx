'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
};

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  label,
  title,
  description,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const words = title.split(' ');

  return (
    <div ref={ref} className={centered ? 'text-center' : ''}>
      <span className="mb-3 inline-block rounded-full bg-terracotta/10 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
        {label}
      </span>
      <motion.h2
        className={`font-display text-3xl font-bold uppercase leading-tight tracking-tight md:text-4xl ${light ? 'text-white' : 'text-charcoal'}`}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className="mr-[0.3em] inline-block last:mr-0"
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>
      {description && (
        <p
          className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed ${light ? 'text-gray-300' : 'text-text-light'}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
