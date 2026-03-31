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
    return (
        <div className={centered ? 'text-center' : ''}>
            <span className="mb-3 inline-block rounded-full bg-terracotta/10 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                {label}
            </span>
            <h2
                className={`font-display text-3xl font-bold uppercase leading-tight tracking-tight md:text-4xl ${light ? 'text-white' : 'text-charcoal'
                    }`}
            >
                {title}
            </h2>
            {description && (
                <p
                    className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed ${light ? 'text-gray-300' : 'text-text-light'
                        }`}
                >
                    {description}
                </p>
            )}
        </div>
    );
}
