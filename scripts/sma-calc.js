// APS 115 operational risk capital calculator (standardised measurement approach). Illustrative.
(function () {
  var w = document.getElementById('sma-calc');
  if (!w) return;
  var ids = ['sma-ildc', 'sma-sc', 'sma-fc'].map(function (i) { return w.querySelector('#' + i); });
  var out = w.querySelector('.result'), bar = w.querySelector('.sma-bar');
  var fmt = function (v) { return '$' + (v >= 10 ? v.toFixed(1) : v.toFixed(3).replace(/0$/, '')) + ' billion'; };
  function update() {
    var v = ids.map(function (el) { var x = parseFloat(el.value); return isNaN(x) || x < 0 ? 0 : x; });
    var bi = v[0] + v[1] + v[2];
    var t1 = Math.min(bi, 1.5), t2 = Math.max(0, Math.min(bi, 45) - 1.5), t3 = Math.max(0, bi - 45);
    var cap = 0.12 * t1 + 0.15 * t2 + 0.18 * t3;
    var rwa = 12.5 * cap, eff = bi > 0 ? cap / bi * 100 : 0;
    out.innerHTML = 'Business indicator: <strong>' + fmt(bi) + '</strong><br>' +
      '<span class="small">12% × ' + fmt(t1) + (t2 ? ' + 15% × ' + fmt(t2) : '') + (t3 ? ' + 18% × ' + fmt(t3) : '') + '</span><br>' +
      'Operational risk capital: <strong>' + fmt(cap) + '</strong> (effective rate ' + eff.toFixed(1) + '% of BI)<br>' +
      'Operational risk-weighted assets (× 12.5): <strong>' + fmt(rwa) + '</strong>';
    if (bar) {
      var max = Math.max(bi, 1e-9);
      bar.innerHTML = [[t1, 'b1', '12%'], [t2, 'b2', '15%'], [t3, 'b3', '18%']].filter(function (x) { return x[0] > 0; })
        .map(function (x) { return '<span class="' + x[1] + '" style="width:' + (x[0] / max * 100) + '%">' + (x[0] / max > 0.12 ? x[2] : '') + '</span>'; }).join('');
    }
  }
  ids.forEach(function (el) { el.addEventListener('input', update); });
  update();
})();
