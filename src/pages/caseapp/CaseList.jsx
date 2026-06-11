import React from 'react';
import { Link } from 'react-router-dom';
import { DSPageHeader, DSButton } from '../../components/ds';
import { element, icons, resolveCaseStatus, statusChipClasses } from '../../lib/designTokens';
import { cn } from '../../lib/cn';
import { recentCases } from '../../content/caseAppMock';
import { caseAppBreadcrumb } from '../../config/caseAppMeta';

export default function CaseList() {
  return (
    <>
      <DSPageHeader
        breadcrumb={caseAppBreadcrumb('cases')}
        title="Cases"
        actions={
          <DSButton variant="accent">
            <iconify-icon icon={icons.action.add} width="16" height="16" />
            New Case
          </DSButton>
        }
      />

      <div className={element.table.wrapperWorkplace}>
        <table className="w-full text-sm">
          <thead className="border-b border-[#434A53]/10 bg-[#F8F8F8]">
            <tr>
              <th className={element.table.th}>Case ID</th>
              <th className={element.table.th}>Claimant</th>
              <th className={element.table.th}>Client</th>
              <th className={element.table.th}>Status</th>
              <th className={element.table.th} />
            </tr>
          </thead>
          <tbody className={element.table.divider}>
            {recentCases.map((c) => {
              const status = resolveCaseStatus(c.status);
              return (
                <tr key={c.id} className={element.table.trHover}>
                  <td className={cn(element.table.td, 'text-xs tabular-nums')}>{c.id}</td>
                  <td className={element.table.td}>{c.name}</td>
                  <td className={element.table.td}>{c.client}</td>
                  <td className={element.table.td}>
                    <span className={statusChipClasses(status.semantic, 'workplace')}>
                      {status.label}
                    </span>
                  </td>
                  <td className={element.table.td}>
                    <Link
                      to={`/app/cases/${c.id}`}
                      className="text-sm font-medium text-[#FF5722] hover:underline"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
