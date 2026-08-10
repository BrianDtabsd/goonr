import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  foundationPresets,
  foundationPresetList,
} from '../theme/foundationPresets';

const THEME_STORAGE_KEY = 'shopsite-theme-v3';

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

const defaultTheme = {
  surfaceSystem: 'glass', // 'glass' | 'foundation'
  foundationMode: 'light', // 'light' | 'dark'
  foundationPreset: 'ember',

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
    const raw =
      localStorage.getItem(THEME_STORAGE_KEY) ||
      localStorage.getItem('shopsite-theme-v2');
    if (!raw) return { ...defaultTheme };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return { ...defaultTheme };
    return { ...defaultTheme, ...parsed };
  } catch {
    return { ...defaultTheme };
  }
}

function applyGlassTheme(root, theme) {
  const bg = (theme.backgroundUrl || '').trim();
  root.style.setProperty('--bg-url', bg ? `url('${bg}')` : 'none');

  const typo = typographyBundles[theme.typographyPreset] || typographyBundles.modern;
  root.style.setProperty('--font-display', typo.headingFont);
  root.style.setProperty('--font-heading', typo.headingFont);
  root.style.setProperty('--font-body', typo.bodyFont);
  root.style.setProperty('--font-label', typo.bodyFont);
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

  // Clear Foundation token aliases used by components
  root.style.setProperty('--ds-color-canvas', '#0a0a0b');
  root.style.setProperty('--ds-color-surface', `rgba(${theme.frostColor}, ${surfaceOpacity})`);
  root.style.setProperty('--ds-color-ink', typo.headingColor);
  root.style.setProperty('--ds-color-ink-muted', typo.subtitleColor);
  root.style.setProperty('--ds-color-line', 'rgba(255,255,255,0.12)');
  root.style.setProperty('--ds-color-accent', theme.primaryColor);
  root.style.setProperty('--ds-color-accent-hover', theme.primaryColor);
  root.style.setProperty('--ds-button-ink', theme.primaryColor);
  root.style.setProperty('--ds-button-ink-text', '#ffffff');
}

function applyFoundationTheme(root, theme) {
  const preset =
    foundationPresets[theme.foundationPreset] || foundationPresets.ember;
  const mode = theme.foundationMode === 'dark' ? 'dark' : 'light';
  const colors = preset[mode];

  root.style.setProperty('--bg-url', 'none');
  root.style.setProperty('--font-display', preset.fonts.display);
  root.style.setProperty('--font-heading', preset.fonts.heading);
  root.style.setProperty('--font-body', preset.fonts.body);
  root.style.setProperty('--font-label', preset.fonts.label);
  root.style.setProperty('--color-heading', colors.ink);
  root.style.setProperty('--color-subtitle', colors.inkMuted);
  root.style.setProperty('--color-body', colors.ink);
  root.style.setProperty('--text-body-size', '16px');

  root.style.setProperty('--primary-color', colors.accent);
  root.style.setProperty('--ds-color-canvas', colors.canvas);
  root.style.setProperty('--ds-color-surface', colors.surface);
  root.style.setProperty('--ds-color-surface-subtle', colors.surfaceSubtle);
  root.style.setProperty('--ds-color-ink', colors.ink);
  root.style.setProperty('--ds-color-ink-muted', colors.inkMuted);
  root.style.setProperty('--ds-color-ink-faint', colors.inkFaint);
  root.style.setProperty('--ds-color-line', colors.line);
  root.style.setProperty('--ds-color-accent', colors.accent);
  root.style.setProperty('--ds-color-accent-hover', colors.accentHover);
  root.style.setProperty('--ds-color-accent-soft', colors.accentSoft);
  root.style.setProperty('--ds-button-ink', colors.buttonInk);
  root.style.setProperty('--ds-button-ink-text', colors.buttonInkText);

  // Matte cards — no frost
  root.style.setProperty('--frost-level', '0px');
  root.style.setProperty('--transparency-level', '1');
  root.style.setProperty('--frost-rgb', '255, 255, 255');
  root.style.setProperty('--card-opacity', '1');
  root.style.setProperty('--card-border-opacity', '1');
  root.style.setProperty('--card-frost', '0px');
  root.style.setProperty('--card-padding', '1.5rem');
  root.style.setProperty('--card-radius', '0.5rem');
  root.style.setProperty('--container-opacity', '1');
  root.style.setProperty('--container-frost', '0px');
  root.style.setProperty('--container-border-opacity', '0');
  root.style.setProperty('--nav-surface', colors.canvas);
  root.style.setProperty('--nav-border-width', '1px');
  root.style.setProperty('--nav-border-color', colors.line);
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
    const isFoundation = theme.surfaceSystem === 'foundation';
    const preset =
      foundationPresets[theme.foundationPreset] || foundationPresets.ember;

    if (isFoundation) {
      applyFoundationTheme(root, theme);
    } else {
      applyGlassTheme(root, theme);
    }

    root.dataset.surface = isFoundation ? 'foundation' : 'glass';
    root.dataset.foundationMode = isFoundation
      ? theme.foundationMode === 'dark'
        ? 'dark'
        : 'light'
      : '';
    root.dataset.foundationPreset = isFoundation ? preset.id : '';
    root.dataset.serifScope = isFoundation ? preset.serifScope : 'none';
    document.body.dataset.layoutMode = theme.layoutMode;
    document.body.dataset.surface = root.dataset.surface;
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
      value={{
        theme,
        updateTheme,
        resetTheme,
        typographyBundles,
        foundationPresets,
        foundationPresetList,
        defaultTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
