'use client';

import { useEffect, useState } from 'react';

/** SSR-safe media query hook. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/**
 * Coarse performance tier used to scale particle counts and post-processing.
 * Returns 'low' for mobile / low-core devices, 'high' otherwise.
 */
export function usePerformanceTier(): 'low' | 'high' {
  const [tier, setTier] = useState<'low' | 'high'>('high');

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    const mem = (navigator as Navigator & { deviceMemory?: number })
      .deviceMemory;
    const lowMem = typeof mem === 'number' && mem <= 4;
    setTier(mobile || cores <= 4 || lowMem ? 'low' : 'high');
  }, []);

  return tier;
}
