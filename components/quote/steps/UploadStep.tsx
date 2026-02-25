'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { UploadFile, CompletedFile } from '@/lib/types';
import { QUOTE_ACCEPTED_TYPES, QUOTE_MAX_FILE_SIZE, QUOTE_MAX_FILES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface UploadStepProps {
  folderId: string | null;
  onFolderNeeded: () => Promise<string>;
  onFilesChange: (files: CompletedFile[]) => void;
  initialFiles: CompletedFile[];
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

export default function UploadStep({
  folderId,
  onFolderNeeded,
  onFilesChange,
  initialFiles,
}: UploadStepProps) {
  const [files, setFiles] = useState<UploadFile[]>(() =>
    initialFiles.map((f) => ({
      localId: f.id,
      file: null as unknown as File,
      name: f.name,
      size: f.size,
      type: f.type,
      progress: 100,
      status: 'complete' as const,
      objectName: f.id,
    }))
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderIdRef = useRef<string | null>(folderId);

  const uploadFile = useCallback(async (uploadFile: UploadFile) => {
    try {
      // Ensure we have a folder
      if (!folderIdRef.current) {
        folderIdRef.current = await onFolderNeeded();
      }

      // Update status to uploading
      setFiles((prev) =>
        prev.map((f) =>
          f.localId === uploadFile.localId ? { ...f, status: 'uploading' as const, progress: 5 } : f
        )
      );

      // Upload file directly via XHR for progress tracking
      const mimeType = uploadFile.type || 'application/octet-stream';
      const uploadUrl = `/api/quote/upload?folderPath=${encodeURIComponent(folderIdRef.current)}&fileName=${encodeURIComponent(uploadFile.name)}&mimeType=${encodeURIComponent(mimeType)}`;

      const result = await new Promise<{ fileName: string; objectName: string }>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', uploadUrl);
        xhr.setRequestHeader('Content-Type', mimeType);

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100);
            setFiles((prev) =>
              prev.map((f) =>
                f.localId === uploadFile.localId ? { ...f, progress } : f
              )
            );
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(`Upload failed: ${xhr.statusText}`));
          }
        };

        xhr.onerror = () => reject(new Error('Network error during upload'));
        xhr.send(uploadFile.file);
      });

      // Mark as complete
      setFiles((prev) => {
        const updated = prev.map((f) =>
          f.localId === uploadFile.localId
            ? { ...f, status: 'complete' as const, progress: 100, objectName: result.objectName }
            : f
        );
        // Notify parent of completed files
        const completed: CompletedFile[] = updated
          .filter((f) => f.status === 'complete' && f.objectName)
          .map((f) => ({ id: f.objectName!, name: f.name, size: f.size, type: f.type }));
        onFilesChange(completed);
        return updated;
      });
    } catch (error) {
      setFiles((prev) =>
        prev.map((f) =>
          f.localId === uploadFile.localId
            ? { ...f, status: 'error' as const, error: (error as Error).message }
            : f
        )
      );
    }
  }, [onFolderNeeded, onFilesChange]);

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles);
      const currentCount = files.length;

      const toAdd: UploadFile[] = [];
      for (const file of fileArray) {
        if (currentCount + toAdd.length >= QUOTE_MAX_FILES) break;

        if (!isFileAccepted(file)) continue;
        if (file.size > QUOTE_MAX_FILE_SIZE) continue;

        const uploadFileObj: UploadFile = {
          localId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
          status: 'pending',
        };
        toAdd.push(uploadFileObj);
      }

      if (toAdd.length === 0) return;

      setFiles((prev) => [...prev, ...toAdd]);

      // Start uploading each file
      for (const f of toAdd) {
        uploadFile(f);
      }
    },
    [files.length, uploadFile]
  );

  const removeFile = useCallback(
    (localId: string) => {
      setFiles((prev) => {
        const updated = prev.filter((f) => f.localId !== localId);
        const completed: CompletedFile[] = updated
          .filter((f) => f.status === 'complete' && f.objectName)
          .map((f) => ({ id: f.objectName!, name: f.name, size: f.size, type: f.type }));
        onFilesChange(completed);
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

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-3"
          >
            {files.map((file) => (
              <motion.div
                key={file.localId}
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
                    <p className="truncate text-sm font-medium text-charcoal">
                      {file.name}
                    </p>
                    <span className="flex-shrink-0 text-xs text-text-light">
                      {formatFileSize(file.size)}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  {(file.status === 'uploading' || file.status === 'pending') && (
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-border">
                      <motion.div
                        className="h-full rounded-full bg-timber"
                        initial={{ width: 0 }}
                        animate={{ width: `${file.progress}%` }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    </div>
                  )}

                  {file.status === 'error' && (
                    <p className="mt-1 text-xs text-red-500">{file.error || 'Upload failed'}</p>
                  )}
                </div>

                {/* Status Icon */}
                <div className="flex-shrink-0">
                  {file.status === 'uploading' && (
                    <Loader2 className="h-5 w-5 animate-spin text-timber" />
                  )}
                  {file.status === 'complete' && (
                    <CheckCircle className="h-5 w-5 text-success" />
                  )}
                  {file.status === 'error' && (
                    <AlertCircle className="h-5 w-5 text-error" />
                  )}
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.localId);
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
            No files uploaded yet. You can skip this step and email your plans later.
          </p>
        </div>
      )}
    </div>
  );
}
