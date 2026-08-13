import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

const ScrollContainerContext = createContext(null);

export function ScrollContainerProvider({ children }) {
  const scrollElementRef = useRef(null);
  const [hasScrollElement, setHasScrollElement] = useState(false);
  const setScrollElement = useCallback((element) => {
    scrollElementRef.current = element;
    setHasScrollElement(Boolean(element));
  }, []);
  const setScrollPaddingTop = useCallback(
    (height) => {
      if (scrollElementRef.current) {
        scrollElementRef.current.style.scrollPaddingTop = `${height}px`;
      }
    },
    []
  );

  const scrollToHash = useCallback(
    (hash, behavior = 'smooth') => {
      const scrollElement = scrollElementRef.current;
      if (!scrollElement || !hash) return false;
      const id = decodeURIComponent(hash.replace(/^#/, ''));
      const target = scrollElement.querySelector(`#${CSS.escape(id)}`);
      if (!target) return false;

      target.scrollIntoView({ behavior, block: 'start' });
      return true;
    },
    []
  );

  const value = useMemo(
    () => ({
      scrollElementRef,
      hasScrollElement,
      setScrollElement,
      scrollToHash,
      setScrollPaddingTop,
    }),
    [hasScrollElement, setScrollElement, scrollToHash, setScrollPaddingTop]
  );

  return (
    <ScrollContainerContext.Provider value={value}>
      {children}
    </ScrollContainerContext.Provider>
  );
}

export function useScrollContainer() {
  const context = useContext(ScrollContainerContext);
  if (!context) {
    throw new Error('useScrollContainer must be used within ScrollContainerProvider');
  }
  return context;
}
