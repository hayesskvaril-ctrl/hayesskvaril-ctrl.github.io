window.RL_SPEC = {
  title: 'Root causes: Swiss cheese and fault trees',
  label: 'Explainer · Risk management · Advanced',
  section: 'Risk management', level: 'Advanced',
  desc: 'Why “human error” is rarely a root cause, James Reason\'s Swiss cheese model, and how fault trees show which controls matter most.',
  pages: ['/risk-management/root-cause-analysis.html', '/risk-management/incident-and-breach-management.html'],
  scenes: [
    { type: 'title', dur: 5, tag: 'EXPLAINER · RISK MANAGEMENT · ADVANCED', title: 'Root causes', subtitle: 'Swiss cheese and fault trees',
      visual: 'Title card: Root causes, Swiss cheese and fault trees.' },
    { type: 'statement', dur: 8, text: '“Human error” is rarely a root cause.', small: 'Ask why the error was possible, and why nothing caught it.',
      caption: 'Many incident reviews stop at the person. Good analysis keeps asking why until it reaches causes the organisation can fix.',
      visual: 'A statement: human error is rarely a root cause.' },
    { type: 'custom', dur: 16, heading: 'The Swiss cheese model',
      captions: [[0, 'Psychologist James Reason pictured defences as slices of Swiss cheese. Every layer has holes.'],
        [8, 'An incident happens when holes in several layers line up. Many holes are latent conditions built in long before.']],
      visual: 'Four slices of cheese labelled design, controls, supervision and people, each with holes. The holes line up and an arrow passes through all four to an incident.',
      draw: function (lt, A) {
        var s = '', names = ['Design', 'Controls', 'Supervision', 'People'], align = A.prog(lt, 6.5, 2.2);
        var holes = [[[40, 90], [120, 190]], [[60, 250], [150, 110]], [[30, 150], [110, 60]], [[80, 210], [140, 120]]];
        var target = 150;
        names.forEach(function (n, i) {
          var p = A.prog(lt, 0.6 + i * 1.1, 0.7), x = 250 + i * 190, y = 170;
          var slice = '<path d="M' + x + ',' + (y + 20) + ' q60,-30 110,0 l0,300 q-55,-26 -110,0 z" fill="#f5c542" fill-opacity="0.9" stroke="#fbbf24" stroke-width="2"/>';
          holes[i].forEach(function (hPos, k) {
            var hy = hPos[1] + (k === 0 ? (target - hPos[1]) * align : 0);
            slice += '<ellipse cx="' + (x + 30 + hPos[0] * 0.35) + '" cy="' + (y + 20 + hy) + '" rx="18" ry="24" fill="#fbfbfd"/>';
          });
          slice += A.text(x + 55, y + 340, n, { size: 21, weight: 700, family: A.FD, fill: A.C.heading, anchor: 'middle' }).svg;
          s += A.g(slice, { opacity: p, dy: (1 - p) * 20 });
        });
        var pa = A.prog(lt, 9.2, 2.4);
        if (pa > 0) s += A.arrow(150, 190 + target, 150 + 1000 * pa, 190 + target, pa, '#ff3b30', 5);
        s += A.g(A.text(1180, 270, 'Incident', { size: 24, weight: 700, family: A.FD, fill: A.C.red, anchor: 'end' }).svg, { opacity: A.prog(lt, 11.4, 0.6) });
        s += A.g(A.text(150, 140, 'Hazard', { size: 21, weight: 700, family: A.FD, fill: A.C.red }).svg, { opacity: A.prog(lt, 8.8, 0.6) });
        return s;
      } },
    { type: 'custom', dur: 18, heading: 'A fault tree, with numbers',
      captions: [[0, 'A fault tree works down from the event. Each path needs a cause AND a failed control. Either path causes the event.'],
        [9, 'Through an AND gate, probabilities multiply. So a reliable detective control can matter as much as preventing the cause.']],
      visual: 'A fault tree. Top event: members charged the wrong fee, 22 percent a year. Below an OR gate, two paths. Path one: configuration error 30 percent AND reconciliation misses it 60 percent, giving 18 percent. Path two: override error 50 percent AND review misses it 10 percent, giving 5 percent.',
      draw: function (lt, A) {
        var s = '', box = function (x, y, w, h, t1, t2, tn, p) {
          return A.g(A.card(x, y, w, h, tn) + A.text(x + w / 2, y + 12, t1, { size: 19, weight: 700, family: A.FD, fill: A.tone(tn).accent, anchor: 'middle', maxW: w - 20, lh: 23 }).svg +
            A.text(x + w / 2, y + h - 34, t2, { size: 22, weight: 700, family: A.FD, fill: A.C.heading, anchor: 'middle' }).svg, { opacity: p });
        };
        var p0 = A.prog(lt, 0.5, 0.6), p1 = A.prog(lt, 2.5, 0.6), p2 = A.prog(lt, 4.5, 0.6), p3 = A.prog(lt, 6.8, 0.6), p4 = A.prog(lt, 8.8, 0.6);
        s += box(470, 138, 340, 86, 'Members charged the wrong fee', '22.1% a year', 'red', p4);
        s += A.g('<line x1="640" y1="224" x2="640" y2="240" stroke="#5e5ce6" stroke-width="2"/><rect x="612" y="240" width="56" height="28" rx="14" fill="#efeffd" stroke="#5e5ce6" stroke-width="2"/>' +
          A.text(640, 245, 'OR', { size: 15, weight: 700, family: A.FM, fill: A.C.violet, anchor: 'middle' }).svg +
          '<line x1="626" y1="268" x2="360" y2="300" stroke="#5e5ce6" stroke-width="2"/><line x1="654" y1="268" x2="920" y2="300" stroke="#5e5ce6" stroke-width="2"/>', { opacity: p3 });
        s += box(230, 300, 260, 70, 'Path 1', '18%', 'amber', p3);
        s += box(790, 300, 260, 70, 'Path 2', '5%', 'amber', p3);
        [[360, 'AND'], [920, 'AND']].forEach(function (a) {
          s += A.g('<rect x="' + (a[0] - 26) + '" y="382" width="52" height="26" rx="13" fill="#e6f4f8" stroke="#0077a8" stroke-width="2"/>' + A.text(a[0], 386, a[1], { size: 14, weight: 700, family: A.FM, fill: A.C.cyan, anchor: 'middle' }).svg +
            '<line x1="' + a[0] + '" y1="370" x2="' + a[0] + '" y2="382" stroke="#0077a8" stroke-width="2"/><line x1="' + (a[0] - 14) + '" y1="408" x2="' + (a[0] - 135) + '" y2="428" stroke="#0077a8" stroke-width="2"/><line x1="' + (a[0] + 14) + '" y1="408" x2="' + (a[0] + 135) + '" y2="428" stroke="#0077a8" stroke-width="2"/>', { opacity: p2 });
        });
        s += box(100, 428, 250, 110, 'Configuration\nerror', '30%', 'blue', p0);
        s += box(370, 428, 250, 110, 'Reconciliation\nmisses it', '60%', 'cyan', p1);
        s += box(660, 428, 250, 110, 'Override\nerror', '50%', 'blue', p0);
        s += box(930, 428, 250, 110, 'Review\nmisses it', '10%', 'cyan', p1);
        return s;
      } },
    { type: 'columns', dur: 12, heading: 'Strong and weak actions',
      items: [
        { h: 'Weaker', tone: 'red', lines: ['Reminders and emails', 'Retraining on its own', 'Updating a procedure nobody reads'] },
        { h: 'Stronger', tone: 'green', lines: ['Remove the hazard or automate the step', 'Forcing functions and system checks', 'Independent detective controls, tested'] }
      ],
      caption: 'Strong actions change the system. Then check the fix works, and look for the same cause elsewhere.',
      visual: 'Two cards compare weaker actions, such as reminders, with stronger actions, such as automation and independent checks.' },
    { type: 'end', dur: 6, page: 'Root cause analysis: techniques and pitfalls', url: '/risk-management/root-cause-analysis.html',
      visual: 'End card with the page title, web address and a general information disclaimer.' }
  ]
};
