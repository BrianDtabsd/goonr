import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

function Button({ children, onClick, href, to, className = '', variant = 'primary', ...props }) {
  const { theme } = useTheme();
  const isFoundation = theme.surfaceSystem === 'foundation';

  let shapeClass = 'rounded-full';
  if (isFoundation) {
    shapeClass = 'rounded-sm';
  } else {
    if (theme.buttonShape === 'rounded') shapeClass = 'rounded-xl';
    if (theme.buttonShape === 'sharp') shapeClass = 'rounded-none';
  }

  let styleObj = {};
  let baseClass = `inline-flex items-center justify-center transition-all duration-300 px-6 py-2.5 ${shapeClass} ${className}`;

  if (isFoundation) {
    baseClass +=
      ' font-bold uppercase tracking-[0.08em] text-xs min-h-10';
    if (variant === 'primary') {
      styleObj.backgroundColor = 'var(--ds-button-ink)';
      styleObj.color = 'var(--ds-button-ink-text)';
      styleObj.border = '1px solid var(--ds-button-ink)';
    } else if (variant === 'outline') {
      styleObj.backgroundColor = 'transparent';
      styleObj.color = 'var(--ds-color-ink)';
      styleObj.border = '1px solid var(--ds-color-ink)';
    } else {
      styleObj.backgroundColor = 'transparent';
      styleObj.color = 'var(--ds-color-ink)';
      styleObj.border = '1px solid transparent';
    }
  } else {
    baseClass += ' font-semibold';
    if (theme.buttonStyle === 'filled') {
      styleObj.backgroundColor =
        variant === 'primary' ? theme.primaryColor : 'rgba(255,255,255,0.1)';
      styleObj.color = '#ffffff';
      styleObj.border = '1px solid transparent';
    } else if (theme.buttonStyle === 'outline') {
      styleObj.backgroundColor = 'transparent';
      styleObj.color = variant === 'primary' ? theme.primaryColor : '#ffffff';
      styleObj.border = `1px solid ${
        variant === 'primary' ? theme.primaryColor : 'rgba(255,255,255,0.2)'
      }`;
    } else if (theme.buttonStyle === 'empty') {
      styleObj.backgroundColor = 'transparent';
      styleObj.color = variant === 'primary' ? theme.primaryColor : '#ffffff';
      styleObj.border = '1px solid transparent';
    }

    if (theme.buttonJump) {
      baseClass += ' hover:-translate-y-1';
    }

    if (theme.buttonGlow) {
      const glowColor = `${theme.primaryColor}99`;
      baseClass += ' transition-shadow';
      styleObj['--btn-glow'] = `0 0 0 4px ${theme.primaryColor}33, 0 0 20px ${glowColor}`;
    }
  }

  const hoverHandlers = isFoundation
    ? {
        onMouseEnter: (e) => {
          if (variant === 'primary') {
            e.currentTarget.style.backgroundColor = 'var(--ds-color-accent)';
            e.currentTarget.style.borderColor = 'var(--ds-color-accent)';
            e.currentTarget.style.color = '#ffffff';
          } else if (variant === 'outline') {
            e.currentTarget.style.backgroundColor = 'var(--ds-color-ink)';
            e.currentTarget.style.color = 'var(--ds-color-canvas)';
          } else {
            e.currentTarget.style.backgroundColor = 'var(--ds-color-surface-subtle)';
          }
        },
        onMouseLeave: (e) => {
          if (variant === 'primary') {
            e.currentTarget.style.backgroundColor = 'var(--ds-button-ink)';
            e.currentTarget.style.borderColor = 'var(--ds-button-ink)';
            e.currentTarget.style.color = 'var(--ds-button-ink-text)';
          } else if (variant === 'outline') {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--ds-color-ink)';
          } else {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--ds-color-ink)';
          }
        },
      }
    : {};

  if (to) {
    return (
      <Link to={to} className={baseClass} style={styleObj} {...hoverHandlers} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={baseClass} style={styleObj} {...hoverHandlers} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClass} style={styleObj} {...hoverHandlers} {...props}>
      {children}
    </button>
  );
}

export default Button;
