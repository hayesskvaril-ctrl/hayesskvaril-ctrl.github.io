// Obligations library (/obligations/): search, filters and downloads over the static page.
// Nothing is sent anywhere; downloads are built in the browser (Excel via scripts/xlsx-lite.js).
(function () {
  var tools = document.getElementById('ob-tools');
  if (!tools) return;
  tools.hidden = false;
  var q = document.getElementById('ob-q'), ent = document.getElementById('ob-ent'), body = document.getElementById('ob-body'), clock = document.getElementById('ob-clock');
  var count = document.getElementById('ob-count');
  var regs = Array.prototype.slice.call(document.querySelectorAll('.ob-reg'));
  var groups = Array.prototype.slice.call(document.querySelectorAll('.ob-group'));
  function apply() {
    var words = q.value.toLowerCase().split(/\s+/).filter(Boolean), nr = 0, nt = 0;
    regs.forEach(function (s) {
      var ok = (!ent.value || (' ' + s.getAttribute('data-ents') + ' ').indexOf(' ' + ent.value + ' ') >= 0) &&
        (!body.value || (' ' + s.getAttribute('data-bodies') + ' ').indexOf(' ' + body.value + ' ') >= 0) &&
        (!clock.checked || s.getAttribute('data-clock') === '1');
      var regText = s.getAttribute('data-text'), shown = 0;
      Array.prototype.forEach.call(s.querySelectorAll('tbody tr'), function (tr) {
        var text = regText + ' ' + tr.getAttribute('data-text') + ' ' + tr.children[0].textContent.toLowerCase();
        var hit = ok && words.every(function (w) { return text.indexOf(w) >= 0; });
        tr.hidden = !hit;
        if (hit) shown++;
      });
      s.hidden = !shown;
      if (shown) { nr++; nt += shown; }
    });
    groups.forEach(function (g) { g.hidden = !g.querySelector('.ob-reg:not([hidden])'); });
    count.textContent = nt + ' obligation themes from ' + nr + ' regimes shown';
  }
  [q, ent, body, clock].forEach(function (el) { el.addEventListener('input', apply); el.addEventListener('change', apply); });
  apply();

  function rows() {
    var out = [['ID', 'Regime', 'Regulator', 'Applies to', 'Obligation (summary)', 'Control objective', 'Evidence', 'Related risks', 'Guide']];
    regs.forEach(function (s) {
      if (s.hidden) return;
      var title = s.querySelector('h3').textContent, reg = s.querySelector('.gb-chip').textContent;
      var applies = s.querySelector('.ob-applies').textContent.replace(/^Applies to: /, ''), guide = s.querySelector('.ob-meta a').href;
      Array.prototype.forEach.call(s.querySelectorAll('tbody tr'), function (tr) {
        if (tr.hidden) return;
        var c = tr.children;
        out.push([c[0].textContent, title, reg, applies, c[1].textContent, c[2].textContent, c[3].textContent, c[4].textContent, guide]);
      });
    });
    return out;
  }
  function download(blob, name) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }
  tools.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-dl]');
    if (!b) return;
    var data = rows();
    if (b.getAttribute('data-dl') === 'csv') {
      var csv = data.map(function (r) { return r.map(function (v) { return '"' + String(v).replace(/"/g, '""') + '"'; }).join(','); }).join('\r\n');
      download(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }), 'obligations-library.csv');
    } else if (window.XLSXLite) {
      var readme = [[{ v: 'RiskLens Australia obligations library', s: 'title' }], [{ v: 'Plain-English summaries for education. Not legal advice and not a complete list of obligations: check the official legislation and regulator guidance.', s: 'plain' }]];
      download(window.XLSXLite.workbook([{ name: 'Obligations', rows: data, widths: [16, 32, 18, 40, 60, 40, 36, 36, 40] }, { name: 'Read me', header: false, rows: readme, widths: [120] }], { title: 'Obligations library' }), 'obligations-library.xlsx');
    }
  });
})();
