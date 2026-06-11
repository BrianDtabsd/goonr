import React from 'react';
import { element } from '../../lib/designTokens';
import { cn } from '../../lib/cn';
import { useDSTheme } from './ThemeProvider';
import DSCard from './DSCard';

export default function DSStatCard({ label, value, icon, className }) {
  const { theme } = useDSTheme();

  return (
    <DSCard flat className={cn('flex flex-col', className)}>
      <div className="flex items-start justify-between">
        <span
          className={cn(
            theme === 'casefile' ? element.statCard.valueCasefile : element.statCard.value
          )}
        >
          {value}
        </span>
        {icon && (
          <span className={element.statCard.icon}>
            <iconify-icon icon={icon} width="20" height="20" />
          </span>
        )}
      </div>
      <span className={element.statCard.label}>{label}</span>
    </DSCard>
  );
}
