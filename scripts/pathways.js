// Progress tracking for /learn/pathways.html. Adds a "done" checkbox to each step
// (<li data-url>) and shows progress per pathway. Saved only in this browser.
(function () {
  var KEY = 'rl-pathways-done';
  var done = {};
  try { done = JSON.parse(window.localStorage.getItem(KEY)) || {}; } catch (e) { done = {}; }
  function save() { try { window.localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) { /* storage unavailable */ } }

  var n = 0;
  document.querySelectorAll('.pathway-steps li[data-url]').forEach(function (li) {
    var url = li.getAttribute('data-url');
    var id = 'pw-' + (n++);
    var cb = document.createElement('input');
    cb.type = 'checkbox'; cb.id = id; cb.className = 'pw-check'; cb.dataset.url = url;
    var label = document.createElement('label');
    label.setAttribute('for', id); label.className = 'visually-hidden';
    label.textContent = 'Mark "' + li.querySelector('a').textContent + '" as done';
    li.insertBefore(label, li.firstChild);
    li.insertBefore(cb, li.firstChild);
    cb.addEventListener('change', function () {
      if (cb.checked) done[url] = true; else delete done[url];
      save(); refresh();
    });
  });

  function refresh() {
    document.querySelectorAll('.pw-check').forEach(function (cb) {
      cb.checked = !!done[cb.dataset.url];
      cb.closest('li').classList.toggle('pw-done', cb.checked);
    });
    document.querySelectorAll('.pathway').forEach(function (sec) {
      var boxes = sec.querySelectorAll('.pw-check');
      var d = 0; boxes.forEach(function (b) { if (b.checked) d++; });
      var p = sec.querySelector('.pathway-progress');
      p.innerHTML = '';
      var bar = document.createElement('span'); bar.className = 'quiz-bar pw-bar';
      var fill = document.createElement('span'); fill.style.width = Math.round(d / boxes.length * 100) + '%';
      bar.appendChild(fill);
      p.appendChild(document.createTextNode(d + ' of ' + boxes.length + ' steps done' + (d === boxes.length ? '. Pathway complete!' : '')));
      p.appendChild(bar);
    });
  }
  refresh();
})();
