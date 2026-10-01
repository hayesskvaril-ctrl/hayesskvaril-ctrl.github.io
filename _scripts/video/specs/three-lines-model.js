window.RL_SPEC = {
  title: 'The Three Lines model',
  label: 'Explainer · Foundations · Beginner',
  section: 'Foundations', level: 'Beginner',
  desc: 'Who does what in managing risk: the first line, the second line, internal audit and the governing body.',
  pages: ['/foundations/three-lines-model.html', '/governance/internal-audit.html'],
  scenes: [
    { type: 'title', dur: 5, tag: 'EXPLAINER · FOUNDATIONS · BEGINNER', title: 'The Three Lines model', subtitle: 'Who does what in managing risk',
      visual: 'Title card: The Three Lines model. Who does what in managing risk.' },
    { type: 'statement', dur: 7, text: 'Everyone manages risk. The question is who does what.', small: 'The Three Lines model is published by the Institute of Internal Auditors. The current version dates from 2020.',
      caption: 'The Three Lines model is a widely used way of describing roles in risk management and assurance.',
      visual: 'A statement: everyone manages risk, the question is who does what.' },
    { type: 'stack', dur: 26.3, heading: 'The roles',
      items: [
        { h: 'Governing body', b: 'The board. Accountable to stakeholders, sets direction and risk appetite, oversees.', tone: 'violet' },
        { h: 'First line', b: 'The business: delivers products and services, owns and manages its risks, runs the controls.', tone: 'blue' },
        { h: 'Second line', b: 'Risk, compliance and other specialists: frameworks, advice, monitoring and challenge.', tone: 'cyan' },
        { h: 'Third line', b: 'Internal audit: independent, objective assurance and advice to the board.', tone: 'green' }
      ],
      at: [1, 7.7, 13.9, 20.3],
      active: [[1, 0], [7.7, 1], [13.9, 2], [20.3, 3]],
      captions: [[0, 'At the top sits the governing body, usually the board. It is accountable to stakeholders and oversees everything below.'],
        [7.4, 'The first line is the business itself. The people who serve customers own their risks and run the controls day to day.'],
        [13.6, 'The second line is specialists in risk and compliance. They set frameworks, give advice, monitor and challenge.'],
        [20.1, 'The third line is internal audit. It gives the board independent assurance that the whole system is working.']],
      visual: 'Four layers appear from top to bottom: governing body, first line, second line and third line, each with a description.' },
    { type: 'columns', dur: 12, heading: 'What the 2020 update changed',
      items: [
        { h: 'From “defence”...', tone: 'grey', lines: ['“Three lines of defence” suggested rigid barriers', 'Lines were often treated as separate org boxes'] },
        { h: '...to roles', tone: 'cyan', lines: ['First and second line roles are both part of management', 'Collaboration as well as independence', 'Focus on achieving objectives, not only defence'] }
      ],
      caption: 'The 2020 version dropped the “defence” language and treats the lines as roles that work together, not rigid walls.',
      visual: 'Two cards compare the old three lines of defence with the 2020 roles-based model.' },
    { type: 'statement', dur: 9, text: 'Owning a risk and checking it are different jobs.', small: 'If the second line starts running the business\'s controls, nobody is independently checking them.',
      caption: 'A common failure: blurred roles. When the people who check a control also run it, independent challenge disappears.',
      visual: 'A statement: owning a risk and checking it are different jobs.' },
    { type: 'flow', dur: 13, heading: 'Example: paying a benefit in a super fund', connector: 'arrow',
      items: [
        { h: 'First line', b: 'Payments team checks identity and approves each payment', tone: 'blue' },
        { h: 'Second line', b: 'Operational risk tests the checks and reports exceptions', tone: 'cyan' },
        { h: 'Third line', b: 'Internal audit reviews the whole process and the second line\'s testing', tone: 'green' },
        { h: 'Board', b: 'Receives the results and holds management to account', tone: 'violet' }
      ],
      caption: 'In practice: the business runs the payment controls, risk tests them, internal audit reviews both, and the board oversees.',
      visual: 'A flow of four boxes shows the lines applied to paying a super benefit.' },
    { type: 'end', dur: 6, page: 'The Three Lines model', url: '/foundations/three-lines-model.html',
      visual: 'End card with the page title, web address and a general information disclaimer.' }
  ]
};
