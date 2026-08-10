import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getSiteMeta, SITE_META_DEFAULTS } from '../config/siteMeta';

const STORAGE_KEY = 'shopsite-site-meta-overrides-v1';

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

const SiteMetaContext = createContext(null);

export function SiteMetaProvider({ children }) {
  const [overrides, setOverrides] = useState(loadOverrides);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch (e) {
      console.warn('Site meta: could not persist to localStorage', e);
    }
  }, [overrides]);

  const meta = useMemo(() => getSiteMeta(overrides), [overrides]);

  useEffect(() => {
    document.title = meta.documentTitle;
    let el = document.querySelector('meta[name="description"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', 'description');
      document.head.appendChild(el);
    }
    el.setAttribute('content', meta.metaDescription);
  }, [meta.documentTitle, meta.metaDescription]);

  const patchSiteMeta = useCallback((partial) => {
    setOverrides((prev) => {
      const next = { ...prev };
      for (const [k, v] of Object.entries(partial)) {
        if (v == null || String(v).trim() === '') {
          delete next[k];
        } else {
          next[k] = v;
        }
      }
      return next;
    });
  }, []);

  const resetSiteMetaOverrides = useCallback(() => {
    setOverrides({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({
      ...meta,
      overrides,
      defaults: SITE_META_DEFAULTS,
      patchSiteMeta,
      resetSiteMetaOverrides,
    }),
    [meta, overrides, patchSiteMeta, resetSiteMetaOverrides]
  );

  return (
    <SiteMetaContext.Provider value={value}>{children}</SiteMetaContext.Provider>
  );
}

export function useSiteMeta() {
  const ctx = useContext(SiteMetaContext);
  if (!ctx) {
    throw new Error('useSiteMeta must be used within SiteMetaProvider');
  }
  return ctx;
}
