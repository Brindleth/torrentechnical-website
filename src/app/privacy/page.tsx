import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Torren Technical collects, uses, discloses and protects your personal information, consistent with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = '12 July 2026';
const VERSION = 'v1.2';

interface Section {
  id: string;
  heading: string;
  body: React.ReactNode;
}

const sections: Section[] = [
  {
    id: 'introduction',
    heading: 'Introduction',
    body: (
      <>
        <p>
          This Privacy Policy explains how Torren Technical — Matthew Luke Brindle
          (sole trader), ABN&nbsp;74&nbsp;102&nbsp;574&nbsp;831 (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, discloses
          and protects personal information, consistent with the{' '}
          <em>Privacy Act 1988</em> (Cth) and the Australian Privacy
          Principles (APPs).
        </p>
        <p className="mt-4">
          It applies to candidates, clients, contractors, employees, website
          visitors and other individuals we deal with in the course of
          providing our technical recruitment services.
        </p>
      </>
    ),
  },
  {
    id: 'what-we-collect',
    heading: '1. The information we collect',
    body: (
      <ul className="mt-2 space-y-3">
        <li className="flex gap-3">
          <span className="mt-0.5 shrink-0 text-gold">—</span>
          <span>
            <strong className="text-white">Candidates:</strong> name and
            contact details, work history, resumes, qualifications, references,
            identity and work-rights documents, and (with consent and where
            necessary) sensitive information such as health or adjustment needs
            and criminal-history checks.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="mt-0.5 shrink-0 text-gold">—</span>
          <span>
            <strong className="text-white">Clients:</strong> business contact
            details and information needed to provide recruitment services.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="mt-0.5 shrink-0 text-gold">—</span>
          <span>
            <strong className="text-white">
              Workers (employees, contractors, freelancers):
            </strong>{' '}
            details needed to engage and pay you, including tax, banking and
            compliance information.
          </span>
        </li>
      </ul>
    ),
  },
  {
    id: 'how-we-collect',
    heading: '2. How we collect it',
    body: (
      <p>
        We collect personal information directly from you — for example when you
        apply for a role, register your details, contact us through our website
        or engage us — and sometimes from third parties such as referees,
        background-check providers, job boards and our sourcing partners. Where
        we collect personal information from a third party, we take reasonable
        steps to ensure you are made aware of this Policy.
      </p>
    ),
  },
  {
    id: 'why-we-use-it',
    heading: '3. Why we use it',
    body: (
      <p>
        We use personal information to provide recruitment services: to assess
        candidate suitability, present candidates to clients, conduct reference
        and background checks (with consent), manage placements, meet our legal
        obligations, and — where you agree — keep you in our talent pool for
        future opportunities. We do not use personal information for unrelated
        purposes without your consent.
      </p>
    ),
  },
  {
    id: 'automated-tools',
    heading: '4. Automated tools and AI',
    body: (
      <p>
        We may use AI-assisted or automated tools to help source, screen or rank
        candidates. A human reviews any decision that significantly affects you,
        and we can explain in general terms how such tools are used. You may
        contact us to ask about our use of automated screening tools.
      </p>
    ),
  },
  {
    id: 'disclosure',
    heading: '5. Disclosure',
    body: (
      <p>
        We disclose personal information to clients (for placement purposes,
        with your awareness), to referees and background-check providers you
        have consented to, to our service providers (such as our applicant
        tracking and IT systems), and where required or authorised by law. We
        do not sell personal information.
      </p>
    ),
  },
  {
    id: 'overseas',
    heading: '6. Overseas disclosure (APP 8)',
    body: (
      <p>
        We may disclose personal information to, or store it with, recipients
        outside Australia — including sourcing contractors and technology
        providers located in countries such as the Philippines and India.
        Before doing so we take reasonable steps to ensure the recipient
        handles the information consistently with the APPs, and we remain
        accountable for that information under the{' '}
        <em>Privacy Act</em>.
      </p>
    ),
  },
  {
    id: 'security',
    heading: '7. Security',
    body: (
      <p>
        We hold personal information in access-controlled systems and take
        reasonable steps to protect it from misuse, loss and unauthorised
        access, modification or disclosure. We destroy or de-identify personal
        information when it is no longer needed for the purpose for which it was
        collected, consistent with our Data Retention &amp; Destruction Schedule.
      </p>
    ),
  },
  {
    id: 'access-correction',
    heading: '8. Access, correction and complaints',
    body: (
      <>
        <p>
          You may ask us for access to, or correction of, your personal
          information, and we will respond within a reasonable time in
          accordance with the APPs. We do not charge for access requests.
        </p>
        <p className="mt-4">
          If you have a privacy complaint, please contact our privacy officer
          (details below). We will acknowledge your complaint promptly and
          respond within 30 days. If you are not satisfied with our response,
          you may escalate your complaint to the Office of the Australian
          Information Commissioner (OAIC) at{' '}
          <a
            href="https://www.oaic.gov.au"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold underline-offset-4 transition-colors hover:text-gold-light hover:underline"
          >
            oaic.gov.au
          </a>{' '}
          or by calling 1300&nbsp;363&nbsp;992.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    heading: '9. Contact and updates',
    body: (
      <>
        <p>
          Privacy enquiries and requests should be directed to our privacy
          officer:
        </p>
        <div className="mt-5 border-l-2 border-gold/40 pl-5 text-white/80">
          <p className="font-display font-semibold text-white">
            Privacy Officer — Torren Technical
          </p>
          <p className="mt-1">21 Goddard Street, Lathlain, Perth WA 6125</p>
          <p className="mt-1">
            <a
              href="mailto:info@torrentechnical.com"
              className="text-gold underline-offset-4 transition-colors hover:text-gold-light hover:underline"
            >
              info@torrentechnical.com
            </a>
          </p>
        </div>
        <p className="mt-5">
          We may update this Policy from time to time to reflect changes in our
          practices or the law. The current version is always available on this
          page. Material changes will be notified to affected individuals where
          practicable.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-navy-deep pb-28 pt-32 md:pt-40">
      {/* Background grid */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
      {/* Top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-navy/40 to-transparent" />

      <div className="relative mx-auto w-full max-w-[860px] px-6 md:px-10">
        {/* Header */}
        <div>
          <span className="spec-label">Legal · Privacy</span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/70">
            Effective {EFFECTIVE_DATE} &middot; {VERSION}
          </p>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px bg-gradient-to-r from-gold/40 via-gold/20 to-transparent" />

        {/* Sections */}
        <div className="mt-10 space-y-12">
          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="font-display text-xl font-semibold text-white">
                {s.heading}
              </h2>
              <div className="mt-3 text-sm leading-relaxed text-white/70">
                {s.body}
              </div>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 border-t border-line-dark/60 pt-8">
          <p className="text-xs leading-relaxed text-white/40">
            This Policy is issued by Torren Technical — Matthew Luke Brindle
            (sole trader), ABN&nbsp;74&nbsp;102&nbsp;574&nbsp;831. It operates
            alongside our Candidate Collection Notice (APP&nbsp;5) and our
            internal Data Retention &amp; Destruction Schedule (APP&nbsp;11).
            Where those documents address the same matter, the more specific
            document applies.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-gold"
            >
              ← Back to home
            </Link>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/35">
              © 2026 Torren Technical · ABN&nbsp;74&nbsp;102&nbsp;574&nbsp;831
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
