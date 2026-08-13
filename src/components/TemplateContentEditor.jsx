import React, { useMemo, useState } from 'react';
import {
  useTemplateContent,
  TEMPLATE_SECTION_KEYS,
  TEMPLATE_SECTION_LABELS,
} from '../hooks/useTemplateContent';

/**
 * Click-to-replace: when value still matches the template base, focus selects all.
 * Sample fields get a dashed border cue.
 */
function TextField({
  label,
  value,
  onChange,
  rows = 1,
  placeholder,
  baseValue,
  disabled = false,
}) {
  const isSample =
    !disabled &&
    baseValue !== undefined &&
    String(value ?? '') === String(baseValue ?? '');

  const common = [
    'mt-1 w-full rounded-md border bg-slate-900 px-2 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none',
    disabled ? 'opacity-60 cursor-not-allowed border-slate-700' : '',
    !disabled && isSample
      ? 'border-dashed border-amber-500/40 focus:border-amber-400'
      : !disabled
        ? 'border-slate-600 focus:border-blue-500'
        : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleFocus = (e) => {
    if (isSample) {
      e.target.select();
    }
  };

  return (
    <label className="mb-2.5 block">
      <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-slate-500">
        {label}
        {isSample ? (
          <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-mono normal-case tracking-normal text-amber-200/90">
            sample
          </span>
        ) : null}
      </span>
      {rows > 1 ? (
        <textarea
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          className={common}
        />
      ) : (
        <input
          type="text"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          placeholder={placeholder}
          disabled={disabled}
          className={common}
        />
      )}
    </label>
  );
}

function SectionShell({ sectionKey, title, children, defaultOpen }) {
  const { overrides, resetTemplateSection } = useTemplateContent();
  const dirty = Boolean(overrides?.[sectionKey]);

  return (
    <details
      className="mb-3 rounded-lg border border-white/10 bg-slate-900/40"
      open={defaultOpen}
    >
      <summary className="cursor-pointer list-none px-3 py-2 text-xs font-semibold text-slate-200 flex items-center gap-2">
        <span className="flex-1">{title}</span>
        {dirty ? (
          <span className="text-[9px] font-mono uppercase tracking-wider text-amber-300/80">
            edited
          </span>
        ) : null}
        <button
          type="button"
          className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-40"
          disabled={!dirty}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (
              window.confirm(
                `Restore ${title} to defaults from src/content/?`
              )
            ) {
              resetTemplateSection(sectionKey);
            }
          }}
        >
          Restore
        </button>
      </summary>
      <div className="border-t border-white/10 p-3">{children}</div>
    </details>
  );
}

