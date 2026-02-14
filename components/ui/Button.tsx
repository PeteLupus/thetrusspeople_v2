import { cn } from '@/lib/utils';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
    type?: 'button' | 'submit';
    disabled?: boolean;
}

export default function Button({
    children,
    variant = 'primary',
    href,
    onClick,
    className = '',
    type = 'button',
    disabled = false,
}: ButtonProps) {
    const baseClasses =
        'inline-flex items-center justify-center gap-2 rounded-[6px] px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5';

    const variants = {
        primary:
            'bg-terracotta text-white hover:bg-charcoal hover:shadow-lg',
        secondary:
            'border-2 border-white/30 text-white hover:bg-white hover:text-charcoal',
    };

    const classes = cn(baseClasses, variants[variant], className);

    if (href) {
        return (
            <a href={href} onClick={onClick} className={classes}>
                {children}
            </a>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cn(classes, disabled && 'cursor-not-allowed opacity-70')}
        >
            {children}
        </button>
    );
}
