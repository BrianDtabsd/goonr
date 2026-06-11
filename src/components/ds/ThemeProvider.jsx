import React, { createContext, useContext } from 'react';
import { themes } from '../../lib/designTokens';
import { cn } from '../../lib/cn';

const ThemeContext = createContext({ theme: 'workplace' });

export function DSThemeProvider({ theme = 'workplace', className, children }) {
  const themeConfig = themes[theme] || themes.workplace;

  return (
    <ThemeContext.Provider value={{ theme }}>
      <div className={cn(themeConfig.className, 'min-h-screen', className)}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useDSTheme() {
  return useContext(ThemeContext);
}
