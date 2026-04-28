import React from 'react';
import { faqIntro, faqItems } from '../content/faq';

export default function FAQ() {
  return (
    <section
      id="faq"
      className="scroll-mt-28 max-w-3xl mx-auto w-full anim-trigger"
    >
      <div className="mb-10 lg:mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/5 px-4 py-2 mb-6 anim-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-80">
            {faqIntro.eyebrow}
          </span>
        </div>
        <h2 className="card-title text-[2.05rem] sm:text-[2.65rem] lg:text-[3.2rem] leading-[1.04] tracking-[-0.045em] font-light mb-5">
          {faqIntro.heading}
        </h2>
        <p className="text-[1rem] sm:text-[1.06rem] leading-[1.75] opacity-70 max-w-xl mx-auto">
          {faqIntro.subheading}
        </p>
      </div>

      <ul className="flex flex-col gap-3">
        {faqItems.map((item, i) => (
          <li
            key={i}
            className="glass-card glass-card--content-shell glass-card--radius-22 border border-white/10 overflow-hidden anim-fade-up"
            style={{ transitionDelay: `${0.05 * i}s` }}
          >
            <details className="group">
              <summary className="cursor-pointer list-none px-5 py-4 text-left text-sm font-medium text-white/95 flex justify-between items-center gap-3 [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span className="shrink-0 text-blue-400 text-lg leading-none group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="px-5 pb-4 pt-0 text-sm leading-[1.75] opacity-80 border-t border-white/5">
                {item.a}
              </div>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
