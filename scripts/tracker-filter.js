// Filters the regulatory changes tracker table (#tracker) by regulator, status and sector.
(function () {
  var reg = document.getElementById('tf-reg');
  var status = document.getElementById('tf-status');
  var sector = document.getElementById('tf-sector');
  var count = document.querySelector('.tf-count');
  var rows = document.querySelectorAll('#tracker tbody tr');
  if (!reg || !rows.length) return;
  function update() {
    var n = 0;
    rows.forEach(function (r) {
      var secs = (r.getAttribute('data-sectors') || '').split(' ');
      var show = (!reg.value || r.getAttribute('data-regulator') === reg.value) &&
        (!status.value || r.getAttribute('data-status') === status.value) &&
        (!sector.value || secs.indexOf(sector.value) !== -1 || secs.indexOf('all') !== -1);
      r.hidden = !show;
      if (show) n++;
    });
    count.textContent = n + ' of ' + rows.length + ' changes shown';
  }
  [reg, status, sector].forEach(function (s) { s.addEventListener('change', update); });
  update();
})();
