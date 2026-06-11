import React from 'react';
import { typography } from '../../lib/designTokens';
import { cn } from '../../lib/cn';

export default function DSPageHeader({
  breadcrumb,
  title,
  subtitle,
  actions,
  className,
}) {
  return (
    <header className={cn('mb-8', className)}>
      {breadcrumb && <p className="ds-breadcrumb mb-2">{breadcrumb}</p>}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className={typography.scale.pageTitle}>{title}</h1>
          {subtitle && (
            <p className="mt-2 text-sm leading-[1.65] text-stone-500">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
      </div>
    </header>
  );
}
