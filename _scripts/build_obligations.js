// Build the obligations library (/obligations/index.html) from the GRC model builder's reference data
// (scripts/grc-builder-data.js), so the library, the builder and its IDs always agree.
// Run:  node _scripts/build_obligations.js && python3 _scripts/sync_layout.py && python3 _scripts/check_links.py
// The page is complete without JavaScript; scripts/obligations.js adds search, filters and downloads.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
global.window = global;
require(path.join(ROOT, 'scripts/grc-builder-data.js'));
const D = window.GRC_BUILDER;
require(path.join(ROOT, 'scripts/obligation-details.js'));
const DET = window.GRC_OBLIGATION_DETAILS || {};
const { fillHtml } = require('./facts_fill.js');   // {fact:ID} placeholders -> fact markers
const REVIEWED = '8 October 2026';

// regime codes and short labels, and regime groups: taken from the builder so IDs match
const eng = fs.readFileSync(path.join(ROOT, 'scripts/grc-builder.js'), 'utf8');
const SHORT = eval('(' + eng.match(/var SHORT = (\{[^\n]*\});/)[1] + ')');
const GROUPS = eval('(' + eng.match(/var REG_GROUPS = (\[[\s\S]*?\n  \]);/)[1] + ')');
const OWNER = eval('(' + eng.match(/var REG_OWNER = (\{[^\n]*\});/)[1] + ')');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = n => (n < 10 ? '0' + n : String(n));
const L2 = {};
D.risks.forEach(r => r.l2.forEach(x => { L2[x[0]] = { label: x[1], risk: r.label }; }));
const ENTS = {};
D.entities.forEach(e => e.regimes.forEach(k => { (ENTS[k] = ENTS[k] || []).push(e.id); }));
const BODY = [['APRA', /APRA/], ['ASIC', /ASIC/], ['AUSTRAC', /AUSTRAC/], ['OAIC', /OAIC/], ['ACCC', /ACCC/], ['ASX', /ASX/], ['ACNC', /ACNC/], ['DFAT', /DFAT/], ['Home Affairs', /Home Affairs/], ['Border Force', /Border Force/], ['Finance', /Department of Finance/]];
const bodiesOf = reg => BODY.filter(b => b[1].test(reg)).map(b => b[0]);

