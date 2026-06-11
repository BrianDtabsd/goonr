import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCaseAppMeta } from '../../config/caseAppMeta';
import { cn } from '../../lib/cn';

const navItems = [
  { to: '/app/glass', label: 'Dashboard', icon: 'solar:widget-2-linear', end: true },
  { to: '/app/glass/cases', label: 'Cases', icon: 'solar:folder-linear' },
  { to: '/app/tracks', label: 'Design Tracks', icon: 'solar:palette-linear' },
  { to: '/app', label: 'Workplace track', icon: 'solar:arrow-right-linear' },
];

function isActive(pathname, to, end) {
  if (end) return pathname === to || pathname === `${to}/`;
  return pathname === to || pathname.startsWith(`${to}/`);
}

export default function GlassSidebar() {
  const { pathname } = useLocation();
  const { brandName } = getCaseAppMeta();

  return (
    <aside className="fixed left-4 top-4 bottom-4 z-30 flex w-[220px] flex-col gap-4 sm:left-6 lg:left-8">
      <div className="glass-nav flex flex-col gap-1 p-3">
        <div className="mb-3 px-3 pt-2">
          <p className="text-sm font-semibold text-white">{brandName}</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-slate-400">
            Template glass
          </p>
        </div>
        {navItems.map((item) => {
          const active = isActive(pathname, item.to, item.end);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-all',
                active
                  ? 'bg-white/10 text-white'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              )}
            >
              <iconify-icon icon={item.icon} width="18" height="18" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="glass-card mt-auto !p-4 text-xs text-slate-400">
        <p className="font-medium text-slate-200">Track A</p>
        <p className="mt-1 leading-relaxed">
          Swappable background, frost, and glass cards from the website template.
        </p>
      </div>
    </aside>
  );
}
