'use client';

import Image from 'next/image';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import Accordion from '@/components/ui/Accordion';
import { ABOUT, ACCORDION_ITEMS } from '@/lib/constants';
import type { AccordionItem } from '@/lib/types';

interface AboutData {
  label?: string;
  title?: string;
  description?: string;
  image?: string;
}

interface AboutProps {
  data?: AboutData;
  accordionItems?: AccordionItem[];
}

function getImageSrc(image: AboutData['image']): string {
  if (!image) return ABOUT.image;
  if (typeof image === 'string') return image;
  return ABOUT.image;
}

export default function About({ data, accordionItems }: AboutProps) {
  const about = {
    label: data?.label ?? ABOUT.label,
    title: data?.title ?? ABOUT.title,
    description: data?.description ?? ABOUT.description,
    image: getImageSrc(data?.image),
  };
  const items = accordionItems ?? ACCORDION_ITEMS;

  return (
    <section id="about" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <ScrollReveal>
          <SectionHeader label={about.label} title={about.title} centered={false} />
        </ScrollReveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={about.image}
                alt="The Truss People — Brothers Victor and Tony Manoski"
                width={800}
                height={1000}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mb-8 text-base leading-relaxed text-text-light">{about.description}</p>
            <Accordion items={items} defaultOpenAll />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
