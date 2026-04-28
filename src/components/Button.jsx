import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

function Button({ children, onClick, href, to, className = '', variant = 'primary', ...props }) {
  const { theme } = useTheme();

  // Determine base shape
  let shapeClass = 'rounded-full'; // pill
  if (theme.buttonShape === 'rounded') shapeClass = 'rounded-xl';
  if (theme.buttonShape === 'sharp') shapeClass = 'rounded-none';
  
  // Determine styles based on theme and variant
  let styleObj = {};
  let baseClass = `inline-flex items-center justify-center font-semibold transition-all duration-300 px-6 py-2.5 ${shapeClass} ${className}`;

  if (theme.buttonStyle === 'filled') {
    styleObj.backgroundColor = variant === 'primary' ? theme.primaryColor : 'rgba(255,255,255,0.1)';
    styleObj.color = '#ffffff';
    styleObj.border = '1px solid transparent';
  } else if (theme.buttonStyle === 'outline') {
    styleObj.backgroundColor = 'transparent';
    styleObj.color = variant === 'primary' ? theme.primaryColor : '#ffffff';
    styleObj.border = `1px solid ${variant === 'primary' ? theme.primaryColor : 'rgba(255,255,255,0.2)'}`;
  } else if (theme.buttonStyle === 'empty') {
    styleObj.backgroundColor = 'transparent';
    styleObj.color = variant === 'primary' ? theme.primaryColor : '#ffffff';
    styleObj.border = '1px solid transparent';
  }

  // Hover jump effect
  if (theme.buttonJump) {
    baseClass += ' hover:-translate-y-1';
  }

  // Glow effect on click only (active state). No persistent shadow.
  if (theme.buttonGlow) {
    const glowColor = `${theme.primaryColor}99`;
    baseClass += ' transition-shadow';
    styleObj['--btn-glow'] = `0 0 0 4px ${theme.primaryColor}33, 0 0 20px ${glowColor}`;
  }

  if (to) {
    return (
      <Link
        to={to}
        className={baseClass}
        style={styleObj}
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={baseClass}
        style={styleObj}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={baseClass}
      style={styleObj}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
