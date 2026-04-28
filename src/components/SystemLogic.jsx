import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import { useTemplateContent } from '../hooks/useTemplateContent';

export default function SystemLogic() {
  const { mergedSystemLogicIntro: intro, mergedSystemLogicSteps: steps } =
    useTemplateContent();

  const [activeIdx, setActiveIdx] = useState(0);
  const [contentIdx, setContentIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStepClick = (index) => {
    if (index === activeIdx) return;
    setActiveIdx(index);
    setIsAnimating(true);

    setTimeout(() => {
      setContentIdx(index);
      requestAnimationFrame(() => {
        setIsAnimating(false);
      });
    }, 180);
  };

  return (
    <div id="methodology" className="relative z-10 max-w-[1360px] mx-auto w-full scroll-mt-28">
      <div className="max-w-4xl mx-auto mb-16 lg:mb-20 text-center anim-trigger">
        <div
          className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-white/10 bg-black/5 mb-6 anim-fade-up"
          style={{ transitionDelay: '0s' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-80">
            {intro.eyebrow}
          </span>
        </div>

        <h2 className="card-title text-[2.05rem] sm:text-[2.9rem] lg:text-[3.45rem] leading-[1.04] tracking-[-0.045em] font-light mb-6 max-w-[20ch] sm:max-w-[20ch] mx-auto text-center">
          <span className="block anim-wrap">
            <span className="anim-line" style={{ transitionDelay: '0.1s' }}>
              {intro.headingLine1}
            </span>
          </span>
          <span className="block anim-wrap">
            <span className="anim-line" style={{ transitionDelay: '0.2s' }}>
              {intro.headingLine2}
            </span>
          </span>
        </h2>

        <p
          className="text-[1rem] sm:text-[1.06rem] max-w-2xl mx-auto leading-[1.75] opacity-70 anim-fade-up"
          style={{ transitionDelay: '0.3s' }}
        >
          {intro.subheading}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 max-w-7xl mx-auto items-start anim-trigger">
        <div className="col-span-1 lg:col-span-5 flex flex-col space-y-3">
          {steps.map((step, index) => {
            const isActive = index === activeIdx;
            return (
              <div
                key={index}
                className="anim-fade-up"
                style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
              >
                <button
                  type="button"
                  onClick={() => handleStepClick(index)}
                  className={twMerge(
                    clsx(
                      'group w-full relative rounded-[22px] p-8 md:p-10 cursor-pointer text-left transition-all duration-500 glass-card',
                      isActive ? '' : 'opacity-80 hover:opacity-100'
                    )
                  )}
                >
                  <div className="flex items-start justify-between w-full relative z-10">
                    <h3
                      className={twMerge(
                        clsx(
                          'text-4xl md:text-5xl tracking-tighter font-light transition-colors duration-300 card-title',
                          isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'
                        )
                      )}
                    >
                      {step.title}
                    </h3>
                    <span
                      className={twMerge(
                        clsx(
                          'text-sm font-medium mt-1 ml-2 font-mono transition-colors',
                          isActive
                            ? 'text-blue-400'
                            : 'opacity-50 group-hover:opacity-80'
                        )
                      )}
                    >
                      0{index + 1}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        <div className="col-span-1 lg:col-span-7 flex flex-col gap-10 pt-2 lg:pt-0 sticky top-10">
          <div
            className="w-full aspect-[16/10] overflow-hidden rounded-[24px] relative group glass-card anim-fade-up"
            style={{ transitionDelay: '0.2s' }}
          >
            <img
              src={steps[contentIdx].image}
              alt={`${steps[contentIdx].title} stage environmental sensing`}
              className="w-full h-full object-cover"
              style={{
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? 'scale(1.02)' : 'scale(1)',
                transition:
                  'opacity 480ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)',
              }}
            />
          </div>

          <div className="anim-fade-up" style={{ transitionDelay: '0.3s' }}>
            <h3
              className="card-title text-2xl md:text-3xl font-medium tracking-tight mb-4"
              style={{
                opacity: isAnimating ? 0 : 1,
                transition: 'opacity 320ms ease',
              }}
            >
              {steps[contentIdx].title}
            </h3>

            <p
              className="md:text-[1.1rem] text-[1rem] leading-[1.8] font-light mb-8 opacity-80 max-w-[62ch]"
              style={{
                opacity: isAnimating ? 0 : 1,
                transition: 'opacity 320ms ease',
              }}
            >
              {steps[contentIdx].description}
            </p>

            <Button
              href={intro.exploreCtaHref}
              variant="primary"
              style={{
                opacity: isAnimating ? 0 : 1,
                transition: 'opacity 320ms ease',
              }}
            >
              <span className="mr-2">{intro.exploreCtaLabel}</span>
              <iconify-icon
                icon="solar:arrow-right-linear"
                width="16"
                height="16"
              ></iconify-icon>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
