// Interactive 5x5 risk heat map.
// Markup: <div class="heatmap-widget" data-examples="true"> ... </div>
(function () {
  var LIK = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost certain'];
  var CON = ['Insignificant', 'Minor', 'Moderate', 'Major', 'Severe'];

  function rating(l, c) { // l, c are 1..5
    var s = l * c;
    if (s >= 15) return 'extreme';
    if (s >= 10) return 'high';
    if (s >= 5) return 'medium';
    return 'low';
  }
  var ACTION = {
    low: 'Low: manage through routine procedures; review periodically.',
    medium: 'Medium: management attention; confirm controls are effective and monitor.',
    high: 'High: senior management attention; treatment plan with owner and due date; likely outside appetite.',
    extreme: 'Extreme: immediate executive and board attention; act now to reduce the risk.'
  };

  var EXAMPLES = [
    { id: 'R1', name: 'Cyber attack takes member portal offline for days', l: 3, c: 5 },
    { id: 'R2', name: 'Contribution processing errors', l: 4, c: 3 },
    { id: 'R3', name: 'Key-person loss in unit pricing team', l: 2, c: 4 },
    { id: 'R4', name: 'Minor printing error in a member letter', l: 4, c: 1 },
    { id: 'R5', name: 'Major administrator fails', l: 1, c: 5 }
  ];

  document.querySelectorAll('.heatmap-widget').forEach(function (w) {
    var showEx = w.getAttribute('data-examples') === 'true';
    var selL = w.querySelector('.hm-l');
    var selC = w.querySelector('.hm-c');
    var out = w.querySelector('.result');
    var holder = w.querySelector('.hm-grid');

    var t = document.createElement('table');
    t.className = 'heatmap';
    var cap = document.createElement('caption');
    cap.textContent = 'Likelihood (rows) by consequence (columns). Select a cell or use the drop-downs.';
    t.appendChild(cap);
    var tb = document.createElement('tbody');
    for (var l = 5; l >= 1; l--) {
      var tr = document.createElement('tr');
      var th = document.createElement('th');
      th.scope = 'row'; th.className = 'row-label'; th.textContent = LIK[l - 1];
      tr.appendChild(th);
      for (var c = 1; c <= 5; c++) {
        var td = document.createElement('td');
        var r = rating(l, c);
        td.className = 'rating-' + r;
        td.dataset.l = l; td.dataset.c = c;
        td.tabIndex = 0;
        td.setAttribute('role', 'button');
        td.setAttribute('aria-label', LIK[l - 1] + ' and ' + CON[c - 1] + ': ' + r);
        var ex = showEx ? EXAMPLES.filter(function (e) { return e.l === l && e.c === c; }) : [];
        td.textContent = ex.length ? ex.map(function (e) { return e.id; }).join(' ') : '';
        tr.appendChild(td);
      }
      tb.appendChild(tr);
    }
    var fr = document.createElement('tr');
    fr.appendChild(document.createElement('th'));
    CON.forEach(function (name) {
      var th = document.createElement('th'); th.scope = 'col'; th.textContent = name; fr.appendChild(th);
    });
    tb.appendChild(fr);
    t.appendChild(tb);
    holder.appendChild(t);

    function select(l, c) {
      selL.value = l; selC.value = c;
      t.querySelectorAll('td').forEach(function (td) {
        td.classList.toggle('sel', +td.dataset.l === +l && +td.dataset.c === +c);
      });
      var r = rating(+l, +c);
      out.textContent = LIK[l - 1] + ' × ' + CON[c - 1] + ' = score ' + (l * c) + '. ' + ACTION[r];
      out.className = 'result rating-' + r;
    }
    t.addEventListener('click', function (e) {
      var td = e.target.closest('td'); if (td) select(td.dataset.l, td.dataset.c);
    });
    t.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var td = e.target.closest('td'); if (td) { e.preventDefault(); select(td.dataset.l, td.dataset.c); }
    });
    selL.addEventListener('change', function () { select(selL.value, selC.value); });
    selC.addEventListener('change', function () { select(selL.value, selC.value); });
    select(3, 3);

    var list = w.querySelector('.hm-examples');
    if (showEx && list) {
      list.innerHTML = EXAMPLES.map(function (e) {
        return '<li><strong>' + e.id + '</strong> ' + e.name + ' <span class="small">(' + LIK[e.l - 1] + ', ' + CON[e.c - 1] + ')</span></li>';
      }).join('');
    }
  });
})();
