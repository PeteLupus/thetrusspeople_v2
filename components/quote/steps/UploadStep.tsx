'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUOTE_ACCEPTED_TYPES, QUOTE_MAX_FILE_SIZE, QUOTE_MAX_FILES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface UploadStepProps {
  onFilesChange: (files: File[]) => void;
  initialFiles: File[];
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const acceptedExtensions = QUOTE_ACCEPTED_TYPES.split(',');

function isFileAccepted(file: File): boolean {
  const ext = '.' + file.name.split('.').pop()?.toLowerCase();
  return acceptedExtensions.includes(ext);
}

export default function UploadStep({ onFilesChange, initialFiles }: UploadStepProps) {
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [isDragging, setIsDragging] = useState(false);
  const [rejectedFiles, setRejectedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles);
      const toAdd: File[] = [];
      const rejected: string[] = [];

      for (const file of fileArray) {
        if (files.length + toAdd.length >= QUOTE_MAX_FILES) {
          rejected.push(`${file.name}: maximum ${QUOTE_MAX_FILES} files reached`);
          continue;
        }
        if (!isFileAccepted(file)) {
          rejected.push(`${file.name}: unsupported file type`);
          continue;
        }
        if (file.size > QUOTE_MAX_FILE_SIZE) {
          rejected.push(`${file.name}: exceeds ${formatFileSize(QUOTE_MAX_FILE_SIZE)} limit`);
          continue;
        }
        if (files.some((f) => f.name === file.name && f.size === file.size)) {
          rejected.push(`${file.name}: already added`);
          continue;
        }
        toAdd.push(file);
      }

      setRejectedFiles(rejected);
      if (toAdd.length === 0) return;

      setFiles((prev) => {
        const updated = [...prev, ...toAdd];
        onFilesChange(updated);
        return updated;
      });
    },
    [files, onFilesChange]
  );

  const removeFile = useCallback(
    (index: number) => {
      setFiles((prev) => {
        const updated = prev.filter((_, i) => i !== index);
        onFilesChange(updated);
        return updated;
      });
    },
    [onFilesChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles]
  );

  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-1 font-heading text-lg font-semibold text-charcoal">
          Upload Your Plans
        </h3>
        <p className="mb-6 text-sm text-text-light">
          Upload architectural plans, engineering drawings, or any relevant files.
          This helps us provide the most accurate quote.
        </p>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-all duration-300',
          isDragging
            ? 'border-timber bg-timber/5 scale-[1.01]'
            : 'border-border bg-warm-white hover:border-timber/50 hover:bg-timber/5'
        )}
      >
        <div
          className={cn(
            'mb-4 flex h-14 w-14 items-center justify-center rounded-full transition-colors',
            isDragging ? 'bg-timber/20' : 'bg-timber/10'
          )}
        >
          <Upload className="h-6 w-6 text-timber" />
        </div>
        <p className="mb-1 text-sm font-medium text-charcoal">
          Drag & drop your files here
        </p>
        <p className="text-xs text-text-light">
          or <span className="text-timber underline">click to browse</span>
        </p>
        <p className="mt-3 text-[11px] text-text-light">
          PDF, DWG, DXF, JPG, PNG, ZIP, RAR — Max {formatFileSize(QUOTE_MAX_FILE_SIZE)} per file — Up to {QUOTE_MAX_FILES} files
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={QUOTE_ACCEPTED_TYPES}
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.target.value = '';
          }}
          className="hidden"
        />
      </div>

      {/* Rejected file errors */}
      <AnimatePresence>
        {rejectedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-lg border border-red-200 bg-red-50 p-3 space-y-1"
          >
            {rejectedFiles.map((msg, i) => (
              <p key={i} className="flex items-center gap-2 text-xs text-red-600">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                {msg}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-3"
          >
            {files.map((file, index) => (
              <motion.div
                key={`${file.name}-${file.size}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                className="flex items-center gap-3 rounded-lg border border-border bg-white p-3"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-warm-white">
                  <FileText className="h-5 w-5 text-timber" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-charcoal">{file.name}</p>
                    <span className="flex-shrink-0 text-xs text-text-light">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                </div>

                <CheckCircle className="h-5 w-5 flex-shrink-0 text-success" />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="flex-shrink-0 rounded-md p-1 text-text-light transition-colors hover:bg-red-50 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {files.length === 0 && (
        <div className="rounded-lg bg-warm-white p-4 text-center">
          <p className="text-sm text-text-light">
            No files added yet. You can skip this step and email your plans later.
          </p>
        </div>
      )}
    </div>
  );
}
