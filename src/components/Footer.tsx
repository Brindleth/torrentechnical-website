export default function Footer() {
  return (
    <footer className="relative border-t border-line-dark/60 bg-navy">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center border border-gold/50 bg-gold/10 font-display text-lg font-bold text-gold">
                T
              </span>
              <span className="font-display text-sm font-semibold text-white">
                Torren Technical
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/55">
              Permanent and client-direct contract technical recruitment across
              selected Australian markets — engineering, construction, electrical
              &amp; power, automation and technical trades.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-gold">
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                ['For Employers', '#engage'],
                ['For Candidates', '#engage'],
                ['Capabilities', '#capabilities'],
                ['Process', '#process'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-white/60 transition-colors hover:text-gold">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-gold">
              Engage
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#engage" className="text-white/60 transition-colors hover:text-gold">
                  Talk to our team →
                </a>
              </li>
              <li>
                <a href="#engage" className="text-white/60 transition-colors hover:text-gold">
                  Join the network →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 max-w-4xl border-t border-line-dark/60 pt-6 text-xs leading-relaxed text-white/45">
          Torren Technical currently operates only in selected Australian
          jurisdictions and only for permanent and client-direct contract
          recruitment. We do not provide labour hire, payroll, on-hire, or
          regulated/security-cleared recruitment services.
        </p>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/35 md:flex-row md:items-center">
          <span>© 2026 Torren Technical · ABN 74 102 574 831</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            Privacy Act 1988 · Spam Act 2003 compliant
          </span>
        </div>
      </div>
    </footer>
  );
}
