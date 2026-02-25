'use client';

import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { QuoteFormData } from '@/lib/types';

interface ContactStepProps {
  register: UseFormRegister<QuoteFormData>;
  errors: FieldErrors<QuoteFormData>;
}

const inputClass =
  'w-full rounded-lg border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-timber focus:ring-1 focus:ring-timber/20';

export default function ContactStep({ register, errors }: ContactStepProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-1 font-heading text-lg font-semibold text-charcoal">
          Contact Details
        </h3>
        <p className="mb-6 text-sm text-text-light">
          Tell us who you are so we can get back to you with your quote.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-charcoal">
            First Name <span className="text-terracotta">*</span>
          </label>
          <input
            id="firstName"
            {...register('firstName')}
            placeholder="John"
            className={inputClass}
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-charcoal">
            Last Name <span className="text-terracotta">*</span>
          </label>
          <input
            id="lastName"
            {...register('lastName')}
            placeholder="Smith"
            className={inputClass}
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-charcoal">
            Email <span className="text-terracotta">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="john@example.com"
            className={inputClass}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-charcoal">
            Phone <span className="text-terracotta">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="0412 345 678"
            className={inputClass}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-charcoal">
          Company Name <span className="text-text-light">(optional)</span>
        </label>
        <input
          id="company"
          {...register('company')}
          placeholder="Smith Builders Pty Ltd"
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-charcoal">
          Preferred Contact Method
        </label>
        <div className="flex flex-wrap gap-4">
          {(['email', 'phone', 'either'] as const).map((value) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2 text-sm text-text-primary"
            >
              <input
                type="radio"
                value={value}
                {...register('preferredContact')}
                className="h-4 w-4 border-border text-timber focus:ring-timber"
              />
              {value === 'either' ? 'Either' : value === 'email' ? 'Email' : 'Phone'}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
