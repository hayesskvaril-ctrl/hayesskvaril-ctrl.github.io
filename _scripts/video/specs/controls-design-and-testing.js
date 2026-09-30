window.RL_SPEC = {
  title: 'Controls: design, operation and testing',
  label: 'Explainer · Risk management · Intermediate',
  section: 'Risk management', level: 'Intermediate',
  desc: 'Preventive, detective and corrective controls, design versus operating effectiveness, and how controls are tested.',
  pages: ['/risk-management/control-design-and-testing.html', '/tools/control-testing-workpaper.html'],
  scenes: [
    { type: 'title', dur: 5, tag: 'EXPLAINER · RISK MANAGEMENT · INTERMEDIATE', title: 'Controls', subtitle: 'Design, operation and testing',
      visual: 'Title card: Controls, design, operation and testing.' },
    { type: 'flow', dur: 12, heading: 'Three kinds of control', connector: 'arrow',
      items: [
        { h: 'Preventive', b: 'Stops the problem happening. Example: four-eyes approval of payments.', tone: 'blue' },
        { h: 'Detective', b: 'Finds it after it happens. Example: daily reconciliation.', tone: 'cyan' },
        { h: 'Corrective', b: 'Fixes it and limits the damage. Example: reversal and remediation.', tone: 'green' }
      ],
      caption: 'A control is anything that keeps a risk within appetite. Controls can prevent, detect or correct problems.',
      visual: 'Three cards: preventive, detective and corrective controls with examples.' },
    { type: 'columns', dur: 14, heading: 'Two questions for every control',
      items: [
        { h: 'Design effectiveness', tone: 'violet', lines: ['If it runs exactly as described, would it address the risk?', 'Checked by walkthrough and review of the design'] },
        { h: 'Operating effectiveness', tone: 'cyan', lines: ['Did it actually run, consistently, over the period?', 'Checked by testing a sample of occurrences'] }
      ],
      captions: [[0, 'Testing asks two separate questions. First: is the control well designed? Would it work if performed as described?'],
        [7, 'Second: did it actually operate, consistently, over the whole period? A well-designed control that isn\'t performed does nothing.']],
      visual: 'Two cards compare design effectiveness and operating effectiveness.' },
    { type: 'bars', dur: 13, heading: 'Strength of test evidence', max: 4,
      items: [
        { label: 'Inquiry (asking)', v: 1, vl: 'weakest', tone: 'red' },
        { label: 'Observation (watching)', v: 2, vl: 'moderate', tone: 'amber' },
        { label: 'Inspection (examining records)', v: 3, vl: 'stronger', tone: 'blue' },
        { label: 'Reperformance (doing it again)', v: 4, vl: 'strongest', tone: 'green' }
      ],
      caption: 'Not all evidence is equal. Asking someone is weakest; inspecting records or reperforming the control is much stronger.',
      visual: 'A bar chart ranks test methods from inquiry, the weakest, to reperformance, the strongest.' },
    { type: 'flow', dur: 12, heading: 'From test to fix', connector: 'arrow',
      items: [
        { h: 'Test', b: 'Sample, attributes, evidence', tone: 'cyan' },
        { h: 'Exception', b: 'Isolated or systemic?', tone: 'amber' },
        { h: 'Root cause', b: 'Why did it fail?', tone: 'violet' },
        { h: 'Action and validation', b: 'Fix it, then prove the fix works', tone: 'green' }
      ],
      caption: 'Every exception needs a root cause and an action. The issue is closed only when someone independent confirms the fix works.',
      visual: 'A flow from test to exception, root cause, and action with validation.' },
    { type: 'end', dur: 6, page: 'Control design and testing', url: '/risk-management/control-design-and-testing.html',
      visual: 'End card with the page title, web address and a general information disclaimer.' }
  ]
};
