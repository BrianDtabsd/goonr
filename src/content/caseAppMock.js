/** Mock data for case app page templates — replace with spine pipeline API. */

export const dashboardStats = {
  cases: 12,
  processes: 8,
  incidents: 3,
  pendingDecisions: 5,
};

export const recentCases = [
  { id: 'CASE-1778550668763', name: 'Zendaya', client: 'acme', status: 'in_progress' },
  { id: 'CASE-1778550123456', name: 'New Case Tester', client: 'acme', status: 'open' },
  { id: 'CASE-1778549988776', name: 'Clarke STD Review', client: 'northwind', status: 'pending_review' },
];

export const favoriteIncidents = [
  { id: 'INC-4421', label: 'Workplace injury — warehouse' },
  { id: 'INC-4398', label: 'Return to work — Clarke' },
  { id: 'INC-4312', label: 'Ergonomic assessment' },
];

export const analysisDefaults = {
  caseReference: 'CASE-1778550668763',
  decisionType: 'Return to Work',
  claimant: 'Zendaya Coleman',
  domain: 'Disability Management',
  decisionQuestion:
    'Based on current restrictions and employer accommodations, is a phased return to modified duties appropriate within the next 14 days?',
};

export const analysisArtifacts = [
  { name: 'Medical Report — Clarke_STD.pdf', type: 'PDF', size: '1.2 MB' },
  { name: 'Job Description — Warehouse Associate.pdf', type: 'PDF', size: '840 KB' },
];

export const caseDetail = {
  id: 'CASE-1778550668763',
  name: 'Zendaya',
  status: 'in_progress',
  badges: ['STD PLAN', 'ACTIVE COVERAGE', 'GRTW ACTIVE'],
  diagnosis: 'Left shoulder strain with limited overhead reach',
  icd10: 'S46.012A',
  personal: {
    dob: '1996-09-01',
    email: 'zendaya.c@example.com',
    address: '1420 King St W, Toronto, ON',
  },
  employment: {
    company: 'City Wok Enterprises',
    role: 'Warehouse Associate',
    joined: '2019-03-15',
  },
  claim: {
    approvedUntil: '2026-08-15',
    manager: 'Brian Onufrejow',
    status: 'Approved',
  },
  restrictions: [
    'No lifting above 5 kg',
    'Limited overhead reaching',
    'Avoid repetitive shoulder rotation',
    'Maximum 4 hours standing per shift',
  ],
  careTeam: [
    { role: 'Primary Physician', name: 'Dr. Beverly Crusher' },
    { role: 'Case Manager', name: 'Brian Onufrejow' },
    { role: 'Employer Contact', name: 'Eric Cartman' },
  ],
  comorbidities: [
    { label: 'Mild asthma', code: 'J45.909' },
    { label: 'Prior wrist sprain (2022)', code: 'S63.501A' },
  ],
  pendingDataPoints: 6,
};

export const advisorLog = [
  { time: '09:14', message: 'Document queue: 2 files' },
  { time: '09:14', message: 'Domain strategy loaded' },
  { time: '09:15', message: 'Extracting functional restrictions…' },
  { time: '09:15', message: 'Ready for analysis input' },
];
