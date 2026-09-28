// Critical operation dependency explorer (mapping critical operations page). Fictional super fund; illustrative.
(function () {
  var w = document.getElementById('ops-map');
  if (!w) return;
  var STEPS = ['Claim received', 'Identity and eligibility checks', 'Benefit calculated', 'Payment approved', 'Payment sent', 'Member told'];
  // resource: label, steps used (index), alternative (null = none), capacity note
  var RES = [
    ['platform', 'Administration platform (service provider)', [1, 2, 3, 4], null],
    ['cloud', 'Cloud hosting region (fourth party)', [1, 2, 3, 4], 'Only if the administrator has a tested failover region'],
    ['idv', 'Identity verification service', [1], 'Manual document checks: about 40 claims a day'],
    ['bank', 'Bank payment file gateway', [4], 'Manual payments through the bank portal: about 150 a day'],
    ['team', 'Benefit payments team (8 people)', [2, 3], 'Cross-trained staff from contributions team: reduced capacity'],
    ['calls', 'Offshore call centre (service provider)', [0, 5], 'In-house overflow team: longer wait times'],
    ['office', 'Head office building', [3], 'Remote approval workflow']
  ];
  var list = w.querySelector('.om-res'), grid = w.querySelector('.om-steps'), out = w.querySelector('.result');
  list.innerHTML = RES.map(function (r) { return '<label><input type="checkbox" value="' + r[0] + '"> ' + r[1] + '</label>'; }).join('');
  function update() {
    var down = Array.prototype.slice.call(list.querySelectorAll('input:checked')).map(function (c) { return c.value; });
    var state = STEPS.map(function () { return { s: 'ok', why: [] }; });
    RES.forEach(function (r) {
      if (down.indexOf(r[0]) < 0) return;
      r[2].forEach(function (i) {
        var sev = r[3] ? 'degraded' : 'failed';
        if (r[0] === 'cloud') sev = 'failed';
        if (sev === 'failed' || state[i].s === 'ok') state[i].s = sev;
        state[i].why.push(r[1] + (r[3] && sev === 'degraded' ? ' (workaround: ' + r[3] + ')' : ''));
      });
    });
    grid.innerHTML = STEPS.map(function (s, i) {
      var st = state[i].s, icon = st === 'ok' ? '✓' : st === 'degraded' ? '!' : '✕';
      return '<li class="om-' + st + '"><span class="om-icon" aria-hidden="true">' + icon + '</span><strong>' + (i + 1) + '. ' + s + '</strong><br><span class="small">' +
        (st === 'ok' ? 'Operating normally' : (st === 'degraded' ? 'Degraded: ' : 'Stopped: ') + state[i].why.join('; ')) + '</span></li>';
    }).join('');
    var failed = state.filter(function (x) { return x.s === 'failed'; }).length, deg = state.filter(function (x) { return x.s === 'degraded'; }).length;
    out.innerHTML = !down.length ? 'Tick one or more resources to simulate losing them.' :
      failed ? '<strong>Critical operation stopped.</strong> ' + failed + ' step' + (failed > 1 ? 's have' : ' has') + ' no workaround. Unless recovery happens within the tolerance level, this would be a disruption outside tolerance, notifiable to APRA. This is a single point of failure to address in the business continuity plan.' :
      '<strong>Operating in degraded mode.</strong> ' + deg + ' step' + (deg > 1 ? 's rely' : ' relies') + ' on workarounds. Check whether their capacity meets the minimum service level in your tolerance, for example for hardship and death benefit payments.';
  }
  list.addEventListener('change', update);
  update();
})();
