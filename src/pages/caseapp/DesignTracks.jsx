import React from 'react';
import { Link } from 'react-router-dom';
import { DSPageHeader, DSCard, DSButton } from '../../components/ds';
import { caseAppBreadcrumb } from '../../config/caseAppMeta';
import { recentCases } from '../../content/caseAppMock';

const tracks = [
  {
    name: 'Template Glass',
    tag: 'Track A',
    source: 'Website template — glass, frost, swappable background',
    routes: [
      { label: 'Glass dashboard', to: '/app/glass' },
      { label: 'Glass case list', to: '/app/glass/cases' },
      {
        label: 'Glass case file',
        to: `/app/glass/cases/${recentCases[0]?.id || 'CASE-1778550668763'}`,
      },
    ],
    stack: 'useTheme · glass-card · ContentCard · Button',
    status: 'Exploring',
  },
  {
    name: 'Workplace Light',
    tag: 'Track B',
    source: 'REASON8 / case08 Decision Centre references',
    routes: [
      { label: 'Decision Center', to: '/app' },
      { label: 'Analysis', to: '/app/analysis' },
      { label: 'Case list', to: '/app/cases' },
    ],
    stack: 'ds-theme-workplace · src/components/ds/',
    status: 'Exploring',
  },
  {
    name: 'Case File Dark Glass',
    tag: 'Track C',
    source: 'Black + green glass case detail',
    routes: [
      {
        label: 'Case file detail',
        to: `/app/cases/${recentCases[0]?.id || 'CASE-1778550668763'}`,
      },
    ],
    stack: 'ds-theme-casefile · DSCaseHeader · DSAdvisorPanel',
    status: 'Exploring',
  },
];

export default function DesignTracks() {
  return (
    <>
      <DSPageHeader
        breadcrumb={caseAppBreadcrumb('design tracks')}
        title="Design Tracks"
        subtitle="Three parallel prototypes. Refine pages first, extract a design system from what works."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {tracks.map((track) => (
          <DSCard key={track.tag} className="flex flex-col">
            <div className="mb-4 flex items-start justify-between gap-2">
              <div>
                <p className="ds-label">{track.tag}</p>
                <h2 className="mt-1 text-lg font-semibold text-[#1B1B1B]">{track.name}</h2>
              </div>
              <span className="rounded-full bg-[#EEEEEE] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-[#434A53]">
                {track.status}
              </span>
            </div>
            <p className="mb-4 flex-1 text-sm text-[#434A53]">{track.source}</p>
            <p className="mb-3 text-xs text-[#434A53]/80">{track.stack}</p>
            <div className="flex flex-col gap-2">
              {track.routes.map((r) => (
                <DSButton key={r.to} variant="secondary" to={r.to} className="w-full justify-center">
                  {r.label}
                </DSButton>
              ))}
            </div>
          </DSCard>
        ))}
      </div>

      <DSCard className="mt-8">
        <h2 className="text-base font-semibold text-[#1B1B1B]">Documentation</h2>
        <p className="mt-2 text-sm text-[#434A53]">
          See <code className="text-xs">DESIGN_TRACKS.md</code> in the repo for what to keep, drop, and
          promote from each track. Design specs stay separate from your data field registry — no coded
          IDs in design files.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/" className="text-sm text-[#FF5722] hover:underline">
            Marketing template (/)
          </Link>
          <span className="text-[#434A53]/40">·</span>
          <Link to="/app/glass" className="text-sm text-[#FF5722] hover:underline">
            Start with Track A
          </Link>
        </div>
      </DSCard>
    </>
  );
}
