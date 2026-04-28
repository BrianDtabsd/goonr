import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // --- Intersection Observer for Reveal Animations ---
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.12 };
    
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
      document.querySelectorAll('.anim-trigger:not(.is-visible)').forEach(el => {
        observer.observe(el);
      });
    };

    // Initial check with a slight delay to ensure DOM layout is complete
    const timer = setTimeout(observeElements, 100);

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}