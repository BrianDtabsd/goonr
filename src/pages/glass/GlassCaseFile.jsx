import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { caseDetail } from '../../content/caseAppMock';
import { caseAppBreadcrumb } from '../../config/caseAppMeta';

const tabs = ['Gather', 'Analyze', 'Decide', 'Document Hub', 'GRTW'];

function InfoBlock({ label, rows }) {
  return (
    <div className="glass-card !p-5">
      <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>
      <dl className="space-y-2 text-sm">
        {rows.map(([term, value]) => (
          <div key={term}>
            <dt className="text-slate-500">{term}</dt>
            <dd className="text-slate-100">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function GlassCaseFile() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Gather');
  const data = { ...caseDetail, id: caseId || caseDetail.id };

  return (
    <div className="space-y-6">
      <header className="glass-card !py-5">
        <button
          type="button"
          onClick={() => navigate('/app/glass')}
          className="mb-3 flex items-center gap-1 text-xs text-slate-400 hover:text-white"
        >
          <iconify-icon icon="solar:arrow-left-linear" width="14" height="14" />
          Back
        </button>
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">
          {caseAppBreadcrumb('case file')}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="card-title text-2xl font-semibold">{data.name}</h1>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
            {data.status.replace('_', ' ')}
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500">{data.id}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-3 py-1.5 text-xs transition-all ${
                activeTab === tab
                  ? 'bg-emerald-500/20 text-emerald-100'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="secondary" className="!px-4 !py-2 text-sm">
            + Note
          </Button>
          <Button variant="primary" className="!px-4 !py-2 text-sm">
            Deep Review
          </Button>
        </div>
      </header>

      {data.pendingDataPoints > 0 && (
        <div className="glass-card flex items-center gap-3 border border-cyan-400/20 !py-4">
          <iconify-icon icon="solar:info-circle-linear" width="18" height="18" class="text-cyan-300" />
          <p className="flex-1 text-sm text-slate-200">
            {data.pendingDataPoints} data points pending — incomplete calculations may occur.
          </p>
        </div>
      )}

      <div className="glass-card">
        <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
          Primary diagnosis
        </p>
        <p className="text-sm text-slate-100">{data.diagnosis}</p>
        <p className="mt-1 text-xs text-slate-500">{data.icd10}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <InfoBlock
          label="Personal identity"
          rows={[
            ['DOB', data.personal.dob],
            ['Email', data.personal.email],
            ['Address', data.personal.address],
          ]}
        />
        <InfoBlock
          label="Employment"
          rows={[
            ['Company', data.employment.company],
            ['Role', data.employment.role],
            ['Joined', data.employment.joined],
          ]}
        />
        <InfoBlock
          label="Claim"
          rows={[
            ['Approved until', data.claim.approvedUntil],
            ['Manager', data.claim.manager],
            ['Status', data.claim.status],
          ]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass-card">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
            Restrictions
          </p>
          <ul className="space-y-2 text-sm text-slate-200">
            {data.restrictions.map((r) => (
              <li key={r} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-card">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
            Care team
          </p>
          <ul className="space-y-3 text-sm">
            {data.careTeam.map((m) => (
              <li key={m.role}>
                <p className="text-slate-500">{m.role}</p>
                <p className="text-slate-100">{m.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-center text-xs text-slate-500">
        Track A prototype — compare with{' '}
        <button
          type="button"
          onClick={() => navigate(`/app/cases/${data.id}`)}
          className="text-emerald-300 hover:underline"
        >
          Track C case file
        </button>
      </p>
    </div>
  );
}
