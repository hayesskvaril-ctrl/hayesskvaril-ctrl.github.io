// Board skills matrix: tick which directors bring each skill; see coverage and gaps.
(function () {
  var w = document.getElementById('skills-matrix');
  if (!w) return;
  var SKILLS = ['Financial services industry', 'Risk management', 'Accounting and audit', 'Investment', 'Technology and cyber', 'Legal and regulatory', 'Customer and member outcomes', 'Culture and people leadership'];
  var DIRECTORS = ['Chair', 'Director A', 'Director B', 'Director C', 'Director D', 'Director E'];
  // A sensible starting pattern so the table isn't empty.
  var START = { 0: [0, 2, 7], 1: [1, 3], 2: [2], 3: [3], 4: [0, 5], 5: [6, 7] };

  var table = document.createElement('table');
  table.className = 'skills-table';
  var head = '<thead><tr><th scope="col">Skill</th>' + DIRECTORS.map(function (d) { return '<th scope="col">' + d + '</th>'; }).join('') + '<th scope="col">Coverage</th></tr></thead>';
  var body = '<tbody>' + SKILLS.map(function (s, si) {
    return '<tr><th scope="row">' + s + '</th>' + DIRECTORS.map(function (d, di) {
      var checked = (START[di] || []).indexOf(si) !== -1 ? ' checked' : '';
      return '<td><input type="checkbox" aria-label="' + d + ': ' + s + '" data-s="' + si + '"' + checked + '></td>';
    }).join('') + '<td class="cov" data-s="' + si + '"></td></tr>';
  }).join('') + '</tbody>';
  table.innerHTML = head + body;
  w.querySelector('.sm-grid').appendChild(table);
  var out = w.querySelector('.result');

  function update() {
    var gaps = [], thin = [];
    SKILLS.forEach(function (s, si) {
      var n = table.querySelectorAll('input[data-s="' + si + '"]:checked').length;
      var cell = table.querySelector('td.cov[data-s="' + si + '"]');
      cell.textContent = n === 0 ? 'Gap' : n === 1 ? 'Thin (1)' : 'Good (' + n + ')';
      cell.className = 'cov ' + (n === 0 ? 'gap' : n === 1 ? 'thin' : 'good');
      if (n === 0) gaps.push(s); else if (n === 1) thin.push(s);
    });
    var msg = gaps.length ? 'Gaps: ' + gaps.join(', ') + '. ' : 'No complete gaps. ';
    msg += thin.length ? 'Reliant on one director for: ' + thin.join(', ') + '. Consider key-person risk and board renewal.' : 'Every skill has at least two directors.';
    out.textContent = msg;
  }
  table.addEventListener('change', update);
  update();
})();
