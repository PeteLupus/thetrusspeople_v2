import ScrollReveal from '@/components/animations/ScrollReveal';
import { SERVICE_AREAS } from '@/lib/constants';

export default function ServiceAreas() {
    return (
        <section className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-[1400px] px-6 text-center">
                <ScrollReveal>
                    <h2 className="mb-3 font-heading text-2xl font-bold text-charcoal md:text-3xl">
                        Delivering Timber Roof Trusses & Wall Frames Across Victoria
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-sm text-text-light">
                        From our Coolaroo manufacturing facility, we supply timber roof
                        trusses, wall frames and floor joists to builders throughout Victoria.
                    </p>
                </ScrollReveal>
                <ScrollReveal>
                    <div className="flex flex-wrap justify-center gap-3">
                        {SERVICE_AREAS.map((area) => (
                            <span
                                key={area}
                                className="rounded-full bg-warm-white px-4 py-2 text-xs font-medium text-text-primary transition-colors duration-300 hover:bg-timber hover:text-white"
                            >
                                {area}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
