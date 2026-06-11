import React from 'react';
import { spacing } from '../../lib/designTokens';
import { cn } from '../../lib/cn';
import { DSThemeProvider } from './ThemeProvider';
import { DSSidebar } from './DSSidebar';

export default function DSAppShell({
  theme = 'workplace',
  sidebar,
  children,
  advisor,
  className,
}) {
  return (
    <DSThemeProvider theme={theme}>
      <div className={cn('flex min-h-screen', className)}>
        {sidebar}
        <main className={cn('flex flex-1 flex-col', spacing.pageX, spacing.pageY)}>
          {children}
        </main>
        {advisor}
      </div>
    </DSThemeProvider>
  );
}

export { DSSidebar, DSSidebarItem } from './DSSidebar';
