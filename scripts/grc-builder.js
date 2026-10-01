// GRC model builder (/grc/model-builder.html).
// Builds an illustrative GRC model from an organisation profile: frameworks, taxonomy, committees,
// data model, obligation sources, reporting calendar and roadmap. Runs entirely in the browser;
// answers are saved only in this browser (localStorage).
(function () {
  var D = window.GRC_BUILDER, M = window.GRC_MODEL, root = document.getElementById('grc-builder');
  if (!D || !root) return;
  var KEY = 'rl-grc-builder-v1';
  var form = root.querySelector('form'), out = document.getElementById('grc-out');
  var typeSel = form.querySelector('#gb-type'), regBox = form.querySelector('#gb-regimes'), riskBox = form.querySelector('#gb-risks');
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function org(id) { for (var i = 0; i < D.orgTypes.length; i++) if (D.orgTypes[i].id === id) return D.orgTypes[i]; return D.orgTypes[0]; }

  // ---------- build the form ----------
  D.orgTypes.forEach(function (o) { var op = document.createElement('option'); op.value = o.id; op.textContent = o.label; typeSel.appendChild(op); });
  Object.keys(D.regimes).forEach(function (k) {
    var r = D.regimes[k], id = 'gb-r-' + k;
    regBox.insertAdjacentHTML('beforeend', '<label class="gb-check" for="' + id + '"><input type="checkbox" id="' + id + '" name="regime" value="' + k + '"> ' + esc(r.label) + ' <span class="small">(' + esc(r.reg) + ')</span></label>');
  });
  Object.keys(D.risks).forEach(function (k) {
    var r = D.risks[k], id = 'gb-k-' + k;
    riskBox.insertAdjacentHTML('beforeend', '<label class="gb-check" for="' + id + '"><input type="checkbox" id="' + id + '" name="risk" value="' + k + '"> ' + esc(r.label) + '</label>');
  });
  function applyDefaults() {
    var o = org(typeSel.value);
    Array.prototype.forEach.call(regBox.querySelectorAll('input'), function (c) { c.checked = o.regimes.indexOf(c.value) >= 0; });
    Array.prototype.forEach.call(riskBox.querySelectorAll('input'), function (c) { c.checked = o.risks.indexOf(c.value) >= 0; });
  }
  typeSel.addEventListener('change', applyDefaults);

  function read() {
    var v = function (n) { var c = form.querySelector('input[name="' + n + '"]:checked'); return c ? c.value : ''; };
    return {
      type: typeSel.value, name: form.querySelector('#gb-name').value.trim(), complexity: v('complexity'), maturity: v('maturity'),
      regimes: Array.prototype.filter.call(regBox.querySelectorAll('input'), function (c) { return c.checked; }).map(function (c) { return c.value; }),
      risks: Array.prototype.filter.call(riskBox.querySelectorAll('input'), function (c) { return c.checked; }).map(function (c) { return c.value; })
    };
  }
  function write(s) {
    typeSel.value = s.type; form.querySelector('#gb-name').value = s.name || '';
    ['complexity', 'maturity'].forEach(function (n) { var c = form.querySelector('input[name="' + n + '"][value="' + s[n] + '"]'); if (c) c.checked = true; });
    Array.prototype.forEach.call(regBox.querySelectorAll('input'), function (c) { c.checked = s.regimes.indexOf(c.value) >= 0; });
    Array.prototype.forEach.call(riskBox.querySelectorAll('input'), function (c) { c.checked = s.risks.indexOf(c.value) >= 0; });
  }
  var saved = null;
  try { saved = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}
  if (saved && saved.type) write(saved); else { typeSel.value = 'rse'; applyDefaults(); }

  // ---------- generate the model ----------
  var CX = { single: 'Single entity', group: 'Group with several entities', complex: 'Complex group with multiple licences and regulators', intl: 'International group' };
  var MX = { adhoc: 'Ad hoc (spreadsheets, separate registers)', defined: 'Defined (frameworks exist, registers separate)', integrated: 'Partly integrated (some shared data or a GRC tool)' };

  function model(s) {
    var o = org(s.type), m = { s: s, org: o, docs: [], regimes: [], committees: [], roadmap: [], calendar: [] };
    var big = s.complexity !== 'single';
    // framework documents (always-on core plus regime documents)
    var core = [['Risk management framework', 1, 'Board', 'Core'], ['Risk appetite statement', 1, 'Board', 'Core'], ['Risk taxonomy and definitions', 3, 'Chief risk officer', 'Core'],
      ['Risk assessment and rating methodology', 3, 'Chief risk officer', 'Core'], ['Compliance management framework and obligations register', 2, 'Board or board committee', 'Core'],
      ['Incident and breach management policy', 2, 'Executive owner', 'Core'], ['Issues and actions management standard', 3, 'Chief risk officer', 'Core'],
      ['Control framework and testing methodology', 3, 'Chief risk officer', 'Core'], ['Policy on policies (document hierarchy and approvals)', 2, 'Board', 'Core'], ['Internal audit charter', 1, 'Board audit committee', 'Core']];
    var seen = {};
    function addDoc(d, src, url) { var k = d[0].toLowerCase(); if (seen[k]) { seen[k].src += ', ' + src; return; } var x = { name: d[0], level: d[1], approver: d[2], src: src, url: url || '' }; seen[k] = x; m.docs.push(x); }
    core.forEach(function (d) { addDoc(d, d[3]); });
    s.regimes.forEach(function (k) { var r = D.regimes[k]; if (!r) return; m.regimes.push(r); r.docs.forEach(function (d) { addDoc(d, r.label, r.url); }); });
    if (s.risks.indexOf('thirdparty') >= 0 && s.regimes.indexOf('cps230') < 0) addDoc(['Third-party and outsourcing policy', 2, 'Board or executive'], 'Third-party risk');
    if (s.risks.indexOf('tech') >= 0 && s.regimes.indexOf('cps234') < 0) addDoc(['Information security policy', 2, 'Executive owner'], 'Technology and cyber risk');
    if (s.regimes.indexOf('cps230') < 0) addDoc(['Business continuity plan', 2, 'Executive owner'], 'Operational risk');
    m.docs.sort(function (a, b) { return a.level - b.level || a.name.localeCompare(b.name); });

    // committees
    var apra = o.apra;
    m.committees.push(['Board', 'Approves frameworks, risk appetite and key policies; sets the tone; oversees management.']);
    if (big || apra) {
      m.committees.push(['Board risk committee', 'Oversees the risk profile against appetite, the risk management framework and the CRO; recommends appetite to the board.']);
      m.committees.push(['Board audit committee', 'Oversees financial reporting, internal and external audit, and audit issue closure.']);
    } else m.committees.push(['Board audit and risk committee', 'Combined oversight of risk, compliance, audit and financial reporting.']);
    if (s.regimes.indexOf('cps511') >= 0 || big) m.committees.push(['Board remuneration committee', 'Oversees remuneration design, risk and conduct adjustments, and consequence management.']);
    if (o.superfund || o.id === 're' || o.id === 'li') m.committees.push(['Board investment committee', 'Oversees investment strategy, performance, valuation and liquidity.']);
    if (s.regimes.indexOf('rg259') >= 0) m.committees.push(['Compliance committee (where required for registered schemes)', 'Monitors compliance with scheme compliance plans and reports to the responsible entity board.']);
    m.committees.push(['Executive risk committee', 'Manages enterprise and Level 1 risks across the business; escalates appetite breaches.']);
    if (s.complexity === 'complex' || s.complexity === 'intl') {
      m.committees.push(['Operational risk and resilience committee', 'Owns operational, third-party and resilience risks (Level 2), including critical operations and tolerances.']);
      m.committees.push(['Compliance and conduct committee', 'Owns compliance, conduct and regulatory change; reviews breaches and remediation.']);
      if (s.risks.indexOf('tech') >= 0) m.committees.push(['Technology and cyber risk committee', 'Owns technology, cyber and data risks and the information security program.']);
      if (s.risks.indexOf('credit') >= 0 || s.risks.indexOf('market') >= 0 || s.risks.indexOf('liquidity') >= 0) m.committees.push(['Financial risk committees (asset and liability, credit, investment)', 'Own financial risk types against their limits.']);
      if (s.regimes.indexOf('aml') >= 0) m.committees.push(['Financial crime committee', 'Oversees the ML/TF risk assessment, the AML/CTF program and sanctions.']);
      m.committees.push(['Legal entity and business unit risk forums', 'Manage Level 3 risks, incidents, issues and controls; escalate to category committees.']);
    } else {
      m.committees.push(['Operational risk and compliance forum', 'Combines oversight of operational, compliance, conduct and technology risks at management level.']);
    }

    // data model nodes in scope
    var flags = {}; s.regimes.forEach(function (k) { if (D.regimes[k] && D.regimes[k].flag) flags[D.regimes[k].flag] = true; });
    m.nodes = M.nodes.filter(function (n) { return !n.when || flags[n.when]; });
    var ids = {}; m.nodes.forEach(function (n) { ids[n.id] = true; });
    m.edges = M.edges.filter(function (e) { return ids[e.a] && ids[e.b]; });

    // roadmap
    var f = { single: 0.6, group: 1, complex: 1.4, intl: 1.7 }[s.complexity] || 1;
    var g = { adhoc: 1.2, defined: 1, integrated: 0.75 }[s.maturity] || 1;
    var phases = [['0. Mandate and governance', 6], ['1. Discover the current state', 9], ['2. Design the architecture', 12], ['3. Framework documents', 10], ['4. Technology and data', 20], ['5. Implement in waves', 30], ['6. Embed, assure and improve', 0]];
    var t = 0;
    phases.forEach(function (p, i) {
      var w = Math.round(p[1] * f * g);
      var start = i === 3 ? Math.round(t - w * 0.6) : (i === 4 ? Math.round(t - w * 0.3) : t);
      m.roadmap.push({ name: p[0], start: Math.max(0, start), weeks: w });
      if (w) t = Math.max(t, start + w);
    });
    m.totalWeeks = t;

    // calendar
    m.calendar = [['Monthly', 'KRIs, incidents and breaches, issue ageing to management committees'], ['Quarterly', 'Risk profile against appetite to the board risk committee; RCSA updates; compliance monitoring results'],
      ['Annually', 'Material and enterprise risk review; risk appetite statement review; policy reviews; internal audit plan aligned to the assurance map']];
    if (flags.cps230) m.calendar.push(['Annually', 'Review critical operations, tolerance levels and business continuity testing; material service provider register to APRA']);
    if (s.regimes.indexOf('aml') >= 0) m.calendar.push(['Periodically', 'Refresh the ML/TF risk assessment; independent evaluation of the AML/CTF program']);
    if (s.regimes.indexOf('cps220') >= 0) m.calendar.push(['At least every 3 years', 'Comprehensive independent review of the risk management framework (CPS 220 / SPS 220)']);
    if (s.regimes.indexOf('listed') >= 0) m.calendar.push(['Annually', 'Board review of the risk management framework (ASX Principles) and corporate governance statement']);
    if (s.regimes.indexOf('climate') >= 0) m.calendar.push(['Annually', 'Climate scenario analysis and climate-related disclosures, where required']);
    return m;
  }

  // ---------- render ----------
  function diagram(m) {
    var NS = 'http://www.w3.org/2000/svg', W = 1020, H = 600;
    var FILL = { gov: '#1b3a5c', org: '#e8f0fe', core: '#2563eb', act: '#ffffff' }, TXT = { gov: '#fff', org: '#0f2942', core: '#fff', act: '#0f2942' };
    var by = {}; m.nodes.forEach(function (n) { by[n.id] = n; });
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Data model for this GRC model: ' + m.nodes.length + ' objects and ' + m.edges.length + ' links" class="grc-map-svg">';
    m.edges.forEach(function (e) { var a = by[e.a], b = by[e.b]; s += '<path d="M' + (a.x + 46) + ',' + (a.y + 4) + ' L' + (b.x + 46) + ',' + (b.y + 4) + '" stroke="#9fb4d6" stroke-width="1.3" fill="none"/>'; });
    m.nodes.forEach(function (n) {
      s += '<rect x="' + (n.x - 40) + '" y="' + (n.y - 21) + '" width="172" height="50" rx="10" fill="' + FILL[n.group] + '" stroke="' + (n.group === 'act' ? '#2563eb' : 'none') + '"/>';
      var words = n.label.split(' '), lines = [''];
      words.forEach(function (w) { var l = lines[lines.length - 1]; if ((l + ' ' + w).trim().length > 22) lines.push(w); else lines[lines.length - 1] = (l + ' ' + w).trim(); });
      lines.forEach(function (ln, i) { s += '<text x="' + (n.x + 46) + '" y="' + (n.y + 8 + (i - (lines.length - 1) / 2) * 15) + '" text-anchor="middle" font-size="12.5" font-weight="600" fill="' + TXT[n.group] + '">' + esc(ln) + '</text>'; });
    });
    return s + '</svg>';
  }

  function render(m) {
    var s = m.s, o = m.org, h = [];
    var title = s.name ? esc(s.name) + ': illustrative GRC model' : 'Your illustrative GRC model';
    h.push('<h2 id="gb-result">' + title + '</h2>');
    h.push('<div class="callout warn"><p><strong>Illustrative, not advice.</strong> This model is generated from general patterns for the profile you chose. It is a starting point for discussion and design, not a statement of what your organisation must have. Check every requirement against the official sources and your own legal and regulatory advice.</p></div>');
    h.push('<div class="table-wrap"><table><tbody><tr><th>Organisation type</th><td>' + esc(o.label) + '</td></tr><tr><th>Structure</th><td>' + esc(CX[s.complexity] || '') + '</td></tr><tr><th>Current maturity</th><td>' + esc(MX[s.maturity] || '') + '</td></tr><tr><th>Regimes</th><td>' + m.regimes.map(function (r) { return esc(r.label); }).join('; ') + '</td></tr></tbody></table></div>');

    h.push('<h3>1. Framework and policy set</h3><p>' + m.docs.length + ' documents, arranged in the policy hierarchy (1 = board-level framework, 2 = policy, 3 = standard, 4 = procedure).</p>');
    h.push('<div class="table-wrap"><table><thead><tr><th>Document</th><th>Level</th><th>Typical approver</th><th>Why it is here</th></tr></thead><tbody>' +
      m.docs.map(function (d) { return '<tr><td>' + esc(d.name) + '</td><td>' + d.level + '</td><td>' + esc(d.approver) + '</td><td>' + (d.url ? '<a href="' + d.url + '">' + esc(d.src) + '</a>' : esc(d.src)) + '</td></tr>'; }).join('') + '</tbody></table></div>');

    h.push('<h3>2. Risk taxonomy</h3>');
    var ent = D.enterprise[o.id] || [];
    h.push('<p><strong>Example enterprise risks</strong> (top-down, owned by executives, overseen by the board):</p><ul>' + ent.map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('') + '</ul>');
    h.push('<p><strong>Levels 1 to 3.</strong> ' + (o.apra ? 'For an APRA-regulated entity, Level 1 categories marked "material" would usually be the material risks covered by the risk management framework and the risk appetite statement.' : 'Level 1 categories marked "material" are the ones most organisations of this type treat as material; confirm materiality yourself.') + '</p>');
    h.push('<div class="table-wrap"><table><thead><tr><th>Level 1 category</th><th>Level 2 sub-types</th><th>Example Level 3 risks</th></tr></thead><tbody>' +
      s.risks.map(function (k) { var r = D.risks[k]; return '<tr><th>' + esc(r.label) + (r.material ? ' <span class="badge">material</span>' : '') + '</th><td>' + r.l2.map(esc).join('; ') + '</td><td>' + r.l3.map(esc).join('<br>') + '</td></tr>'; }).join('') + '</tbody></table></div>');

    h.push('<h3>3. Governance structure</h3><div class="table-wrap"><table><thead><tr><th>Committee or forum</th><th>Role in the GRC system</th></tr></thead><tbody>' +
      m.committees.map(function (c) { return '<tr><th>' + esc(c[0]) + '</th><td>' + esc(c[1]) + '</td></tr>'; }).join('') + '</tbody></table></div>');
    h.push('<p class="small">Three lines: the first line owns risks, obligations and controls; the second line (risk and compliance) sets the framework and challenges; internal audit gives independent assurance. See <a href="/grc/governance-and-operating-model.html">governance and operating model</a>.</p>');

    h.push('<h3>4. Data model: how everything links</h3><p>' + m.nodes.length + ' types of record and ' + m.edges.length + ' relationships apply to this profile. Explore each one on the <a href="/grc/grc-data-model.html">interactive data model page</a>.</p>');
    h.push('<div class="grc-map">' + diagram(m) + '</div>');

    h.push('<h3>5. Obligation sources to load</h3><div class="table-wrap"><table><thead><tr><th>Regime</th><th>Regulator</th><th>Read more</th></tr></thead><tbody>' +
      m.regimes.map(function (r) { return '<tr><td>' + esc(r.label) + '</td><td>' + esc(r.reg) + '</td><td><a href="' + r.url + '">Our guide</a></td></tr>'; }).join('') + '</tbody></table></div>');
    h.push('<p class="small">Also load internal policies, key contracts (including service provider agreements) and any licence conditions. See <a href="/grc/obligations-architecture.html">obligations architecture</a>.</p>');

    h.push('<h3>6. Reporting and review calendar</h3><div class="table-wrap"><table><thead><tr><th>When</th><th>Activity</th></tr></thead><tbody>' +
      m.calendar.map(function (c) { return '<tr><th>' + esc(c[0]) + '</th><td>' + esc(c[1]) + '</td></tr>'; }).join('') + '</tbody></table></div>');

    h.push('<h3>7. Implementation roadmap</h3><p>Indicative only: about ' + Math.round(m.totalWeeks / 4.3) + ' months to complete the first rollout, then ongoing improvement. See <a href="/grc/establishing-a-grc-system.html">establishing a GRC system</a> for what each phase involves.</p>');
    var max = Math.max(m.totalWeeks + 10, 20), bars = m.roadmap.map(function (p, i) {
      var x = 210 + p.start / max * 520, w = p.weeks ? Math.max(6, p.weeks / max * 520) : 730 - x;
      return '<text x="10" y="' + (28 + i * 30) + '" font-size="12.5" fill="#0f2942">' + esc(p.name) + '</text><rect x="' + x + '" y="' + (16 + i * 30) + '" width="' + w + '" height="16" rx="4" fill="' + (i < 2 ? '#1b3a5c' : i < 5 ? '#2563eb' : '#e8f0fe') + '" stroke="#2563eb" stroke-width="' + (i >= 5 ? 1 : 0) + '"/>' +
        '<text x="' + Math.min(x + w + 6, 735) + '" y="' + (28 + i * 30) + '" font-size="11" fill="#0f2942">' + (p.weeks ? p.weeks + ' wks' : 'ongoing') + '</text>';
    }).join('');
    h.push('<figure class="diagram"><svg viewBox="0 0 790 ' + (30 + m.roadmap.length * 30) + '" role="img" aria-label="Roadmap of seven phases over about ' + Math.round(m.totalWeeks / 4.3) + ' months">' + bars + '</svg><figcaption>Bars show indicative weeks; phases overlap.</figcaption></figure>');

    h.push('<h3>Save or share</h3><p class="gb-actions"><button type="button" class="btn" data-x="csv">Download as spreadsheet (CSV)</button> <button type="button" class="btn secondary" data-x="json">Download data (JSON)</button> <button type="button" class="btn secondary" data-x="print">Print or save as PDF</button></p>');
    out.innerHTML = h.join('\n');
    out.hidden = false;
    out.querySelector('[data-x="csv"]').addEventListener('click', function () { download(csv(m), 'grc-model.csv', 'text/csv'); });
    out.querySelector('[data-x="json"]').addEventListener('click', function () { download(JSON.stringify(exportable(m), null, 2), 'grc-model.json', 'application/json'); });
    out.querySelector('[data-x="print"]').addEventListener('click', function () { window.print(); });
  }

  function exportable(m) {
    return { generated: new Date().toISOString().slice(0, 10), source: 'RiskLens Australia GRC model builder (illustrative, not advice)', profile: { type: m.org.label, structure: CX[m.s.complexity], maturity: MX[m.s.maturity], regimes: m.regimes.map(function (r) { return r.label; }) },
      documents: m.docs.map(function (d) { return { name: d.name, level: d.level, approver: d.approver, source: d.src }; }),
      enterpriseRisks: D.enterprise[m.org.id] || [],
      taxonomy: m.s.risks.map(function (k) { var r = D.risks[k]; return { level1: r.label, material: r.material, level2: r.l2, level3Examples: r.l3 }; }),
      committees: m.committees.map(function (c) { return { name: c[0], role: c[1] }; }),
      dataModel: { objects: m.nodes.map(function (n) { return n.label; }), relationships: m.edges.map(function (e) { var a, b; m.nodes.forEach(function (n) { if (n.id === e.a) a = n.label; if (n.id === e.b) b = n.label; }); return a + ' ' + e.label + ' ' + b; }) },
      calendar: m.calendar.map(function (c) { return { when: c[0], activity: c[1] }; }),
      roadmap: m.roadmap.map(function (p) { return { phase: p.name, startWeek: p.start, weeks: p.weeks || 'ongoing' }; }) };
  }
  function csv(m) {
    var q = function (v) { return '"' + String(v).replace(/"/g, '""') + '"'; }, rows = [['Section', 'Item', 'Detail 1', 'Detail 2', 'Detail 3']];
    m.docs.forEach(function (d) { rows.push(['Framework document', d.name, 'Level ' + d.level, d.approver, d.src]); });
    (D.enterprise[m.org.id] || []).forEach(function (e) { rows.push(['Enterprise risk', e, '', '', '']); });
    m.s.risks.forEach(function (k) { var r = D.risks[k]; r.l2.forEach(function (l2) { rows.push(['Risk taxonomy', r.label, l2, r.material ? 'material' : '', '']); }); r.l3.forEach(function (l3) { rows.push(['Example Level 3 risk', r.label, l3, '', '']); }); });
    m.committees.forEach(function (c) { rows.push(['Committee', c[0], c[1], '', '']); });
    exportable(m).dataModel.relationships.forEach(function (r) { rows.push(['Data model link', r, '', '', '']); });
    m.calendar.forEach(function (c) { rows.push(['Calendar', c[0], c[1], '', '']); });
    m.roadmap.forEach(function (p) { rows.push(['Roadmap', p.name, 'start week ' + p.start, p.weeks ? p.weeks + ' weeks' : 'ongoing', '']); });
    return '﻿' + rows.map(function (r) { return r.map(q).join(','); }).join('\r\n');
  }
  function download(text, name, type) {
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: type })); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var s = read();
    if (!s.risks.length) { alert('Choose at least one risk category.'); return; }
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (err) {}
    render(model(s));
    var r = document.getElementById('gb-result'); if (r) r.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  var rb = form.querySelector('#gb-reset');
  if (rb) rb.addEventListener('click', function () { try { localStorage.removeItem(KEY); } catch (e) {} applyDefaults(); out.hidden = true; });
})();
