'use client';

import { useEffect, useRef } from 'react';

/**
 * Hero background video.
 * - poster paints instantly (becomes the LCP element)
 * - preload="none" + no autoplay attribute → nothing downloads during the
 *   critical render; we start playback only after the page has loaded and the
 *   main thread is idle, and we skip it on reduced-motion / data-saver.
 * - a smaller 480p source is served to mobile.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ''))) return;

    const start = () => {
      v.play().catch(() => {});
    };
    const ric = (window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void;
    }).requestIdleCallback;
    const schedule = () => {
      if (ric) ric(start, { timeout: 1500 });
      else window.setTimeout(start, 500);
    };

    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
  }, []);

  return (
    <video
      ref={ref}
      className="h-full w-full object-cover opacity-90"
      poster="/hero-poster.jpg"
      muted
      loop
      playsInline
      preload="none"
    >
      <source src="/hero-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
      <source src="/hero.mp4" type="video/mp4" />
    </video>
  );
}
