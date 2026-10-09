// Build "Obligations by sector": /obligations/sectors.html (picker and comparison) and one page per
// organisation type (/obligations/<slug>.html), from the same data as the obligations library
// (scripts/grc-builder-data.js), so sector pages, the library and the GRC model builder always agree.
// Run after build_obligations.js:  node _scripts/build_obligation_sectors.js && python3 _scripts/sync_layout.py
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
global.window = global;
require(path.join(ROOT, 'scripts/grc-builder-data.js'));
const D = window.GRC_BUILDER;
const { fillHtml } = require('./facts_fill.js');   // {fact:ID} placeholders -> fact markers
require(path.join(ROOT, 'scripts/obligation-details.js'));
const DET = window.GRC_OBLIGATION_DETAILS || {};
const REVIEWED = '9 October 2026';
const eng = fs.readFileSync(path.join(ROOT, 'scripts/grc-builder.js'), 'utf8');
const SHORT = eval('(' + eng.match(/var SHORT = (\{[^\n]*\});/)[1] + ')');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = n => (n < 10 ? '0' + n : String(n));

// organisation types, in menu order: [entity id, slug, name, plural phrase, sector guide, financial services?]
const SECTORS = [
  ['rse', 'superannuation', 'Superannuation', 'super trustees (RSE licensees)', '/sectors/superannuation.html', true],
  ['adi', 'banking', 'Banking', 'banks and other ADIs', '/sectors/banking.html', true],
  ['gi', 'general-insurance', 'General insurance', 'general insurers', '/sectors/general-insurance.html', true],
  ['li', 'life-insurance', 'Life insurance', 'life insurers', '/sectors/life-insurance.html', true],
  ['phi', 'private-health-insurance', 'Private health insurance', 'private health insurers', '/sectors/private-health-insurance.html', true],
  ['re', 'funds-management', 'Funds management', 'responsible entities and fund managers', '/sectors/managed-investment-schemes.html', true],
  ['advice', 'financial-advice', 'Financial advice', 'financial advice licensees', '/sectors/financial-advice-licensees.html', true],
  ['credit', 'credit-and-lending', 'Credit and lending', 'credit licensees and non-bank lenders', '/sectors/credit-and-non-bank-lenders.html', true],
  ['pay', 'payments-and-fintech', 'Payments and fintech', 'payments and fintech businesses', '/sectors/payments-and-fintech.html', true],
  ['listed', 'listed', 'Listed companies', 'listed companies outside financial services', '/sectors/listed-companies.html', false],
  ['nfp', 'not-for-profits', 'Not-for-profits and charities', 'charities and not-for-profits', '/sectors/not-for-profits-and-charities.html', false],
  ['gov', 'public-sector', 'Commonwealth public sector', 'Commonwealth entities', '/sectors/public-sector.html', false],
];
// themes for grouping regimes on sector pages
const THEMES = [
  ['Governance and accountability', ['cps510', 'far', 'cps511', 'conflicts', 'whistle']],
  ['Risk, resilience and cyber', ['cps220', 'cps230', 'cps234', 'cps190', 'ransom', 'ai']],
  ['Capital, liquidity and investment', ['capital', 'liquidity', 'sps515', 'sps530', 'sis']],
  ['Licensing, conduct and disclosure', ['afsl', 'advice', 'credit', 'insurance', 'rg259', 'ddo', 'disclosure', 'rg97', 'idr', 'scams']],
  ['Insurance sector rules', ['lifeact', 'phiact']],
  ['Breaches and remediation', ['breach', 'remed']],
  ['Financial crime', ['aml', 'sanctions', 'abc']],
  ['Privacy and data', ['privacy']],
  ['Sustainability, reporting and sector rules', ['climate', 'modslav', 'listed', 'acnc', 'pgpa']],
];
// sector-specific notes where the shared regimes don't tell the whole story
const NOTES = {
  phi: 'Private health insurance is not a "financial product" under the Corporations Act, so ASIC\'s licensing, conduct and breach reporting regimes don\'t apply to health insurance products. Product, premium and community rating rules come from the <em>Private Health Insurance Act 2007</em> (see "Insurance sector rules" below), complaints go to the Commonwealth Ombudsman (as Private Health Insurance Ombudsman), and consumer law applies. The <a href="/sectors/private-health-insurance.html">private health insurance guide</a> explains these rules.',
  li: 'Life insurers also have rules specific to life insurance, such as statutory funds under the <em>Life Insurance Act 1995</em>, caps on advice commissions and the Life Insurance Code of Practice (see "Insurance sector rules" below). The <a href="/sectors/life-insurance.html">life insurance guide</a> explains them.',
  gi: 'General insurers also have rules specific to general insurance, such as the <em>Insurance Act 1973</em> and APRA\'s general insurance standards. See the <a href="/sectors/general-insurance.html">general insurance guide</a>.',
  rse: 'Super trustees also have extensive SIS Act covenants and super-specific prudential standards. See <a href="/sectors/superannuation.html">Superannuation trustee governance</a>.',
};
const tpl = fs.readFileSync(path.join(ROOT, '_scripts/page-template.html'), 'utf8');
const head = tpl.slice(0, tpl.indexOf('<title>'));
const wrap = (title, desc, crumb, body, cls = 'article') => `${head}<title>${esc(title)} | RiskLens Australia</title>
<meta name="description" content="${esc(desc)}">
<link rel="stylesheet" href="/styles.css">
</head>
<body>

<!-- HEADER:START -->
<!-- HEADER:END -->

<main id="main" class="${cls}">
  <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/compliance/">Compliance</a></li>${crumb}</ol></nav>
${body}
</main>

<!-- FOOTER:START -->
<!-- FOOTER:END -->

</body>
</html>
`;
const regsOf = id => D.entities.find(e => e.id === id).regimes;
const clocksOf = ids => ids.flatMap(k => (D.regimes[k].clocks || []).map(c => [k, c]));

