// Illustrative deferral calculator (remuneration governance page). Simplified.
(function () {
  var w = document.getElementById('deferral');
  if (!w) return;
  var amt = w.querySelector('#df-amount'), role = w.querySelector('#df-role');
  var out = w.querySelector('.df-out');
  var fmt = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
  var RULES = {
    ceo: { pct: 0.6, years: [4, 5, 6], label: 'CPS 511 (SFI CEO): at least 60% deferred for 6 years, pro-rata vesting from year 4' },
    senior: { pct: 0.4, years: [4, 5], label: 'CPS 511 (SFI senior manager or other special role): at least 40% deferred for 5 years, pro-rata vesting from year 4' },
    far: { pct: 0.4, years: [4], label: 'FAR (accountable person): at least 40% deferred for at least 4 years' }
  };
  function update() {
    var v = parseFloat(amt.value), r = RULES[role.value];
    if (isNaN(v) || v < 0) { out.innerHTML = '<p class="result">Enter a variable remuneration amount.</p>'; return; }
    var deferred = v * r.pct, upfront = v - deferred, per = deferred / r.years.length;
    var rows = '<tr><td>Year 0 (award)</td><td>' + fmt.format(upfront) + '</td><td>Paid now (not deferred)</td></tr>' +
      r.years.map(function (y) { return '<tr><td>Year ' + y + '</td><td>' + fmt.format(per) + '</td><td>Vests if not reduced by malus</td></tr>'; }).join('');
    out.innerHTML = '<p class="small">' + r.label + '.</p>' +
      '<div class="table-wrap"><table><thead><tr><th scope="col">When</th><th scope="col">Amount</th><th scope="col">Status</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<p class="result">Deferred: ' + fmt.format(deferred) + ' (' + Math.round(r.pct * 100) + '%). Until it vests, it can be reduced (malus) for risk and conduct failures; under CPS 511, SFIs must also be able to claw back vested amounts for at least 2 years.</p>';
  }
  amt.addEventListener('input', update);
  role.addEventListener('change', update);
  update();
})();
