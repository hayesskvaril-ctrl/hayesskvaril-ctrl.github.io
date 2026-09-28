// Fault tree calculator (root cause analysis page). Two failure paths, each needing a cause AND a failed control.
// Assumes independent events; illustrative only.
(function () {
  var w = document.getElementById('fault-tree');
  if (!w) return;
  var ids = ['ft-a', 'ft-ac', 'ft-b', 'ft-bc'];
  var el = {}; ids.forEach(function (i) { el[i] = w.querySelector('#' + i); });
  var out = w.querySelector('.result');
  function pct(x) { return (x * 100).toFixed(x < 0.01 ? 2 : 1) + '%'; }
  function val(i) { var v = parseFloat(el[i].value) / 100; return isNaN(v) ? 0 : Math.min(Math.max(v, 0), 1); }
  function top(a, ac, b, bc) { var p1 = a * ac, p2 = b * bc; return { p1: p1, p2: p2, t: 1 - (1 - p1) * (1 - p2) }; }
  function update() {
    ids.forEach(function (i) { w.querySelector('output[for="' + i + '"]').textContent = el[i].value + '%'; });
    var a = val('ft-a'), ac = val('ft-ac'), b = val('ft-b'), bc = val('ft-bc');
    var r = top(a, ac, b, bc);
    var opts = [
      ['halve the chance of a configuration error', top(a / 2, ac, b, bc).t],
      ['halve the reconciliation failure rate', top(a, ac / 2, b, bc).t],
      ['halve the chance of an override error', top(a, ac, b / 2, bc).t],
      ['halve the review failure rate', top(a, ac, b, bc / 2).t]
    ].sort(function (x, y) { return x[1] - y[1]; });
    out.innerHTML = 'Path 1 (configuration error AND reconciliation misses it): <strong>' + pct(r.p1) + '</strong><br>' +
      'Path 2 (override error AND review misses it): <strong>' + pct(r.p2) + '</strong><br>' +
      'Top event, members charged the wrong fee in a year (path 1 OR path 2): <strong>' + pct(r.t) + '</strong><br>' +
      '<span class="small">Biggest single improvement: ' + opts.filter(function (o) { return Math.abs(o[1] - opts[0][1]) < 1e-12; }).map(function (o) { return o[0]; }).join(', or ') +
      ' (top event falls to ' + pct(opts[0][1]) + '). Within one path, halving the cause or halving the control failure has the same effect, because the probabilities multiply.</span>';
  }
  ids.forEach(function (i) { el[i].addEventListener('input', update); });
  update();
})();
