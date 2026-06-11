import React from 'react';
import { element } from '../../lib/designTokens';
import { cn } from '../../lib/cn';
import { useDSTheme } from './ThemeProvider';

export default function DSInput({ label, hint, error, className, id, ...props }) {
  const { theme } = useDSTheme();
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className={element.input.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          theme === 'casefile' ? element.input.casefile : element.input.workplace,
          error && 'border-[#C4886A]/40 focus:border-[#C4886A]/50 focus:ring-[#C4886A]/20',
          className
        )}
        {...props}
      />
      {hint && !error && <p className={element.input.hint}>{hint}</p>}
      {error && <p className={element.input.error}>{error}</p>}
    </div>
  );
}

export function DSTextarea({ label, hint, error, className, id, ...props }) {
  const { theme } = useDSTheme();
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const base =
    theme === 'casefile' ? element.input.casefile : element.input.workplace;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className={element.input.label}>
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={cn(base, 'min-h-[120px] resize-y', className)}
        {...props}
      />
      {hint && !error && <p className={element.input.hint}>{hint}</p>}
      {error && <p className={element.input.error}>{error}</p>}
    </div>
  );
}
