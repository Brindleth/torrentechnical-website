export const NAV_LINKS = [
  { label: 'Disciplines', href: '#capabilities' },
  { label: 'How we work', href: '#process' },
  { label: 'Standards', href: '#authority' },
  { label: 'Why Torren', href: '#why' },
  { label: 'Open Roles', href: '/jobs' },
  { label: 'Contact', href: '#engage' },
] as const;

/** Australian jurisdictions we currently service. VIC and QLD are permanent and
 *  client-direct contract recruitment only (no labour hire / on-hire). WA and SA
 *  are deliberately excluded. Single source of truth for coverage copy. */
export const SERVICE_LOCATIONS = [
  'New South Wales',
  'Victoria',
  'Queensland',
  'Tasmania',
  'Northern Territory',
  'Australian Capital Territory',
] as const;

export const COVERAGE_NOTE =
  'We currently place into NSW, VIC, QLD, TAS, NT and ACT — for permanent and client-direct contract roles only.';

/** Standard positioning line — keep in sync with the footer compliance note. */
export const POSITIONING_STATEMENT =
  'We specialise in permanent recruitment and client-direct contract recruitment across selected Australian markets. We do not provide labour hire, payroll, on-hire, or worker supply services.';

export const COMPLIANCE_NOTE =
  'Torren Technical currently operates only in selected Australian jurisdictions and only for permanent and client-direct contract recruitment. We do not provide labour hire, payroll, on-hire, or regulated/security-cleared recruitment services.';

export const HERO_STATS = [
  { num: '6', label: 'Selected AU markets' },
  { num: '6', label: 'Technical disciplines' },
  { num: '100%', label: 'Technically vetted' },
  { num: '0%', label: 'Candidate-side fees' },
] as const;

/** 001 · Capabilities — disciplines across engineering, construction & technical trades.
 *  Scope is permanent and client-direct contract recruitment only — no labour hire,
 *  on-hire, payroll or regulated/security-cleared placement. */
export const CAPABILITIES = [
  {
    id: 'electronics-embedded',
    index: '01',
    icon: '⚙',
    title: 'Electronics & Embedded',
    summary:
      'Electronic test engineering, RF and microwave, embedded firmware, signal processing, instrumentation and hardware-in-the-loop test rigs.',
    tags: ['RF / Microwave', 'Firmware', 'Signal Processing', 'HIL'],
  },
  {
    id: 'automation-controls',
    index: '02',
    icon: '⌬',
    title: 'Automation & Controls',
    summary:
      'PLC and SCADA, industrial controls, process automation, robotics, mechatronics, functional safety, IEC 61131-3 and IEC 61508 environments.',
    tags: ['PLC / SCADA', 'Robotics', 'IEC 61508', 'Mechatronics'],
  },
  {
    id: 'electrical-power',
    index: '03',
    icon: '⚡',
    title: 'Electrical & Power',
    summary:
      'High-voltage engineering, protection & control, renewables integration, substation design, industrial power systems, energy infrastructure.',
    tags: ['HV', 'Protection & Control', 'Substation', 'Renewables'],
  },
  {
    id: 'construction-infrastructure',
    index: '04',
    icon: '⬡',
    title: 'Construction & Infrastructure',
    summary:
      'Civil and structural, project and site engineering, project managers, site supervisors and managers, building services, commissioning and major infrastructure delivery.',
    tags: ['Civil / Structural', 'Project Mgmt', 'Site Supervision', 'Commissioning'],
  },
  {
    id: 'software-industry',
    index: '05',
    icon: '◈',
    title: 'Software for Industry',
    summary:
      'Embedded C/C++ and Rust, real-time systems, Linux/RTOS, MATLAB/Simulink, model-based design, control software, industrial IoT and edge.',
    tags: ['C/C++ / Rust', 'RTOS', 'Simulink', 'Industrial IoT'],
  },
  {
    id: 'industrial-trades',
    index: '06',
    icon: '⬢',
    title: 'Technical Trades',
    summary:
      'Industrial electricians, instrument technicians, mechanical fitters, HVAC, welders & boilermakers and heavy diesel — experience and qualifications verified for permanent and contract placement.',
    tags: ['Instrumentation', 'Fitters', 'HVAC', 'Qualified'],
  },
] as const;

/** 002 · Process — how we work, end to end */
export const PROCESS_STAGES = [
  {
    id: 1,
    code: '01',
    title: 'Contact & Brief',
    body: 'You reach a recruiter directly — not a call centre. We take the technical brief, scope or position description and confirm the must-haves before any sourcing begins.',
  },
  {
    id: 2,
    code: '02',
    title: 'Recruiter Sourcing',
    body: 'Your recruiter sources against the specification across our network, targeting people who genuinely match the criteria — not keyword hits.',
  },
  {
    id: 3,
    code: '03',
    title: 'Technical Screening',
    body: 'Each candidate is assessed by a technical screener against the real requirements — software, tooling, qualifications and domain depth — before they reach you.',
  },
  {
    id: 4,
    code: '04',
    title: 'Shortlist Within Five Days',
    body: 'You receive a structured shortlist with technical write-ups within five business days of the brief: fit, rate, availability, work rights and any known risks.',
  },
  {
    id: 5,
    code: '05',
    title: 'Coordination & Support',
    body: 'We coordinate interviews, technical testing and offers, and stay involved through to the start date — then maintain a pipeline for ongoing requirements.',
  },
] as const;

/** 003 · Technical authority — credentials strip */
export const CREDENTIALS = [
  { num: 'UK · AU', label: 'Industry-trained leadership' },
  { num: 'PA88', label: 'Privacy Act 1988 compliant' },
  { num: 'SA03', label: 'Spam Act 2003 compliant' },
  { num: '0%', label: 'Candidate-side fees' },
] as const;

/** 004 · Why Torren Technical — feature list */
export const WHY_FEATURES = [
  {
    title: 'Spec-driven approach.',
    body: 'Every engagement starts from the specification, not a job title.',
  },
  {
    title: 'Technically vetted.',
    body: 'Everyone is screened against the real criteria before submission.',
  },
  {
    title: 'Focused shortlists.',
    body: 'Shortlists are sized to the role and never padded.',
  },
  {
    title: 'Transparent pricing.',
    body: 'Retainer, per-shortlist or contingent — clear terms agreed up front.',
  },
  {
    title: 'Discreet by default.',
    body: 'No mass CV distribution and no public listings without your agreement.',
  },
  {
    title: 'Honest assessment.',
    body: 'If we are not the right fit for a role, we tell you up front.',
  },
] as const;
