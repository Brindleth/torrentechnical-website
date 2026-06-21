'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Wires Lenis smooth scrolling into the GSAP ScrollTrigger ticker so every
 * scroll-driven 3D camera move and section animation stays perfectly in sync.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced) {
      return; // honour user preference — native scroll, no smoothing
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links route through Lenis for buttery in-page navigation.
    const handleAnchor = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const id = target.getAttribute('href');
      if (id && id.startsWith('#') && id.length > 1) {
        e.preventDefault();
        lenis.scrollTo(id, { offset: 0, duration: 1.4 });
      }
    };
    const anchors = Array.from(
      document.querySelectorAll('a[href^="#"]')
    ) as HTMLAnchorElement[];
    anchors.forEach((a) => a.addEventListener('click', handleAnchor));

    return () => {
      gsap.ticker.remove(raf);
      anchors.forEach((a) => a.removeEventListener('click', handleAnchor));
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
