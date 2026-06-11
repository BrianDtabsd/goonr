import React from 'react';
import { DSPageHeader, DSCard } from '../../components/ds';

export default function PlaceholderPage({ title, breadcrumb }) {
  return (
    <>
      <DSPageHeader breadcrumb={breadcrumb} title={title} />
      <DSCard flat>
        <p className="text-sm leading-[1.65] text-[#434A53]">
          This section is scaffolded in the design system. Wire it to the spine pipeline agent.
        </p>
      </DSCard>
    </>
  );
}
