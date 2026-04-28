/**
 * Per-deploy branding for white-label client sites.
 * Set VITE_* vars per client; Embedded Checkout uses your Stripe keys from the same .env (your account).
 *
 * @see src/lib/stripeEnv.js — publishable key + session URL
 */

export function getSiteMeta() {
  const brand =
    import.meta.env.VITE_SITE_BRAND_NAME?.trim() || 'GAQO';
  const documentTitle =
    import.meta.env.VITE_SITE_TITLE?.trim() ||
    `${brand} — Environmental Intelligence`;
  const metaDescription =
    import.meta.env.VITE_SITE_META_DESCRIPTION?.trim() ||
    `${brand} — environmental intelligence platform. Subscribe for live atmospheric context and APIs.`;
  const footerBlurb =
    import.meta.env.VITE_SITE_FOOTER_BLURB?.trim() ||
    'Environmental intelligence for teams that need live atmospheric context — subscribe online, scale from trial to global operations.';
  return {
    brandName: brand,
    documentTitle,
    metaDescription,
    footerBlurb,
  };
}
