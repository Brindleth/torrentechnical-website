'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { fetchJob, type JobDetail } from '@/lib/jobs-api';
import ApplyForm from '@/components/jobs/ApplyForm';

const BOARD_ORIGIN = 'https://torrentechnical.com';

// Parse free-text salary like "$85-100,000 + 12% super" or "$55/hr" into schema.org baseSalary.
// Returns null if no recognisable number is found — better to omit than guess wrong.
function parseSalary(raw: string | null): Record<string, unknown> | null {
  if (!raw) return null;
  const lower = raw.toLowerCase();
  const isHourly = /\bhr\b|hour|p\/h/.test(lower);
  const unitText = isHourly ? 'HOUR' : 'YEAR';

  // Strip currency symbols and commas, extract all numbers.
  const nums = [...raw.matchAll(/[\d,]+(?:\.\d+)?/g)]
    .map((m) => parseFloat(m[0].replace(/,/g, '')))
    .filter((n) => n > 0);

  if (nums.length === 0) return null;

  // Sanity-check: annual figures should be > 1000, hourly < 1000.
  const plausible = nums.filter((n) => (isHourly ? n < 1000 : n > 1000));
  if (plausible.length === 0) return null;

  const min = Math.min(...plausible);
  const max = Math.max(...plausible);

  if (min === max) {
    return {
      '@type': 'MonetaryAmount',
      currency: 'AUD',
      value: { '@type': 'QuantitativeValue', value: min, unitText },
    };
  }
  return {
    '@type': 'MonetaryAmount',
    currency: 'AUD',
    value: { '@type': 'QuantitativeValue', minValue: min, maxValue: max, unitText },
  };
}

function buildJsonLd(token: string, job: JobDetail): Record<string, unknown> {
  const applyUrl = `${BOARD_ORIGIN}/jobs/role?token=${token}`;
  const datePosted = job.publishedAt ?? new Date().toISOString();

  // validThrough: 90 days from publish — we don't store expiry, this keeps listings from
  // appearing stale in Google's index. Republishing resets it naturally.
  const validThrough = new Date(
    new Date(datePosted).getTime() + 90 * 24 * 60 * 60 * 1000
  ).toISOString();

  const employmentTypeMap: Record<string, string> = {
    permanent: 'FULL_TIME',
    'full-time': 'FULL_TIME',
    full: 'FULL_TIME',
    'part-time': 'PART_TIME',
    part: 'PART_TIME',
    contract: 'CONTRACTOR',
    fixed: 'CONTRACTOR',
    casual: 'TEMPORARY',
    temp: 'TEMPORARY',
    intern: 'INTERN',
  };
  const empType = job.employmentType
    ? Object.entries(employmentTypeMap).find(([k]) =>
        job.employmentType!.toLowerCase().includes(k)
      )?.[1]
    : null;

  // Rich description: all candidate-facing sections concatenated. Google uses this for keyword
  // matching and display — more content = better coverage.
  const descParts: string[] = [];
  if (job.roleSummary) descParts.push(job.roleSummary);
  if (job.roleServiceRequirements) descParts.push(`Responsibilities:\n${job.roleServiceRequirements}`);
  if (job.experienceRequirements) descParts.push(`Experience:\n${job.experienceRequirements}`);
  if (job.licenceRequirements) descParts.push(`Licences & tickets:\n${job.licenceRequirements}`);
  if (job.screeningCompliance) descParts.push(`Screening & compliance:\n${job.screeningCompliance}`);
  if (job.benefits) descParts.push(`Benefits:\n${job.benefits}`);
  if (job.applicationInstructions) descParts.push(`How to apply:\n${job.applicationInstructions}`);
  const description = descParts.join('\n\n') || job.title || 'Open role';

  const isRemote = job.workArrangement
    ? /remote|anywhere|work from home/i.test(job.workArrangement)
    : false;

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title ?? 'Open role',
    description,
    datePosted,
    validThrough,
    directApply: true,
    url: applyUrl,
    identifier: { '@type': 'PropertyValue', name: 'Torren Technical', value: token },
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Torren Technical',
      sameAs: BOARD_ORIGIN,
    },
  };

  if (isRemote) {
    jsonLd.jobLocationType = 'TELECOMMUTE';
    jsonLd.applicantLocationRequirements = { '@type': 'Country', name: 'AU' };
  }
  jsonLd.jobLocation = {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      ...(job.location ? { addressLocality: job.location } : {}),
      addressCountry: 'AU',
    },
  };

  if (empType) jsonLd.employmentType = empType;

  const salary = parseSalary(job.salaryDisplay);
  if (salary) jsonLd.baseSalary = salary;

  if (job.requiredSkills?.length) jsonLd.skills = job.requiredSkills.join(', ');
  if (job.licenceRequirements) jsonLd.qualifications = job.licenceRequirements;
  if (job.roleServiceRequirements) jsonLd.responsibilities = job.roleServiceRequirements;
  if (job.experienceRequirements) jsonLd.experienceRequirements = job.experienceRequirements;
  if (job.benefits) jsonLd.jobBenefits = job.benefits;
  if (job.workArrangement) jsonLd.workHours = job.workArrangement;

  return jsonLd;
}

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

  // Inject Google for Jobs JSON-LD once job data is available.
  useEffect(() => {
    if (!job || !token) return;
    const id = 'torren-job-jsonld';
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.id = id;
      el.type = 'application/ld+json';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(buildJsonLd(token, job));
    document.title = `${job.title ?? 'Open role'} — Torren Technical`;
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [job, token]);

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

      {/* Apply CTA (top) — scrolls to the application form embedded below (R72-A). */}
      <div className="mt-8">
        <a href="#apply" className="btn-primary">
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
        <Block title="Benefits & perks" body={job.benefits} />
        <Block title="Shift & availability" body={job.shiftAvailability} />
        <Block title="Screening & compliance" body={job.screeningCompliance} />
        <Block title="How to apply" body={job.applicationInstructions} />
      </div>

      {/* Application form — candidates apply directly here (R72-A): the canonical candidate page on
          the brand domain, no redirect to the signing host. */}
      <ApplyForm token={token} roleTitle={job.title} />
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
