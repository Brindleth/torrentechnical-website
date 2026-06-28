'use client';

// R72-A — Candidate application form, hosted on the public board's role page (the canonical
// candidate surface). Mirrors the ops apply form's questions and posts multipart to
// POST /public/jobs/:token/apply, which runs the existing AI intake + auto-match. Brand-matched to
// the marketing site (navy + gold). Candidates are never charged a fee.

import { useState } from 'react';
import { submitApplication } from '@/lib/jobs-api';

const FIELDS: Array<{ name: string; label: string; type?: string; placeholder?: string; required?: boolean }> = [
  { name: 'fullName', label: 'Full name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone' },
  { name: 'discipline', label: 'Discipline / trade', placeholder: 'e.g. Electrical Engineer' },
  { name: 'location', label: 'Location' },
  { name: 'workRights', label: 'Work rights', placeholder: 'e.g. Citizen / Visa' },
  { name: 'linkedInUrl', label: 'LinkedIn URL', type: 'url', placeholder: 'https://…' },
  { name: 'referralSource', label: 'How did you hear about us?' },
  { name: 'experience', label: 'Years of experience' },
  { name: 'employed', label: 'Currently employed?' },
  { name: 'noticePeriod', label: 'Notice period' },
  { name: 'salary', label: 'Salary / rate expectation' },
];

const inputClass =
  'w-full border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-gold/50';

export default function ApplyForm({ token, roleTitle }: { token: string; roleTitle: string | null }) {
  const [f, setF] = useState<Record<string, string>>({});
  const [cv, setCv] = useState<File | null>(null);
  const [docs, setDocs] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function set(name: string, value: string) {
    setF((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!consent) {
      setError('Please confirm you accept the privacy policy to apply.');
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      for (const [k, v] of Object.entries(f)) {
        if (v.trim() !== '') fd.append(k, v.trim());
      }
      fd.append('consentPrivacyPolicy', 'true');
      if (cv) fd.append('cv', cv);
      for (const d of docs) fd.append('documents', d);
      await submitApplication(token, fd);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div id="apply" className="glass corner-bracket mt-14 px-8 py-12 text-center">
        <h2 className="font-display text-2xl font-semibold text-white">Application received</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-white/60">
          Thanks for applying{roleTitle ? ` for ${roleTitle}` : ''}. Our team will review your details
          and be in touch if it&apos;s a fit. We never charge candidates a fee.
        </p>
      </div>
    );
  }

  return (
    <form
      id="apply"
      onSubmit={onSubmit}
      className="glass corner-bracket mt-14 scroll-mt-28 px-7 py-9 md:px-9"
    >
      <h2 className="font-display text-2xl font-semibold text-white">Apply for this role</h2>
      <p className="mt-2 text-sm text-white/55">
        Fields marked <span className="text-gold/90">*</span> are required. Your CV helps us assess
        your fit faster.
      </p>

      {error && (
        <div className="mt-5 border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <label key={field.name} className="block">
            <span className="mb-1.5 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/45">
              {field.label}
              {field.required && <span className="text-gold/90"> *</span>}
            </span>
            <input
              name={field.name}
              type={field.type ?? 'text'}
              required={field.required}
              value={f[field.name] ?? ''}
              onChange={(e) => set(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={inputClass}
            />
          </label>
        ))}
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/45">
          Work preferences
        </span>
        <textarea
          rows={2}
          value={f.workPreferences ?? ''}
          onChange={(e) => set('workPreferences', e.target.value)}
          placeholder="e.g. open to FIFO, day shift only…"
          className={inputClass}
        />
      </label>

      <label className="mt-4 block">
        <span className="mb-1.5 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/45">
          Why are you interested?
        </span>
        <textarea
          rows={3}
          value={f.motivation ?? ''}
          onChange={(e) => set('motivation', e.target.value)}
          className={inputClass}
        />
      </label>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/45">
            CV / résumé (PDF or Word)
          </span>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => setCv(e.target.files?.[0] ?? null)}
            className="block w-full text-xs text-white/60 file:mr-3 file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:font-medium file:text-white/80"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/45">
            Licences / tickets (optional)
          </span>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt,image/*"
            onChange={(e) => setDocs(Array.from(e.target.files ?? []))}
            className="block w-full text-xs text-white/60 file:mr-3 file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:font-medium file:text-white/80"
          />
        </label>
      </div>

      <label className="mt-6 flex items-start gap-2.5 text-sm text-white/60">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 accent-gold"
        />
        <span>
          I accept Torren Technical&apos;s privacy policy and consent to my details being processed
          for recruitment purposes. <span className="text-gold/90">*</span>
        </span>
      </label>

      <button type="submit" disabled={submitting} className="btn-primary mt-7 disabled:opacity-60">
        {submitting ? 'Submitting…' : 'Submit application'}
      </button>
      <p className="mt-3 text-center font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/35">
        Candidates are never charged a fee
      </p>
    </form>
  );
}
