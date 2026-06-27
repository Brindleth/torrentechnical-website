'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/content';

// CTAs scroll to #engage (via href) AND pre-select the form tab there. EngageSection listens
// for this event: "Join network" → For Talent, "Talk to us" → For Employers.
function selectEngageTab(tab: 'employer' | 'talent') {
  window.dispatchEvent(new CustomEvent('engage-tab', { detail: tab }));
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === '/';

  // Hash targets scroll in-page on the homepage; from any other route (e.g. /jobs) they must
  // navigate home first, so prefix with "/". Non-hash links (e.g. /jobs) pass through unchanged.
  const toHash = (hash: string) => (onHome ? hash : `/${hash}`);
  const resolve = (href: string) => (href.startsWith('#') ? toHash(href) : href);
  const logoHref = onHome ? '#top' : '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-line-dark/60 bg-navy-deep/75 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <Link href={logoHref} className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center border border-gold/50 bg-gold/10 font-display text-lg font-bold text-gold transition-colors group-hover:bg-gold/20">
            T
          </span>
          <span className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white">
            Torren Technical
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={resolve(l.href)}
              className="group relative font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href={toHash('#engage')} onClick={() => selectEngageTab('talent')} className="btn-ghost text-[0.65rem]">
            Join network
          </Link>
          <Link href={toHash('#engage')} onClick={() => selectEngageTab('employer')} className="btn-primary text-[0.65rem]">
            Talk to us
          </Link>
        </div>

        <button
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
        >
          <span className={`h-px w-6 bg-white transition-all ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-white transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`h-px w-6 bg-white transition-all ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu — CSS grid-rows collapse (no JS animation lib) */}
      <div
        className={`grid overflow-hidden border-line-dark/60 bg-navy-deep/95 backdrop-blur-xl transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          open ? 'grid-rows-[1fr] border-t' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-1 px-6 py-6">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={resolve(l.href)}
                onClick={() => setOpen(false)}
                className="border-b border-line-dark/40 py-3 font-mono text-sm uppercase tracking-[0.2em] text-white/70"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Link href={toHash('#engage')} onClick={() => { setOpen(false); selectEngageTab('talent'); }} className="btn-ghost justify-center">
                Join network
              </Link>
              <Link href={toHash('#engage')} onClick={() => { setOpen(false); selectEngageTab('employer'); }} className="btn-primary justify-center">
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