function HomeCardFields({ sectionId, cardIndex, card, baseCard, patchHomeCard }) {
  const itemsText = Array.isArray(card.items)
    ? card.items
        .map((it) => (typeof it === 'string' ? it : it.title || ''))
        .join('\n')
    : '';
  const baseItemsText = Array.isArray(baseCard?.items)
    ? baseCard.items
        .map((it) => (typeof it === 'string' ? it : it.title || ''))
        .join('\n')
    : '';

  return (
    <div className="mt-2 space-y-0 border-t border-white/10 pt-2">
      <TextField
        label="Eyebrow"
        value={card.eyebrow}
        baseValue={baseCard?.eyebrow}
        onChange={(v) => patchHomeCard(sectionId, cardIndex, { eyebrow: v })}
      />
      <TextField
        label="Heading"
        value={card.heading}
        baseValue={baseCard?.heading}
        onChange={(v) => patchHomeCard(sectionId, cardIndex, { heading: v })}
      />
      <TextField
        label="Subheading"
        value={card.subheading}
        baseValue={baseCard?.subheading}
        onChange={(v) => patchHomeCard(sectionId, cardIndex, { subheading: v })}
        rows={2}
      />
      <TextField
        label="Body"
        value={card.body}
        baseValue={baseCard?.body}
        onChange={(v) => patchHomeCard(sectionId, cardIndex, { body: v })}
        rows={3}
      />
      <TextField
        label="Label (stat)"
        value={card.label}
        baseValue={baseCard?.label}
        onChange={(v) => patchHomeCard(sectionId, cardIndex, { label: v })}
      />
      <TextField
        label="Value (stat)"
        value={card.value}
        baseValue={baseCard?.value}
        onChange={(v) => patchHomeCard(sectionId, cardIndex, { value: v })}
      />
      <TextField
        label="Suffix (stat)"
        value={card.suffix}
        baseValue={baseCard?.suffix}
        onChange={(v) => patchHomeCard(sectionId, cardIndex, { suffix: v })}
      />
      <TextField
        label="Image URL"
        value={card.image}
        baseValue={baseCard?.image}
        onChange={(v) => patchHomeCard(sectionId, cardIndex, { image: v })}
      />
      <TextField
        label="Bullets (one per line)"
        value={itemsText}
        baseValue={baseItemsText}
        onChange={(v) => {
          const items = v.split('\n').map((s) => s.trim()).filter(Boolean);
          patchHomeCard(sectionId, cardIndex, { items });
        }}
        rows={4}
      />
      <TextField
        label="CTA label"
        value={card.cta?.label}
        baseValue={baseCard?.cta?.label}
        onChange={(v) =>
          patchHomeCard(sectionId, cardIndex, { cta: { ...card.cta, label: v } })
        }
      />
      <TextField
        label="CTA href / #anchor"
        value={card.cta?.href}
        baseValue={baseCard?.cta?.href}
        onChange={(v) =>
          patchHomeCard(sectionId, cardIndex, { cta: { ...card.cta, href: v } })
        }
      />
      <TextField
        label="Stripe Price ID (embedded, optional)"
        value={card.cta?.stripePriceId}
        baseValue={baseCard?.cta?.stripePriceId}
        placeholder="price_…"
        onChange={(v) =>
          patchHomeCard(sectionId, cardIndex, {
            cta: { ...card.cta, stripePriceId: v || undefined },
          })
        }
      />
      <TextField
        label="Stripe checkout mode"
        value={card.cta?.stripeCheckoutMode}
        baseValue={baseCard?.cta?.stripeCheckoutMode}
        placeholder="subscription or payment"
        onChange={(v) =>
          patchHomeCard(sectionId, cardIndex, {
            cta: { ...card.cta, stripeCheckoutMode: v || undefined },
          })
        }
      />
      <TextField
        label="Stripe Payment Link (optional fallback)"
        value={card.cta?.stripeLink}
        baseValue={baseCard?.cta?.stripeLink}
        onChange={(v) =>
          patchHomeCard(sectionId, cardIndex, {
            cta: { ...card.cta, stripeLink: v || undefined },
          })
        }
      />
    </div>
  );
}