function sectorPage([id, slug, name, plural, guide, fs_]) {
  const ids = regsOf(id);
  const set = new Set(ids);
  const nthemes = ids.reduce((n, k) => n + D.regimes[k].themes.length, 0);
  const clocks = clocksOf(ids);
  const groups = THEMES.map(([t, list]) => [t, list.filter(k => set.has(k))]).filter(g => g[1].length);
  const sections = groups.map(([t, list]) => `  <h2>${esc(t)}</h2>\n` + list.map(k => {
    const r = D.regimes[k];
    const rows = r.themes.map((th, i) => {
      const id = `OB-${SHORT[k][0]}-${pad(i + 1)}`, items = (DET[k] && DET[k].themes[i + 1]) || [];
      const list = items.length ? `<details class="ob-detail"><summary>${items.length} individual obligation${items.length > 1 ? 's' : ''}</summary><ol>${items.map((it, j) => `<li data-id="${id}.${j + 1}"><span class="ob-it">${esc(it[0])}</span> <span class="ob-cite">${esc(it[1])}</span></li>`).join('')}</ol></details>` : '';
      return `        <tr><th scope="row"><span class="gb-id">${id}</span></th><td><span class="ob-sum">${esc(th[0])}</span>${list}</td><td>${esc(th[2])}</td><td>${esc(th[3])}</td></tr>`;
    }).join('\n');
    const cl = (r.clocks || []).map(c => `<li><strong>${esc(c[1])}</strong>: ${esc(c[0])} (${esc(c[2])})</li>`).join('');
    return `  <section class="ob-reg" id="${k}">
    <h3>${esc(r.label)}</h3>
    <p class="ob-meta"><span class="gb-chip">${esc(r.reg)}</span> <span class="ob-applies">Applies to: ${esc(r.applies)}</span></p>
    <p class="ob-meta"><a href="${r.url}">Read our guide</a> · <a href="/obligations/#${k}">See it in the obligations library</a></p>
${cl ? `    <div class="ob-clocks"><p><strong>Notification deadlines</strong></p><ul>${cl}</ul></div>\n` : ''}    <div class="table-wrap" tabindex="0"><table class="ob-table">
      <thead><tr><th scope="col">ID</th><th scope="col">Obligation (summary)</th><th scope="col">Control objective</th><th scope="col">Evidence</th></tr></thead>
      <tbody>
${rows}
      </tbody>
    </table></div>
  </section>`;
  }).join('\n')).join('\n\n');
  const deadlineRows = clocks.map(([k, c]) => `        <tr><td>${esc(c[1])}</td><td>${esc(c[0])}</td><td>${esc(c[2])}</td><td>${esc(SHORT[k][1])}</td></tr>`).join('\n');
  const body = `
  <h1>Obligations for ${esc(plural)}</h1>
  <p class="summary">The ${ids.length} regimes that usually apply to ${esc(plural)}, grouped by theme, with ${nthemes} plain-English obligation summaries, control objectives, evidence and notification deadlines.</p>
  <div class="page-meta">
    <span>${ids.length} regimes</span>
    <span>${nthemes} obligation summaries</span>
    <span>${clocks.length} notification deadlines</span>
    <span>Last reviewed: ${REVIEWED}</span>
  </div>

  <aside class="takeaways" aria-labelledby="kt">
    <h2 id="kt">Key takeaways</h2>
    <ul>
      <li>This page lists the regimes that typically apply to ${esc(plural)}. Whether each one applies to a particular organisation depends on its licences, products, size and thresholds.</li>
      <li>Each summary groups related obligations in plain English. It is a starting point for an obligations register, not a substitute for the law: always read the official source.</li>
      <li>The IDs match the <a href="/obligations/">obligations library</a> and the <a href="/grc/model-builder.html">GRC model builder</a>, so you can download the full set or build a linked model.</li>
    </ul>
  </aside>
${NOTES[id] ? `\n  <p class="callout">${NOTES[id]}</p>\n` : ''}
  <nav class="ob-jump" aria-label="Themes on this page"><p><strong>Jump to:</strong> ${groups.map(([t, list]) => list.map(k => `<a href="#${k}">${esc(SHORT[k][1])}</a>`).join(' ')).join(' ')}</p></nav>
${clocks.length ? `
  <h2>Notification deadlines at a glance</h2>
  <div class="table-wrap" tabindex="0"><table>
    <thead><tr><th scope="col">Deadline</th><th scope="col">What triggers it</th><th scope="col">Who to tell</th><th scope="col">Regime</th></tr></thead>
    <tbody>
${deadlineRows}
    </tbody>
  </table></div>
` : ''}
${sections}

  <h2>Next steps</h2>
  <ul>
    <li>Read the <a href="${guide}">${esc(name)} guide</a> for how the rules fit together in this sector.</li>
    <li>Download the full library, filtered to this sector, from the <a href="/obligations/">obligations library</a> (choose the organisation type, then Download Excel).</li>
    <li>Compare sectors on the <a href="/obligations/sectors.html#compare">obligations by sector</a> page.</li>
  </ul>

  <section class="related" aria-labelledby="related-h">
    <h2 id="related-h">Related topics</h2>
    <ul>
      <li data-href="${guide}" data-label="${esc(name)} guide"></li>
      <li data-href="/obligations/sectors.html" data-label="Obligations by sector"></li>
      <li data-href="/grc/obligations-architecture.html" data-label="Obligations architecture"></li>
      <li data-href="/compliance/breach-reporting.html" data-label="Breach and incident reporting obligations"></li>
    </ul>
  </section>

  <section class="sources" aria-labelledby="sources-h">
    <h2 id="sources-h">Sources</h2>
    <ol>
      <li>Each regime's guide on this site, linked above, lists the legislation and regulator guidance it summarises.</li>
      <li>Federal Register of Legislation, <a href="https://www.legislation.gov.au/">legislation.gov.au</a>.</li>
    </ol>
  </section>

  <p class="last-reviewed">Last reviewed: ${REVIEWED}</p>`;
  return wrap(`Obligations for ${plural}`, `The regimes and obligations that usually apply to ${plural} in Australia, grouped by theme, with plain-English summaries, control objectives, evidence and notification deadlines.`,
    `<li><a href="/obligations/sectors.html">Obligations by sector</a></li><li>${esc(name)}</li>`, body, 'article wide ob-page');
}

