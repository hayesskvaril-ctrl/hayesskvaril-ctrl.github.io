// Scenario simulation runner for /learn/scenarios.html. Reads window.SCENARIOS (scenarios-data.js).
// Markup: <div class="widget scenario-runner" id="scenario-runner"></div>
(function () {
  var root = document.getElementById('scenario-runner');
  if (!root || !window.SCENARIOS) return;
  var LABELS = { best: 'Best practice', ok: 'Partly right', poor: 'Risky choice' };

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function showMenu() {
    root.innerHTML = '';
    root.appendChild(el('h2', null, 'Choose a scenario'));
    var grid = el('div', 'quiz-topics');
    window.SCENARIOS.forEach(function (sc) {
      var b = el('button', 'quiz-topic'); b.type = 'button';
      b.appendChild(el('strong', null, sc.title));
      b.appendChild(el('span', null, sc.summary));
      b.appendChild(el('span', 'badge', sc.level));
      b.addEventListener('click', function () { run(sc); });
      grid.appendChild(b);
    });
    root.appendChild(grid);
  }

  function run(sc) {
    var steps = sc.steps;
    var byId = {};
    steps.forEach(function (s, i) { byId[s.id] = i; });
    var idx = -1, log = [];

    function header(label) {
      var head = el('div', 'quiz-head');
      head.appendChild(el('span', 'quiz-progress', sc.title + (label ? ' · ' + label : '')));
      var quit = el('button', 'secondary', 'All scenarios'); quit.type = 'button';
      quit.addEventListener('click', showMenu);
      head.appendChild(quit);
      root.appendChild(head);
    }

    function intro() {
      root.innerHTML = '';
      header('');
      var h = el('h2', null, sc.title); h.tabIndex = -1; root.appendChild(h);
      root.appendChild(el('p', 'scenario-setting', sc.setting));
      var go = el('button', null, 'Start'); go.type = 'button';
      go.addEventListener('click', function () { idx = 0; step(); });
      root.appendChild(go);
      h.focus();
    }

    function step() {
      var s = steps[idx];
      if (s.ending) return finish(s);
      var decisions = steps.filter(function (x) { return !x.ending; }).length;
      root.innerHTML = '';
      header('Decision ' + (log.length + 1) + ' of ' + decisions);
      var p = el('p', 'scenario-text', s.text); p.tabIndex = -1; root.appendChild(p);
      var list = el('div', 'scenario-choices');
      var fb = el('div', 'scenario-feedback'); fb.setAttribute('aria-live', 'polite');
      var next = el('button', null, 'Continue'); next.type = 'button'; next.hidden = true;
      var chosen = null;
      shuffle(s.choices).forEach(function (c) {
        var b = el('button', 'scenario-choice', c.label); b.type = 'button';
        b.addEventListener('click', function () {
          chosen = c;
          list.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
          b.classList.add('picked', 'q-' + c.quality);
          fb.innerHTML = '';
          fb.className = 'scenario-feedback q-' + c.quality;
          fb.appendChild(el('strong', null, LABELS[c.quality] + '. '));
          fb.appendChild(document.createTextNode(c.feedback));
          if (c.quality !== 'best') {
            var bestC = s.choices.filter(function (x) { return x.quality === 'best'; })[0];
            if (bestC) {
              var bp = el('p', 'scenario-best');
              bp.appendChild(el('strong', null, 'Best practice: '));
              bp.appendChild(document.createTextNode(bestC.label));
              fb.appendChild(bp);
            }
          }
          log.push({ step: s, choice: c });
          next.hidden = false;
          next.focus();
        });
        list.appendChild(b);
      });
      root.appendChild(list); root.appendChild(fb); root.appendChild(next);
      next.addEventListener('click', function () {
        idx = chosen && chosen.next ? byId[chosen.next] : idx + 1;
        step();
      });
      p.focus();
    }

    function finish(s) {
      root.innerHTML = '';
      header('Debrief');
      var best = log.filter(function (l) { return l.choice.quality === 'best'; }).length;
      var h = el('h2', null, 'Debrief: ' + best + ' of ' + log.length + ' best-practice decisions');
      h.tabIndex = -1; root.appendChild(h);
      var verdict = best === log.length ? 'Excellent. Every decision matched best practice.'
        : best * 2 >= log.length ? 'Mostly sound, but some choices would have added risk. Review the flagged steps below.'
        : 'In real life, several of these choices could lead to late reports, regulator concern or unfair outcomes for customers. Review the flagged steps below.';
      root.appendChild(el('p', 'scenario-verdict', verdict));
      var ideal = el('p');
      ideal.appendChild(el('strong', null, 'What a well-handled outcome looks like: '));
      ideal.appendChild(document.createTextNode(s.text));
      root.appendChild(ideal);
      var ol = el('ol', 'scenario-log');
      log.forEach(function (l) {
        var li = el('li');
        li.appendChild(el('span', 'badge q-' + l.choice.quality, LABELS[l.choice.quality]));
        li.appendChild(document.createTextNode(' ' + l.choice.label));
        ol.appendChild(li);
      });
      root.appendChild(ol);
      if (s.learn && s.learn.length) {
        root.appendChild(el('h3', null, 'Learn more'));
        var ul = el('ul');
        s.learn.forEach(function (lk) {
          var li = el('li'); var a = el('a', null, lk.label); a.href = lk.href; li.appendChild(a); ul.appendChild(li);
        });
        root.appendChild(ul);
      }
      var row = el('div', 'quiz-actions');
      var again = el('button', null, 'Try again'); again.type = 'button';
      again.addEventListener('click', function () { run(sc); });
      var menu = el('button', 'secondary', 'All scenarios'); menu.type = 'button';
      menu.addEventListener('click', showMenu);
      row.appendChild(again); row.appendChild(menu); root.appendChild(row);
      h.focus();
    }

    intro();
  }

  showMenu();
})();
