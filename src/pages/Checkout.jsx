import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PricingTierCta from '../components/PricingTierCta';
import { useTemplateContent } from '../hooks/useTemplateContent';

/**
 * Subscription hub. Mirrors homepage pricing tiers and uses Stripe Embedded Checkout
 * (or Payment Link fallback). Copy is pricing-page-skill aligned: outcome bullets, single CTA verb.
 */
function Checkout() {
  const { mergedPricingTiers } = useTemplateContent();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="flex-grow flex flex-col gap-12 md:gap-16 px-4 sm:px-6 lg:px-8 max-w-[1100px] mx-auto w-full mt-12 mb-24">
      {sessionId ? (
        <div
          className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-center text-sm text-emerald-100"
          role="status"
        >
          <strong className="text-white">You&rsquo;re in.</strong> Subscription confirmed — a receipt
          and onboarding email are on the way. Reference{' '}
          <span className="font-mono text-xs opacity-90">{sessionId}</span>.
        </div>
      ) : null}

      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/5 px-4 py-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-80">
            Secure checkout
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-white">
          Pick your plan, pay in seconds
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Cards, Apple Pay, Google Pay, and Link — handled by Stripe. Cancel anytime, no setup fees.
          You&rsquo;ll get live access the moment payment clears.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-[12px] text-slate-400">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Cancel anytime
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> No setup fees
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> PCI-DSS via Stripe
          </span>
        </div>
        <p className="mt-5 text-sm text-slate-400">
          Comparing plans?{' '}
          <a className="text-blue-400 hover:underline" href="/#pricing">
            See the full breakdown
          </a>
          . Need hardware?{' '}
          <a className="text-blue-400 hover:underline" href="/store">
            Browse the shop
          </a>
          .
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {mergedPricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-[28px] p-6 lg:p-8 flex flex-col h-full glass-card glass-card--content-shell glass-card--radius-24 border border-white/10 ${
              tier.highlighted ? 'ring-2 ring-blue-500/50 md:-mt-2 md:-mb-2 z-10' : ''
            }`}
          >
            {tier.highlighted && (
              <div className="absolute -top-3 left-0 right-0 flex justify-center">
                <span className="bg-blue-600 text-white text-[10px] font-mono uppercase tracking-[0.15em] px-3 py-1 rounded-full">
                  {tier.badge || 'Most popular'}
                </span>
              </div>
            )}

            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-300/90 mb-2">
              {tier.name}
            </p>
            <div className="flex items-end gap-1 mb-3">
              <span className="card-title text-3xl lg:text-4xl tracking-tight">{tier.price}</span>
              {tier.period ? (
                <span className="text-sm opacity-70 mb-1">{tier.period}</span>
              ) : null}
            </div>
            <p className="text-sm opacity-85 mb-6 flex-1">{tier.desc}</p>

            <ul className="flex flex-col gap-2 mb-6 text-sm opacity-90">
              {(tier.features || []).slice(0, 5).map((f, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <PricingTierCta cta={tier.cta} highlighted={tier.highlighted} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-1">
            Billing
          </p>
          <p>
            Charged monthly to your card. Cancel any time from your account — access continues
            through the period you paid for.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-1">
            Switching plans
          </p>
          <p>
            Upgrade or downgrade in one click. Stripe pro-rates the change so you only pay for what
            you use.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-1">
            Procurement
          </p>
          <p>
            Need PO, MSA, or annual invoicing? <a className="text-blue-400 hover:underline" href="mailto:sales@example.com">Email sales</a> — same-day reply.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-center text-sm text-slate-400">
        Questions before paying? Read{' '}
        <a href="/#faq" className="text-blue-400 hover:underline">
          FAQ on the homepage
        </a>{' '}
        or browse{' '}
        <a href="/learn" className="text-blue-400 hover:underline">
          Learn
        </a>
        .
      </div>
    </div>
  );
}

export default Checkout;
