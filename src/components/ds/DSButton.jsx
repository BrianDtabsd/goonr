import React from 'react';
import { element } from '../../lib/designTokens';
import { cn } from '../../lib/cn';
import { useDSTheme } from './ThemeProvider';

const variantMap = {
  workplace: {
    primary: element.button.primaryWorkplace,
    secondary: element.button.secondaryWorkplace,
    ghost: element.button.ghostWorkplace,
  },
  casefile: {
    primary: element.button.primaryCasefile,
    secondary: element.button.secondaryCasefile,
    ghost: element.button.ghostCasefile,
  },
};

export default function DSButton({
  children,
  variant = 'primary',
  size,
  disabled,
  className,
  type = 'button',
  ...props
}) {
  const { theme } = useDSTheme();
  const styles = variantMap[theme] || variantMap.workplace;

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        styles[variant] || styles.primary,
        size === 'sm' && element.button.sm,
        disabled && element.button.disabled,
        'ds-bounce-hover ds-bounce-press',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
