'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

/**
 * Marks [data-reveal] elements with data-revealed as they enter the viewport.
 * Re-scans after every client-side navigation. A data attribute (not a class)
 * is used so React never overwrites it on re-render.
 */
export function RevealRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    window.__revealReady = true;
    const root = document.documentElement;
    if (root.dataset.motion !== 'ok') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-revealed', '');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    document
      .querySelectorAll('[data-reveal]:not([data-revealed])')
      .forEach((element) => observer.observe(element));

    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const onPreferenceChange = () => {
      if (reducedMotion.matches) delete root.dataset.motion;
    };
    reducedMotion.addEventListener('change', onPreferenceChange);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener('change', onPreferenceChange);
    };
  }, [pathname]);

  return null;
}
