import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContentCard from '../../ContentCard';
import Button from '../../Button';
import { caseAppBreadcrumb } from '../../../config/caseAppMeta';
import {
  dashboardStats,
  recentCases,
  favoriteIncidents,
} from '../../../content/caseAppMock';

export default function DashboardPattern({
  caseFileBase = '/design-system/case-file',
  casesListTo = '/design-system/dashboard',
}) {
  const [actionTab, setActionTab] = useState('Automate Process');
  const sampleCaseId = recentCases[0]?.id;

  return (
    <div className="space-y-6">
      <header className="glass-card flex flex-wrap items-start justify-between gap-4 !py-5">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">
            {caseAppBreadcrumb('dashboard')}
          </p>
          <h1 className="card-title mt-2 text-3xl font-semibold">Decision Center</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Model online
          </span>
          <Button variant="primary">New Analysis</Button>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Link to={casesListTo} className="block">
          <ContentCard
            layout="stat"
            value={dashboardStats.cases}
            label="Cases"
            tone="amber"
            size="sm"
            shellStyle="module"
            contentAlign="center"
          />
        </Link>
        <ContentCard
          layout="stat"
          value={dashboardStats.processes}
          label="Processes"
          tone="emerald"
          size="sm"
          shellStyle="module"
          contentAlign="center"
        />
        <ContentCard
          layout="stat"
          value={dashboardStats.incidents}
          label="Incidents"
          tone="amber"
          size="sm"
          shellStyle="module"
          contentAlign="center"
        />
        <ContentCard
          layout="stat"
          value={dashboardStats.pendingDecisions}
          label="Pending decisions"
          tone="blue"
          size="sm"
          shellStyle="module"
          contentAlign="center"
        />
      </div>

      <div className="glass-card">
        <div className="mb-6 flex gap-2">
          {['Create Incident', 'Automate Process'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActionTab(tab)}
              className={`rounded-xl px-4 py-2 text-sm transition-all ${
                actionTab === tab
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {actionTab === 'Automate Process' ? (
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
              Select a case to automate
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {recentCases.map((c) => (
                <Link
                  key={c.id}
                  to={`${caseFileBase}?case=${encodeURIComponent(c.id)}`}
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-white/20"
                >
                  <div>
                    <p className="font-medium text-white">{c.client}</p>
                    <p className="text-xs text-slate-400">{c.name}</p>
                  </div>
                  <iconify-icon
                    icon="solar:arrow-right-linear"
                    width="16"
                    height="16"
                    class="text-slate-400 group-hover:text-white"
                  />
                </Link>
              ))}
            </div>
            <Button variant="primary">Create New Case</Button>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-sm text-slate-400">
              Incident intake form — wire to spine pipeline intake stage.
            </p>
            <Button variant="primary" className="mt-4">
              Start Incident Report
            </Button>
          </div>
        )}
      </div>

      <section>
        <h2 className="card-title mb-4 text-lg font-medium">Favorite incidents</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {favoriteIncidents.map((inc) => (
            <div
              key={inc.id}
              className="glass-card flex min-h-[120px] flex-col items-center justify-center border border-dashed border-white/15 !py-8 text-center transition-all hover:-translate-y-0.5"
            >
              <iconify-icon
                icon="solar:heart-linear"
                width="20"
                height="20"
                class="mb-2 text-slate-500"
              />
              <p className="text-xs text-slate-400">{inc.id}</p>
              <p className="mt-1 text-sm text-slate-300">{inc.label}</p>
            </div>
          ))}
        </div>
      </section>

      {sampleCaseId ? (
        <p className="text-center text-xs text-slate-500">
          Open sample case file →{' '}
          <Link to="/design-system/case-file" className="text-white hover:underline">
            Case file pattern
          </Link>
        </p>
      ) : null}
    </div>
  );
}
