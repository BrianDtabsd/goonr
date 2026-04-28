import React from 'react';
import { twMerge } from 'tailwind-merge';
import PricingTierCta from './PricingTierCta';
import { getAccent, getHeadingSize } from '../lib/cardTokens';

/**
 * One reusable card. Pick a `layout` and pass the relevant fields.
 *
 * layout:
 *   - "text"     -> heading + subheading + paragraph(s) (use `body` string or array of strings)
 *   - "bullets"  -> heading + subheading + bullet list (use `items: [{title?, desc?}] or string[])
 *   - "numbered" -> same as bullets but numbered 1, 2, 3
 *   - "image"    -> picture with optional caption underneath (use `image`, `caption`)
 *   - "pills"    -> row of color-coded chips (use `pills: [{label, color?}] or string[])
 *   - "stat"     -> big number + small label (use `value`, `label`, optional `suffix`)
 *
 * Shared optional fields (all layouts):
 *   eyebrow, eyebrowColor, heading, subheading, headingSize,
 *   image, imagePosition ("top"|"left"|"right"|"background"|"none"),
 *   imageCaption, tone (accent color name), cta { label, href, to, stripeLink, stripePriceId, variant },
 *   size ("sm"|"md"|"lg"|"full"), className, animDelay (seconds, e.g. 0.15),
 *   fixedHeight, minHeight, contentAlign ("top"|"between"|"center"|"bottom"),
 *   shellStyle ("operational"|"module") — matches original template radii/padding/shadow
 */

const sizeColSpan = {
  sm: 'col-span-1',
  md: 'col-span-1 md:col-span-2',
  lg: 'col-span-1 md:col-span-3',
  full: 'col-span-1 md:col-span-full',
};

// Inner padding (original template, laptop/desktop): Operational row uses p-8;
// Observed-layer style cards use p-7 lg:p-8; supporting modules use p-5.
const sizePadding = {
  sm: 'p-7 lg:p-8',
  md: 'p-7 lg:p-8',
  lg: 'p-8',
  full: 'p-8',
};

const shellClassMap = {
  /** Original operational-value row (laptop/desktop): 24px radius, template shadow, inner p-8. */
  operational: 'glass-card--content-shell glass-card--radius-24',
  /** Original supporting modules: 22px radius, inner p-5. */
  module: 'glass-card--content-shell glass-card--radius-22',
};

function StripeAwareCta({ cta }) {
  if (!cta) return null;
  const { variant = 'primary', className = '' } = cta;
  return (
    <PricingTierCta cta={{ ...cta, variant }} highlighted={false} className={className} />
  );
}

