import React from 'react';
import { element, spacing } from '../../lib/designTokens';
import { cn } from '../../lib/cn';
import { useDSTheme } from './ThemeProvider';

export function DSSidebar({ brand, status, children, footer, className }) {
  const { theme } = useDSTheme();

  return (
    <aside
      className={cn(
        spacing.sidebarWidth,
        'flex shrink-0 flex-col border-r',
        theme === 'casefile'
          ? 'border-white/[0.06] bg-[#111111]'
          : 'border-[#E5E0D8] bg-[#EAE6DE]',
        className
      )}
    >
      <div className="px-5 py-6">
        {brand && <div className="text-lg font-semibold tracking-tight">{brand}</div>}
        {status && (
          <div className="mt-2 flex items-center gap-2">
            <span className={element.sidebar.statusDot} />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-stone-500">
              {status}
            </span>
          </div>
        )}
      </div>

      <nav className={cn(element.sidebar.shell, 'flex-1 px-3')}>{children}</nav>

      {footer && <div className="border-t border-inherit p-4">{footer}</div>}
    </aside>
  );
}

export function DSSidebarItem({ icon, label, active, onClick, href }) {
  const { theme } = useDSTheme();
  const classes = cn(
    active
      ? theme === 'casefile'
        ? element.sidebar.itemActiveCasefile
        : element.sidebar.itemActive
      : element.sidebar.item,
    'ds-bounce-hover w-full'
  );

  const content = (
    <>
      {icon && <iconify-icon icon={icon} width="18" height="18" />}
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
