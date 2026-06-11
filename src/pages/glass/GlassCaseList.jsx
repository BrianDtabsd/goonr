import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { recentCases } from '../../content/caseAppMock';
import { caseAppBreadcrumb } from '../../config/caseAppMeta';

export default function GlassCaseList() {
  return (
    <div className="space-y-6">
      <header className="glass-card flex flex-wrap items-start justify-between gap-4 !py-5">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">
            {caseAppBreadcrumb('cases')}
          </p>
          <h1 className="card-title mt-2 text-3xl font-semibold">Cases</h1>
        </div>
        <Button variant="primary">New Case</Button>
      </header>

      <div className="glass-card divide-y divide-white/10 !p-0 overflow-hidden">
        {recentCases.map((c) => (
          <Link
            key={c.id}
            to={`/app/glass/cases/${c.id}`}
            className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-white/5"
          >
            <div>
              <p className="font-medium text-white">{c.name}</p>
              <p className="text-xs text-slate-400">
                {c.client} · {c.id}
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs capitalize text-slate-300">
              {c.status.replace('_', ' ')}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
