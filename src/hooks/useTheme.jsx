import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

/** Bumped so the orange-dark defaults apply for existing local installs. */
const THEME_STORAGE_KEY = 'shopsite-theme-v2';

const typographyBundles = {
  modern: {
    name: 'Jakarta Clean',
    headingFont: '"Plus Jakarta Sans", sans-serif',
    bodyFont: '"Plus Jakarta Sans", sans-serif',
    headingColor: '#ffffff',
    subtitleColor: '#a1a1aa',
    bodyColor: '#d4d4d8',
  },
  elegant: {
    name: 'Montserrat Display',
    headingFont: '"Montserrat", sans-serif',
    bodyFont: '"Plus Jakarta Sans", sans-serif',
    headingColor: '#fafafa',
    subtitleColor: '#a1a1aa',
    bodyColor: '#e4e4e7',
  },
  tech: {
    name: 'Ember Technical',
    headingFont: '"Montserrat", sans-serif',
    bodyFont: '"Plus Jakarta Sans", sans-serif',
    headingColor: '#ffffff',
    subtitleColor: '#a8a29e',
    bodyColor: '#f5f5f4',
  },
};

/**
 * Default look: orange-dark layered system (CaseLogic-inspired) expressed
 * through existing Studio knobs — no new controls.
 */
const defaultTheme = {
  // Empty = CSS layered field only (accent glow + charcoal depth)
  backgroundUrl: '',
  backgroundPattern: 'none',
  layoutMode: 'cards',
  typographyPreset: 'modern',
  bodyTextSize: '16px',
  frostLevel: '16px',
  transparencyLevel: 0.82,
  primaryColor: '#ff6b00',
  frostColor: '22, 22, 24',
  cardPadding: '1.5rem',
  cardRadius: '1.25rem',
  navOutline: 'thin',
  navOutlineColor: 'rgba(255,255,255,0.08)',
  buttonShape: 'rounded',
  buttonStyle: 'filled',
  buttonGlow: false,
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

    const bg = (theme.backgroundUrl || '').trim();
    root.style.setProperty('--bg-url', bg ? `url('${bg}')` : 'none');

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
    root.style.setProperty(
      '--nav-surface',
      `rgba(${theme.frostColor}, ${Math.min(0.96, Math.max(0.72, theme.transparencyLevel + 0.1))})`
    );

    root.style.setProperty('--card-padding', theme.cardPadding);
    root.style.setProperty('--card-radius', theme.cardRadius);

    const isCards = theme.layoutMode === 'cards';
    // Container mode: shell is the surface; cards go quiet.
    // Cards mode: shell invisible; cards carry the layered panels.
    const surfaceOpacity = theme.transparencyLevel;
    root.style.setProperty('--card-opacity', isCards ? surfaceOpacity : 0);
    root.style.setProperty('--card-border-opacity', isCards ? 0.1 : 0);
    root.style.setProperty('--card-frost', isCards ? theme.frostLevel : '0px');

    root.style.setProperty(
      '--container-opacity',
      !isCards ? Math.min(0.88, Math.max(0.7, surfaceOpacity)) : 0
    );
    root.style.setProperty('--container-frost', !isCards ? theme.frostLevel : '0px');
    root.style.setProperty('--container-border-opacity', 0);

    const navBorderWidth =
      theme.navOutline === 'none' ? '0px' : theme.navOutline === 'thin' ? '1px' : '2px';
    root.style.setProperty('--nav-border-width', navBorderWidth);
    root.style.setProperty('--nav-border-color', theme.navOutlineColor);

    document.body.dataset.layoutMode = theme.layoutMode;
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
