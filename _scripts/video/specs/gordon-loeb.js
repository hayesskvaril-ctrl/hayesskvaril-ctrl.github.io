window.RL_SPEC = {
  title: 'How much to spend on security? The Gordon-Loeb model',
  label: 'Explainer · Risk management · Advanced',
  section: 'Risk management', level: 'Advanced',
  desc: 'Diminishing returns on security spending, the Gordon-Loeb 37% rule of thumb, a worked example and the model\'s limits.',
  pages: ['/risk-management/economics-of-cyber-risk.html'],
  scenes: [
    { type: 'title', dur: 5, tag: 'EXPLAINER · RISK MANAGEMENT · ADVANCED', title: 'How much to spend on security?', subtitle: 'The Gordon-Loeb model',
      visual: 'Title card: How much to spend on security? The Gordon-Loeb model.' },
    { type: 'statement', dur: 8.5, text: 'Each extra dollar buys less protection.', small: 'Security spending has diminishing returns.',
      caption: 'Gordon and Loeb modelled how much to spend protecting a set of information. Each extra dollar of security buys less protection than the last.',
      visual: 'A statement: each extra dollar buys less protection. Security spending has diminishing returns.' },
    { type: 'custom', dur: 17, heading: 'Benefit against cost',
      captions: [[0, 'The benefit of spending is the fall in expected loss: the chance of a breach multiplied by the loss if it happens.'],
        [8, 'The best investment is where the last dollar spent cuts expected loss by exactly one dollar: where the gap is widest.']],
      visual: 'A chart with security investment on the horizontal axis and dollars on the vertical axis. The expected benefit curve rises steeply and then flattens. The cost of investment is a straight 45 degree line. A marker shows the optimal investment where the gap between the curve and the line is widest.',
      draw: function (lt, A) {
        var s = '', ox = 300, oy = 500, sc = 1889, Bm = 0.16, k = 25;
        var X = function (z) { return ox + z * sc; }, Y = function (v) { return oy - v * sc; };
        var B = function (z) { return Bm * (1 - Math.exp(-k * z)); };
        var pAx = A.prog(lt, 0.3, 0.6), pC = A.prog(lt, 1.2, 1.6), pB = A.prog(lt, 2.4, 2.8), pO = A.prog(lt, 9.2, 0.8), pL = A.prog(lt, 10.4, 0.6);
        s += A.g('<line x1="' + ox + '" y1="' + oy + '" x2="' + (ox + 600) + '" y2="' + oy + '" stroke="#86868b" stroke-width="2"/>' +
          '<line x1="' + ox + '" y1="' + oy + '" x2="' + ox + '" y2="' + (oy - 350) + '" stroke="#86868b" stroke-width="2"/>' +
          A.text(ox + 330, oy + 16, 'Security investment ($)', { size: 19, fill: A.C.muted, anchor: 'middle' }).svg +
          A.text(ox - 14, oy - 352, 'Dollars', { size: 19, fill: A.C.muted, anchor: 'end' }).svg, { opacity: pAx });
        if (pC > 0) {
          var zc = 0.18 * pC;
          s += '<line x1="' + X(0) + '" y1="' + Y(0) + '" x2="' + X(zc) + '" y2="' + Y(zc) + '" stroke="#b35c00" stroke-width="4" stroke-linecap="round"/>';
        }
        s += A.g(A.text(X(0.18) + 12, Y(0.18) - 4, 'cost of investment', { size: 19, weight: 600, family: A.FD, fill: A.C.amber }).svg, { opacity: A.prog(lt, 2.6, 0.6) });
        if (pB > 0) {
          var zmax = 0.31 * pB, pts = [];
          for (var i = 0; i <= 60; i++) { var z = zmax * i / 60; pts.push(X(z).toFixed(1) + ',' + Y(B(z)).toFixed(1)); }
          s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="#0066cc" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>';
        }
        s += A.g(A.text(X(0.31) + 12, Y(B(0.31)) - 10, 'expected benefit', { size: 19, weight: 600, family: A.FD, fill: A.C.blueBright }).svg, { opacity: A.prog(lt, 5.0, 0.6) });
        var zs = Math.log(Bm * k) / k;
        s += A.g('<line x1="' + X(zs) + '" y1="' + Y(zs) + '" x2="' + X(zs) + '" y2="' + Y(B(zs)) + '" stroke="#1d7d36" stroke-width="5" stroke-linecap="round"/>' +
          '<line x1="' + X(zs) + '" y1="' + oy + '" x2="' + X(zs) + '" y2="' + Y(zs) + '" stroke="#1d7d36" stroke-width="2" stroke-dasharray="6 6"/>' +
          '<circle cx="' + X(zs) + '" cy="' + oy + '" r="7" fill="#1d7d36"/>', { opacity: pO });
        s += A.g(A.text(X(zs) + 16, Y(zs) + 14, 'largest net benefit', { size: 19, weight: 700, family: A.FD, fill: A.C.green }).svg +
          A.text(X(zs), oy + 16, 'optimal', { size: 19, weight: 700, family: A.FD, fill: A.C.green, anchor: 'middle' }).svg, { opacity: pL });
        return s;
      } },
    { type: 'flow', dur: 14, heading: 'A worked example', ops: ['×', '=', '→'], gap: 54,
      items: [
        { h: '$5 million', b: 'loss if the database is breached', tone: 'red' },
        { h: '20% a year', b: 'chance of a breach', tone: 'amber' },
        { h: '$1 million', b: 'expected loss a year', tone: 'violet' },
        { h: 'About $370,000', b: 'upper bound on spend: about 37% of the expected loss', tone: 'green' }
      ],
      caption: 'Under the model, the best spend never exceeds about 37 percent of the expected loss. Here, that is about $370,000 a year.',
      note: 'Illustrative figures only.',
      visual: 'A worked example in four boxes: a 5 million dollar loss times a 20 percent annual chance equals a 1 million dollar expected loss, giving an upper bound on spending of about 370 thousand dollars a year, about 37 percent of the expected loss.' },
    { type: 'columns', dur: 13, heading: 'The model\'s limits',
      items: [
        { h: 'Inputs are guesses', tone: 'amber', lines: ['The chance of a breach', 'How much spending reduces it'] },
        { h: 'Losses it leaves out', tone: 'red', lines: ['Heavy-tailed extreme events', 'Regulatory action and lost trust'] }
      ],
      caption: 'The model frames the decision better than it produces a number. Heavy-tailed losses, penalties and harm to customers can justify a different answer.',
      visual: 'Two cards. Inputs are guesses: the chance of a breach, and how much spending reduces it. Losses it leaves out: heavy-tailed extreme events, and regulatory action and lost trust.' },
    { type: 'end', dur: 6, page: 'The economics of cyber risk', url: '/risk-management/economics-of-cyber-risk.html',
      visual: 'End card with the page title, web address and a general information disclaimer.' }
  ]
};
