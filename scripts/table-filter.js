// Filter a table by sector. Rows carry data-sectors="bank insurer super all".
(function () {
  document.querySelectorAll('.table-filter').forEach(function (w) {
    var select = w.querySelector('select');
    var rows = document.querySelectorAll(w.getAttribute('data-target') + ' tbody tr');
    var count = w.querySelector('.tf-count');
    function update() {
      var v = select.value, n = 0;
      rows.forEach(function (r) {
        var s = r.getAttribute('data-sectors') || '';
        var show = v === 'all' || s.indexOf(v) !== -1 || s.indexOf('all') !== -1;
        r.hidden = !show;
        if (show) n++;
      });
      count.textContent = n + ' instrument' + (n === 1 ? '' : 's') + ' shown';
    }
    select.addEventListener('change', update);
    update();
  });
})();
