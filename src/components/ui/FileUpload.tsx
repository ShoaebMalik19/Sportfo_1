'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useObjectUrl } from '@/lib/use-object-url';

interface FileUploadProps {
  id: string;
  value: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  maxSizeMb?: number;
  error?: string;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({
  id,
  value,
  onChange,
  accept = 'image/png,image/jpeg,application/pdf',
  maxSizeMb = 10,
  error,
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);

  // Image attachments get a real thumbnail so the athlete can confirm at a
  // glance that they attached the right certificate. PDFs fall back to a glyph.
  const thumbUrl = useObjectUrl(value && value.type.startsWith('image/') ? value : null);

  function handleFile(file: File | undefined | null) {
    if (!file) return;
    if (file.size > maxSizeMb * 1024 * 1024) {
      setLocalError(`File is larger than ${maxSizeMb}MB. Choose a smaller file.`);
      return;
    }
    setLocalError(null);
    onChange(file);
  }

  const displayError = error ?? localError ?? undefined;

  return (
    <div>
      <label
        htmlFor={id}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-6 text-center transition-all duration-150',
          isDragging ? 'scale-[1.01] border-brand-500 bg-brand-50' : 'border-ink-900/15 hover:border-ink-900/30',
          value && !isDragging && 'border-success-500/30 bg-success-500/[0.03]',
          displayError && 'border-red-300'
        )}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-ink-900/35" aria-hidden="true">
          <path
            d="M12 16V4m0 0L7 9m5-5l5 5M5 20h14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-sm font-medium text-ink-900/75">
          <span className="text-brand-600">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-ink-900/40">PDF, PNG or JPG — up to {maxSizeMb}MB</p>
      </label>

      {value && (
        <div className="animate-fade-in-up mt-2 flex items-center justify-between rounded-lg border border-success-500/20 bg-success-500/[0.04] px-3 py-2">
          <div className="flex min-w-0 items-center gap-2.5">
            {thumbUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- blob: preview URL, not an optimizable asset
              <img
                src={thumbUrl}
                alt=""
                className="h-9 w-9 shrink-0 rounded-md object-cover ring-1 ring-ink-900/10"
              />
            ) : (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ink-900/[0.05] text-ink-900/45">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </span>
            )}
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm text-ink-900/80">{value.name}</span>
              <span className="block text-xs text-ink-900/40">{formatBytes(value.size)}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              onChange(null);
              if (inputRef.current) inputRef.current.value = '';
            }}
            className="focus-ring shrink-0 rounded-md px-2 py-1 text-xs font-medium text-ink-900/50 hover:bg-ink-900/[0.05] hover:text-ink-900"
          >
            Remove
          </button>
        </div>
      )}

      {displayError && (
        <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
          {displayError}
        </p>
      )}
    </div>
  );
}
