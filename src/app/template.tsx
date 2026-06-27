'use client';

// App Router re-mounts this template on every navigation, so the `.page-fade` animation
// replays each time — giving a slow fade/rise-in as you move between pages (e.g. home ⇄ /jobs).
// Honours prefers-reduced-motion (see globals.css).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-fade">{children}</div>;
}