function hub() {
  const card = ([id, slug, name, plural]) => {
    const n = regsOf(id).length;
    return `    <a class="card" href="/obligations/${slug}.html"><h3>${esc(name)}</h3><p>${n} regimes for ${esc(plural)}.</p></a>`;
  };
  const fsS = SECTORS.filter(s => s[5]), other = SECTORS.filter(s => !s[5]);
  const allIds = [...new Set(SECTORS.flatMap(s => regsOf(s[0])))];
  const head = SECTORS.map(s => `<th scope="col">${esc(s[2])}</th>`).join('');
  const rows = THEMES.map(([t, list]) => {
    const ks = list.filter(k => allIds.includes(k));
    if (!ks.length) return '';
    return `        <tr class="ob-cmp-group"><th scope="rowgroup" colspan="${SECTORS.length + 1}">${esc(t)}</th></tr>\n` + ks.map(k =>
      `        <tr><th scope="row"><a href="/obligations/#${k}">${esc(D.regimes[k].label)}</a></th>${SECTORS.map(s => regsOf(s[0]).includes(k) ? '<td class="ob-yes"><span aria-hidden="true">&#10003;</span><span class="visually-hidden">Applies</span></td>' : '<td><span class="visually-hidden">Usually not</span></td>').join('')}</tr>`).join('\n');
  }).join('\n');
  const body = `
  <h1>Obligations by sector</h1>
  <p class="summary">Choose your part of financial services to see the regimes that usually apply, grouped by theme, with plain-English obligation summaries and notification deadlines. Or compare sectors side by side.</p>
  <div class="page-meta">
    <span>${SECTORS.length} organisation types</span>
    <span>${Object.keys(D.regimes).length} regimes</span>
    <span>Last reviewed: ${REVIEWED}</span>
  </div>

  <aside class="takeaways" aria-labelledby="kt">
    <h2 id="kt">Key takeaways</h2>
    <ul>
      <li>Different parts of financial services face very different rules: a bank, a super trustee and a payments business share some regimes, but each has its own.</li>
      <li>These pages show what usually applies. Licences, products, size and thresholds decide what applies to a particular organisation.</li>
      <li>Everything here comes from the same data as the <a href="/obligations/">obligations library</a>, so the IDs and summaries match.</li>
    </ul>
  </aside>

  <h2>Financial services</h2>
  <div class="cards">
${fsS.map(card).join('\n')}
  </div>

  <h2>Other organisations</h2>
  <div class="cards">
${other.map(card).join('\n')}
  </div>

  <h2 id="compare">Compare sectors</h2>
  <p>A tick means the regime usually applies to that type of organisation. Select a regime to see its obligations.</p>
  <div class="table-wrap" tabindex="0"><table class="ob-compare">
    <thead><tr><th scope="col">Regime</th>${head}</tr></thead>
    <tbody>
${rows}
    </tbody>
  </table></div>

  <section class="related" aria-labelledby="related-h">
    <h2 id="related-h">Related topics</h2>
    <ul>
      <li data-href="/obligations/" data-label="Obligations library"></li>
      <li data-href="/sectors/" data-label="All sectors"></li>
      <li data-href="/grc/obligations-architecture.html" data-label="Obligations architecture"></li>
    </ul>
  </section>

  <section class="sources" aria-labelledby="sources-h">
    <h2 id="sources-h">Sources</h2>
    <ol>
      <li>Each regime's guide on this site lists the legislation and regulator guidance it summarises.</li>
    </ol>
  </section>

  <p class="last-reviewed">Last reviewed: ${REVIEWED}</p>`;
  return wrap('Obligations by sector', 'See the Australian regulatory obligations that usually apply to super trustees, banks, general, life and private health insurers, fund managers, advisers, lenders and payments businesses, and compare sectors side by side.',
    '<li>Obligations by sector</li>', body, 'article wide ob-page');
}

fs.writeFileSync(path.join(ROOT, 'obligations/sectors.html'), fillHtml(hub()));
SECTORS.forEach(s => fs.writeFileSync(path.join(ROOT, `obligations/${s[1]}.html`), fillHtml(sectorPage(s))));
console.log(`obligations by sector: hub + ${SECTORS.length} sector pages`);
