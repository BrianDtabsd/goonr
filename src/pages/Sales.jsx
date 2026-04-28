import React from 'react';
import ContentCard from '../components/ContentCard';
import { useTemplateContent } from '../hooks/useTemplateContent';

function Sales() {
  const { mergedSalesIntro: salesIntro, mergedSalesProducts: salesProducts } =
    useTemplateContent();

  return (
    <div className="flex-grow flex flex-col gap-16 md:gap-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full mt-12 mb-24">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-rose-400">
          {salesIntro.heading}
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          {salesIntro.subheading}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {salesProducts.map((product, idx) => (
          <ContentCard key={idx} {...product} animDelay={idx * 0.05} />
        ))}
      </div>
    </div>
  );
}

export default Sales;
