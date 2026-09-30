window.RL_SPEC = {
  title: 'Risk appetite: from board statement to daily decisions',
  label: 'Explainer · Risk management · Intermediate',
  section: 'Risk management', level: 'Intermediate',
  desc: 'Risk capacity, appetite, triggers and limits, and how appetite cascades into decisions and reporting.',
  pages: ['/risk-management/risk-appetite-and-tolerance.html', '/tools/example-risk-appetite-statement.html'],
  scenes: [
    { type: 'title', dur: 5, tag: 'EXPLAINER · RISK MANAGEMENT · INTERMEDIATE', title: 'Risk appetite', subtitle: 'From board statement to daily decisions',
      visual: 'Title card: Risk appetite, from board statement to daily decisions.' },
    { type: 'statement', dur: 8, text: 'How much risk are we prepared to take, and of what kinds?', small: 'The board answers this question in its risk appetite statement.',
      caption: 'Risk appetite is the board\'s answer to a simple question with hard consequences.',
      visual: 'A statement asking how much risk the organisation is prepared to take.' },
    { type: 'timeline', dur: 16, heading: 'Capacity, appetite, triggers and limits', travel: true,
      items: [
        { pos: 0.1, h: 'Within appetite', b: 'where the board wants risk to sit', tone: 'green', above: true },
        { pos: 0.4, h: 'Trigger (amber)', b: 'early warning: escalate and act', tone: 'amber', above: false },
        { pos: 0.66, h: 'Limit (red)', b: 'tolerance breached: report to the board', tone: 'red', above: true },
        { pos: 0.92, h: 'Risk capacity', b: 'the most the organisation could bear', tone: 'violet', above: false }
      ],
      captions: [[0, 'Picture a scale of increasing risk. Appetite is where the board wants risk to sit, well inside what it could survive.'],
        [7.5, 'A trigger gives early warning. A limit marks the tolerance the board has set. Capacity is the most the organisation could bear.']],
      visual: 'A horizontal scale with markers for within appetite, amber trigger, red limit and risk capacity.' },
    { type: 'stack', dur: 16, heading: 'The cascade', side: { down: 'cascade down', up: 'report up' },
      items: [
        { h: 'Board: risk appetite statement', b: 'attitudes to each risk and overall boundaries', tone: 'violet' },
        { h: 'Tolerances for each material risk', b: 'measurable, approved by the board', tone: 'blue' },
        { h: 'Business limits and KRIs', b: 'owned by management, with triggers', tone: 'cyan' },
        { h: 'Day-to-day decisions', b: 'products, projects, suppliers, investments', tone: 'green' }
      ],
      captions: [[0, 'Appetite only works if it cascades: from the board\'s statement to tolerances, business limits and key risk indicators.'],
        [8, 'And information has to flow back up, so the board can see whether the organisation is operating within appetite.']],
      visual: 'Four layers from the board statement down to day-to-day decisions, with arrows for cascading down and reporting up.' },
    { type: 'columns', dur: 12, heading: 'Common pitfalls',
      items: [
        { h: '“Zero appetite” for everything', tone: 'red', lines: ['Breached constantly, so it loses meaning', 'Separate “no appetite” from “minimise”'] },
        { h: 'Metrics that don\'t match', tone: 'amber', lines: ['Words say one thing, metrics measure another', 'Every statement needs a real measure'] },
        { h: 'No influence on decisions', tone: 'violet', lines: ['Can you name a decision appetite changed?', 'If not, it may be for show'] }
      ],
      caption: 'Watch for three pitfalls: “zero appetite” for unavoidable risks, metrics that don\'t match the words, and statements that change nothing.',
      visual: 'Three cards describe common risk appetite pitfalls.' },
    { type: 'end', dur: 6, page: 'Risk appetite and tolerance', url: '/risk-management/risk-appetite-and-tolerance.html',
      visual: 'End card with the page title, web address and a general information disclaimer.' }
  ]
};
