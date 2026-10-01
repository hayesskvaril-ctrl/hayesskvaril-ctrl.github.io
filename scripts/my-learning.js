// My learning (/learn/my-learning.html): progress across the learning pathways, next steps and a
// printable record of learning. Reads the same browser storage as the pathways page and the
// "Mark as read" buttons. Nothing is sent anywhere.
(function () {
  var app = document.getElementById('ml-app'), P = window.RL_PATHWAYS;
  if (!app || !P) return;
  var KEY = 'rl-pathways-done', NKEY = 'rl-learner-name', read = {};
  try { read = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { read = {}; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  var name = '';
  try { name = localStorage.getItem(NKEY) || ''; } catch (e) {}

  function render() {
    var allUrls = {}, started = 0, complete = 0;
    P.forEach(function (p) { p.steps.forEach(function (s) { allUrls[s.url] = s.title; }); });
    var nread = Object.keys(read).filter(function (u) { return allUrls[u]; }).length;
    var paths = P.map(function (p) {
      var d = p.steps.filter(function (s) { return read[s.url]; }).length, nxt = p.steps.filter(function (s) { return !read[s.url]; })[0];
      if (d) started++;
      if (d === p.steps.length) complete++;
      var pct = Math.round(100 * d / p.steps.length);
      return '<div class="ml-path"><h3><a href="/learn/pathways.html#' + p.id + '">' + esc(p.title) + '</a></h3>' +
        '<p class="small">' + esc(p.who) + '</p><p><strong>' + d + ' of ' + p.steps.length + '</strong> steps done (' + pct + '%)' +
        (nxt ? '. Next: <a href="' + nxt.url + '">' + esc(nxt.title) + '</a>' : '. Pathway complete.') + '</p>' +
        '<div class="pb-bar" aria-hidden="true"><span style="width:' + pct + '%"></span></div>' +
        '<details><summary>All steps</summary><ol>' + p.steps.map(function (s) { return '<li' + (read[s.url] ? ' class="done"' : '') + '><a href="' + s.url + '">' + esc(s.title) + '</a>' + (read[s.url] ? ' <span class="visually-hidden">(read)</span>' : '') + '</li>'; }).join('') + '</ol></details></div>';
    }).join('');
    app.innerHTML = '<h2 class="ml-h">Your progress</h2>' +
      '<div class="ml-summary"><div><strong>' + nread + '</strong>pages read</div><div><strong>' + started + '</strong>pathways started</div><div><strong>' + complete + '</strong>pathways complete</div></div>' +
      (nread ? '' : '<p>You haven\'t marked any pages as read yet. Start with a <a href="/learn/pathways.html">pathway</a> and press <strong>Mark as read</strong> at the bottom of each page.</p>') +
      paths +
      '<h2 class="ml-h">Record of learning</h2><p><label for="ml-name">Your name, for the printed record (optional, saved in this browser only)</label><input type="text" id="ml-name" maxlength="80" value="' + esc(name) + '"></p>' +
      '<p class="ml-btns"><button type="button" data-ml="print"' + (nread ? '' : ' disabled') + '>Print record of learning</button> <button type="button" class="secondary" data-ml="clear">Clear all progress</button></p>' +
      '<p class="small" aria-live="polite" id="ml-status"></p>';
    record(allUrls, complete);
  }

  function record(allUrls, complete) {
    var old = document.querySelector('.ml-record');
    if (old) old.remove();
    var d = new Date(), months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var list = P.map(function (p) {
      var done = p.steps.filter(function (s) { return read[s.url]; });
      if (!done.length) return '';
      return '<h3>' + esc(p.title) + ' (' + done.length + ' of ' + p.steps.length + ')</h3><ul>' + done.map(function (s) { return '<li>' + esc(s.title) + ' <span class="small">(' + esc(location.origin + s.url) + ')</span></li>'; }).join('') + '</ul>';
    }).join('');
    var el = document.createElement('section');
    el.className = 'ml-record';
    el.innerHTML = '<h2>Record of learning</h2><p><strong>' + esc(name || 'Name not given') + '</strong><br>Printed ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() + ' from RiskLens Australia (' + esc(location.origin) + ')</p>' +
      '<p>Pathways complete: ' + complete + '. Pages marked as read are listed below.</p>' + list +
      '<p class="small">Self-recorded reading on RiskLens Australia, a free educational website. This record is not an assessment, a qualification or a certificate, and RiskLens Australia has not verified it.</p>';
    app.closest('main').appendChild(el);
  }

  app.addEventListener('input', function (e) {
    if (e.target.id !== 'ml-name') return;
    name = e.target.value.slice(0, 80);
    try { localStorage.setItem(NKEY, name); } catch (err) {}
    var r = document.querySelector('.ml-record strong');
    if (r) r.textContent = name || 'Name not given';
  });
  app.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-ml]');
    if (!b) return;
    if (b.getAttribute('data-ml') === 'print') { document.body.classList.add('ml-printing'); window.print(); }
    if (b.getAttribute('data-ml') === 'clear' && window.confirm('Clear all your pathway progress in this browser?')) {
      read = {};
      try { localStorage.removeItem(KEY); } catch (err) {}
      render();
      document.getElementById('ml-status').textContent = 'Progress cleared.';
    }
  });
  window.addEventListener('afterprint', function () { document.body.classList.remove('ml-printing'); });
  render();
})();
