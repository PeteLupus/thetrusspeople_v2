'use client';

import { useState, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Send, Loader2 } from 'lucide-react';
import StepIndicator from './StepIndicator';
import ContactStep from './steps/ContactStep';
import ProjectStep from './steps/ProjectStep';
import UploadStep from './steps/UploadStep';
import ReviewStep from './steps/ReviewStep';
import SuccessState from './SuccessState';
import type { QuoteFormData, CompletedFile } from '@/lib/types';
import { QUOTE_STEP_LABELS } from '@/lib/constants';

// ─── Validation Schema ─────────────────────────────────────────────────────────

const quoteSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(8, 'Valid phone number is required'),
  company: z.string().optional(),
  preferredContact: z.enum(['email', 'phone', 'either']),
  projectType: z.string().min(1, 'Please select a project type'),
  projectTypeOther: z.string().optional(),
  projectStage: z.string().min(1, 'Please select a project stage'),
  suburb: z.string().min(2, 'Suburb is required'),
  state: z.string(),
  storeys: z.string().min(1, 'Please select number of storeys'),
  estimatedTimeline: z.string().min(1, 'Please select a timeline'),
  additionalDetails: z.string().optional(),
  files: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        size: z.number(),
        type: z.string(),
      })
    )
    .optional(),
}).refine(
  (data) => data.projectType !== 'Other' || (data.projectTypeOther && data.projectTypeOther.length > 0),
  { message: 'Please specify the project type', path: ['projectTypeOther'] }
);

// Fields to validate per step
const stepFields: (keyof QuoteFormData)[][] = [
  ['firstName', 'lastName', 'email', 'phone', 'preferredContact'],
  ['projectType', 'projectStage', 'suburb', 'storeys', 'estimatedTimeline'],
  [], // Upload step — no required validation
  [], // Review step
];

// ─── Animation Variants ─────────────────────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

// ─── Component ──────────────────────────────────────────────────────────────────

export default function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [folderId, setFolderId] = useState<string | null>(null);
  const [folderUrl, setFolderUrl] = useState<string | null>(null);
  const completedFilesRef = useRef<CompletedFile[]>([]);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      preferredContact: 'either',
      projectType: '',
      projectTypeOther: '',
      projectStage: '',
      suburb: '',
      state: 'VIC',
      storeys: '',
      estimatedTimeline: '',
      additionalDetails: '',
      files: [],
    },
  });

  const { register, trigger, getValues, setValue, watch, formState: { errors } } = form;

  const totalSteps = 4;

  // ─── Step Navigation ────────────────────────────────────────────────────────

  const goToStep = useCallback((step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  }, [currentStep]);

  const goNext = useCallback(async () => {
    // Validate current step's fields
    const fieldsToValidate = stepFields[currentStep - 1];
    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) return;
    }

    if (currentStep < totalSteps) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, trigger]);

  const goBack = useCallback(() => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  // ─── Folder Creation (lazy) ─────────────────────────────────────────────────

  const ensureFolder = useCallback(async (): Promise<string> => {
    if (folderId) return folderId;

    const values = getValues();
    const name = `${values.firstName} ${values.lastName}`.trim() || 'Unknown';
    const projectType = values.projectType || 'General';

    const res = await fetch('/api/quote/folder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, projectType }),
    });

    if (!res.ok) throw new Error('Failed to create folder');

    const data = await res.json();
    setFolderId(data.folderId);
    setFolderUrl(data.folderUrl);
    return data.folderId;
  }, [folderId, getValues]);

  // ─── File Management ────────────────────────────────────────────────────────

  const handleFilesChange = useCallback(
    (files: CompletedFile[]) => {
      completedFilesRef.current = files;
      setValue('files', files);
    },
    [setValue]
  );

  // ─── Submission ─────────────────────────────────────────────────────────────

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const values = getValues();

      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          files: completedFilesRef.current,
          folderId: folderId || undefined,
          folderUrl: folderUrl || undefined,
        }),
      });

      if (!res.ok) throw new Error('Submission failed');

      const data = await res.json();
      setReferenceNumber(data.referenceNumber);
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [getValues, folderId, folderUrl]);

  // ─── Reset ──────────────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    form.reset();
    setCurrentStep(1);
    setDirection(0);
    setIsSubmitting(false);
    setSubmitStatus('idle');
    setReferenceNumber('');
    setFolderId(null);
    setFolderUrl(null);
    completedFilesRef.current = [];
  }, [form]);

  // ─── Render ─────────────────────────────────────────────────────────────────

  if (submitStatus === 'success') {
    return (
      <SuccessState
        firstName={getValues('firstName')}
        referenceNumber={referenceNumber}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Step Indicator */}
      <div className="relative mb-10">
        <StepIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepLabels={QUOTE_STEP_LABELS}
        />
      </div>

      {/* Form Steps */}
      <div className="relative min-h-[400px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {currentStep === 1 && (
              <ContactStep register={register} errors={errors} />
            )}
            {currentStep === 2 && (
              <ProjectStep register={register} errors={errors} watch={watch} />
            )}
            {currentStep === 3 && (
              <UploadStep
                folderId={folderId}
                onFolderNeeded={ensureFolder}
                onFilesChange={handleFilesChange}
                initialFiles={completedFilesRef.current}
              />
            )}
            {currentStep === 4 && (
              <ReviewStep
                formData={getValues()}
                onEditStep={goToStep}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          Something went wrong. Please try again or call us directly.
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <button
          type="button"
          onClick={goBack}
          disabled={currentStep === 1}
          className="inline-flex items-center gap-2 rounded-[6px] px-5 py-3 text-sm font-medium text-text-primary transition-all duration-300 hover:bg-warm-white disabled:invisible"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-2 rounded-[6px] bg-terracotta px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:shadow-lg"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-[6px] bg-terracotta px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Quote Request
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
