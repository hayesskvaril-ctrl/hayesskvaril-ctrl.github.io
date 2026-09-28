// Risk scoring and heat map tool for /learn/risk-heat-map.html.
// Users add risks with inherent and residual likelihood/consequence, see them on a
// 5x5 heat map, compare to a chosen appetite, and download a CSV. Data stays in the browser.
(function () {
  var root = document.getElementById('risk-map-tool');
  if (!root) return;

  var LIK = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost certain'];
  var CON = ['Insignificant', 'Minor', 'Moderate', 'Major', 'Severe'];
  var LEVELS = ['low', 'medium', 'high', 'extreme'];
  var LEVEL_NAMES = { low: 'Low', medium: 'Medium', high: 'High', extreme: 'Extreme' };
  var KEY = 'rl-risk-map-v1';

  var EXAMPLES = [
    { name: 'Cyber attack disrupts member administration', cat: 'Technology', il: 4, ic: 5, rl: 3, rc: 4 },
    { name: 'Fee calculation errors after product changes', cat: 'Operational', il: 4, ic: 3, rl: 2, rc: 3 },
    { name: 'Material service provider fails', cat: 'Third party', il: 2, ic: 5, rl: 2, rc: 4 },
    { name: 'Late breach reporting to regulators', cat: 'Compliance', il: 3, ic: 4, rl: 2, rc: 2 },
    { name: 'Poor handling of death benefit claims', cat: 'Conduct', il: 3, ic: 4, rl: 3, rc: 3 },
    { name: 'Key-person loss in investment team', cat: 'People', il: 3, ic: 3, rl: 2, rc: 2 }
  ];

  function rating(l, c) {
    var s = l * c;
    if (s >= 15) return 'extreme';
    if (s >= 10) return 'high';
    if (s >= 5) return 'medium';
    return 'low';
  }
  function load() {
    try { var v = JSON.parse(window.localStorage.getItem(KEY)); return Array.isArray(v) ? v : null; }
    catch (e) { return null; }
  }
  function save() {
    try { window.localStorage.setItem(KEY, JSON.stringify(risks)); } catch (e) { /* storage unavailable */ }
  }

  var risks = load() || EXAMPLES.map(function (r) { return Object.assign({}, r); });
  var view = 'residual';
  var appetite = 'medium';
  var editing = -1;

  var form = root.querySelector('.rm-form');
  var f = {
    name: form.querySelector('#rm-name'), cat: form.querySelector('#rm-cat'),
    il: form.querySelector('#rm-il'), ic: form.querySelector('#rm-ic'),
    rl: form.querySelector('#rm-rl'), rc: form.querySelector('#rm-rc')
  };
  var submitBtn = form.querySelector('button[type="submit"]');
  var cancelBtn = form.querySelector('.rm-cancel');
  var gridHolder = root.querySelector('.rm-grid');
  var tableBody = root.querySelector('.rm-table tbody');
  var summary = root.querySelector('.rm-summary');
  var msg = root.querySelector('.rm-msg');

  [f.il, f.rl].forEach(function (s) { LIK.forEach(function (n, i) { s.add(new Option((i + 1) + ' ' + n, i + 1)); }); });
  [f.ic, f.rc].forEach(function (s) { CON.forEach(function (n, i) { s.add(new Option((i + 1) + ' ' + n, i + 1)); }); });
  f.il.value = 3; f.ic.value = 3; f.rl.value = 2; f.rc.value = 3;

  function badge(level) {
    return '<span class="badge rm-' + level + '">' + LEVEL_NAMES[level] + '</span>';
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }
  function above(level) { return LEVELS.indexOf(level) > LEVELS.indexOf(appetite); }

  function drawGrid() {
    var t = document.createElement('table');
    t.className = 'heatmap rm-heatmap';
    var cap = document.createElement('caption');
    cap.textContent = (view === 'inherent' ? 'Inherent' : 'Residual') + ' risk: likelihood (rows) by consequence (columns). Numbers are risks from the register.';
    t.appendChild(cap);
    var tb = document.createElement('tbody');
    for (var l = 5; l >= 1; l--) {
      var tr = document.createElement('tr');
      var th = document.createElement('th'); th.scope = 'row'; th.className = 'row-label'; th.textContent = LIK[l - 1];
      tr.appendChild(th);
      for (var c = 1; c <= 5; c++) {
        var td = document.createElement('td');
        var lvl = rating(l, c);
        td.className = 'rating-' + lvl + (above(lvl) ? ' rm-above' : '');
        var here = [];
        risks.forEach(function (r, i) {
          var rl = view === 'inherent' ? r.il : r.rl, rc = view === 'inherent' ? r.ic : r.rc;
          if (+rl === l && +rc === c) here.push(i + 1);
        });
        td.textContent = here.join(' ');
        td.setAttribute('aria-label', LIK[l - 1] + ' and ' + CON[c - 1] + ', ' + lvl +
          (here.length ? ': risk ' + here.join(', ') : ': no risks'));
        tr.appendChild(td);
      }
      tb.appendChild(tr);
    }
    var fr = document.createElement('tr');
    var corner = document.createElement('th'); corner.innerHTML = '<span class="visually-hidden">Likelihood</span>'; fr.appendChild(corner);
    CON.forEach(function (n) { var th = document.createElement('th'); th.scope = 'col'; th.textContent = n; fr.appendChild(th); });
    tb.appendChild(fr);
    t.appendChild(tb);
    gridHolder.innerHTML = '';
    gridHolder.appendChild(t);
  }

  function drawTable() {
    if (!risks.length) {
      tableBody.innerHTML = '<tr><td colspan="6">No risks yet. Add one above, or load the examples.</td></tr>';
      return;
    }
    tableBody.innerHTML = risks.map(function (r, i) {
      var inh = rating(r.il, r.ic), res = rating(r.rl, r.rc);
      return '<tr' + (above(res) ? ' class="rm-row-above"' : '') + '>' +
        '<td>' + (i + 1) + '</td>' +
        '<td>' + esc(r.name) + '<br><span class="small">' + esc(r.cat) + '</span></td>' +
        '<td>' + badge(inh) + ' <span class="small">' + r.il + '×' + r.ic + '=' + (r.il * r.ic) + '</span></td>' +
        '<td>' + badge(res) + ' <span class="small">' + r.rl + '×' + r.rc + '=' + (r.rl * r.rc) + '</span></td>' +
        '<td>' + (above(res) ? '<strong>Above appetite</strong>' : 'Within') + '</td>' +
        '<td class="rm-actions"><button type="button" class="secondary" data-edit="' + i + '" aria-label="Edit risk ' + (i + 1) + '">Edit</button> ' +
        '<button type="button" class="secondary" data-del="' + i + '" aria-label="Delete risk ' + (i + 1) + '">Delete</button></td></tr>';
    }).join('');
  }

  function drawSummary() {
    var n = risks.length;
    var over = risks.filter(function (r) { return above(rating(r.rl, r.rc)); }).length;
    var reduced = risks.filter(function (r) { return r.rl * r.rc < r.il * r.ic; }).length;
    summary.textContent = n ? (n + ' risk' + (n === 1 ? '' : 's') + ' in the register. Controls reduce the score for ' + reduced +
      '. ' + over + ' residual risk' + (over === 1 ? ' is' : 's are') + ' above the chosen appetite (' + LEVEL_NAMES[appetite] + ').') : '';
  }

  function redraw() { drawGrid(); drawTable(); drawSummary(); save(); }

  function resetForm() {
    editing = -1; form.reset();
    f.il.value = 3; f.ic.value = 3; f.rl.value = 2; f.rc.value = 3;
    submitBtn.textContent = 'Add risk'; cancelBtn.hidden = true;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = f.name.value.trim();
    if (!name) { msg.textContent = 'Give the risk a short name first.'; f.name.focus(); return; }
    var r = { name: name, cat: f.cat.value, il: +f.il.value, ic: +f.ic.value, rl: +f.rl.value, rc: +f.rc.value };
    var warn = r.rl * r.rc > r.il * r.ic ? ' Note: the residual score is higher than the inherent score. Controls shouldn\'t usually make a risk worse, so check your ratings.' : '';
    if (editing >= 0) { risks[editing] = r; msg.textContent = 'Risk ' + (editing + 1) + ' updated.' + warn; }
    else { risks.push(r); msg.textContent = 'Risk ' + risks.length + ' added.' + warn; }
    resetForm(); redraw();
  });
  cancelBtn.addEventListener('click', function () { resetForm(); msg.textContent = ''; });

  tableBody.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.hasAttribute('data-del')) {
      var i = +b.getAttribute('data-del');
      risks.splice(i, 1); msg.textContent = 'Risk deleted. Numbers have been updated.'; resetForm(); redraw();
    } else if (b.hasAttribute('data-edit')) {
      editing = +b.getAttribute('data-edit');
      var r = risks[editing];
      f.name.value = r.name; f.cat.value = r.cat; f.il.value = r.il; f.ic.value = r.ic; f.rl.value = r.rl; f.rc.value = r.rc;
      submitBtn.textContent = 'Save changes'; cancelBtn.hidden = false;
      msg.textContent = 'Editing risk ' + (editing + 1) + '.';
      f.name.focus();
    }
  });

  root.querySelectorAll('input[name="rm-view"]').forEach(function (radio) {
    radio.addEventListener('change', function () { view = radio.value; drawGrid(); });
  });
  root.querySelector('#rm-appetite').addEventListener('change', function (e) { appetite = e.target.value; redraw(); });

  root.querySelector('.rm-examples').addEventListener('click', function () {
    risks = EXAMPLES.map(function (r) { return Object.assign({}, r); });
    resetForm(); msg.textContent = 'Example risks loaded.'; redraw();
  });
  root.querySelector('.rm-clear').addEventListener('click', function () {
    if (risks.length && !window.confirm('Remove all risks from this register?')) return;
    risks = []; resetForm(); msg.textContent = 'Register cleared.'; redraw();
  });
  root.querySelector('.rm-csv').addEventListener('click', function () {
    var rows = [['No.', 'Risk', 'Category', 'Inherent likelihood', 'Inherent consequence', 'Inherent score', 'Inherent rating',
      'Residual likelihood', 'Residual consequence', 'Residual score', 'Residual rating', 'Above appetite (' + LEVEL_NAMES[appetite] + ')']];
    risks.forEach(function (r, i) {
      rows.push([i + 1, r.name, r.cat, LIK[r.il - 1], CON[r.ic - 1], r.il * r.ic, LEVEL_NAMES[rating(r.il, r.ic)],
        LIK[r.rl - 1], CON[r.rc - 1], r.rl * r.rc, LEVEL_NAMES[rating(r.rl, r.rc)], above(rating(r.rl, r.rc)) ? 'Yes' : 'No']);
    });
    var csv = rows.map(function (row) {
      return row.map(function (v) { v = String(v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }).join(',');
    }).join('\r\n');
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'risk-register.csv';
    document.body.appendChild(a); a.click(); a.remove();
    msg.textContent = 'CSV downloaded. It opens in Excel or Google Sheets.';
  });

  redraw();
})();
