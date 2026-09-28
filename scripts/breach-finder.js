// "Which reporting regimes might apply?" finder (compliance/breach-reporting page).
// General guide only: shows regimes worth assessing, not a legal conclusion.
(function () {
  var w = document.getElementById('breach-finder');
  if (!w) return;
  var out = w.querySelector('.bf-results');

  var REGIMES = [
    { id: 'asic', when: function (f) { return f.afsl && f.breach; },
      name: 'ASIC reportable situation', time: 'Within 30 calendar days', link: '#asic' },
    { id: 'nir', when: function (f) { return f.afsl && f.advice && f.breach; },
      name: 'Notify, investigate and remediate affected advice clients', time: 'Notify clients within 30 days', link: '#nir' },
    { id: 'cps230op', when: function (f) { return f.apra && f.opmaterial; },
      name: 'APRA: material operational risk incident (CPS 230)', time: 'No later than 72 hours', link: '#apra' },
    { id: 'cps230crit', when: function (f) { return f.apra && f.critical; },
      name: 'APRA: critical operation disrupted outside tolerance (CPS 230)', time: 'No later than 24 hours', link: '#apra' },
    { id: 'cps234', when: function (f) { return f.apra && f.cyber; },
      name: 'APRA: material information security incident (CPS 234)', time: 'No later than 72 hours', link: '#apra' },
    { id: 'sis', when: function (f) { return f.super && f.breach; },
      name: 'APRA: significant breach by an RSE licensee (SIS Act s 29JA)', time: 'As soon as practicable, and within 30 days', link: '#apra' },
    { id: 'ndb', when: function (f) { return f.personal; },
      name: 'OAIC: possible eligible data breach (Privacy Act)', time: 'Assess within 30 days; notify as soon as practicable', link: '#oaic' },
    { id: 'ddo', when: function (f) { return f.afsl && f.ddo; },
      name: 'ASIC: significant dealing inconsistent with a TMD', time: 'Within 10 business days', link: '#ddo' },
    { id: 'smr', when: function (f) { return f.aml; },
      name: 'AUSTRAC: suspicious matter report', time: '3 business days (24 hours for terrorism financing)', link: '#austrac' },
    { id: 'ransom', when: function (f) { return f.ransom; },
      name: 'ASD: ransomware or cyber extortion payment report', time: 'Within 72 hours of the payment', link: '#cyber' }
  ];

  function update() {
    var f = {};
    w.querySelectorAll('input[type="checkbox"]').forEach(function (c) { f[c.name] = c.checked; });
    var hits = REGIMES.filter(function (r) { return r.when(f); });
    if (!hits.length) {
      out.innerHTML = '<p class="result">Tick the boxes that describe the organisation and the event to see which regimes to assess.</p>';
      return;
    }
    out.innerHTML = '<p class="small">Regimes to assess (' + hits.length + '):</p><ul class="bf-list">' + hits.map(function (r) {
      return '<li><a href="' + r.link + '">' + r.name + '</a><span>' + r.time + '</span></li>';
    }).join('') + '</ul><p class="small">Whether each one actually applies depends on the detailed tests in each regime. Record your assessment either way.</p>';
  }
  w.addEventListener('change', update);
  update();
})();
