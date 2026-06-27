'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { fetchJobs, type JobCard } from '@/lib/jobs-api';

// Client-side board. The marketing site is a static export (Cloudflare Pages, no server), so roles
// are fetched live in the browser from the public API — always current, never a build snapshot.
export default function JobBoardClient() {
  const [jobs, setJobs] = useState<JobCard[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');

  useEffect(() => {
    let active = true;
    fetchJobs()
      .then((res) => {
        if (!active) return;
        setJobs(res.items);
        setState('ready');
      })
      .catch(() => active && setState('error'));
    return () => {
      active = false;
    };
  }, []);

  const types = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => j.employmentType && set.add(j.employmentType));
    return ['all', ...Array.from(set).sort()];
  }, [jobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((j) => {
      if (type !== 'all' && j.employmentType !== type) return false;
      if (!q) return true;
      return [j.title, j.location, j.roleSummary, j.workArrangement]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(q));
    });
  }, [jobs, query, type]);

  if (state === 'loading') {
    return (
      <div className="grid gap-5 md:grid-cols-2" aria-busy="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="glass corner-bracket h-44 animate-pulse opacity-40" />
        ))}
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="glass corner-bracket px-8 py-16 text-center">
        <p className="font-display text-lg text-white">We couldn&apos;t load roles just now.</p>
        <p className="mt-2 text-sm text-white/55">
          Please try again shortly, or{' '}
          <Link href="/#engage" className="text-gold hover:underline">
            join the talent network
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Controls */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search role, location or keyword…"
            aria-label="Search roles"
            className="w-full border border-white/15 bg-white/[0.03] px-5 py-3.5 font-sans text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-gold/60"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`border px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] transition-colors ${
                type === t
                  ? 'border-gold/60 bg-gold/10 text-gold'
                  : 'border-white/15 text-white/55 hover:border-white/40 hover:text-white'
              }`}
            >
              {t === 'all' ? 'All roles' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="mb-6 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/40">
        {filtered.length} {filtered.length === 1 ? 'role' : 'roles'}
        {(query || type !== 'all') && ` · filtered from ${jobs.length}`}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="glass corner-bracket px-8 py-16 text-center">
          <p className="font-display text-lg text-white">
            {jobs.length === 0 ? 'No public roles posted right now.' : 'No matching roles.'}
          </p>
          <p className="mt-2 text-sm text-white/55">
            Try a broader search, or join the talent network and we&apos;ll reach out when the
            right role lands.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((job) => (
            <Link
              key={job.publicToken}
              href={`/jobs/role?token=${job.publicToken}`}
              className="glass glass-hover corner-bracket group block px-7 py-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                {job.employmentType && <Tag>{job.employmentType}</Tag>}
                {job.workArrangement && <Tag>{job.workArrangement}</Tag>}
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold leading-tight text-white transition-colors group-hover:text-gold">
                {job.title ?? 'Open role'}
              </h3>
              {job.location && (
                <p className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/45">
                  {job.location}
                </p>
              )}
              {job.roleSummary && (
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/65">
                  {job.roleSummary}
                </p>
              )}
              <div className="mt-5 flex items-center justify-between">
                <span className="font-mono text-[0.7rem] text-gold/90">
                  {job.salaryDisplay ?? 'Salary on application'}
                </span>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/45 transition-colors group-hover:text-gold">
                  View role →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="border border-gold/30 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-gold/85">
      {children}
    </span>
  );
}
