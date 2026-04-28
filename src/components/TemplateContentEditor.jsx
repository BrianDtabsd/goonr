import React, { useState } from 'react';
import { useTemplateContent } from '../hooks/useTemplateContent';

function TextField({ label, value, onChange, rows = 1, placeholder }) {
  const common =
    'mt-1 w-full rounded-md border border-slate-600 bg-slate-900 px-2 py-1.5 text-xs text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none';
  return (
    <label className="mb-2.5 block">
      <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
        {label}
      </span>
      {rows > 1 ? (
        <textarea
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className={common}
        />
      ) : (
        <input
          type="text"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={common}
        />
      )}
    </label>
  );
}

function HomeCardFields({ sectionId, cardIndex, card, patchHomeCard }) {
  const itemsText = Array.isArray(card.items)
    ? card.items
        .map((it) => (typeof it === 'string' ? it : it.title || ''))
        .join('\n')
    : '';

  return (
    <div className="mt-2 space-y-0 border-t border-white/10 pt-2">
      <TextField
        label="Eyebrow"
        value={card.eyebrow}
        onChange={(v) => patchHomeCard(sectionId, cardIndex, { eyebrow: v })}
      />
      <TextField
        label="Heading"
        value={card.heading}
        onChange={(v) => patchHomeCard(sectionId, cardIndex, { heading: v })}
      />
      <TextField
        label="Subheading"
        value={card.subheading}
        onChange={(v) => patchHomeCard(sectionId, cardIndex, { subheading: v })}
        rows={2}
      />
      <TextField
        label="Body"
        value={card.body}
        onChange={(v) => patchHomeCard(sectionId, cardIndex, { body: v })}
        rows={3}
      />
      <TextField
        label="Label (stat)"
        value={card.label}
        onChange={(v) => patchHomeCard(sectionId, cardIndex, { label: v })}
      />
      <TextField
        label="Value (stat)"
        value={card.value}
        onChange={(v) => patchHomeCard(sectionId, cardIndex, { value: v })}
      />
      <TextField
        label="Suffix (stat)"
        value={card.suffix}
        onChange={(v) => patchHomeCard(sectionId, cardIndex, { suffix: v })}
      />
      <TextField
        label="Image URL"
        value={card.image}
        onChange={(v) => patchHomeCard(sectionId, cardIndex, { image: v })}
      />
      <TextField
        label="Bullets (one per line)"
        value={itemsText}
        onChange={(v) => {
          const items = v.split('\n').map((s) => s.trim()).filter(Boolean);
          patchHomeCard(sectionId, cardIndex, { items });
        }}
        rows={4}
      />
      <TextField
        label="CTA label"
        value={card.cta?.label}
        onChange={(v) =>
          patchHomeCard(sectionId, cardIndex, { cta: { ...card.cta, label: v } })
        }
      />
      <TextField
        label="CTA href / #anchor"
        value={card.cta?.href}
        onChange={(v) =>
          patchHomeCard(sectionId, cardIndex, { cta: { ...card.cta, href: v } })
        }
      />
      <TextField
        label="Stripe Price ID (embedded, optional)"
        value={card.cta?.stripePriceId}
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
        onChange={(v) =>
          patchHomeCard(sectionId, cardIndex, {
            cta: { ...card.cta, stripeLink: v || undefined },
          })
        }
      />
    </div>
  );
}

