'use client';

import { useState, useEffect, type FormEvent, type ReactNode } from 'react';
import Reveal from '@/components/ui/Reveal';

/* Endpoints + field options mirror the original torrentechnical.com forms exactly. */
/* Employer enquiries now post to the Torren ops API (public, multipart) which creates a Job
   opportunity directly in the recruiter queue (source="employer_enquiry" — pale-red, pinned).
   The old n8n employer-enquiry webhook is retired. Field names below are the contract the ops
   endpoint validates: name, company, email, phone, role_title, location, discipline, urgency,
   model, budget, notes, consent. */
const EMPLOYER_WEBHOOK =
  'https://intake.torrentechnical.com/public/employer-enquiries';
/* Candidate intake now posts to the Torren ops API (public, multipart) which creates a
   CandidateApplication and promotes it to a Candidate. The old n8n candidate-registration
   webhook is retired (it was 500-ing and wrote to a table that no longer exists). */
const CANDIDATE_ENDPOINT =
  'https://intake.torrentechnical.com/public/candidate-applications';

const EMP_DISCIPLINES = [
  'Engineering',
  'Industrial Trades',
  'Construction & Site',
  'Property & Maintenance',
  'Mining & Resources',
  'Technology & Niche',
  'Other (mention in notes)',
];
const EMP_URGENCY = [
  'Immediate — start ASAP',
  'Within 4 weeks',
  'Within 8 weeks',
  'Planning ahead (3+ months)',
];
const EMP_MODEL = [
  'Contingent (pay on placement)',
  'Retained search',
  'Per-shortlist search',
  'Candidate sourcing',
  'Technical screening',
];
// R58-B: per-deliverable models also ask for a count on the public form. The label tells the
// employer what we're counting; the count is sent as `deliverable_count` to the ops intake.
const EMP_DELIVERABLE_LABEL: Record<string, string> = {
  'Per-shortlist search': 'Number of shortlists needed',
  'Candidate sourcing': 'Number of candidate profiles',
  'Technical screening': 'Number of screening sessions',
};

const WORK_AUTH = [
  'Citizen',
  'Permanent Resident',
  'Working Holiday',
  '482 / Sponsored',
  'Student Visa',
  'Other / Need sponsorship',
];
const YEARS = ['Less than 1 year', '1 year', '2 years', '3-5 years', '5-10 years', '10+ years'];
const EMPLOYED = [
  'Yes, looking passively',
  'Yes, actively looking',
  'No, available immediately',
  'No, available with notice',
];
const CAND_DISCIPLINES: { group: string; items: string[] }[] = [
  {
    group: 'Engineering & Technical',
    items: [
      'Electrical Engineering', 'Electronic Engineering', 'Software Engineering',
      'Embedded / Firmware Engineering', 'Test Engineering',
      'Mechanical / Mechatronics Engineering', 'Civil / Structural Engineering',
      'Chemical / Process Engineering', 'Aerospace Engineering',
      'Controls / Automation / PLC', 'Instrumentation Engineering',
      'RF / Microwave Engineering', 'Power Engineering', 'Mining Engineering',
      'Defence-cleared (NV1/NV2/PV)',
    ],
  },
  {
    group: 'Trades',
    items: [
      'Licensed Electrician', 'Plumbing / Gas Fitting', 'Industrial Mechanical Fitter',
      'Instrument Technician', 'HVAC / Refrigeration', 'Welding / Boilermaking',
      'Fabrication', 'Heavy Diesel Mechanic', 'Rigging', 'Field Service Technician',
    ],
  },
  {
    group: 'Construction & Site',
    items: [
      'Project Management (Construction)', 'Site Supervision / Foreman',
      'Formwork Carpentry', 'Concreting', 'Steelfixing', 'Scaffolding',
      'Painting / Plastering / Tiling',
      'Plant Operator (Crane/Excavator/Forklift)', 'Surveying',
    ],
  },
  {
    group: 'Mining & Resources',
    items: ['FIFO/DIDO Trades', 'Mining Operator', 'Maintenance Crew', 'Mining Field Service Technician'],
  },
  {
    group: 'Property & Maintenance',
    items: ['Property Maintenance / Handyperson', 'Building Maintenance', 'Grounds & Facilities', 'Cleaning', 'Multi-skilled Trades'],
  },
  {
    group: 'Other',
    items: ['Labouring / Trade Assistant', 'IT / Software Specialist', 'Other'],
  },
];

