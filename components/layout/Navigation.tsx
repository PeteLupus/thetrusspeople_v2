'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_LINKS, PHONE, PHONE_HREF } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // Non-hash links (e.g. /our-work) — let default Link behavior handle it
        if (!href.startsWith('#')) return;

        e.preventDefault();
        setIsOpen(false);

        // If we're NOT on the home page, navigate there first with the hash
        if (pathname !== '/') {
            router.push('/' + href);
            return;
        }

        // On the home page, smooth-scroll to the section
        const el = document.querySelector(href);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled
                    ? 'bg-white/95 shadow-md backdrop-blur-[20px]'
                    : 'bg-white/90 backdrop-blur-[12px]'
            )}
        >
            <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3">
                {/* Logo */}
                <Link href="/" className="relative z-10 flex-shrink-0">
                    <Image
                        src="/assets/logo.png"
                        alt="The Truss People"
                        width={180}
                        height={65}
                        className="h-[55px] w-auto md:h-[65px]"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden items-center gap-8 md:flex">
                    {NAV_LINKS.map((link) =>
                        link.href.startsWith('#') ? (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="relative font-body text-sm font-medium text-text-primary transition-colors duration-300 hover:text-timber after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-terracotta after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {link.label}
                            </a>
                        ) : (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="relative font-body text-sm font-medium text-text-primary transition-colors duration-300 hover:text-timber after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-terracotta after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {link.label}
                            </Link>
                        )
                    )}
                </div>

                {/* Desktop CTA */}
                <div className="hidden items-center gap-4 md:flex">
                    <a
                        href={PHONE_HREF}
                        className="flex items-center gap-2 text-sm font-medium text-text-primary transition-colors hover:text-timber"
                    >
                        <Phone className="h-4 w-4" />
                        <span className="hidden lg:inline">{PHONE}</span>
                    </a>
                    <Link
                        href="/quote"
                        className="rounded-[6px] bg-terracotta px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:shadow-md"
                    >
                        Get Quote
                    </Link>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="relative z-10 flex h-10 w-10 items-center justify-center md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Mobile Menu Overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 md:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                )}

                {/* Mobile Menu Panel */}
                <div
                    className={cn(
                        'fixed right-0 top-0 z-50 h-full w-[70%] max-w-[320px] bg-white shadow-xl transition-transform duration-300 md:hidden',
                        isOpen ? 'translate-x-0' : 'translate-x-full'
                    )}
                >
                    <div className="flex h-full flex-col px-6 pt-20">
                        {NAV_LINKS.map((link) =>
                            link.href.startsWith('#') ? (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="border-b border-border py-4 font-heading text-lg font-medium text-charcoal transition-colors hover:text-timber"
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="border-b border-border py-4 font-heading text-lg font-medium text-charcoal transition-colors hover:text-timber"
                                >
                                    {link.label}
                                </Link>
                            )
                        )}
                        <div className="mt-6 space-y-3">
                            <a
                                href={PHONE_HREF}
                                className="flex items-center gap-2 text-sm font-medium text-text-primary"
                            >
                                <Phone className="h-4 w-4 text-timber" />
                                {PHONE}
                            </a>
                            <Link
                                href="/quote"
                                onClick={() => setIsOpen(false)}
                                className="block rounded-[6px] bg-terracotta px-5 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-charcoal"
                            >
                                Get a Free Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
