'use client';

import { User, Briefcase, FileText, Pencil } from 'lucide-react';
import type { QuoteFormData } from '@/lib/types';

interface ReviewStepProps {
  formData: QuoteFormData;
  onEditStep: (step: number) => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function ReviewCard({
  title,
  icon: Icon,
  step,
  onEdit,
  children,
}: {
  title: string;
  icon: React.ElementType;
  step: number;
  onEdit: (step: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-timber/10">
            <Icon className="h-4 w-4 text-timber" />
          </div>
          <h4 className="font-heading text-sm font-semibold text-charcoal">{title}</h4>
        </div>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-timber transition-colors hover:bg-timber/10"
        >
          <Pencil className="h-3 w-3" />
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 py-1.5">
      <span className="text-sm text-text-light">{label}</span>
      <span className="text-right text-sm font-medium text-charcoal">{value}</span>
    </div>
  );
}

export default function ReviewStep({ formData, onEditStep }: ReviewStepProps) {
  const contactMethod =
    formData.preferredContact === 'either'
      ? 'Either'
      : formData.preferredContact === 'email'
        ? 'Email'
        : 'Phone';

  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-1 font-heading text-lg font-semibold text-charcoal">
          Review Your Quote Request
        </h3>
        <p className="mb-6 text-sm text-text-light">
          Please check everything looks correct before submitting.
        </p>
      </div>

      <ReviewCard title="Contact Details" icon={User} step={1} onEdit={onEditStep}>
        <div className="divide-y divide-border/50">
          <ReviewRow label="Name" value={`${formData.firstName} ${formData.lastName}`} />
          <ReviewRow label="Email" value={formData.email} />
          <ReviewRow label="Phone" value={formData.phone} />
          <ReviewRow label="Company" value={formData.company} />
          <ReviewRow label="Preferred Contact" value={contactMethod} />
        </div>
      </ReviewCard>

      <ReviewCard title="Project Details" icon={Briefcase} step={2} onEdit={onEditStep}>
        <div className="divide-y divide-border/50">
          <ReviewRow
            label="Project Type"
            value={
              formData.projectType === 'Other'
                ? formData.projectTypeOther || 'Other'
                : formData.projectType
            }
          />
          <ReviewRow label="Project Stage" value={formData.projectStage} />
          <ReviewRow label="Storeys" value={formData.storeys} />
          <ReviewRow label="Location" value={`${formData.suburb}, ${formData.state}`} />
          <ReviewRow label="Timeline" value={formData.estimatedTimeline} />
          {formData.additionalDetails && (
            <div className="py-1.5">
              <span className="text-sm text-text-light">Additional Details</span>
              <p className="mt-1 text-sm text-charcoal">{formData.additionalDetails}</p>
            </div>
          )}
        </div>
      </ReviewCard>

      <ReviewCard title="Uploaded Files" icon={FileText} step={3} onEdit={onEditStep}>
        {formData.files && formData.files.length > 0 ? (
          <div className="space-y-2">
            {formData.files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between rounded-lg bg-warm-white px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-timber" />
                  <span className="text-sm text-charcoal">{file.name}</span>
                </div>
                <span className="text-xs text-text-light">{formatFileSize(file.size)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-light">No files uploaded. You can email plans later.</p>
        )}
      </ReviewCard>
    </div>
  );
}
