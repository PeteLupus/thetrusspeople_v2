// TradeSorted — parent-brand mark. Self-contained inline SVG (no asset
// dependency, crisp at any size). Mirrors the Content Desk mark so the brand
// reads identically across TTP surfaces. `tone="dark"` for dark backgrounds
// (the site footer sits on charcoal); `tone="light"` for light surfaces.

interface TradeSortedMarkProps {
    size?: number;
    tone?: 'dark' | 'light';
    showWordmark?: boolean;
    className?: string;
}

export default function TradeSortedMark({
    size = 16,
    tone = 'dark',
    showWordmark = true,
    className = '',
}: TradeSortedMarkProps) {
    // On charcoal the "Trade" half needs to be light; on light surfaces it's
    // charcoal. "Sorted" stays terracotta either way (the brand accent).
    const badgeFill = tone === 'dark' ? '#EE8925' : '#222222';
    const checkStroke = tone === 'dark' ? '#FFFFFF' : '#EE8925';
    const tradeClass = tone === 'dark' ? 'text-gray-200' : 'text-charcoal';

    return (
        <span className={`inline-flex items-center gap-1.5 align-middle ${className}`}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                role="img"
                aria-label="TradeSorted"
            >
                <rect width="24" height="24" rx="6.5" fill={badgeFill} />
                <path
                    d="M6.5 12.6l3.4 3.4L17.8 7.6"
                    stroke={checkStroke}
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            {showWordmark && (
                <span
                    className="font-heading font-semibold leading-none tracking-tight"
                    style={{ fontSize: `${Math.round(size * 0.92)}px` }}
                >
                    <span className={tradeClass}>Trade</span>
                    <span className="text-terracotta">Sorted</span>
                </span>
            )}
        </span>
    );
}
