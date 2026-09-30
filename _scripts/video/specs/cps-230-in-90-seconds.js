window.RL_SPEC = {
  title: 'CPS 230 in 90 seconds',
  label: 'Explainer · Standards · Intermediate',
  section: 'Standards', level: 'Intermediate',
  desc: 'APRA\'s operational risk standard: operational risk management, business continuity and service providers.',
  pages: ['/standards/cps-230.html', '/risk-management/business-continuity.html', '/risk-management/operational-risk.html'],
  scenes: [
    { type: 'title', dur: 5, tag: 'EXPLAINER · STANDARDS · INTERMEDIATE', title: 'CPS 230 in 90 seconds', subtitle: 'APRA\'s Operational Risk Management standard',
      visual: 'Title card: CPS 230 in 90 seconds.' },
    { type: 'statement', dur: 8, text: 'In force since 1 July 2025 for banks, insurers and super trustees.', size: 38, small: 'Targeted amendments took effect on 1 July 2026.',
      caption: 'CPS 230 is APRA\'s cross-industry standard for operational risk. It replaced several older standards on continuity and outsourcing.',
      visual: 'A statement that CPS 230 has been in force since 1 July 2025.' },
    { type: 'columns', dur: 18, heading: 'Three pillars',
      items: [
        { h: 'Operational risk management', tone: 'blue', lines: ['Identify and assess operational risks', 'Design, monitor and test controls', 'Manage incidents and fix root causes'] },
        { h: 'Business continuity', tone: 'cyan', lines: ['Identify critical operations', 'Set tolerance levels for disruption', 'Plan, test and stay within tolerance'] },
        { h: 'Service providers', tone: 'violet', lines: ['Identify material service providers', 'Formal agreements with key terms', 'Monitor, including fourth parties'] }
      ],
      at: [0.6, 6.2, 11.8],
      captions: [[0, 'First, manage operational risk end to end: assess risks, maintain and test controls, and handle incidents.'],
        [6, 'Second, keep critical operations running through disruption, within tolerance levels approved by the board.'],
        [11.6, 'Third, manage the risks of relying on service providers, including the providers they rely on.']],
      visual: 'Three cards: operational risk management, business continuity and service providers.' },
    { type: 'flow', dur: 14, heading: 'Tolerance levels for each critical operation', connector: 'plus',
      items: [
        { h: 'Maximum disruption', b: 'how long it can be down', tone: 'red' },
        { h: 'Maximum data loss', b: 'how much data can be lost', tone: 'amber' },
        { h: 'Minimum service', b: 'what must still happen under alternative arrangements', tone: 'green' }
      ],
      caption: 'For each critical operation, the board approves tolerance levels: maximum disruption, maximum data loss and minimum service levels.',
      visual: 'Three cards combine into tolerance levels: maximum disruption, maximum data loss and minimum service levels.' },
    { type: 'timeline', dur: 14, heading: 'Telling APRA', travel: true,
      items: [
        { pos: 0.08, h: 'Event', b: 'incident or disruption', tone: 'cyan', above: true, w: 180 },
        { pos: 0.35, h: '24 hours', b: 'critical operation disrupted outside tolerance', tone: 'red', above: false, w: 240 },
        { pos: 0.62, h: '72 hours', b: 'material operational risk incident', tone: 'amber', above: true, w: 240 },
        { pos: 0.92, h: '20 business days', b: 'after entering or materially changing a material arrangement', tone: 'violet', above: false, w: 240 }
      ],
      caption: 'APRA must be told within 24 hours of a disruption outside tolerance, and within 72 hours of a material operational risk incident.',
      visual: 'A timeline of CPS 230 notifications: 24 hours, 72 hours and 20 business days.' },
    { type: 'statement', dur: 8, text: 'The board is ultimately accountable.', small: 'It approves the framework and tolerance levels, and oversees how operational risk is managed.',
      caption: 'Accountability sits with the board and senior management, not with the service provider or the risk team.',
      visual: 'A statement: the board is ultimately accountable.' },
    { type: 'end', dur: 6, page: 'CPS 230 Operational Risk Management', url: '/standards/cps-230.html',
      visual: 'End card with the page title, web address and a general information disclaimer.' }
  ]
};
