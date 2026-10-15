/**
 * Inlined in <head> so motion is decided before first paint. Reveal styles
 * only apply under html[data-motion="ok"], so without JavaScript — or with
 * prefers-reduced-motion — every element renders in its final state. If the
 * reveal runtime hasn't started after 4 s (failed or very slow hydration),
 * motion is switched off rather than leaving content hidden.
 */
export const motionBootstrap = `(function(){try{var d=document.documentElement;if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.motion='ok';setTimeout(function(){if(!window.__revealReady){delete d.dataset.motion}},4000)}}catch(e){}})();`;
