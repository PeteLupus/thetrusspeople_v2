'use client';

import { useEffect, useRef, useState } from 'react';
import { STATS } from '@/lib/constants';
import type { StatItem } from '@/lib/types';

interface StatsProps {
  stats?: StatItem[];
}

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1500;
          const step = Math.ceil(target / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-heading text-4xl font-bold text-terracotta md:text-5xl">
      {count}{suffix}
    </span>
  );
}

export default function Stats({ stats }: StatsProps) {
  const items = stats ?? STATS;

  return (
    <section className="bg-charcoal py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {items.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <AnimatedNumber target={stat.number} suffix={stat.suffix} />
              <span className="mt-2 text-sm text-gray-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
