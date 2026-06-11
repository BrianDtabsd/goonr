import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { brand } from '../../lib/designTokens';
import Button from '../../components/Button';
import { documindGlassDashboard, documindGlassCasefile } from '../../lib/glassPresets';

const brandSwatches = [
  { name: 'Ink', hex: brand.ink, use: 'Headings, dark buttons' },
  { name: 'Slate', hex: brand.slate, use: 'Secondary text, borders' },
  { name: 'Ember', hex: brand.ember, use: 'One accent CTA per screen' },
  { name: 'Mist', hex: brand.mist, use: 'Workplace page background (Track B)' },
];

export default function Foundation() {
  const { theme, updateTheme } = useTheme();

  return (
    <div className="space-y-6">
      <header className="glass-card !py-5">
        <h1 className="card-title text-3xl font-semibold">Foundation</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          DocuMind brand tokens plus the template glass variables. Change glass settings in the
          theme panel — values below reflect what is active right now.
        </p>
      </header>

      <section className="glass-card">
        <h2 className="card-title mb-4 text-lg font-medium">DocuMind brand colours</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {brandSwatches.map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div
                className="h-12 w-12 shrink-0 rounded-xl border border-white/10"
                style={{ backgroundColor: s.hex }}
              />
              <div>
                <p className="font-medium text-white">{s.name}</p>
                <p className="font-mono text-xs text-slate-400">{s.hex}</p>
                <p className="mt-1 text-xs text-slate-500">{s.use}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card">
        <h2 className="card-title mb-4 text-lg font-medium">Quick presets</h2>
        <p className="mb-4 text-sm text-slate-400">
          One-click starting points. You can still fine-tune everything in the theme panel.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => updateTheme(documindGlassDashboard)}>
            Dashboard glass (ember)
          </Button>
          <Button variant="secondary" onClick={() => updateTheme(documindGlassCasefile)}>
            Case file glass (green frost)
          </Button>
        </div>
      </section>

      <section className="glass-card">
        <h2 className="card-title mb-4 text-lg font-medium">Live glass tokens</h2>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          {[
            ['Background', theme.backgroundUrl.slice(0, 48) + '…'],
            ['Frost blur', theme.frostLevel],
            ['Transparency', String(theme.transparencyLevel)],
            ['Frost RGB', theme.frostColor],
            ['Primary colour', theme.primaryColor],
            ['Card radius', theme.cardRadius],
            ['Layout mode', theme.layoutMode],
            ['Pattern', theme.backgroundPattern],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-black/20 px-4 py-3">
              <dt className="text-xs uppercase tracking-wide text-slate-500">{label}</dt>
              <dd className="mt-1 break-all text-slate-200">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
