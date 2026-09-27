// Risk aggregation calculator: combine three standalone 1-in-100 year losses using a correlation
// matrix (variance-covariance method) and compare with a simple sum and with independence.
(function () {
  var w = document.getElementById('agg-calc');
  if (!w) return;
  var ids = ['a', 'b', 'c'], pairs = ['ab', 'ac', 'bc'];
  var bars = w.querySelector('.agg-bars'), out = w.querySelector('.result');
  function val(id) { var v = parseFloat(w.querySelector('#agg-' + id).value); return isNaN(v) || v < 0 ? 0 : v; }
  function fmt(v) { return '$' + v.toFixed(1) + 'm'; }
  function update() {
    var x = ids.map(val), r = {};
    pairs.forEach(function (p) { r[p] = parseFloat(w.querySelector('#agg-r' + p).value); });
    var sum = x[0] + x[1] + x[2];
    var indep = Math.sqrt(x[0] * x[0] + x[1] * x[1] + x[2] * x[2]);
    var q = indep * indep + 2 * (r.ab * x[0] * x[1] + r.ac * x[0] * x[2] + r.bc * x[1] * x[2]);
    var agg = Math.sqrt(Math.max(q, 0));
    var rows = [
      ['Simple sum (assumes everything goes wrong together)', sum],
      ['Using your correlations', agg],
      ['If the risks were completely independent', indep]
    ];
    var max = Math.max(sum, 0.0001);
    bars.innerHTML = rows.map(function (row, i) {
      return '<div class="agg-row"><span class="agg-label">' + row[0] + '</span>' +
        '<span class="agg-track"><span class="agg-bar' + (i === 1 ? ' agg-main' : '') + '" style="width:' + (100 * row[1] / max).toFixed(1) + '%"></span></span>' +
        '<span class="agg-val">' + fmt(row[1]) + '</span></div>';
    }).join('');
    var benefit = sum - agg;
    out.textContent = sum === 0 ? 'Enter at least one standalone loss.' :
      'Combined 1-in-100 year loss: ' + fmt(agg) + '. The "diversification benefit" compared with simply adding them up is ' + fmt(benefit) +
      ' (' + (100 * benefit / sum).toFixed(0) + '%). Set every correlation to 1 and the benefit disappears: that is what happens if one event hits all three risks at once.';
  }
  w.addEventListener('input', update);
  w.addEventListener('change', update);
  update();
})();
