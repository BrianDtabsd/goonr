import React from 'react';
import { Link } from 'react-router-dom';
import { element } from '../../lib/designTokens';
import { cn } from '../../lib/cn';
import { useDSTheme } from './ThemeProvider';

const variantMap = {
  workplace: {
    primary: element.button.primaryWorkplace,
    accent: element.button.accentWorkplace,
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
  to,
  href,
  ...props
}) {
  const { theme } = useDSTheme();
  const styles = variantMap[theme] || variantMap.workplace;

  const classes = cn(
    styles[variant] || styles.primary,
    size === 'sm' && element.button.sm,
    disabled && element.button.disabled,
    'ds-bounce-hover ds-bounce-press',
    className
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes} {...props}>
      {children}
    </button>
  );
}
