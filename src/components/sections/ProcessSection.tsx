'use client';

import { useEffect, useRef, useState } from 'react';
import { PROCESS_STAGES } from '@/lib/content';
import SectionHeading from '@/components/ui/SectionHeading';

function useInView(bottomMargin = '-80px') {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: `0px 0px ${bottomMargin} 0px` }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [bottomMargin]);
  return { ref, inView };
}

export default function ProcessSection() {
  const conduit = useInView('-120px');

  return (
    <section id="process" className="relative bg-navy py-28 md:py-36">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          label="002 · Process"
          title="How we work."
          description="A five-stage engagement model. Every step documented. Every output reviewable. Every gate signed off before the next begins."
        />

        <div ref={conduit.ref} className="relative mt-20">
          {/* Conduit */}
          <div className="absolute left-[26px] top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2">
            <div
              className="absolute left-0 top-0 h-full w-full origin-top bg-gradient-to-b from-gold-light via-gold to-gold-deep transition-transform duration-[1600ms] ease-out"
              style={{
                transform: conduit.inView ? 'scaleY(1)' : 'scaleY(0)',
                boxShadow: '0 0 18px rgba(201,169,97,0.7)',
              }}
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {PROCESS_STAGES.map((stage, i) => (
              <ProcessStage
                key={stage.id}
                stage={stage}
                leftSide={i % 2 === 0}
                total={PROCESS_STAGES.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStage({
  stage,
  leftSide,
  total,
}: {
  stage: (typeof PROCESS_STAGES)[number];
  leftSide: boolean;
  total: number;
}) {
  const { ref, inView } = useInView('-80px');
  return (
    <div
      ref={ref}
      className="relative grid grid-cols-[56px_1fr] items-center gap-4 md:grid-cols-2 md:gap-12"
    >
      <div className="absolute left-[26px] z-10 -translate-x-1/2 md:left-1/2">
        <div
          className={`relative flex h-3.5 w-3.5 items-center justify-center rounded-full border border-gold bg-navy-deep transition-all duration-500 ${
            inView ? 'scale-100 opacity-100' : 'scale-50 opacity-30'
          }`}
        >
          {inView && (
            <span className="absolute h-6 w-6 animate-ping rounded-full bg-gold/30" />
          )}
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        </div>
      </div>

      <div
        className={`reveal ${inView ? 'revealed' : ''} col-start-2 md:row-start-1 ${
          leftSide
            ? 'md:col-start-1 md:flex md:justify-end md:text-right'
            : 'md:col-start-2'
        }`}
      >
        <div
          className={`glass glass-hover corner-bracket w-full max-w-md p-6 transition-all duration-500 ${
            inView ? 'border-gold/40' : ''
          }`}
        >
          <div
            className={`mb-3 flex items-center gap-3 ${
              leftSide ? 'md:justify-end' : ''
            }`}
          >
            <span className="font-mono text-xs tracking-[0.2em] text-gold/80">
              STAGE {stage.code}
            </span>
            <span className="font-mono text-xs text-white/30">
              {stage.id} / {total}
            </span>
          </div>
          <h3 className="font-display text-xl font-semibold text-white">
            {stage.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            {stage.body}
          </p>
        </div>
      </div>
    </div>
  );
}
