import React from 'react';
import { element } from '../../lib/designTokens';
import { cn } from '../../lib/cn';
import { useDSTheme } from './ThemeProvider';

export default function DSCard({ children, glow, flat, className, ...props }) {
  const { theme } = useDSTheme();

  const base =
    theme === 'casefile'
      ? glow
        ? element.card.casefileGlow
        : element.card.casefile
      : flat
        ? element.card.workplaceFlat
        : element.card.workplace;

  return (
    <div
      className={cn(base, !flat && theme === 'workplace' && 'ds-card-lift', className)}
      {...props}
    >
      {children}
    </div>
  );
}
