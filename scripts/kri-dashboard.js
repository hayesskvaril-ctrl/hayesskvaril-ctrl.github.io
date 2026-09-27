// Illustrative KRI traffic-light dashboard (risk appetite page).
(function () {
  var box = document.querySelector('#kri-demo .kri-list');
  if (!box) return;

  // higherIsWorse: true means values above the trigger are bad.
  var KRIS = [
    { name: 'Unallocated contributions older than 3 business days', unit: '', value: 120, trigger: 200, limit: 500, higherIsWorse: true },
    { name: 'Availability of the member online portal this month', unit: '%', value: 99.7, trigger: 99.5, limit: 99.0, higherIsWorse: false },
    { name: 'Complaints unresolved after 30 days', unit: '', value: 8, trigger: 10, limit: 25, higherIsWorse: true }
  ];

  var ACTIONS = {
    green: 'Within appetite. Continue routine monitoring.',
    amber: 'Trigger reached. Owner reports to the executive with an action plan within 5 business days.',
    red: 'Tolerance breached. Escalate to the CRO now and report to the board risk committee. Decide: fix, formally accept for a set period, or revisit appetite.'
  };

  function status(k, v) {
    if (k.higherIsWorse) return v > k.limit ? 'red' : v > k.trigger ? 'amber' : 'green';
    return v < k.limit ? 'red' : v < k.trigger ? 'amber' : 'green';
  }

  KRIS.forEach(function (k, i) {
    var id = 'kri-' + i;
    var row = document.createElement('div');
    row.className = 'kri-row';
    var dir = k.higherIsWorse ? 'above' : 'below';
    row.innerHTML =
      '<div class="kri-head"><label for="' + id + '">' + k.name + '</label>' +
      '<span class="small">Amber ' + dir + ' ' + k.trigger + k.unit + ' · Red ' + dir + ' ' + k.limit + k.unit + '</span></div>' +
      '<div class="kri-body"><input type="number" step="any" id="' + id + '" value="' + k.value + '">' +
      '<span class="kri-light" aria-hidden="true"></span>' +
      '<p class="kri-status" aria-live="polite"></p></div>';
    box.appendChild(row);

    var input = row.querySelector('input');
    var light = row.querySelector('.kri-light');
    var text = row.querySelector('.kri-status');
    function update() {
      var v = parseFloat(input.value);
      if (isNaN(v)) { text.textContent = 'Enter a number.'; light.className = 'kri-light'; return; }
      var s = status(k, v);
      light.className = 'kri-light ' + s;
      text.innerHTML = '<strong>' + s.charAt(0).toUpperCase() + s.slice(1) + ':</strong> ' + ACTIONS[s];
    }
    input.addEventListener('input', update);
    update();
  });
})();
