// Maximum civil penalty calculator (enforcement and penalties page).
// Corporations Act s 1317G (and the equivalent ASIC Act rule) for contraventions after 13 March 2019. Simplified and illustrative.
(function () {
  var w = document.getElementById('max-penalty');
  if (!w) return;
  var PU = 364; // Commonwealth penalty unit from 1 July 2026 (Crimes Act s 4AA)
  var who = w.querySelector('#mp-who'), ben = w.querySelector('#mp-benefit'), turn = w.querySelector('#mp-turnover');
  var turnRow = w.querySelector('.mp-turnover-row'), out = w.querySelector('.result');
  var fmt = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
  function num(el) { var v = parseFloat(el.value); return isNaN(v) || v < 0 ? 0 : v * 1e6; }
  function update() {
    var corp = who.value === 'corp';
    turnRow.hidden = !corp;
    var b = num(ben), rows = [], max;
    if (corp) {
      var t = num(turn), fixed = 50000 * PU, triple = 3 * b, tenPct = 0.1 * t, cap = 2500000 * PU;
      var tp = Math.min(tenPct, cap);
      rows = [['50,000 penalty units', fixed], ['3 × benefit obtained or detriment avoided', triple], ['10% of annual turnover (capped at 2.5 million penalty units = ' + fmt.format(cap) + ')', tp]];
      max = Math.max(fixed, triple, tp);
    } else {
      rows = [['5,000 penalty units', 5000 * PU], ['3 × benefit obtained or detriment avoided', 3 * b]];
      max = Math.max(5000 * PU, 3 * b);
    }
    out.innerHTML = '<span class="small">' + rows.map(function (r) { return r[0] + ': <strong>' + fmt.format(r[1]) + '</strong>'; }).join('<br>') +
      '</span><br>Maximum penalty <em>per contravention</em>: <strong>' + fmt.format(max) + '</strong> (the greatest of the amounts above). Courts set the actual penalty well within this range, and many contraventions can be grouped as a course of conduct.';
  }
  [who, ben, turn].forEach(function (el) { el.addEventListener('input', update); el.addEventListener('change', update); });
  update();
})();
