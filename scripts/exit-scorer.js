// Substitutability and exit difficulty scorer (service provider exit page). Illustrative.
(function () {
  var w = document.getElementById('exit-scorer');
  if (!w) return;
  var sels = Array.prototype.slice.call(w.querySelectorAll('select')), out = w.querySelector('.result');
  var BANDS = [
    [14, 'Very hard to exit', 'Treat as a strategic dependency. Maintain a detailed, tested exit plan covering both a planned and a stressed exit, with funding, timelines and data migration rehearsed. Consider reducing lock-in at the next renewal (data portability, transition assistance, dual running).'],
    [10, 'Hard to exit', 'Maintain a documented exit plan with named owners, realistic timelines and identified alternatives. Test it through a tabletop exercise and confirm contractual transition assistance.'],
    [0, 'Manageable', 'A lighter exit plan is proportionate: alternatives, notice periods, data return and a rough timeline. Review at renewal.']
  ];
  function update() {
    var total = sels.reduce(function (a, s) { return a + parseInt(s.value, 10); }, 0);
    var band = BANDS.filter(function (b) { return total >= b[0]; })[0];
    out.innerHTML = 'Exit difficulty score: <strong>' + total + ' out of 18</strong>. <strong>' + band[1] + '.</strong> ' + band[2];
  }
  sels.forEach(function (s) { s.addEventListener('change', update); });
  update();
})();
