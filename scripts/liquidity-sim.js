// Super fund liquidity stress simulator (super liquidity stress testing page). Per $100 of option assets; illustrative only.
(function () {
  var w = document.getElementById('liq-sim');
  if (!w) return;
  var ids = ['ls-cash', 'ls-unl', 'ls-fall', 'ls-unlfall', 'ls-switch', 'ls-roll', 'ls-ben', 'ls-fx', 'ls-max'];
  var el = {}; ids.forEach(function (i) { el[i] = w.querySelector('#' + i); });
  var out = w.querySelector('.result');
  function v(i) { var x = parseFloat(el[i].value); return isNaN(x) || x < 0 ? 0 : x; }
  function f1(x) { return x.toFixed(1); }
  function update() {
    ids.forEach(function (i) { var o = w.querySelector('output[for="' + i + '"]'); if (o) o.textContent = el[i].value + '%'; });
    var cash = v('ls-cash'), unl = v('ls-unl'), listed = Math.max(0, 100 - cash - unl);
    var listedAfter = listed * (1 - v('ls-fall') / 100), unlAfter = unl * (1 - v('ls-unlfall') / 100);
    var liquid = cash + listedAfter;
    var outflow = v('ls-switch') + v('ls-roll') + v('ls-ben') + v('ls-fx');
    var cover = outflow > 0 ? liquid / outflow : Infinity;
    var remaining = liquid - outflow + unlAfter;
    var unlShare = remaining > 0 ? unlAfter / remaining * 100 : 100;
    var max = v('ls-max');
    var shortfall = outflow > liquid;
    var msg = 'Listed assets fall from $' + f1(listed) + ' to $' + f1(listedAfter) + '. Liquid assets available: <strong>$' + f1(liquid) + '</strong>. Stressed outflows: <strong>$' + f1(outflow) + '</strong>.<br>' +
      'Liquidity coverage: <strong>' + (isFinite(cover) ? cover.toFixed(1) + '×' : 'no outflows') + '</strong>' + (shortfall ? ' <strong>(shortfall: outflows exceed liquid assets)</strong>' : '') + '.<br>' +
      'Unlisted assets after outflows: <strong>' + f1(Math.min(unlShare, 100)) + '%</strong> of the option (strategic maximum ' + f1(max) + '%)' + (unlShare > max ? ': <strong>above the maximum</strong>' : ': within range') + '.';
    if (v('ls-unlfall') < v('ls-fall') && outflow > 0) msg += '<br><span class="small">Unlisted values have fallen less than listed markets. If unit prices don\'t reflect the likely fall, members leaving now are paid more than their fair share, at the expense of members who stay.</span>';
    out.innerHTML = msg;
  }
  ids.forEach(function (i) { el[i].addEventListener('input', update); });
  update();
})();
