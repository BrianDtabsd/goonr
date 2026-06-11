import React from 'react';
import { useLocation } from 'react-router-dom';
import { DSSidebar, DSSidebarItem, DSSidebarProfile } from '../ds/DSSidebar';
import { icons } from '../../lib/designTokens';
import { getCaseAppMeta } from '../../config/caseAppMeta';

const navItems = [
  { to: '/app', label: 'Mission Control', icon: icons.nav.dashboard, end: true },
  { to: '/app/tracks', label: 'Design Tracks', icon: 'solar:palette-linear' },
  { to: '/app/cases', label: 'Cases', icon: icons.nav.cases },
  { to: '/app/incidents', label: 'Incidents', icon: icons.nav.incidents },
  { to: '/app/analysis', label: 'Analysis', icon: icons.nav.analysis },
  { to: '/app/decisions', label: 'Decisions', icon: icons.nav.decisions },
  { to: '/app/people', label: 'People', icon: icons.nav.people },
  { to: '/app/evidence', label: 'Evidence', icon: icons.nav.evidence },
  { to: '/app/reports', label: 'Reports', icon: icons.nav.reports },
  { to: '/app/settings', label: 'Settings', icon: icons.nav.settings },
];

function isActive(pathname, to, end) {
  if (end) return pathname === to || pathname === `${to}/`;
  return pathname === to || pathname.startsWith(`${to}/`);
}

export default function AppSidebar() {
  const { pathname } = useLocation();
  const { brandName } = getCaseAppMeta();

  return (
    <DSSidebar
      brand={brandName}
      status="Inference Active"
      footer={
        <DSSidebarProfile name="Brian Onufrejow" role="Super Admin" initials="BO" />
      }
    >
      <div className="flex flex-col gap-1">
        {navItems.map((item) => (
          <DSSidebarItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            active={isActive(pathname, item.to, item.end)}
          />
        ))}
      </div>
    </DSSidebar>
  );
}
