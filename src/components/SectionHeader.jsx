import React from 'react';
import { getAccent, getHeadingSize } from '../lib/cardTokens';

/**
 * Plain section header (NOT a card). Sits above a grid of ContentCards.
 *
 * Matches the original HTML template: an eyebrow pill + large display heading
 * + supporting paragraph, left-aligned by default.
 *
 * Props:
 *   eyebrow, eyebrowColor (color name), heading, subheading,
 *   headingSize ("md" | "lg" | "xl"), align ("left" | "center"),
 *   maxWidth (Tailwind class, e.g. "max-w-4xl"), className
 */
export default function SectionHeader({
  eyebrow,
  eyebrowColor = 'blue',
  heading,
  subheading,
  headingSize = 'xl',
  align = 'left',
  maxWidth = 'max-w-4xl',
  className = '',
}) {
  const accent = getAccent(eyebrowColor);
  const alignClasses =
    align === 'center'
      ? 'items-center text-center mx-auto'
      : 'items-start text-left';

  return (
    <div
      className={`anim-trigger flex flex-col ${alignClasses} ${maxWidth} ${className}`}
    >
      {eyebrow && (
        <div
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl px-4 py-2 mb-6 anim-fade-up"
          style={{ transitionDelay: '0s' }}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`}></span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-85">
            {eyebrow}
          </span>
        </div>
      )}

      {heading && (
        <h2
          className={`card-title ${getHeadingSize(headingSize)} font-light mb-5 anim-fade-up`}
          style={{ transitionDelay: '0.1s' }}
        >
          {heading}
        </h2>
      )}

      {subheading && (
        <p
          className="text-[1rem] sm:text-[1.06rem] leading-[1.75] opacity-70 max-w-[44rem] anim-fade-up"
          style={{ transitionDelay: '0.3s' }}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
