// Illustrative service provider risk-tiering tool (third-party risk page).
(function () {
  var w = document.getElementById('tiering');
  if (!w) return;
  var out = w.querySelector('.result');
  var detail = w.querySelector('.tier-detail');

  var TIERS = {
    1: { name: 'Tier 1: potentially material (CPS 230)', cls: 'rating-extreme',
      dd: 'Full due diligence before signing: financial health, operational resilience and BCP, information security, subcontractors, exit options. Board or executive approval.',
      contract: 'Formal legally binding agreement covering the matters CPS 230 requires (services and service levels, rights and responsibilities, subcontractor notification and liability, compliance, force majeure, termination and more). Check if APRA must be notified.',
      monitor: 'Monthly performance reporting, independent assurance reports, regular relationship and risk reviews, included in BCP testing and the material service provider register.' },
    2: { name: 'Tier 2: high risk', cls: 'rating-high',
      dd: 'Targeted due diligence focused on the main risks identified (e.g. security questionnaire, financial check).',
      contract: 'Standard contract with strengthened clauses on data, security, incident notification and audit rights.',
      monitor: 'Quarterly performance review and annual risk reassessment.' },
    3: { name: 'Tier 3: moderate risk', cls: 'rating-medium',
      dd: 'Basic checks: legal entity, references, insurance, conflicts, sanctions screening.',
      contract: 'Standard terms with key protections.',
      monitor: 'Annual review of performance and whether the tier is still right.' },
    4: { name: 'Tier 4: low risk', cls: 'rating-low',
      dd: 'Minimal checks through normal procurement.',
      contract: 'Standard purchase terms.',
      monitor: 'Review at renewal.' }
  };

  function update() {
    var v = function (name) { var el = w.querySelector('input[name="' + name + '"]:checked'); return el ? el.value : 'no'; };
    var critical = v('t-critical') === 'yes';
    var score = 0;
    ['t-data', 't-substitute', 't-offshore', 't-customer', 't-spend'].forEach(function (n) { if (v(n) === 'yes') score++; });
    var tier = critical ? 1 : score >= 3 ? 2 : score >= 1 ? 3 : 4;
    var t = TIERS[tier];
    out.textContent = t.name;
    out.className = 'result ' + t.cls;
    detail.innerHTML = '<p><strong>Due diligence:</strong> ' + t.dd + '</p><p><strong>Contract:</strong> ' + t.contract + '</p><p><strong>Monitoring:</strong> ' + t.monitor + '</p>' +
      (critical ? '' : '<p class="small">Score: ' + score + ' of 5 risk factors.</p>');
  }
  w.addEventListener('change', update);
  update();
})();
