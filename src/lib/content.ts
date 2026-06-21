export const NAV_LINKS = [
  { label: 'Disciplines', href: '#capabilities' },
  { label: 'How we work', href: '#process' },
  { label: 'Standards', href: '#authority' },
  { label: 'Why Torren', href: '#why' },
  { label: 'Contact', href: '#engage' },
] as const;

export const HERO_STATS = [
  { num: 'AU', label: 'Australia-wide' },
  { num: '7', label: 'Technical disciplines' },
  { num: '100%', label: 'Technically vetted' },
  { num: '0%', label: 'Candidate-side fees' },
] as const;

/** 001 · Capabilities — disciplines across engineering, construction & trades */
export const CAPABILITIES = [
  {
    id: 'electronics-embedded',
    index: '01',
    icon: '⚙',
    title: 'Electronics & Embedded',
    summary:
      'Electronic test engineering, RF and microwave, embedded firmware, defence electronics, signal processing, instrumentation, hardware-in-the-loop test rigs.',
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
    id: 'defence-aerospace',
    index: '03',
    icon: '▣',
    title: 'Defence & Aerospace',
    summary:
      'NV1/NV2/PV-cleared roles, sovereign capability programs, mission systems, avionics, ground systems, hardware/software integration in regulated environments.',
    tags: ['NV1 / NV2 / PV', 'Mission Systems', 'Avionics', 'Sovereign'],
  },
  {
    id: 'electrical-power',
    index: '04',
    icon: '⚡',
    title: 'Electrical & Power',
    summary:
      'High-voltage engineering, protection & control, renewables integration, substation design, industrial power systems, energy infrastructure.',
    tags: ['HV', 'Protection & Control', 'Substation', 'Renewables'],
  },
  {
    id: 'construction-infrastructure',
    index: '05',
    icon: '⬡',
    title: 'Construction & Infrastructure',
    summary:
      'Civil and structural, project and site engineering, project managers, site supervisors and managers, building services, commissioning and major infrastructure delivery.',
    tags: ['Civil / Structural', 'Project Mgmt', 'Site Supervision', 'Commissioning'],
  },
  {
    id: 'software-industry',
    index: '06',
    icon: '◈',
    title: 'Software for Industry',
    summary:
      'Embedded C/C++ and Rust, real-time systems, Linux/RTOS, MATLAB/Simulink, model-based design, control software, industrial IoT and edge.',
    tags: ['C/C++ / Rust', 'RTOS', 'Simulink', 'Industrial IoT'],
  },
  {
    id: 'industrial-trades',
    index: '07',
    icon: '⬢',
    title: 'Industrial Trades',
    summary:
      'Licensed industrial electricians, instrument technicians, mechanical fitters, HVAC, welders & boilermakers, heavy diesel — tickets and clearances verified.',
    tags: ['Instrumentation', 'Fitters', 'HVAC', 'Tickets Verified'],
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
    body: 'Each candidate is assessed by a technical screener against the real requirements — software, tooling, clearances, tickets and domain depth — before they reach you.',
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

/** Approximate normalised coordinates of Australian industry hubs (0–1 space). */
export const INDUSTRY_NODES = [
  { name: 'Perth', sector: 'Resources', x: 0.16, y: 0.62 },
  { name: 'Adelaide', sector: 'Defence', x: 0.6, y: 0.78 },
  { name: 'Melbourne', sector: 'Construction', x: 0.72, y: 0.86 },
  { name: 'Sydney', sector: 'Infrastructure', x: 0.82, y: 0.66 },
  { name: 'Brisbane', sector: 'Aerospace', x: 0.86, y: 0.46 },
  { name: 'Newcastle', sector: 'Energy', x: 0.84, y: 0.6 },
  { name: 'Pilbara', sector: 'Resources', x: 0.26, y: 0.34 },
  { name: 'Darwin', sector: 'Defence', x: 0.5, y: 0.12 },
  { name: 'Gladstone', sector: 'Power', x: 0.84, y: 0.4 },
  { name: 'Geelong', sector: 'Automation', x: 0.7, y: 0.9 },
] as const;

export const NETWORK_SECTORS = [
  'Defence',
  'Resources',
  'Power',
  'Construction',
  'Automation',
  'Manufacturing',
  'Infrastructure',
  'Energy',
] as const;
