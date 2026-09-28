// Unit pricing error calculator (unit pricing page). Illustrative.
(function () {
  var w = document.getElementById('up-calc');
  if (!w) return;
  var el = {}; ['up-correct', 'up-used', 'up-buy', 'up-sell'].forEach(function (i) { el[i] = w.querySelector('#' + i); });
  var out = w.querySelector('.result');
  var fmt = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 2 });
  function n(i) { var v = parseFloat(el[i].value); return isNaN(v) || v < 0 ? 0 : v; }
  function update() {
    var c = n('up-correct'), u = n('up-used'), buy = n('up-buy'), sell = n('up-sell');
    if (!c || !u) { out.textContent = 'Enter both unit prices.'; return; }
    var err = (u - c) / c * 100;
    var unitsGot = buy / u, unitsShould = buy / c, buyerUnits = unitsShould - unitsGot;
    var paid = sell * u, shouldPay = sell * c, sellerDiff = paid - shouldPay;
    var over = err > 0;
    out.innerHTML = 'Price error: <strong>' + err.toFixed(2) + '%</strong> (' + (over ? 'overstated' : err < 0 ? 'understated' : 'none') + ')' +
      (Math.abs(err) >= 0.3 ? '. At or above the 0.30% threshold recognised in RG 94.' : '. Below the 0.30% threshold recognised in RG 94, but see the discussion below.') + '<br>' +
      'Member who invested ' + fmt.format(buy) + ': received ' + unitsGot.toFixed(2) + ' units instead of ' + unitsShould.toFixed(2) + '. ' +
      (buyerUnits > 0 ? 'Short <strong>' + buyerUnits.toFixed(2) + ' units (' + fmt.format(buyerUnits * c) + ')</strong>, owed to the member.' : buyerUnits < 0 ? 'Received <strong>' + (-buyerUnits).toFixed(2) + ' extra units (' + fmt.format(-buyerUnits * c) + ')</strong>, a gain at the expense of other members.' : 'No difference.') + '<br>' +
      'Member who withdrew ' + sell.toLocaleString('en-AU') + ' units: paid ' + fmt.format(paid) + ' instead of ' + fmt.format(shouldPay) + '. ' +
      (sellerDiff > 0 ? 'Overpaid <strong>' + fmt.format(sellerDiff) + '</strong>, funded by the members who remain.' : sellerDiff < 0 ? 'Underpaid <strong>' + fmt.format(-sellerDiff) + '</strong>, owed to the member.' : 'No difference.');
  }
  Object.keys(el).forEach(function (k) { el[k].addEventListener('input', update); });
  update();
})();
