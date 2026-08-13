import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const STORAGE_KEY = 'shopsite-studio-panel-width-v1';
const MIN_PANEL = 320;
const MAX_PANEL_RATIO = 0.72;
const DEFAULT_PANEL = null; // null → 50% of viewport on first open

const StudioShellContext = createContext(null);

function clampPanelWidth(width, viewport = window.innerWidth) {
  const max = Math.max(MIN_PANEL, Math.floor(viewport * MAX_PANEL_RATIO));
  const min = Math.min(MIN_PANEL, max);
  return Math.min(max, Math.max(min, Math.round(width)));
}

export function StudioShellProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [panelWidth, setPanelWidth] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_PANEL;
      const n = Number(raw);
      return Number.isFinite(n) ? n : DEFAULT_PANEL;
    } catch {
      return DEFAULT_PANEL;
    }
  });
  const [isDragging, setIsDragging] = useState(false);
  const [sheetHeight, setSheetHeight] = useState(72);

  const resolvedWidth = useMemo(() => {
    if (typeof window === 'undefined') return 420;
    const fallback = Math.round(window.innerWidth * 0.5);
    return clampPanelWidth(panelWidth ?? fallback);
  }, [panelWidth]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(resolvedWidth));
    } catch {
      /* ignore */
    }
  }, [resolvedWidth]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onResize = () => {
      setPanelWidth((prev) => clampPanelWidth(prev ?? window.innerWidth * 0.5));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isOpen]);

  const openStudio = useCallback(() => setIsOpen(true), []);
  const closeStudio = useCallback(() => setIsOpen(false), []);
  const toggleStudio = useCallback(() => setIsOpen((v) => !v), []);
  const toggleSheet = useCallback(() => {
    setSheetHeight((height) => (height <= 100 ? Math.min(window.innerHeight * 0.82, 720) : 72));
  }, []);
  const resizeSheet = useCallback((height) => {
    setIsDragging(true);
    const max = Math.min(window.innerHeight * 0.82, 720);
    setSheetHeight(Math.min(max, Math.max(72, height)));
  }, []);
  const endSheetResize = useCallback(() => setIsDragging(false), []);

  const beginResize = useCallback(
    (clientX) => {
      setIsDragging(true);
      const onMove = (e) => {
        const next = window.innerWidth - e.clientX;
        setPanelWidth(clampPanelWidth(next));
      };
      const onUp = () => {
        setIsDragging(false);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      };
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      // seed from current pointer so first frame feels right
      const next = window.innerWidth - clientX;
      setPanelWidth(clampPanelWidth(next));
    },
    []
  );

  const value = useMemo(
    () => ({
      isOpen,
      panelWidth: resolvedWidth,
      isDragging,
      openStudio,
      closeStudio,
      toggleStudio,
      beginResize,
      toggleSheet,
      resizeSheet,
      endSheetResize,
      sheetHeight,
      isSheetExpanded: sheetHeight > 100,
      setPanelWidth: (w) => setPanelWidth(clampPanelWidth(w)),
    }),
    [
      isOpen,
      resolvedWidth,
      isDragging,
      openStudio,
      closeStudio,
      toggleStudio,
      beginResize,
      toggleSheet,
      resizeSheet,
      endSheetResize,
      sheetHeight,
    ]
  );

  return (
    <StudioShellContext.Provider value={value}>{children}</StudioShellContext.Provider>
  );
}

export function useStudioShell() {
  const ctx = useContext(StudioShellContext);
  if (!ctx) {
    throw new Error('useStudioShell must be used within StudioShellProvider');
  }
  return ctx;
}
