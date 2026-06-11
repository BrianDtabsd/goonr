import React from 'react';
import ContentCard from '../../components/ContentCard';
import Button from '../../components/Button';

export default function Components() {
  return (
    <div className="space-y-6">
      <header className="glass-card !py-5">
        <h1 className="card-title text-3xl font-semibold">Components</h1>
        <p className="mt-2 text-sm text-slate-400">
          Template primitives. Adjust button shape, style, glow, and glass in the theme panel —
          these update live.
        </p>
      </header>

      <section className="glass-card">
        <h2 className="card-title mb-4 text-lg font-medium">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="empty">Empty</Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <ContentCard
          layout="text"
          heading="Text card"
          subheading="Operational shell — 24px radius"
          body="Glass card with heading, subheading, and body copy. Uses the template ContentCard component."
          shellStyle="operational"
          size="full"
        />
        <ContentCard
          layout="bullets"
          heading="Bullet card"
          items={['Scannable list items', 'Calm spacing', 'No coded design IDs']}
          tone="emerald"
          shellStyle="module"
          size="full"
        />
      </section>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <ContentCard layout="stat" value="12" label="Cases" tone="amber" size="sm" shellStyle="module" contentAlign="center" />
        <ContentCard layout="stat" value="8" label="Processes" tone="emerald" size="sm" shellStyle="module" contentAlign="center" />
        <ContentCard layout="stat" value="3" label="Incidents" tone="rose" size="sm" shellStyle="module" contentAlign="center" />
        <ContentCard layout="stat" value="5" label="Pending" tone="white" size="sm" shellStyle="module" contentAlign="center" />
      </section>

      <section className="glass-card">
        <h2 className="card-title mb-2 text-lg font-medium">Glass surfaces</h2>
        <p className="text-sm text-slate-400">
          <code className="text-slate-200">glass-card</code>,{' '}
          <code className="text-slate-200">glass-nav</code>, and{' '}
          <code className="text-slate-200">glass-container</code> are defined in{' '}
          <code className="text-slate-200">src/index.css</code> and driven by CSS variables from{' '}
          <code className="text-slate-200">useTheme</code>.
        </p>
      </section>
    </div>
  );
}
