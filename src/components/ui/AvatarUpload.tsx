'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useObjectUrl } from '@/lib/use-object-url';

interface AvatarUploadProps {
  id?: string;
  value: File | null;
  /** Set when a previously-uploaded photo exists (e.g. after syncing a draft). */
  existingUrl?: string;
  onChange: (file: File | null) => void;
  maxSizeMb?: number;
  label?: string;
  hint?: string;
}

function initialsFromNothing() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8.5" r="3.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 20c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Circular profile-photo picker with an immediate local preview. */
export function AvatarUpload({
  id = 'athlete-photo',
  value,
  existingUrl,
  onChange,
  maxSizeMb = 5,
  label = 'Profile Photo',
  hint = 'A clear head-and-shoulders photo. JPG or PNG, up to 5MB.',
}: AvatarUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const previewUrl = useObjectUrl(value);

  const shownUrl = previewUrl ?? existingUrl ?? null;

  function handleFile(file: File | undefined | null) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('That file isn’t an image. Choose a JPG or PNG.');
      return;
    }
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`Photo is larger than ${maxSizeMb}MB. Choose a smaller one.`);
      return;
    }
    setError(null);
    onChange(file);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink-900">
        {label}
        <span className="ml-1.5 text-xs font-normal text-ink-900/40">Optional</span>
      </span>

      <div
        className={cn(
          'flex items-center gap-5 rounded-xl border border-dashed p-4 transition-colors',
          isDragging ? 'border-brand-500 bg-brand-50' : 'border-ink-900/15',
          shownUrl && !isDragging && 'border-solid border-success-500/25 bg-success-500/[0.03]',
          error && 'border-red-300'
        )}
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
      >
        <div
          className={cn(
            'relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full',
            shownUrl ? 'ring-2 ring-brand-600/20' : 'bg-ink-900/[0.04] text-ink-900/30'
          )}
        >
          {shownUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- blob: preview URL, not an optimizable asset
            <img src={shownUrl} alt="Your selected profile photo" className="animate-fade-in h-full w-full object-cover" />
          ) : (
            initialsFromNothing()
          )}
        </div>

        <div className="min-w-0 flex-1">
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="focus-ring inline-flex h-9 items-center rounded-lg border border-ink-900/15 px-3.5 text-sm font-semibold text-ink-900 transition-all duration-150 hover:border-ink-900/30 hover:bg-ink-900/[0.03] active:scale-[0.98]"
            >
              {shownUrl ? 'Change photo' : 'Upload photo'}
            </button>
            {shownUrl && (
              <button
                type="button"
                onClick={() => {
                  onChange(null);
                  setError(null);
                  if (inputRef.current) inputRef.current.value = '';
                }}
                className="focus-ring rounded-md px-2 py-1 text-xs font-medium text-ink-900/50 transition-colors hover:bg-ink-900/[0.05] hover:text-red-600"
              >
                Remove
              </button>
            )}
          </div>
          <p className={cn('mt-2 text-xs', error ? 'font-medium text-red-600' : 'text-ink-900/45')} role={error ? 'alert' : undefined}>
            {error ?? (value ? value.name : hint)}
          </p>
        </div>
      </div>
    </div>
  );
}
