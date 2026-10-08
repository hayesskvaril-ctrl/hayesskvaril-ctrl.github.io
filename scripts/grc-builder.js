// GRC model builder, version 2 (/grc/model-builder.html).
// A five-step wizard turns an organisation profile into an illustrative GRC model: framework documents,
// enterprise and Level 1 to 3 risks with controls and KRIs, obligations linked to risks and controls,
// notification clocks, committees and roles, the data model, maturity and a roadmap, reporting and
// consistency checks, with Excel, CSV, JSON, print and share-link exports.
// Reference data: scripts/grc-builder-data.js. Data model: scripts/grc-model-data.js. Excel: scripts/xlsx-lite.js.
// Everything runs in the browser. Answers are saved only on this device, or in a link the reader chooses to copy.
(function () {
  'use strict';
  var D = window.GRC_BUILDER, M = window.GRC_MODEL;
  var root = document.getElementById('grc-builder'), out = document.getElementById('grc-out');
  if (!D || !M || !root || !out) return;
  var KEY = 'rl-grc-builder-v2';
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // ------------------------------------------------------------------ helpers
  function esc(s) { return String(s === undefined || s === null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function has(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }
  function byId(a) { var o = {}; a.forEach(function (x) { o[x.id] = x; }); return o; }
  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function uniq(a) { var seen = {}, r = []; a.forEach(function (x) { if (!has(seen, x)) { seen[x] = 1; r.push(x); } }); return r; }
  function and(a) { return a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1]; }
  function n(x, one, many) { return x + ' ' + (x === 1 ? one : (many || one + 's')); }
  function $(sel, ctx) { return (ctx || root).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || root).querySelectorAll(sel)); }
  function lc(s) { return s.charAt(0).toLowerCase() + s.slice(1); }
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function today() { var d = new Date(); return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear(); }
  function wrap(text, max) {
    var lines = [''];
    text.split(' ').forEach(function (w) { var l = lines[lines.length - 1]; if (l && (l + ' ' + w).length > max) lines.push(w); else lines[lines.length - 1] = (l ? l + ' ' : '') + w; });
    return lines;
  }
  function slug(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50); }

  // ------------------------------------------------------------------ reference data
  var ENT = byId(D.entities), FEAT = byId(D.features), PAIN = byId(D.pains), JUR = byId(D.jurisdictions), RISK = byId(D.risks);
  var REGS = D.regimes, REG_IDS = Object.keys(REGS);
  var L2 = {};
  D.risks.forEach(function (r) {
    r.l2.forEach(function (x, i) { L2[x[0]] = { id: x[0], label: x[1], def: x[2], where: x[3], l3: x[4], controls: x[5], kris: x[6], risk: r, code: r.prefix + '-' + pad(i + 1) }; });
  });
  var FEAT_SHORT = { outsourcing: 'Outsourcing', cloud: 'Public cloud', offshore: 'Offshore operations', transformation: 'Major transformation', merger: 'Merger or transfer', ai: 'AI and complex models', retail: 'Retail customers', advice: 'Personal advice', payments: 'Payments and client money', unlisted: 'Unlisted assets' };
  var SCALE_ORDER = ['small', 'medium', 'large', 'vlarge'];
  var SCALES = { small: ['Small', 'One main business and a small risk and compliance team'], medium: ['Medium', 'Several products or business lines, with dedicated risk and compliance functions'], large: ['Large', 'Multiple divisions, a large customer base and specialist risk teams'], vlarge: ['Very large', 'A major group with many divisions, entities and regulators'] };
  var REG_GROUPS = [
    ['Prudential (APRA)', ['cps220', 'cps230', 'cps234', 'cps510', 'cps511', 'far', 'capital', 'liquidity', 'cps190', 'sps515', 'sps530', 'sis']],
    ['Licensing and conduct (ASIC)', ['afsl', 'breach', 'idr', 'ddo', 'remed', 'rg97', 'disclosure', 'conflicts', 'credit', 'advice', 'insurance', 'rg259']],
    ['Insurance sector rules', ['lifeact', 'phiact']],
    ['Financial crime', ['aml', 'sanctions', 'abc', 'scams']],
    ['Privacy, cyber and technology', ['privacy', 'ransom', 'ai']],
    ['Corporate, sustainability and sector rules', ['listed', 'whistle', 'climate', 'modslav', 'acnc', 'pgpa']]
  ];
  // [code used in IDs, short label]
  var SHORT = { cps220: ['CPS220', 'CPS 220'], cps230: ['CPS230', 'CPS 230'], cps234: ['CPS234', 'CPS 234'], cps510: ['CPS510', 'CPS 510/520'], cps511: ['CPS511', 'CPS 511'], far: ['FAR', 'FAR'], capital: ['CAP', 'Capital'], liquidity: ['APS210', 'APS 210'], cps190: ['CPS190', 'CPS 190/900'], sps515: ['SPS515', 'SPS 515'], sps530: ['SPS530', 'SPS 530'], sis: ['SIS', 'SIS Act'], afsl: ['AFSL', 'AFSL'], breach: ['RG78', 'RG 78'], idr: ['RG271', 'RG 271'], ddo: ['DDO', 'DDO'], remed: ['RG277', 'RG 277'], rg97: ['RG97', 'RG 97'], disclosure: ['DISC', 'Disclosure'], conflicts: ['COI', 'Conflicts'], credit: ['CREDIT', 'Credit'], advice: ['ADVICE', 'Advice'], insurance: ['INSCON', 'Insurance conduct'], lifeact: ['LIFE', 'Life insurance'], phiact: ['PHI', 'Private health'], rg259: ['RG259', 'RG 259'], aml: ['AML', 'AML/CTF'], sanctions: ['SANCT', 'Sanctions'], abc: ['ABC', 'Anti-bribery'], privacy: ['PRIV', 'Privacy'], ransom: ['RANSOM', 'Ransomware'], whistle: ['WB', 'Whistleblower'], climate: ['CLIMATE', 'Climate'], modslav: ['MSA', 'Modern slavery'], listed: ['ASX', 'ASX'], acnc: ['ACNC', 'ACNC'], pgpa: ['PGPA', 'PGPA'], scams: ['SPF', 'Scams'], ai: ['AI', 'AI'] };
  function code(k) { return (SHORT[k] || [k.toUpperCase()])[0]; }
  function short(k) { return (SHORT[k] || ['', k])[1]; }
  var REG_OWNER = { cps220: 'Chief Risk Officer', cps230: 'Chief Operating Officer', cps234: 'Chief Information Security Officer', cps510: 'Company Secretary', cps511: 'Chief People Officer', far: 'Company Secretary', capital: 'Chief Financial Officer', liquidity: 'Treasurer', cps190: 'Chief Financial Officer', sps515: 'Chief Executive', sps530: 'Chief Investment Officer', sis: 'Chief Executive', afsl: 'Head of Compliance', breach: 'Head of Compliance', idr: 'Head of Customer Operations', ddo: 'Head of Products', remed: 'Head of Remediation', rg97: 'Chief Financial Officer', disclosure: 'Head of Products and Marketing', conflicts: 'Head of Compliance', credit: 'Chief Credit Officer', advice: 'Head of Advice', insurance: 'Head of Claims', lifeact: 'Appointed Actuary and Head of Compliance', phiact: 'Head of Compliance', rg259: 'Head of Compliance', aml: 'AML/CTF Compliance Officer', sanctions: 'Head of Financial Crime', abc: 'Head of Financial Crime', privacy: 'Privacy Officer', ransom: 'Chief Information Security Officer', whistle: 'Whistleblower protection officer', climate: 'Head of Sustainability', modslav: 'Head of Procurement', listed: 'Company Secretary', acnc: 'Company Secretary', pgpa: 'Chief Risk Officer', scams: 'Head of Financial Crime', ai: 'Chief Data Officer' };
  var L1_GUIDE = { strategic: '/risk-management/enterprise-risk-management.html', credit: '/risk-management/credit-market-and-liquidity-risk.html', market: '/risk-management/credit-market-and-liquidity-risk.html', liquidity: '/risk-management/credit-market-and-liquidity-risk.html', insurance: '/sectors/insurance.html', capital: '/standards/aps-110-and-aps-210.html', operational: '/risk-management/operational-risk.html', tech: '/risk-management/cyber-risk.html', thirdparty: '/risk-management/third-party-risk.html', compliance: '/foundations/what-is-compliance.html', conduct: '/governance/culture-and-conduct.html', fincrime: '/compliance/aml-ctf-fundamentals.html', climate: '/risk-management/climate-risk.html', model: '/risk-management/model-risk.html', people: '/governance/risk-culture-assessment.html', governance: '/foundations/what-is-governance.html' };
  var BODIES = [['APRA', /APRA/], ['ASIC', /ASIC/], ['AUSTRAC', /AUSTRAC/], ['OAIC', /OAIC/], ['ACCC', /ACCC/], ['ASX', /ASX/], ['ACNC', /ACNC/], ['DFAT', /DFAT/], ['Home Affairs', /Home Affairs/], ['Australian Border Force', /Border Force/], ['Department of Finance', /Department of Finance/]];
  var BODY_COLOUR = { APRA: '#1b3a5c', ASIC: '#2563eb', AUSTRAC: '#4745c2', OAIC: '#17692d' };
  var TYPE = { P: 'Preventive', D: 'Detective', C: 'Corrective' };
  var DOC_LEVELS = { 1: 'Board-approved frameworks and statements', 2: 'Policies', 3: 'Standards and methodologies', 4: 'Procedures, registers and plans' };
  var CORE_DOCS = [
    ['Risk management framework', 1, 'Board', 'both'], ['Risk appetite statement', 1, 'Board', 'entity'], ['Internal audit charter', 1, 'Board audit committee', 'entity'],
    ['Compliance management framework and obligations register', 2, 'Board or board committee', 'both'], ['Incident and breach management policy', 2, 'Executive owner', 'both'],
    ['Policy on policies (document hierarchy and approvals)', 2, 'Board', 'both'], ['Code of conduct', 2, 'Board', 'both'],
    ['Risk taxonomy and definitions', 3, 'Chief Risk Officer', 'both'], ['Risk assessment and rating methodology', 3, 'Chief Risk Officer', 'both'],
    ['Control framework and testing methodology', 3, 'Chief Risk Officer', 'both'], ['Issues and actions management standard', 3, 'Chief Risk Officer', 'both'],
    ['GRC data standards (IDs, required fields and data quality rules)', 4, 'GRC system owner', 'both']
  ];
  var LINKS = { taxonomy: '/grc/risk-taxonomy-and-hierarchy.html', obligations: '/grc/obligations-architecture.html', controls: '/grc/control-framework-architecture.html', data: '/grc/grc-data-model.html', governance: '/grc/governance-and-operating-model.html', establish: '/grc/establishing-a-grc-system.html', groups: '/grc/grc-for-complex-groups.html', tech: '/grc/grc-technology.html' };
  function more(key, text) { return '<p class="gb-more">Learn more: <a href="' + LINKS[key] + '">' + esc(text) + '</a></p>'; }

  // ------------------------------------------------------------------ state
  function blank() {
    return { v: 2, name: '', entities: { rse: 1 }, scale: 'large', sfi: false, juris: [], features: [], pains: [], regimes: null, risks: null, maturity: { framework: 2, people: 2, process: 2, data: 2, technology: 2 }, target: 0 };
  }
  // validates anything loaded from storage or a shared link
  function clean(raw) {
    var s = blank();
    if (!raw || typeof raw !== 'object') return s;
    if (typeof raw.name === 'string') s.name = raw.name.slice(0, 80);
    if (raw.entities && typeof raw.entities === 'object') {
      s.entities = {};
      Object.keys(raw.entities).forEach(function (k) { var c = parseInt(raw.entities[k], 10); if (has(ENT, k) && c > 0) s.entities[k] = Math.min(c, 50); });
    }
    if (typeof raw.scale === 'string' && has(SCALES, raw.scale)) s.scale = raw.scale;
    s.sfi = !!raw.sfi;
    function ids(a, ok) { return Array.isArray(a) ? uniq(a.filter(function (k) { return typeof k === 'string' && has(ok, k); })) : []; }
    s.juris = ids(raw.juris, JUR); s.features = ids(raw.features, FEAT); s.pains = ids(raw.pains, PAIN);
    s.regimes = Array.isArray(raw.regimes) ? ids(raw.regimes, REGS) : null;
    if (raw.risks && typeof raw.risks === 'object') {
      s.risks = {};
      D.risks.forEach(function (r) { var v = has(raw.risks, r.id) ? raw.risks[r.id] : null; s.risks[r.id] = { inc: !!(v && v.inc), mat: !!(v && v.inc && v.mat) }; });
    }
    if (raw.maturity && typeof raw.maturity === 'object') D.maturity.forEach(function (c) { var v = parseInt(raw.maturity[c.id], 10); if (v >= 1 && v <= 5) s.maturity[c.id] = v; });
    var t = parseInt(raw.target, 10); s.target = t >= 3 && t <= 5 ? t : 0;
    return s;
  }
  function toLink(s) {
    var json = JSON.stringify(s);
    var b = btoa(unescape(encodeURIComponent(json))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return location.href.split('#')[0] + '#m=' + b;
  }
  function fromLink() {
    var mt = /[#&]m=([A-Za-z0-9_-]+)/.exec(location.hash || '');
    if (!mt) return null;
    try {
      var b = mt[1].replace(/-/g, '+').replace(/_/g, '/');
      while (b.length % 4) b += '=';
      return clean(JSON.parse(decodeURIComponent(escape(atob(b)))));
    } catch (e) { return null; }
  }

  // ------------------------------------------------------------------ the model
  function suggest(s) {
    var g = { reg: {}, risk: {}, feat: {}, ents: [], total: 0 };
    function add(map, k, why) { if (!has(map, k)) map[k] = []; if (map[k].indexOf(why) < 0) map[k].push(why); }
    D.entities.forEach(function (e) {
      var c = s.entities[e.id] || 0;
      if (!c) return;
      g.ents.push({ def: e, n: c }); g.total += c;
      e.regimes.forEach(function (k) { add(g.reg, k, e.label); });
      e.risks.forEach(function (k) { add(g.risk, k, e.label); });
      e.features.forEach(function (k) { add(g.feat, k, e.label); });
    });
    s.features.forEach(function (f) {
      (FEAT[f].regimes || []).forEach(function (k) { add(g.reg, k, FEAT_SHORT[f]); });
      FEAT[f].risks.forEach(function (k) { add(g.risk, k, FEAT_SHORT[f]); });
    });
    return g;
  }
  function defaultMaterial(r, s, reg) {
    if (r.id === 'climate') return !!reg.climate;
    if (r.id === 'model') return s.features.indexOf('ai') >= 0;
    return r.usual;
  }
  function whereWhy(where, s, m) {
    if (where === 'all') return 'Core';
    var why = [];
    where.split(',').forEach(function (t) {
      t = t.trim();
      if (t.indexOf('feat:') === 0) { var f = t.slice(5); if (m.feat[f]) why.push(f === 'group' ? 'Group structure' : FEAT_SHORT[f]); }
      else if (s.entities[t]) why.push(ENT[t].label);
    });
    return uniq(why).join(', ');
  }
  function hours(t) {
    var mt = /(\d+)\s*(hours?|business days?|calendar days?|days?)/i.exec(t);
    if (!mt) return null;
    var v = +mt[1], u = mt[2].toLowerCase();
    if (u.indexOf('hour') === 0) return v;
    if (u.indexOf('business') === 0) return v * 24 * 7 / 5;
    return v * 24;
  }
  function clockShort(t) { var mt = /(\d+)\s*(hours?|business days?|calendar days?|days?)/i.exec(t); return mt ? mt[1] + ' ' + mt[2] : 'As soon as practicable'; }
  function bodies(m) { return BODIES.filter(function (b) { return m.regimes.some(function (rg) { return b[1].test(rg.def.reg); }); }).map(function (b) { return b[0]; }); }
  function bodyOf(rg) { for (var i = 0; i < BODIES.length; i++) if (BODIES[i][1].test(rg.def.reg)) return BODIES[i][0]; return 'Other'; }

  function build(s) {
    var g = suggest(s), m = { s: s, g: g, ents: g.ents, total: g.total, types: g.ents.length };
    m.group = g.total > 1;
    m.apra = g.ents.some(function (x) { return x.def.apra; });
    m.actuary = g.ents.some(function (x) { return x.def.actuary; });
    m.scaleIdx = Math.max(0, SCALE_ORDER.indexOf(s.scale));
    m.big = m.scaleIdx >= 2 || m.group;
    m.sfi = s.sfi && m.apra;
    m.feat = {};
    s.features.forEach(function (f) { m.feat[f] = true; });
    if (m.group) m.feat.group = true;
    var regs = s.regimes ? REG_IDS.filter(function (k) { return s.regimes.indexOf(k) >= 0; }) : REG_IDS.filter(function (k) { return has(g.reg, k); });
    m.reg = {};
    regs.forEach(function (k) { m.reg[k] = true; });
    m.regimes = regs.map(function (k) { return { id: k, def: REGS[k], why: has(g.reg, k) ? g.reg[k] : null, obs: [] }; });
    m.flags = {};
    regs.forEach(function (k) { if (REGS[k].flag) m.flags[REGS[k].flag] = true; });
    m.sel = {};
    D.risks.forEach(function (r) {
      if (s.risks) m.sel[r.id] = { inc: s.risks[r.id].inc, mat: s.risks[r.id].inc && s.risks[r.id].mat };
      else { var inc = has(g.risk, r.id); m.sel[r.id] = { inc: inc, mat: inc && defaultMaterial(r, s, m.reg) }; }
    });
    function inc(k) { return m.sel[k].inc; }

    // taxonomy: Level 1 categories, their Level 2 sub-types in scope, example Level 3 risks, controls and KRIs
    var need = {};
    m.regimes.forEach(function (rg) { rg.def.themes.forEach(function (t) { t[1].forEach(function (id) { if (!has(need, id)) need[id] = []; if (need[id].indexOf(rg.id) < 0) need[id].push(rg.id); }); }); });
    m.l1 = []; m.l1by = {}; m.l2 = []; m.l2by = {}; m.risks = []; m.controls = []; m.kris = [];
    D.risks.forEach(function (r) {
      if (!inc(r.id)) return;
      var L = { def: r, code: r.prefix, mat: m.sel[r.id].mat, why: has(g.risk, r.id) ? g.risk[r.id] : null, l2: [] };
      r.l2.forEach(function (row) {
        var X = L2[row[0]], why = whereWhy(X.where, s, m), by = has(need, X.id) ? need[X.id] : null;
        if (!why && !by) return;
        var it = { x: X, code: X.code, l1: L, why: why || 'Needed for ' + by.map(short).join(', '), pulled: !why, obs: [], risks: [], controls: [], kris: [] };
        X.l3.forEach(function (e, i) { var rr = { id: 'R-' + X.code + '.' + (i + 1), it: it, event: e[0], causes: e[1], impacts: e[2] }; it.risks.push(rr); m.risks.push(rr); });
        X.controls.forEach(function (c, i) { var cc = { id: 'C-' + X.code + '.' + (i + 1), it: it, objective: c[0], desc: c[1], type: c[2], freq: c[3], auto: c[4], obs: [] }; it.controls.push(cc); m.controls.push(cc); });
        X.kris.forEach(function (k, i) { var kk = { id: 'K-' + X.code + '.' + (i + 1), it: it, metric: k }; it.kris.push(kk); m.kris.push(kk); });
        L.l2.push(it); m.l2.push(it); m.l2by[X.id] = it;
      });
      m.l1.push(L); m.l1by[r.id] = L;
    });

    // obligations: each regime theme links to Level 2 risks and, through them, to controls
    m.obligations = [];
    m.regimes.forEach(function (rg) {
      rg.def.themes.forEach(function (t, i) {
        var ob = { id: 'OB-' + code(rg.id) + '-' + pad(i + 1), rg: rg, title: t[0], objective: t[2], evidence: t[3], l2: [], missing: [], controls: [] };
        t[1].forEach(function (id) {
          var it = m.l2by[id];
          if (it) {
            ob.l2.push(it);
            if (it.obs.indexOf(ob) < 0) it.obs.push(ob);
            it.controls.forEach(function (c) { if (ob.controls.indexOf(c) < 0) ob.controls.push(c); if (c.obs.indexOf(ob) < 0) c.obs.push(ob); });
          } else if (L2[id]) ob.missing.push(L2[id]);
        });
        rg.obs.push(ob); m.obligations.push(ob);
      });
    });
    m.controls.forEach(function (c) { c.key = c.it.l1.mat && c.obs.length > 0; });
    m.covered = m.obligations.filter(function (o) { return o.l2.length; }).length;

    // notification clocks, shortest first
    m.clocks = [];
    m.regimes.forEach(function (rg) { (rg.def.clocks || []).forEach(function (c) { m.clocks.push({ event: c[0], time: c[1], to: c[2], rg: rg, h: hours(c[1]), short: clockShort(c[1]) }); }); });
    m.clocks.sort(function (a, b) { return (a.h === null ? 1e9 : a.h) - (b.h === null ? 1e9 : b.h); });

    // framework documents: the core set, plus what each regime, feature and risk category brings
    var docs = [], seen = {};
    function doc(d, src, url) {
      var k = d[0].toLowerCase(), x = has(seen, k) ? seen[k] : null;
      if (!x) { x = seen[k] = { name: d[0], level: d[1], approver: d[2], scope: d[3] || 'both', src: [] }; docs.push(x); }
      else if (d[3] === 'entity') x.scope = 'entity';
      if (!x.src.some(function (p) { return p[0] === src; })) x.src.push([src, url || '']);
    }
    CORE_DOCS.forEach(function (d) { doc(d, 'Core GRC system'); });
    m.regimes.forEach(function (rg) { rg.def.docs.forEach(function (d) { doc(d, short(rg.id), rg.def.url); }); });
    s.features.forEach(function (f) { if (FEAT[f].doc) doc(FEAT[f].doc.concat('both'), FEAT_SHORT[f]); });
    if (inc('thirdparty') && !m.reg.cps230) doc(['Third-party and outsourcing risk policy', 2, 'Board or executive', 'both'], 'Third-party risk', L1_GUIDE.thirdparty);
    if (inc('tech') && !m.reg.cps234) doc(['Information security policy', 2, 'Executive owner', 'both'], 'Technology and cyber risk', L1_GUIDE.tech);
    if (inc('operational') && !m.reg.cps230) doc(['Business continuity plan', 2, 'Executive owner', 'entity'], 'Operational risk', '/risk-management/business-continuity.html');
    if (inc('model')) doc(['Model risk management policy and model inventory', 2, 'Board risk committee', 'both'], 'Model and AI risk', L1_GUIDE.model);
    if (inc('climate') && !m.reg.climate) doc(['Climate risk management approach', 3, 'Chief Risk Officer', 'both'], 'Climate risk', L1_GUIDE.climate);
    if (inc('fincrime') && !m.reg.aml && !m.reg.pgpa) doc(['Fraud and financial crime policy', 2, 'Executive owner', 'both'], 'Financial crime risk', '/risk-management/fraud-risk.html');
    if (inc('conduct') && !m.reg.idr) doc(['Complaints handling policy', 2, 'Executive owner', 'both'], 'Conduct risk');
    if (m.group) {
      doc(['Group governance framework (entity boards, intra-group arrangements and escalation)', 1, 'Group board', 'both'], 'Group structure', LINKS.groups);
      doc(['Related-party and intra-group arrangements policy', 2, 'Board', 'both'], 'Group structure', LINKS.groups);
    }
    if (s.juris.length) doc(['Offshore compliance standards for each jurisdiction', 3, 'Head of Compliance', 'both'], 'Offshore operations');
    docs.sort(function (a, b) { return a.level - b.level || a.name.localeCompare(b.name); });
    docs.forEach(function (d, i) { d.id = 'D-' + pad(i + 1); });
    m.docs = docs;

    // enterprise risks: take one from each source in turn so every entity type is represented
    var srcs = g.ents.map(function (x) { return x.def.enterprise; });
    srcs.push(s.features.map(function (f) { return FEAT[f].enterprise; }).filter(Boolean));
    var extra = [];
    if (m.group) extra.push('Contagion: a failure in one entity damages others or the whole group');
    if (s.juris.length) extra.push('Regulatory or political change in an offshore market disrupts the business');
    srcs.push(extra);
    var ent = [], seenE = {};
    for (var round = 0; ent.length < 14; round++) {
      var any = false;
      srcs.forEach(function (a) { if (round < a.length) { any = true; if (!has(seenE, a[round]) && ent.length < 14) { seenE[a[round]] = 1; ent.push(a[round]); } } });
      if (!any) break;
    }
    m.enterprise = ent.map(function (t, i) { return { id: 'E-' + pad(i + 1), text: t }; });

    // committees (a tree: parent ids)
    m.committees = [];
    function cm(id, name, parent, purpose, covers, note) { var c = { id: id, name: name, parent: parent, purpose: purpose, covers: covers || [], note: note || '' }; m.committees.push(c); return c; }
    var govOnly = s.entities.gov && m.types === 1;
    cm('board', m.group ? 'Group board' : (govOnly ? 'Accountable authority' : 'Board'), null, govOnly ? 'Leads the entity and is responsible for appropriate systems of risk oversight, management and internal control.' : 'Sets strategy and risk appetite, approves frameworks and key policies, and oversees management.');
    var top;
    if (govOnly) top = cm('barc', 'Audit committee', 'board', 'Commonwealth entities must have an audit committee. It reviews financial and performance reporting, risk oversight and management, and internal control.', ['*']);
    else if (m.big || m.apra) {
      top = cm('brc', 'Board risk committee', 'board', 'Oversees the risk profile against appetite, the risk management framework and the Chief Risk Officer, and recommends the risk appetite statement to the board.', ['*']);
      cm('bac', 'Board audit committee', 'board', 'Oversees financial reporting, internal and external audit, and the closure of audit issues.');
    } else top = cm('barc', 'Audit and risk committee', 'board', 'Combined board oversight of risk, compliance, audit and financial reporting.', ['*']);
    if (m.apra || m.reg.listed || m.scaleIdx >= 2) cm('brem', 'Board remuneration committee', 'board', (m.sfi && m.reg.cps511 ? 'Required for significant financial institutions under CPS 511. ' : '') + 'Oversees remuneration design and outcomes, including risk and conduct adjustments.');
    if (s.entities.rse || s.entities.re || s.entities.li || m.feat.unlisted) cm('bic', 'Investment committee', 'board', 'Oversees investment strategy, performance, valuation and liquidity' + (s.entities.rse ? ', in line with SPS 530 for super' : '') + '.');
    if (m.reg.listed) cm('bnc', 'Nomination committee', 'board', 'Board composition, skills, renewal and succession.');
    if (m.reg.rg259) cm('rgc', 'Compliance committee (registered schemes)', 'board', 'Monitors compliance with each scheme’s compliance plan and reports to the responsible entity board; needed unless most directors are external.');
    cm('exco', govOnly ? 'Executive board' : 'Executive committee', 'board', 'The executive team: runs the organisation within appetite and owns the enterprise risks.');
    var topName = lc(top.name);
    var erc = cm('erc', m.big ? 'Executive risk committee' : 'Executive risk and compliance committee', 'exco', m.big ? 'Oversees all Level 1 risks against appetite, approves risk acceptances and escalates breaches of appetite.' : 'Covers every risk category, compliance, incidents and issues at management level.', ['*'], 'Reports to the ' + topName);
    if ((s.entities.adi || s.entities.credit) && (inc('liquidity') || inc('market'))) cm('alco', 'Asset and liability committee', 'exco', 'Interest rate, liquidity, funding and capital positions against limits.', ['liquidity', 'market', 'capital']);
    if (m.reg.ddo || m.reg.insurance) cm('pgc', 'Product governance committee', 'exco', 'Product design, target market determinations, distribution monitoring and product reviews.', []);
    if (m.reg.listed) cm('disc', 'Disclosure committee', 'exco', 'Decides quickly whether information must be disclosed to the market under continuous disclosure.', []);
    if (m.big) {
      if (inc('operational') || inc('thirdparty')) cm('orc', 'Operational risk and resilience committee', 'erc', 'Operational and third-party risk' + (m.reg.cps230 ? ', critical operations, tolerance levels, business continuity and material service providers (CPS 230)' : ' and business continuity') + '.', ['operational', 'thirdparty']);
      if (inc('tech')) cm('tcc', 'Technology and cyber risk committee', 'erc', 'Technology, cyber security and data risks' + (m.reg.cps234 ? ', and information security capability (CPS 234)' : '') + '.', ['tech']);
      if (inc('compliance') || inc('conduct')) cm('ccc', 'Compliance and conduct committee', 'erc', 'Obligations, breach and significance decisions, regulatory change, complaints, remediation and conduct outcomes.', ['compliance', 'conduct']);
      if (inc('fincrime') && (m.reg.aml || m.reg.sanctions || m.reg.scams || m.reg.abc)) cm('fcc', 'Financial crime committee', 'erc', 'Financial crime risk' + (m.reg.aml ? ', the ML/TF risk assessment and the AML/CTF program' : '') + ', sanctions and fraud' + (m.reg.scams ? ', and scams' : '') + '.', ['fincrime']);
      if (inc('credit') && (s.entities.adi || s.entities.credit)) cm('crc', 'Credit risk committee', 'erc', 'Credit policy, large exposures, concentrations and portfolio quality.', ['credit']);
      if (inc('insurance')) cm('urc', 'Underwriting, pricing and reserving committee', 'erc', 'Pricing, underwriting, reinsurance and reserving, with input from the Appointed Actuary.', ['insurance']);
      if (inc('model') && (m.feat.ai || m.scaleIdx >= 3)) cm('mrc', m.feat.ai ? 'Model risk and AI committee' : 'Model risk committee', 'erc', 'The model and AI inventory and validation results' + (m.feat.ai ? ', and approval of higher-risk AI uses' : '') + '.', ['model']);
      if (inc('climate') && (m.reg.climate || m.reg.modslav)) cm('scc', 'Sustainability and climate risk forum', 'erc', 'Climate risk analysis, sustainability reporting and modern slavery.', ['climate']);
      cm('buf', m.group ? 'Business unit and legal entity risk forums' : 'Business unit risk forums', 'erc', 'Manage Level 3 risks, controls, incidents and issues in each business' + (m.group ? ' and entity' : '') + ', and escalate to the committees above.', []);
    }
    if (s.juris.length) cm('intl', 'Country risk and compliance forums', 'erc', 'Local obligations, regulators and risks in ' + and(s.juris.map(function (j) { return JUR[j].label; })) + '.', []);
    if (m.group) cm('eboards', m.apra ? 'Regulated entity boards and their committees' : 'Subsidiary boards', null, 'Each entity board approves its own risk appetite and frameworks (or adopts the group’s, with entity-specific parts) and oversees its own risks and obligations. Entity directors keep their own duties.', []);
    m.top = top; m.erc = erc;
    m.committeeFor = function (l1) {
      for (var i = 0; i < m.committees.length; i++) if (m.committees[i].covers.indexOf(l1) >= 0) return m.committees[i];
      return erc;
    };

    // roles
    m.roles = D.roles.filter(function (r) {
      return r.when.split('|').some(function (c) {
        if (c === 'all') return true;
        if (c === 'apra') return m.apra;
        if (c === 'big') return m.big;
        if (c === 'actuary') return m.actuary;
        if (c.indexOf('regime:') === 0) return !!m.reg[c.slice(7)];
        if (c.indexOf('risk:') === 0) return has(m.sel, c.slice(5)) && m.sel[c.slice(5)].inc;
        return false;
      });
    });

    // data model in scope
    m.nodes = M.nodes.filter(function (x) { return !x.when || m.flags[x.when]; });
    var on = {};
    m.nodes.forEach(function (x) { on[x.id] = true; });
    m.edges = M.edges.filter(function (e) { return on[e.a] && on[e.b]; });

    // reporting suite
    var nmet = 0;
    m.l1.forEach(function (L) { if (L.mat) nmet += L.def.metrics.length; });
    m.reports = [
      ['Board risk report', govOnly ? 'Accountable authority and audit committee' : 'Board and ' + topName, 'Quarterly', 'Material risks against appetite (' + n(nmet, 'metric') + '), enterprise and emerging risks, significant incidents and breaches, regulatory notifications and overdue issues', 'Appetite metrics, KRIs, risks, incidents, issues and obligations'],
      ['Executive risk report', erc.name, 'Monthly', 'KRIs outside triggers, new incidents and breaches, issue ageing, risk acceptances and emerging risks', 'KRIs, incidents, issues and risks'],
      ['Compliance report', govOnly ? 'Audit committee' : top.name, 'Quarterly', 'Breaches and significant breaches, notifications made against their deadlines, regulatory change, obligations without controls and monitoring results', 'Obligations, incidents, regulatory change and tests'],
      ['Assurance report', m.big || m.apra ? 'Board audit committee' : top.name, 'Quarterly', 'Internal audit progress, control testing results, overdue audit issues and assurance coverage of key controls', 'Tests, issues and the assurance map'],
      ['Regulatory notifications log', 'Head of Compliance, reported to committees', 'As events occur', 'Each notifiable event: awareness date, the deadline under the relevant clock and the date notified', 'Incidents and obligations']
    ];
    if (m.reg.cps230) m.reports.push(['Operational resilience report', m.big ? 'Operational risk and resilience committee, then the board' : 'Board', 'Quarterly', 'Critical operations against tolerance levels, material service provider performance and continuity testing results', 'Critical operations, providers, incidents and tests']);
    if (m.reg.far) m.reports.push(['Accountable person reasonable steps pack', 'Each accountable person', 'Quarterly', 'Risks, obligations, incidents and issues in the accountable person’s area, as evidence of reasonable steps', 'Accountability statements linked to risks, obligations and issues']);
    if (m.reg.idr) m.reports.push(['Complaints report', 'Board or board committee', 'Quarterly', 'Complaint volumes, timeliness, outcomes and systemic issues', 'Complaints system']);
    if (m.reg.aml) m.reports.push(['AML/CTF compliance officer report', 'Governing body', 'At least every 12 months', 'Program effectiveness, the ML/TF risk assessment, reporting to AUSTRAC and training', 'AML/CTF records']);
    if (m.group) m.reports.push(['Entity risk reports', 'Each regulated entity board', 'Quarterly', 'The same data cut by legal entity: entity risks against entity appetite, obligations, incidents and breaches', 'Every record tagged with its legal entity']);

    // calendar
    m.calendar = [];
    function cal(when, what, src) { m.calendar.push({ when: when, what: what, src: src }); }
    cal('Monthly', 'KRI dashboard, incidents, breaches and issue ageing to management risk committees', 'Core');
    cal('Quarterly', 'Risk profile against appetite, top risks and emerging risks to the ' + topName, 'Core');
    cal('Quarterly', 'Compliance report: breaches, notifications, regulatory change and monitoring results', 'Core');
    cal('Quarterly', 'Control testing results and audit issues to the audit committee', 'Core');
    cal('Annually', 'Review and approve the risk appetite statement, and review enterprise and material risks', 'Core');
    cal('Annually', 'Approve the internal audit plan, aligned to the assurance map', 'Core');
    cal('Annually', 'Review frameworks, policies and the taxonomy when due, and review GRC data quality', 'Core');
    if (m.reg.cps510) cal('Annually', 'Fit and proper reassessment of responsible persons', short('cps510'));
    m.regimes.forEach(function (rg) { (rg.def.cal || []).forEach(function (c) { cal(c[0], c[1], short(rg.id)); }); });

    // maturity and roadmap
    m.target = s.target || (m.scaleIdx >= 2 || m.total >= 3 ? 4 : 3);
    m.maturity = D.maturity.map(function (c) {
      var cur = s.maturity[c.id], steps = [];
      for (var l = cur; l < m.target; l++) steps.push(c.next[l - 1]);
      return { c: c, cur: cur, tgt: m.target, gap: Math.max(0, m.target - cur), steps: steps };
    });
    var pains = {};
    s.pains.forEach(function (p) { pains[p] = true; });
    function weight(rg) {
      var w = rg.obs.length + 2 * (rg.def.clocks || []).length;
      if (pains.breaches && rg.def.clocks) w += 3;
      if (pains.providers && rg.id === 'cps230') w += 3;
      if (pains.findings && /APRA|ASIC|AUSTRAC/.test(rg.def.reg)) w += 1;
      return w;
    }
    var rs = m.regimes.slice().sort(function (a, b) { return weight(b) - weight(a) || REG_IDS.indexOf(a.id) - REG_IDS.indexOf(b.id); });
    function obsOf(L) { var c = 0; L.l2.forEach(function (it) { c += it.obs.length; }); return c; }
    var mats = m.l1.filter(function (L) { return L.mat; }).sort(function (a, b) { return obsOf(b) - obsOf(a); });
    var others = m.l1.filter(function (L) { return !L.mat; });
    var third = Math.ceil(rs.length / 3), half = Math.ceil(mats.length / 2);
    m.waves = [
      { regimes: rs.slice(0, third), l1: mats.slice(0, half) },
      { regimes: rs.slice(third, 2 * third), l1: mats.slice(half) },
      { regimes: rs.slice(2 * third), l1: others }
    ].filter(function (w) { return w.regimes.length || w.l1.length; });
    if (!m.waves.length) m.waves = [{ regimes: [], l1: [] }];
    var size = [0.6, 0.85, 1.1, 1.4][m.scaleIdx];
    var cx = 1 + 0.08 * Math.max(0, m.types - 1) + 0.04 * Math.min(10, Math.max(0, m.total - m.types)) + 0.08 * s.juris.length + 0.01 * Math.max(0, m.regimes.length - 10);
    var gap = 0;
    m.maturity.forEach(function (x) { gap += x.gap; });
    gap /= m.maturity.length;
    var F = Math.max(0.5, Math.min(2.6, size * cx * (0.7 + 0.15 * gap)));
    function wk(base) { return Math.max(2, Math.round(base * F)); }
    var d0 = wk(6), d1 = wk(8), d2 = wk(12), d3 = wk(10), d4 = wk(18), dw = wk(14);
    var s1 = Math.round(d0 * 0.5), s2 = s1 + Math.round(d1 * 0.75), s3 = s2 + Math.round(d2 * 0.5), s4 = s2 + Math.round(d2 * 0.6);
    m.roadmap = [
      { name: 'Mandate and governance', start: 0, dur: d0, what: 'Board mandate and sponsor, a GRC design authority, scope, budget and success measures' },
      { name: 'Discover the current state', start: s1, dur: d1, what: 'Inventory current frameworks, registers, systems, obligations and pain points, and baseline maturity' },
      { name: 'Design the architecture', start: s2, dur: d2, what: 'Taxonomies, rating scales, the data model, operating model, committees and reporting' },
      { name: 'Framework documents', start: s3, dur: d3, what: 'Update the framework, risk appetite, policies and methodologies to the new design' },
      { name: 'Technology and data', start: s4, dur: d4, what: 'Configure the GRC platform or linked registers, and cleanse and migrate data with unique IDs' }
    ];
    var ws = Math.max(s2 + d2, s3 + Math.round(d3 * 0.7)), end = ws;
    m.waves.forEach(function (w, i) {
      var start = ws + i * Math.round(dw * 0.75);
      var focus = [];
      if (w.l1.length) focus.push('risk categories: ' + w.l1.map(function (L) { return L.def.label; }).join(', '));
      if (w.regimes.length) focus.push('regimes: ' + w.regimes.map(function (rg) { return short(rg.id); }).join(', '));
      m.roadmap.push({ name: 'Implement wave ' + (i + 1), start: start, dur: dw, wave: i, what: focus.length ? 'Roll out registers, controls, testing and reporting for ' + focus.join('; ') : 'Roll out the remaining registers, controls and reporting' });
      end = Math.max(end, start + dw);
    });
    m.roadmap.push({ name: 'Embed, assure and improve', start: ws + Math.round(dw * 0.5), dur: 0, what: 'Training, assurance over the new processes, data quality measures and continuous improvement (ongoing)' });
    m.weeks = end;

    // quick wins
    m.wins = s.pains.map(function (p) { return PAIN[p].win; });
    if (!m.wins.length) m.wins = ['Agree the Level 1 risk taxonomy and common rating scales with every function.', 'Stand up one incident and breach log that records the awareness date for every event.', 'Build the obligations register for the three regimes with the most obligations.'];
    if (m.reg.cps230 && !pains.providers) m.wins.push('Confirm the critical operations and material service providers, each with a named owner.');
    if (s.maturity.data <= 1) m.wins.push('Move risk, control and obligation registers into shared files with unique IDs.');
    m.wins = m.wins.slice(0, 6);

    // operating model suggestion
    var bs = bodies(m);
    m.bodies = bs;
    if (m.group && (m.types >= 2 || m.total >= 3)) m.om = ['Hybrid', 'A common fit for a profile like this is a hybrid model: the group sets one taxonomy, data model, methodology and platform, and each entity owns its risk registers, appetite and decisions within them. It suits you because you have ' + n(m.total, 'entity', 'entities') + ' of ' + n(m.types, 'type') + (bs.length > 1 ? ', ' + bs.length + ' regulators' : '') + (s.juris.length ? ' and operations outside Australia' : '') + ', and each ' + (m.apra ? 'APRA-regulated ' : '') + 'entity board must be able to show it owns its risks, while the group still needs one data set to see risk across entities.'];
    else if (m.group) m.om = ['Centralised, with entity reporting', 'With two entities of the same type, a centralised model with reporting cut by entity is often enough. Move towards a hybrid model if the entities’ businesses, regulators or boards differ materially.'];
    else if (m.scaleIdx >= 2) m.om = ['Centralised design, embedded delivery', 'For a single large entity, a central risk and compliance team usually owns the framework, taxonomy and GRC system, with risk partners embedded in each business line to support the first-line owners of risks and controls.'];
    else m.om = ['Centralised', 'For a single smaller entity, one team can run the framework, registers and reporting. First-line owners stay accountable for their own risks and controls.'];

    // the worked example thread
    m.thread = null;
    var pref = ['cps230', 'breach', 'cps234', 'aml', 'privacy', 'ddo', 'ransom'];
    var order = pref.filter(function (k) { return m.reg[k]; }).concat(regs.filter(function (k) { return pref.indexOf(k) < 0; }));
    for (var i = 0; i < order.length && !m.thread; i++) {
      var rg = m.regimes.filter(function (r) { return r.id === order[i]; })[0];
      var ob = rg.obs.filter(function (o) { return /notif|report/i.test(o.title) && o.l2.length; })[0] || rg.obs.filter(function (o) { return o.l2.length; })[0];
      if (!ob) continue;
      var it = ob.l2.filter(function (x) { return x.x.id !== 'cmp.reporting'; })[0] || ob.l2[0];
      m.thread = { rg: rg, ob: ob, clock: (rg.def.clocks || [])[0] || null, it: it, l1: it.l1, risk: it.risks[0], control: it.controls[0], kri: it.kris[0], committee: m.committeeFor(it.l1.def.id) };
    }

    m.checks = checks(m);
    return m;
  }

  function checks(m) {
    var s = m.s, g = m.g, out = [];
    function c(sev, text, step) { out.push({ sev: sev, text: text, step: step }); }
    if (!m.total) c('warn', 'No entity types are chosen, so the model only has the core elements every GRC system needs. Choose at least one in step 1.', 0);
    var partial = {};
    m.regimes.forEach(function (rg) {
      var miss = {}, nun = 0;
      rg.obs.forEach(function (o) {
        if (!o.l2.length) { nun++; o.missing.forEach(function (x) { miss[x.risk.id] = 1; }); }
        else o.missing.forEach(function (x) { partial[x.risk.id] = partial[x.risk.id] || []; if (partial[x.risk.id].indexOf(short(rg.id)) < 0) partial[x.risk.id].push(short(rg.id)); });
      });
      var ks = Object.keys(miss);
      if (nun) c('warn', rg.def.label + ': ' + n(nun, 'obligation theme') + ' ' + (nun === 1 ? 'links' : 'link') + ' only to ' + and(ks.map(function (k) { return RISK[k].label; })) + ' risk, which is not in your taxonomy. Add the categor' + (ks.length > 1 ? 'ies' : 'y') + ' in step 4, or remove the regime in step 3.', 3);
    });
    var pk = Object.keys(partial);
    if (pk.length) c('info', 'Some obligation themes also link to categories outside your taxonomy: ' + and(pk.map(function (k) { return RISK[k].label + ' (' + partial[k].join(', ') + ')'; })) + '. They are still covered by other risks; the extra links show as out of scope in the obligations register.', 3);
    if (m.apra && !m.reg.cps220) c('warn', 'APRA-regulated entities must meet CPS 220 (SPS 220 for super trustees), but it is not selected.', 2);
    if (m.reg.far && !m.apra) c('warn', 'FAR applies to APRA-regulated banks, insurers and super trustees, but none is chosen in step 1.', 0);
    ['sps515', 'sps530', 'sis'].forEach(function (k) { if (m.reg[k] && !s.entities.rse) c('warn', REGS[k].label + ' applies to super trustees, but no super trustee is chosen in step 1.', 0); });
    var prud = ['cps220', 'cps230', 'cps234', 'cps510', 'cps511', 'capital', 'liquidity', 'cps190'].filter(function (k) { return m.reg[k]; });
    if (prud.length && !m.apra) c('warn', 'APRA prudential standards (' + prud.map(short).join(', ') + ') are selected, but no APRA-regulated entity type is chosen in step 1.', 0);
    if (s.sfi && !m.apra) c('info', 'Significant financial institution status only matters for APRA-regulated entities, so it has been ignored.', 0);
    s.features.forEach(function (f) {
      var miss = FEAT[f].risks.filter(function (k) { return !m.sel[k].inc; });
      if (miss.length) c('warn', 'Your operating model includes ' + lc(FEAT_SHORT[f]) + ', which brings ' + and(miss.map(function (k) { return RISK[k].label; })) + ' risk, but that category is not in your taxonomy.', 3);
    });
    m.l1.forEach(function (L) { if (!L.l2.length) c('warn', L.def.label + ' is in your taxonomy, but none of its Level 2 sub-types apply to your entity types, features or regimes. Check whether it belongs, or add your own sub-types.', 3); });
    if (s.regimes) {
      var notSel = REG_IDS.filter(function (k) { return has(g.reg, k) && !m.reg[k]; });
      if (notSel.length) c('info', 'Not selected, but usually relevant to your entity types or features: ' + and(notSel.map(short)) + '. Check whether they apply.', 2);
    }
    var odd = m.regimes.filter(function (rg) { return !rg.why; });
    if (odd.length) c('info', 'Added by you and not usually linked to your entity types: ' + and(odd.map(function (rg) { return short(rg.id); })) + '. Check the applicability notes in step 3.', 2);
    if (s.risks) {
      var ex = D.risks.filter(function (r) { return has(g.risk, r.id) && !m.sel[r.id].inc; });
      if (ex.length) c('info', 'Usually in scope for your entity types or features, but excluded: ' + and(ex.map(function (r) { return r.label; })) + '.', 3);
    }
    if (m.l1.length && !m.l1.some(function (L) { return L.mat; })) c('warn', 'No Level 1 category is marked material, so the board has no appetite metrics to monitor.', 3);
    if (m.reg.climate && m.sel.climate.inc && !m.sel.climate.mat) c('info', 'Climate disclosures are selected, but climate risk is not marked material. Check that your materiality assessment supports this.', 3);
    if (m.group && m.scaleIdx === 0) c('info', 'Groups usually need entity-level risk forums and reporting, even when each entity is small.', 0);
    if (s.maturity.technology - s.maturity.data >= 2) c('info', 'Technology maturity is well ahead of data maturity. A GRC platform does not fix data: plan cleansing and data ownership before migrating.', 4);
    if (s.maturity.process - s.maturity.people >= 2) c('info', 'Processes are rated well ahead of people and structures. Processes rarely stick without clear owners and committees.', 4);
    s.juris.forEach(function (j) { c('info', JUR[j].label + ': ' + JUR[j].note, 0); });
    if (m.obligations.length && m.covered === m.obligations.length) c('ok', 'Every obligation theme links to at least one Level 2 risk and its controls.', null);
    if (m.group) c('ok', 'Group structure: the Level 2 risk for group and related-party arrangements and a group governance framework were added, and documents are marked group-wide or entity-specific.', null);
    if (m.reg.aml) c('ok', 'AML/CTF: an AML/CTF Compliance Officer, the ML/TF risk assessment and program documents, and the AUSTRAC reporting clocks were added.', null);
    if (m.flags.cps230) c('ok', 'CPS 230: critical operations, tolerance levels and material service providers were added to the data model and calendar.', null);
    var pulled = m.l2.filter(function (it) { return it.pulled; });
    if (pulled.length) c('ok', n(pulled.length, 'Level 2 sub-type') + ' added because your regimes need ' + (pulled.length === 1 ? 'it' : 'them') + ': ' + and(pulled.map(function (it) { return it.x.label; })) + '.', null);
    var rank = { warn: 0, info: 1, ok: 2 };
    return out.sort(function (a, b) { return rank[a.sev] - rank[b.sev]; });
  }

  // ------------------------------------------------------------------ small renderers
  function table(head, rows, cls) {
    return '<div class="table-wrap" tabindex="0"><table' + (cls ? ' class="' + cls + '"' : '') + '><thead><tr>' + head.map(function (h) { return '<th scope="col">' + h + '</th>'; }).join('') + '</tr></thead><tbody>' + rows.join('') + '</tbody></table></div>';
  }
  function tr(cells) { return '<tr>' + cells.map(function (c, i) { return i === 0 ? '<th scope="row">' + c + '</th>' : '<td>' + c + '</td>'; }).join('') + '</tr>'; }
  function chip(t, cls) { return '<span class="gb-chip' + (cls ? ' ' + cls : '') + '">' + esc(t) + '</span>'; }
  function ids(list) { return list.length ? list.map(function (x) { return '<span class="gb-id">' + esc(x.id || x) + '</span>'; }).join(' ') : '<span class="gb-none">None</span>'; }
  function guide(label, url) { return url ? '<a href="' + url + '">' + esc(label) + '</a>' : esc(label); }
  function scopeLabel(m, d) { return !m.group ? 'Organisation' : d.scope === 'entity' ? 'Each regulated entity' : 'Group-wide, adopted by each entity'; }
  function levelName(c, l) { return c.levels[l - 1].split(':')[0]; }

  // ------------------------------------------------------------------ diagrams (inline SVG)
  function dmSvg(m) {
    var FILL = { gov: '#1b3a5c', org: '#e8f0fe', core: '#2563eb', act: '#ffffff' }, TXT = { gov: '#ffffff', org: '#0f2942', core: '#ffffff', act: '#0f2942' };
    var by = {};
    m.nodes.forEach(function (x) { by[x.id] = x; });
    var cnt = { policy: m.docs.length, risk: m.risks.length, obligation: m.obligations.length, control: m.controls.length, kri: m.kris.length, board: m.committees.length, entity: m.total, report: m.reports.length };
    var s = '<svg viewBox="0 0 1020 600" class="grc-map-svg" role="img" aria-labelledby="gb-dm-t gb-dm-d"><title id="gb-dm-t">Data model for this GRC model</title><desc id="gb-dm-d">' + esc(m.nodes.length + ' record types joined by ' + m.edges.length + ' relationships. Orange badges show how many records this model starts with. The record types, fields and relationships are listed below.') + '</desc>';
    m.edges.forEach(function (e) { var a = by[e.a], b = by[e.b]; s += '<line x1="' + (a.x + 46) + '" y1="' + (a.y + 4) + '" x2="' + (b.x + 46) + '" y2="' + (b.y + 4) + '" stroke="#9fb4d6" stroke-width="1.3"/>'; });
    m.nodes.forEach(function (x) {
      s += '<g><title>' + esc(x.label + ': ' + x.desc) + '</title><rect x="' + (x.x - 40) + '" y="' + (x.y - 21) + '" width="172" height="50" rx="10" fill="' + FILL[x.group] + '" stroke="' + (x.group === 'act' ? '#2563eb' : 'none') + '" stroke-width="1.4"/>';
      wrap(x.label, 22).forEach(function (ln, i, all) { s += '<text x="' + (x.x + 46) + '" y="' + (x.y + 8 + (i - (all.length - 1) / 2) * 15) + '" text-anchor="middle" font-size="12.5" font-weight="600" fill="' + TXT[x.group] + '">' + esc(ln) + '</text>'; });
      var c = cnt[x.id];
      if (c) { var t = String(c), w = 14 + t.length * 7.5; s += '<rect x="' + (x.x + 138 - w) + '" y="' + (x.y - 31) + '" width="' + w + '" height="19" rx="9.5" fill="#ff9f0a"/><text x="' + (x.x + 138 - w / 2) + '" y="' + (x.y - 17.5) + '" text-anchor="middle" font-size="11.5" font-weight="700" fill="#1d1d1f">' + t + '</text>'; }
      s += '</g>';
    });
    return s + '</svg>';
  }

  function radarSvg(m) {
    var cx = 230, cy = 178, R = 118, k = m.maturity.length;
    function pt(i, v) { var a = -Math.PI / 2 + i * 2 * Math.PI / k, r = R * v / 5; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
    function poly(vals) { return vals.map(function (v, i) { var p = pt(i, v); return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '); }
    var s = '<svg viewBox="0 0 460 362" class="gb-radar" role="img" aria-labelledby="gb-rd-t gb-rd-d"><title id="gb-rd-t">Current and target GRC maturity</title><desc id="gb-rd-d">' + esc(m.maturity.map(function (x) { return x.c.label + ': current ' + x.cur + ', target ' + x.tgt; }).join('; ') + '.') + '</desc>';
    for (var l = 5; l >= 1; l--) s += '<polygon points="' + poly(m.maturity.map(function () { return l; })) + '" fill="' + (l === 5 ? '#f5f5f7' : 'none') + '" stroke="#d2d2d7" stroke-width="1"/>';
    m.maturity.forEach(function (x, i) {
      var p = pt(i, 5), q = pt(i, 5.85), anchor = Math.abs(q[0] - cx) < 12 ? 'middle' : (q[0] > cx ? 'start' : 'end');
      s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + p[0].toFixed(1) + '" y2="' + p[1].toFixed(1) + '" stroke="#d2d2d7"/>';
      s += '<text x="' + q[0].toFixed(1) + '" y="' + (q[1] + 5).toFixed(1) + '" text-anchor="' + anchor + '" font-size="14" font-weight="600" fill="#1d1d1f">' + esc(x.c.label.split(' ')[0]) + '</text>';
    });
    for (var r = 1; r <= 5; r++) { var tp = pt(0, r); s += '<text x="' + (tp[0] + 5).toFixed(1) + '" y="' + (tp[1] + 4).toFixed(1) + '" font-size="10.5" fill="#6e6e73">' + r + '</text>'; }
    s += '<polygon points="' + poly(m.maturity.map(function (x) { return x.tgt; })) + '" fill="none" stroke="#1b3a5c" stroke-width="2" stroke-dasharray="6 5"/>';
    s += '<polygon points="' + poly(m.maturity.map(function (x) { return x.cur; })) + '" fill="rgba(0,113,227,0.18)" stroke="#0071e3" stroke-width="2.5"/>';
    m.maturity.forEach(function (x, i) { var p = pt(i, x.cur); s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="4" fill="#0071e3"/>'; });
    s += '<g font-size="13" fill="#1d1d1f"><rect x="120" y="336" width="16" height="12" rx="2" fill="rgba(0,113,227,0.18)" stroke="#0071e3" stroke-width="1.5"/><text x="142" y="346">Current</text><line x1="220" y1="342" x2="248" y2="342" stroke="#1b3a5c" stroke-width="2" stroke-dasharray="6 5"/><text x="254" y="346">Target (level ' + m.target + ')</text></g>';
    return s + '</svg>';
  }

  function ganttSvg(m) {
    var P = m.roadmap, total = Math.max(m.weeks + 4, 12), L = 240, W = 1000, top = 46, rh = 38, H = top + P.length * rh + 12;
    var sc = (W - L - 24) / total, months = total / 4.345, step = months > 30 ? 6 : 3;
    var COL = ['#1b3a5c', '#1b3a5c', '#2563eb', '#2563eb', '#0071e3', '#4745c2', '#5b59d6', '#7472e0'];
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="gb-gantt-svg" role="img" aria-labelledby="gb-gt-t gb-gt-d"><title id="gb-gt-t">Indicative implementation roadmap</title><desc id="gb-gt-d">' + esc('About ' + Math.round(m.weeks / 4.345) + ' months to complete the implementation waves, in overlapping phases, followed by ongoing embedding. The table below lists each phase and its timing.') + '</desc>';
    s += '<defs><linearGradient id="gb-fade" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#17692d"/><stop offset="1" stop-color="#17692d" stop-opacity="0.12"/></linearGradient></defs>';
    for (var mo = 0; mo <= months; mo += step) {
      var gx = (L + mo * 4.345 * sc).toFixed(1);
      s += '<line x1="' + gx + '" y1="' + (top - 6) + '" x2="' + gx + '" y2="' + (H - 6) + '" stroke="#e3e3e8"/><text x="' + gx + '" y="' + (top - 14) + '" text-anchor="middle" font-size="12.5" fill="#6e6e73">' + (mo === 0 ? 'Start' : 'Month ' + mo) + '</text>';
    }
    P.forEach(function (p, i) {
      var y = top + i * rh, x = L + p.start * sc, w = (p.dur ? p.dur : total - p.start) * sc;
      s += '<text x="' + (L - 14) + '" y="' + (y + 24) + '" text-anchor="end" font-size="14" font-weight="600" fill="#1d1d1f">' + esc(p.name) + '</text>';
      s += '<rect x="' + x.toFixed(1) + '" y="' + (y + 8) + '" width="' + Math.max(w, 4).toFixed(1) + '" height="24" rx="7" fill="' + (p.dur ? COL[Math.min(i, COL.length - 1)] : 'url(#gb-fade)') + '"><title>' + esc(p.name + ': ' + p.what) + '</title></rect>';
    });
    return s + '</svg>';
  }

  function clockSvg(m) {
    var C = m.clocks.filter(function (c) { return c.h !== null; });
    if (!C.length) return '';
    var L = 430, W = 1000, top = 44, rh = 32, H = top + C.length * rh + 12, lo = Math.log(12), hi = Math.log(1000);
    function X(h) { return L + (Math.log(h) - lo) / (hi - lo) * (W - L - 170); }
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="gb-clock-svg" role="img" aria-labelledby="gb-ck-t gb-ck-d"><title id="gb-ck-t">Notification clocks, shortest first</title><desc id="gb-ck-d">' + esc(C.map(function (c) { return c.event + ': ' + c.time + ' (' + c.to + ')'; }).join('; ') + '. Bars use a log scale.') + '</desc>';
    [[24, '1 day'], [72, '3 days'], [168, '1 week'], [336, '2 weeks'], [720, '30 days']].forEach(function (t) {
      var x = X(t[0]).toFixed(1);
      s += '<line x1="' + x + '" y1="' + (top - 6) + '" x2="' + x + '" y2="' + (H - 6) + '" stroke="#e3e3e8"/><text x="' + x + '" y="' + (top - 14) + '" text-anchor="middle" font-size="12.5" fill="#6e6e73">' + t[1] + '</text>';
    });
    C.forEach(function (c, i) {
      var y = top + i * rh, x2 = X(c.h), col = BODY_COLOUR[bodyOf(c.rg)] || '#8a4600', ev = c.event.length > 60 ? c.event.slice(0, 58).replace(/\s+\S*$/, '') + '…' : c.event;
      s += '<g><title>' + esc(c.event + ': ' + c.time + ' (' + c.to + ', ' + short(c.rg.id) + ')') + '</title>';
      s += '<text x="' + (L - 14) + '" y="' + (y + 21) + '" text-anchor="end" font-size="13.5" fill="#1d1d1f">' + esc(ev) + '</text>';
      s += '<rect x="' + L + '" y="' + (y + 8) + '" width="' + (x2 - L).toFixed(1) + '" height="18" rx="5" fill="' + col + '"/>';
      s += '<text x="' + (x2 + 8).toFixed(1) + '" y="' + (y + 21) + '" font-size="13" font-weight="600" fill="#1d1d1f">' + esc(c.short + ' · ' + short(c.rg.id)) + '</text></g>';
    });
    return s + '</svg>';
  }

  // ------------------------------------------------------------------ panels
  function pOverview(m) {
    var s = m.s, h = [];
    if (!m.total) h.push('<div class="callout warn"><p><strong>Choose at least one entity type</strong> in step 1 to tailor the model. Without one, it shows only the core elements every GRC system needs.</p></div>');
    var nmat = m.l1.filter(function (L) { return L.mat; }).length, nkey = m.controls.filter(function (c) { return c.key; }).length;
    h.push('<div class="gb-stats">' + [
      [m.docs.length, 'framework documents', 'frameworks'],
      [m.enterprise.length, 'enterprise risks', 'risks'],
      [m.l1.length, 'Level 1 categories', 'risks', nmat + ' material'],
      [m.l2.length, 'Level 2 sub-types', 'risks'],
      [m.risks.length, 'example Level 3 risks', 'risks'],
      [m.controls.length, 'controls', 'risks', nkey + ' key'],
      [m.kris.length, 'key risk indicators', 'risks'],
      [m.obligations.length, 'obligation themes', 'obligations', n(m.regimes.length, 'regime')],
      [m.clocks.length, 'notification clocks', 'obligations'],
      [m.committees.length, 'committees and forums', 'governance']
    ].map(function (x) { return '<button type="button" class="gb-stat" data-goto="' + x[2] + '"><span class="gb-n">' + x[0] + '</span><span class="gb-l">' + esc(x[1]) + '</span>' + (x[3] ? '<span class="gb-s">' + esc(x[3]) + '</span>' : '') + '</button>'; }).join('') + '</div>');
    var prof = [
      ['Entities', m.ents.length ? m.ents.map(function (x) { return x.n + ' × ' + x.def.label; }).join('; ') : 'None chosen'],
      ['Size and complexity', SCALES[s.scale][0] + ': ' + lc(SCALES[s.scale][1])]
    ];
    if (m.apra) prof.push(['Significant financial institution', m.sfi ? 'Yes' : 'No']);
    prof.push(['Operations outside Australia', s.juris.length ? and(s.juris.map(function (j) { return JUR[j].label; })) : 'None']);
    prof.push(['Operating model', s.features.length ? and(s.features.map(function (f) { return lc(FEAT_SHORT[f]); })).replace(/^./, function (c) { return c.toUpperCase(); }) : 'No features chosen']);
    prof.push(['Regulators in scope', m.bodies.length ? m.bodies.join(', ') : 'None']);
    prof.push(['Challenges', s.pains.length ? s.pains.map(function (p) { return PAIN[p].label; }).join('; ') : 'None chosen']);
    h.push('<div class="gb-cols"><div><h4>Profile</h4>' + table(['Item', 'Your answer'], prof.map(function (r) { return tr([esc(r[0]), esc(r[1])]); }), 'gb-kv') + '</div>');
    h.push('<div><h4>Suggested operating model</h4><div class="gb-callout"><p class="gb-om">' + esc(m.om[0]) + '</p><p>' + esc(m.om[1]) + '</p>' + more('groups', 'centralised, federated and hybrid GRC models') + '</div></div></div>');
    if (m.thread) {
      var t = m.thread, steps = [['Obligation', t.ob.id, t.ob.title + ' (' + t.rg.def.label + ')']];
      if (t.clock) steps.push(['Notification clock', t.clock[1], t.clock[0] + ', to ' + t.clock[2]]);
      steps.push(['Level 2 risk', t.it.code, t.it.x.label + ' (' + t.l1.def.label + (t.l1.mat ? ', a material category' : '') + ')']);
      if (t.risk) steps.push(['Level 3 risk', t.risk.id, t.risk.event]);
      if (t.control) steps.push(['Control', t.control.id, t.control.desc + ' (' + lc(TYPE[t.control.type]) + ', ' + lc(t.control.freq) + ')']);
      if (t.kri) steps.push(['Key risk indicator', t.kri.id, t.kri.metric]);
      if (t.l1.mat) steps.push(['Appetite metric', t.l1.code, t.l1.def.metrics[0] + ', set by the board']);
      steps.push(['Oversight', '', t.committee.name + (t.committee !== m.erc ? ', then the ' + lc(m.erc.name) : '') + ', reporting to the ' + lc(m.top.name)]);
      h.push('<h4>How it links: one thread through your model</h4><p>Every record links to the next, so a single change can be traced from the obligation to the board. Here is one thread from ' + esc(short(t.rg.id)) + ':</p><ol class="gb-thread">' + steps.map(function (x) { return '<li><span class="gb-tk">' + esc(x[0]) + '</span>' + (x[1] ? '<span class="gb-tid">' + esc(x[1]) + '</span>' : '') + '<span class="gb-tt">' + esc(x[2]) + '</span></li>'; }).join('') + '</ol>');
    }
    h.push('<h4>First 90 days: quick wins</h4><ul class="gb-wins">' + m.wins.map(function (w) { return '<li>' + esc(w) + '</li>'; }).join('') + '</ul>');
    var nw = m.checks.filter(function (c) { return c.sev === 'warn'; }).length, ni = m.checks.filter(function (c) { return c.sev === 'info'; }).length;
    h.push('<p class="gb-checksum">' + (nw ? '<strong>' + n(nw, 'thing') + ' to fix</strong> and ' : '') + n(ni, 'thing') + ' worth checking. <button type="button" class="secondary gb-small" data-goto="checks">See the checks</button></p>');
    return h.join('');
  }

  function pFrameworks(m) {
    var by = { 1: [], 2: [], 3: [], 4: [] }, h = [];
    m.docs.forEach(function (d) { by[d.level].push(d); });
    h.push('<p>A GRC system rests on a hierarchy of documents. Board-approved frameworks set direction, policies set rules, standards and methodologies say how, and procedures and registers record the detail. This list combines the core documents every GRC system needs with those your regimes and operating model add.</p>');
    h.push('<ol class="gb-pyr" aria-label="Document hierarchy">' + [1, 2, 3, 4].map(function (l) { return '<li style="--w:' + (46 + l * 13) + '%"><span class="gb-pyr-n">' + by[l].length + '</span><span class="gb-pyr-t">Level ' + l + ': ' + esc(DOC_LEVELS[l]) + '</span></li>'; }).join('') + '</ol>');
    var head = ['ID', 'Document', 'Level', 'Approver'].concat(m.group ? ['Applies at'] : []).concat(['Prompted by']);
    h.push(table(head, m.docs.map(function (d) {
      return tr([esc(d.id), esc(d.name), String(d.level), esc(d.approver)].concat(m.group ? [esc(scopeLabel(m, d))] : []).concat([d.src.map(function (p) { return guide(p[0], p[1]); }).join(', ')]));
    }), 'gb-docs'));
    h.push(more('governance', 'the document hierarchy and GRC governance'));
    return h.join('');
  }

  function pRisks(m) {
    var h = [], nmat = m.l1.filter(function (L) { return L.mat; }).length;
    h.push('<p>Risks sit at several levels. Enterprise risks are the few big threats to strategy that the board debates. Level 1 categories frame appetite; the material ones get board-approved appetite metrics. Level 2 sub-types give consistent structure, and Level 3 risks are the specific risks in registers, each with controls and indicators.</p>');
    h.push('<ol class="gb-pyr gb-pyr-risk" aria-label="Risk hierarchy">' + [
      [m.enterprise.length, 'Enterprise risks', 'board and executive'],
      [m.l1.length, 'Level 1 categories', nmat + ' material, with appetite metrics'],
      [m.l2.length, 'Level 2 sub-types', 'common structure across the group'],
      [m.risks.length, 'Level 3 example risks', 'specific risks in registers'],
      [m.controls.length + m.kris.length, 'Controls and KRIs', m.controls.length + ' controls and ' + m.kris.length + ' indicators']
    ].map(function (x, i) { return '<li style="--w:' + (40 + i * 15) + '%"><span class="gb-pyr-n">' + x[0] + '</span><span class="gb-pyr-t">' + esc(x[1]) + ' <small>' + esc(x[2]) + '</small></span></li>'; }).join('') + '</ol>');
    if (!m.l1.length) return h.join('') + '<p class="gb-empty">No Level 1 categories are selected. Choose them in step 4.</p>';
    h.push('<h4>Enterprise risks</h4><p class="small">Top-down risks to the strategy, owned by named executives and overseen by the board. Examples for your profile; replace them with your own.</p>');
    h.push(table(['ID', 'Enterprise risk', 'Owner', 'Oversight'], m.enterprise.map(function (e) { return tr([esc(e.id), esc(e.text), 'A named executive', esc(m.committees[0].name)]); })));
    h.push('<h4>Risk appetite by Level 1 category</h4><p class="small">Illustrative starting positions only. The board sets the real appetite, triggers and limits.</p>');
    h.push(table(['Code', 'Category', 'Material', 'Illustrative appetite', 'Metrics', 'Owner'], m.l1.map(function (L) {
      return tr([esc(L.code), guide(L.def.label, L1_GUIDE[L.def.id]), L.mat ? '<span class="gb-mat-badge">Material</span>' : 'No', esc(L.def.stance), (L.mat ? '' : '<span class="small">Monitored by management: </span>') + esc(L.def.metrics.join('; ')), esc(L.def.owner)]);
    })));
    h.push('<h4>The taxonomy, with controls, KRIs and obligations</h4><p class="gb-inline"><button type="button" class="secondary gb-small" data-expand="gb-l1">Expand all</button> <button type="button" class="secondary gb-small" data-collapse="gb-l1">Collapse all</button></p>');
    m.l1.forEach(function (L) {
      var nc = 0, nr = 0;
      L.l2.forEach(function (it) { nc += it.controls.length; nr += it.risks.length; });
      h.push('<details class="gb-l1"><summary><span class="gb-code">' + esc(L.code) + '</span> ' + esc(L.def.label) + (L.mat ? ' <span class="gb-mat-badge">Material</span>' : '') + ' <span class="gb-sumn">' + n(L.l2.length, 'sub-type') + ', ' + n(nr, 'risk') + ', ' + n(nc, 'control') + '</span></summary>');
      h.push('<p>' + esc(L.def.def) + '</p><p class="small">Owner: ' + esc(L.def.owner) + '. Illustrative appetite: ' + esc(lc(L.def.stance)) + '. In scope because: ' + esc(L.why ? and(L.why) : 'added by you') + '. Oversight: ' + esc(m.committeeFor(L.def.id).name) + '.</p>');
      if (!L.l2.length) h.push('<p class="gb-empty">No Level 2 sub-types apply to your entity types, features or regimes.</p>');
      L.l2.forEach(function (it) {
        h.push('<div class="gb-l2"><h5><span class="gb-code">' + esc(it.code) + '</span> ' + esc(it.x.label) + '</h5><p class="small">' + esc(it.x.def) + ' <span class="gb-why">Why: ' + esc(it.why) + '</span></p><dl class="gb-dl">');
        it.risks.forEach(function (r) { h.push('<dt>Example risk <span class="gb-id">' + esc(r.id) + '</span></dt><dd>' + esc(r.event) + '<br><span class="small">Causes: ' + esc(r.causes) + '. Impacts: ' + esc(r.impacts) + '.</span></dd>'); });
        h.push('<dt>Controls</dt><dd><ul class="gb-plain">' + it.controls.map(function (c) { return '<li><span class="gb-id">' + esc(c.id) + '</span> ' + esc(c.desc) + ' <span class="small">(' + esc(TYPE[c.type] + ', ' + lc(c.freq) + ', ' + lc(c.auto)) + (c.key ? ', key control' : '') + ')</span></li>'; }).join('') + '</ul></dd>');
        h.push('<dt>KRIs</dt><dd><ul class="gb-plain">' + it.kris.map(function (k) { return '<li><span class="gb-id">' + esc(k.id) + '</span> ' + esc(k.metric) + '</li>'; }).join('') + '</ul></dd>');
        h.push('<dt>Obligations</dt><dd>' + (it.obs.length ? it.obs.map(function (o) { return '<span class="gb-id" title="' + esc(o.title) + '">' + esc(o.id) + '</span>'; }).join(' ') : '<span class="gb-none">None linked</span>') + '</dd></dl></div>');
      });
      h.push('</details>');
    });
    h.push(more('taxonomy', 'risk taxonomy and the risk hierarchy'));
    return h.join('');
  }

  function pObligations(m) {
    var h = [];
    if (!m.regimes.length) return '<p class="gb-empty">No regimes are selected. Choose them in step 3.</p>';
    h.push('<p>' + n(m.obligations.length, 'obligation theme') + ' from ' + n(m.regimes.length, 'regime') + '. Each theme summarises a group of related obligations in plain English and links to the risks and controls that meet it. A full obligations register breaks each theme into individual obligations with citations, interpretations and owners.</p>');
    var counts = {};
    m.regimes.forEach(function (rg) { var b = bodyOf(rg); counts[b] = (counts[b] || 0) + 1; });
    h.push('<p class="gb-chips">' + Object.keys(counts).map(function (b) { return chip(b + ': ' + n(counts[b], 'regime')); }).join(' ') + '</p>');
    if (m.clocks.length) {
      h.push('<h4>Notification clocks</h4><p>The deadlines that start when something goes wrong. Incident triage should test every event against these on the day it is logged, and record the date the organisation became aware.</p>');
      var svg = clockSvg(m);
      if (svg) h.push('<figure class="gb-fig gb-scroll" tabindex="0">' + svg + '</figure>');
      h.push(table(['Event', 'Timeframe', 'Notify', 'Regime'], m.clocks.map(function (c) { return tr([esc(c.event), esc(c.time), esc(c.to), guide(c.rg.def.label, c.rg.def.url)]); })));
      h.push('<p class="small">Timeframes summarise this site’s guides. Check the source for when each clock starts, exceptions and the latest position.</p>');
    }
    h.push('<h4>Obligations register</h4><p class="gb-inline"><button type="button" class="secondary gb-small" data-expand="gb-reg">Expand all</button> <button type="button" class="secondary gb-small" data-collapse="gb-reg">Collapse all</button></p>');
    REG_GROUPS.forEach(function (gr) {
      var rs = m.regimes.filter(function (rg) { return gr[1].indexOf(rg.id) >= 0; });
      if (!rs.length) return;
      h.push('<h5 class="gb-grouph">' + esc(gr[0]) + '</h5>');
      rs.forEach(function (rg) {
        h.push('<details class="gb-reg"><summary>' + esc(rg.def.label) + ' <span class="gb-sumn">' + esc(rg.def.reg) + ' · ' + n(rg.obs.length, 'theme') + '</span></summary>');
        h.push('<p class="small">Applies to: ' + esc(rg.def.applies) + ' Typical owner: ' + esc(REG_OWNER[rg.id] || 'Executive owner') + '. ' + (rg.why ? 'Suggested for ' + esc(and(rg.why)) + '. ' : 'Added by you. ') + '<a href="' + rg.def.url + '">Read our guide</a>.</p>');
        h.push(table(['ID', 'Obligation', 'Control objective', 'Evidence', 'Risks', 'Controls'], rg.obs.map(function (o) {
          return tr([esc(o.id), esc(o.title), esc(o.objective), esc(o.evidence), o.l2.map(function (it) { return '<span class="gb-id" title="' + esc(it.x.label) + '">' + esc(it.code) + '</span>'; }).join(' ') + (o.missing.length ? ' <span class="gb-warn-t">' + n(o.missing.length, 'link') + ' out of scope</span>' : ''), ids(o.controls)]);
        }), 'gb-obs'));
        h.push('</details>');
      });
    });
    h.push(more('obligations', 'how to design an obligations library'));
    return h.join('');
  }

  function pLinks(m) {
    var h = [];
    h.push('<p>Obligations and risks meet at control objectives, which controls achieve. Linking them once means a control can be designed and tested once and relied on for every obligation and risk it supports: one of the main benefits of an integrated GRC system.</p>');
    if (!m.regimes.length || !m.l1.length) return h.join('') + '<p class="gb-empty">Choose regimes (step 3) and risk categories (step 4) to see the linkages.</p>';
    var pct = m.obligations.length ? Math.round(100 * m.covered / m.obligations.length) : 0;
    h.push('<div class="gb-meter"><div class="gb-meter-t"><strong>' + pct + '%</strong> of obligation themes link to risks and controls in scope (' + m.covered + ' of ' + m.obligations.length + ')</div><div class="gb-meter-bar" role="img" aria-label="' + pct + '% linked"><span style="width:' + pct + '%"></span></div></div>');
    h.push('<h4>Obligation-to-risk map</h4><p class="small">How many obligation themes from each regime link to each Level 1 category. Darker cells mean more links.</p>');
    var head = ['Regime'].concat(m.l1.map(function (L) { return '<abbr title="' + esc(L.def.label) + '">' + esc(L.code) + '</abbr>'; })).concat(['Out of scope']);
    h.push(table(head, m.regimes.map(function (rg) {
      var cells = m.l1.map(function (L) { var c = rg.obs.filter(function (o) { return o.l2.some(function (it) { return it.l1 === L; }); }).length; return c ? '<span class="gb-heat" data-n="' + Math.min(c, 4) + '">' + c + '</span>' : ''; });
      var miss = rg.obs.filter(function (o) { return o.missing.length; }).length;
      return tr(['<span title="' + esc(rg.def.label) + '">' + esc(short(rg.id)) + '</span>'].concat(cells).concat([miss ? '<span class="gb-warn-t">' + miss + '</span>' : '']));
    }), 'gb-heatmap'));
    var top = m.controls.filter(function (c) { return c.obs.length; }).sort(function (a, b) { return b.obs.length - a.obs.length || a.id.localeCompare(b.id); }).slice(0, 10);
    if (top.length) {
      h.push('<h4>Controls that support the most obligations</h4><p class="small">Test these well: each result is evidence for several regimes at once.</p>');
      h.push(table(['Control', 'What it does', 'Obligations', 'Regimes'], top.map(function (c) {
        return tr(['<span class="gb-id">' + esc(c.id) + '</span>', esc(c.desc), String(c.obs.length), esc(uniq(c.obs.map(function (o) { return short(o.rg.id); })).join(', '))]);
      })));
    }
    var hot = m.l2.filter(function (it) { return it.obs.length; }).sort(function (a, b) { return b.obs.length - a.obs.length; }).slice(0, 8);
    if (hot.length) {
      h.push('<h4>Level 2 risks with the most obligations</h4>');
      h.push(table(['Risk', 'Sub-type', 'Obligations', 'Regimes', 'Controls'], hot.map(function (it) {
        return tr(['<span class="gb-id">' + esc(it.code) + '</span>', esc(it.x.label), String(it.obs.length), esc(uniq(it.obs.map(function (o) { return short(o.rg.id); })).join(', ')), String(it.controls.length)]);
      })));
    }
    h.push(more('controls', 'control framework architecture'));
    return h.join('');
  }

  function treeHtml(m) {
    var kids = {};
    m.committees.forEach(function (c) { var p = c.parent || '_'; (kids[p] = kids[p] || []).push(c); });
    function tier(c) { return !c.parent ? 'board' : c.parent === 'board' && c.id !== 'exco' ? 'bc' : (c.id === 'exco' || c.parent === 'exco') ? 'exec' : 'mgmt'; }
    function node(c) {
      return '<li><div class="gb-node gb-node-' + tier(c) + '"><strong>' + esc(c.name) + '</strong><span>' + esc(c.purpose) + '</span>' + (c.note ? '<em>' + esc(c.note) + '</em>' : '') + '</div>' + (kids[c.id] ? '<ul>' + kids[c.id].map(node).join('') + '</ul>' : '') + '</li>';
    }
    return '<ul class="gb-tree">' + (kids._ || []).map(node).join('') + '</ul>';
  }

  function pGovernance(m) {
    var h = [];
    h.push('<p>The committee structure for your profile. Risks are owned in the first line, overseen by management committees, and escalated through the ' + esc(lc(m.erc.name)) + ' to the ' + esc(lc(m.top.name)) + ' and the board. Appetite and delegations flow down the same path.</p>');
    h.push('<div class="gb-legend"><span><i class="gb-sw-board"></i>Boards</span><span><i class="gb-sw-bc"></i>Board committees</span><span><i class="gb-sw-exec"></i>Executive</span><span><i class="gb-sw-mgmt"></i>Management committees and forums</span></div>');
    h.push(treeHtml(m));
    h.push('<h4>Key roles</h4>');
    h.push(table(['Role', 'Line', 'What they do', 'Basis'], m.roles.map(function (r) { return tr([esc(r.label), esc(r.line), esc(r.why), esc(r.req || 'Common practice')]); })));
    h.push('<h4>Who does what (RACI)</h4><p class="small">R: responsible. A: accountable. C: consulted. I: informed.</p>');
    h.push(table(['Activity'].concat(D.raci.cols.map(esc)), D.raci.rows.map(function (r) { return tr(r.map(esc)); }), 'gb-raci'));
    if (m.types > 1 || m.group) {
      h.push('<h4>Group entity matrix</h4><p class="small">Which regimes usually apply to each entity type in the group. Obligations, risks and controls should be tagged with the legal entities they apply to, so reports can be cut by entity.</p>');
      h.push(table(['Regime'].concat(m.ents.map(function (x) { return esc(x.def.label) + (x.n > 1 ? ' (' + x.n + ')' : ''); })).concat(['Why selected']), m.regimes.map(function (rg) {
        return tr([esc(short(rg.id))].concat(m.ents.map(function (x) { return x.def.regimes.indexOf(rg.id) >= 0 ? '<span class="gb-dot" aria-hidden="true">●</span><span class="visually-hidden">Usually applies</span>' : ''; })).concat([esc(rg.why ? and(rg.why) : 'Added by you')]));
      }), 'gb-entmx'));
    }
    if (m.s.juris.length) h.push('<h4>Operations outside Australia</h4><ul>' + m.s.juris.map(function (j) { return '<li><strong>' + esc(JUR[j].label) + ':</strong> ' + esc(JUR[j].note) + '</li>'; }).join('') + '</ul>');
    h.push(more('governance', 'GRC governance and the operating model'));
    return h.join('');
  }

  function pData(m) {
    var h = [], by = {};
    m.nodes.forEach(function (x) { by[x.id] = x; });
    h.push('<p>The records your GRC system holds and how they link. Every record has a unique ID, an owner and links to the records around it, which is what lets one incident update a risk rating, a control result and a board report. The badges show how many records this model starts with.</p>');
    h.push('<figure class="gb-fig gb-scroll" tabindex="0">' + dmSvg(m) + '</figure>');
    h.push('<ul class="grc-legend"><li><i style="background:#1b3a5c"></i>Governance</li><li><i style="background:#e8f0fe;border-color:#9fb4d6"></i>Organisation and operations</li><li><i style="background:#2563eb"></i>Core libraries</li><li><i style="background:#fff;border-color:#2563eb"></i>Activities</li></ul>');
    h.push('<h4>Record types and key fields</h4><div class="gb-fields">' + m.nodes.map(function (x) {
      return '<div class="gb-field"><h5>' + esc(x.label) + '</h5><p>' + esc(x.desc) + '</p><ul>' + (D.fields[x.id] || []).map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul></div>';
    }).join('') + '</div>');
    h.push('<details class="gb-rels"><summary>All ' + m.edges.length + ' relationships</summary><ul>' + m.edges.map(function (e) { return '<li>' + esc(by[e.a].label) + ' <em>' + esc(e.label) + '</em> ' + esc(lc(by[e.b].label)) + '</li>'; }).join('') + '</ul></details>');
    h.push(more('data', 'the GRC data model, with an interactive map'));
    return h.join('');
  }

  function pRoadmap(m) {
    var h = [];
    h.push('<p>Where the organisation is today, where it wants to be, and an indicative path between them.</p>');
    h.push('<div class="gb-cols gb-cols-radar"><figure class="gb-fig">' + radarSvg(m) + '</figure><div>' + table(['Component', 'Now', 'Target', 'Next steps'], m.maturity.map(function (x) {
      return tr([esc(x.c.label), x.cur + '. ' + esc(levelName(x.c, x.cur)), x.tgt + '. ' + esc(levelName(x.c, x.tgt)), x.steps.length ? '<ul class="gb-plain">' + x.steps.map(function (st) { return '<li>' + esc(st) + '</li>'; }).join('') + '</ul>' : 'At or above target: keep improving']);
    }), 'gb-matt') + '</div></div>');
    h.push('<h4>Indicative roadmap</h4><p class="small">Durations scale with size, structure, regimes, jurisdictions and the maturity gap. They are indicative only; real programs vary widely with budget, resourcing and technology choices.</p>');
    h.push('<figure class="gb-fig gb-scroll" tabindex="0">' + ganttSvg(m) + '</figure>');
    h.push(table(['Phase', 'Months', 'What happens'], m.roadmap.map(function (p) {
      var a = Math.floor(p.start / 4.345) + 1, b = p.dur ? Math.max(a, Math.ceil((p.start + p.dur) / 4.345)) : null;
      return tr([esc(p.name), b ? (a === b ? 'Month ' + a : a + ' to ' + b) : 'From month ' + a + ', ongoing', esc(p.what)]);
    })));
    h.push('<h4>First 90 days: quick wins</h4><ul class="gb-wins">' + m.wins.map(function (w) { return '<li>' + esc(w) + '</li>'; }).join('') + '</ul>');
    h.push('<p class="small">Waves put the material categories with the most obligations and the regimes with the most themes and notification clocks first' + (m.s.pains.length ? ', adjusted for the challenges you chose' : '') + '.</p>');
    h.push(more('establish', 'establishing a GRC system, phase by phase'));
    return h.join('');
  }

  function pReporting(m) {
    var h = [];
    h.push('<p>The reports your GRC system should produce from its data, and the yearly rhythm of reviews and approvals. Event-driven deadlines are under Obligations.</p>');
    h.push(table(['Report', 'Audience', 'Frequency', 'Contents', 'Data'], m.reports.map(function (r) { return tr(r.map(esc)); })));
    h.push('<h4>Calendar</h4>');
    var order = [], groups = {};
    m.calendar.forEach(function (c) { if (!has(groups, c.when)) { groups[c.when] = []; order.push(c.when); } groups[c.when].push(c); });
    var rank = ['Monthly', 'Quarterly', 'Annually', 'At least every 3 years'];
    order.sort(function (a, b) { var x = rank.indexOf(a), y = rank.indexOf(b); return (x < 0 ? 9 : x) - (y < 0 ? 9 : y); });
    h.push('<div class="gb-cal">' + order.map(function (w) { return '<div class="gb-cal-g"><h5>' + esc(w) + '</h5><ul>' + groups[w].map(function (c) { return '<li>' + esc(c.what) + ' <span class="gb-src">' + esc(c.src) + '</span></li>'; }).join('') + '</ul></div>'; }).join('') + '</div>');
    return h.join('');
  }

  function pChecks(m) {
    var h = [], groups = [['warn', 'Needs attention'], ['info', 'Worth checking'], ['ok', 'Done for you']];
    h.push('<p>Consistency checks on your answers: gaps between regimes, risk categories and structure, and things the builder added automatically.</p>');
    groups.forEach(function (g) {
      var list = m.checks.filter(function (c) { return c.sev === g[0]; });
      if (!list.length) return;
      h.push('<h4 class="gb-ch-' + g[0] + '">' + g[1] + ' (' + list.length + ')</h4><ul class="gb-checks">' + list.map(function (c) {
        return '<li class="gb-ck-' + c.sev + '"><span>' + esc(c.text) + '</span>' + (c.step !== null ? ' <button type="button" class="secondary gb-small" data-fix="' + c.step + '">Go to step ' + (c.step + 1) + '</button>' : '') + '</li>';
      }).join('') + '</ul>');
    });
    return h.join('');
  }

  function pExport(m) {
    return '<p>Take the model with you. Files are created on this device; nothing is sent anywhere.</p>' +
      '<div class="gb-xgrid">' +
      '<div class="gb-x"><button type="button" data-x="xlsx">Excel workbook (.xlsx)</button><p>About 20 sheets: documents, taxonomy, appetite, risk register, controls, KRIs, obligations, clocks, linkages, committees, roles, RACI, data model, reporting, calendar, maturity, roadmap and checks. Opens in Excel, Numbers, LibreOffice and Google Sheets.</p></div>' +
      '<div class="gb-x"><button type="button" data-x="csv">Risk and control matrix (.csv)</button><p>One row for each risk and control pair, with KRIs and linked obligations: ready to import into a register or GRC tool.</p></div>' +
      '<div class="gb-x"><button type="button" data-x="json">Full model (.json)</button><p>Everything in a structured format, for developers or GRC platform imports.</p></div>' +
      '<div class="gb-x"><button type="button" data-x="print">Print or save as PDF</button><p>Prints every tab in order, with the taxonomy and register sections expanded.</p></div>' +
      '<div class="gb-x"><button type="button" data-x="link">Copy a share link</button><p>A link that rebuilds this model on any device. It contains your answers, including the name you typed.</p><p class="gb-linkbox" hidden><label for="gb-link">Share link</label><input type="text" id="gb-link" readonly></p></div>' +
      '</div><p class="gb-status" id="gb-xstatus" role="status" aria-live="polite"></p>';
  }

  var TABS = [['overview', 'Overview', pOverview], ['frameworks', 'Frameworks', pFrameworks], ['risks', 'Risk universe', pRisks], ['obligations', 'Obligations', pObligations], ['links', 'Linkages', pLinks], ['governance', 'Governance', pGovernance], ['data', 'Data model', pData], ['roadmap', 'Maturity and roadmap', pRoadmap], ['reporting', 'Reporting', pReporting], ['checks', 'Checks', pChecks], ['export', 'Export', pExport]];

  // ------------------------------------------------------------------ exports
  function profileRows(m) {
    var s = m.s;
    return [
      ['Organisation', s.name || '(not named)'],
      ['Entities', m.ents.map(function (x) { return x.n + ' × ' + x.def.label; }).join('; ') || 'None chosen'],
      ['Size and complexity', SCALES[s.scale][0]],
      ['Significant financial institution', m.apra ? (m.sfi ? 'Yes' : 'No') : 'Not applicable'],
      ['Operations outside Australia', s.juris.map(function (j) { return JUR[j].label; }).join(', ') || 'None'],
      ['Operating model features', s.features.map(function (f) { return FEAT_SHORT[f]; }).join(', ') || 'None'],
      ['Challenges', s.pains.map(function (p) { return PAIN[p].label; }).join('; ') || 'None'],
      ['Regimes', m.regimes.map(function (rg) { return rg.def.label; }).join('; ') || 'None'],
      ['Level 1 categories', m.l1.map(function (L) { return L.def.label + (L.mat ? ' (material)' : ''); }).join('; ') || 'None'],
      ['Current maturity', m.maturity.map(function (x) { return x.c.label + ' ' + x.cur; }).join('; ')],
      ['Target maturity', 'Level ' + m.target],
      ['Suggested operating model', m.om[0] + '. ' + m.om[1]]
    ];
  }

  function xlsx(m) {
    var s = m.s, origin = location.origin && location.origin !== 'null' ? location.origin : '', title = (s.name || 'Your organisation') + ': illustrative GRC model', sh = [];
    var guideRows = [['Documents', 'Framework and policy documents, with hierarchy level, approver and what prompted each'], ['Enterprise risks', 'Example top-down risks to strategy'], ['Taxonomy', 'Level 1 categories and Level 2 sub-types with codes, definitions and owners'], ['Appetite', 'Illustrative appetite positions and metrics for each Level 1 category'], ['Risk register', 'Example Level 3 risks with causes, impacts, controls, KRIs and obligations'], ['Controls', 'Control library with objectives, type, frequency, automation and links'], ['KRIs', 'Key risk indicators linked to risks and appetite'], ['Obligations', 'Obligation themes by regime, linked to risks and controls'], ['Clocks', 'Notification deadlines'], ['Linkage matrix', 'Obligation themes by regime and Level 1 category'], ['Committees', 'Committee structure and purpose'], ['Roles', 'Key GRC roles'], ['RACI', 'Who does what across the three lines'], ['Entity matrix', 'Regimes by entity type'], ['Data model', 'Record types, key fields and relationships'], ['Reporting', 'Reporting suite'], ['Calendar', 'Recurring reviews and approvals'], ['Maturity', 'Current and target maturity with next steps'], ['Roadmap', 'Indicative phases and timing'], ['Checks', 'Consistency checks on the answers']];
    var readme = [[{ v: title, s: 'title' }], [{ v: 'Generated by the RiskLens Australia GRC model builder on ' + today() + (origin ? ' (' + origin + '/grc/model-builder.html)' : '') + '.', s: 'plain' }], [{ v: 'An illustrative, educational model built from your answers. It is not legal, financial or compliance advice and is not a complete list of the obligations that apply to your organisation. Check the official legislation and regulator guidance, and seek professional advice where appropriate.', s: 'plain' }], [''], [{ v: 'Sheets', s: 'bold' }]];
    guideRows.forEach(function (r) { readme.push(r); });
    readme.push(['']); readme.push([{ v: 'Profile', s: 'bold' }]);
    profileRows(m).forEach(function (r) { readme.push(r); });
    readme.push(['']); readme.push([{ v: 'First 90 days: quick wins', s: 'bold' }]);
    m.wins.forEach(function (w, i) { readme.push([String(i + 1), w]); });
    sh.push({ name: 'Read me', header: false, rows: readme, widths: [34, 110] });
    sh.push({ name: 'Documents', rows: [['ID', 'Document', 'Level', 'Level name', 'Approver', 'Applies at', 'Prompted by']].concat(m.docs.map(function (d) { return [d.id, d.name, d.level, DOC_LEVELS[d.level], d.approver, scopeLabel(m, d), d.src.map(function (p) { return p[0]; }).join(', ')]; })), widths: [8, 52, 8, 30, 26, 32, 40] });
    sh.push({ name: 'Enterprise risks', rows: [['ID', 'Enterprise risk', 'Owner', 'Oversight']].concat(m.enterprise.map(function (e) { return [e.id, e.text, 'A named executive', m.committees[0].name]; })), widths: [8, 80, 22, 22] });
    var tax = [['Level', 'Code', 'Name', 'Parent', 'Definition', 'Material', 'Owner', 'Why in scope']];
    m.l1.forEach(function (L) {
      tax.push(['Level 1', L.code, L.def.label, '', L.def.def, L.mat ? 'Yes' : 'No', L.def.owner, L.why ? L.why.join(', ') : 'Added by you']);
      L.l2.forEach(function (it) { tax.push(['Level 2', it.code, it.x.label, L.code, it.x.def, '', '', it.why]); });
    });
    sh.push({ name: 'Taxonomy', rows: tax, widths: [9, 9, 36, 8, 60, 10, 32, 34] });
    var app = [['Code', 'Level 1 category', 'Material', 'Illustrative appetite', 'Metric', 'Trigger (amber)', 'Limit (red)', 'Reported to', 'Owner']];
    m.l1.forEach(function (L) { L.def.metrics.forEach(function (mt) { app.push([L.code, L.def.label, L.mat ? 'Yes' : 'No', L.def.stance, mt, L.mat ? 'Set by the board' : 'Set by management', L.mat ? 'Set by the board' : 'Set by management', L.mat ? m.top.name : m.erc.name, L.def.owner]); }); });
    sh.push({ name: 'Appetite', rows: app, widths: [8, 26, 9, 30, 46, 16, 16, 28, 32] });
    sh.push({ name: 'Risk register', rows: [['Risk ID', 'Level 1', 'Level 2 code', 'Level 2', 'Risk event', 'Causes', 'Impacts', 'Inherent rating', 'Controls', 'Residual rating', 'KRIs', 'Linked obligations', 'Risk owner']].concat(m.risks.map(function (r) {
      var it = r.it; return [r.id, it.l1.def.label, it.code, it.x.label, r.event, r.causes, r.impacts, '', it.controls.map(function (c) { return c.id; }).join(', '), '', it.kris.map(function (k) { return k.id; }).join(', '), it.obs.map(function (o) { return o.id; }).join(', '), it.l1.def.owner];
    })), widths: [13, 20, 10, 28, 50, 36, 34, 12, 22, 12, 22, 30, 28] });
    sh.push({ name: 'Controls', rows: [['Control ID', 'Level 2 code', 'Control objective', 'Control', 'Type', 'Frequency', 'Automation', 'Key control', 'Mitigates risks', 'Supports obligations', 'Control owner', 'Last test result']].concat(m.controls.map(function (c) {
      return [c.id, c.it.code, c.objective, c.desc, TYPE[c.type], c.freq, c.auto, c.key ? 'Yes' : 'No', c.it.risks.map(function (r) { return r.id; }).join(', '), c.obs.map(function (o) { return o.id; }).join(', '), '', ''];
    })), widths: [13, 10, 36, 60, 12, 14, 14, 10, 16, 34, 16, 16] });
    sh.push({ name: 'KRIs', rows: [['KRI ID', 'Metric', 'Level 2 code', 'Level 2', 'Monitors risks', 'Rolls up to appetite metric', 'Trigger', 'Limit', 'Frequency']].concat(m.kris.map(function (k) {
      return [k.id, k.metric, k.it.code, k.it.x.label, k.it.risks.map(function (r) { return r.id; }).join(', '), k.it.l1.mat ? k.it.l1.def.metrics[0] : '(management metric)', '', '', ''];
    })), widths: [13, 46, 10, 30, 16, 40, 12, 12, 12] });
    sh.push({ name: 'Obligations', rows: [['Obligation ID', 'Regime', 'Regulator', 'Obligation (summary)', 'Control objective', 'Evidence', 'Linked Level 2 risks', 'Linked controls', 'Typical owner', 'Applies to', 'Guide']].concat(m.obligations.map(function (o) {
      return [o.id, o.rg.def.label, o.rg.def.reg, o.title, o.objective, o.evidence, o.l2.map(function (it) { return it.code + ' ' + it.x.label; }).join('; ') + (o.missing.length ? ' (not in scope: ' + o.missing.map(function (x) { return x.label; }).join('; ') + ')' : ''), o.controls.map(function (c) { return c.id; }).join(', '), REG_OWNER[o.rg.id] || '', o.rg.def.applies, origin + o.rg.def.url];
    })), widths: [16, 30, 16, 60, 40, 34, 40, 30, 24, 40, 40] });
    sh.push({ name: 'Clocks', rows: [['Event', 'Timeframe', 'Notify', 'Regime', 'Guide']].concat(m.clocks.map(function (c) { return [c.event, c.time, c.to, c.rg.def.label, origin + c.rg.def.url]; })), widths: [56, 44, 24, 36, 40] });
    sh.push({ name: 'Linkage matrix', rows: [['Regime'].concat(m.l1.map(function (L) { return L.code; })).concat(['Out of scope', 'Total themes'])].concat(m.regimes.map(function (rg) {
      return [rg.def.label].concat(m.l1.map(function (L) { return rg.obs.filter(function (o) { return o.l2.some(function (it) { return it.l1 === L; }); }).length || ''; })).concat([rg.obs.filter(function (o) { return o.missing.length; }).length || '', rg.obs.length]);
    })), widths: [44].concat(m.l1.map(function () { return 7; })).concat([12, 12]) });
    var cname = {};
    m.committees.forEach(function (c) { cname[c.id] = c.name; });
    sh.push({ name: 'Committees', rows: [['Committee', 'Reports to', 'Purpose', 'Covers']].concat(m.committees.map(function (c) { return [c.name, c.parent ? cname[c.parent] : '', c.purpose + (c.note ? ' ' + c.note + '.' : ''), c.covers.indexOf('*') >= 0 ? 'All risk categories' : c.covers.map(function (k) { return RISK[k] ? RISK[k].label : k; }).join(', ')]; })), widths: [40, 30, 80, 30] });
    sh.push({ name: 'Roles', rows: [['Role', 'Line', 'What they do', 'Basis']].concat(m.roles.map(function (r) { return [r.label, r.line, r.why, r.req || 'Common practice']; })), widths: [40, 22, 70, 60] });
    sh.push({ name: 'RACI', rows: [['Activity'].concat(D.raci.cols)].concat(D.raci.rows), widths: [40, 20, 20, 22, 24, 20] });
    if (m.types) sh.push({ name: 'Entity matrix', rows: [['Regime'].concat(m.ents.map(function (x) { return x.def.label + (x.n > 1 ? ' (' + x.n + ')' : ''); })).concat(['Why selected'])].concat(m.regimes.map(function (rg) { return [rg.def.label].concat(m.ents.map(function (x) { return x.def.regimes.indexOf(rg.id) >= 0 ? 'Usually applies' : ''; })).concat([rg.why ? rg.why.join(', ') : 'Added by you']); })), widths: [44].concat(m.ents.map(function () { return 18; })).concat([40]) });
    var lbl = {};
    m.nodes.forEach(function (x) { lbl[x.id] = x.label; });
    sh.push({ name: 'Data model', rows: [['Record type', 'Group', 'Description', 'Key fields', 'Links to']].concat(m.nodes.map(function (x) {
      return [x.label, M.groups[x.group], x.desc, (D.fields[x.id] || []).join('; '), m.edges.filter(function (e) { return e.a === x.id; }).map(function (e) { return e.label + ' ' + lc(lbl[e.b]); }).join('; ')];
    })), widths: [26, 22, 56, 60, 56] });
    sh.push({ name: 'Reporting', rows: [['Report', 'Audience', 'Frequency', 'Contents', 'Data sources']].concat(m.reports), widths: [32, 32, 18, 70, 40] });
    sh.push({ name: 'Calendar', rows: [['When', 'Activity', 'Source']].concat(m.calendar.map(function (c) { return [c.when, c.what, c.src]; })), widths: [22, 80, 18] });
    sh.push({ name: 'Maturity', rows: [['Component', 'Current level', 'Current description', 'Target level', 'Target description', 'Steps to reach the target']].concat(m.maturity.map(function (x) { return [x.c.label, x.cur, x.c.levels[x.cur - 1], x.tgt, x.c.levels[x.tgt - 1], x.steps.join(' Then: ') || 'At or above target']; })), widths: [22, 10, 44, 10, 44, 70] });
    sh.push({ name: 'Roadmap', rows: [['Phase', 'Starts (month)', 'Ends (month)', 'Weeks', 'What happens']].concat(m.roadmap.map(function (p) { return [p.name, Math.floor(p.start / 4.345) + 1, p.dur ? Math.max(Math.floor(p.start / 4.345) + 1, Math.ceil((p.start + p.dur) / 4.345)) : 'Ongoing', p.dur || 'Ongoing', p.what]; })), widths: [28, 12, 12, 9, 90] });
    sh.push({ name: 'Checks', rows: [['Type', 'Finding', 'Where to change it']].concat(m.checks.map(function (c) { return [{ warn: 'Needs attention', info: 'Worth checking', ok: 'Done for you' }[c.sev], c.text, c.step !== null ? 'Step ' + (c.step + 1) : '']; })), widths: [16, 100, 16] });
    return window.XLSXLite.workbook(sh, { title: title, creator: 'RiskLens Australia GRC model builder' });
  }

  function csv(m) {
    function q(v) { v = v === undefined || v === null ? '' : String(v); if (/^[=+\-@]/.test(v)) v = '\'' + v; return '"' + v.replace(/"/g, '""') + '"'; }
    var rows = [['Risk ID', 'Level 1', 'Level 2 code', 'Level 2', 'Risk event', 'Causes', 'Impacts', 'Control ID', 'Control objective', 'Control', 'Type', 'Frequency', 'Automation', 'Key control', 'KRIs', 'Linked obligations']];
    m.l2.forEach(function (it) {
      it.risks.forEach(function (r) {
        it.controls.forEach(function (c) {
          rows.push([r.id, it.l1.def.label, it.code, it.x.label, r.event, r.causes, r.impacts, c.id, c.objective, c.desc, TYPE[c.type], c.freq, c.auto, c.key ? 'Yes' : 'No', it.kris.map(function (k) { return k.id + ' ' + k.metric; }).join('; '), it.obs.map(function (o) { return o.id; }).join('; ')]);
        });
      });
    });
    return '﻿' + rows.map(function (r) { return r.map(q).join(','); }).join('\r\n');
  }

  function exportable(m) {
    return {
      source: 'RiskLens Australia GRC model builder: an illustrative, educational model. Not advice.',
      generated: today(),
      profile: profileRows(m).reduce(function (o, r) { o[r[0]] = r[1]; return o; }, {}),
      documents: m.docs.map(function (d) { return { id: d.id, name: d.name, level: d.level, approver: d.approver, appliesAt: scopeLabel(m, d), promptedBy: d.src.map(function (p) { return p[0]; }) }; }),
      enterpriseRisks: m.enterprise,
      taxonomy: m.l1.map(function (L) {
        return { code: L.code, category: L.def.label, material: L.mat, definition: L.def.def, owner: L.def.owner, illustrativeAppetite: L.def.stance, metrics: L.def.metrics,
          level2: L.l2.map(function (it) {
            return { code: it.code, name: it.x.label, definition: it.x.def, inScopeBecause: it.why,
              risks: it.risks.map(function (r) { return { id: r.id, event: r.event, causes: r.causes, impacts: r.impacts }; }),
              controls: it.controls.map(function (c) { return { id: c.id, objective: c.objective, control: c.desc, type: TYPE[c.type], frequency: c.freq, automation: c.auto, key: c.key, obligations: c.obs.map(function (o) { return o.id; }) }; }),
              kris: it.kris.map(function (k) { return { id: k.id, metric: k.metric }; }),
              obligations: it.obs.map(function (o) { return o.id; }) };
          }) };
      }),
      obligations: m.obligations.map(function (o) { return { id: o.id, regime: o.rg.def.label, regulator: o.rg.def.reg, obligation: o.title, controlObjective: o.objective, evidence: o.evidence, risks: o.l2.map(function (it) { return it.code; }), controls: o.controls.map(function (c) { return c.id; }), notInScope: o.missing.map(function (x) { return x.label; }) }; }),
      notificationClocks: m.clocks.map(function (c) { return { event: c.event, timeframe: c.time, notify: c.to, regime: c.rg.def.label }; }),
      committees: m.committees.map(function (c) { return { id: c.id, name: c.name, reportsTo: c.parent, purpose: c.purpose }; }),
      roles: m.roles.map(function (r) { return { role: r.label, line: r.line, purpose: r.why, basis: r.req || 'Common practice' }; }),
      raci: D.raci,
      dataModel: { records: m.nodes.map(function (x) { return { id: x.id, name: x.label, fields: D.fields[x.id] || [] }; }), relationships: m.edges },
      reports: m.reports.map(function (r) { return { report: r[0], audience: r[1], frequency: r[2], contents: r[3], data: r[4] }; }),
      calendar: m.calendar,
      maturity: m.maturity.map(function (x) { return { component: x.c.label, current: x.cur, target: x.tgt, nextSteps: x.steps }; }),
      roadmap: m.roadmap.map(function (p) { return { phase: p.name, startWeek: p.start, weeks: p.dur || 'ongoing', activities: p.what }; }),
      quickWins: m.wins,
      checks: m.checks.map(function (c) { return { type: c.sev, finding: c.text }; })
    };
  }

  function download(blob, name) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name; a.hidden = true;
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }

  // ------------------------------------------------------------------ the wizard
  var STEPS = ['Organisation', 'Operating model', 'Regimes', 'Risks', 'Maturity'];
  function opt(name, val, title, note, tags) {
    var id = name + '-' + val;
    return '<div class="gb-opt"><input type="checkbox" id="' + id + '" name="' + name + '" value="' + val + '"' + (note !== null ? ' aria-describedby="' + id + '-d"' : '') + '><label for="' + id + '">' + esc(title) + (tags || '') + '</label>' + (note !== null ? '<span class="gb-note" id="' + id + '-d">' + note + '</span>' : '') + '</div>';
  }
  function wizardHtml() {
    var h = '<h2 class="gb-h">Build your GRC model</h2><p class="gb-lead">Five short steps. Every answer has a sensible default, so you can build the model at any point and refine it as you go.</p>';
    h += '<div class="gb-presets"><span class="gb-pre-l" id="gb-pre-l">Or start from an example:</span><ul aria-labelledby="gb-pre-l">' + D.presets.map(function (p) { return '<li><button type="button" class="gb-pre" data-preset="' + p.id + '">' + esc(p.label) + '</button></li>'; }).join('') + '</ul><button type="button" class="gb-linkbtn" data-nav="reset">Start again</button></div>';
    h += '<ol class="gb-steps">' + STEPS.map(function (st, i) { return '<li><button type="button" class="gb-stepbtn" data-step="' + i + '"><span class="gb-stepn" aria-hidden="true">' + (i + 1) + '</span><span class="gb-stepl"><span class="visually-hidden">Step ' + (i + 1) + ': </span>' + st + '</span></button></li>'; }).join('') + '</ol>';
    h += '<form class="gb-form" novalidate onsubmit="return false">';
    // step 1
    h += '<section class="gb-sp" data-panel="0" aria-labelledby="gb-st0"><h3 id="gb-st0" tabindex="-1">1. Your organisation</h3>';
    h += '<p class="gb-field1"><label for="gb-name">Organisation name <span class="gb-note">(optional; used in the heading and file names)</span></label><input type="text" id="gb-name" maxlength="80" autocomplete="organization" placeholder="e.g. Example Group"></p>';
    h += '<fieldset class="gb-fs"><legend>Which entity types are in the organisation, and how many of each?</legend><p class="gb-help">Count each legal entity that holds a licence or registration. A single company is one entity.</p><div class="gb-grid gb-ents">' + D.entities.map(function (e) {
      return '<div class="gb-ent"><label for="gb-e-' + e.id + '"><span class="gb-t">' + esc(e.label) + '</span>' + (e.long !== e.label ? '<span class="gb-note">' + esc(e.long) + '</span>' : '') + '</label><input type="number" id="gb-e-' + e.id + '" data-ent="' + e.id + '" min="0" max="50" step="1" inputmode="numeric" value="0"></div>';
    }).join('') + '</div><p class="gb-help gb-sum" id="gb-ent-sum" aria-live="polite"></p></fieldset>';
    h += '<fieldset class="gb-fs"><legend>How large and complex is it?</legend><div class="gb-cards">' + SCALE_ORDER.map(function (k) { return '<label class="gb-card"><input type="radio" name="gb-scale" value="' + k + '"><span class="gb-t">' + SCALES[k][0] + '</span><span class="gb-note">' + SCALES[k][1] + '</span></label>'; }).join('') + '</div></fieldset>';
    h += '<div id="gb-sfi-wrap" class="gb-fs" hidden>' + opt('gb-sfi', 'yes', 'It is a significant financial institution (SFI)', 'An entity is an SFI if its total assets exceed $30 billion (bank, since 1 July 2026), $10 billion (general insurer or life company), $3 billion (private health insurer) or $30 billion (RSE licensee), or if APRA decides it is one. Some APRA requirements, such as parts of CPS 511 and CPS 190, apply in full only to SFIs. See the <a href="/standards/cps-230.html#sfi">SFI thresholds</a>.') + '</div>';
    h += '<fieldset class="gb-fs"><legend>Operations outside Australia</legend><div class="gb-grid gb-grid-sm">' + D.jurisdictions.map(function (j) { return opt('gb-juris', j.id, j.label, null); }).join('') + '</div></fieldset></section>';
    // step 2
    h += '<section class="gb-sp" data-panel="1" aria-labelledby="gb-st1" hidden><h3 id="gb-st1" tabindex="-1">2. Operating model and priorities</h3>';
    h += '<fieldset class="gb-fs"><legend>Which of these describe the organisation?</legend><p class="gb-help">Each one adds Level 2 risks, documents or enterprise risks. <span class="gb-tag">Usual</span> marks features that are common for your entity types.</p><div class="gb-grid">' + D.features.map(function (f) { return opt('gb-feat', f.id, f.label, '<span data-fwhy="' + f.id + '"></span>', '<span class="gb-tag" data-ftag="' + f.id + '" hidden>Usual</span>'); }).join('') + '</div></fieldset>';
    h += '<fieldset class="gb-fs"><legend>What are the biggest GRC challenges right now?</legend><p class="gb-help">Your answers shape the quick wins and the order of the roadmap.</p><div class="gb-grid">' + D.pains.map(function (p) { return opt('gb-pain', p.id, p.label, null); }).join('') + '</div></fieldset></section>';
    // step 3
    h += '<section class="gb-sp" data-panel="2" aria-labelledby="gb-st2" hidden><h3 id="gb-st2" tabindex="-1">3. Regulatory regimes</h3>';
    h += '<p class="gb-help">Regimes marked <span class="gb-tag">Suggested</span> usually apply to the entity types and features you chose. Whether each one applies depends on licences, products, size and thresholds, so check each one.</p>';
    h += '<p class="gb-mode" id="gb-reg-mode"></p><p class="gb-inline"><button type="button" class="secondary gb-small" data-act="reg-suggest">Use suggested regimes</button> <button type="button" class="secondary gb-small" data-act="reg-none">Clear all</button></p>';
    REG_GROUPS.forEach(function (gr) {
      h += '<fieldset class="gb-fs"><legend>' + esc(gr[0]) + '</legend><div class="gb-grid gb-grid-wide">' + gr[1].map(function (k) { var r = REGS[k]; return opt('gb-reg', k, r.label, '<span class="gb-reg">' + esc(r.reg) + '.</span> ' + esc(r.applies) + '<span class="gb-why" data-rwhy="' + k + '"></span>', '<span class="gb-tag" data-rtag="' + k + '" hidden>Suggested</span>'); }).join('') + '</div></fieldset>';
    });
    h += '</section>';
    // step 4
    h += '<section class="gb-sp" data-panel="3" aria-labelledby="gb-st3" hidden><h3 id="gb-st3" tabindex="-1">4. Risk categories (Level 1)</h3>';
    h += '<p class="gb-help">Choose the Level 1 categories for the taxonomy and mark which are material. Material categories get a board-approved appetite statement and metrics; the others are monitored by management. Level 2 sub-types are added automatically from your entity types, features and regimes.</p>';
    h += '<p class="gb-mode" id="gb-risk-mode"></p><p class="gb-inline"><button type="button" class="secondary gb-small" data-act="risk-suggest">Use suggested categories</button></p><div class="gb-risks">';
    D.risks.forEach(function (r) {
      h += '<div class="gb-riskrow">' + opt('gb-inc', r.id, r.prefix + ' · ' + r.label, esc(r.def) + '<span class="gb-why" data-kwhy="' + r.id + '"></span>', '<span class="gb-tag" data-ktag="' + r.id + '" hidden>Suggested</span>' + (r.cps220 ? '<span class="gb-tag gb-tag-alt" data-k220="' + r.id + '" hidden>Named in CPS 220</span>' : '')) + '<div class="gb-matopt"><input type="checkbox" id="gb-mat-' + r.id + '" name="gb-mat" value="' + r.id + '"><label for="gb-mat-' + r.id + '">Material<span class="visually-hidden">: ' + esc(r.label) + '</span></label></div></div>';
    });
    h += '</div></section>';
    // step 5
    h += '<section class="gb-sp" data-panel="4" aria-labelledby="gb-st4" hidden><h3 id="gb-st4" tabindex="-1">5. Current GRC maturity</h3><p class="gb-help">Rate where the organisation is today on each component. The roadmap closes the gap to the target level.</p><div class="gb-mats">';
    D.maturity.forEach(function (c) {
      h += '<div class="gb-matrow"><label for="gb-m-' + c.id + '"><span class="gb-t">' + esc(c.label) + '</span><span class="gb-note">' + esc(c.desc) + '</span></label><select id="gb-m-' + c.id + '" data-mat="' + c.id + '">' + c.levels.map(function (l, i) { return '<option value="' + (i + 1) + '">' + (i + 1) + '. ' + esc(l) + '</option>'; }).join('') + '</select></div>';
    });
    h += '<div class="gb-matrow"><label for="gb-target"><span class="gb-t">Target level</span><span class="gb-note">Where the organisation wants to be in two to three years</span></label><select id="gb-target"><option value="0">Automatic, based on size and structure</option><option value="3">3. Integrated</option><option value="4">4. Managed</option><option value="5">5. Optimised</option></select></div>';
    h += '</div></section></form>';
    h += '<div class="gb-navbar"><div class="gb-navbtns"><button type="button" class="secondary" data-nav="back">Back</button><button type="button" class="secondary" data-nav="next">Next</button><button type="button" class="gb-build" data-nav="build">Build my GRC model</button></div><p class="gb-live" id="gb-live"></p></div>';
    h += '<p class="gb-status" id="gb-status" role="status" aria-live="polite"></p>';
    return h;
  }

  function writeForm(s) {
    $('#gb-name').value = s.name;
    D.entities.forEach(function (e) { $('#gb-e-' + e.id).value = s.entities[e.id] || 0; });
    $$('input[name="gb-scale"]').forEach(function (r) { r.checked = r.value === s.scale; });
    $('#gb-sfi-yes').checked = s.sfi;
    $$('input[name="gb-juris"]').forEach(function (c) { c.checked = s.juris.indexOf(c.value) >= 0; });
    $$('input[name="gb-feat"]').forEach(function (c) { c.checked = s.features.indexOf(c.value) >= 0; });
    $$('input[name="gb-pain"]').forEach(function (c) { c.checked = s.pains.indexOf(c.value) >= 0; });
    D.maturity.forEach(function (c) { $('#gb-m-' + c.id).value = String(s.maturity[c.id]); });
    $('#gb-target').value = String(s.target);
  }

  function sync(m) {
    var s = m.s, g = m.g;
    $('#gb-sfi-wrap').hidden = !m.apra;
    $('#gb-ent-sum').textContent = m.total ? n(m.total, 'entity', 'entities') + ' of ' + n(m.types, 'type') + (m.group ? ': the model treats this as a group.' : '.') : 'No entity types chosen yet.';
    D.features.forEach(function (f) { var w = has(g.feat, f.id) ? g.feat[f.id] : null; $('[data-ftag="' + f.id + '"]').hidden = !w; $('[data-fwhy="' + f.id + '"]').textContent = w ? 'Usual for ' + and(w) + '.' : ''; });
    REG_IDS.forEach(function (k) {
      var w = has(g.reg, k) ? g.reg[k] : null;
      $('#gb-reg-' + k).checked = !!m.reg[k];
      $('[data-rtag="' + k + '"]').hidden = !w;
      $('[data-rwhy="' + k + '"]').textContent = w ? ' Suggested for ' + and(w) + '.' : '';
    });
    $('#gb-reg-mode').textContent = s.regimes ? 'You have customised this list, so it no longer changes when you edit steps 1 and 2. New suggestions are marked but not ticked.' : 'Following the suggestions: this list updates as you change steps 1 and 2.';
    D.risks.forEach(function (r) {
      var sel = m.sel[r.id], mat = $('#gb-mat-' + r.id), L = m.l1by[r.id], t220 = $('[data-k220="' + r.id + '"]');
      $('#gb-inc-' + r.id).checked = sel.inc;
      mat.checked = sel.mat; mat.disabled = !sel.inc;
      $('[data-ktag="' + r.id + '"]').hidden = !has(g.risk, r.id);
      if (t220) t220.hidden = !m.apra;
      $('[data-kwhy="' + r.id + '"]').textContent = L ? ' ' + n(L.l2.length, 'Level 2 sub-type') + ' in scope.' : '';
    });
    $('#gb-risk-mode').textContent = s.risks ? 'You have customised this list, so it no longer changes when you edit steps 1 and 2.' : 'Following the suggestions for your entity types and features.';
    var nmat = m.l1.filter(function (L) { return L.mat; }).length;
    $('#gb-live').textContent = n(m.total, 'entity', 'entities') + ' · ' + n(m.regimes.length, 'regime') + ' · ' + n(m.l1.length, 'risk category', 'risk categories') + ' (' + nmat + ' material) · ' + n(m.l2.length, 'sub-type') + ' · ' + n(m.controls.length, 'control');
  }

  // ------------------------------------------------------------------ output
  var tab = 'overview';
  function render(m) {
    var nw = m.checks.filter(function (c) { return c.sev === 'warn'; }).length;
    var sub = [m.ents.length ? m.ents.map(function (x) { return (x.n > 1 ? x.n + ' × ' : '') + x.def.label; }).join(', ') : 'No entity types chosen', SCALES[m.s.scale][0].toLowerCase() + ' scale', n(m.regimes.length, 'regime'), 'built ' + today()];
    var h = '<div class="gb-head"><p class="gb-eyebrow">Illustrative GRC model</p><h2 id="gb-title" tabindex="-1">' + esc(m.s.name || 'Your organisation') + '</h2><p class="gb-sub">' + esc(sub.join(' · ')) + '</p></div>';
    h += '<div class="gb-tabs" role="tablist" aria-label="Parts of your GRC model">' + TABS.map(function (t) {
      var on = t[0] === tab;
      return '<button type="button" role="tab" id="gb-tab-' + t[0] + '" aria-controls="gb-p-' + t[0] + '" aria-selected="' + on + '" tabindex="' + (on ? 0 : -1) + '">' + t[1] + (t[0] === 'checks' && nw ? ' <span class="gb-count">' + nw + '</span>' : '') + '</button>';
    }).join('') + '</div>';
    TABS.forEach(function (t) { h += '<section class="gb-panel" id="gb-p-' + t[0] + '" role="tabpanel" aria-labelledby="gb-tab-' + t[0] + '" tabindex="0"' + (t[0] === tab ? '' : ' hidden') + '><h3 class="gb-ph">' + t[1] + '</h3>' + t[2](m) + '</section>'; });
    h += '<p class="gb-disclaimer">An illustrative, educational model generated from your answers. It is not advice, and it is not a complete list of the obligations that apply to your organisation. Check the official legislation and regulator guidance.</p>';
    out.innerHTML = h;
    var hd = document.querySelector('.site-header');
    out.style.setProperty('--gb-top', (hd ? hd.offsetHeight : 0) + 'px');
  }
  function selectTab(id, opts) {
    opts = opts || {};
    if (!$('#gb-tab-' + id, out)) return;
    tab = id;
    TABS.forEach(function (t) { var b = $('#gb-tab-' + t[0], out), on = t[0] === id; b.setAttribute('aria-selected', on ? 'true' : 'false'); b.tabIndex = on ? 0 : -1; $('#gb-p-' + t[0], out).hidden = !on; });
    var btn = $('#gb-tab-' + id, out), list = btn.parentNode;
    if (btn.offsetLeft < list.scrollLeft || btn.offsetLeft + btn.offsetWidth > list.scrollLeft + list.clientWidth) list.scrollLeft = Math.max(0, btn.offsetLeft - 24);
    if (opts.focusTab) btn.focus();
    if (opts.scroll) { var p = $('#gb-p-' + id, out); p.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); p.focus({ preventScroll: true }); }
  }

  // ------------------------------------------------------------------ wiring
  root.innerHTML = wizardHtml();
  var state, shown = false, step = 0, current, timer = null;
  function say(msg, where) { var el = where === 'out' ? $('#gb-xstatus', out) : $('#gb-status'); if (!el) el = $('#gb-status'); el.textContent = ''; setTimeout(function () { el.textContent = msg; }, 30); }
  function save() { try { var o = JSON.parse(JSON.stringify(state)); o.shown = shown; localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  function update() { current = build(state); sync(current); save(); if (shown) render(current); }
  function changed() { clearTimeout(timer); timer = setTimeout(update, 150); }
  function checkedVals(name) { return $$('input[name="' + name + '"]').filter(function (c) { return c.checked; }).map(function (c) { return c.value; }); }
  function go(i, focus) {
    step = Math.max(0, Math.min(STEPS.length - 1, i));
    $$('.gb-sp').forEach(function (p) { p.hidden = +p.getAttribute('data-panel') !== step; });
    $$('.gb-stepbtn').forEach(function (b) { var k = +b.getAttribute('data-step'), on = k === step; b.classList.toggle('on', on); b.classList.toggle('done', k < step); if (on) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
    $('[data-nav="back"]').hidden = step === 0;
    var nx = $('[data-nav="next"]');
    nx.hidden = step === STEPS.length - 1;
    nx.textContent = step < STEPS.length - 1 ? 'Next: ' + STEPS[step + 1] : 'Next';
    if (focus) {
      $('#gb-st' + step).focus({ preventScroll: true });
      if (root.getBoundingClientRect().top < 0) root.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
  }
  function buildNow(focus) {
    clearTimeout(timer);
    shown = true; current = build(state); sync(current); save(); render(current); out.hidden = false;
    if (focus) { $('#gb-title', out).focus({ preventScroll: true }); out.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
  }

  root.addEventListener('input', onInput);
  root.addEventListener('change', onInput);
  function onInput(e) {
    var t = e.target, name = t.name || '';
    if (t.id === 'gb-name') state.name = t.value.slice(0, 80);
    else if (t.getAttribute('data-ent')) {
      var v = parseInt(t.value, 10), k = t.getAttribute('data-ent');
      v = isNaN(v) ? 0 : Math.max(0, Math.min(50, v));
      if (v) state.entities[k] = v; else delete state.entities[k];
    }
    else if (name === 'gb-scale') state.scale = t.value;
    else if (name === 'gb-sfi') state.sfi = t.checked;
    else if (name === 'gb-juris') state.juris = checkedVals('gb-juris');
    else if (name === 'gb-feat') state.features = checkedVals('gb-feat');
    else if (name === 'gb-pain') state.pains = checkedVals('gb-pain');
    else if (name === 'gb-reg') state.regimes = checkedVals('gb-reg');
    else if (name === 'gb-inc' || name === 'gb-mat') {
      state.risks = {};
      D.risks.forEach(function (r) { var i = $('#gb-inc-' + r.id).checked; state.risks[r.id] = { inc: i, mat: i && $('#gb-mat-' + r.id).checked }; });
      if (name === 'gb-inc' && t.checked && e.type === 'change') state.risks[t.value].mat = defaultMaterial(RISK[t.value], state, current.reg);
    }
    else if (t.getAttribute('data-mat')) state.maturity[t.getAttribute('data-mat')] = parseInt(t.value, 10) || 1;
    else if (t.id === 'gb-target') state.target = parseInt(t.value, 10) || 0;
    else return;
    changed();
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('button') : null;
    if (!b || !root.contains(b)) return;
    var nav = b.getAttribute('data-nav'), act = b.getAttribute('data-act');
    if (b.getAttribute('data-preset')) {
      var p = D.presets.filter(function (x) { return x.id === b.getAttribute('data-preset'); })[0];
      if (!p) return;
      state = clean(JSON.parse(JSON.stringify(p.state)));
      writeForm(state); go(0, false); tab = 'overview'; buildNow(true);
      say('Loaded the example: ' + p.label + '. Change any step and the model updates.');
    }
    else if (b.hasAttribute('data-step')) go(+b.getAttribute('data-step'), true);
    else if (nav === 'back') go(step - 1, true);
    else if (nav === 'next') go(step + 1, true);
    else if (nav === 'build') { buildNow(true); say('Your model is ready below. It updates as you change your answers.'); }
    else if (nav === 'reset') {
      state = blank(); shown = false; tab = 'overview';
      try { localStorage.removeItem(KEY); } catch (err) {}
      writeForm(state); out.hidden = true; out.innerHTML = ''; update(); go(0, true);
      say('Started again with the default answers.');
    }
    else if (act === 'reg-suggest') { state.regimes = null; update(); say('Regimes reset to the suggestions.'); }
    else if (act === 'reg-none') { state.regimes = []; update(); say('All regimes cleared.'); }
    else if (act === 'risk-suggest') { state.risks = null; update(); say('Risk categories reset to the suggestions.'); }
  });

  out.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('button') : null;
    if (!b || !out.contains(b)) return;
    if (b.getAttribute('role') === 'tab') selectTab(b.id.slice(7));
    else if (b.getAttribute('data-goto')) selectTab(b.getAttribute('data-goto'), { scroll: true });
    else if (b.hasAttribute('data-fix')) go(+b.getAttribute('data-fix'), true);
    else if (b.getAttribute('data-expand')) $$('details.' + b.getAttribute('data-expand'), b.closest('.gb-panel')).forEach(function (d) { d.open = true; });
    else if (b.getAttribute('data-collapse')) $$('details.' + b.getAttribute('data-collapse'), b.closest('.gb-panel')).forEach(function (d) { d.open = false; });
    else if (b.getAttribute('data-x')) exportAs(b.getAttribute('data-x'));
  });
  out.addEventListener('keydown', function (e) {
    if (!e.target.getAttribute || e.target.getAttribute('role') !== 'tab') return;
    var idsT = TABS.map(function (t) { return t[0]; }), i = idsT.indexOf(tab);
    if (e.key === 'ArrowRight') i = (i + 1) % idsT.length;
    else if (e.key === 'ArrowLeft') i = (i - 1 + idsT.length) % idsT.length;
    else if (e.key === 'Home') i = 0;
    else if (e.key === 'End') i = idsT.length - 1;
    else return;
    e.preventDefault();
    selectTab(idsT[i], { focusTab: true });
  });

  function exportAs(kind) {
    clearTimeout(timer);
    current = build(state);
    var base = slug(state.name) || 'grc-model';
    try {
      if (kind === 'xlsx') { download(xlsx(current), base + '.xlsx'); say('Excel workbook created.', 'out'); }
      else if (kind === 'csv') { download(new Blob([csv(current)], { type: 'text/csv;charset=utf-8' }), base + '-risk-control-matrix.csv'); say('CSV file created.', 'out'); }
      else if (kind === 'json') { download(new Blob([JSON.stringify(exportable(current), null, 2)], { type: 'application/json' }), base + '.json'); say('JSON file created.', 'out'); }
      else if (kind === 'print') { document.body.classList.add('gb-printing'); window.print(); }
      else if (kind === 'link') copyLink();
    } catch (err) { say('Sorry, that export did not work in this browser.', 'out'); }
  }
  function copyLink() {
    var url = toLink(state), box = $('#gb-link', out);
    if (box) { box.value = url; box.parentNode.hidden = false; }
    function fallback() { if (box) { box.focus(); box.select(); } say('Select the link in the box and copy it.', 'out'); }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(url).then(function () { say('Link copied. Anyone with it can see this model, including the name you typed.', 'out'); }, fallback);
    else fallback();
  }

  // print every tab, with sections expanded
  var reopened = [];
  window.addEventListener('beforeprint', function () { reopened = $$('details:not([open])', out); reopened.forEach(function (d) { d.open = true; }); });
  window.addEventListener('afterprint', function () { reopened.forEach(function (d) { d.open = false; }); reopened = []; document.body.classList.remove('gb-printing'); });

  // ------------------------------------------------------------------ start
  var linked = fromLink();
  if (linked) {
    state = linked; shown = true;
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
  } else {
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}
    state = clean(saved); shown = !!(saved && saved.shown);
  }
  writeForm(state); go(0, false);
  current = build(state); sync(current); save();
  if (shown) { render(current); out.hidden = false; }
  if (linked) say('Loaded a shared model. Your changes are saved on this device only.');
})();
