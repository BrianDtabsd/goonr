import { useEffect } from 'react';
import { useScrollContainer } from '../context/ScrollContainerContext';

export function useScrollReveal() {
  const { scrollElementRef, hasScrollElement } = useScrollContainer();

  useEffect(() => {
    const scrollElement = scrollElementRef.current;
    if (
      !hasScrollElement ||
      !scrollElement ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    // --- Intersection Observer for Reveal Animations ---
    const observerOptions = { root: scrollElement, rootMargin: '0px', threshold: 0.12 };
    
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Unobserve so the entrance animation only plays once per element
          observerInstance.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const observeElements = () => {
      scrollElement
        .querySelectorAll('.anim-trigger:not(.is-visible)')
        .forEach((el) => observer.observe(el));
    };

    // Initial check with a slight delay to ensure DOM layout is complete
    const timer = setTimeout(observeElements, 100);

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(scrollElement, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [hasScrollElement, scrollElementRef]);
}