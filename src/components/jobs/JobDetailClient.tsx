'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { fetchJob, applyUrl, type JobDetail } from '@/lib/jobs-api';

// Client-rendered advert. Static-export-safe: the role is identified by ?token= (read in the
// browser) and fetched live from the public API, so there is no per-token route to pre-build.
export default function JobDetailClient() {
  const token = useSearchParams().get('token') ?? '';
  const [job, setJob] = useState<JobDetail | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'missing'>('loading');

  useEffect(() => {
    if (!token) {
      setState('missing');
      return;
    }
    let active = true;
    fetchJob(token)
      .then((res) => {
        if (!active) return;
        setJob(res);
        setState(res ? 'ready' : 'missing');
      })
      .catch(() => active && setState('missing'));
    return () => {
      active = false;
    };
  }, [token]);

  if (state === 'loading') {
    return (
      <div className="mt-10 space-y-6" aria-busy="true">
        <div className="glass h-10 w-2/3 animate-pulse opacity-40" />
        <div className="glass h-40 animate-pulse opacity-30" />
      </div>
    );
  }

  if (state === 'missing' || !job) {
    return (
      <div className="glass corner-bracket mt-10 px-8 py-16 text-center">
        <p className="font-display text-xl text-white">This role isn&apos;t available.</p>
        <p className="mt-2 text-sm text-white/55">
          It may have closed or been filled. See what else is open.
        </p>
        <Link href="/jobs" className="btn-ghost mt-6">
          All open roles
        </Link>
      </div>
    );
  }

  const href = applyUrl(token);

  return (
    <>
      {/* Header */}
      <div className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          {job.employmentType && <Tag>{job.employmentType}</Tag>}
          {job.workArrangement && <Tag>{job.workArrangement}</Tag>}
        </div>
        <h1 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
          {job.title ?? 'Open role'}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-white/50">
          {job.location && <span>{job.location}</span>}
          {job.salaryDisplay && <span className="text-gold/90">{job.salaryDisplay}</span>}
        </div>
      </div>

      {/* Apply CTA (top) */}
      <div className="mt-8">
        <a href={href} className="btn-primary">
          Apply for this role
          <Arrow />
        </a>
      </div>

      {/* Body */}
      <div className="mt-12 space-y-10">
        <Block title="About the role" body={job.roleSummary} />
        <Block title="What you'll be doing" body={job.roleServiceRequirements} />
        <SkillBlock title="Required skills" skills={job.requiredSkills} />
        <SkillBlock title="Nice to have" skills={job.niceToHaveSkills} />
        <Block title="Experience" body={job.experienceRequirements} />
        <Block title="Licences & tickets" body={job.licenceRequirements} />
        <Block title="Shift & availability" body={job.shiftAvailability} />
        <Block title="Screening & compliance" body={job.screeningCompliance} />
        <Block title="How to apply" body={job.applicationInstructions} />
      </div>

      {/* Apply CTA (bottom) */}
      <div className="mt-14 border-t border-line-dark/60 pt-10">
        <div className="glass corner-bracket px-8 py-9 text-center">
          <h2 className="font-display text-2xl font-semibold text-white">Ready to apply?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/60">
            Apply directly to Torren Technical. We never charge candidates — your application goes
            straight to the team handling this role.
          </p>
          <a href={href} className="btn-primary mt-6">
            Apply for this role
            <Arrow />
          </a>
        </div>
      </div>
    </>
  );
}

function hasBody(b: string | null): b is string {
  return !!b && b.trim().length > 0;
}

function Block({ title, body }: { title: string; body: string | null }) {
  if (!hasBody(body)) return null;
  return (
    <section>
      <h2 className="spec-label">{title}</h2>
      <p className="mt-3 whitespace-pre-line text-[0.95rem] leading-relaxed text-white/75">{body}</p>
    </section>
  );
}

function SkillBlock({ title, skills }: { title: string; skills: string[] | null }) {
  if (!skills || skills.length === 0) return null;
  return (
    <section>
      <h2 className="spec-label">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((s) => (
          <span
            key={s}
            className="border border-white/12 bg-white/[0.03] px-3 py-1.5 font-mono text-[0.7rem] text-white/70"
          >
            {s}
          </span>
        ))}
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
