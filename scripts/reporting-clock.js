// Illustrative "reporting clock" for incidents and breaches.
// Shows indicative deadlines from a single start date/time. Each regime defines its
// own trigger, so real clocks may start at different times.
(function () {
  var w = document.getElementById('clock');
  if (!w) return;
  var input = w.querySelector('#clock-start');
  var out = w.querySelector('.clock-results');

  var now = new Date();
  now.setMinutes(0, 0, 0);
  var pad = function (n) { return String(n).padStart(2, '0'); };
  input.value = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate()) + 'T' + pad(now.getHours()) + ':00';

  function addHours(d, h) { return new Date(d.getTime() + h * 3600 * 1000); }
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  var fmt = new Intl.DateTimeFormat('en-AU', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });
  var fmtDate = new Intl.DateTimeFormat('en-AU', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  var CLOCKS = [
    { name: 'APRA: disruption to a critical operation outside tolerance (CPS 230)', calc: function (d) { return addHours(d, 24); }, time: true, rule: 'As soon as possible, no later than 24 hours' },
    { name: 'APRA: material operational risk incident (CPS 230)', calc: function (d) { return addHours(d, 72); }, time: true, rule: 'As soon as possible, no later than 72 hours after becoming aware' },
    { name: 'APRA: material information security incident (CPS 234)', calc: function (d) { return addHours(d, 72); }, time: true, rule: 'As soon as possible, no later than 72 hours after becoming aware' },
    { name: 'ASIC: reportable situation (AFS and credit licensees)', calc: function (d) { return addDays(d, 30); }, time: false, rule: 'Within 30 calendar days after first knowing, or being reckless about whether, there are reasonable grounds to believe a reportable situation has arisen' },
    { name: 'OAIC: assess a suspected eligible data breach', calc: function (d) { return addDays(d, 30); }, time: false, rule: 'Reasonable and expeditious assessment, generally within 30 days of becoming aware of grounds for suspicion. If eligible, notify as soon as practicable' },
    { name: 'ASIC: investigation into a possible reportable situation', calc: function (d) { return addDays(d, 60); }, time: false, rule: 'Becomes reportable if it continues for more than 60 days (under ASIC relief), and must then be reported within 30 days' }
  ];

  function render() {
    var start = new Date(input.value);
    if (isNaN(start)) { out.innerHTML = '<p>Enter a valid date and time.</p>'; return; }
    var rows = CLOCKS.map(function (c) { return { c: c, due: c.calc(start) }; })
      .sort(function (a, b) { return a.due - b.due; });
    out.innerHTML = '<ol class="clock-list">' + rows.map(function (r) {
      return '<li><span class="clock-due">' + (r.c.time ? fmt.format(r.due) : fmtDate.format(r.due)) + '</span>' +
        '<span class="clock-name">' + r.c.name + '</span>' +
        '<span class="clock-rule">' + r.c.rule + '</span></li>';
    }).join('') + '</ol>';
  }
  input.addEventListener('input', render);
  render();
})();
