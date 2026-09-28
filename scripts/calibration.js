// Calibration exercise (human factors and bias page): give a 90% confidence range for each question.
(function () {
  var w = document.getElementById('calibration');
  if (!w) return;
  var Q = [
    ['Length of the Murray River (km)', 2508],
    ['Height of Mount Kosciuszko (metres)', 2228],
    ['Australia\'s population at the 2021 Census (millions)', 25.4],
    ['Year the superannuation guarantee was introduced', 1992],
    ['Year the Reserve Bank of Australia began operating as the central bank', 1960],
    ['Year Australia switched to decimal currency', 1966],
    ['Year the Sydney Harbour Bridge opened', 1932],
    ['Year APRA was established', 1998]
  ];
  var list = w.querySelector('.cal-list'), btn = w.querySelector('.cal-check'), out = w.querySelector('.result');
  list.innerHTML = Q.map(function (q, i) {
    return '<fieldset class="cal-q"><legend>' + (i + 1) + '. ' + q[0] + '</legend>' +
      '<label>Low <input type="number" step="any" id="cal-lo-' + i + '"></label> ' +
      '<label>High <input type="number" step="any" id="cal-hi-' + i + '"></label>' +
      '<span class="cal-ans small" aria-live="polite"></span></fieldset>';
  }).join('');
  btn.addEventListener('click', function () {
    var hits = 0, answered = 0;
    Q.forEach(function (q, i) {
      var lo = parseFloat(w.querySelector('#cal-lo-' + i).value), hi = parseFloat(w.querySelector('#cal-hi-' + i).value);
      var span = w.querySelectorAll('.cal-ans')[i];
      if (isNaN(lo) || isNaN(hi)) { span.textContent = ' Answer: ' + q[1]; return; }
      if (lo > hi) { var t = lo; lo = hi; hi = t; }
      answered++;
      var ok = q[1] >= lo && q[1] <= hi; if (ok) hits++;
      span.textContent = (ok ? ' ✓ inside your range. ' : ' ✗ outside your range. ') + 'Answer: ' + q[1];
    });
    if (!answered) { out.textContent = 'Enter a low and high value for at least one question.'; return; }
    var expected = Math.round(answered * 0.9 * 10) / 10;
    out.innerHTML = 'Your ranges contained the answer <strong>' + hits + ' of ' + answered + '</strong> times. A well-calibrated person would expect about ' + expected + '. ' +
      (hits < answered * 0.9 - 1 ? 'Like most people, your ranges were too narrow: you were more confident than your knowledge justified. Risk assessments made the same way understate uncertainty.' :
        'That is well calibrated. Most people score much lower on first attempt, so this is worth trying with your risk team.');
  });
})();
