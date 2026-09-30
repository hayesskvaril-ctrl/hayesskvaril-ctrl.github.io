window.RL_SPEC = {
  title: 'Breach reporting: from awareness to report',
  label: 'Explainer · Compliance · Intermediate',
  section: 'Compliance', level: 'Intermediate',
  desc: 'Why the awareness date matters, the main reporting clocks, and how one event can trigger several regimes.',
  pages: ['/compliance/breach-reporting.html', '/risk-management/incident-and-breach-management.html', '/standards/asic-rg-78.html'],
  scenes: [
    { type: 'title', dur: 5, tag: 'EXPLAINER · COMPLIANCE · INTERMEDIATE', title: 'Breach reporting', subtitle: 'From awareness to report',
      visual: 'Title card: Breach reporting, from awareness to report.' },
    { type: 'statement', dur: 9, text: 'Reporting clocks run from awareness, not from certainty.', small: 'Record the date the organisation first became aware of the facts. Everything else counts from there.',
      caption: 'Most reporting deadlines start when the organisation becomes aware, not when the investigation is finished.',
      visual: 'A statement: reporting clocks run from awareness, not from certainty.' },
    { type: 'timeline', dur: 22, heading: 'Some of the main clocks (summary)', travel: true,
      items: [
        { pos: 0.03, h: 'Awareness', b: 'day 0: log it', tone: 'cyan', above: true, w: 170 },
        { pos: 0.24, h: '24 hours', b: 'APRA: critical operation disrupted outside tolerance (CPS 230)', tone: 'red', above: false, w: 250 },
        { pos: 0.45, h: '72 hours', b: 'APRA: material operational risk or information security incident', tone: 'amber', above: true, w: 250 },
        { pos: 0.63, h: '3 business days', b: 'AUSTRAC: suspicious matter report (24 hours for terrorism financing)', tone: 'violet', above: false, w: 250 },
        { pos: 0.95, h: '30 days', b: 'ASIC: reportable situations. OAIC: assess a suspected data breach', tone: 'blue', above: true, w: 250 }
      ],
      at: [0.6, 4.4, 8.4, 12.4, 16.4],
      captions: [[0, 'Different regimes run on different clocks. For APRA-regulated entities, some notifications fall due within 24 or 72 hours.'],
        [11.8, 'Suspicious matter reports to AUSTRAC are due within three business days, and ASIC reportable situations within 30 calendar days.']],
      visual: 'A timeline from awareness through 24 hours, 72 hours, 3 business days and 30 days, each labelled with the regime that applies. Scale is illustrative.' },
    { type: 'flow', dur: 14, heading: 'Is it a reportable situation for ASIC?', connector: 'arrow',
      items: [
        { h: 'Breach of a core obligation?', b: 'or a likely breach', tone: 'blue' },
        { h: 'Deemed significant?', b: 'serious offence, civil penalty, misleading conduct, material loss', tone: 'amber' },
        { h: 'Otherwise, weigh the factors', b: 'number, impact, adequacy of arrangements, loss', tone: 'violet' },
        { h: 'Report within 30 days', b: 'record the reasoning either way', tone: 'green' }
      ],
      caption: 'For AFS and credit licensees, a significant breach of a core obligation must be reported. Some breaches are automatically significant.',
      visual: 'A flow showing the steps to decide whether a breach is a reportable situation for ASIC.' },
    { type: 'statement', dur: 10, text: 'One event can trigger several regimes at once.', small: 'A cyber attack on a super fund might involve APRA, ASIC, the OAIC and affected members, each with its own test and deadline.',
      caption: 'Keep one tracker of every regime that might apply, its test, its deadline and who owns it. Record decisions not to report, too.',
      visual: 'A statement: one event can trigger several regimes at once.' },
    { type: 'end', dur: 6, page: 'Breach and incident reporting obligations', url: '/compliance/breach-reporting.html',
      visual: 'End card with the page title, web address and a general information disclaimer.' }
  ]
};
