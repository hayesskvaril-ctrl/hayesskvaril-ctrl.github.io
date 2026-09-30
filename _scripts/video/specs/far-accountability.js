window.RL_SPEC = {
  title: 'FAR: who is accountable for what',
  label: 'Explainer · Governance · Intermediate',
  section: 'Governance', level: 'Intermediate',
  desc: 'The Financial Accountability Regime: accountable persons, statements and maps, obligations and deferred pay.',
  pages: ['/governance/financial-accountability-regime.html', '/governance/reasonable-steps-and-consequence-management.html'],
  scenes: [
    { type: 'title', dur: 5, tag: 'EXPLAINER · GOVERNANCE · INTERMEDIATE', title: 'The Financial Accountability Regime', subtitle: 'Who is accountable for what',
      visual: 'Title card: The Financial Accountability Regime. Who is accountable for what.' },
    { type: 'statement', dur: 9, text: 'For every significant part of the business, a named senior person who is accountable.', size: 36,
      small: 'Banks since 15 March 2024. Insurers and super trustees since 15 March 2025.',
      caption: 'After the Royal Commission, it was often hard to say who was responsible when things went wrong. FAR addresses that.',
      visual: 'A statement: for every significant part of the business, a named senior person who is accountable.' },
    { type: 'flow', dur: 15, heading: 'The building blocks', connector: 'arrow',
      items: [
        { h: 'Accountable persons', b: 'directors and senior executives, registered with the regulators', tone: 'violet' },
        { h: 'Accountability statements', b: 'each person\'s specific responsibilities', tone: 'blue' },
        { h: 'Accountability map', b: 'who is accountable for what, across the entity', tone: 'cyan' }
      ],
      caption: 'Each accountable person has a statement of their responsibilities, and the entity keeps a map showing who holds what.',
      visual: 'Three linked cards: accountable persons, accountability statements and the accountability map.' },
    { type: 'columns', dur: 15, heading: 'What accountable persons must do',
      items: [
        { h: 'Act properly', tone: 'blue', lines: ['With honesty and integrity', 'With due skill, care and diligence'] },
        { h: 'Deal openly', tone: 'cyan', lines: ['With APRA and ASIC, in an open, constructive and cooperative way'] },
        { h: 'Take reasonable steps', tone: 'violet', lines: ['To prevent matters that would harm the entity\'s prudential standing or reputation'] }
      ],
      caption: 'Accountable persons must act with honesty, integrity and care, deal openly with the regulators, and take reasonable steps.',
      visual: 'Three cards list the obligations of accountable persons.' },
    { type: 'statement', dur: 9, text: 'At least 40% of variable pay deferred for at least four years.', size: 38, small: 'And reduced where the person has failed to meet their obligations.',
      caption: 'Consequences are real: deferred pay can be reduced, and regulators can disqualify accountable persons.',
      visual: 'A statement about deferred remuneration under FAR.' },
    { type: 'end', dur: 6, page: 'Financial Accountability Regime', url: '/governance/financial-accountability-regime.html',
      visual: 'End card with the page title, web address and a general information disclaimer.' }
  ]
};
