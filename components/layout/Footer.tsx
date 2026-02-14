import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';
import {
    FOOTER_COLUMNS,
    PHONE,
    PHONE_HREF,
    EMAIL,
    ADDRESS,
    FACEBOOK_URL,
    INSTAGRAM_URL,
} from '@/lib/constants';

export default function Footer() {
    return (
        <footer className="bg-charcoal text-white">
            <div className="mx-auto max-w-[1400px] px-6 py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <Link href="/">
                            <Image
                                src="/assets/logo.png"
                                alt="The Truss People"
                                width={160}
                                height={58}
                                className="mb-4 h-[50px] w-auto brightness-0 invert"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Family-owned timber roof truss and wall frame manufacturer in
                            Coolaroo, Melbourne. Precision-engineered, 100% Australian-made
                            products since 2006.
                        </p>

                        {/* Social Links */}
                        <div className="mt-5">
                            <p className="mb-3 text-sm font-medium text-gray-300">
                                Follow Us
                            </p>
                            <div className="flex gap-3">
                                <a
                                    href={FACEBOOK_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow us on Facebook"
                                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-terracotta hover:shadow-lg"
                                >
                                    <Facebook className="h-5 w-5 text-white" />
                                </a>
                                <a
                                    href={INSTAGRAM_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Follow us on Instagram"
                                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-terracotta hover:shadow-lg"
                                >
                                    <Instagram className="h-5 w-5 text-white" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Columns */}
                    {FOOTER_COLUMNS.map((col) => (
                        <div key={col.title}>
                            <h3 className="mb-4 font-heading text-base font-semibold text-white">
                                {col.title}
                            </h3>
                            <ul className="space-y-2">
                                {col.links.map((link) =>
                                    link.href.startsWith('/') ? (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-gray-400 transition-colors duration-300 hover:text-terracotta"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ) : (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                className="text-sm text-gray-400 transition-colors duration-300 hover:text-terracotta"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Column */}
                    <div>
                        <h3 className="mb-4 font-heading text-base font-semibold text-white">
                            Contact
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href={PHONE_HREF}
                                    className="text-sm text-gray-400 transition-colors hover:text-terracotta"
                                >
                                    {PHONE}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${EMAIL}`}
                                    className="text-sm text-gray-400 transition-colors hover:text-terracotta"
                                >
                                    {EMAIL}
                                </a>
                            </li>
                            <li>
                                <span className="text-sm text-gray-400">{ADDRESS}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-white/10 pt-6">
                    <p className="text-center text-xs text-gray-500">
                        © {new Date().getFullYear()} The Truss People. All rights reserved.
                        | Family-owned &amp; Australian-made since 2006.
                    </p>
                </div>
            </div>
        </footer>
    );
}
