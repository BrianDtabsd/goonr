import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  DSCaseHeader,
  DSCard,
  DSButton,
  DSBadge,
} from '../../components/ds';
import { element, icons } from '../../lib/designTokens';
import { cn } from '../../lib/cn';
import { caseDetail } from '../../content/caseAppMock';

function InfoColumn({ label, rows }) {
  return (
    <div>
      <p className="ds-label mb-3">{label}</p>
      <dl className="space-y-2 text-sm">
        {rows.map(([term, value]) => (
          <div key={term}>
            <dt className="text-stone-500">{term}</dt>
            <dd className="text-stone-100">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function CaseFileDetail() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Gather');
  const data = { ...caseDetail, id: caseId || caseDetail.id };

  return (
    <>
      <DSCaseHeader
        caseId={data.id}
        caseName={data.name}
        status={data.status}
        badges={data.badges}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBack={() => navigate('/app')}
        actions={
          <>
            <DSButton variant="secondary" size="sm">+ Note</DSButton>
            <DSButton variant="secondary" size="sm">
              <iconify-icon icon={icons.action.edit} width="14" height="14" />
              Edit
            </DSButton>
            <DSButton variant="primary" size="sm">Deep Review</DSButton>
          </>
        }
      />

      {data.pendingDataPoints > 0 && (
        <div className={cn(element.alert.base, element.alert.infoCasefile, 'mb-6')}>
          <iconify-icon icon={icons.status.info} width="18" height="18" class="text-[#C8E6EA] shrink-0" />
          <p className="flex-1">
            {data.pendingDataPoints} data points pending — incomplete calculations may occur.
          </p>
          <button type="button" className="text-xs font-medium text-[#C8E6EA] hover:underline">
            View Details
          </button>
        </div>
      )}

      <DSCard glow className="mb-6">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold text-stone-100">{data.name}</h2>
          {data.badges.slice(0, 2).map((b) => (
            <DSBadge key={b} variant="plan">{b}</DSBadge>
          ))}
        </div>

        <div className="mb-6">
          <p className="ds-label mb-1">Primary Diagnosis</p>
          <p className="text-sm text-stone-200">{data.diagnosis}</p>
          <p className="mt-1 text-xs tabular-nums text-stone-500">{data.icd10}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <InfoColumn
            label="Personal Identity"
            rows={[
              ['DOB', data.personal.dob],
              ['Email', data.personal.email],
              ['Address', data.personal.address],
            ]}
          />
          <InfoColumn
            label="Employment Details"
            rows={[
              ['Company', data.employment.company],
              ['Role', data.employment.role],
              ['Joined', data.employment.joined],
            ]}
          />
          <InfoColumn
            label="Claim Status"
            rows={[
              ['Approved Until', data.claim.approvedUntil],
              ['Assigned Manager', data.claim.manager],
              ['Status', data.claim.status],
            ]}
          />
        </div>
      </DSCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DSCard>
          <p className="ds-label mb-4">Restrictions &amp; Limitations</p>
          <ul className="space-y-2">
            {data.restrictions.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-stone-300">
                <span className="text-[#E8DFA8]">•</span>
                {item}
              </li>
            ))}
          </ul>
        </DSCard>

        <DSCard>
          <p className="ds-label mb-4">Document Hub — Medical Preview</p>
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white p-4 text-[#1B1B1B]">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#434A53]">
              Patient Assessment Form
            </p>
            <p className="mt-3 text-sm">Claimant: {data.name}</p>
            <p className="text-sm text-[#434A53]">Date: 2026-03-01</p>
            <div className="mt-4 space-y-2 text-xs text-[#434A53]">
              <p>☐ Cleared for modified duties</p>
              <p>☑ Restrictions apply — see attached</p>
            </div>
            <div className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-[#1B1B1B]/90 px-3 py-1.5 text-[10px] text-stone-300 backdrop-blur-xl">
              Floaty Ghost
            </div>
          </div>
        </DSCard>

        <DSCard>
          <p className="ds-label mb-4">Care Team</p>
          <ul className="space-y-3">
            {data.careTeam.map((member) => (
              <li key={member.name} className="flex justify-between gap-4 text-sm">
                <span className="text-stone-500">{member.role}</span>
                <span className="text-stone-200">{member.name}</span>
              </li>
            ))}
          </ul>
        </DSCard>

        <DSCard>
          <p className="ds-label mb-4">Co-morbidities</p>
          <ul className="space-y-3">
            {data.comorbidities.map((item) => (
              <li key={item.code} className="flex justify-between gap-4 text-sm">
                <span className="text-stone-300">{item.label}</span>
                <span className="text-xs tabular-nums text-stone-500">{item.code}</span>
              </li>
            ))}
          </ul>
        </DSCard>
      </div>
    </>
  );
}
