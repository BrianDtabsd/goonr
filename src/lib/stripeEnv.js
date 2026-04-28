/** Client-safe Stripe settings (publishable key + session endpoint URL).
 * White-label: same publishable + secret keys per client deploy = charges on YOUR Stripe account.
 * Do not set Connect destination env vars unless payouts go to a different connected account.
 */

export function getStripePublishableKey() {
  return (
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_SHOPSITE_STRIPE_PUBLISHABLE_KEY ||
    ''
  );
}

/**
 * Base URL for Stripe API endpoints (Cloudflare Worker in production, '' = same-origin in dev).
 * Set VITE_STRIPE_API_BASE to your deployed Worker, e.g. https://shopsite-stripe-api.<acct>.workers.dev
 */
export function getStripeApiBase() {
  const base = import.meta.env.VITE_STRIPE_API_BASE || '';
  return base.replace(/\/+$/, '');
}

/** POST JSON: { priceId, mode?, returnUrl, quantity? } → { clientSecret } */
export function getCreateCheckoutSessionUrl() {
  if (import.meta.env.VITE_STRIPE_CHECKOUT_SESSION_URL) {
    return import.meta.env.VITE_STRIPE_CHECKOUT_SESSION_URL;
  }
  return `${getStripeApiBase()}/api/stripe/create-embedded-checkout-session`;
}

/** Stripe Connect endpoints exposed by the Worker / dev middleware. */
export function getConnectEndpoints() {
  const base = getStripeApiBase();
  return {
    createAccount: `${base}/api/stripe/connect/create-account`,
    accountLink: `${base}/api/stripe/connect/account-link`,
    accountStatus: `${base}/api/stripe/connect/account`,
  };
}

export function isEmbeddedStripeAvailableForCta(cta) {
  if (!cta?.stripePriceId) return false;
  return Boolean(getStripePublishableKey());
}
