'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchJobs, type JobCard } from '@/lib/jobs-api';

// Homepage "see jobs" section — a live preview of the latest published roles with a path through
// to the full board at /jobs. Client-fetched (the site is a static export), so it always reflects
// the current openings. Degrades to a talent-network CTA while loading or when nothing is open.
export default function OpenRolesSection() {
  const [items, setItems] = useState<JobCard[]>([]);
  const [total, setTotal] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    fetchJobs(3)
      .then((res) => {
        if (!active) return;
        setItems(res.items);
        setTotal(res.total);
      })
      .finally(() => active && setLoaded(true));
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="roles" className="relative border-t border-line-dark/60 bg-navy-deep py-24 md:py-32">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto w-full max-w-[1100px] px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="spec-label">Open Roles</span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
              Roles we&apos;re hiring for <span className="text-gold text-glow">right now.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/65">
              Technically vetted opportunities across engineering, construction and industrial
              trades — sourced and screened by Torren. No candidate-side fees, ever.
            </p>
          </div>
          <Link href="/jobs" className="btn-ghost shrink-0">
            See all open roles
            <Arrow />
          </Link>
        </div>

        {!loaded ? (
          <div className="mt-12 grid gap-5 md:grid-cols-3" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="glass corner-bracket h-36 animate-pulse opacity-30" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="glass corner-bracket mt-12 px-8 py-12 text-center">
            <p className="font-display text-lg text-white">No public roles posted at the moment.</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/60">
              New roles land regularly. Join the talent network and we&apos;ll reach out when one
              fits.
            </p>
            <Link href="#engage" className="btn-ghost mt-6">
              Join the talent network
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {items.map((job) => (
                <Link
                  key={job.publicToken}
                  href={`/jobs/role?token=${job.publicToken}`}
                  className="glass glass-hover corner-bracket group block px-6 py-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {job.employmentType && <Tag>{job.employmentType}</Tag>}
                    {job.workArrangement && <Tag>{job.workArrangement}</Tag>}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold leading-tight text-white transition-colors group-hover:text-gold">
                    {job.title ?? 'Open role'}
                  </h3>
                  {job.location && (
                    <p className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/45">
                      {job.location}
                    </p>
                  )}
                  <span className="mt-5 inline-block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-gold/90">
                    View role →
                  </span>
                </Link>
              ))}
            </div>
            {total > items.length && (
              <p className="mt-8 text-center font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/40">
                + {total - items.length} more on the{' '}
                <Link href="/jobs" className="text-gold hover:underline">
                  full board
                </Link>
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="border border-gold/30 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-gold/85">
      {children}
    </span>
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
