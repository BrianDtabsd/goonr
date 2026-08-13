import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  foundationPresets,
  foundationPresetList,
} from '../theme/foundationPresets';

const THEME_STORAGE_KEY = 'shopsite-theme-v5';
const LEGACY_THEME_KEYS = ['shopsite-theme-v4', 'shopsite-theme-v3', 'shopsite-theme-v2'];

function hexToRgb(hex) {
  if (!hex || typeof hex !== 'string') return '22, 22, 24';
  const raw = hex.replace('#', '').trim();
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return '22, 22, 24';
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

/** Legacy typography bundles — kept for old saves; Glass now uses Foundation presets. */
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
  foundationMode: 'dark', // shared light/dark for Glass + Foundation presets
  foundationPreset: 'ember', // shared theme grid (Glass + Foundation)

  backgroundUrl: '',
  backgroundPattern: 'none',
  layoutMode: 'cards',

  /** Page field color — empty means use the active preset canvas */
  pageColor: '',
  /** 0–1 quick control that updates shared surface values together */
  panelStrength: 0.48,
  surfaceOpacity: 0.48,
  navOpacity: 0.616,
  primaryColor: '#e27348',

  // Kept as migration aliases for older saves.
  transparencyLevel: 0.55,
  frostLevel: '25px',
  frostColor: '25, 25, 27',
  typographyPreset: 'modern',
  bodyTextSize: '16px',
  cardPadding: '1.5rem',
  cardRadius: '1.25rem',
  navOutline: 'thin',
  navOutlineColor: 'rgba(255,255,255,0.08)',
  buttonShape: 'rounded',
  buttonStyle: 'filled',
  buttonGlow: false,
  buttonJump: true,
  customOverrides: {},
};

const PRESET_GROUP_KEYS = {
  theme: ['foundationPreset'],
  mode: ['foundationMode'],
  layout: ['layoutMode'],
  surface: ['panelStrength', 'surfaceOpacity', 'frostLevel', 'frostColor', 'navOpacity'],
  typography: ['typographyPreset', 'bodyTextSize'],
  colour: ['pageColor', 'primaryColor'],
  buttons: ['buttonShape', 'buttonStyle', 'buttonGlow', 'buttonJump'],
  navigation: ['navOutline', 'navOutlineColor'],
  background: ['backgroundUrl', 'backgroundPattern', 'cardPadding', 'cardRadius'],
};

function deriveSurfaceValues(strength) {
  const safe = Math.min(1, Math.max(0, Number.isFinite(Number(strength)) ? Number(strength) : 0.48));
  const blur = safe <= 0.02 ? '0px' : `${Math.round(8 + safe * 36)}px`;
  return {
    surfaceOpacity: safe,
    frostLevel: blur,
    navOpacity: Math.min(0.92, Math.max(0.55, 0.4 + safe * 0.45)),
  };
}

function presetThemeValues(preset, mode, surfaceSystem) {
  const colors = preset[mode];
  const surface = surfaceSystem === 'foundation'
    ? { surfaceOpacity: 1, frostLevel: '0px', navOpacity: 0.92 }
    : { ...deriveSurfaceValues(0.48) };
  return {
    foundationPreset: preset.id,
    pageColor: colors.canvas,
    primaryColor: colors.accent,
    frostColor: hexToRgb(colors.surface),
    ...surface,
  };
}

function loadTheme() {
  try {
    const sourceKey = [THEME_STORAGE_KEY, ...LEGACY_THEME_KEYS].find((key) =>
      localStorage.getItem(key)
    );
    const raw = sourceKey ? localStorage.getItem(sourceKey) : null;
    if (!raw) return { ...defaultTheme };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return { ...defaultTheme };
    const merged = { ...defaultTheme, ...parsed };
    const strength = Number(parsed.panelStrength);
    const safeStrength = Math.min(
      1,
      Math.max(0, Number.isFinite(strength) ? strength : defaultTheme.panelStrength)
    );
    const derivedBlur = safeStrength <= 0.02 ? '0px' : `${Math.round(8 + safeStrength * 36)}px`;
    if (parsed.surfaceOpacity == null) {
      const legacyOpacity = Number(parsed.transparencyLevel);
      merged.surfaceOpacity = Number.isFinite(legacyOpacity)
        ? Math.min(1, Math.max(0, legacyOpacity))
        : safeStrength;
    }
    if (parsed.frostLevel == null) merged.frostLevel = derivedBlur;
    if (parsed.frostColor == null) {
      const preset = foundationPresets[parsed.foundationPreset] || foundationPresets.ember;
      const mode = parsed.foundationMode === 'light' ? 'light' : 'dark';
      merged.frostColor = hexToRgb(preset[mode].surface);
    }
    if (parsed.navOpacity == null) {
      merged.navOpacity = Math.min(0.92, Math.max(0.55, 0.4 + safeStrength * 0.45));
    }
    return merged;
  } catch {
    return { ...defaultTheme };
  }
}

