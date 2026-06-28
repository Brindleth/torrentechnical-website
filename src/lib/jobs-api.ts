// R64-B / R72-A — Public job board data layer.
//
// Reads the leak-safe public endpoints exposed by the Torren ops API (R64-A):
//   GET  /public/jobs                  — board listing (whitelisted card fields)
//   GET  /public/job-postings/:token   — single advert (whitelisted detail fields)
//   POST /public/jobs/:token/apply     — candidate application (multipart) → AI intake + auto-match
//
// No auth. The API only ever returns PUBLISHED postings and never exposes client identity,
// commercials, fees, or internal ids. R72-A: the application form is now hosted ON this board (the
// canonical candidate page) — it posts the application directly to the ops API instead of bouncing
// candidates to the sign. signing host.

const API_BASE =
  process.env.NEXT_PUBLIC_JOBS_API_BASE ?? 'https://intake.torrentechnical.com';

export interface JobCard {
  publicToken: string;
  title: string | null;
  location: string | null;
  workArrangement: string | null;
  employmentType: string | null;
  salaryDisplay: string | null;
  roleSummary: string | null;
  publishedAt: string | null;
}

export interface JobDetail {
  status: string;
  title: string | null;
  location: string | null;
  workArrangement: string | null;
  employmentType: string | null;
  salaryDisplay: string | null;
  roleSummary: string | null;
  roleServiceRequirements: string | null;
  requiredSkills: string[] | null;
  niceToHaveSkills: string[] | null;
  licenceRequirements: string | null;
  experienceRequirements: string | null;
  benefits: string | null;
  shiftAvailability: string | null;
  screeningCompliance: string | null;
  applicationInstructions: string | null;
  publishedAt: string | null;
}

export interface JobList {
  items: JobCard[];
  total: number;
  limit: number;
  offset: number;
}

// R72-A — Submit a candidate application for a specific published role. Multipart so a CV and
// supporting documents can be attached. Posts straight to the ops public API (same intake pipeline
// as the talent form: rate-limited, consent-gated, dedup, AI intake, auto-match). Never returns
// internal candidate ids. Throws on non-2xx so the form can surface a friendly message.
export async function submitApplication(token: string, form: FormData): Promise<void> {
  const res = await fetch(`${API_BASE}/public/jobs/${token}/apply`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) {
    let message = 'Something went wrong. Please try again.';
    try {
      const json = (await res.json()) as { error?: { message?: string } };
      if (json?.error?.message) message = json.error.message;
    } catch {
      /* non-JSON error body — keep the generic message */
    }
    throw new Error(message);
  }
}

export async function fetchJobs(limit = 60): Promise<JobList> {
  try {
    const res = await fetch(`${API_BASE}/public/jobs?limit=${limit}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return { items: [], total: 0, limit, offset: 0 };
    const json = (await res.json()) as { data: JobList };
    return json.data;
  } catch {
    return { items: [], total: 0, limit, offset: 0 };
  }
}

export async function fetchJob(token: string): Promise<JobDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/public/job-postings/${token}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data: JobDetail };
    return json.data;
  } catch {
    return null;
  }
}
