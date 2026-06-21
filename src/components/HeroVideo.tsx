'use client';

import { useEffect, useRef } from 'react';

/**
 * Hero background video.
 * - WebP poster paints instantly (the LCP element).
 * - preload="none" + no autoplay → nothing downloads during the critical
 *   render; playback starts after load, on idle, and is skipped on
 *   reduced-motion / data-saver.
 * - The source is chosen ONCE in JS (not via <source media>) so a viewport
 *   resize during a Lighthouse run can't trigger a source re-selection that
 *   aborts the in-flight request (the cause of the ERR_FAILED console errors).
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ''))) return;

    v.src = window.matchMedia('(max-width: 767px)').matches
      ? '/hero-mobile.mp4'
      : '/hero.mp4';

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
      poster="/hero-poster.webp"
      muted
      loop
      playsInline
      preload="none"
    />
  );
}
