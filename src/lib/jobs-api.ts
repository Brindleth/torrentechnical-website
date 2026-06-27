// R64-B — Public job board data layer.
//
// Reads the leak-safe public endpoints exposed by the Torren ops API (R64-A):
//   GET /public/jobs                  — board listing (whitelisted card fields)
//   GET /public/job-postings/:token   — single advert (whitelisted detail fields)
//
// No auth. The API only ever returns PUBLISHED postings and never exposes client identity,
// commercials, fees, or internal ids. Apply links reuse the existing ops apply flow.

const API_BASE =
  process.env.NEXT_PUBLIC_JOBS_API_BASE ?? 'https://intake.torrentechnical.com';
const APPLY_BASE =
  process.env.NEXT_PUBLIC_APPLY_BASE ?? 'https://sign.torrentechnical.com';

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

// The candidate apply page lives on the ops public host (R52-A: <signHost>/apply/<token>).
export function applyUrl(token: string): string {
  return `${APPLY_BASE.replace(/\/$/, '')}/apply/${token}`;
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
