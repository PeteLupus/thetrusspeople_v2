'use client';

import { CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface SuccessStateProps {
  firstName: string;
  referenceNumber: string;
  onReset: () => void;
}

const steps = [
  'We review your plans and project details',
  'Our detailers prepare a detailed quote',
  'We contact you with pricing within 24 hours',
];

export default function SuccessState({ firstName, referenceNumber, onReset }: SuccessStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="mx-auto max-w-lg text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10"
      >
        <CheckCircle className="h-10 w-10 text-success" />
      </motion.div>

      <h2 className="mb-3 font-heading text-2xl font-bold text-charcoal md:text-3xl">
        Quote Request Submitted
      </h2>

      <p className="mb-2 text-base text-text-light">
        Thank you, {firstName}. We&apos;ve received your quote request and will
        be in touch within 24 hours.
      </p>

      <p className="mb-8 text-sm text-text-light">
        Reference: <span className="font-semibold text-charcoal">{referenceNumber}</span>
      </p>

      {/* What happens next */}
      <div className="mb-8 rounded-xl bg-warm-white p-6 text-left">
        <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-charcoal">
          What happens next?
        </h3>
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-timber text-xs font-semibold text-white">
                {i + 1}
              </span>
              <p className="text-sm text-text-primary">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-[6px] border-2 border-border px-6 py-3 text-sm font-semibold text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:border-timber hover:text-timber"
        >
          <RotateCcw className="h-4 w-4" />
          Submit Another Quote
        </button>
        <Link href="/">
          <Button variant="primary">
            Back to Home
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
