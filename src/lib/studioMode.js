/**
 * Studio mode = the settings panel and /seller-onboarding are visible.
 * Default: ON. Turn OFF for client deploys with `VITE_SHOPSITE_STUDIO_MODE=off`.
 *
 * Override at runtime via URL: ?studio=on|off (persisted in localStorage).
 */

const LS_KEY = 'shopsite-studio-mode';

function readOverride() {
  try {
    return localStorage.getItem(LS_KEY); // 'on' | 'off' | null
  } catch {
    return null;
  }
}

function applyUrlOverride() {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const v = params.get('studio');
  if (v === 'on' || v === 'off') {
    try {
      localStorage.setItem(LS_KEY, v);
    } catch {
      /* ignore */
    }
    return v;
  }
  return null;
}

export function isStudioMode() {
  applyUrlOverride();
  const override = readOverride();
  if (override === 'off') return false;
  if (override === 'on') return true;
  const env = import.meta.env.VITE_SHOPSITE_STUDIO_MODE;
  if (env === 'off' || env === 'false' || env === '0') return false;
  return true;
}

export function setStudioMode(value) {
  try {
    if (value === null) localStorage.removeItem(LS_KEY);
    else localStorage.setItem(LS_KEY, value);
  } catch {
    /* ignore */
  }
}
