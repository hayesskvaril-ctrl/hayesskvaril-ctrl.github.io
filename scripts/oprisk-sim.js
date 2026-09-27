// Operational risk Monte Carlo: simulate many years of losses (Poisson frequency x lognormal severity)
// and show the annual loss distribution with expected loss, VaR and expected shortfall.
(function () {
  var w = document.getElementById('mc-sim');
  if (!w) return;
  var freq = w.querySelector('#mc-freq'), freqOut = w.querySelector('#mc-freq-out');
  var sev = w.querySelector('#mc-sev'), tail = w.querySelector('#mc-tail');
  var run = w.querySelector('#mc-run'), chart = w.querySelector('.mc-chart');
  var table = w.querySelector('.mc-stats tbody'), note = w.querySelector('.mc-note');
  var YEARS = 10000;
  var money = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
  function short(v) {
    if (v >= 1e9) return '$' + (v / 1e9).toFixed(1) + 'b';
    if (v >= 1e6) return '$' + (v / 1e6).toFixed(1) + 'm';
    if (v >= 1e3) return '$' + Math.round(v / 1e3) + 'k';
    return '$' + Math.round(v);
  }
  var seed = 20260927;
  function rng(a) { // mulberry32: small seeded generator so a run can be repeated
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function poisson(lambda, r) { // Knuth's method; fine for the small frequencies used here
    var L = Math.exp(-lambda), k = 0, p = 1;
    do { k++; p *= r(); } while (p > L);
    return k - 1;
  }
  function normal(r) { // Box-Muller
    var u = 1 - r(), v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
  function simulate() {
    var lambda = +freq.value, median = +sev.value, sigma = +tail.value, mu = Math.log(median);
    var r = rng(seed), years = new Float64Array(YEARS), biggest = 0;
    for (var y = 0; y < YEARS; y++) {
      var n = poisson(lambda, r), total = 0;
      for (var i = 0; i < n; i++) {
        var loss = Math.exp(mu + sigma * normal(r));
        total += loss;
        if (loss > biggest) biggest = loss;
      }
      years[y] = total;
    }
    var sorted = Array.prototype.slice.call(years).sort(function (a, b) { return a - b; });
    function q(p) { return sorted[Math.min(YEARS - 1, Math.floor(p * YEARS))]; }
    var mean = sorted.reduce(function (s, v) { return s + v; }, 0) / YEARS;
    var tailStart = Math.floor(0.99 * YEARS), es = 0;
    for (var j = tailStart; j < YEARS; j++) es += sorted[j];
    es /= (YEARS - tailStart);
    var stats = [
      ['Expected (average) annual loss', mean, 'The long-run average cost per year. Often budgeted as a cost of doing business.'],
      ['Median year', q(0.5), 'Half of simulated years were better than this, half worse.'],
      ['1-in-20 year (95th percentile)', q(0.95), 'A bad but not rare year.'],
      ['1-in-100 year (99% VaR)', q(0.99), 'Value-at-risk at 99%: only 1% of years were worse.'],
      ['1-in-1,000 year (99.9% VaR)', q(0.999), 'The confidence level the old Basel advanced approach used for capital.'],
      ['Average of the worst 1% of years (99% expected shortfall)', es, 'How bad things are, on average, once you are past the 99% VaR.'],
      ['Largest single loss event in all simulated years', biggest, 'Shows how one event can dominate a bad year when the tail is heavy.']
    ];
    table.innerHTML = stats.map(function (s) {
      return '<tr><th scope="row">' + s[0] + '</th><td>' + money.format(s[1]) + '</td><td>' + s[2] + '</td></tr>';
    }).join('');
    draw(sorted, mean, q(0.99), q(0.999), q(0.995));
    var ratio = q(0.999) / mean;
    note.textContent = 'In this run, the 1-in-1,000 year is about ' + ratio.toFixed(1) +
      ' times the average year. Switch tail heaviness between Low and High: the extreme years grow much faster than the average does.';
  }
  function draw(sorted, mean, var99, var999, cap) {
    var W = 720, H = 300, L = 56, R = 16, T = 28, B = 46, BINS = 40;
    var max = cap > 0 ? cap : 1, width = max / BINS, counts = new Array(BINS).fill(0), over = 0;
    sorted.forEach(function (v) {
      if (v >= max) { over++; return; }
      counts[Math.floor(v / width)]++;
    });
    var top = Math.max.apply(null, counts) || 1;
    var x = function (v) { return L + (W - L - R) * v / max; };
    var h = function (c) { return (H - T - B) * c / top; };
    var bw = (W - L - R) / BINS;
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-labelledby="mc-t mc-d">' +
      '<title id="mc-t">Distribution of simulated annual operational losses</title>' +
      '<desc id="mc-d">Histogram of ' + YEARS.toLocaleString('en-AU') + ' simulated years. Most years cluster at the low end; a long tail stretches to the right. ' +
      'Expected loss ' + short(mean) + ', 99% VaR ' + short(var99) + ', 99.9% VaR ' + short(var999) + '. The full figures are in the table below the chart.</desc>';
    for (var g = 0; g <= 4; g++) { // recessive gridlines
      var gy = H - B - (H - T - B) * g / 4;
      s += '<line class="mc-grid" x1="' + L + '" x2="' + (W - R) + '" y1="' + gy + '" y2="' + gy + '"/>' +
        '<text class="mc-axis" x="' + (L - 8) + '" y="' + (gy + 4) + '" text-anchor="end">' + (100 * top * g / 4 / YEARS).toFixed(1) + '%</text>';
    }
    counts.forEach(function (c, i) {
      if (!c) return;
      var bh = Math.max(1, h(c)), bx = L + i * bw + 1, by = H - B - bh;
      s += '<rect class="mc-bar" x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + (bw - 2).toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="2">' +
        '<title>' + short(i * width) + ' to ' + short((i + 1) * width) + ': ' + (100 * c / YEARS).toFixed(1) + '% of years</title></rect>';
    });
    s += '<line class="mc-base" x1="' + L + '" x2="' + (W - R) + '" y1="' + (H - B) + '" y2="' + (H - B) + '"/>';
    for (var t = 0; t <= 4; t++) {
      var tv = max * t / 4;
      s += '<text class="mc-axis" x="' + x(tv) + '" y="' + (H - B + 18) + '" text-anchor="' + (t === 4 ? 'end' : t === 0 ? 'start' : 'middle') + '">' + short(tv) + '</text>';
    }
    s += '<text class="mc-axis" x="' + ((L + W - R) / 2) + '" y="' + (H - 6) + '" text-anchor="middle">Total operational losses in a year</text>';
    function marker(v, label, cls, row) {
      if (v >= max) return;
      var mx = x(v), ly = T - 10 + row * 16;
      s += '<line class="mc-mark ' + cls + '" x1="' + mx + '" x2="' + mx + '" y1="' + (ly + 4) + '" y2="' + (H - B) + '"/>' +
        '<text class="mc-label" x="' + (mx + 4) + '" y="' + ly + '">' + label + ' ' + short(v) + '</text>';
    }
    marker(mean, 'Expected loss', 'mc-mean', 0);
    marker(var99, '99% VaR', 'mc-var', 1);
    s += '<text class="mc-axis" x="' + (W - R) + '" y="' + (T + 30) + '" text-anchor="end">' +
      (over ? 'Worst ' + (100 * over / YEARS).toFixed(1) + '% of years are off the chart (up to ' + short(sorted[sorted.length - 1]) + ')' : '') + '</text>';
    s += '</svg>';
    chart.innerHTML = s;
  }
  freq.addEventListener('input', function () { freqOut.textContent = freq.value; });
  [freq, sev, tail].forEach(function (el) { el.addEventListener('change', simulate); });
  run.addEventListener('click', function () { seed = (Math.random() * 4294967296) >>> 0; simulate(); });
  freqOut.textContent = freq.value;
  simulate();
})();
