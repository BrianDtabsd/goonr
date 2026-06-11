import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DSAppShell } from '../../components/ds';
import DSAdvisorPanel from '../../components/ds/DSAdvisorPanel';
import AppSidebar from '../../components/caseapp/AppSidebar';
import { spacing } from '../../lib/designTokens';
import { cn } from '../../lib/cn';

export default function CaseAppLayout() {
  const { pathname } = useLocation();
  const isCaseDetail = pathname.includes('/app/cases/') && pathname.split('/').length > 3;
  const theme = isCaseDetail ? 'casefile' : 'workplace';

  return (
    <DSAppShell
      theme={theme}
      sidebar={<AppSidebar />}
      advisor={<DSAdvisorPanel floating title="Senior Advisor" />}
      className={theme === 'casefile' ? 'ds-theme-casefile' : undefined}
    >
      <div className={cn(spacing.contentMax, 'w-full')}>
        <Outlet />
      </div>
    </DSAppShell>
  );
}
