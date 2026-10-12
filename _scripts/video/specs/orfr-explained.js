window.RL_SPEC = {
  title: 'How super funds pay for operational mistakes: the ORFR',
  label: 'Explainer · Standards · Intermediate',
  section: 'Standards', level: 'Intermediate',
  desc: 'SPS 114 in brief: why super trustees hold an operational risk financial requirement, the target amount and tolerance limit, what the money can be used for, and how it is rebuilt.',
  pages: ['/standards/sps-114.html'],
  scenes: [
    { type: 'title', dur: 5, tag: 'EXPLAINER · STANDARDS · INTERMEDIATE', title: 'How super funds pay for operational mistakes', subtitle: 'The operational risk financial requirement (SPS 114)',
      visual: 'Title card: How super funds pay for operational mistakes. The operational risk financial requirement, SPS 114.' },
    { type: 'statement', dur: 9, text: 'When things go wrong, other members shouldn\'t foot the bill.', small: 'A unit pricing error, a missed contribution or a system failure can leave members out of pocket.',
      caption: 'Operational mistakes can cost members money. Without funds set aside, fixing them could mean taking money from other members.',
      visual: 'A statement: when things go wrong, other members should not foot the bill. Unit pricing errors, missed contributions or system failures can leave members out of pocket.' },
    { type: 'custom', dur: 18, heading: 'Target amount and tolerance limit',
      captions: [[0, 'Every super trustee must hold money for operational risk. The Board sets a target amount and a lower tolerance limit.'],
        [8, 'If paying members back takes the money below the tolerance limit, the Board must approve a plan to rebuild it.']],
      visual: 'A vertical bar shows the money held for operational risk. It fills up to a line marked target amount. A dashed line below it marks the tolerance limit. After an incident, members are paid back and the level drops below the tolerance limit. A replenishment plan then rebuilds the money to the target.',
      draw: function (lt, A) {
        var s = '', x0 = 420, w = 170, yb = 520, yTop = 150, yT = 250, yL = 312, yLow = 350;
        var pAx = A.prog(lt, 0.3, 0.6), pFill = A.prog(lt, 1.0, 1.4), pTol = A.prog(lt, 2.8, 0.6), pDrop = A.prog(lt, 8.4, 1.2), pRise = A.prog(lt, 12.2, 2.6);
        var level = yb - (yb - yT) * pFill;
        if (pDrop > 0) level = yT + (yLow - yT) * pDrop;
        if (pRise > 0) level = yLow - (yLow - yT) * pRise;
        var low = pDrop > 0 && pRise < 1, col = low && level > yL ? '#d70015' : (pRise >= 1 ? '#1d7d36' : '#0066cc');
        s += A.g('<rect x="' + x0 + '" y="' + yTop + '" width="' + w + '" height="' + (yb - yTop) + '" rx="14" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="2"/>', { opacity: pAx });
        if (pFill > 0) s += '<rect x="' + (x0 + 6) + '" y="' + level.toFixed(1) + '" width="' + (w - 12) + '" height="' + (yb - 6 - level).toFixed(1) + '" rx="10" fill="' + col + '" fill-opacity="0.85"/>';
        s += A.g('<line x1="' + (x0 - 30) + '" y1="' + yT + '" x2="' + (x0 + w + 30) + '" y2="' + yT + '" stroke="#1d1d1f" stroke-width="4"/>' +
          A.text(x0 + w + 44, yT - 14, 'Target amount', { size: 22, weight: 700, family: A.FD, fill: A.C.text }).svg +
          A.text(x0 + w + 44, yT + 14, 'set by the Board', { size: 18, fill: A.C.muted }).svg, { opacity: A.prog(lt, 2.0, 0.6) });
        s += A.g('<line x1="' + (x0 - 30) + '" y1="' + yL + '" x2="' + (x0 + w + 30) + '" y2="' + yL + '" stroke="#1d1d1f" stroke-width="3" stroke-dasharray="10 8"/>' +
          A.text(x0 + w + 44, yL - 2, 'Tolerance limit', { size: 22, weight: 700, family: A.FD, fill: A.C.text }).svg, { opacity: pTol });
        s += A.g(A.text(x0 - 46, yLow + 10, 'Incident: members\npaid back', { size: 19, weight: 600, family: A.FD, fill: A.C.red, anchor: 'end' }).svg, { opacity: A.prog(lt, 8.8, 0.6) * (1 - A.prog(lt, 15.2, 0.5)) });
        s += A.g(A.text(x0 + w + 44, yLow + 34, 'Below the limit:\nBoard-approved\nreplenishment plan', { size: 19, weight: 600, family: A.FD, fill: A.C.amber }).svg, { opacity: A.prog(lt, 10.4, 0.6) * (1 - A.prog(lt, 15.0, 0.5)) });
        s += A.g(A.text(x0 - 46, yT + 10, 'Rebuilt to\nthe target', { size: 19, weight: 700, family: A.FD, fill: A.C.green, anchor: 'end' }).svg, { opacity: A.prog(lt, 15.0, 0.6) });
        return s;
      } },
    { type: 'columns', dur: 14, heading: 'What the money is for',
      items: [
        { h: 'Usually appropriate', tone: 'green', lines: ['Paying members back after an incident', 'Fixing a material weakness', 'Running a continuity plan after an incident'] },
        { h: 'Generally not', tone: 'red', lines: ['Routine projects and upgrades', 'Insurance premiums and levies', 'Penalties on the trustee'] }
      ],
      caption: 'APRA\'s guide gives examples. Since July 2025 the money can also help prevent incidents, not just pay for them.',
      visual: 'Two cards. Usually appropriate: paying members back after an incident, fixing a material weakness, and running a continuity plan after an incident. Generally not: routine projects and upgrades, insurance premiums and levies, and penalties on the trustee.' },
    { type: 'statement', dur: 10, text: 'The target is the trustee\'s call, with a floor.', small: 'APRA\'s guide sets minimum targets that depend on the size of the fund.',
      caption: 'The trustee sets a prudent target from its own risks. APRA\'s guide expects at least a minimum that depends on the fund\'s size.',
      visual: 'A statement: the target is the trustee\'s call, with a floor. APRA\'s guide sets minimum targets that depend on the size of the fund.' },
    { type: 'end', dur: 6, page: 'SPS 114 Operational Risk Financial Requirement', url: '/standards/sps-114.html',
      visual: 'End card with the page title, web address and a general information disclaimer.' }
  ]
};
