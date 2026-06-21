'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollTrigger } from '@/lib/gsap';
import { PROCESS_STAGES } from '@/lib/content';
import SectionHeading from '@/components/ui/SectionHeading';

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      end: 'bottom 80%',
      scrub: true,
      onUpdate: (self) => {
        if (fillRef.current) {
          fillRef.current.style.transform = `scaleY(${self.progress})`;
        }
        setActive(
          Math.min(
            PROCESS_STAGES.length - 1,
            Math.floor(self.progress * PROCESS_STAGES.length)
          )
        );
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section id="process" className="relative bg-navy py-28 md:py-36">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          label="002 · Process"
          title="How we work."
          description="A five-stage engagement model. Every step documented. Every output reviewable. Every gate signed off before the next begins."
        />

        <div ref={ref} className="relative mt-20">
          {/* Conduit */}
          <div className="absolute left-[26px] top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2">
            <div
              ref={fillRef}
              className="absolute left-0 top-0 h-full w-full origin-top bg-gradient-to-b from-gold-light via-gold to-gold-deep"
              style={{ transform: 'scaleY(0)', boxShadow: '0 0 18px rgba(201,169,97,0.7)' }}
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {PROCESS_STAGES.map((stage, i) => {
              const isActive = i <= active;
              const leftSide = i % 2 === 0;
              return (
                <div
                  key={stage.id}
                  className="relative grid grid-cols-[56px_1fr] items-center gap-4 md:grid-cols-2 md:gap-12"
                >
                  <div className="absolute left-[26px] z-10 -translate-x-1/2 md:left-1/2">
                    <motion.div
                      animate={{ scale: isActive ? 1 : 0.5, opacity: isActive ? 1 : 0.3 }}
                      transition={{ duration: 0.4 }}
                      className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full border border-gold bg-navy-deep"
                    >
                      {isActive && (
                        <span className="absolute h-6 w-6 animate-ping rounded-full bg-gold/30" />
                      )}
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`col-start-2 md:row-start-1 ${
                      leftSide
                        ? 'md:col-start-1 md:flex md:justify-end md:text-right'
                        : 'md:col-start-2'
                    }`}
                  >
                    <div
                      className={`glass glass-hover corner-bracket w-full max-w-md p-6 transition-all duration-500 ${
                        isActive ? 'border-gold/40' : ''
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
                          {stage.id} / {PROCESS_STAGES.length}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-semibold text-white">
                        {stage.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">
                        {stage.body}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
