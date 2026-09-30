window.RL_SPEC = {
  title: 'Remediation: putting people back',
  label: 'Explainer · Compliance · Intermediate',
  section: 'Compliance', level: 'Intermediate',
  desc: 'The six stages of consumer remediation under ASIC RG 277, and the principles behind them.',
  pages: ['/standards/asic-rg-277.html', '/compliance/remediation-calculations.html', '/tools/remediation-program-tracker.html'],
  scenes: [
    { type: 'title', dur: 5, tag: 'EXPLAINER · COMPLIANCE · INTERMEDIATE', title: 'Remediation', subtitle: 'Putting people back where they should be',
      visual: 'Title card: Remediation, putting people back where they should be.' },
    { type: 'statement', dur: 9, text: 'Return people to the position they would have been in.', small: 'Including the time value of money: interest or lost investment earnings.',
      caption: 'When conduct causes loss, ASIC\'s guidance in RG 277 expects licensees to put affected people back where they would have been.',
      visual: 'A statement: return people to the position they would have been in.' },
    { type: 'flow', dur: 22, heading: 'Six stages', connector: 'arrow', gap: 30,
      items: [
        { h: '1. Identify', b: 'start promptly', tone: 'cyan' },
        { h: '2. Scope', b: 'everyone who may be affected', tone: 'blue' },
        { h: '3. Calculate', b: 'loss plus time value', tone: 'blue' },
        { h: '4. Tell', b: 'clear, accessible letters', tone: 'violet' },
        { h: '5. Pay', b: 'reasonable efforts to find people', tone: 'green' },
        { h: '6. Close', b: 'fix the root cause', tone: 'green' }
      ],
      captions: [[0, 'Start as soon as there are reasonable grounds to suspect loss. Don\'t wait for complaints or the regulator.'],
        [7.5, 'Scope in everyone who was or may have been affected. Where data is missing, use assumptions that favour consumers.'],
        [15, 'Communicate clearly, pay people, and close only when the cause is fixed and payments are checked.']],
      visual: 'Six stages in a row: identify, scope, calculate, tell, pay and close.' },
    { type: 'columns', dur: 13, heading: 'Principles that run throughout',
      items: [
        { h: 'Beneficial assumptions', tone: 'green', lines: ['Uncertainty shouldn\'t fall on the people harmed'] },
        { h: 'Free and easy', tone: 'blue', lines: ['No cost to consumers, and as little effort as possible'] },
        { h: 'Governance', tone: 'violet', lines: ['Board and senior oversight, records, quality assurance'] }
      ],
      caption: 'Three principles apply throughout: beneficial assumptions, making it free and easy, and strong governance.',
      visual: 'Three cards: beneficial assumptions, free and easy, governance.' },
    { type: 'statement', dur: 8, text: 'Former customers owed $5 or less, and money that can\'t be returned', size: 34, small: 'RG 277 sets out options for residual amounts, within conditions.',
      caption: 'RG 277 also covers small amounts owed to former customers and money that can\'t be returned.',
      visual: 'A statement about residual amounts under RG 277.' },
    { type: 'end', dur: 6, page: 'RG 277 Consumer remediation', url: '/standards/asic-rg-277.html',
      visual: 'End card with the page title, web address and a general information disclaimer.' }
  ]
};
