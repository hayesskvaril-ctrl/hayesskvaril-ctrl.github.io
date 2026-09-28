// Remediation calculator (remediation calculations page): an overcharge each month, compensated with foregone returns to a payment date.
(function () {
  var w = document.getElementById('rem-calc');
  if (!w) return;
  var el = {}; ['rc-amt', 'rc-months', 'rc-wait', 'rc-method', 'rc-ret', 'rc-cash', 'rc-floor'].forEach(function (i) { el[i] = w.querySelector('#' + i); });
  var out = w.querySelector('.result'), retRow = w.querySelector('.rc-ret-row'), cashRow = w.querySelector('.rc-cash-row'), floorRow = w.querySelector('.rc-floor-row');
  var fmt = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 2 });
  function n(i) { var v = parseFloat(el[i].value); return isNaN(v) ? 0 : v; }
  function update() {
    var m = el['rc-method'].value;
    retRow.hidden = m !== 'fund'; floorRow.hidden = m !== 'fund'; cashRow.hidden = m !== 'rba';
    var amt = Math.max(0, n('rc-amt')), months = Math.max(0, Math.round(n('rc-months'))), wait = Math.max(0, Math.round(n('rc-wait')));
    var annual = m === 'fund' ? n('rc-ret') / 100 : m === 'rba' ? (n('rc-cash') + 6) / 100 : 0;
    var floored = false;
    if (m === 'fund' && el['rc-floor'].checked && annual < 0) { annual = 0; floored = true; }
    var r = Math.pow(1 + annual, 1 / 12) - 1;
    var base = amt * months, total = 0;
    for (var k = 1; k <= months; k++) total += amt * Math.pow(1 + r, months - k + wait);
    var earn = total - base;
    out.innerHTML = 'Amount overcharged: <strong>' + fmt.format(base) + '</strong><br>' +
      'Foregone ' + (m === 'rba' ? 'interest (RBA cash rate + 6%)' : m === 'fund' ? 'investment earnings' : 'returns') + ': <strong>' + fmt.format(earn) + '</strong>' + (floored ? ' <span class="small">(negative returns not deducted)</span>' : '') + '<br>' +
      'Compensation per member: <strong>' + fmt.format(total) + '</strong>';
  }
  Object.keys(el).forEach(function (k) { el[k].addEventListener('input', update); el[k].addEventListener('change', update); });
  update();
})();
