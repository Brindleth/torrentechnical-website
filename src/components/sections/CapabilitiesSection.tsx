'use client';

import { useEffect, useRef, useState } from 'react';
import { CAPABILITIES } from '@/lib/content';
import SectionHeading from '@/components/ui/SectionHeading';
import Schematic from '@/components/ui/Schematic';

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" className="relative bg-navy-deep py-28 md:py-36">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="gold-rule pointer-events-none absolute inset-x-0 top-0 h-px" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          label="001 · Capabilities"
          title="Coverage across technical disciplines."
          description="A technical consultancy across the disciplines that keep Australian industry running — engineering, construction, industrial trades and more. Depth where generalists get it wrong."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((d, i) => (
            <CapabilityCard key={d.id} d={d} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({
  d,
  delay,
}: {
  d: (typeof CAPABILITIES)[number];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -60px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ transitionDelay: `${delay}s` }}
      className={`reveal ${shown ? 'revealed' : ''} glass glass-hover group relative overflow-hidden p-6`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-25 transition-opacity duration-500 group-hover:opacity-60">
        <Schematic id={d.id} active={hover} />
      </div>

      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between">
          <span
            className="font-mono text-2xl text-gold/80 transition-transform duration-500 group-hover:scale-110"
            aria-hidden
          >
            {d.icon}
          </span>
          <span className="font-mono text-xs tracking-[0.25em] text-white/30">
            {d.index}
          </span>
        </div>

        <h3 className="font-display text-xl font-semibold leading-tight text-white">
          {d.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/60">{d.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {d.tags.map((t) => (
            <span
              key={t}
              className="border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/55 transition-colors group-hover:border-gold/30 group-hover:text-gold/90"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
