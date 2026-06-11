import React, { useEffect } from 'react';
import DashboardPattern from '../../components/design-system/patterns/DashboardPattern';
import { documindGlassDashboard } from '../../lib/glassPresets';
import { useTheme } from '../../hooks/useTheme';

export default function Dashboard() {
  const { updateTheme } = useTheme();

  useEffect(() => {
    updateTheme(documindGlassDashboard);
  }, [updateTheme]);

  return <DashboardPattern />;
}