let total = 0, nclocks = 0, ndetail = 0;
const sections = GROUPS.map(([gname, ids]) => {
  const regs = ids.map(k => {
    const r = D.regimes[k];
    const det = DET[k];
    const rows = r.themes.map((t, i) => {
      total++;
      const id = 'OB-' + SHORT[k][0] + '-' + pad(i + 1);
      const risks = t[1].map(x => L2[x] ? L2[x].label : x);
      const items = det && det.themes[i + 1] || [];
      ndetail += items.length;
      const list = items.length ? `<details class="ob-detail"><summary>${items.length} individual obligation${items.length > 1 ? 's' : ''}</summary><ol>${items.map((it, j) => `<li data-id="${id}.${j + 1}"><span class="ob-it">${esc(it[0])}</span> <span class="ob-cite">${esc(it[1])}</span></li>`).join('')}</ol></details>` : '';
      return `        <tr data-text="${esc((t[0] + ' ' + t[2] + ' ' + t[3] + ' ' + risks.join(' ') + ' ' + items.map(it => it.join(' ')).join(' ')).toLowerCase())}"><th scope="row"><span class="gb-id">${id}</span></th><td><span class="ob-sum">${esc(t[0])}</span>${list}</td><td>${esc(t[2])}</td><td>${esc(t[3])}</td><td>${esc(risks.join('; '))}</td></tr>`;
    }).join('\n');
    const checked = det ? `    <p class="ob-meta ob-checked">Individual obligations checked against ${det.source.map(([l, u]) => `<a href="${esc(u)}">${esc(l)}</a>`).join(', ')} on ${esc(det.checkedText)}.</p>\n` : '';
    const clocks = (r.clocks || []).map(c => { nclocks++; return `<li><strong>${esc(c[1])}</strong>: ${esc(c[0])} (${esc(c[2])})</li>`; }).join('');
    return `  <section class="ob-reg" id="${k}" data-reg="${k}" data-bodies="${bodiesOf(r.reg).join(' ')}" data-ents="${(ENTS[k] || []).join(' ')}" data-clock="${r.clocks ? 1 : 0}" data-text="${esc((r.label + ' ' + r.reg + ' ' + r.applies + ' ' + SHORT[k][1] + ' ' + (r.clocks || []).map(c => c.join(' ')).join(' ')).toLowerCase())}">
    <h3>${esc(r.label)}</h3>
    <p class="ob-meta"><span class="gb-chip">${esc(r.reg)}</span> <span class="ob-applies">Applies to: ${esc(r.applies)}</span></p>
    <p class="ob-meta">Typical owner: ${esc(OWNER[k] || 'Executive owner')}. <a href="${r.url}">Read our guide</a></p>
${checked}${clocks ? `    <div class="ob-clocks"><p><strong>Notification deadlines</strong></p><ul>${clocks}</ul></div>\n` : ''}    <div class="table-wrap" tabindex="0"><table class="ob-table">
      <thead><tr><th scope="col">ID</th><th scope="col">Obligation (summary)</th><th scope="col">Control objective</th><th scope="col">Evidence</th><th scope="col">Related risks</th></tr></thead>
      <tbody>
${rows}
      </tbody>
    </table></div>
  </section>`;
  }).join('\n');
  return `  <div class="ob-group" data-group="${esc(gname)}">\n  <h2>${esc(gname)}</h2>\n${regs}\n  </div>`;
}).join('\n\n');

const nreg = Object.keys(D.regimes).length;
const entOpts = D.entities.map(e => `<option value="${e.id}">${esc(e.label)}</option>`).join('');
const bodyOpts = ['APRA', 'ASIC', 'AUSTRAC', 'OAIC', 'ACCC', 'ASX', 'ACNC', 'DFAT', 'Home Affairs', 'Border Force', 'Finance'].map(b => `<option value="${b}">${b}</option>`).join('');

