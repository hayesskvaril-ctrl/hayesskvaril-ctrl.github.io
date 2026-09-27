// Tolerance level builder: rate harm over time for a critical operation, find where it becomes
// intolerable, and compare the resulting maximum tolerable period with tested recovery capability.
(function () {
  var w = document.getElementById('tol-builder');
  if (!w) return;
  var LEVELS = ['Minor', 'Moderate', 'Severe', 'Intolerable'];
  var HARMS = ['Customers or members', 'Legal and regulatory obligations', 'Financial impact on the entity', 'Reputation and wider system'];
  var PRESETS = {
    super: {
      name: 'Super fund: paying benefits and rollovers',
      times: ['1 business day', '2 business days', '3 business days', '5 business days', '10 business days'],
      grid: [[2, 2, 3, 4, 4], [1, 2, 3, 4, 4], [1, 1, 2, 2, 3], [1, 2, 2, 3, 4]]
    },
    bank: {
      name: 'Bank: retail card and account payments',
      times: ['2 hours', '6 hours', '12 hours', '24 hours', '3 days'],
      grid: [[2, 3, 3, 4, 4], [1, 2, 2, 3, 4], [1, 2, 3, 3, 4], [2, 3, 4, 4, 4]]
    },
    blank: {
      name: 'Blank: your own example',
      times: ['4 hours', '1 day', '2 days', '5 days', '10 days'],
      grid: [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]]
    }
  };
  var preset = w.querySelector('#tol-preset'), body = w.querySelector('tbody'), head = w.querySelector('thead tr');
  var rec = w.querySelector('#tol-recovery'), out = w.querySelector('.result'), current;

  function build() {
    current = PRESETS[preset.value];
    head.innerHTML = '<th scope="col">Harm if disrupted for…</th>' + current.times.map(function (t) { return '<th scope="col">' + t + '</th>'; }).join('');
    body.innerHTML = HARMS.map(function (h, r) {
      return '<tr><th scope="row">' + h + '</th>' + current.times.map(function (t, c) {
        var id = 'tol-' + r + '-' + c;
        return '<td><label class="visually-hidden" for="' + id + '">' + h + ' after ' + t + '</label><select id="' + id + '" data-r="' + r + '" data-c="' + c + '">' +
          LEVELS.map(function (l, i) { return '<option value="' + (i + 1) + '"' + (current.grid[r][c] === i + 1 ? ' selected' : '') + '>' + l + '</option>'; }).join('') +
          '</select></td>';
      }).join('') + '</tr>';
    }).join('');
    rec.innerHTML = current.times.map(function (t, i) { return '<option value="' + i + '"' + (i === 1 ? ' selected' : '') + '>Within ' + t + '</option>'; }).join('') +
      '<option value="' + current.times.length + '">Longer than ' + current.times[current.times.length - 1] + '</option><option value="-1">Not tested</option>';
    update();
  }

  function update() {
    var sel = body.querySelectorAll('select'), first = -1, drivers = [], warn = false;
    var grid = HARMS.map(function () { return []; });
    sel.forEach(function (s) { grid[+s.dataset.r][+s.dataset.c] = +s.value; s.className = 'tol-l' + s.value; });
    grid.forEach(function (row) { for (var c = 1; c < row.length; c++) if (row[c] < row[c - 1]) warn = true; });
    for (var c = 0; c < current.times.length && first < 0; c++) {
      grid.forEach(function (row, r) { if (row[c] === 4) drivers.push(HARMS[r].toLowerCase()); });
      if (drivers.length) first = c;
    }
    var msg;
    if (first < 0) {
      msg = 'Harm never reaches "Intolerable" within ' + current.times[current.times.length - 1] + '. Either this is not a critical operation, or the time points need to extend further.';
    } else if (first === 0) {
      msg = 'Harm is intolerable within the first time point (' + current.times[0] + ', driven by ' + drivers.join(' and ') + '). Add shorter time points: the tolerance level must be shorter than this.';
    } else {
      var tol = current.times[first - 1];
      msg = 'Harm first becomes intolerable at ' + current.times[first] + ', driven by ' + drivers.join(' and ') + '. ' +
        'So the maximum tolerable period of disruption can be no longer than ' + tol + '. Many entities set it tighter to leave headroom. ';
      var r = +rec.value;
      if (r < 0) msg += 'Recovery capability has not been tested, so there is no evidence the entity could stay within tolerance.';
      else if (r <= first - 1) msg += 'Tested recovery (' + rec.options[rec.selectedIndex].text.toLowerCase() + ') fits inside this tolerance.';
      else msg += 'Gap: tested recovery (' + rec.options[rec.selectedIndex].text.toLowerCase() + ') is slower than the tolerance. The usual answer is to improve recovery capability or contingency arrangements, not to loosen the tolerance to fit.';
    }
    if (warn) msg += ' Note: some harms get smaller as the disruption lasts longer. Check this is intended: harm usually builds over time.';
    out.textContent = msg;
  }

  preset.addEventListener('change', build);
  body.addEventListener('change', update);
  rec.addEventListener('change', update);
  build();
})();