export default function TemplateContentEditor() {
  const {
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
    resetTemplateOverrides,
    exportOverridesJson,
    importOverridesJson,
  } = useTemplateContent();

  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');

  return (
    <div className="mt-8 border-t border-white/15 pt-6">
      <h3 className="mb-1 text-sm font-bold text-white">Site copy (template)</h3>
      <p className="mb-4 text-[11px] leading-relaxed text-slate-500">
        Type here to reskin the site live. Overrides save in{' '}
        <code className="text-slate-400">localStorage</code>. For a new client branch,
        copy JSON below into your repo or merge into{' '}
        <code className="text-slate-400">src/content/*.js</code>.
      </p>

      <details className="mb-3 rounded-lg border border-white/10 bg-slate-900/40">
        <summary className="cursor-pointer px-3 py-2 text-xs font-semibold text-slate-200">
          Hero
        </summary>
        <div className="border-t border-white/10 p-3">
          <TextField
            label="Title line 1"
            value={mergedHero.titleLine1}
            onChange={(v) => patchHero({ titleLine1: v })}
          />
          <TextField
            label="Title line 2"
            value={mergedHero.titleLine2}
            onChange={(v) => patchHero({ titleLine2: v })}
          />
          <TextField
            label="Title line 3"
            value={mergedHero.titleLine3}
            onChange={(v) => patchHero({ titleLine3: v })}
          />
          <TextField
            label="Subtitle"
            value={mergedHero.subtitle}
            onChange={(v) => patchHero({ subtitle: v })}
            rows={3}
          />
          <TextField
            label="Primary CTA label"
            value={mergedHero.primaryCtaLabel}
            onChange={(v) => patchHero({ primaryCtaLabel: v })}
          />
          <TextField
            label="Primary CTA link"
            value={mergedHero.primaryCtaHref}
            onChange={(v) => patchHero({ primaryCtaHref: v })}
          />
          <TextField
            label="Secondary CTA label"
            value={mergedHero.secondaryCtaLabel}
            onChange={(v) => patchHero({ secondaryCtaLabel: v })}
          />
          <TextField
            label="Secondary CTA link"
            value={mergedHero.secondaryCtaHref}
            onChange={(v) => patchHero({ secondaryCtaHref: v })}
          />
        </div>
      </details>

      <details className="mb-3 rounded-lg border border-white/10 bg-slate-900/40">
        <summary className="cursor-pointer px-3 py-2 text-xs font-semibold text-slate-200">
          Home sections & cards
        </summary>
        <div className="max-h-[50vh] overflow-y-auto border-t border-white/10 p-3">
          {mergedHomeSections.map((section) => (
            <details key={section.id} className="mb-2 rounded border border-white/5 bg-black/20">
              <summary className="cursor-pointer px-2 py-1.5 text-[11px] font-medium text-blue-200">
                {section.id}
              </summary>
              <div className="border-t border-white/5 p-2">
                {section.header && (
                  <>
                    <TextField
                      label="Section eyebrow"
                      value={section.header.eyebrow}
                      onChange={(v) => patchHomeSectionHeader(section.id, { eyebrow: v })}
                    />
                    <TextField
                      label="Section heading"
                      value={section.header.heading}
                      onChange={(v) => patchHomeSectionHeader(section.id, { heading: v })}
                    />
                    <TextField
                      label="Section subheading"
                      value={section.header.subheading}
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
                      patchHomeCard={patchHomeCard}
                    />
                  </details>
                ))}
              </div>
            </details>
          ))}
        </div>
      </details>

      <details className="mb-3 rounded-lg border border-white/10 bg-slate-900/40">
        <summary className="cursor-pointer px-3 py-2 text-xs font-semibold text-slate-200">
          System logic
        </summary>
        <div className="border-t border-white/10 p-3">
          <TextField
            label="Eyebrow"
            value={mergedSystemLogicIntro.eyebrow}
            onChange={(v) => patchSystemLogicIntro({ eyebrow: v })}
          />
          <TextField
            label="Heading line 1"
            value={mergedSystemLogicIntro.headingLine1}
            onChange={(v) => patchSystemLogicIntro({ headingLine1: v })}
          />
          <TextField
            label="Heading line 2"
            value={mergedSystemLogicIntro.headingLine2}
            onChange={(v) => patchSystemLogicIntro({ headingLine2: v })}
          />
          <TextField
            label="Subheading"
            value={mergedSystemLogicIntro.subheading}
            onChange={(v) => patchSystemLogicIntro({ subheading: v })}
            rows={3}
          />
          <TextField
            label="CTA label"
            value={mergedSystemLogicIntro.exploreCtaLabel}
            onChange={(v) => patchSystemLogicIntro({ exploreCtaLabel: v })}
          />
          <TextField
            label="CTA href"
            value={mergedSystemLogicIntro.exploreCtaHref}
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
                  onChange={(v) => patchSystemLogicStep(i, { title: v })}
                />
                <TextField
                  label="Description"
                  value={step.description}
                  onChange={(v) => patchSystemLogicStep(i, { description: v })}
                  rows={3}
                />
                <TextField
                  label="Image URL"
                  value={step.image}
                  onChange={(v) => patchSystemLogicStep(i, { image: v })}
                />
              </div>
            </details>
          ))}
        </div>
      </details>

      <details className="mb-3 rounded-lg border border-white/10 bg-slate-900/40">
        <summary className="cursor-pointer px-3 py-2 text-xs font-semibold text-slate-200">
          Pricing
        </summary>
        <div className="border-t border-white/10 p-3">
          <TextField
            label="Eyebrow"
            value={mergedPricingIntro.eyebrow}
            onChange={(v) => patchPricingIntro({ eyebrow: v })}
          />
          <TextField
            label="Heading"
            value={mergedPricingIntro.heading}
            onChange={(v) => patchPricingIntro({ heading: v })}
          />
          <TextField
            label="Subheading"
            value={mergedPricingIntro.subheading}
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
                  onChange={(v) => patchPricingTier(i, { name: v })}
                />
                <TextField
                  label="Price"
                  value={tier.price}
                  onChange={(v) => patchPricingTier(i, { price: v })}
                />
                <TextField
                  label="Period"
                  value={tier.period}
                  onChange={(v) => patchPricingTier(i, { period: v })}
                />
                <TextField
                  label="Description"
                  value={tier.desc}
                  onChange={(v) => patchPricingTier(i, { desc: v })}
                  rows={2}
                />
                <TextField
                  label="Features (one per line)"
                  value={(tier.features || []).join('\n')}
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
                  onChange={(v) =>
                    patchPricingTier(i, { cta: { ...tier.cta, label: v } })
                  }
                />
                <TextField
                  label="CTA href"
                  value={tier.cta?.href}
                  onChange={(v) =>
                    patchPricingTier(i, { cta: { ...tier.cta, href: v } })
                  }
                />
                <TextField
                  label="Stripe Price ID (embedded checkout)"
                  value={tier.cta?.stripePriceId}
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
                  onChange={(v) =>
                    patchPricingTier(i, {
                      cta: { ...tier.cta, stripeLink: v || undefined },
                    })
                  }
                />
              </div>
            </details>
          ))}
        </div>
      </details>

      <details className="mb-3 rounded-lg border border-white/10 bg-slate-900/40">
        <summary className="cursor-pointer px-3 py-2 text-xs font-semibold text-slate-200">
          Store
        </summary>
        <div className="border-t border-white/10 p-3">
          <TextField
            label="Page heading"
            value={mergedStoreIntro.heading}
            onChange={(v) => patchStoreIntro({ heading: v })}
          />
          <TextField
            label="Page subheading"
            value={mergedStoreIntro.subheading}
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
                  onChange={(v) => patchStoreProduct(i, { heading: v })}
                />
                <TextField
                  label="Subheading (price)"
                  value={p.subheading}
                  onChange={(v) => patchStoreProduct(i, { subheading: v })}
                />
                <TextField
                  label="Body"
                  value={p.body}
                  onChange={(v) => patchStoreProduct(i, { body: v })}
                  rows={3}
                />
                <TextField
                  label="Image URL"
                  value={p.image}
                  onChange={(v) => patchStoreProduct(i, { image: v })}
                />
                <TextField
                  label="CTA label"
                  value={p.cta?.label}
                  onChange={(v) =>
                    patchStoreProduct(i, { cta: { ...p.cta, label: v } })
                  }
                />
                <TextField
                  label="Stripe link"
                  value={p.cta?.stripeLink}
                  onChange={(v) =>
                    patchStoreProduct(i, {
                      cta: { ...p.cta, stripeLink: v || undefined },
                    })
                  }
                />
              </div>
            </details>
          ))}
        </div>
      </details>

      <details className="mb-3 rounded-lg border border-white/10 bg-slate-900/40">
        <summary className="cursor-pointer px-3 py-2 text-xs font-semibold text-slate-200">
          Learn (/learn)
        </summary>
        <div className="border-t border-white/10 p-3">
          <TextField
            label="Page heading"
            value={mergedBlogIntro.heading}
            onChange={(v) => patchBlogIntro({ heading: v })}
          />
          <TextField
            label="Page subheading"
            value={mergedBlogIntro.subheading}
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
                  label="Eyebrow (date)"
                  value={p.eyebrow}
                  onChange={(v) => patchBlogPost(i, { eyebrow: v })}
                />
                <TextField
                  label="Heading"
                  value={p.heading}
                  onChange={(v) => patchBlogPost(i, { heading: v })}
                />
                <TextField
                  label="Body"
                  value={p.body}
                  onChange={(v) => patchBlogPost(i, { body: v })}
                  rows={4}
                />
                <TextField
                  label="CTA label"
                  value={p.cta?.label}
                  onChange={(v) =>
                    patchBlogPost(i, { cta: { ...p.cta, label: v } })
                  }
                />
              </div>
            </details>
          ))}
        </div>
      </details>

      <details className="mb-3 rounded-lg border border-white/10 bg-slate-900/40">
        <summary className="cursor-pointer px-3 py-2 text-xs font-semibold text-slate-200">
          Sales
        </summary>
        <div className="border-t border-white/10 p-3">
          <TextField
            label="Page heading"
            value={mergedSalesIntro.heading}
            onChange={(v) => patchSalesIntro({ heading: v })}
          />
          <TextField
            label="Page subheading"
            value={mergedSalesIntro.subheading}
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
                  onChange={(v) => patchSalesProduct(i, { heading: v })}
                />
                <TextField
                  label="Subheading"
                  value={p.subheading}
                  onChange={(v) => patchSalesProduct(i, { subheading: v })}
                />
                <TextField
                  label="Body"
                  value={p.body}
                  onChange={(v) => patchSalesProduct(i, { body: v })}
                  rows={3}
                />
                <TextField
                  label="Stripe link"
                  value={p.cta?.stripeLink}
                  onChange={(v) =>
                    patchSalesProduct(i, {
                      cta: { ...p.cta, stripeLink: v || undefined },
                    })
                  }
                />
              </div>
            </details>
          ))}
        </div>
      </details>

      <div className="space-y-2 rounded-lg border border-white/10 bg-slate-900/40 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Backup & reset
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