function resolvePreset(theme) {
  return foundationPresets[theme.foundationPreset] || foundationPresets.ember;
}

function resolveMode(theme) {
  return theme.foundationMode === 'light' ? 'light' : 'dark';
}

function applyGlassTheme(root, theme) {
  const preset = resolvePreset(theme);
  const mode = resolveMode(theme);
  const colors = preset[mode];
  const page = (theme.pageColor || '').trim() || colors.canvas;
  const accent = theme.primaryColor || colors.accent;
  const panelStrength = Number(theme.panelStrength);
  const strength = Math.min(
    1,
    Math.max(0, Number.isFinite(panelStrength) ? panelStrength : 0.48)
  );
  // Cards can go fully clear (0) so type floats with no panel behind it.
  const configuredOpacity = Number(theme.surfaceOpacity);
  const panelOpacity = Math.min(
    1,
    Math.max(0, Number.isFinite(configuredOpacity) ? configuredOpacity : strength)
  );
  const blurPx =
    typeof theme.frostLevel === 'number'
      ? `${Math.max(0, theme.frostLevel)}px`
      : theme.frostLevel || '0px';
  const panelRgb = theme.frostColor || hexToRgb(colors.surface);
  const configuredNavOpacity = Number(theme.navOpacity);
  const navOpacity = Math.min(
    1,
    Math.max(
      0,
      Number.isFinite(configuredNavOpacity)
        ? configuredNavOpacity
        : 0.4 + strength * 0.45
    )
  );
  const isCards = theme.layoutMode === 'cards';

  const bg = (theme.backgroundUrl || '').trim();
  root.style.setProperty('--bg-url', bg ? `url('${bg}')` : 'none');

  root.style.setProperty('--font-display', preset.fonts.display);
  root.style.setProperty('--font-heading', preset.fonts.heading);
  root.style.setProperty('--font-body', preset.fonts.body);
  root.style.setProperty('--font-label', preset.fonts.label);
  root.style.setProperty('--color-heading', colors.ink);
  root.style.setProperty('--color-subtitle', colors.inkMuted);
  root.style.setProperty('--color-body', colors.ink);
  root.style.setProperty('--text-body-size', theme.bodyTextSize || '16px');

  root.style.setProperty('--page-canvas', page);
  root.style.setProperty('--primary-color', accent);
  root.style.setProperty('--frost-rgb', panelRgb);
  root.style.setProperty('--frost-level', blurPx === '0px' ? '16px' : blurPx);
  root.style.setProperty('--transparency-level', String(panelOpacity));
  root.style.setProperty('--nav-surface', `rgba(${panelRgb}, ${navOpacity})`);
  root.style.setProperty('--nav-opacity', String(navOpacity));

  root.style.setProperty('--card-padding', theme.cardPadding);
  root.style.setProperty('--card-radius', theme.cardRadius);
  root.style.setProperty('--card-opacity', isCards ? String(panelOpacity) : '0');
  root.style.setProperty(
    '--card-border-opacity',
    isCards ? String(panelOpacity * 0.18) : '0'
  );
  root.style.setProperty('--card-frost', isCards ? blurPx : '0px');
  root.style.setProperty(
    '--container-opacity',
    !isCards ? String(Math.min(0.88, Math.max(0, panelOpacity))) : '0'
  );
  root.style.setProperty('--container-frost', !isCards ? blurPx : '0px');
  root.style.setProperty('--container-border-opacity', '0');

  const navBorderWidth =
    theme.navOutline === 'none' ? '0px' : theme.navOutline === 'thin' ? '1px' : '2px';
  root.style.setProperty('--nav-border-width', navBorderWidth);
  root.style.setProperty(
    '--nav-border-color',
    theme.navOutlineColor || colors.line
  );

  root.style.setProperty('--ds-color-canvas', page);
  root.style.setProperty('--ds-color-surface', colors.surface);
  root.style.setProperty('--ds-color-surface-subtle', colors.surfaceSubtle);
  root.style.setProperty('--ds-color-ink', colors.ink);
  root.style.setProperty('--ds-color-ink-muted', colors.inkMuted);
  root.style.setProperty('--ds-color-ink-faint', colors.inkFaint);
  root.style.setProperty('--ds-color-line', colors.line);
  root.style.setProperty('--ds-color-accent', accent);
  root.style.setProperty('--ds-color-accent-hover', colors.accentHover);
  root.style.setProperty('--ds-color-accent-soft', colors.accentSoft);
  root.style.setProperty('--ds-button-ink', accent);
  root.style.setProperty('--ds-button-ink-text', '#ffffff');
  root.style.setProperty(
    '--hero-stripe-a',
    colors.pastelLavender || colors.accentSoft || accent
  );
  root.style.setProperty('--hero-stripe-b', colors.pastelTeal || accent);
  root.style.setProperty(
    '--hero-stripe-c',
    colors.pastelSage || colors.accentHover || accent
  );
}

