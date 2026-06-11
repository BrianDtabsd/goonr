import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const sections = [
  {
    title: 'Foundation',
    desc: 'Brand colours, typography, glass tokens — all tied to the theme panel.',
    to: '/design-system/foundation',
  },
  {
    title: 'Components',
    desc: 'Buttons, cards, and glass surfaces you can tweak live.',
    to: '/design-system/components',
  },
  {
    title: 'Dashboard pattern',
    desc: 'Decision Center layout refined from the template glass stack.',
    to: '/design-system/dashboard',
  },
  {
    title: 'Case file pattern',
    desc: 'Dense case detail with green-tinted glass on a swappable background.',
    to: '/design-system/case-file',
  },
];

export default function Overview() {
  return (
    <div className="space-y-6">
      <header className="glass-card !py-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">
          DocuMind cms · living design system
        </p>
        <h1 className="card-title mt-2 text-3xl font-semibold sm:text-4xl">
          See and use it the whole time
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
          This is the goonr template shell — glass, frost, swappable background — extended for
          DocuMind. Open the gear button to change the look; every page here updates immediately.
          Use the left nav to jump between foundations, components, and page patterns.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button to="/design-system/foundation" variant="primary">
            Start with foundation
          </Button>
          <Button to="/design-system/dashboard" variant="secondary">
            View dashboard pattern
          </Button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="glass-card group transition-all hover:-translate-y-0.5"
          >
            <h2 className="card-title text-lg font-medium">{s.title}</h2>
            <p className="mt-2 text-sm text-slate-400">{s.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs text-slate-300 group-hover:text-white">
              Open
              <iconify-icon icon="solar:arrow-right-linear" width="14" height="14" />
            </span>
          </Link>
        ))}
      </div>

      <div className="glass-card border border-dashed border-white/15 !py-5 text-sm text-slate-400">
        <p className="font-medium text-slate-200">How to run locally</p>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-black/30 p-4 text-xs text-slate-300">
{`npm install
npm run dev
# open http://localhost:5173/design-system`}
        </pre>
        <p className="mt-3">
          Bookmark <code className="text-slate-200">/design-system</code> — it stays in the
          template with live theme controls. Workplace alternate UI lives at{' '}
          <Link to="/app" className="text-white hover:underline">
            /app
          </Link>{' '}
          if you want to compare.
        </p>
      </div>
    </div>
  );
}
