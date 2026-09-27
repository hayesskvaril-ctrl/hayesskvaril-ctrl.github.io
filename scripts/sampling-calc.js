// Attribute sampling calculator (binomial): plan a sample size, and evaluate results as an
// upper deviation limit at a chosen confidence level.
(function () {
  function binomCdf(k, n, p) { // P(X <= k), X ~ Binomial(n, p)
    if (p <= 0) return 1;
    if (p >= 1) return k >= n ? 1 : 0;
    var term = Math.pow(1 - p, n), sum = term;
    for (var i = 1; i <= k; i++) {
      term *= (n - i + 1) / i * p / (1 - p);
      sum += term;
    }
    return Math.min(1, sum);
  }
  function sampleSize(conf, tol, k) {
    for (var n = k + 1; n <= 5000; n++) if (binomCdf(k, n, tol) <= 1 - conf) return n;
    return null;
  }
  function upperLimit(n, d, conf) { // exact (Clopper-Pearson style) one-sided upper bound
    if (d >= n) return 1;
    var lo = 0, hi = 1;
    for (var i = 0; i < 60; i++) {
      var mid = (lo + hi) / 2;
      if (binomCdf(d, n, mid) > 1 - conf) lo = mid; else hi = mid;
    }
    return hi;
  }
  var pct = function (v) { return (100 * v).toFixed(1).replace(/\.0$/, '') + '%'; };

  var plan = document.getElementById('samp-plan');
  if (plan) {
    var pc = plan.querySelector('#sp-conf'), pt = plan.querySelector('#sp-tol'), pk = plan.querySelector('#sp-k'), po = plan.querySelector('.result');
    var run = function () {
      var conf = +pc.value, tol = +pt.value, k = +pk.value, n = sampleSize(conf, tol, k);
      po.textContent = n === null ? 'Sample size too large to calculate here.' :
        'Test ' + n + ' items. If you find ' + (k === 0 ? 'no deviations' : 'no more than ' + k + ' deviation' + (k > 1 ? 's' : '')) +
        ', you can be ' + pct(conf) + ' confident that the control\'s true deviation rate is no higher than ' + pct(tol) + '.' +
        (k === 0 ? ' Finding even one deviation means the conclusion can\'t be reached with this sample.' : '');
    };
    [pc, pt, pk].forEach(function (el) { el.addEventListener('change', run); });
    run();
  }

  var ev = document.getElementById('samp-eval');
  if (ev) {
    var en = ev.querySelector('#se-n'), ed = ev.querySelector('#se-d'), ec = ev.querySelector('#se-conf'), et = ev.querySelector('#se-tol'), eo = ev.querySelector('.result');
    var check = function () {
      var n = parseInt(en.value, 10), d = parseInt(ed.value, 10), conf = +ec.value, tol = +et.value;
      if (isNaN(n) || isNaN(d) || n < 1 || d < 0 || d > n) { eo.textContent = 'Enter a sample size of at least 1 and a number of deviations between 0 and the sample size.'; return; }
      var u = upperLimit(n, d, conf);
      eo.textContent = 'Observed deviation rate ' + pct(d / n) + '. Upper deviation limit at ' + pct(conf) + ' confidence: ' + pct(u) + '. ' +
        (u <= tol ? 'This is within the tolerable rate of ' + pct(tol) + ', so the results support reliance on the control (subject to reviewing each deviation\'s cause).' :
          'This exceeds the tolerable rate of ' + pct(tol) + ', so the results do not support reliance on the control at this confidence level.');
    };
    [en, ed, ec, et].forEach(function (el) { el.addEventListener('input', check); el.addEventListener('change', check); });
    check();
  }
})();