function applyFoundationTheme(root, theme) {
  const preset = resolvePreset(theme);
  const mode = resolveMode(theme);
  const colors = preset[mode];
  const page = (theme.pageColor || '').trim() || colors.canvas;
  const accent = theme.primaryColor || colors.accent;
  const configuredOpacity = Number(theme.surfaceOpacity);
  const panelOpacity = Math.min(
    1,
    Math.max(0, Number.isFinite(configuredOpacity) ? configuredOpacity : 1)
  );
  const configuredNavOpacity = Number(theme.navOpacity);
  const navOpacity = Math.min(
    1,
    Math.max(0, Number.isFinite(configuredNavOpacity) ? configuredNavOpacity : 0.92)
  );
  const blurPx =
    typeof theme.frostLevel === 'number'
      ? `${Math.max(0, theme.frostLevel)}px`
      : theme.frostLevel || '0px';
  const panelRgb = theme.frostColor || hexToRgb(colors.surface);
  const bg = (theme.backgroundUrl || '').trim();

  root.style.setProperty('--bg-url', bg ? `url('${bg}')` : 'none');
  root.style.setProperty('--font-display', preset.fonts.display);
  root.style.setProperty('--font-heading', preset.fonts.heading);
  root.style.setProperty('--font-body', preset.fonts.body);
  root.style.setProperty('--font-label', preset.fonts.label);
  root.style.setProperty('--color-heading', colors.ink);
  root.style.setProperty('--color-subtitle', colors.inkMuted);
  root.style.setProperty('--color-body', colors.ink);
  root.style.setProperty('--text-body-size', theme.bodyTextSize || '16px');

  root.style.setProperty('--primary-color', accent);
  root.style.setProperty('--ds-color-canvas', page);
  root.style.setProperty('--page-canvas', page);
  root.style.setProperty('--ds-color-surface', colors.surface);
  root.style.setProperty('--ds-color-surface-subtle', colors.surfaceSubtle);
  root.style.setProperty('--ds-color-ink', colors.ink);
  root.style.setProperty('--ds-color-ink-muted', colors.inkMuted);
  root.style.setProperty('--ds-color-ink-faint', colors.inkFaint);
  root.style.setProperty('--ds-color-line', colors.line);
  root.style.setProperty('--ds-color-accent', accent);
  root.style.setProperty('--ds-color-accent-hover', colors.accentHover);
  root.style.setProperty('--ds-color-accent-soft', colors.accentSoft);
  root.style.setProperty('--ds-button-ink', colors.buttonInk);
  root.style.setProperty('--ds-button-ink-text', colors.buttonInkText);

  root.style.setProperty('--frost-level', blurPx === '0px' ? '16px' : blurPx);
  root.style.setProperty('--transparency-level', String(panelOpacity));
  root.style.setProperty('--frost-rgb', panelRgb);
  root.style.setProperty(
    '--card-opacity',
    theme.layoutMode === 'cards' ? String(panelOpacity) : '0'
  );
  root.style.setProperty(
    '--card-border-opacity',
    theme.layoutMode === 'cards' ? String(panelOpacity * 0.18) : '0'
  );
  root.style.setProperty(
    '--card-frost',
    theme.layoutMode === 'cards' ? blurPx : '0px'
  );
  root.style.setProperty('--card-padding', theme.cardPadding);
  root.style.setProperty('--card-radius', theme.cardRadius);
  root.style.setProperty(
    '--container-opacity',
    theme.layoutMode === 'container' ? String(panelOpacity) : '0'
  );
  root.style.setProperty(
    '--container-frost',
    theme.layoutMode === 'container' ? blurPx : '0px'
  );
  root.style.setProperty('--container-border-opacity', '0');
  root.style.setProperty('--nav-surface', `rgba(${panelRgb}, ${navOpacity})`);
  root.style.setProperty('--nav-opacity', String(navOpacity));
  const navBorderWidth =
    theme.navOutline === 'none' ? '0px' : theme.navOutline === 'thin' ? '1px' : '2px';
  root.style.setProperty('--nav-border-width', navBorderWidth);
  root.style.setProperty('--nav-border-color', theme.navOutlineColor || colors.line);

  root.style.setProperty(
    '--hero-stripe-a',
    colors.pastelLavender || colors.accentSoft || colors.accent
  );
  root.style.setProperty(
    '--hero-stripe-b',
    colors.pastelTeal || colors.accent
  );
  root.style.setProperty(
    '--hero-stripe-c',
    colors.pastelSage || colors.accentHover || colors.accent
  );
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
    const preset = resolvePreset(theme);

    if (isFoundation) {
      applyFoundationTheme(root, theme);
    } else {
      applyGlassTheme(root, theme);
    }

    root.dataset.surface = isFoundation ? 'foundation' : 'glass';
    root.dataset.foundationMode = resolveMode(theme);
    root.dataset.foundationPreset = preset.id;
    root.dataset.serifScope = preset.serifScope;
    document.body.dataset.layoutMode = theme.layoutMode;
    document.body.dataset.surface = root.dataset.surface;
  }, [theme]);

  const updateTheme = useCallback((updates, options = {}) => {
    setTheme((prev) => {
      const next = { ...updates };
      if (updates.panelStrength != null) {
        Object.assign(next, deriveSurfaceValues(updates.panelStrength));
      }
      const customOverrides = { ...(prev.customOverrides || {}) };
      if (options.track !== false) {
        Object.keys(next).forEach((key) => {
          if (key !== 'customOverrides') customOverrides[key] = true;
        });
      }
      return { ...prev, ...next, customOverrides };
    });
  }, []);

  const applyLookPreset = useCallback((presetId) => {
    setTheme((prev) => {
      const preset = foundationPresets[presetId] || foundationPresets.ember;
      const mode = prev.foundationMode === 'light' ? 'light' : 'dark';
      const values = presetThemeValues(preset, mode, prev.surfaceSystem);
      const customOverrides = prev.customOverrides || {};
      const next = { ...prev, foundationPreset: preset.id };
      Object.entries(values).forEach(([key, value]) => {
        if (!customOverrides[key] || key === 'foundationPreset') next[key] = value;
      });
      return {
        ...next,
      };
    });
  }, []);

  const resetPresetGroup = useCallback((group) => {
    setTheme((prev) => {
      const preset = foundationPresets[prev.foundationPreset] || foundationPresets.ember;
      const mode = prev.foundationMode === 'light' ? 'light' : 'dark';
      const values = presetThemeValues(preset, mode, prev.surfaceSystem);
      const keys = PRESET_GROUP_KEYS[group] || [];
      const customOverrides = { ...(prev.customOverrides || {}) };
      const next = { ...prev };
      keys.forEach((key) => {
        delete customOverrides[key];
        if (values[key] !== undefined) next[key] = values[key];
      });
      next.customOverrides = customOverrides;
      return next;
    });
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
        applyLookPreset,
        resetPresetGroup,
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
