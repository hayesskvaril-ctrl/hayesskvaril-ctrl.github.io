window.RL_SPEC = {
  title: 'Normal accidents and high reliability',
  label: 'Explainer · Risk management · Advanced',
  section: 'Risk management', level: 'Advanced',
  desc: 'Perrow\'s normal accident theory, high reliability organisations, how the two can be reconciled, and what they suggest for operational risk.',
  pages: ['/risk-management/theories-of-risk.html'],
  scenes: [
    { type: 'title', dur: 5, tag: 'EXPLAINER · RISK MANAGEMENT · ADVANCED', title: 'Normal accidents and high reliability', subtitle: 'Why complex systems fail, and how some rarely do',
      visual: 'Title card: Normal accidents and high reliability. Why complex systems fail, and how some rarely do.' },
    { type: 'custom', dur: 17, heading: 'Complexity and coupling',
      captions: [[0, 'Charles Perrow argued that some systems are interactively complex: their parts can interact in ways nobody expects.'],
        [8, 'When a system is also tightly coupled, with little time or slack, small failures combine and spread. Accidents become normal.']],
      visual: 'A two by two chart. The horizontal axis runs from linear to complex interactions; the vertical axis from loose to tight coupling. The top right quadrant, complex and tightly coupled, is highlighted as where normal accidents happen.',
      draw: function (lt, A) {
        var s = '', x0 = 330, y0 = 140, w = 620, h = 340, mx = x0 + w / 2, my = y0 + h / 2;
        var pAx = A.prog(lt, 0.4, 0.8), pX = A.prog(lt, 1.6, 0.6), pY = A.prog(lt, 8.4, 0.6), pQ = A.prog(lt, 10.4, 0.8);
        s += A.g('<rect x="' + mx + '" y="' + y0 + '" width="' + (w / 2) + '" height="' + (h / 2) + '" rx="10" fill="#fdecec" stroke="#d70015" stroke-opacity="0.6" stroke-width="2"/>' +
          A.text(mx + w / 4, y0 + 58, 'Normal accidents', { size: 24, weight: 700, family: A.FD, fill: A.C.red, anchor: 'middle' }).svg +
          A.text(mx + w / 4, y0 + 96, 'small failures combine\nand spread quickly', { size: 18, fill: A.C.text, anchor: 'middle' }).svg, { opacity: pQ });
        s += A.g('<rect x="' + x0 + '" y="' + y0 + '" width="' + w + '" height="' + h + '" rx="10" fill="none" stroke="#d2d2d7" stroke-width="2"/>' +
          '<line x1="' + mx + '" y1="' + y0 + '" x2="' + mx + '" y2="' + (y0 + h) + '" stroke="#d2d2d7" stroke-width="2"/>' +
          '<line x1="' + x0 + '" y1="' + my + '" x2="' + (x0 + w) + '" y2="' + my + '" stroke="#d2d2d7" stroke-width="2"/>', { opacity: pAx });
        s += A.g(A.text(x0 + w / 4, y0 + h + 14, 'Linear', { size: 19, weight: 600, family: A.FD, fill: A.C.muted, anchor: 'middle' }).svg +
          A.text(x0 + 3 * w / 4, y0 + h + 14, 'Complex', { size: 19, weight: 700, family: A.FD, fill: A.C.cyan, anchor: 'middle' }).svg +
          A.text(mx, y0 + h + 40, 'How parts interact', { size: 17, fill: A.C.muted, anchor: 'middle' }).svg, { opacity: pX });
        s += A.g(A.text(x0 - 18, y0 + 3 * h / 4 - 12, 'Loose', { size: 19, weight: 600, family: A.FD, fill: A.C.muted, anchor: 'end' }).svg +
          A.text(x0 - 18, y0 + h / 4 - 12, 'Tight', { size: 19, weight: 700, family: A.FD, fill: A.C.violet, anchor: 'end' }).svg +
          A.text(x0 - 18, my - 12, 'Coupling', { size: 17, fill: A.C.muted, anchor: 'end' }).svg, { opacity: pY });
        return s;
      } },
    { type: 'statement', dur: 9, text: 'More safety devices can add complexity.', small: 'Perrow\'s warning: each fix can create new ways to fail.',
      caption: 'Extra safety devices can add complexity and new ways to fail. Linked platforms and real-time payments share some of these features.',
      visual: 'A statement: more safety devices can add complexity. Each fix can create new ways to fail.' },
    { type: 'columns', dur: 13, heading: 'High reliability organisations',
      items: [
        { h: 'Studied in', tone: 'cyan', lines: ['Air traffic control', 'Aircraft carriers', 'Hazardous systems with very few failures'] },
        { h: 'Practices', tone: 'green', lines: ['Preoccupation with failure', 'Reluctance to simplify', 'Deference to expertise'] }
      ],
      caption: 'Other researchers studied organisations that run hazardous systems with very few failures, and the practices that help them stay reliable.',
      visual: 'Two cards. Studied in: air traffic control, aircraft carriers and other hazardous systems with very few failures. Practices: preoccupation with failure, reluctance to simplify and deference to expertise.' },
    { type: 'statement', dur: 10, text: 'Reconciling the two', small: 'One says failure is inevitable; the other, that it can be avoided.',
      caption: 'Later work says they look at different points in time. A systems view adds that accidents come from weak control of the whole system.',
      visual: 'A statement: reconciling the two. One theory says failure is inevitable, the other that it can be avoided.' },
    { type: 'columns', dur: 13, heading: 'Lessons for financial services',
      items: [
        { h: 'From normal accidents', tone: 'red', lines: ['Reduce coupling and complexity', 'Plan for failure, not just prevention'] },
        { h: 'From high reliability', tone: 'green', lines: ['Build preoccupation with failure into operations', 'Take near misses seriously'] }
      ],
      caption: 'Together they support planning for failure as well as preventing it, which fits the focus on tolerance levels and recovery in operational resilience.',
      visual: 'Two cards. From normal accidents: reduce coupling and complexity, and plan for failure, not just prevention. From high reliability: build preoccupation with failure into operations, and take near misses seriously.' },
    { type: 'end', dur: 6, page: 'Theories of risk: perception, amplification, normal accidents and high reliability', url: '/risk-management/theories-of-risk.html',
      visual: 'End card with the page title, web address and a general information disclaimer.' }
  ]
};
