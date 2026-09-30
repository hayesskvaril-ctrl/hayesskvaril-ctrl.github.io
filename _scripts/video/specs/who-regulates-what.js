window.RL_SPEC = {
  title: 'Who regulates what in Australia',
  label: 'Explainer · Foundations · Beginner',
  section: 'Foundations', level: 'Beginner',
  desc: 'Australia\'s twin peaks model, and the other regulators that cut across financial services.',
  pages: ['/foundations/regulatory-landscape.html', '/standards/'],
  scenes: [
    { type: 'title', dur: 5, tag: 'EXPLAINER · FOUNDATIONS · BEGINNER', title: 'Who regulates what in Australia', subtitle: 'Twin peaks, and the regulators that cut across',
      visual: 'Title card: Who regulates what in Australia.' },
    { type: 'flow', dur: 9, heading: 'Where the rules come from', connector: 'arrow',
      items: [
        { h: 'Parliament', b: 'Makes the laws', tone: 'violet' },
        { h: 'Treasury', b: 'Advises the government on policy', tone: 'grey' },
        { h: 'Regulators', b: 'Make detailed rules, supervise and enforce', tone: 'cyan' },
        { h: 'Courts and AFCA', b: 'Decide disputes and interpret the law', tone: 'blue' }
      ],
      caption: 'Parliament makes the laws. Regulators administer and enforce them, often by making more detailed rules and guidance.',
      visual: 'A flow from Parliament to Treasury to regulators to courts and AFCA.' },
    { type: 'columns', dur: 16, heading: 'The twin peaks',
      items: [
        { h: 'APRA: financial soundness', tone: 'blue', lines: ['Prudential regulator', 'Banks and other ADIs, insurers, and super funds (not SMSFs)', 'Sets prudential standards such as CPS 220 and CPS 230'] },
        { h: 'ASIC: conduct and disclosure', tone: 'cyan', lines: ['Conduct regulator', 'Companies, markets, financial services and consumer credit', 'Licensing, disclosure, breach reporting, enforcement'] }
      ],
      captions: [[0, 'Financial services use a twin peaks model. APRA looks after the financial soundness of banks, insurers and super funds.'],
        [7.5, 'ASIC looks after conduct and disclosure: how firms treat customers, markets and investors.']],
      visual: 'Two cards: APRA for financial soundness and ASIC for conduct and disclosure.' },
    { type: 'flow', dur: 15, heading: 'Regulators that cut across industries', connector: 'none', gap: 24,
      items: [
        { h: 'AUSTRAC', b: 'Money laundering and terrorism financing', tone: 'red' },
        { h: 'OAIC', b: 'Privacy and data breaches', tone: 'violet' },
        { h: 'ACCC', b: 'Competition and general consumer law', tone: 'amber' },
        { h: 'RBA', b: 'Payments system and financial stability', tone: 'green' },
        { h: 'ATO', b: 'Tax, SMSFs, super guarantee', tone: 'grey' }
      ],
      caption: 'Other bodies cut across many industries: AUSTRAC, the OAIC, the ACCC, the Reserve Bank and the ATO.',
      visual: 'Five cards: AUSTRAC, OAIC, ACCC, RBA and ATO with their roles.' },
    { type: 'statement', dur: 10, text: 'A large super fund answers to APRA, ASIC, AUSTRAC and the OAIC at the same time.', size: 36,
      small: 'One incident can trigger obligations to several regulators, each with its own test and deadline.',
      caption: 'Most financial institutions deal with several regulators at once, which is why mapping obligations matters.',
      visual: 'A statement that a large super fund answers to several regulators at once.' },
    { type: 'end', dur: 6, page: 'Who regulates what: the regulatory landscape', url: '/foundations/regulatory-landscape.html',
      visual: 'End card with the page title, web address and a general information disclaimer.' }
  ]
};
