window.RL_SPEC = {
  title: 'Misleading conduct: the dominant message test',
  label: 'Explainer · Compliance · Advanced',
  section: 'Compliance', level: 'Advanced',
  desc: 'How courts decide whether a communication is misleading: the overall impression, the audience, the dominant message and the greenwashing cases.',
  pages: ['/compliance/misleading-or-deceptive-conduct.html', '/compliance/disclosure-obligations.html'],
  scenes: [
    { type: 'title', dur: 5, tag: 'EXPLAINER · COMPLIANCE · ADVANCED', title: 'Misleading conduct', subtitle: 'The dominant message test',
      visual: 'Title card: Misleading conduct, the dominant message test.' },
    { type: 'statement', dur: 8, text: 'A statement can be true word for word and still mislead.', small: 'No intention to mislead is needed, and no one has to have actually been misled.',
      caption: 'The law asks what overall impression ordinary members of the audience would take away, and whether it is wrong.',
      visual: 'A statement: a statement can be true word for word and still mislead.' },
    { type: 'flow', dur: 16, heading: 'Four questions courts effectively ask', connector: 'arrow',
      items: [
        { h: '1. Audience', b: 'Who is it aimed at?', tone: 'cyan' },
        { h: '2. Message', b: 'Words, implied claims, dominant message', tone: 'blue' },
        { h: '3. Reaction', b: 'Would ordinary, reasonable members be misled?', tone: 'violet' },
        { h: '4. Truth', b: 'True at the time? Grounds for future claims? Misleading silence?', tone: 'amber' }
      ],
      captions: [[0, 'Identify the audience, then the message it receives, including what is implied and what dominates.'],
        [8, 'Ask whether ordinary, reasonable members of that audience would be led into error, ignoring extreme or fanciful reactions.']],
      visual: 'Four cards in sequence: audience, message, reaction and truth.' },
    { type: 'custom', dur: 14, heading: 'Headline versus fine print',
      captions: [[0, 'Here the headline says the fund is the top performer. The qualification is in tiny print at the bottom.'],
        [7, 'In ACCC v TPG (2013), the High Court held that fine print may not correct a misleading dominant message.']],
      visual: 'A mock social media ad with a large headline, Australia\'s top performing Balanced fund, 11.2% returns, and tiny fine print. A highlight marks the headline as the dominant message and the fine print as easily missed.',
      draw: function (lt, A) {
        var s = '', p1 = A.prog(lt, 0.4, 0.8), p2 = A.prog(lt, 3.5, 0.8), p3 = A.prog(lt, 6.5, 0.8);
        var x = 300, y = 150, w = 680, h = 370;
        s += A.g('<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="18" fill="#ffffff" stroke="#d2d2d7" stroke-opacity="1" stroke-width="2"/>' +
          A.text(x + 40, y + 40, 'SPONSORED', { size: 16, weight: 600, family: A.FM, fill: A.C.muted }).svg +
          A.text(x + 40, y + 80, 'Australia\'s top performing Balanced fund!', { size: 38, weight: 700, family: A.FD, fill: A.C.heading, maxW: w - 80, lh: 44 }).svg +
          A.text(x + 40, y + 188, '11.2% returns', { size: 64, weight: 700, family: A.FD, fill: A.C.green }).svg +
          '<rect x="' + (x + 40) + '" y="' + (y + 272) + '" width="220" height="46" rx="10" fill="#3b82f6"/>' +
          A.text(x + 150, y + 283, 'Join in 2 minutes', { size: 20, weight: 700, fill: '#fff', anchor: 'middle' }).svg +
          A.text(x + 40, y + h - 35, 'Past performance is not a reliable indicator of future performance. Returns for the year to 30 June. Rankings by a third-party survey, one category.', { size: 9, fill: A.C.muted, maxW: w - 80, lh: 11 }).svg, { opacity: p1 });
        s += A.g('<rect x="' + (x + 26) + '" y="' + (y + 66) + '' + '" width="' + (w - 52) + '" height="200" rx="12" fill="none" stroke="#ff9f0a" stroke-width="3"/>' +
          A.text(x + w + 20, y + 120, 'Dominant message', { size: 22, weight: 700, family: A.FD, fill: A.C.amber }).svg +
          A.text(x + w + 20, y + 152, 'best fund; you\'ll get about 11%', { size: 18, fill: A.C.text, maxW: 220 }).svg, { opacity: p2 });
        s += A.g('<rect x="' + (x + 26) + '" y="' + (y + h - 43) + '" width="' + (w - 52) + '" height="37" rx="6" fill="none" stroke="#ff3b30" stroke-width="3"/>' +
          A.text(x + w + 20, y + h - 70, 'Fine print', { size: 22, weight: 700, family: A.FD, fill: A.C.red }).svg +
          A.text(x + w + 20, y + h - 40, 'easily missed', { size: 18, fill: A.C.text }).svg, { opacity: p3 });
        return s;
      } },
    { type: 'columns', dur: 14, heading: 'Cases that shaped the tests',
      items: [
        { h: 'Puxu (1982)', tone: 'blue', lines: ['Judge conduct as a whole, in context'] },
        { h: 'Campomar (2000)', tone: 'cyan', lines: ['Ordinary, reasonable members of the audience'] },
        { h: 'Miller v BMW (2010)', tone: 'violet', lines: ['Silence can mislead if disclosure is expected'] },
        { h: 'TPG (2013)', tone: 'amber', lines: ['The dominant message counts'] }
      ],
      caption: 'High Court cases built the tests: the whole context, the ordinary member of the audience, misleading silence and the dominant message.',
      visual: 'Four cards summarise the Puxu, Campomar, Miller v BMW and TPG cases.' },
    { type: 'bars', dur: 12, heading: 'ASIC\'s greenwashing penalties', max: 14, labelW: 420,
      items: [
        { label: 'Mercer Superannuation (2024)', v: 11.3, vl: '$11.3 million', tone: 'cyan' },
        { label: 'Vanguard Investments (2024)', v: 12.9, vl: '$12.9 million', tone: 'blue' },
        { label: 'Active Super (2025)', v: 10.5, vl: '$10.5 million', tone: 'violet' }
      ],
      caption: 'The greenwashing cases show product claims must match what the product actually holds, across every channel.',
      visual: 'A bar chart of ASIC\'s first three greenwashing civil penalties: Mercer $11.3 million, Vanguard $12.9 million and Active Super $10.5 million.' },
    { type: 'end', dur: 6, page: 'Misleading or deceptive conduct: the legal tests', url: '/compliance/misleading-or-deceptive-conduct.html',
      visual: 'End card with the page title, web address and a general information disclaimer.' }
  ]
};
