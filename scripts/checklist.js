// Reusable self-check checklist.
// Markup:
// <div class="checklist-widget" data-bands='[[100,"Strong","..."],[70,"Partly","..."],[0,"Weak","..."]]'>
//   <label><input type="checkbox"> Item</label> ...
//   <p class="result" aria-live="polite"></p>
// </div>
// Bands: [minimum percent ticked, label, message], highest first.
(function () {
  document.querySelectorAll('.checklist-widget').forEach(function (w) {
    var boxes = w.querySelectorAll('input[type="checkbox"]');
    var out = w.querySelector('.result');
    var bands = JSON.parse(w.getAttribute('data-bands'));
    function update() {
      var n = 0;
      boxes.forEach(function (b) { if (b.checked) n++; });
      var pct = Math.round((n / boxes.length) * 100);
      var band = bands.filter(function (b) { return pct >= b[0]; })[0];
      out.innerHTML = '<strong>' + n + ' of ' + boxes.length + ' ticked: ' + band[1] + '.</strong> ' + band[2];
      out.className = 'result band-' + bands.indexOf(band);
    }
    boxes.forEach(function (b) { b.addEventListener('change', update); });
    update();
  });
})();
