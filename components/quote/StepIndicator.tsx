'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function StepIndicator({ currentStep, totalSteps, stepLabels }: StepIndicatorProps) {
  return (
    <>
      {/* Desktop */}
      <div className="hidden sm:flex items-center justify-center gap-0">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300',
                    isCompleted && 'bg-timber text-white',
                    isCurrent && 'bg-terracotta text-white shadow-md shadow-terracotta/30',
                    !isCompleted && !isCurrent && 'border-2 border-border bg-white text-text-light'
                  )}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : step}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium transition-colors duration-300',
                    isCurrent ? 'text-charcoal' : 'text-text-light'
                  )}
                >
                  {stepLabels[i]}
                </span>
              </div>
              {step < totalSteps && (
                <div
                  className={cn(
                    'mx-3 mt-[-20px] h-[2px] w-16 transition-colors duration-300',
                    isCompleted ? 'bg-timber' : 'bg-border'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between sm:hidden">
        <span className="text-sm font-medium text-text-light">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="font-heading text-sm font-semibold text-charcoal">
          {stepLabels[currentStep - 1]}
        </span>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-border">
          <div
            className="h-full bg-terracotta transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </>
  );
}
