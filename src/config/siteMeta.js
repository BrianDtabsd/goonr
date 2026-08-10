/**
 * Per-deploy branding for white-label client sites.
 * Set VITE_* vars per client; Embedded Checkout uses your Stripe keys from the same .env (your account).
 *
 * Precedence: env vars > Studio localStorage overrides > defaults.
 *
 * @see src/lib/stripeEnv.js — publishable key + session URL
 * @see src/hooks/useSiteMeta.jsx — reactive Studio overrides
 */

export const SITE_META_DEFAULTS = {
  brandName: 'ShopSite',
  documentTitle: 'ShopSite — Your store',
  metaDescription:
    'ShopSite — a ready-made storefront and marketing template. Replace this copy with your brand story, products, and plans.',
  footerBlurb:
    'Your Brand footer line — replace this with a short sentence about what you sell and who you serve.',
};

/**
 * Resolve site meta. Pass Studio overrides (from localStorage) when available.
 * Env vars always win when set.
 */
export function getSiteMeta(overrides = {}) {
  const brand =
    import.meta.env.VITE_SITE_BRAND_NAME?.trim() ||
    overrides.brandName?.trim() ||
    SITE_META_DEFAULTS.brandName;

  const documentTitle =
    import.meta.env.VITE_SITE_TITLE?.trim() ||
    overrides.documentTitle?.trim() ||
    (overrides.brandName?.trim() && !import.meta.env.VITE_SITE_BRAND_NAME
      ? `${brand} — Your store`
      : null) ||
    SITE_META_DEFAULTS.documentTitle;

  const metaDescription =
    import.meta.env.VITE_SITE_META_DESCRIPTION?.trim() ||
    overrides.metaDescription?.trim() ||
    SITE_META_DEFAULTS.metaDescription;

  const footerBlurb =
    import.meta.env.VITE_SITE_FOOTER_BLURB?.trim() ||
    overrides.footerBlurb?.trim() ||
    SITE_META_DEFAULTS.footerBlurb;

  return {
    brandName: brand,
    documentTitle,
    metaDescription,
    footerBlurb,
    /** True when a VITE_SITE_* env var is set for that field (Studio should not override). */
    lockedByEnv: {
      brandName: Boolean(import.meta.env.VITE_SITE_BRAND_NAME?.trim()),
      documentTitle: Boolean(import.meta.env.VITE_SITE_TITLE?.trim()),
      metaDescription: Boolean(import.meta.env.VITE_SITE_META_DESCRIPTION?.trim()),
      footerBlurb: Boolean(import.meta.env.VITE_SITE_FOOTER_BLURB?.trim()),
    },
  };
}