function Eyebrow({ text, color = 'blue', className = '' }) {
  if (!text) return null;
  const accent = getAccent(color);
  return (
    <div
      className={twMerge(
        'self-start inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/5 px-4 py-2 mb-6 anim-fade-up',
        className
      )}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`}></span>
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-80">
        {text}
      </span>
    </div>
  );
}

function Heading({ heading, subheading, headingSize = 'lg', className = '' }) {
  if (!heading && !subheading) return null;
  return (
    <>
      {heading && (
        <h2
          className={twMerge(
            `card-title ${getHeadingSize(headingSize)} font-light mb-5 anim-fade-up`,
            className
          )}
          style={{ transitionDelay: '0.05s' }}
        >
          {heading}
        </h2>
      )}
      {subheading && (
        <p
          className={twMerge(
            'text-[1rem] sm:text-[1.06rem] leading-[1.75] opacity-70 mb-2 anim-fade-up',
            className
          )}
          style={{ transitionDelay: '0.15s' }}
        >
          {subheading}
        </p>
      )}
    </>
  );
}

function BodyText({ body, isDark = false }) {
  if (!body) return null;
  const paragraphs = Array.isArray(body) ? body : [body];
  const pCls = isDark
    ? 'text-sm leading-[1.75] text-slate-300'
    : 'text-sm leading-[1.8] opacity-85';
  return (
    <div className="space-y-3 mt-2 anim-fade-up" style={{ transitionDelay: '0.2s' }}>
      {paragraphs.map((p, i) => (
        <p key={i} className={pCls}>
          {p}
        </p>
      ))}
    </div>
  );
}

function BulletList({ items, tone = 'blue', numbered = false, isDark = false }) {
  if (!items?.length) return null;
  const accent = getAccent(tone);
  const lineCls = isDark
    ? 'text-[1rem] leading-[1.7] text-slate-200'
    : 'text-sm leading-[1.8] opacity-90';

  return (
    <ul className="mt-2 flex flex-col gap-2.5 anim-fade-up" style={{ transitionDelay: '0.2s' }}>
      {items.map((raw, i) => {
        const item = typeof raw === 'string' ? { title: raw } : raw;
        return (
          <li key={i} className="flex items-start gap-3">
            {numbered ? (
              <span
                className={`shrink-0 w-6 h-6 rounded-full ${accent.bg} ${accent.border} border flex items-center justify-center font-mono text-[11px] ${accent.textStrong}`}
              >
                {i + 1}
              </span>
            ) : (
              <span
                className={`shrink-0 mt-[0.55rem] w-1 h-1 rounded-full ${isDark ? 'bg-blue-400' : accent.dot}`}
              ></span>
            )}
            <div className="flex-1">
              {item.title && <div className={lineCls}>{item.title}</div>}
              {item.desc && (
                <div className="text-[0.8rem] leading-[1.6] opacity-65 mt-0.5">
                  {item.desc}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function PillRow({ pills, tone = 'blue' }) {
  if (!pills?.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-6 anim-fade-up" style={{ transitionDelay: '0.2s' }}>
      {pills.map((raw, i) => {
        const pill = typeof raw === 'string' ? { label: raw } : raw;
        const accent = getAccent(pill.color || tone);
        return (
          <span
            key={i}
            className={`inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-mono uppercase tracking-[0.14em] ${accent.pill}`}
          >
            {pill.label}
          </span>
        );
      })}
    </div>
  );
}

function StatBlock({ value, label, suffix, tone = 'blue', centered = false }) {
  if (!value && !label) return null;
  const accent = getAccent(tone);
  return (
    <div
      className={`mt-2 anim-fade-up ${centered ? 'flex flex-col items-center' : ''}`}
      style={{ transitionDelay: '0.2s' }}
    >
      {/* Original operational metric card: text-5xl (3rem) on desktop */}
      <div className="card-title text-5xl font-medium leading-none tracking-[-0.05em]">
        {value}
        {suffix && <span className={accent.textStrong}>{suffix}</span>}
      </div>
      {label && (
        <div
          className={`text-sm leading-[1.75] opacity-75 mt-3 max-w-[24ch] ${centered ? 'text-center' : ''}`}
        >
          {label}
        </div>
      )}
    </div>
  );
}

function ImageBlock({ image, alt, caption, rounded = true }) {
  if (!image) return null;
  return (
    <figure className="mt-4 anim-fade-up" style={{ transitionDelay: '0.15s' }}>
      <div className={`overflow-hidden ${rounded ? 'rounded-2xl' : ''} border border-white/10`}>
        <img
          src={image}
          alt={alt || ''}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="text-sm opacity-70 mt-3 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function ContentCard(props) {
  const {
    layout = 'text',
    eyebrow,
    eyebrowColor = 'blue',
    heading,
    subheading,
    headingSize = 'lg',
    body,
    items,
    pills,
    image,
    imagePosition = 'none',
    imageAlt,
    caption,
    value,
    label,
    suffix,
    tone = 'blue',
    cta,
    size = 'full',
    className = '',
    animDelay = 0,
    fixedHeight,
    minHeight,
    contentAlign = 'top',
    /** 'operational' = 24px radius + p-8 inner (template row). 'module' = 22px + p-5. */
    shellStyle = 'operational',
  } = props;

  const wantsSideImage = image && (imagePosition === 'left' || imagePosition === 'right');
  const wantsTopImage = image && imagePosition === 'top';
  const wantsBgImage = image && imagePosition === 'background';

  const flexDir =
    imagePosition === 'left'
      ? 'flex-col md:flex-row'
      : imagePosition === 'right'
      ? 'flex-col md:flex-row-reverse'
      : 'flex-col';

  const heightStyle = {
    ...(fixedHeight ? { height: fixedHeight } : {}),
    ...(minHeight ? { minHeight } : {}),
  };
  const hasBoxSize = Boolean(fixedHeight || minHeight);
  const heightStyleOrUndefined = hasBoxSize ? heightStyle : undefined;

  const statCentered = layout === 'stat' && contentAlign === 'between';

  const justifyClass =
    contentAlign === 'between'
      ? 'justify-between'
      : contentAlign === 'center'
      ? 'justify-center'
      : contentAlign === 'bottom'
      ? 'justify-end'
      : 'justify-start';

  const isDark = wantsBgImage;

  const renderBody = () => {
    switch (layout) {
      case 'bullets':
        return <BulletList items={items} tone={tone} isDark={isDark} />;
      case 'numbered':
        return <BulletList items={items} tone={tone} numbered isDark={isDark} />;
      case 'pills':
        return <PillRow pills={pills} tone={tone} />;
      case 'stat':
        return (
          <StatBlock
            value={value}
            label={label}
            suffix={suffix}
            tone={tone}
            centered={statCentered}
          />
        );
      case 'image':
        return <ImageBlock image={image} alt={imageAlt} caption={caption} />;
      case 'text':
      default:
        return <BodyText body={body} isDark={isDark} />;
    }
  };

  const showSharedImage = layout !== 'image' && !wantsBgImage && (wantsSideImage || wantsTopImage);

  const shellExtra =
    shellClassMap[shellStyle] || shellClassMap.operational;
  const innerPad =
    shellStyle === 'module' ? 'p-5' : sizePadding[size] || sizePadding.full;

  return (
    <div
      className={`anim-trigger anim-fade-up ${sizeColSpan[size] || ''}`}
      style={{
        ...(animDelay ? { transitionDelay: `${animDelay}s` } : {}),
      }}
    >
      <div
        className={twMerge(
          'group glass-card relative flex h-full min-h-0 flex-col overflow-hidden',
          shellExtra,
          isDark ? 'text-white [&_.card-title]:text-white' : '',
          className
        )}
        style={heightStyleOrUndefined}
      >
        {wantsBgImage && (
          <>
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover opacity-[0.88] transition-opacity duration-700 group-hover:opacity-100"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-white/5 via-transparent to-slate-950/72"></div>
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_70%_26%,rgba(96,165,250,0.30),transparent_18%)]"></div>
          </>
        )}

        <div
          className={twMerge(
            'relative z-10 flex min-h-0 w-full min-w-0 flex-1',
            flexDir,
            'gap-5',
            innerPad
          )}
        >
          {showSharedImage && (
            <div
              className={`${
                wantsSideImage ? 'w-full md:w-1/3' : 'w-full h-56 md:h-72'
              } relative shrink-0 overflow-hidden rounded-2xl border border-white/10`}
            >
              <img
                src={image}
                alt={imageAlt || ''}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          <div
            className={twMerge(
              'flex min-h-0 min-w-0 flex-1 flex-col',
              justifyClass,
              statCentered && 'items-center text-center'
            )}
          >
            <Eyebrow
              text={eyebrow}
              color={eyebrowColor}
              className={statCentered ? 'self-center' : undefined}
            />
            <Heading
              heading={heading}
              subheading={subheading}
              headingSize={headingSize}
              className={statCentered ? 'text-center' : undefined}
            />

            {renderBody()}

            {cta && (
              <div
                className={twMerge(
                  'mt-6 w-full anim-fade-up',
                  statCentered && 'max-w-md'
                )}
                style={{ transitionDelay: '0.3s' }}
              >
                <StripeAwareCta cta={cta} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
