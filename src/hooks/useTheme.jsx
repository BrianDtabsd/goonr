import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const THEME_STORAGE_KEY = 'shopsite-theme-v1';

const typographyBundles = {
  modern: {
    name: 'Modern Clean',
    headingFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    headingColor: '#ffffff',
    subtitleColor: '#94a3b8',
    bodyColor: '#cbd5e1',
  },
  elegant: {
    name: 'Elegant Serif',
    headingFont: '"Playfair Display", serif',
    bodyFont: '"Roboto", sans-serif',
    headingColor: '#f8fafc',
    subtitleColor: '#cbd5e1',
    bodyColor: '#e2e8f0',
  },
  tech: {
    name: 'Technical',
    headingFont: '"Space Grotesk", sans-serif',
    bodyFont: '"Inter", sans-serif',
    headingColor: '#60a5fa',
    subtitleColor: '#94a3b8',
    bodyColor: '#f1f5f9',
  },
};

const defaultTheme = {
  backgroundUrl:
    'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop',
  backgroundPattern: 'mesh',
  layoutMode: 'cards',
  typographyPreset: 'modern',
  bodyTextSize: '16px',
  frostLevel: '24px',
  transparencyLevel: 0.1,
  primaryColor: '#3b82f6',
  frostColor: '255, 255, 255',
  cardPadding: '2rem',
  cardRadius: '2.5rem',
  navOutline: 'none',
  navOutlineColor: 'rgba(255,255,255,0.15)',
  buttonShape: 'pill',
  buttonStyle: 'filled',
  buttonGlow: true,
  buttonJump: true,
};

function loadTheme() {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return { ...defaultTheme };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return { ...defaultTheme };
    return { ...defaultTheme, ...parsed };
  } catch {
    return { ...defaultTheme };
  }
}

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(loadTheme);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    } catch (e) {
      console.warn('Theme: could not persist to localStorage', e);
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--bg-url', `url('${theme.backgroundUrl}')`);

    const typo = typographyBundles[theme.typographyPreset] || typographyBundles.modern;
    root.style.setProperty('--font-heading', typo.headingFont);
    root.style.setProperty('--font-body', typo.bodyFont);
    root.style.setProperty('--color-heading', typo.headingColor);
    root.style.setProperty('--color-subtitle', typo.subtitleColor);
    root.style.setProperty('--color-body', typo.bodyColor);
    root.style.setProperty('--text-body-size', theme.bodyTextSize);

    root.style.setProperty('--frost-level', theme.frostLevel);
    root.style.setProperty('--transparency-level', theme.transparencyLevel);
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--frost-rgb', theme.frostColor);

    root.style.setProperty('--card-padding', theme.cardPadding);
    root.style.setProperty('--card-radius', theme.cardRadius);

    const isCards = theme.layoutMode === 'cards';
    root.style.setProperty('--card-opacity', isCards ? theme.transparencyLevel : 0);
    root.style.setProperty('--card-border-opacity', isCards ? 0.15 : 0);
    root.style.setProperty('--card-frost', isCards ? theme.frostLevel : '0px');

    root.style.setProperty('--container-opacity', !isCards ? theme.transparencyLevel : 0);
    root.style.setProperty('--container-frost', !isCards ? theme.frostLevel : '0px');
    root.style.setProperty('--container-border-opacity', !isCards ? 0.15 : 0);

    const navBorderWidth =
      theme.navOutline === 'none' ? '0px' : theme.navOutline === 'thin' ? '1px' : '2px';
    root.style.setProperty('--nav-border-width', navBorderWidth);
    root.style.setProperty('--nav-border-color', theme.navOutlineColor);
  }, [theme]);

  const updateTheme = useCallback((updates) => {
    setTheme((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetTheme = useCallback(() => {
    setTheme({ ...defaultTheme });
    try {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, updateTheme, resetTheme, typographyBundles, defaultTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
