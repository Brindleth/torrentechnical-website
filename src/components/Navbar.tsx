'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-line-dark/60 bg-navy-deep/75 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center border border-gold/50 bg-gold/10 font-display text-lg font-bold text-gold transition-colors group-hover:bg-gold/20">
            T
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-white">
            Torren Technical
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a href="#engage" className="btn-ghost text-[0.65rem]">
            Join network
          </a>
          <a href="#engage" className="btn-primary text-[0.65rem]">
            Talk to us
          </a>
        </div>

        <button
          aria-label="Toggle navigation"
          onClick={() => setOpen((o) => !o)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
        >
          <span className={`h-px w-6 bg-white transition-all ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-white transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`h-px w-6 bg-white transition-all ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line-dark/60 bg-navy-deep/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line-dark/40 py-3 font-mono text-sm uppercase tracking-[0.2em] text-white/70"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <a href="#engage" onClick={() => setOpen(false)} className="btn-ghost justify-center">
                  Join network
                </a>
                <a href="#engage" onClick={() => setOpen(false)} className="btn-primary justify-center">
                  Talk to us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
