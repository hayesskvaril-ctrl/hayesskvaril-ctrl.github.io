window.RL_SPEC = {
  title: 'Unit pricing errors: who wins and who loses',
  label: 'Explainer · Sectors · Advanced',
  section: 'Sectors', level: 'Advanced',
  desc: 'How a super fund unit price is built, how a pricing error moves value between members, and the debate over materiality thresholds.',
  pages: ['/sectors/unit-pricing.html', '/sectors/superannuation.html'],
  scenes: [
    { type: 'title', dur: 5, tag: 'EXPLAINER · SECTORS · ADVANCED', title: 'Unit pricing errors', subtitle: 'Who wins and who loses',
      visual: 'Title card: Unit pricing errors, who wins and who loses.' },
    { type: 'flow', dur: 14, heading: 'How a unit price is built', ops: ['−', '=', '÷', '='], gap: 44,
      items: [
        { h: 'Assets', b: 'listed prices, unlisted valuations, cash', tone: 'blue' },
        { h: 'Liabilities', b: 'accrued fees, tax provisions', tone: 'violet' },
        { h: 'Net asset value', tone: 'cyan' },
        { h: 'Units on issue', tone: 'grey' },
        { h: 'Unit price', b: 'used for every transaction', tone: 'green' }
      ],
      caption: 'A unit price is the option\'s net assets divided by the units on issue. Every contribution, switch and withdrawal uses it.',
      visual: 'An equation: assets minus liabilities equals net asset value, divided by units on issue equals the unit price.' },
    { type: 'statement', dur: 8, text: 'Correct price: $1.2000. Price used: $1.2100.', small: 'An overstatement of about 0.83%.', size: 40,
      caption: 'Suppose an error in a valuation makes the price about 0.83% too high for a week. Who is affected?',
      visual: 'A statement: correct price $1.2000, price used $1.2100.' },
    { type: 'columns', dur: 18, heading: 'Who wins and who loses',
      items: [
        { h: 'Joining members lose', tone: 'red', lines: ['$10,000 buys 8,264 units instead of 8,333', 'Short about $83'] },
        { h: 'Leaving members gain', tone: 'green', lines: ['50,000 units pay out $60,500, not $60,000', 'Overpaid $500'] },
        { h: 'Staying members pay', tone: 'amber', lines: ['The overpayment comes out of the option', 'Their units are worth less'] }
      ],
      at: [0.6, 6.2, 11.8],
      captions: [[0, 'People investing at the inflated price get fewer units than they should.'],
        [6, 'People leaving are paid too much, and members who stay bear the cost.']],
      visual: 'Three cards: joining members lose, leaving members gain, staying members pay.' },
    { type: 'statement', dur: 12, text: 'A 0.30% threshold has commonly been used. Should it be?', size: 38,
      small: 'ASIC RG 94 recognises it. The best financial interests duty and RG 277 point towards putting every member back where they should be.',
      caption: 'Whether relying on a materiality threshold fits trustees\' duties is a live question. Small errors across many members add up.',
      visual: 'A statement about the 0.30% materiality threshold and the debate about it.' },
    { type: 'flow', dur: 12, heading: 'Fixing an error', connector: 'arrow', gap: 36,
      items: [
        { h: 'Contain', b: 'stop using the wrong price', tone: 'red' },
        { h: 'Quantify', b: 'every affected day and transaction', tone: 'amber' },
        { h: 'Correct', b: 'accounts, exited members, the option', tone: 'blue' },
        { h: 'Fix the cause', b: 'and decide who bears the cost', tone: 'green' }
      ],
      caption: 'Correct every affected transaction, restore the option, decide who bears the cost, and fix the control that failed.',
      visual: 'A flow: contain, quantify, correct, fix the cause.' },
    { type: 'end', dur: 6, page: 'Unit pricing and unit pricing errors', url: '/sectors/unit-pricing.html',
      visual: 'End card with the page title, web address and a general information disclaimer.' }
  ]
};