const tpl = fs.readFileSync(path.join(ROOT, '_scripts/page-template.html'), 'utf8');
const head = tpl.slice(0, tpl.indexOf('<title>'));
const html = `${head}<title>Obligations library | RiskLens Australia</title>
<meta name="description" content="A free, searchable library of ${total} plain-English obligation summaries from ${nreg} Australian regimes (APRA, ASIC, AUSTRAC, OAIC and more), with control objectives, evidence, related risks and notification deadlines. Download as Excel or CSV.">
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<!-- HEADER:START -->
<!-- HEADER:END -->

<main id="main" class="article wide ob-page">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li>Obligations library</li></ol></nav>

  <h1>Obligations library</h1>
  <p class="summary">${total} plain-English obligation summaries from ${nreg} Australian regimes, each with a control objective, the evidence that shows it is met, the risks it relates to and any notification deadlines. Search it, filter it by organisation type, or download it.</p>
  <div class="page-meta">
    <span>${total} obligation themes</span>
    <span>${nreg} regimes</span>
    <span>${nclocks} notification deadlines</span>
    <span>Last reviewed: ${REVIEWED}</span>
  </div>

  <aside class="takeaways" aria-labelledby="kt">
    <h2 id="kt">Key takeaways</h2>
    <ul>
      <li>Each entry summarises a group of related obligations in plain English. It is a starting point for an obligations register, not a substitute for the law: always read the official source.</li>
      <li>Every entry has a control objective and the evidence that would show it is met, so it can be linked to controls and tested.</li>
      <li>Filter by organisation type to see the regimes that usually apply. Whether a regime applies depends on licences, products, size and thresholds.</li>
      <li>The IDs match the <a href="/grc/model-builder.html">GRC model builder</a>, which links each obligation to risks, controls and committees.</li>
    </ul>
  </aside>

  <div class="widget ob-tools" id="ob-tools" hidden>
    <div class="ob-filters">
      <p><label for="ob-q">Search</label><input type="search" id="ob-q" placeholder="e.g. complaints, 72 hours, conflicts"></p>
      <p><label for="ob-ent">Organisation type</label><select id="ob-ent"><option value="">All types</option>${entOpts}</select></p>
      <p><label for="ob-body">Regulator</label><select id="ob-body"><option value="">All regulators</option>${bodyOpts}</select></p>
      <p class="ob-check"><input type="checkbox" id="ob-clock"><label for="ob-clock">Only regimes with notification deadlines</label></p>
    </div>
    <p class="ob-count" id="ob-count" aria-live="polite"></p>
    <p class="ob-dl"><button type="button" data-dl="xlsx">Download Excel</button> <button type="button" class="secondary" data-dl="csv">Download CSV</button> <span class="small">Downloads include what you have filtered.</span></p>
  </div>

  <nav class="ob-jump" aria-label="Regimes in this library"><p><strong>Jump to:</strong> ${GROUPS.map(([g, ids]) => ids.map(k => `<a href="#${k}">${esc(SHORT[k][1])}</a>`).join(' ')).join(' ')}</p></nav>

${sections}

  <h2>How to use this library</h2>
  <ul>
    <li><strong>Start an obligations register:</strong> download the library, keep the regimes that apply to you, then break each summary into the individual obligations in the legislation or standard, with citations, interpretations and owners. The <a href="/tools/obligations-register-template.html">obligations register template</a> has the fields.</li>
    <li><strong>Link to controls:</strong> use the control objective and evidence columns to find or design the controls that meet each obligation. <a href="/grc/obligations-architecture.html">Obligations architecture</a> explains the structure.</li>
    <li><strong>Plan incident triage:</strong> the notification deadlines show the clocks every incident should be tested against. See the <a href="/playbooks/respond-to-an-incident.html">incident response playbook</a>.</li>
  </ul>
  <p>Every summary matches the guide it links to, where the detail and official sources are. Regulatory requirements change, so check the source before relying on any entry. Spotted an error? Use the correction link below.</p>

  <section class="related" aria-labelledby="related-h">
    <h2 id="related-h">Related topics</h2>
    <ul>
      <li data-href="/grc/obligations-architecture.html" data-label="Obligations architecture"></li>
      <li data-href="/grc/model-builder.html" data-label="GRC model builder"></li>
      <li data-href="/compliance/breach-reporting.html" data-label="Breach and incident reporting obligations"></li>
      <li data-href="/standards/" data-label="Standards library"></li>
    </ul>
  </section>

  <section class="sources" aria-labelledby="sources-h">
    <h2 id="sources-h">Sources</h2>
    <ol>
      <li>Each regime's guide on this site, linked above, lists the legislation and regulator guidance it summarises.</li>
      <li>Federal Register of Legislation, <a href="https://www.legislation.gov.au/">legislation.gov.au</a>; APRA, <a href="https://www.apra.gov.au/">apra.gov.au</a>; ASIC, <a href="https://asic.gov.au/">asic.gov.au</a>; AUSTRAC, <a href="https://www.austrac.gov.au/">austrac.gov.au</a>; OAIC, <a href="https://www.oaic.gov.au/">oaic.gov.au</a>.</li>
    </ol>
  </section>

  <p class="last-reviewed">Last reviewed: ${REVIEWED}</p>
</main>

<!-- FOOTER:START -->
<!-- FOOTER:END -->

<script src="/scripts/xlsx-lite.js"></script>
<script src="/scripts/obligations.js"></script>
</body>
</html>
`;
fs.mkdirSync(path.join(ROOT, 'obligations'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'obligations/index.html'), fillHtml(html));
console.log(`obligations library: ${total} themes, ${nreg} regimes, ${nclocks} deadlines`);
