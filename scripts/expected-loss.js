// Expected credit loss calculator: EL = PD x LGD x EAD
(function () {
  var w = document.getElementById('el-calc');
  if (!w) return;
  var pd = w.querySelector('#el-pd'), lgd = w.querySelector('#el-lgd'), ead = w.querySelector('#el-ead');
  var out = w.querySelector('.result');
  var fmt = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
  function update() {
    var p = parseFloat(pd.value) / 100, l = parseFloat(lgd.value) / 100, e = parseFloat(ead.value);
    if ([p, l, e].some(isNaN) || p < 0 || p > 1 || l < 0 || l > 1 || e < 0) {
      out.textContent = 'Enter a PD and LGD between 0 and 100%, and a positive exposure.';
      return;
    }
    var el = p * l * e;
    out.textContent = 'Expected loss = ' + (p * 100).toFixed(2) + '% × ' + (l * 100).toFixed(0) + '% × ' +
      fmt.format(e) + ' = ' + fmt.format(el) + ' per year. If the borrower does default, the loss would be ' +
      fmt.format(l * e) + '.';
  }
  [pd, lgd, ead].forEach(function (i) { i.addEventListener('input', update); });
  update();
})();
