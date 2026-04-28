import React from 'react';
import PricingTierCta from './PricingTierCta';
import { useTemplateContent } from '../hooks/useTemplateContent';

export default function Pricing() {
  const { mergedPricingIntro: pricingIntro, mergedPricingTiers: pricingTiers } =
    useTemplateContent();

  return (
    <div
      id="pricing"
      className="relative z-10 max-w-7xl mx-auto anim-trigger w-full scroll-mt-28"
    >
      <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
        <div
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/5 px-4 py-2 mb-6 anim-fade-up"
          style={{ transitionDelay: '0s' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-80">
            {pricingIntro.eyebrow}
          </span>
        </div>

        <h2
          className="card-title text-[2.35rem] sm:text-[2.9rem] leading-[1.02] tracking-[-0.04em] font-light mb-6 anim-fade-up"
          style={{ transitionDelay: '0.1s' }}
        >
          {pricingIntro.heading}
        </h2>
        <p
          className="text-[1rem] sm:text-[1.06rem] leading-[1.75] opacity-70 mx-auto max-w-2xl anim-fade-up"
          style={{ transitionDelay: '0.2s' }}
        >
          {pricingIntro.subheading}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 max-w-6xl mx-auto items-center">
        {pricingTiers.map((tier, idx) => (
          <div
            key={idx}
            className={`relative rounded-[28px] p-8 lg:p-10 flex flex-col h-full anim-fade-up transition-all duration-300 glass-card ${
              tier.highlighted
                ? 'lg:-mt-8 lg:-mb-8 z-10 shadow-[0_0_40px_rgba(0,0,0,0.1)]'
                : ''
            }`}
            style={{ transitionDelay: `${0.2 + idx * 0.15}s` }}
          >
            {tier.highlighted && (
              <div className="absolute -top-4 inset-x-0 flex justify-center">
                <span className="bg-blue-600 text-white text-[10px] font-mono uppercase tracking-[0.15em] px-3 py-1 rounded-full shadow-sm">
                  {tier.badge || 'Recommended'}
                </span>
              </div>
            )}

            <div className="mb-8 relative z-10">
              <h3
                className={`font-mono text-[12px] uppercase tracking-[0.18em] mb-4 ${
                  tier.highlighted ? 'text-blue-400' : 'opacity-60'
                }`}
              >
                {tier.name}
              </h3>
              <div className="flex items-end gap-1 mb-4">
                <span className="card-title text-4xl lg:text-5xl tracking-[-0.04em]">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-sm mb-1.5 opacity-60">{tier.period}</span>
                )}
              </div>
              <p className="text-sm leading-relaxed opacity-80">{tier.desc}</p>
            </div>

            <ul className="flex flex-col gap-4 mb-10 flex-1 relative z-10">
              {tier.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-3">
                  <iconify-icon
                    icon="solar:check-circle-linear"
                    className={`text-lg mt-0.5 flex-shrink-0 ${
                      tier.highlighted ? 'text-blue-400' : 'text-blue-500'
                    }`}
                  ></iconify-icon>
                  <span className="text-[0.95rem] opacity-90">{feature}</span>
                </li>
              ))}
            </ul>

            <PricingTierCta cta={tier.cta} highlighted={tier.highlighted} />
          </div>
        ))}
      </div>
    </div>
  );
}
