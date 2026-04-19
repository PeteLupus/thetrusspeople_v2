'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SERVICE_AREAS } from '@/lib/constants';

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 6 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } },
};

interface ServiceAreasProps {
  areas?: string[];
}

export default function ServiceAreas({ areas }: ServiceAreasProps) {
  const items = areas ?? SERVICE_AREAS;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="bg-charcoal py-12">
      <div className="mx-auto max-w-[1400px] px-6 text-center">
        <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-terracotta">
          Service Areas
        </p>
        <motion.div
          ref={ref}
          className="flex flex-wrap justify-center gap-3"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {items.map((area, i) => (
            <motion.span
              key={i}
              variants={pillVariants}
              className="rounded-full border border-white/30 px-4 py-1.5 text-sm text-white/80"
            >
              {area}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
