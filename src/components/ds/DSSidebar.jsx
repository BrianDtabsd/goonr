import React from 'react';
import { Link } from 'react-router-dom';
import { element, spacing, palette } from '../../lib/designTokens';
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
          : 'border-[#434A53]/15 bg-[#E4E4E4]',
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

export function DSSidebarItem({ icon, label, active, onClick, href, to }) {
  const { theme } = useDSTheme();
  const classes = cn(
    active
      ? theme === 'casefile'
        ? element.sidebar.itemActiveCasefile
        : element.sidebar.itemActive
      : element.sidebar.item,
    'ds-bounce-hover w-full text-left'
  );

  const content = (
    <>
      {icon && <iconify-icon icon={icon} width="18" height="18" />}
      <span>{label}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

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

export function DSSidebarProfile({ name, role, initials = 'BO' }) {
  const { theme } = useDSTheme();
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold',
          theme === 'casefile'
            ? 'bg-white/10 text-stone-200'
            : 'bg-[#1B1B1B] text-white'
        )}
      >
        {initials}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium" style={{ color: palette.workplace.text }}>
          {name}
        </p>
        <p className="truncate text-xs text-[#434A53]">{role}</p>
      </div>
    </div>
  );
}