export default function TemplateContentEditor({ embedded = false }) {
  const {
    bases,
    mergedHomeSections,
    mergedHero,
    mergedPricingIntro,
    mergedPricingTiers,
    mergedStoreIntro,
    mergedStoreProducts,
    mergedBlogIntro,
    mergedBlogPosts,
    mergedSalesIntro,
    mergedSalesProducts,
    mergedSystemLogicIntro,
    mergedSystemLogicSteps,
    mergedFaqIntro,
    mergedFaqItems,
    patchHero,
    patchHomeSectionHeader,
    patchHomeCard,
    patchPricingIntro,
    patchPricingTier,
    patchStoreIntro,
    patchStoreProduct,
    patchBlogIntro,
    patchBlogPost,
    patchSalesIntro,
    patchSalesProduct,
    patchSystemLogicIntro,
    patchSystemLogicStep,
    patchFaqIntro,
    patchFaqItem,
    resetTemplateOverrides,
    exportOverridesJson,
    importOverridesJson,
  } = useTemplateContent();

  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');
  const [query, setQuery] = useState('');

  const visibleKeys = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TEMPLATE_SECTION_KEYS;
    return TEMPLATE_SECTION_KEYS.filter((key) => {
      const label = TEMPLATE_SECTION_LABELS[key] || key;
      return label.toLowerCase().includes(q) || key.toLowerCase().includes(q);
    });
  }, [query]);

  const show = (key) => visibleKeys.includes(key);

  return (
    <div className={embedded ? '' : 'mt-8 border-t border-white/15 pt-6'}>
      {!embedded ? (
        <>
          <h3 className="mb-1 text-sm font-bold text-white">Site copy (template)</h3>
          <p className="mb-4 text-[11px] leading-relaxed text-slate-500">
            Click a sample field to select all, then type to replace. Overrides save in{' '}
            <code className="text-slate-400">localStorage</code>. For a client deploy, merge into{' '}
            <code className="text-slate-400">src/content/*.js</code>.
          </p>
        </>
      ) : (
        <p className="mb-3 text-[11px] leading-relaxed text-slate-500">
          Click a <span className="text-amber-200/90">sample</span> field to select all, then type
          to replace. Use Restore on a section to undo that section only.
        </p>
      )}

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Find section (hero, pricing, faq…)"
        className="mb-3 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none"
      />

      {show('hero') ? (
        <SectionShell sectionKey="hero" title={TEMPLATE_SECTION_LABELS.hero} defaultOpen>
          <TextField
            label="Title line 1"
            value={mergedHero.titleLine1}
            baseValue={bases.hero.titleLine1}
            onChange={(v) => patchHero({ titleLine1: v })}
          />
          <TextField
            label="Title line 2"
            value={mergedHero.titleLine2}
            baseValue={bases.hero.titleLine2}
            onChange={(v) => patchHero({ titleLine2: v })}
          />
          <TextField
            label="Title line 3"
            value={mergedHero.titleLine3}
            baseValue={bases.hero.titleLine3}
            onChange={(v) => patchHero({ titleLine3: v })}
          />
          <TextField
            label="Subtitle"
            value={mergedHero.subtitle}
            baseValue={bases.hero.subtitle}
            onChange={(v) => patchHero({ subtitle: v })}
            rows={3}
          />
          <TextField
            label="Primary CTA label"
            value={mergedHero.primaryCtaLabel}
            baseValue={bases.hero.primaryCtaLabel}
            onChange={(v) => patchHero({ primaryCtaLabel: v })}
          />
          <TextField
            label="Primary CTA link"
            value={mergedHero.primaryCtaHref}
            baseValue={bases.hero.primaryCtaHref}
            onChange={(v) => patchHero({ primaryCtaHref: v })}
          />
          <TextField
            label="Secondary CTA label"
            value={mergedHero.secondaryCtaLabel}
            baseValue={bases.hero.secondaryCtaLabel}
            onChange={(v) => patchHero({ secondaryCtaLabel: v })}
          />
          <TextField
            label="Secondary CTA link"
            value={mergedHero.secondaryCtaHref}
            baseValue={bases.hero.secondaryCtaHref}
            onChange={(v) => patchHero({ secondaryCtaHref: v })}
          />
        </SectionShell>
      ) : null}

      {show('home') ? (
        <SectionShell sectionKey="home" title={TEMPLATE_SECTION_LABELS.home}>
          {mergedHomeSections.map((section) => {
            const baseSection = bases.home.find((s) => s.id === section.id);
            return (
              <details
                key={section.id}
                className="mb-2 rounded border border-white/5 bg-black/20"
              >
                <summary className="cursor-pointer px-2 py-1.5 text-[11px] font-medium text-blue-200">
                  {section.id}
                </summary>
                <div className="border-t border-white/5 p-2">
                  {section.header && (
                    <>
                      <TextField
                        label="Section eyebrow"
                        value={section.header.eyebrow}
                        baseValue={baseSection?.header?.eyebrow}
                        onChange={(v) =>
                          patchHomeSectionHeader(section.id, { eyebrow: v })
                        }
                      />
                      <TextField
                        label="Section heading"
                        value={section.header.heading}
                        baseValue={baseSection?.header?.heading}
                        onChange={(v) =>
                          patchHomeSectionHeader(section.id, { heading: v })
                        }
                      />
                      <TextField
                        label="Section subheading"
                        value={section.header.subheading}
                        baseValue={baseSection?.header?.subheading}
                        onChange={(v) =>
                          patchHomeSectionHeader(section.id, { subheading: v })
                        }
                        rows={3}
                      />
                    </>
                  )}
                  {section.cards.map((card, idx) => (
                    <details key={idx} className="mb-2 mt-2 rounded border border-white/5">
                      <summary className="cursor-pointer px-2 py-1 text-[10px] text-slate-400">
                        Card {idx + 1} · {card.layout || 'text'}
                      </summary>
                      <HomeCardFields
                        sectionId={section.id}
                        cardIndex={idx}
                        card={card}
                        baseCard={baseSection?.cards?.[idx]}
                        patchHomeCard={patchHomeCard}
                      />
                    </details>
                  ))}
                </div>
              </details>
            );
          })}
        </SectionShell>
      ) : null}

      {show('systemLogic') ? (
        <SectionShell
          sectionKey="systemLogic"
          title={TEMPLATE_SECTION_LABELS.systemLogic}
        >
          <TextField
            label="Eyebrow"
            value={mergedSystemLogicIntro.eyebrow}
            baseValue={bases.systemLogic.intro.eyebrow}
            onChange={(v) => patchSystemLogicIntro({ eyebrow: v })}
          />
          <TextField
            label="Heading line 1"
            value={mergedSystemLogicIntro.headingLine1}
            baseValue={bases.systemLogic.intro.headingLine1}
            onChange={(v) => patchSystemLogicIntro({ headingLine1: v })}
          />
          <TextField
            label="Heading line 2"
            value={mergedSystemLogicIntro.headingLine2}
            baseValue={bases.systemLogic.intro.headingLine2}
            onChange={(v) => patchSystemLogicIntro({ headingLine2: v })}
          />
          <TextField
            label="Subheading"
            value={mergedSystemLogicIntro.subheading}
            baseValue={bases.systemLogic.intro.subheading}
            onChange={(v) => patchSystemLogicIntro({ subheading: v })}
            rows={3}
          />
          <TextField
            label="CTA label"
            value={mergedSystemLogicIntro.exploreCtaLabel}
            baseValue={bases.systemLogic.intro.exploreCtaLabel}
            onChange={(v) => patchSystemLogicIntro({ exploreCtaLabel: v })}
          />
          <TextField
            label="CTA href"
            value={mergedSystemLogicIntro.exploreCtaHref}
            baseValue={bases.systemLogic.intro.exploreCtaHref}
            onChange={(v) => patchSystemLogicIntro({ exploreCtaHref: v })}
          />
          {mergedSystemLogicSteps.map((step, i) => (
            <details key={i} className="mb-2 mt-2 rounded border border-white/5">
              <summary className="cursor-pointer px-2 py-1 text-[10px] text-slate-400">
                Step {i + 1}: {step.title}
              </summary>
              <div className="p-2">
                <TextField
                  label="Title"
                  value={step.title}
                  baseValue={bases.systemLogic.steps[i]?.title}
                  onChange={(v) => patchSystemLogicStep(i, { title: v })}
                />
                <TextField
                  label="Description"
                  value={step.description}
                  baseValue={bases.systemLogic.steps[i]?.description}
                  onChange={(v) => patchSystemLogicStep(i, { description: v })}
                  rows={3}
                />
                <TextField
                  label="Image URL"
                  value={step.image}
                  baseValue={bases.systemLogic.steps[i]?.image}
                  onChange={(v) => patchSystemLogicStep(i, { image: v })}
                />
              </div>
            </details>
          ))}
        </SectionShell>
      ) : null}

      {show('pricing') ? (
        <SectionShell sectionKey="pricing" title={TEMPLATE_SECTION_LABELS.pricing}>
          <TextField
            label="Eyebrow"
            value={mergedPricingIntro.eyebrow}
            baseValue={bases.pricing.intro.eyebrow}
            onChange={(v) => patchPricingIntro({ eyebrow: v })}
          />
          <TextField
            label="Heading"
            value={mergedPricingIntro.heading}
            baseValue={bases.pricing.intro.heading}
            onChange={(v) => patchPricingIntro({ heading: v })}
          />
          <TextField
            label="Subheading"
            value={mergedPricingIntro.subheading}
            baseValue={bases.pricing.intro.subheading}
            onChange={(v) => patchPricingIntro({ subheading: v })}
            rows={2}
          />
          {mergedPricingTiers.map((tier, i) => (
            <details key={i} className="mb-2 mt-2 rounded border border-white/5">
              <summary className="cursor-pointer px-2 py-1 text-[10px] text-slate-400">
                Tier: {tier.name}
              </summary>
              <div className="p-2">
                <TextField
                  label="Name"
                  value={tier.name}
                  baseValue={bases.pricing.tiers[i]?.name}
                  onChange={(v) => patchPricingTier(i, { name: v })}
                />
                <TextField
                  label="Price"
                  value={tier.price}
                  baseValue={bases.pricing.tiers[i]?.price}
                  onChange={(v) => patchPricingTier(i, { price: v })}
                />
                <TextField
                  label="Period"
                  value={tier.period}
                  baseValue={bases.pricing.tiers[i]?.period}
                  onChange={(v) => patchPricingTier(i, { period: v })}
                />
                <TextField
                  label="Description"
                  value={tier.desc}
                  baseValue={bases.pricing.tiers[i]?.desc}
                  onChange={(v) => patchPricingTier(i, { desc: v })}
                  rows={2}
                />
                <TextField
                  label="Features (one per line)"
                  value={(tier.features || []).join('\n')}
                  baseValue={(bases.pricing.tiers[i]?.features || []).join('\n')}
                  onChange={(v) =>
                    patchPricingTier(i, {
                      features: v.split('\n').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  rows={5}
                />
                <TextField
                  label="CTA label"
                  value={tier.cta?.label}
                  baseValue={bases.pricing.tiers[i]?.cta?.label}
                  onChange={(v) =>
                    patchPricingTier(i, { cta: { ...tier.cta, label: v } })
                  }
                />
                <TextField
                  label="CTA href"
                  value={tier.cta?.href}
                  baseValue={bases.pricing.tiers[i]?.cta?.href}
                  onChange={(v) =>
                    patchPricingTier(i, { cta: { ...tier.cta, href: v } })
                  }
                />
                <TextField
                  label="Stripe Price ID (embedded checkout)"
                  value={tier.cta?.stripePriceId}
                  baseValue={bases.pricing.tiers[i]?.cta?.stripePriceId}
                  placeholder="price_…"
                  onChange={(v) =>
                    patchPricingTier(i, {
                      cta: { ...tier.cta, stripePriceId: v || undefined },
                    })
                  }
                />
                <TextField
                  label="Stripe checkout mode"
                  value={tier.cta?.stripeCheckoutMode}
                  baseValue={bases.pricing.tiers[i]?.cta?.stripeCheckoutMode}
                  placeholder="subscription or payment"
                  onChange={(v) =>
                    patchPricingTier(i, {
                      cta: {
                        ...tier.cta,
                        stripeCheckoutMode: v || undefined,
                      },
                    })
                  }
                />
                <TextField
                  label="Stripe link (fallback)"
                  value={tier.cta?.stripeLink}
                  baseValue={bases.pricing.tiers[i]?.cta?.stripeLink}
                  onChange={(v) =>
                    patchPricingTier(i, {
                      cta: { ...tier.cta, stripeLink: v || undefined },
                    })
                  }
                />
              </div>
            </details>
          ))}
        </SectionShell>
      ) : null}

      {show('store') ? (
        <SectionShell sectionKey="store" title={TEMPLATE_SECTION_LABELS.store}>
          <TextField
            label="Page heading"
            value={mergedStoreIntro.heading}
            baseValue={bases.store.intro.heading}
            onChange={(v) => patchStoreIntro({ heading: v })}
          />
          <TextField
            label="Page subheading"
            value={mergedStoreIntro.subheading}
            baseValue={bases.store.intro.subheading}
            onChange={(v) => patchStoreIntro({ subheading: v })}
            rows={2}
          />
          {mergedStoreProducts.map((p, i) => (
            <details key={i} className="mb-2 mt-2 rounded border border-white/5">
              <summary className="cursor-pointer px-2 py-1 text-[10px] text-slate-400">
                Product {i + 1}
              </summary>
              <div className="p-2">
                <TextField
                  label="Heading"
                  value={p.heading}
                  baseValue={bases.store.products[i]?.heading}
                  onChange={(v) => patchStoreProduct(i, { heading: v })}
                />
                <TextField
                  label="Subheading (price)"
                  value={p.subheading}
                  baseValue={bases.store.products[i]?.subheading}
                  onChange={(v) => patchStoreProduct(i, { subheading: v })}
                />
                <TextField
                  label="Body"
                  value={p.body}
                  baseValue={bases.store.products[i]?.body}
                  onChange={(v) => patchStoreProduct(i, { body: v })}
                  rows={3}
                />
                <TextField
                  label="Image URL"
                  value={p.image}
                  baseValue={bases.store.products[i]?.image}
                  onChange={(v) => patchStoreProduct(i, { image: v })}
                />
                <TextField
                  label="CTA label"
                  value={p.cta?.label}
                  baseValue={bases.store.products[i]?.cta?.label}
                  onChange={(v) =>
                    patchStoreProduct(i, { cta: { ...p.cta, label: v } })
                  }
                />
                <TextField
                  label="Stripe link"
                  value={p.cta?.stripeLink}
                  baseValue={bases.store.products[i]?.cta?.stripeLink}
                  onChange={(v) =>
                    patchStoreProduct(i, {
                      cta: { ...p.cta, stripeLink: v || undefined },
                    })
                  }
                />
              </div>
            </details>
          ))}
        </SectionShell>
      ) : null}

      {show('blog') ? (
        <SectionShell sectionKey="blog" title={TEMPLATE_SECTION_LABELS.blog}>
          <TextField
            label="Page heading"
            value={mergedBlogIntro.heading}
            baseValue={bases.blog.intro.heading}
            onChange={(v) => patchBlogIntro({ heading: v })}
          />
          <TextField
            label="Page subheading"
            value={mergedBlogIntro.subheading}
            baseValue={bases.blog.intro.subheading}
            onChange={(v) => patchBlogIntro({ subheading: v })}
            rows={2}
          />
          {mergedBlogPosts.map((p, i) => (
            <details key={i} className="mb-2 mt-2 rounded border border-white/5">
              <summary className="cursor-pointer px-2 py-1 text-[10px] text-slate-400">
                Post {i + 1}
              </summary>
              <div className="p-2">
                <TextField
                  label="Eyebrow"
                  value={p.eyebrow}
                  baseValue={bases.blog.posts[i]?.eyebrow}
                  onChange={(v) => patchBlogPost(i, { eyebrow: v })}
                />
                <TextField
                  label="Heading"
                  value={p.heading}
                  baseValue={bases.blog.posts[i]?.heading}
                  onChange={(v) => patchBlogPost(i, { heading: v })}
                />
                <TextField
                  label="Body"
                  value={p.body}
                  baseValue={bases.blog.posts[i]?.body}
                  onChange={(v) => patchBlogPost(i, { body: v })}
                  rows={4}
                />
                <TextField
                  label="CTA label"
                  value={p.cta?.label}
                  baseValue={bases.blog.posts[i]?.cta?.label}
                  onChange={(v) =>
                    patchBlogPost(i, { cta: { ...p.cta, label: v } })
                  }
                />
              </div>
            </details>
          ))}
        </SectionShell>
      ) : null}

      {show('sales') ? (
        <SectionShell sectionKey="sales" title={TEMPLATE_SECTION_LABELS.sales}>
          <TextField
            label="Page heading"
            value={mergedSalesIntro.heading}
            baseValue={bases.sales.intro.heading}
            onChange={(v) => patchSalesIntro({ heading: v })}
          />
          <TextField
            label="Page subheading"
            value={mergedSalesIntro.subheading}
            baseValue={bases.sales.intro.subheading}
            onChange={(v) => patchSalesIntro({ subheading: v })}
            rows={2}
          />
          {mergedSalesProducts.map((p, i) => (
            <details key={i} className="mb-2 mt-2 rounded border border-white/5">
              <summary className="cursor-pointer px-2 py-1 text-[10px] text-slate-400">
                Item {i + 1}
              </summary>
              <div className="p-2">
                <TextField
                  label="Heading"
                  value={p.heading}
                  baseValue={bases.sales.products[i]?.heading}
                  onChange={(v) => patchSalesProduct(i, { heading: v })}
                />
                <TextField
                  label="Subheading"
                  value={p.subheading}
                  baseValue={bases.sales.products[i]?.subheading}
                  onChange={(v) => patchSalesProduct(i, { subheading: v })}
                />
                <TextField
                  label="Body"
                  value={p.body}
                  baseValue={bases.sales.products[i]?.body}
                  onChange={(v) => patchSalesProduct(i, { body: v })}
                  rows={3}
                />
                <TextField
                  label="Stripe link"
                  value={p.cta?.stripeLink}
                  baseValue={bases.sales.products[i]?.cta?.stripeLink}
                  onChange={(v) =>
                    patchSalesProduct(i, {
                      cta: { ...p.cta, stripeLink: v || undefined },
                    })
                  }
                />
              </div>
            </details>
          ))}
        </SectionShell>
      ) : null}

      {show('faq') ? (
        <SectionShell sectionKey="faq" title={TEMPLATE_SECTION_LABELS.faq}>
          <TextField
            label="Eyebrow"
            value={mergedFaqIntro.eyebrow}
            baseValue={bases.faq.intro.eyebrow}
            onChange={(v) => patchFaqIntro({ eyebrow: v })}
          />
          <TextField
            label="Heading"
            value={mergedFaqIntro.heading}
            baseValue={bases.faq.intro.heading}
            onChange={(v) => patchFaqIntro({ heading: v })}
          />
          <TextField
            label="Subheading"
            value={mergedFaqIntro.subheading}
            baseValue={bases.faq.intro.subheading}
            onChange={(v) => patchFaqIntro({ subheading: v })}
            rows={2}
          />
          {mergedFaqItems.map((item, i) => (
            <details key={i} className="mb-2 mt-2 rounded border border-white/5">
              <summary className="cursor-pointer px-2 py-1 text-[10px] text-slate-400">
                Q{i + 1}: {item.q}
              </summary>
              <div className="p-2">
                <TextField
                  label="Question"
                  value={item.q}
                  baseValue={bases.faq.items[i]?.q}
                  onChange={(v) => patchFaqItem(i, { q: v })}
                />
                <TextField
                  label="Answer"
                  value={item.a}
                  baseValue={bases.faq.items[i]?.a}
                  onChange={(v) => patchFaqItem(i, { a: v })}
                  rows={3}
                />
              </div>
            </details>
          ))}
        </SectionShell>
      ) : null}

      {visibleKeys.length === 0 ? (
        <p className="text-[11px] text-slate-500 mb-3">No sections match “{query}”.</p>
      ) : null}

      <div className="space-y-2 rounded-lg border border-white/10 bg-slate-900 p-3 sticky bottom-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Backup &amp; reset
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(exportOverridesJson());
              } catch {
                /* ignore */
              }
            }}
            className="rounded-md bg-slate-700 px-3 py-1.5 text-xs text-white hover:bg-slate-600"
          >
            Copy overrides JSON
          </button>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  'Reset all typed copy to defaults from src/content/?'
                )
              ) {
                resetTemplateOverrides();
              }
            }}
            className="rounded-md bg-red-900/60 px-3 py-1.5 text-xs text-red-100 hover:bg-red-800/70"
          >
            Reset all copy
          </button>
        </div>
        <TextField
          label="Paste JSON & apply"
          value={importText}
          onChange={setImportText}
          rows={4}
        />
        {importError && (
          <p className="text-xs text-red-400">{importError}</p>
        )}
        <button
          type="button"
          onClick={() => {
            setImportError('');
            try {
              importOverridesJson(importText);
              setImportText('');
            } catch (e) {
              setImportError(e.message || 'Invalid JSON');
            }
          }}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-xs text-white hover:bg-blue-500"
        >
          Apply pasted JSON
        </button>
      </div>
    </div>
  );
}

export { TextField };
