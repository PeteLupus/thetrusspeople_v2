'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'framer-motion';
import ScrollReveal, {
    ScrollRevealItem,
} from '@/components/animations/ScrollReveal';
import { STATS } from '@/lib/constants';

function Counter({
    target,
    suffix,
    isInView,
}: {
    target: number;
    suffix: string;
    isInView: boolean;
}) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    const animate = useCallback(() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        const duration = 2000;
        const startTime = performance.now();

        const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [target]);

    useEffect(() => {
        if (isInView) animate();
    }, [isInView, animate]);

    return (
        <span className="font-heading text-4xl font-bold text-white md:text-5xl">
            {count}
            <span className="text-terracotta">{suffix}</span>
        </span>
    );
}

export default function Stats() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (
        <section className="bg-charcoal py-16 md:py-20" ref={ref}>
            <div className="mx-auto max-w-[1400px] px-6">
                <ScrollReveal stagger>
                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                        {STATS.map((stat, i) => (
                            <ScrollRevealItem key={i}>
                                <div className="text-center">
                                    <Counter
                                        target={stat.number}
                                        suffix={stat.suffix}
                                        isInView={isInView}
                                    />
                                    <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
                                </div>
                            </ScrollRevealItem>
                        ))}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