const LABEL = 'mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/60';
const FIELD =
  'w-full border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold/60';

export default function EngageSection() {
  const [tab, setTab] = useState<'employer' | 'talent'>('employer');
  // Navbar CTAs dispatch this event to scroll here AND pre-select the right tab:
  // "Talk to us" → employer, "Join network" → talent.
  useEffect(() => {
    const onTab = (e: Event) => {
      const detail = (e as CustomEvent<'employer' | 'talent'>).detail;
      if (detail === 'employer' || detail === 'talent') setTab(detail);
    };
    window.addEventListener('engage-tab', onTab);
    return () => window.removeEventListener('engage-tab', onTab);
  }, []);
  return (
    <section id="engage" className="relative overflow-hidden bg-navy-deep py-28 md:py-36">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 30%, rgba(201,169,97,0.12), transparent)' }}
      />
      <div className="relative mx-auto max-w-[920px] px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold/70" />
            <span className="spec-label">005 · Engage</span>
          </div>
          <Reveal
            as="h2"
            className="font-display text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Work with a technical team
            <br />
            <span className="text-gold text-glow">that reads the spec.</span>
          </Reveal>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
            Send us a brief, a position description or a rough scope and we will
            respond with an honest assessment — and a shortlist within five
            business days.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex border border-white/12 bg-white/[0.02] p-1">
            <TabButton active={tab === 'employer'} onClick={() => setTab('employer')}>
              For Employers
            </TabButton>
            <TabButton active={tab === 'talent'} onClick={() => setTab('talent')}>
              For Talent
            </TabButton>
          </div>
        </div>

        <div className="mt-10">
          {tab === 'employer' ? <EmployerForm /> : <CandidateForm />}
        </div>
      </div>
    </section>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] transition-colors ${
        active ? 'bg-gold text-navy-deep' : 'text-white/55 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

function useSubmit(action: string) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    try {
      const res = await fetch(action, { method: 'POST', body: new FormData(e.currentTarget) });
      setState(res.ok ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  }
  return { state, submit, reset: () => setState('idle') };
}

/* Candidate submit — maps the form's field names to what the ops intake endpoint expects
   (multipart): fullName, email, phone, location, workRights, experience, discipline, employed,
   noticePeriod, salary, cvText, cv (file), consentPrivacyPolicy="true". */
function useCandidateSubmit() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    try {
      const raw = new FormData(e.currentTarget);
      const str = (k: string) => {
        const v = raw.get(k);
        return typeof v === 'string' ? v.trim() : '';
      };
      const fd = new FormData();
      fd.set('fullName', `${str('first_name')} ${str('last_name')}`.trim());
      fd.set('email', str('email'));
      const rename: Record<string, string> = {
        phone: 'phone',
        location: 'location',
        work_auth: 'workRights',
        years_experience: 'experience',
        employed_status: 'employed',
        notice_period_weeks: 'noticePeriod',
        salary_expectation: 'salary',
        cv_text: 'cvText',
      };
      for (const [from, to] of Object.entries(rename)) {
        const v = str(from);
        if (v) fd.set(to, v);
      }
      const disc = str('discipline');
      const discOther = str('discipline_other');
      const finalDisc = disc === 'Other' && discOther ? discOther : disc;
      if (finalDisc) fd.set('discipline', finalDisc);
      const cv = raw.get('cv_file');
      if (cv instanceof File && cv.size > 0) fd.set('cv', cv);
      // Supporting documents (licences, qualifications, certificates) — repeatable "documents" field.
      for (const doc of raw.getAll('documents')) {
        if (doc instanceof File && doc.size > 0) fd.append('documents', doc);
      }
      if (raw.get('consent') === 'yes') fd.set('consentPrivacyPolicy', 'true');
      const res = await fetch(CANDIDATE_ENDPOINT, { method: 'POST', body: fd });
      setState(res.ok ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  }
  return { state, submit, reset: () => setState('idle') };
}

function Card({ children }: { children: ReactNode }) {
  return <Reveal className="glass corner-bracket p-7 md:p-10">{children}</Reveal>;
}

function Sent({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 border border-gold/30 bg-gold/5 p-5">
      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-gold text-gold">✓</span>
      <p className="font-mono text-sm text-gold">{children}</p>
    </div>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}

function Text({ name, label, type = 'text', required, placeholder, defaultValue, min, max }: {
  name: string; label: string; type?: string; required?: boolean; placeholder?: string; defaultValue?: string; min?: number; max?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className={LABEL}>{label}{required ? ' *' : ''}</label>
      <input id={name} name={name} type={type} required={required} placeholder={placeholder} defaultValue={defaultValue} min={min} max={max} className={FIELD} />
    </div>
  );
}

function Select({ name, label, required, children, placeholder = 'Select…' }: {
  name: string; label: string; required?: boolean; children: ReactNode; placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={LABEL}>{label}{required ? ' *' : ''}</label>
      <select id={name} name={name} required={required} defaultValue="" className={`${FIELD} appearance-none`}>
        <option value="">{placeholder}</option>
        {children}
      </select>
    </div>
  );
}

function Consent({ text }: { text: string }) {
  return (
    <label className="flex items-start gap-3 text-xs leading-relaxed text-white/55">
      <input type="checkbox" name="consent" value="yes" required className="mt-0.5 h-4 w-4 flex-none accent-gold" />
      <span>{text}</span>
    </label>
  );
}

function EmployerForm() {
  const { state, submit } = useSubmit(EMPLOYER_WEBHOOK);
  // R58-B: the chosen model drives which extra detail we ask for (e.g. a deliverable count).
  const [model, setModel] = useState('');
  const deliverableLabel = EMP_DELIVERABLE_LABEL[model];
  return (
    <Card>
      <h3 className="font-display text-2xl font-semibold text-white">Employer enquiry</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">Tell us about the role. We respond with an honest read and a sourcing plan.</p>
      {state === 'sent' ? (
        <div className="mt-7"><Sent>Enquiry received. We&apos;ll be in touch shortly.</Sent></div>
      ) : (
        <form className="mt-7 space-y-5" action={EMPLOYER_WEBHOOK} method="POST" onSubmit={submit}>
          <Row>
            <Text name="name" label="Your name" required />
            <Text name="company" label="Company" required />
          </Row>
          <Row>
            <Text name="email" label="Work email" type="email" required />
            <Text name="phone" label="Phone" type="tel" placeholder="+61 " />
          </Row>
          <Row>
            <Text name="role_title" label="Role title" required placeholder="e.g. Senior Test Engineer" />
            <Text name="location" label="Location" required placeholder="e.g. Perth WA, FIFO acceptable" />
          </Row>
          <Row>
            <Select name="discipline" label="Primary discipline" required>
              {EMP_DISCIPLINES.map((o) => <option key={o}>{o}</option>)}
            </Select>
            <Select name="urgency" label="Urgency" required>
              {EMP_URGENCY.map((o) => <option key={o}>{o}</option>)}
            </Select>
          </Row>
          <Row>
            <div>
              <label htmlFor="model" className={LABEL}>Preferred commercial model</label>
              <select id="model" name="model" value={model} onChange={(e) => setModel(e.target.value)} className={`${FIELD} appearance-none`}>
                <option value="">Not sure yet — advise</option>
                {EMP_MODEL.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <Text name="budget" label="Salary band (AUD)" placeholder="e.g. $120k–$140k + super" />
          </Row>
          {deliverableLabel && (
            <Row>
              <Text name="deliverable_count" label={deliverableLabel} type="number" placeholder="e.g. 4" />
              <div />
            </Row>
          )}
          <div>
            <label htmlFor="notes" className={LABEL}>Role details &amp; requirements *</label>
            <textarea id="notes" name="notes" rows={4} required className={`${FIELD} resize-none`} placeholder="Paste the JD, list key technical requirements, or describe the role and anything that matters (clearances, tickets, software, FIFO, etc.)." />
          </div>
          <Consent text="I consent to Torren Technical contacting me about this role and storing my details per the Privacy Act 1988. I understand I can request deletion at any time." />
          {state === 'error' && <p className="font-mono text-xs text-red-400">Something went wrong. Please try again or email contact@torrentechnical.com.</p>}
          <button type="submit" disabled={state === 'sending'} className="btn-primary w-full justify-center disabled:opacity-60">
            {state === 'sending' ? 'Sending…' : 'Send enquiry →'}
          </button>
        </form>
      )}
    </Card>
  );
}

function CandidateForm() {
  const { state, submit } = useCandidateSubmit();
  const [discipline, setDiscipline] = useState('');
  return (
    <Card>
      <h3 className="font-display text-2xl font-semibold text-white">Talent registration</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">Technically vetted only. Your details stay private — Privacy Act 1988 aligned.</p>
      {state === 'sent' ? (
        <div className="mt-7"><Sent>Registration received. We&apos;ll be in touch if there&apos;s a fit.</Sent></div>
      ) : (
        <form className="mt-7 space-y-5" action={CANDIDATE_ENDPOINT} method="POST" encType="multipart/form-data" onSubmit={submit}>
          <Row>
            <Text name="first_name" label="First name" required />
            <Text name="last_name" label="Last name" required />
          </Row>
          <Row>
            <Text name="email" label="Email" type="email" required />
            <Text name="phone" label="Phone (incl. country code)" type="tel" required placeholder="+61 4XX XXX XXX" defaultValue="+61 " />
          </Row>
          <Text name="location" label="Current location" required placeholder="e.g. Perth WA, willing to relocate" />
          <Row>
            <Select name="work_auth" label="Australian work authorisation" required>
              {WORK_AUTH.map((o) => <option key={o}>{o}</option>)}
            </Select>
            <Select name="years_experience" label="Years of experience" required>
              {YEARS.map((o) => <option key={o}>{o}</option>)}
            </Select>
          </Row>
          <div>
            <label htmlFor="discipline" className={LABEL}>Primary discipline *</label>
            <select id="discipline" name="discipline" required value={discipline} onChange={(e) => setDiscipline(e.target.value)} className={`${FIELD} appearance-none`}>
              <option value="">Select…</option>
              {CAND_DISCIPLINES.map((g) => (
                <optgroup key={g.group} label={g.group}>
                  {g.items.map((o) => <option key={o}>{o}</option>)}
                </optgroup>
              ))}
            </select>
          </div>
          {discipline === 'Other' && (
            <Text name="discipline_other" label='If "Other", please specify' placeholder="Your discipline" />
          )}
          <Row>
            <Select name="employed_status" label="Currently employed?" required>
              {EMPLOYED.map((o) => <option key={o}>{o}</option>)}
            </Select>
            <Text name="notice_period_weeks" label="Notice period (weeks)" type="number" required min={0} max={52} placeholder="0" />
          </Row>
          <Text name="salary_expectation" label="Salary expectation (AUD)" required placeholder="e.g. $130k base + super, or $850/day" />
          <div>
            <label htmlFor="cv_file" className={LABEL}>CV / Résumé (PDF or Word)</label>
            <input id="cv_file" name="cv_file" type="file" accept=".pdf,.doc,.docx,.txt,.rtf,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="w-full text-sm text-white/70 file:mr-4 file:border-0 file:bg-gold/15 file:px-4 file:py-2 file:font-mono file:text-[0.65rem] file:uppercase file:tracking-[0.18em] file:text-gold hover:file:bg-gold/25" />
          </div>
          <div>
            <label htmlFor="cv_text" className={LABEL}>Or paste your CV / résumé</label>
            <textarea id="cv_text" name="cv_text" rows={6} className={`${FIELD} resize-y`} placeholder="No file handy? Paste your CV or a summary of your experience, key projects and skills here — optional if you've attached a file above." />
          </div>
          <div>
            <label htmlFor="documents" className={LABEL}>Licences, qualifications &amp; certificates</label>
            <input id="documents" name="documents" type="file" multiple accept=".pdf,.doc,.docx,.txt,.rtf,.jpg,.jpeg,.png,.webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png,image/webp" className="w-full text-sm text-white/70 file:mr-4 file:border-0 file:bg-gold/15 file:px-4 file:py-2 file:font-mono file:text-[0.65rem] file:uppercase file:tracking-[0.18em] file:text-gold hover:file:bg-gold/25" />
            <p className="mt-1.5 font-mono text-[0.65rem] text-white/40">Optional — attach tickets, white cards, trade licences, degrees or other supporting documents. Select multiple files (up to 10).</p>
          </div>
          <Consent text="I consent to Torren Technical storing and processing my information per the Privacy Act 1988 and the Australian Privacy Principles, for the purpose of recruitment matching. I understand I can request deletion at any time." />
          {state === 'error' && <p className="font-mono text-xs text-red-400">Something went wrong. Please try again or email contact@torrentechnical.com.</p>}
          <button type="submit" disabled={state === 'sending'} className="btn-primary w-full justify-center disabled:opacity-60">
            {state === 'sending' ? 'Sending…' : 'Submit registration →'}
          </button>
        </form>
      )}
    </Card>
  );
}
