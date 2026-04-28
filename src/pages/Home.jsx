import React from 'react';
import ContentCard from '../components/ContentCard';
import SectionHeader from '../components/SectionHeader';
import SystemLogic from '../components/SystemLogic';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import { useTemplateContent } from '../hooks/useTemplateContent';
import { useVisibility } from '../hooks/useVisibility';

function Home() {
  const { mergedHomeSections } = useTemplateContent();
  const { isHomeSectionVisible } = useVisibility();

  return (
    <div className="flex-grow flex flex-col gap-24 lg:gap-28 px-6 md:px-8 lg:px-12 max-w-[1360px] mx-auto w-full mt-12 mb-24">
      {mergedHomeSections
        .filter((section) => isHomeSectionVisible(section.id))
        .map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="flex flex-col gap-14 lg:gap-16"
          >
            {section.header && <SectionHeader {...section.header} />}

            <div className={section.grid}>
              {section.cards.map((card, idx) => (
                <ContentCard key={idx} {...card} animDelay={0.1 + idx * 0.1} />
              ))}
            </div>
          </section>
        ))}

      {isHomeSectionVisible('methodology') ? <SystemLogic /> : null}
      {isHomeSectionVisible('faq') ? <FAQ /> : null}
      {isHomeSectionVisible('pricing') ? <Pricing /> : null}
    </div>
  );
}

export default Home;
