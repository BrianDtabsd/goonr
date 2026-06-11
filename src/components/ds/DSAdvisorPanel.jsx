import React, { useState } from 'react';
import { element } from '../../lib/designTokens';
import { cn } from '../../lib/cn';

export default function DSAdvisorPanel({
  tabs = ['Document Analysis', 'RTW Prediction', 'Hermes Agent'],
  title = 'Senior Advisor',
  children,
  footer,
  floating,
  className,
}) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const shell = floating ? element.advisor.float : element.advisor.panel;

  return (
    <div className={cn(shell, 'ds-bounce-hover', className)}>
      {!floating && (
        <div className="flex border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                activeTab === tab ? element.advisor.tabActive : element.advisor.tab
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {floating ? (
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
            <iconify-icon icon="solar:cpu-bolt-linear" width="16" height="16" className="text-[#C8E6EA]" />
          </span>
          <span className="text-sm font-medium text-stone-200">{title}</span>
          <span className="h-2 w-2 rounded-full bg-[#78BDA7]" />
        </div>
      ) : (
        <div className="p-4 font-mono text-xs leading-relaxed text-stone-400">
          {children}
        </div>
      )}

      {!floating && footer && (
        <div className="border-t border-white/10 p-3">
          <input
            type="text"
            placeholder="Ask the advisor..."
            className={element.advisor.input}
          />
        </div>
      )}
    </div>
  );
}
