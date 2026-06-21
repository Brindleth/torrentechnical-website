'use client';

import { motion } from 'framer-motion';
import { CREDENTIALS } from '@/lib/content';

export default function AuthoritySection() {
  return (
    <section
      id="authority"
      className="relative overflow-hidden bg-navy-deep py-28 md:py-36"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 75% 25%, rgba(201,169,97,0.1), transparent)',
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-5 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-gold/70" />
          <span className="spec-label">003 · Technical Authority</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          Technical depth. <span className="text-gold text-glow">Screened to the spec.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-5 max-w-[64ch] text-base leading-relaxed text-white/65 md:text-lg"
        >
          Specialist technical roles are easy to fill badly — a keyword match is
          not a capability match. Torren Technical is led by people with hands-on
          industry backgrounds across engineering, construction and the trades,
          so every brief is assessed against the specification, the standards and
          the operational risk.
        </motion.p>

        <div className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {CREDENTIALS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden bg-navy-deep/70 p-7"
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-x-0 h-16 animate-scan bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
              </div>
              <div className="mb-5 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/35">
                <span>0{i + 1}</span>
                <span className="flex items-center gap-1.5 text-gold/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  VERIFIED
                </span>
              </div>
              <div className="font-display text-2xl font-semibold leading-none tracking-tight text-gold text-glow md:text-3xl">
                {c.num}
              </div>
              <div className="mt-3 text-sm leading-relaxed text-white/70">
                {c.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
