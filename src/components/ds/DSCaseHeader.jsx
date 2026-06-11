import React from 'react';
import { typography, domain } from '../../lib/designTokens';
import { cn } from '../../lib/cn';
import DSButton from './DSButton';
import DSBadge from './DSBadge';
import DSTabs from './DSTabs';

export default function DSCaseHeader({
  caseId,
  caseName,
  status = 'open',
  badges = [],
  activeTab,
  onTabChange,
  onBack,
  actions,
}) {
  const statusConfig = domain.caseStatus[status] || domain.caseStatus.open;

  return (
    <div className="mb-6 space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        {onBack && (
          <DSButton variant="ghost" size="sm" onClick={onBack}>
            <iconify-icon icon="solar:arrow-left-linear" width="16" height="16" />
          </DSButton>
        )}
        <span className="ds-breadcrumb">
          Cases / {caseName || caseId}
        </span>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-semibold tracking-[-0.02em] tabular-nums sm:text-2xl">
              {caseId}
            </h1>
            <DSBadge variant="active">{statusConfig.label}</DSBadge>
            {badges.map((b) => (
              <DSBadge key={b} variant="plan">
                {b}
              </DSBadge>
            ))}
          </div>
          {caseName && (
            <h2 className={typography.scale.caseName}>{caseName}</h2>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>

      {activeTab && onTabChange && (
        <DSTabs tabs={domain.caseTabs} active={activeTab} onChange={onTabChange} />
      )}
    </div>
  );
}
