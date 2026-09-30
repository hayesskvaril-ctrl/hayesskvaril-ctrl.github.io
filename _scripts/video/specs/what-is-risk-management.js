window.RL_SPEC = {
  title: 'What is risk management?',
  label: 'Explainer · Foundations · Beginner',
  section: 'Foundations', level: 'Beginner',
  desc: 'Risk as the effect of uncertainty on objectives, the risk management loop, and the ways to respond to a risk.',
  pages: ['/foundations/what-is-risk-management.html', '/foundations/', '/risk-management/'],
  scenes: [
    { type: 'title', dur: 5, tag: 'EXPLAINER · FOUNDATIONS · BEGINNER', title: 'What is risk management?', subtitle: 'The loop every risk process follows',
      visual: 'Title card: What is risk management? The loop every risk process follows.' },
    { type: 'statement', dur: 8, text: 'Risk is the effect of uncertainty on objectives.', small: 'It is always tied to something you are trying to achieve.',
      caption: 'The international guideline ISO 31000 describes risk as the effect of uncertainty on objectives. No objective, no risk.',
      visual: 'A statement appears: Risk is the effect of uncertainty on objectives.' },
    { type: 'columns', dur: 10, heading: 'Three words that often get mixed up',
      items: [
        { h: 'Risk', tone: 'blue', lines: ['Might happen', 'Our payment system could fail on the day contributions are processed'] },
        { h: 'Issue', tone: 'amber', lines: ['Exists now and needs fixing', 'The backup system hasn\'t been tested for 18 months'] },
        { h: 'Incident', tone: 'red', lines: ['Has happened', 'The payment system failed on Tuesday and 4,000 contributions were delayed'] }
      ],
      caption: 'A risk might happen. An issue is a problem that exists now. An incident is something that has already happened.',
      visual: 'Three cards compare a risk, an issue and an incident, each with a payment system example.' },
    { type: 'cycle', dur: 22, center: 'Communicate, consult and record at every step',
      items: [
        { h: '1. Set the context', b: 'objectives, scope, criteria', tone: 'cyan' },
        { h: '2. Identify', b: 'what could happen?', tone: 'blue' },
        { h: '3. Analyse', b: 'how likely? how bad?', tone: 'blue' },
        { h: '4. Evaluate', b: 'is it acceptable?', tone: 'blue' },
        { h: '5. Treat', b: 'decide and act', tone: 'violet' },
        { h: '6. Monitor and review', b: 'is it working? what changed?', tone: 'green' }
      ],
      at: [0.6, 5.2, 7.2, 9.2, 11.4, 13.6],
      active: [[0.6, 0], [5.2, 1], [7.2, 2], [9.2, 3], [11.4, 4], [13.6, 5], [16.5, -1]],
      captions: [[0, 'Most frameworks follow a loop. First, set the context: the objective, the scope and the criteria for judging risks.'],
        [5, 'Then identify what could happen, analyse how likely and how severe it is, and evaluate whether it is acceptable.'],
        [11, 'Treat the risks that aren\'t acceptable. Then monitor and review, because risks and controls change.'],
        [16.5, 'Identifying, analysing and evaluating together are called risk assessment. Communication runs through every step.']],
      visual: 'A cycle of six steps appears one by one: set the context, identify, analyse, evaluate, treat, monitor and review. In the centre: communicate, consult and record at every step.' },
    { type: 'flow', dur: 12, heading: 'Ways to respond to a risk', connector: 'none', gap: 22,
      items: [
        { h: 'Avoid', b: 'Don\'t start, or stop, the activity', tone: 'red' },
        { h: 'Reduce', b: 'Controls lower likelihood or impact', tone: 'blue' },
        { h: 'Share', b: 'Insurance or contracts', tone: 'violet' },
        { h: 'Accept', b: 'A deliberate, informed decision', tone: 'amber' },
        { h: 'Pursue', b: 'For opportunities: take the upside', tone: 'green' }
      ],
      caption: 'There are only a few ways to respond: avoid, reduce, share or accept a risk, or pursue an opportunity. Most real cases use a mix.',
      visual: 'Five cards show the responses: avoid, reduce, share, accept and pursue.' },
    { type: 'statement', dur: 8, text: 'The aim isn\'t zero risk. It\'s taking the right risks, knowingly.', small: 'A bank that never lends has no credit risk, but it isn\'t a bank.',
      caption: 'Every organisation takes risks to achieve anything. Risk management makes those choices deliberate, and keeps the rest at a level it can live with.',
      visual: 'A statement: the aim isn\'t zero risk, it\'s taking the right risks knowingly.' },
    { type: 'statement', dur: 8, text: 'In Australia, APRA-regulated banks, insurers and super trustees must have a board-approved risk management framework.', size: 34,
      small: 'Prudential Standards CPS 220 and SPS 220',
      caption: 'For regulated financial institutions, risk management isn\'t optional. It is a legal requirement overseen by APRA.',
      visual: 'A statement about the APRA requirement for a risk management framework under CPS 220 and SPS 220.' },
    { type: 'end', dur: 6, page: 'What is risk management?', url: '/foundations/what-is-risk-management.html',
      visual: 'End card with the page title, web address and a general information disclaimer.' }
  ]
};
