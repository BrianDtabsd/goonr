import React from 'react';
import { element, semantic, statusChipClasses } from '../../lib/designTokens';
import { cn } from '../../lib/cn';
import { useDSTheme } from './ThemeProvider';

const presetMap = {
  online: 'active',
  active: 'active',
  pending: 'warning',
  grtw: 'active',
  plan: 'neutral',
};

export default function DSBadge({ children, variant = 'neutral', dot, className }) {
  const { theme } = useDSTheme();
  const semanticKey = presetMap[variant] || variant;
  const s = semantic[semanticKey] || semantic.neutral;

  return (
    <span className={cn(statusChipClasses(semanticKey, theme), className)}>
      {(dot || variant === 'online' || variant === 'active') && (
        <span className={cn('w-1.5 h-1.5 rounded-full', s.dot)} />
      )}
      {children}
    </span>
  );
}

export function DSStatusPill({ label, semanticKey = 'neutral' }) {
  const { theme } = useDSTheme();
  const s = semantic[semanticKey] || semantic.neutral;

  return (
    <span className={statusChipClasses(semanticKey, theme)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', s.dot)} />
      {label}
    </span>
  );
}
