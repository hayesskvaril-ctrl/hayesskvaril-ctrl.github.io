window.RL_SPEC = {
  title: 'The denominator effect in super',
  label: 'Explainer · Risk management · Advanced',
  section: 'Risk management', level: 'Advanced',
  desc: 'How falling listed markets, slow-moving unlisted valuations and member outflows push up the share of unlisted assets, and why it matters for fairness.',
  pages: ['/risk-management/super-liquidity-stress-testing.html', '/standards/sps-530.html'],
  scenes: [
    { type: 'title', dur: 5, tag: 'EXPLAINER · RISK MANAGEMENT · ADVANCED', title: 'The denominator effect', subtitle: 'Liquidity and fairness in super',
      visual: 'Title card: The denominator effect, liquidity and fairness in super.' },
    { type: 'statement', dur: 8, text: 'Your unlisted share can grow without buying anything.', small: 'When listed markets fall faster than unlisted assets are revalued.',
      caption: 'Unlisted assets like property and infrastructure are revalued slowly. Listed markets reprice every day.',
      visual: 'A statement: your unlisted share can grow without buying anything.' },
    { type: 'custom', dur: 24, heading: 'A Balanced option under stress',
      captions: [[0, 'Start with $100: $5 in cash, $70 in listed assets and $25 unlisted, against a strategic maximum of 30% unlisted.'],
        [8, 'Listed markets fall 30%, but unlisted valuations fall only 5% so far. Unlisted is now about 30.5% of the option.'],
        [16, 'Members switch and leave, and $15 is paid out from liquid assets. Unlisted is now about 37.8%, well above the maximum.']],
      visual: 'Three stacked bars. Before: cash 5, listed 70, unlisted 25, unlisted share 25 percent. After the market fall: cash 5, listed 49, unlisted 23.75, unlisted share 30.5 percent. After outflows of 15 paid from liquid assets: liquid 39, unlisted 23.75, unlisted share 37.8 percent, above a dashed line marking the 30 percent maximum.',
      draw: function (lt, A) {
        var s = '', base = 520, scale = 3.3, bw = 190;
        var stages = [
          { at: 0.5, label: 'Before', cash: 5, listed: 70, unl: 25 },
          { at: 8.3, label: 'After the fall', cash: 5, listed: 49, unl: 23.75 },
          { at: 16.3, label: 'After outflows', cash: 0, listed: 39, unl: 23.75 }
        ];
        stages.forEach(function (st, i) {
          var p = A.prog(lt, st.at, 1.0), x = 250 + i * 290, y = base, tot = st.cash + st.listed + st.unl, share = st.unl / tot * 100;
          var seg = function (v, col, lab) {
            var h = v * scale; y -= h;
            var r = h > 0 ? '<rect x="' + x + '" y="' + y + '" width="' + bw + '" height="' + Math.max(0, h - 2) + '" rx="6" fill="' + col + '" opacity="0.88"/>' : '';
            if (h > 26) r += A.text(x + bw / 2, y + h / 2 - 12, lab + ' ' + (Math.round(v * 100) / 100), { size: 19, weight: 700, fill: '#1d1d1f', anchor: 'middle' }).svg;
            return r;
          };
          var inner = seg(st.unl, '#a78bfa', 'Unlisted') + seg(st.listed, '#7cb7ff', i === 2 ? 'Liquid' : 'Listed') + seg(st.cash, '#34d399', 'Cash');
          inner += A.text(x + bw / 2, base + 14, st.label, { size: 21, weight: 700, family: A.FD, fill: A.C.heading, anchor: 'middle' }).svg;
          inner += A.text(x + bw / 2, y - 44, (Math.round(share * 10) / 10) + '% unlisted', { size: 22, weight: 700, family: A.FD, fill: share > 30 ? A.C.red : A.C.violet, anchor: 'middle' }).svg;
          s += A.g(inner, { opacity: p });
        });
        return s;
      } },
    { type: 'statement', dur: 11, text: 'Stale valuations can transfer value between members.', size: 38,
      small: 'If unit prices don\'t reflect the likely fall in unlisted values, people leaving are paid too much, and people who stay bear the difference.',
      caption: 'That is why liquidity management and valuation governance are linked: both are about paying members fairly.',
      visual: 'A statement: stale valuations can transfer value between members.' },
    { type: 'columns', dur: 13, heading: 'What funds do about it',
      items: [
        { h: 'Stress test', tone: 'cyan', lines: ['Switching, rollovers and currency hedge calls together', 'Over days and weeks, not just a year'] },
        { h: 'Revalue', tone: 'violet', lines: ['Trigger revaluations after market shocks', 'Strong valuation governance'] },
        { h: 'Plan', tone: 'green', lines: ['Buffers, rebalancing rules and decision rights set in advance'] }
      ],
      caption: 'SPS 530 requires liquidity stress testing at least annually, as part of a comprehensive stress testing program.',
      visual: 'Three cards: stress test, revalue and plan.' },
    { type: 'end', dur: 6, page: 'Liquidity stress testing for super funds', url: '/risk-management/super-liquidity-stress-testing.html',
      visual: 'End card with the page title, web address and a general information disclaimer.' }
  ]
};
