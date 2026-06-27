import { HERO_STATS } from '@/lib/content';
import HeroVideo from '@/components/HeroVideo';

const HEADLINE = [
  { text: 'A technical consultancy' },
  { text: 'for engineering, construction' },
  { text: 'and industrial trades.', gold: true },
];

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen">
      <div className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-navy-deep">
          <HeroVideo />
          <div className="pointer-events-none absolute inset-0 bg-navy-deep/25" />
        </div>

        {/* Overlays */}
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep" />
        <div className="pointer-events-none absolute inset-0 bg-radial-fade" />

        <HudCorners />

        {/* Content — rendered visible at first paint (no entrance animation above the fold) */}
        <div className="relative z-10 flex min-h-screen flex-col justify-start px-6 pt-28 pb-20 md:justify-center md:px-10 md:pt-20 lg:px-16">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <Chip>PERMANENT &amp; CONTRACT RECRUITMENT</Chip>
              <Chip>EST. 2026</Chip>
            </div>

            <h1 className="max-w-4xl font-display text-[2.4rem] font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.4rem]">
              {HEADLINE.map((l) => (
                <span
                  key={l.text}
                  className={`block ${l.gold ? 'text-gold text-glow' : 'text-white'}`}
                >
                  {l.text}
                </span>
              ))}
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              A technical consultancy for engineering, construction, industrial
              trades and more across selected Australian markets. We understand
              the work, so the right people and the right detail follow.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#engage" className="btn-primary">
                Talk to our team
                <Arrow />
              </a>
              <a href="/jobs" className="btn-ghost">
                View open roles
                <Arrow />
              </a>
              <a href="#engage" className="btn-ghost">
                Join the talent network
              </a>
            </div>

            {/* Stat strip */}
            <div className="mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/5 sm:grid-cols-4">
              {HERO_STATS.map((s) => (
                <div key={s.label} className="bg-navy-deep/60 px-5 py-4">
                  <div className="font-display text-2xl font-semibold text-gold md:text-3xl">
                    {s.num}
                  </div>
                  <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/55">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator (CSS-only, desktop) */}
        <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/40">
            Scroll to explore
          </span>
          <div className="h-10 w-px overflow-hidden bg-white/15">
            <div className="hero-cue h-1/2 w-full bg-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="border border-gold/40 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gold/90">
      {children}
    </span>
  );
}

function HudCorners() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block">
      <div className="absolute right-6 top-24 text-right font-mono text-[0.6rem] uppercase tracking-[0.25em] text-white/40">
        <div>LAT -33.87 · LON 151.21</div>
        <div className="text-gold/70">SYDNEY · NSW</div>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 8h11M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
