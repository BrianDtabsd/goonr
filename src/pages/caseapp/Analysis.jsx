import React, { useState } from 'react';
import {
  DSPageHeader,
  DSCard,
  DSButton,
  DSBadge,
  DSInput,
  DSTextarea,
} from '../../components/ds';
import DSAdvisorPanel from '../../components/ds/DSAdvisorPanel';
import { element, icons } from '../../lib/designTokens';
import { cn } from '../../lib/cn';
import {
  analysisDefaults,
  analysisArtifacts,
  advisorLog,
} from '../../content/caseAppMock';

export default function Analysis() {
  const [form, setForm] = useState(analysisDefaults);
  const [files, setFiles] = useState(analysisArtifacts);

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const removeFile = (index) => setFiles((prev) => prev.filter((_, i) => i !== index));

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_340px]">
      <div>
        <DSPageHeader
          breadcrumb="core / advisor"
          title="Analysis"
          actions={
            <>
              <DSBadge variant="online">Model v4.2 Online</DSBadge>
              <DSButton variant="accent">
                <iconify-icon icon={icons.action.add} width="16" height="16" />
                New Analysis
              </DSButton>
            </>
          }
        />

        <DSCard flat className="mb-6">
          <h2 className="mb-5 text-base font-semibold text-[#1B1B1B]">Analysis Context</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <DSInput label="Case Reference" value={form.caseReference} onChange={update('caseReference')} />
            <DSInput label="Decision Type" value={form.decisionType} onChange={update('decisionType')} />
            <DSInput label="Claimant" value={form.claimant} onChange={update('claimant')} />
            <DSInput label="Domain" value={form.domain} onChange={update('domain')} />
          </div>
          <div className="mt-5">
            <DSTextarea
              label="Decision Question"
              value={form.decisionQuestion}
              onChange={update('decisionQuestion')}
            />
          </div>
        </DSCard>

        <DSCard flat>
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-base font-semibold text-[#1B1B1B]">Input Artifacts</h2>
            <DSButton variant="secondary" size="sm">
              <iconify-icon icon={icons.action.upload} width="16" height="16" />
              Upload Document
            </DSButton>
          </div>

          <div className="space-y-3">
            {files.map((file, index) => (
              <div
                key={file.name}
                className={cn(element.fileChip.workplace, 'justify-between')}
              >
                <div className="flex items-center gap-3">
                  <iconify-icon icon={icons.nav.evidence} width="18" height="18" />
                  <div>
                    <p className="font-medium text-[#1B1B1B]">{file.name}</p>
                    <p className="text-xs text-[#434A53]">
                      {file.type} · {file.size}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="rounded-lg p-1 text-[#434A53] hover:bg-[#434A53]/10"
                  aria-label={`Remove ${file.name}`}
                >
                  <iconify-icon icon={icons.action.close} width="16" height="16" />
                </button>
              </div>
            ))}
          </div>
        </DSCard>

        <div className="mt-6 flex flex-wrap gap-3">
          <DSButton variant="primary">
            <iconify-icon icon={icons.action.robot} width="16" height="16" />
            Run Analysis
          </DSButton>
          <DSButton variant="ghost" to={`/app/cases/${form.caseReference}`}>
            View Case File
          </DSButton>
        </div>
      </div>

      <div className="hidden xl:block">
        <DSAdvisorPanel tabs={['Document Analysis', 'RTW Prediction', 'Hermes Agent']}>
          <div className="space-y-3">
            {advisorLog.map((entry) => (
              <div key={entry.time + entry.message} className="flex gap-2">
                <span className="text-[#78BDA7]">›</span>
                <span>
                  <span className="text-stone-500">{entry.time}</span> {entry.message}
                </span>
              </div>
            ))}
          </div>
        </DSAdvisorPanel>
      </div>
    </div>
  );
}
