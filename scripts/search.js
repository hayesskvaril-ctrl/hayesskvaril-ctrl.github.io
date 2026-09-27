// Site search for /search/. Reads window.SEARCH_INDEX (search-index.js, built by
// _scripts/build_search_index.py). Matches every query word across title, headings, summary
// and page text, ranks by where words appear, and shows a highlighted snippet.
(function () {
  var form = document.getElementById('search-form');
  var input = document.getElementById('search-q');
  var status = document.getElementById('search-status');
  var list = document.getElementById('search-results');
  var docs = window.SEARCH_INDEX || [];
  if (!form || !docs.length) return;

  var STOP = ' a an and are as at be by for from how in is it of on or the to what when where which who why with ';
  docs.forEach(function (d) {
    d._t = d.t.toLowerCase(); d._h = (d.h || '').toLowerCase();
    d._d = (d.d || '').toLowerCase(); d._x = (d.x || '').toLowerCase();
  });

  function tokens(q) {
    return q.toLowerCase().replace(/[^a-z0-9$%&\/\.\- ]+/g, ' ').split(/\s+/)
      .map(function (w) { return w.replace(/^[\.\-\/]+|[\.\-\/]+$/g, ''); })
      .filter(function (w) { return w && (w.length > 1 || /\d/.test(w)) && STOP.indexOf(' ' + w + ' ') === -1; });
  }
  function count(hay, w) {
    var n = 0, i = hay.indexOf(w);
    while (i !== -1 && n < 6) { n++; i = hay.indexOf(w, i + w.length); }
    return n;
  }
  function wordStart(hay, w) {
    return new RegExp('(^|[^a-z0-9])' + w.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&')).test(hay);
  }
  function score(d, words, phrase) {
    var total = 0, matched = 0;
    words.forEach(function (w) {
      var s = 0;
      if (d._t.indexOf(w) !== -1) s += wordStart(d._t, w) ? 14 : 6;
      if (d._h.indexOf(w) !== -1) s += 5;
      if (d._d.indexOf(w) !== -1) s += 4;
      s += count(d._x, w);
      if (s > 0) matched++;
      total += s;
    });
    if (phrase.indexOf(' ') !== -1) {
      if (d._t.indexOf(phrase) !== -1) total += 25;
      else if (d._h.indexOf(phrase) !== -1) total += 22;
      else if (d._d.indexOf(phrase) !== -1) total += 12;
      else if (d._x.indexOf(phrase) !== -1) total += 8 + Math.min(count(d._x, phrase), 4) * 2;
    }
    if (d.s === 'Glossary term' && d._t === phrase) total += 10;
    return { total: total, all: matched === words.length, any: matched > 0 };
  }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function highlight(text, words) {
    var out = esc(text);
    words.forEach(function (w) {
      var re = new RegExp('(' + esc(w).replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&') + ')', 'gi');
      out = out.replace(re, '\u0001$1\u0002');
    });
    return out.replace(/\u0001/g, '<mark>').replace(/\u0002/g, '</mark>');
  }
  function snippet(d, words) {
    var src = d.x || d.d || '';
    var low = src.toLowerCase(), pos = -1;
    for (var i = 0; i < words.length && pos === -1; i++) pos = low.indexOf(words[i]);
    if (pos === -1 || (d.d && d.d.toLowerCase().indexOf(words[0]) !== -1)) return highlight(d.d || src.slice(0, 180), words);
    var start = Math.max(0, pos - 80), end = Math.min(src.length, pos + 140);
    return (start ? '… ' : '') + highlight(src.slice(start, end), words) + (end < src.length ? ' …' : '');
  }

  function run(q) {
    var words = tokens(q);
    list.innerHTML = '';
    if (!words.length) { status.textContent = q ? 'Try a more specific word, such as "appetite" or "CPS 230".' : ''; return; }
    var phrase = words.join(' ');
    var scored = docs.map(function (d) { return { d: d, r: score(d, words, phrase) }; });
    var hits = scored.filter(function (x) { return x.r.all && x.r.total > 0; });
    var partial = false;
    if (!hits.length) { hits = scored.filter(function (x) { return x.r.any; }); partial = true; }
    hits.sort(function (a, b) { return b.r.total - a.r.total; });
    hits = hits.slice(0, 30);
    status.textContent = hits.length
      ? (partial ? 'No page matched every word. Showing the closest matches (' + hits.length + ').'
                 : hits.length + (hits.length === 30 ? '+' : '') + ' result' + (hits.length === 1 ? '' : 's') + ' for "' + q + '".')
      : 'No results for "' + q + '". Try fewer or different words, or browse the Glossary.';
    hits.forEach(function (x) {
      var d = x.d, li = document.createElement('li');
      li.className = 'search-hit';
      li.innerHTML = '<p class="search-meta"><span class="badge">' + esc(d.s) + '</span>' +
        (d.l ? ' <span class="level level-' + d.l.toLowerCase() + '">' + esc(d.l) + '</span>' : '') + '</p>' +
        '<h3><a href="' + esc(d.u) + '">' + highlight(d.t, words) + '</a></h3>' +
        '<p>' + snippet(d, words) + '</p>' +
        '<p class="search-url small">' + esc(d.u) + '</p>';
      list.appendChild(li);
    });
  }

  function fromUrl() {
    var q = new URLSearchParams(window.location.search).get('q') || '';
    input.value = q;
    run(q.trim());
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = input.value.trim();
    var url = q ? '?q=' + encodeURIComponent(q) : window.location.pathname;
    history.replaceState(null, '', url);
    run(q);
  });
  var timer;
  input.addEventListener('input', function () {
    clearTimeout(timer);
    timer = setTimeout(function () { run(input.value.trim()); }, 200);
  });
  document.querySelectorAll('.search-suggest button').forEach(function (b) {
    b.addEventListener('click', function () { input.value = b.textContent; form.requestSubmit ? form.requestSubmit() : run(b.textContent); input.focus(); });
  });
  fromUrl();
})();
