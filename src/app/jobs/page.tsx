import type { Metadata } from 'next';
import Link from 'next/link';
import JobBoardClient from '@/components/jobs/JobBoardClient';

export const metadata: Metadata = {
  title: 'Open roles — technical careers across Australia',
  description:
    'Current engineering, construction and industrial trades roles sourced by Torren Technical. Technically vetted opportunities across Australia — no candidate-side fees.',
  alternates: { canonical: '/jobs' },
};

export default function JobsPage() {
  return (
    <main className="relative min-h-screen bg-navy-deep pb-28 pt-32 md:pt-40">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-navy/40 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1100px] px-6 md:px-10">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="spec-label">Open Roles · Australia</span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl">
            Technical roles, <span className="text-gold text-glow">vetted by people who know the work.</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/70">
            Every role here is sourced and screened by Torren Technical. We never charge
            candidates a cent — apply directly and we&apos;ll be in touch.
          </p>
        </div>

        {/* Board */}
        <div className="mt-14">
          <JobBoardClient />
        </div>

        {/* Fallback CTA */}
        <div className="mt-16 border-t border-line-dark/60 pt-10 text-center">
          <p className="text-sm text-white/60">
            Don&apos;t see the right role? Join the talent network and we&apos;ll reach out when it lands.
          </p>
          <Link href="/#engage" className="btn-ghost mt-5">
            Join the talent network
          </Link>
        </div>
      </div>
    </main>
  );
}
