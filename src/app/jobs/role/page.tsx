import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import JobDetailClient from '@/components/jobs/JobDetailClient';

export const metadata: Metadata = {
  title: 'Open role',
  description: 'A technical role sourced and screened by Torren Technical.',
};

export default function JobRolePage() {
  return (
    <main className="relative min-h-screen bg-navy-deep pb-28 pt-32 md:pt-40">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-navy/40 to-transparent" />

      <div className="relative mx-auto w-full max-w-[860px] px-6 md:px-10">
        <Link
          href="/jobs"
          className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-gold"
        >
          ← All roles
        </Link>

        <Suspense fallback={<div className="mt-10 h-40 opacity-0" />}>
          <JobDetailClient />
        </Suspense>
      </div>
    </main>
  );
}
