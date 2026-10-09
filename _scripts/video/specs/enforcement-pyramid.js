window.RL_SPEC = {
  title: 'The enforcement pyramid',
  label: 'Explainer · Compliance · Advanced',
  section: 'Compliance', level: 'Advanced',
  desc: 'Responsive regulation: why regulators start with persuasion, escalate when firms don\'t respond, and how the idea shows up in Australia.',
  pages: ['/compliance/theories-of-regulation.html', '/compliance/enforcement-and-penalties.html'],
  scenes: [
    { type: 'title', dur: 5, tag: 'EXPLAINER · COMPLIANCE · ADVANCED', title: 'The enforcement pyramid', subtitle: 'Responsive regulation: persuade first, escalate if needed',
      visual: 'Title card: The enforcement pyramid. Responsive regulation: persuade first, escalate if needed.' },
    { type: 'statement', dur: 8, text: 'Persuade or punish?', small: 'Ayres and Braithwaite (1992) argued regulators don\'t have to choose.',
      caption: 'Regulators have long debated whether to cooperate with firms or punish them. Ayres and Braithwaite argued that they can do both.',
      visual: 'A statement: persuade or punish? Ayres and Braithwaite argued regulators do not have to choose.' },
    { type: 'custom', dur: 18, heading: 'The pyramid',
      captions: [[0, 'Most regulatory work happens at the wide base of the pyramid: persuasion, education and supervision.'],
        [8, 'If a firm doesn\'t respond, the regulator escalates. The credible threat at the top is what makes cooperation at the bottom work.']],
      visual: 'A pyramid with five layers. From the wide base to the narrow top: persuasion, education and supervision; warnings and enforceable undertakings; civil penalties and infringement notices; criminal prosecution; licence removal. An arrow beside it points upwards, labelled escalate if no response.',
      draw: function (lt, A) {
        var s = '', cx = 560, yTopAll = 150, yBase = 520;
        var half = function (y) { return 90 + (y - yTopAll) / (yBase - yTopAll) * 340; };
        var layers = [
          ['Persuasion, education, supervision', 'green'],
          ['Warnings, enforceable undertakings', 'cyan'],
          ['Civil penalties, infringement notices', 'blue'],
          ['Criminal prosecution', 'amber'],
          ['Licence removal', 'red']
        ];
        layers.forEach(function (l, i) {
          var yb = yBase - i * 74, yt = yb - 70, p = A.prog(lt, 0.6 + i * 1.2, 0.7), t = A.tone(l[1]);
          var hb = half(yb), ht = half(yt);
          var poly = '<path d="M' + (cx - hb) + ',' + yb + ' L' + (cx + hb) + ',' + yb + ' L' + (cx + ht) + ',' + yt + ' L' + (cx - ht) + ',' + yt + ' Z" fill="' + t.fill +
            '" stroke="' + t.accent + '" stroke-opacity="0.7" stroke-width="2"/>';
          poly += A.text(cx, yt + 23, l[0], { size: 19, weight: 700, family: A.FD, fill: t.accent, anchor: 'middle' }).svg;
          s += A.g(poly, { opacity: p, dy: (1 - p) * 16 });
        });
        var pa = A.prog(lt, 8.4, 2.6);
        s += A.arrow(1050, 512, 1050, 168, pa, A.C.red, 4);
        s += A.g(A.text(1072, 300, 'Escalate if\nno response', { size: 21, weight: 700, family: A.FD, fill: A.C.red }).svg, { opacity: A.prog(lt, 9.2, 0.6) });
        s += A.g(A.text(1072, 470, 'Used most', { size: 18, weight: 600, family: A.FD, fill: A.C.green }).svg +
          A.text(1072, 176, 'Used rarely', { size: 18, weight: 600, family: A.FD, fill: A.C.red }).svg, { opacity: A.prog(lt, 6.6, 0.6) });
        return s;
      } },
    { type: 'columns', dur: 14, heading: 'The pyramid in Australia',
      items: [
        { h: 'Lower on the pyramid', tone: 'green', lines: ['APRA letters to industry', 'ASIC public reviews and reports', 'DDO stop orders, many revoked once fixed'] },
        { h: 'Higher on the pyramid', tone: 'red', lines: ['Civil penalties, such as greenwashing cases', 'Banning and disqualification', 'Licence cancellation'] }
      ],
      caption: 'Australian regulators use the whole pyramid. After the Royal Commission, ASIC litigated more, and whether that fits the theory is still debated.',
      visual: 'Two cards. Lower on the pyramid: APRA letters to industry, ASIC public reviews and reports, and design and distribution stop orders, many revoked once fixed. Higher on the pyramid: civil penalties such as greenwashing cases, banning and disqualification, and licence cancellation.' },
    { type: 'statement', dur: 9, text: 'Really responsive regulation', small: 'Respond to a firm\'s systems and culture, not just its attitude.',
      caption: 'Later research by Baldwin and Black argued regulators should respond to a firm\'s systems, culture and wider environment, not only its attitude.',
      visual: 'A statement: really responsive regulation. Respond to a firm\'s systems and culture, not just its attitude.' },
    { type: 'statement', dur: 8, text: 'Why it matters for compliance teams', small: 'The theory helps predict how a regulator will respond to a problem.',
      caption: 'Knowing the pyramid helps explain why regulators usually start with cooperation, and why they escalate when a firm doesn\'t respond.',
      visual: 'A statement: why it matters for compliance teams. The theory helps predict how a regulator will respond to a problem.' },
    { type: 'end', dur: 6, page: 'Theories of regulation: responsive, risk-based and principles-based', url: '/compliance/theories-of-regulation.html',
      visual: 'End card with the page title, web address and a general information disclaimer.' }
  ]
};
