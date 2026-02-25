'use client';

import type { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import type { QuoteFormData } from '@/lib/types';
import {
  QUOTE_PROJECT_TYPES,
  QUOTE_PROJECT_STAGES,
  QUOTE_TIMELINES,
  QUOTE_STOREYS,
} from '@/lib/constants';

interface ProjectStepProps {
  register: UseFormRegister<QuoteFormData>;
  errors: FieldErrors<QuoteFormData>;
  watch: UseFormWatch<QuoteFormData>;
}

const inputClass =
  'w-full rounded-lg border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-timber focus:ring-1 focus:ring-timber/20';

const selectClass =
  'w-full appearance-none rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-timber focus:ring-1 focus:ring-timber/20';

export default function ProjectStep({ register, errors, watch }: ProjectStepProps) {
  const projectType = watch('projectType');

  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-1 font-heading text-lg font-semibold text-charcoal">
          Project Information
        </h3>
        <p className="mb-6 text-sm text-text-light">
          Help us understand your project so we can provide an accurate quote.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="projectType" className="mb-1.5 block text-sm font-medium text-charcoal">
            Project Type <span className="text-terracotta">*</span>
          </label>
          <select id="projectType" {...register('projectType')} className={selectClass}>
            <option value="">Select a project type</option>
            {QUOTE_PROJECT_TYPES.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.projectType && (
            <p className="mt-1 text-xs text-red-500">{errors.projectType.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="projectStage" className="mb-1.5 block text-sm font-medium text-charcoal">
            Project Stage <span className="text-terracotta">*</span>
          </label>
          <select id="projectStage" {...register('projectStage')} className={selectClass}>
            <option value="">Select project stage</option>
            {QUOTE_PROJECT_STAGES.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.projectStage && (
            <p className="mt-1 text-xs text-red-500">{errors.projectStage.message}</p>
          )}
        </div>
      </div>

      {projectType === 'Other' && (
        <div>
          <label htmlFor="projectTypeOther" className="mb-1.5 block text-sm font-medium text-charcoal">
            Please specify <span className="text-terracotta">*</span>
          </label>
          <input
            id="projectTypeOther"
            {...register('projectTypeOther')}
            placeholder="Describe your project type"
            className={inputClass}
          />
          {errors.projectTypeOther && (
            <p className="mt-1 text-xs text-red-500">{errors.projectTypeOther.message}</p>
          )}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium text-charcoal">
          Number of Storeys <span className="text-terracotta">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {QUOTE_STOREYS.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm transition-all hover:border-timber has-[:checked]:border-timber has-[:checked]:bg-timber/5 has-[:checked]:text-timber"
            >
              <input
                type="radio"
                value={opt.value}
                {...register('storeys')}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.storeys && (
          <p className="mt-1 text-xs text-red-500">{errors.storeys.message}</p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="suburb" className="mb-1.5 block text-sm font-medium text-charcoal">
            Suburb <span className="text-terracotta">*</span>
          </label>
          <input
            id="suburb"
            {...register('suburb')}
            placeholder="e.g. Coolaroo"
            className={inputClass}
          />
          {errors.suburb && (
            <p className="mt-1 text-xs text-red-500">{errors.suburb.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="state" className="mb-1.5 block text-sm font-medium text-charcoal">
            State
          </label>
          <input
            id="state"
            {...register('state')}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="estimatedTimeline" className="mb-1.5 block text-sm font-medium text-charcoal">
          Estimated Timeline <span className="text-terracotta">*</span>
        </label>
        <select id="estimatedTimeline" {...register('estimatedTimeline')} className={selectClass}>
          <option value="">When do you need this?</option>
          {QUOTE_TIMELINES.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.estimatedTimeline && (
          <p className="mt-1 text-xs text-red-500">{errors.estimatedTimeline.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="additionalDetails" className="mb-1.5 block text-sm font-medium text-charcoal">
          Additional Details <span className="text-text-light">(optional)</span>
        </label>
        <textarea
          id="additionalDetails"
          {...register('additionalDetails')}
          rows={4}
          placeholder="Anything else we should know about your project..."
          className={`${inputClass} resize-none`}
        />
      </div>
    </div>
  );
}
