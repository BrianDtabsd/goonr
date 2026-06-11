import React from 'react';
import { element } from '../../lib/designTokens';
import { cn } from '../../lib/cn';
import { useDSTheme } from './ThemeProvider';

export default function DSTabs({ tabs, active, onChange, className }) {
  const { theme } = useDSTheme();
  const isCasefile = theme === 'casefile';

  return (
    <div
      className={cn(
        isCasefile ? element.tabs.listCasefile : element.tabs.listWorkplace,
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab)}
            className={cn(
              isActive
                ? isCasefile
                  ? element.tabs.tabActiveCasefile
                  : element.tabs.tabActiveWorkplace
                : isCasefile
                  ? element.tabs.tabCasefile
                  : element.tabs.tabWorkplace,
              'ds-bounce-press'
            )}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
