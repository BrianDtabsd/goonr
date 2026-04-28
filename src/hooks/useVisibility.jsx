import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

/**
 * Per-deploy visibility for pages and home sections.
 * Hide instead of delete: flip back on later from the settings panel.
 *
 * Sources of truth (highest first):
 *   1. localStorage overrides (per browser, written by the settings panel)
 *   2. VITE_HIDE_PAGES / VITE_HIDE_HOME_SECTIONS env (CSV; default per-deploy)
 *   3. Default: everything visible
 */

const STORAGE_KEY = 'shopsite-visibility-v1';

const PAGE_KEYS = ['store', 'checkout', 'learn', 'sales'];

function readEnvHidden(envValue) {
  if (!envValue) return [];
  return String(envValue)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function loadOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function defaultsFromEnv() {
  const hiddenPages = new Set(readEnvHidden(import.meta.env.VITE_HIDE_PAGES));
  const hiddenSections = new Set(readEnvHidden(import.meta.env.VITE_HIDE_HOME_SECTIONS));
  const pages = {};
  for (const key of PAGE_KEYS) pages[key] = !hiddenPages.has(key);
  return {
    pages,
    homeSections: {},
    _envHiddenSections: [...hiddenSections],
  };
}

const VisibilityContext = createContext(null);

export function VisibilityProvider({ children }) {
  const [overrides, setOverrides] = useState(loadOverrides);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch {
      /* ignore */
    }
  }, [overrides]);

  const env = useMemo(defaultsFromEnv, []);

  const pages = useMemo(() => {
    const merged = { ...env.pages };
    if (overrides.pages) {
      for (const k of Object.keys(overrides.pages)) {
        if (overrides.pages[k] === true || overrides.pages[k] === false) {
          merged[k] = overrides.pages[k];
        }
      }
    }
    return merged;
  }, [env.pages, overrides.pages]);

  const isPageVisible = useCallback((key) => pages[key] !== false, [pages]);

  const isHomeSectionVisible = useCallback(
    (sectionId) => {
      const o = overrides.homeSections?.[sectionId];
      if (o === true) return true;
      if (o === false) return false;
      return !env._envHiddenSections.includes(sectionId);
    },
    [overrides.homeSections, env._envHiddenSections]
  );

  const setPageVisible = useCallback((key, visible) => {
    setOverrides((cur) => ({
      ...cur,
      pages: { ...(cur.pages || {}), [key]: !!visible },
    }));
  }, []);

  const setHomeSectionVisible = useCallback((sectionId, visible) => {
    setOverrides((cur) => ({
      ...cur,
      homeSections: { ...(cur.homeSections || {}), [sectionId]: !!visible },
    }));
  }, []);

  const resetVisibility = useCallback(() => setOverrides({}), []);

  const value = useMemo(
    () => ({
      pages,
      isPageVisible,
      isHomeSectionVisible,
      setPageVisible,
      setHomeSectionVisible,
      resetVisibility,
      pageKeys: PAGE_KEYS,
    }),
    [pages, isPageVisible, isHomeSectionVisible, setPageVisible, setHomeSectionVisible, resetVisibility]
  );

  return <VisibilityContext.Provider value={value}>{children}</VisibilityContext.Provider>;
}

export function useVisibility() {
  const ctx = useContext(VisibilityContext);
  if (!ctx) {
    throw new Error('useVisibility must be used within VisibilityProvider');
  }
  return ctx;
}
