'use client';

import { motion } from 'framer-motion';
import { WHY_FEATURES } from '@/lib/content';

export default function WhySection() {
  return (
    <section id="why" className="relative bg-navy py-28 md:py-36">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — narrative */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-gold/70" />
              <span className="spec-label">004 · Why Torren Technical</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              A focused technical
              <br />
              <span className="text-gold text-glow">consultancy.</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 space-y-4 text-base leading-relaxed text-white/65"
            >
              <p>
                We operate as a focused technical consultancy rather than a
                high-volume agency: fewer engagements, deeper briefs, and higher
                quality per role across engineering, construction and the trades.
              </p>
              <p>
                Our consultants understand specifications, drawings and site
                realities, and what the role genuinely requires. Briefs are read
                end-to-end before we act, and people are assessed against the
                specification — not the keywords.
              </p>
            </motion.div>
          </div>

          {/* Right — feature list */}
          <div className="lg:pt-16">
            <ul className="space-y-px overflow-hidden border border-white/10">
              {WHY_FEATURES.map((f, i) => (
                <motion.li
                  key={f.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex gap-4 bg-white/[0.02] p-5 transition-colors hover:bg-gold/[0.05]"
                >
                  <span className="mt-1 font-mono text-xs text-gold/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm leading-relaxed text-white/70">
                    <strong className="font-semibold text-white">
                      {f.title}
                    </strong>{' '}
                    {f.body}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
