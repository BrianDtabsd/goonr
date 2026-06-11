import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCaseAppMeta } from '../../config/caseAppMeta';
import { cn } from '../../lib/cn';

const navItems = [
  { to: '/design-system', label: 'Overview', icon: 'solar:home-2-linear', end: true },
  { to: '/design-system/foundation', label: 'Foundation', icon: 'solar:palette-linear' },
  { to: '/design-system/components', label: 'Components', icon: 'solar:widget-4-linear' },
  { to: '/design-system/dashboard', label: 'Dashboard', icon: 'solar:widget-2-linear' },
  { to: '/design-system/case-file', label: 'Case file', icon: 'solar:folder-linear' },
  { to: '/app', label: 'Workplace alt', icon: 'solar:sun-2-linear', note: 'Track B' },
];

function isActive(pathname, to, end) {
  if (end) return pathname === to || pathname === `${to}/`;
  return pathname === to || pathname.startsWith(`${to}/`);
}

export default function DesignSystemNav() {
  const { pathname } = useLocation();
  const { brandName } = getCaseAppMeta();

  return (
    <aside className="fixed left-4 top-4 bottom-4 z-40 flex w-[240px] flex-col gap-3 sm:left-6 lg:left-8">
      <div className="glass-sidebar flex flex-1 flex-col overflow-hidden p-3">
        <div className="mb-4 px-2 pt-1">
          <p className="text-sm font-semibold text-white">{brandName}</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-slate-400">
            Design system
          </p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
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
                <span className="flex-1">{item.label}</span>
                {item.note ? (
                  <span className="text-[9px] uppercase tracking-wide text-slate-500">{item.note}</span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="mt-3 border-t border-white/10 pt-3 px-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white"
          >
            <iconify-icon icon="solar:arrow-left-linear" width="14" height="14" />
            Marketing site
          </Link>
        </div>
      </div>

      <div className="glass-card !p-4 text-xs leading-relaxed text-slate-400">
        <p className="font-medium text-slate-200">Theme panel</p>
        <p className="mt-1">
          Use the <span className="text-white">gear button</span> bottom-right to swap background,
          frost, and colours — changes apply live on every page here.
        </p>
      </div>
    </aside>
  );
}
