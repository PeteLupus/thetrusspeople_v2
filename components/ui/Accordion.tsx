'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { AccordionItem as AccordionItemType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AccordionProps {
    items: AccordionItemType[];
}

export default function Accordion({ items }: AccordionProps) {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const toggle = (index: number) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    return (
        <div className="space-y-3">
            {items.map((item, i) => {
                const isActive = activeIndex === i;
                return (
                    <div
                        key={i}
                        className="overflow-hidden rounded-xl border border-border bg-white transition-shadow duration-300 hover:shadow-sm"
                    >
                        <button
                            onClick={() => toggle(i)}
                            className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors duration-300"
                            aria-expanded={isActive}
                        >
                            <span className="font-heading text-base font-semibold text-charcoal">
                                {item.title}
                            </span>
                            <span
                                className={cn(
                                    'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-400',
                                    isActive
                                        ? 'rotate-45 bg-terracotta text-white'
                                        : 'bg-warm-white text-charcoal'
                                )}
                            >
                                <Plus className="h-4 w-4" />
                            </span>
                        </button>
                        <AnimatePresence initial={false}>
                            {isActive && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                >
                                    <div className="px-6 pb-5 text-sm leading-relaxed text-text-light">
                                        {item.content}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
