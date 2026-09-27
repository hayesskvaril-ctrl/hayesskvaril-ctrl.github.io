// Glossary filter: hides terms that don't match what the reader types.
(function () {
  var input = document.getElementById('glossary-search');
  var count = document.getElementById('glossary-count');
  if (!input) return;
  var entries = Array.prototype.slice.call(document.querySelectorAll('.glossary .entry'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('.glossary section'));

  input.addEventListener('input', function () {
    var q = input.value.trim().toLowerCase();
    var shown = 0;
    entries.forEach(function (e) {
      var match = !q || e.textContent.toLowerCase().indexOf(q) !== -1;
      e.hidden = !match;
      if (match) shown++;
    });
    sections.forEach(function (s) {
      s.hidden = !s.querySelector('.entry:not([hidden])');
    });
    count.textContent = q ? shown + ' matching term' + (shown === 1 ? '' : 's') : '';
  });
})();
