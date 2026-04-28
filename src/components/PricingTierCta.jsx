import React from 'react';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import { useStripeEmbeddedCheckout } from '../context/StripeEmbeddedCheckoutContext';
import { isEmbeddedStripeAvailableForCta } from '../lib/stripeEnv';

/**
 * Pricing / checkout tier button: prefers Stripe Embedded Checkout when
 * cta.stripePriceId + VITE_STRIPE_PUBLISHABLE_KEY are set; otherwise Payment Link or router link.
 */
export default function PricingTierCta({
  cta,
  highlighted,
  returnPath = '/checkout',
  className = 'w-full',
}) {
  const { openEmbeddedCheckout } = useStripeEmbeddedCheckout();
  if (!cta) return null;
  const variant = cta.variant || (highlighted ? 'primary' : 'outline');
  const btnClass = twMerge(className);

  if (isEmbeddedStripeAvailableForCta(cta)) {
    return (
      <Button
        variant={variant}
        className={btnClass}
        onClick={() =>
          openEmbeddedCheckout({
            priceId: cta.stripePriceId,
            mode: cta.stripeCheckoutMode || 'subscription',
            quantity: cta.stripeQuantity ?? 1,
            returnPath,
          })
        }
      >
        {cta.label}
      </Button>
    );
  }

  if (cta.stripeLink) {
    return (
      <Button
        variant={variant}
        className={btnClass}
        onClick={() => window.open(cta.stripeLink, '_blank', 'noopener,noreferrer')}
      >
        {cta.label}
      </Button>
    );
  }

  return (
    <Button variant={variant} className={btnClass} href={cta.href} to={cta.to}>
      {cta.label}
    </Button>
  );
}
