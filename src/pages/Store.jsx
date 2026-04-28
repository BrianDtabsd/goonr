import React from 'react';
import ContentCard from '../components/ContentCard';
import { useTemplateContent } from '../hooks/useTemplateContent';

function Store() {
  const { mergedStoreIntro: storeIntro, mergedStoreProducts: storeProducts } =
    useTemplateContent();

  return (
    <div className="flex-grow flex flex-col gap-16 md:gap-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full mt-12 mb-24">
      <div className="rounded-2xl border border-blue-500/30 bg-blue-950/20 px-5 py-4 text-center text-sm text-slate-200">
        <strong className="text-white">Subscriptions live on the homepage</strong> and at{' '}
        <a href="/checkout" className="text-blue-400 hover:underline">
          Checkout
        </a>
        . This shop is for the <strong className="text-white">hardware and licenses</strong> that
        plug into your subscription. All items ship pre-paired to your account.
      </div>

      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/5 px-4 py-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-80">
            Shop
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-5 tracking-tight">
          {storeIntro.heading}
        </h1>
        <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
          {storeIntro.subheading}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[12px] text-slate-400">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Free shipping over $200
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 30-day return on hardware
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Secure Stripe checkout
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {storeProducts.map((product, idx) => (
          <ContentCard key={idx} {...product} animDelay={idx * 0.05} />
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-center text-sm text-slate-400">
        Need a custom quantity, custom mount, or fleet pricing?{' '}
        <a className="text-blue-400 hover:underline" href="mailto:sales@example.com">
          Email sales
        </a>{' '}
        — most quotes back inside one business day.
      </div>
    </div>
  );
}

export default Store;
