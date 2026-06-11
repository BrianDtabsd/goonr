import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { defaultTheme, useTheme } from '../../hooks/useTheme';
import { DSAppShell } from '../../components/ds';
import DSAdvisorPanel from '../../components/ds/DSAdvisorPanel';
import AppSidebar from '../../components/caseapp/AppSidebar';
import { spacing } from '../../lib/designTokens';
import { cn } from '../../lib/cn';

export default function CaseAppLayout() {
  const { pathname } = useLocation();
  const { updateTheme } = useTheme();
  const isCaseDetail = pathname.includes('/app/cases/') && pathname.split('/').length > 3;
  const theme = isCaseDetail ? 'casefile' : 'workplace';

  useEffect(() => {
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = isCaseDetail ? '#0D0D0D' : '#EEEEEE';
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundColor = '';
      updateTheme(defaultTheme);
    };
  }, [isCaseDetail, updateTheme]);

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
