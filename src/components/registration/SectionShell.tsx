import * as React from 'react';

export function SectionShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-7">
        <h2 className="text-xl font-bold text-ink-900 sm:text-2xl">{title}</h2>
        {description && <p className="mt-1.5 text-sm text-ink-900/55">{description}</p>}
      </div>
      {children}
    </div>
  );
}
