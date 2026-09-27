// Risk culture self-reflection radar (culture and conduct page).
// Dimension names follow APRA's Risk Culture 10 Dimensions; ratings are the user's own.
(function () {
  var w = document.getElementById('culture-radar');
  if (!w) return;
  var DIMS = ['Leadership', 'Decision-making and challenge', 'Communication and escalation', 'Risk capabilities',
    'Alignment with purpose and values', 'Risk culture assessment and board oversight', 'Risk appetite and strategy',
    'Risk governance and controls', 'Responsibility and accountability', 'Performance management and incentives'];
  var SHORT = ['Leadership', 'Challenge', 'Escalation', 'Capabilities', 'Purpose', 'Board oversight', 'Appetite', 'Controls', 'Accountability', 'Incentives'];
  var vals = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
  var form = w.querySelector('.cr-inputs');
  form.innerHTML = DIMS.map(function (d, i) {
    return '<div class="cr-row"><label for="cr-' + i + '">' + d + '</label>' +
      '<input type="range" id="cr-' + i + '" min="1" max="5" step="1" value="3" data-i="' + i + '">' +
      '<output for="cr-' + i + '">3</output></div>';
  }).join('');
  var svgHolder = w.querySelector('.cr-chart');
  var out = w.querySelector('.result');
  var NS = 'http://www.w3.org/2000/svg';
  var cx = 210, cy = 200, R = 140;

  function pt(i, r) {
    var a = -Math.PI / 2 + i * 2 * Math.PI / DIMS.length;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  }
  function draw() {
    var s = '<svg viewBox="0 0 420 400" role="img" aria-label="Radar chart of your ratings across the 10 dimensions">';
    for (var ring = 1; ring <= 5; ring++) {
      var pts = DIMS.map(function (_, i) { return pt(i, R * ring / 5).join(','); }).join(' ');
      s += '<polygon points="' + pts + '" fill="none" stroke="#e2e8f0" stroke-width="1"/>';
    }
    DIMS.forEach(function (_, i) {
      var p = pt(i, R), l = pt(i, R + 26);
      s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + p[0] + '" y2="' + p[1] + '" stroke="#e2e8f0"/>';
      s += '<text x="' + l[0] + '" y="' + (l[1] + 4) + '" text-anchor="middle" font-size="12" fill="#4a5568">' + SHORT[i] + '</text>';
    });
    var poly = vals.map(function (v, i) { return pt(i, R * v / 5).join(','); }).join(' ');
    s += '<polygon points="' + poly + '" fill="rgba(37,99,235,0.18)" stroke="#2563eb" stroke-width="2.5"/>';
    vals.forEach(function (v, i) { var p = pt(i, R * v / 5); s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4" fill="#1d4ed8"/>'; });
    s += '</svg>';
    svgHolder.innerHTML = s;
    var min = Math.min.apply(null, vals);
    var weakest = DIMS.filter(function (_, i) { return vals[i] === min; });
    var max = Math.max.apply(null, vals);
    if (min === max) { out.textContent = 'All dimensions are rated ' + min + '. Move the sliders to reflect where you think your strengths and gaps are.'; return; }
    out.textContent = min >= 4 ? 'Ratings are strong across the board. Test them: what evidence would a sceptical regulator want to see?'
      : 'Lowest-rated: ' + weakest.join(', ') + '. These are good places to gather evidence and focus improvement.';
  }
  form.addEventListener('input', function (e) {
    var i = +e.target.getAttribute('data-i');
    vals[i] = +e.target.value;
    e.target.nextElementSibling.textContent = e.target.value;
    draw();
  });
  draw();
})();
