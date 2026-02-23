'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import { CONTACT_SECTION, PROJECT_TYPES, PHONE, EMAIL, ADDRESS } from '@/lib/constants';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

interface ContactSectionData {
  label?: string;
  title?: string;
  description?: string;
}

interface ContactInfoData {
  phone?: string;
  email?: string;
  address?: string;
}

interface ContactProps {
  section?: ContactSectionData;
  contactInfo?: ContactInfoData;
}

export default function Contact({ section, contactInfo }: ContactProps) {
  const s = {
    label: section?.label ?? CONTACT_SECTION.label,
    title: section?.title ?? CONTACT_SECTION.title,
    description: section?.description ?? CONTACT_SECTION.description,
  };
  const phone = contactInfo?.phone ?? PHONE;
  const email = contactInfo?.email ?? EMAIL;
  const address = contactInfo?.address ?? ADDRESS;

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <ScrollReveal>
          <SectionHeader label={s.label} title={s.title} description={s.description} />
        </ScrollReveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <ScrollReveal>
            <div className="space-y-6">
              <div className="flex items-start gap-4 rounded-xl bg-warm-white p-5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-timber/10">
                  <MapPin className="h-5 w-5 text-timber" />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-charcoal">Visit Our Factory</p>
                  <p className="text-sm text-text-light">{address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-warm-white p-5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-timber/10">
                  <Phone className="h-5 w-5 text-timber" />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-charcoal">Call Us</p>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-sm text-timber hover:underline">{phone}</a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-warm-white p-5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-timber/10">
                  <Mail className="h-5 w-5 text-timber" />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-charcoal">Email Us</p>
                  <a href={`mailto:${email}`} className="text-sm text-timber hover:underline">{email}</a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal delay={0.2}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <input
                    {...register('name')}
                    placeholder="Your Name *"
                    className="w-full rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-timber"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <input
                    {...register('email')}
                    placeholder="Email Address *"
                    className="w-full rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-timber"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  {...register('phone')}
                  placeholder="Phone Number"
                  className="w-full rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-timber"
                />
                <input
                  {...register('company')}
                  placeholder="Company Name"
                  className="w-full rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-timber"
                />
              </div>

              <div>
                <select
                  {...register('projectType')}
                  className="w-full rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-timber"
                >
                  <option value="">Select Project Type *</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.projectType && <p className="mt-1 text-xs text-red-500">{errors.projectType.message}</p>}
              </div>

              <div>
                <textarea
                  {...register('message')}
                  placeholder="Tell us about your project *"
                  rows={4}
                  className="w-full rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-timber resize-none"
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>

              {status === 'success' && (
                <div className="flex items-center gap-2 rounded-lg bg-green-50 p-4 text-sm text-green-700">
                  <CheckCircle className="h-4 w-4" />
                  Message sent! We&apos;ll be in touch soon.
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  Something went wrong. Please try calling us directly.
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                disabled={status === 'loading'}
                className="w-full"
              >
                {status === 'loading' ? 'Sending...' : (
                  <><Send className="mr-2 h-4 w-4" /> Send Message</>
                )}
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
