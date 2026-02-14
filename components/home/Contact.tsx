'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { MapPin, Phone, Mail, Upload, CheckCircle } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import {
    CONTACT_SECTION,
    CONTACT_INFO,
    PROJECT_TYPES,
    CERTIFICATIONS,
} from '@/lib/constants';

const contactSchema = z.object({
    businessName: z.string().optional(),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().min(1, 'Phone number is required'),
    suburb: z.string().optional(),
    projectType: z.string().optional(),
    message: z.string().min(1, 'Please provide some details'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const iconMap = {
    map: MapPin,
    phone: Phone,
    mail: Mail,
};

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [fileName, setFileName] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                setIsSuccess(true);
            }
        } catch {
            // Handle error silently
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setFileName(file.name);
    };

    return (
        <section id="contact" className="bg-warm-white py-20 md:py-28">
            <div className="mx-auto max-w-[1400px] px-6">
                <ScrollReveal>
                    <SectionHeader
                        label={CONTACT_SECTION.label}
                        title={CONTACT_SECTION.title}
                        description={CONTACT_SECTION.description}
                    />
                </ScrollReveal>

                <div className="mt-14 grid gap-12 lg:grid-cols-3">
                    {/* Form */}
                    <ScrollReveal className="lg:col-span-2">
                        {isSuccess ? (
                            <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-sm">
                                <CheckCircle className="mb-4 h-16 w-16 text-success" />
                                <h3 className="mb-2 font-heading text-2xl font-bold text-charcoal">
                                    Thank You!
                                </h3>
                                <p className="text-text-light">
                                    We&apos;ll be in touch within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className={`rounded-2xl bg-white p-8 shadow-sm md:p-10 ${isSubmitting ? 'pointer-events-none opacity-70' : ''
                                    }`}
                            >
                                <div className="grid gap-5 md:grid-cols-2">
                                    {/* Business Name */}
                                    <div className="relative">
                                        <input
                                            {...register('businessName')}
                                            id="businessName"
                                            type="text"
                                            placeholder=" "
                                            className="peer w-full rounded-lg border border-border px-4 pb-2 pt-6 text-sm text-charcoal transition-all focus:border-timber focus:ring-1 focus:ring-timber/20 focus:outline-none"
                                        />
                                        <label
                                            htmlFor="businessName"
                                            className="absolute left-4 top-2 text-xs text-text-light transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-timber"
                                        >
                                            Business Name
                                        </label>
                                    </div>

                                    {/* Name */}
                                    <div className="relative">
                                        <input
                                            {...register('name')}
                                            id="name"
                                            type="text"
                                            placeholder=" "
                                            className="peer w-full rounded-lg border border-border px-4 pb-2 pt-6 text-sm text-charcoal transition-all focus:border-timber focus:ring-1 focus:ring-timber/20 focus:outline-none"
                                        />
                                        <label
                                            htmlFor="name"
                                            className="absolute left-4 top-2 text-xs text-text-light transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-timber"
                                        >
                                            Your Name *
                                        </label>
                                        {errors.name && (
                                            <p className="mt-1 text-xs text-error">{errors.name.message}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="relative">
                                        <input
                                            {...register('email')}
                                            id="email"
                                            type="email"
                                            placeholder=" "
                                            className="peer w-full rounded-lg border border-border px-4 pb-2 pt-6 text-sm text-charcoal transition-all focus:border-timber focus:ring-1 focus:ring-timber/20 focus:outline-none"
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute left-4 top-2 text-xs text-text-light transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-timber"
                                        >
                                            Email Address *
                                        </label>
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-error">{errors.email.message}</p>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div className="relative">
                                        <input
                                            {...register('phone')}
                                            id="phone"
                                            type="tel"
                                            placeholder=" "
                                            className="peer w-full rounded-lg border border-border px-4 pb-2 pt-6 text-sm text-charcoal transition-all focus:border-timber focus:ring-1 focus:ring-timber/20 focus:outline-none"
                                        />
                                        <label
                                            htmlFor="phone"
                                            className="absolute left-4 top-2 text-xs text-text-light transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-timber"
                                        >
                                            Phone Number *
                                        </label>
                                        {errors.phone && (
                                            <p className="mt-1 text-xs text-error">{errors.phone.message}</p>
                                        )}
                                    </div>

                                    {/* Suburb */}
                                    <div className="relative">
                                        <input
                                            {...register('suburb')}
                                            id="suburb"
                                            type="text"
                                            placeholder=" "
                                            className="peer w-full rounded-lg border border-border px-4 pb-2 pt-6 text-sm text-charcoal transition-all focus:border-timber focus:ring-1 focus:ring-timber/20 focus:outline-none"
                                        />
                                        <label
                                            htmlFor="suburb"
                                            className="absolute left-4 top-2 text-xs text-text-light transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-timber"
                                        >
                                            Project Suburb
                                        </label>
                                    </div>

                                    {/* Project Type */}
                                    <div className="relative">
                                        <select
                                            {...register('projectType')}
                                            id="projectType"
                                            defaultValue=""
                                            className="w-full appearance-none rounded-lg border border-border px-4 py-4 text-sm text-charcoal transition-all focus:border-timber focus:ring-1 focus:ring-timber/20 focus:outline-none"
                                        >
                                            <option value="" disabled>
                                                Project Type
                                            </option>
                                            {PROJECT_TYPES.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* File Upload */}
                                <div className="mt-5">
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border px-6 py-6 transition-colors hover:border-timber hover:bg-timber/5"
                                    >
                                        <Upload className="h-5 w-5 text-text-light" />
                                        <span className="text-sm text-text-light">
                                            {fileName || 'Attach Project Plans (PDF, DWG, Images)'}
                                        </span>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".pdf,.dwg,.jpg,.jpeg,.png"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="relative mt-5">
                                    <textarea
                                        {...register('message')}
                                        id="message"
                                        rows={4}
                                        placeholder=" "
                                        className="peer w-full resize-none rounded-lg border border-border px-4 pb-2 pt-6 text-sm text-charcoal transition-all focus:border-timber focus:ring-1 focus:ring-timber/20 focus:outline-none"
                                    />
                                    <label
                                        htmlFor="message"
                                        className="absolute left-4 top-2 text-xs text-text-light transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-timber"
                                    >
                                        Additional Details *
                                    </label>
                                    {errors.message && (
                                        <p className="mt-1 text-xs text-error">{errors.message.message}</p>
                                    )}
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-6 w-full rounded-[6px] bg-terracotta px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isSubmitting ? 'Sending...' : 'Request a Quote'}
                                </button>
                            </form>
                        )}
                    </ScrollReveal>

                    {/* Sidebar */}
                    <ScrollReveal delay={0.2}>
                        <div className="space-y-6">
                            {/* Contact Info */}
                            {CONTACT_INFO.map((info, i) => {
                                const Icon = iconMap[info.icon];
                                return (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-timber/10">
                                            <Icon className="h-5 w-5 text-timber" />
                                        </div>
                                        <div>
                                            <h4 className="font-heading text-sm font-semibold text-charcoal">
                                                {info.title}
                                            </h4>
                                            {info.href ? (
                                                <a
                                                    href={info.href}
                                                    className="text-sm text-text-light transition-colors hover:text-timber"
                                                >
                                                    {info.content}
                                                </a>
                                            ) : (
                                                <p className="text-sm text-text-light">{info.content}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Certifications */}
                            <div className="mt-8 rounded-xl border border-border bg-white p-6">
                                <h4 className="mb-4 font-heading text-sm font-semibold text-charcoal">
                                    Certifications & Memberships
                                </h4>
                                <div className="flex gap-6">
                                    {CERTIFICATIONS.map((cert) => (
                                        <Image
                                            key={cert.name}
                                            src={cert.logo}
                                            alt={cert.name}
                                            width={80}
                                            height={50}
                                            className="h-auto w-[70px] object-contain grayscale transition-all duration-300 hover:grayscale-0"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
