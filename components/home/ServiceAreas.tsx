'use client';

import { SERVICE_AREAS } from '@/lib/constants';

interface ServiceAreasProps {
  areas?: string[];
}

export default function ServiceAreas({ areas }: ServiceAreasProps) {
  const items = areas ?? SERVICE_AREAS;

  return (
    <section className="bg-charcoal py-12">
      <div className="mx-auto max-w-[1400px] px-6 text-center">
        <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-terracotta">
          Service Areas
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {items.map((area, i) => (
            <span
              key={i}
              className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-gray-300"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
