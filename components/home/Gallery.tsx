'use client';

import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal, { ScrollRevealItem } from '@/components/animations/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import { GALLERY_SECTION, GALLERY_ITEMS } from '@/lib/constants';
import { urlFor } from '@/lib/sanity/image';
import type { GalleryItem } from '@/lib/types';

interface GallerySectionData {
  label?: string;
  title?: string;
  description?: string;
}

interface GalleryProps {
  section?: GallerySectionData;
  items?: GalleryItem[];
}

function getImageSrc(image: GalleryItem['image']): string {
  if (!image) return '';
  if (typeof image === 'string') return image;
  if ((image as { asset?: { _ref?: string } })?.asset?._ref) {
    return urlFor(image as Parameters<typeof urlFor>[0]).width(800).url();
  }
  return '';
}

export default function Gallery({ section, items }: GalleryProps) {
  const s = {
    label: section?.label ?? GALLERY_SECTION.label,
    title: section?.title ?? GALLERY_SECTION.title,
    description: section?.description ?? GALLERY_SECTION.description,
  };
  const galleryItems = items ?? GALLERY_ITEMS;

  return (
    <section id="gallery" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <ScrollReveal>
          <SectionHeader label={s.label} title={s.title} description={s.description} />
        </ScrollReveal>

        <ScrollReveal stagger className="mt-14">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryItems.map((item, i) => (
              <ScrollRevealItem key={(item as { _id?: string })._id ?? i}>
                <div className="group relative overflow-hidden rounded-xl bg-gray-100 aspect-square">
                  <Image
                    src={getImageSrc(item.image) || '/assets/placeholder.jpg'}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-heading text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-gray-300">{item.description}</p>
                  </div>
                </div>
              </ScrollRevealItem>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-10 text-center">
          <Link
            href="/our-work"
            className="inline-flex items-center gap-2 rounded-lg border border-timber px-6 py-3 text-sm font-semibold text-timber transition-all duration-300 hover:bg-timber hover:text-white"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
