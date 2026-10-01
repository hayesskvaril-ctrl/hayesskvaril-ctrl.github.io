window.RL_SPEC = {
  title: 'Data breaches: contain, assess, notify',
  label: 'Explainer · Compliance · Intermediate',
  section: 'Compliance', level: 'Intermediate',
  desc: 'How the Notifiable Data Breaches scheme works: containing a breach, assessing serious harm, and notifying the OAIC and individuals.',
  pages: ['/compliance/privacy-law.html', '/case-studies/optus-medibank-data-breaches.html'],
  scenes: [
    { type: 'title', dur: 5, tag: 'EXPLAINER · COMPLIANCE · INTERMEDIATE', title: 'Data breaches', subtitle: 'Contain, assess, notify',
      visual: 'Title card: Data breaches. Contain, assess, notify.' },
    { type: 'statement', dur: 9, text: 'Unauthorised access, disclosure or loss of personal information.', size: 38, small: 'Under the Privacy Act\'s Notifiable Data Breaches scheme, some of these must be notified.',
      caption: 'A data breach can be a cyber attack, but also an email sent to the wrong person or a lost laptop.',
      visual: 'A statement defining a data breach.' },
    { type: 'cycle', dur: 23.7, center: 'Record every step',
      items: [
        { h: 'Contain', b: 'stop it, recover the data', tone: 'red' },
        { h: 'Assess', b: 'is serious harm likely?', tone: 'amber' },
        { h: 'Notify', b: 'OAIC and affected people', tone: 'blue' },
        { h: 'Review', b: 'fix the cause, prevent a repeat', tone: 'green' }
      ],
      rx: 360, at: [0.7, 5.7, 12.6, 18.2],
      active: [[0.7, 0], [5.7, 1], [12.6, 2], [18.2, 3]],
      captions: [[0, 'First, contain it: stop the breach and try to recover the information. Quick action can reduce the harm.'],
        [5.4, 'Then assess. If there are reasonable grounds to suspect an eligible breach, assess it quickly, generally within 30 days.'],
        [12.4, 'If an eligible data breach has happened, notify the OAIC and affected individuals as soon as practicable.'],
        [18, 'Finally, review what happened and fix the cause, so the same thing doesn\'t happen again.']],
      visual: 'A four-step cycle: contain, assess, notify and review.' },
    { type: 'flow', dur: 14, heading: 'Is it an eligible data breach?', connector: 'plus',
      items: [
        { h: 'Unauthorised access, disclosure or loss', b: 'of personal information', tone: 'blue' },
        { h: 'Likely to result in serious harm', b: 'to any of the individuals', tone: 'amber' },
        { h: 'Harm not prevented', b: 'by remedial action', tone: 'red' }
      ],
      caption: 'It is eligible if serious harm is likely and remedial action hasn\'t prevented it. Tax file numbers and identity documents raise the risk.',
      visual: 'Three conditions combine to make an eligible data breach.' },
    { type: 'statement', dur: 9, text: 'APRA-regulated entities may also need to tell APRA within 72 hours.', size: 36, small: 'Under CPS 234, for a material information security incident.',
      caption: 'Privacy notification isn\'t the only clock. Check every regime that might apply.',
      visual: 'A statement about the separate CPS 234 notification to APRA.' },
    { type: 'end', dur: 6, page: 'Privacy law', url: '/compliance/privacy-law.html',
      visual: 'End card with the page title, web address and a general information disclaimer.' }
  ]
};
