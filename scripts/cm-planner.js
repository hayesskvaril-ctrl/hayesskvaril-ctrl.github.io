// Risk-based compliance monitoring planner (compliance monitoring and testing page). Illustrative scoring.
(function () {
  var w = document.getElementById('cm-planner');
  if (!w) return;
  var ROWS = [
    ['Fee deductions match the PDS', 4, 14, true],
    ['Insurance premiums deducted correctly', 3, 20, false],
    ['Rollovers paid within legal timeframes', 3, 8, false],
    ['Complaints answered within IDR timeframes', 3, 6, true],
    ['Breach reports lodged on time', 4, 12, false],
    ['DDO monitoring and reporting', 2, 26, false],
    ['Marketing reviewed before release', 3, 30, true],
    ['Privacy access requests handled on time', 2, 10, false]
  ];
  var RISK = ['Low', 'Medium', 'High', 'Extreme'];
  var tb = w.querySelector('tbody'), out = w.querySelector('.cm-plan');
  tb.innerHTML = ROWS.map(function (r, i) {
    return '<tr><th scope="row">' + r[0] + '</th>' +
      '<td><label class="visually-hidden" for="cm-r' + i + '">Inherent risk: ' + r[0] + '</label><select id="cm-r' + i + '">' + RISK.map(function (x, k) { return '<option value="' + (k + 1) + '"' + (k + 1 === r[1] ? ' selected' : '') + '>' + x + '</option>'; }).join('') + '</select></td>' +
      '<td><label class="visually-hidden" for="cm-m' + i + '">Months since last tested: ' + r[0] + '</label><input type="number" min="0" max="120" id="cm-m' + i + '" value="' + r[2] + '"></td>' +
      '<td><label class="visually-hidden" for="cm-c' + i + '">Recent change or incidents: ' + r[0] + '</label><input type="checkbox" id="cm-c' + i + '"' + (r[3] ? ' checked' : '') + '></td></tr>';
  }).join('');
  function update() {
    var res = ROWS.map(function (r, i) {
      var risk = parseInt(w.querySelector('#cm-r' + i).value, 10);
      var m = parseFloat(w.querySelector('#cm-m' + i).value); if (isNaN(m) || m < 0) m = 0;
      var c = w.querySelector('#cm-c' + i).checked;
      var score = risk * 2 + Math.min(m, 36) / 6 + (c ? 3 : 0);
      var freq = score >= 12 ? 'Continuous monitoring or quarterly testing' : score >= 9 ? 'Test this year (half-yearly)' : score >= 6 ? 'Test this year' : 'Every two years, with monitoring';
      return { name: r[0], score: score, freq: freq };
    }).sort(function (a, b) { return b.score - a.score; });
    out.innerHTML = '<ol>' + res.map(function (r) { return '<li><strong>' + r.name + '</strong>: ' + r.freq + ' <span class="small">(priority score ' + r.score.toFixed(1) + ')</span></li>'; }).join('') + '</ol>';
  }
  w.addEventListener('input', update); w.addEventListener('change', update);
  update();
})();
