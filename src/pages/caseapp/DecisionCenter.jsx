import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DSPageHeader,
  DSStatCard,
  DSCard,
  DSButton,
  DSBadge,
  DSTabs,
} from '../../components/ds';
import { element, icons } from '../../lib/designTokens';
import { cn } from '../../lib/cn';
import {
  dashboardStats,
  recentCases,
  favoriteIncidents,
} from '../../content/caseAppMock';

export default function DecisionCenter() {
  const [actionTab, setActionTab] = useState('Automate Process');

  return (
    <>
      <DSPageHeader
        breadcrumb="core / dashboard"
        title="Decision Center"
        actions={
          <>
            <DSBadge variant="online">Model v4.2 Online</DSBadge>
            <DSButton variant="accent">
              <iconify-icon icon={icons.action.add} width="16" height="16" />
              New Analysis
            </DSButton>
            <DSButton variant="secondary" to="/app/analysis">
              New Case
            </DSButton>
          </>
        }
      />

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Link to="/app/cases" className="block">
          <DSStatCard label="Cases" value={dashboardStats.cases} icon="solar:folder-linear" />
        </Link>
        <DSStatCard label="Processes" value={dashboardStats.processes} icon="solar:routing-2-linear" />
        <DSStatCard label="Incidents" value={dashboardStats.incidents} icon="solar:danger-circle-linear" />
        <DSStatCard label="Pending Decisions" value={dashboardStats.pendingDecisions} icon="solar:checklist-minimalistic-linear" />
      </div>

      <DSCard className="mb-8">
        <DSTabs
          tabs={['Create Incident', 'Automate Process']}
          active={actionTab}
          onChange={setActionTab}
        />

        <div className="mt-6">
          {actionTab === 'Automate Process' ? (
            <div className="space-y-4">
              <p className="ds-label">Select a case to automate</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {recentCases.map((c) => (
                  <Link
                    key={c.id}
                    to={`/app/cases/${c.id}`}
                    className={cn(
                      element.fileChip.workplace,
                      'ds-bounce-hover justify-between transition-all hover:border-[#FF5722]/30'
                    )}
                  >
                    <div>
                      <p className="font-medium text-[#1B1B1B]">{c.client}</p>
                      <p className="text-xs text-[#434A53]">{c.name}</p>
                    </div>
                    <iconify-icon icon={icons.action.arrowRight} width="16" height="16" />
                  </Link>
                ))}
              </div>
              <DSButton variant="primary" className="mt-2 w-full sm:w-auto">
                <iconify-icon icon={icons.action.add} width="16" height="16" />
                Create New Case
              </DSButton>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm text-[#434A53]">
                Incident intake form — wire to spine pipeline intake stage.
              </p>
              <DSButton variant="primary" className="mt-4">
                Start Incident Report
              </DSButton>
            </div>
          )}
        </div>
      </DSCard>

      <section>
        <h2 className="mb-4 text-base font-semibold text-[#1B1B1B]">Favorite Incidents</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {favoriteIncidents.map((inc) => (
            <div
              key={inc.id}
              className="flex min-h-[120px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#434A53]/25 bg-white/50 p-6 text-center transition-all hover:border-[#FF5722]/30 ds-bounce-hover"
            >
              <iconify-icon
                icon="solar:heart-linear"
                width="20"
                height="20"
                class="text-[#434A53]/50 mb-2"
              />
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#434A53]">
                {inc.id}
              </p>
              <p className="mt-1 text-sm text-[#434A53]">{inc.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
