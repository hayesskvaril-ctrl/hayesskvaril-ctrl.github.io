// KRI control chart (KRI design and thresholds page). Illustrative data; baseline = first 12 months.
(function () {
  var w = document.getElementById('kri-chart');
  if (!w) return;
  var DATA = [42, 38, 45, 40, 36, 44, 41, 39, 47, 43, 40, 44, 44, 45, 44, 46, 45, 47, 46, 47, 48, 47, 49, 48];
  var MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  var label = function (i) { return MONTHS[i % 12] + ' ' + (i < 6 ? '24' : i < 18 ? '25' : '26'); };
  var sel = w.querySelector('#kc-method'), runBox = w.querySelector('#kc-runs');
  var plot = w.querySelector('.kc-plot'), out = w.querySelector('.result'), tbody = w.querySelector('tbody');
  var base = DATA.slice(0, 12);
  var mean = base.reduce(function (a, b) { return a + b; }, 0) / base.length;
  var sd = Math.sqrt(base.reduce(function (a, b) { return a + (b - mean) * (b - mean); }, 0) / (base.length - 1));
  function pctile(arr, p) { var s = arr.slice().sort(function (a, b) { return a - b; }); var i = (s.length - 1) * p, lo = Math.floor(i); return s[lo] + (s[Math.ceil(i)] - s[lo]) * (i - lo); }
  function limits(m) {
    if (m === 'sd2') return { amber: mean + sd, red: mean + 2 * sd, note: 'Amber at mean + 1σ, red at mean + 2σ of the first 12 months.' };
    if (m === 'sd3') return { amber: mean + 2 * sd, red: mean + 3 * sd, note: 'Amber at mean + 2σ, red at mean + 3σ (classic control limits).' };
    if (m === 'pct') return { amber: pctile(base, 0.9), red: pctile(base, 0.99), note: 'Amber at the 90th and red at the 99th percentile of the first 12 months.' };
    return { amber: 50, red: 55, note: 'Amber at 50 and red at 55: fixed limits taken from the risk appetite statement, not from history.' };
  }
  function run() {
    var m = sel.value, L = limits(m), useRuns = runBox.checked;
    var flags = DATA.map(function (v, i) {
      var f = [];
      if (v >= L.red) f.push('red limit'); else if (v >= L.amber) f.push('amber trigger');
      if (useRuns && i >= 7 && DATA.slice(i - 7, i + 1).every(function (x) { return x > mean; }) && !(i >= 8 && DATA.slice(i - 8, i).every(function (x) { return x > mean; }))) f.push('run rule: 8 in a row above the mean');
      return f;
    });
    draw(L, flags);
    var firstLimit = flags.findIndex(function (f) { return f.some(function (x) { return x !== 'run rule: 8 in a row above the mean'; }); });
    var firstRun = flags.findIndex(function (f) { return f.indexOf('run rule: 8 in a row above the mean') >= 0; });
    out.innerHTML = '<span class="small">' + L.note + ' Baseline mean ' + mean.toFixed(1) + ', standard deviation ' + sd.toFixed(1) + '.</span><br>' +
      'First month at or above a threshold: <strong>' + (firstLimit < 0 ? 'none in 24 months' : label(firstLimit)) + '</strong>' +
      (useRuns ? '<br>Run rule first signals a sustained shift: <strong>' + (firstRun < 0 ? 'no signal' : label(firstRun)) + '</strong>' : '');
    tbody.innerHTML = DATA.map(function (v, i) { return '<tr><td>' + label(i) + '</td><td>' + v + '</td><td>' + (flags[i].length ? '▲ ' + flags[i].join('; ') : '—') + '</td></tr>'; }).join('');
  }
  function draw(L, flags) {
    var W = 680, H = 280, pl = 40, pr = 104, pt = 14, pb = 34;
    var lo = 30, hi = Math.max(60, Math.ceil(L.red + 3));
    var x = function (i) { return pl + i * (W - pl - pr) / (DATA.length - 1); };
    var y = function (v) { return pt + (hi - v) * (H - pt - pb) / (hi - lo); };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Monthly processing errors over 24 months, with threshold lines. A data table follows.">';
    for (var g = lo; g <= hi; g += 10) s += '<line x1="' + pl + '" x2="' + (W - pr) + '" y1="' + y(g) + '" y2="' + y(g) + '" stroke="rgba(148,163,184,0.18)"/><text x="' + (pl - 6) + '" y="' + (y(g) + 4) + '" text-anchor="end" font-size="11" fill="#94a3b8">' + g + '</text>';
    [0, 6, 12, 18, 23].forEach(function (i) { s += '<text x="' + x(i) + '" y="' + (H - 12) + '" text-anchor="middle" font-size="11" fill="#94a3b8">' + label(i) + '</text>'; });
    s += '<line x1="' + x(11.5) + '" x2="' + x(11.5) + '" y1="' + pt + '" y2="' + (H - pb) + '" stroke="rgba(148,163,184,0.35)" stroke-dasharray="2 4"/><text x="' + (x(11.5) - 4) + '" y="' + (pt + 10) + '" text-anchor="end" font-size="10.5" fill="#94a3b8">baseline</text>';
    function hline(v, col, dash, txt) { s += '<line x1="' + pl + '" x2="' + (W - pr) + '" y1="' + y(v) + '" y2="' + y(v) + '" stroke="' + col + '" stroke-width="1.5"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/><text x="' + (W - pr + 6) + '" y="' + (y(v) + 4) + '" font-size="11" fill="#cbd5e1">' + txt + '</text>'; }
    hline(mean, 'rgba(203,213,225,0.55)', '', 'mean ' + mean.toFixed(1));
    hline(L.amber, '#fbbf24', '6 4', 'amber ' + L.amber.toFixed(1));
    hline(L.red, '#f87171', '6 4', 'red ' + L.red.toFixed(1));
    s += '<polyline fill="none" stroke="#2f9bd6" stroke-width="2" stroke-linejoin="round" points="' + DATA.map(function (v, i) { return x(i) + ',' + y(v); }).join(' ') + '"/>';
    DATA.forEach(function (v, i) {
      var f = flags[i], col = f.indexOf('red limit') >= 0 ? '#f87171' : f.indexOf('amber trigger') >= 0 ? '#fbbf24' : f.length ? '#e2e8f0' : '#2f9bd6';
      s += '<g class="kc-pt" tabindex="0"><title>' + label(i) + ': ' + v + (f.length ? ' (' + f.join('; ') + ')' : '') + '</title>' +
        '<circle cx="' + x(i) + '" cy="' + y(v) + '" r="12" fill="transparent"/>' +
        '<circle cx="' + x(i) + '" cy="' + y(v) + '" r="' + (f.length ? 5 : 4) + '" fill="' + col + '" stroke="#0c1424" stroke-width="2"/></g>';
    });
    plot.innerHTML = s + '</svg>';
  }
  sel.addEventListener('change', run); runBox.addEventListener('change', run);
  run();
})();
