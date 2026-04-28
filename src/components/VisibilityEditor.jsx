import React from 'react';
import { useVisibility } from '../hooks/useVisibility';
import { useTemplateContent } from '../hooks/useTemplateContent';

const PAGE_LABELS = {
  store: 'Shop (/store)',
  checkout: 'Checkout (/checkout)',
  learn: 'Learn (/learn)',
  sales: 'Sales (/sales)',
};

const HOME_BUILTIN = [
  { id: 'methodology', label: 'How it works (System Logic)' },
  { id: 'faq', label: 'FAQ' },
  { id: 'pricing', label: 'Pricing' },
];

function Toggle({ label, on, onChange, hint }) {
  return (
    <label className="flex items-start gap-3 py-2 cursor-pointer">
      <input
        type="checkbox"
        checked={on}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-blue-500"
      />
      <div className="flex-1">
        <div className="text-[12px] text-slate-100">{label}</div>
        {hint ? <div className="text-[10px] text-slate-500 mt-0.5">{hint}</div> : null}
      </div>
      <span
        className={`text-[10px] font-mono uppercase tracking-wider ${
          on ? 'text-emerald-300' : 'text-slate-500'
        }`}
      >
        {on ? 'visible' : 'hidden'}
      </span>
    </label>
  );
}

export default function VisibilityEditor() {
  const {
    pages,
    setPageVisible,
    isHomeSectionVisible,
    setHomeSectionVisible,
    resetVisibility,
    pageKeys,
  } = useVisibility();
  const { mergedHomeSections } = useTemplateContent();

  return (
    <details className="mb-3 rounded-lg border border-white/10 bg-slate-900/40">
      <summary className="cursor-pointer px-3 py-2 text-xs font-semibold text-slate-200">
        Show / hide pages &amp; sections
      </summary>
      <div className="border-t border-white/10 p-3">
        <p className="text-[11px] text-slate-400 mb-2">
          Hide instead of delete. Toggles are per-browser. To bake defaults into a deploy,
          use <code className="font-mono text-[10px] bg-black/40 px-1 rounded">VITE_HIDE_PAGES</code>{' '}
          and <code className="font-mono text-[10px] bg-black/40 px-1 rounded">VITE_HIDE_HOME_SECTIONS</code>.
        </p>

        <div className="mt-3">
          <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
            Pages
          </h4>
          <div className="divide-y divide-white/5">
            {pageKeys.map((key) => (
              <Toggle
                key={key}
                label={PAGE_LABELS[key] || key}
                on={pages[key] !== false}
                onChange={(v) => setPageVisible(key, v)}
              />
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
            Home sections
          </h4>
          <div className="divide-y divide-white/5">
            {mergedHomeSections.map((section) => (
              <Toggle
                key={section.id}
                label={section.header?.heading || section.id}
                hint={`#${section.id}`}
                on={isHomeSectionVisible(section.id)}
                onChange={(v) => setHomeSectionVisible(section.id, v)}
              />
            ))}
            {HOME_BUILTIN.map((s) => (
              <Toggle
                key={s.id}
                label={s.label}
                hint={`#${s.id}`}
                on={isHomeSectionVisible(s.id)}
                onChange={(v) => setHomeSectionVisible(s.id, v)}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={resetVisibility}
          className="mt-4 text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-md border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
        >
          Reset all to defaults
        </button>
      </div>
    </details>
  );
}
