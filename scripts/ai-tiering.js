// Illustrative AI use case risk tiering: tick characteristics to see a suggested tier and controls.
(function () {
  var w = document.getElementById('ai-tier');
  if (!w) return;
  var out = w.querySelector('.result'), list = w.querySelector('.ai-controls');
  var CONTROLS = {
    Low: ['Record in the AI inventory with an owner', 'Acceptable use rules for staff', 'Periodic check that the use hasn\'t changed'],
    Medium: ['Everything for Low', 'Documented risk assessment before go-live', 'Testing for accuracy and reliability', 'Human review of outputs before they are relied on', 'Monitoring and a way to report problems'],
    High: ['Everything for Medium', 'Approval by a senior accountable executive or AI committee', 'Independent validation, including testing for bias and unfair outcomes', 'Privacy impact assessment', 'Transparency to affected customers and a way to challenge decisions', 'Ongoing performance and drift monitoring with thresholds', 'Incident response and a plan to switch it off or fall back']
  };
  function update() {
    var boxes = w.querySelectorAll('input[type="checkbox"]'), score = 0, high = false;
    boxes.forEach(function (b) { if (b.checked) { score += +b.dataset.w; if (b.dataset.high) high = true; } });
    var tier = high || score >= 5 ? 'High' : score >= 2 ? 'Medium' : 'Low';
    out.textContent = 'Suggested tier: ' + tier + (high ? ' (a high-impact characteristic is ticked)' : '') + '. Illustrative only: each organisation sets its own tiering criteria.';
    list.innerHTML = CONTROLS[tier].map(function (c) { return '<li>' + c + '</li>'; }).join('');
  }
  w.addEventListener('change', update);
  update();
})();
