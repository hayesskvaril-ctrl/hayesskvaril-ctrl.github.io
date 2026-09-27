// Topic quiz runner for /learn/quizzes.html. Reads window.QUIZ_BANK (quiz-bank.js).
// Markup: <div class="quiz-runner" id="quiz-runner"></div>
(function () {
  var root = document.getElementById('quiz-runner');
  if (!root || !window.QUIZ_BANK) return;
  var bank = window.QUIZ_BANK;
  var MIXED_SIZE = 10;

  function store(key, val) {
    try {
      if (val === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, val);
    } catch (e) { return null; }
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function allQuestions() {
    var out = [];
    bank.forEach(function (s) { s.questions.forEach(function (q) { out.push(q); }); });
    return out;
  }

  function showMenu() {
    root.innerHTML = '';
    root.appendChild(el('h2', null, 'Choose a topic'));
    var grid = el('div', 'quiz-topics');
    var topics = bank.map(function (s) { return { id: s.id, title: s.title, qs: s.questions }; });
    topics.push({ id: 'mixed', title: 'Mixed: ' + MIXED_SIZE + ' random questions', qs: null });
    topics.forEach(function (t) {
      var b = el('button', 'quiz-topic');
      b.type = 'button';
      b.appendChild(el('strong', null, t.title));
      var n = t.qs ? t.qs.length : MIXED_SIZE;
      var best = store('rl-quiz-best-' + t.id);
      b.appendChild(el('span', null, n + ' questions' + (best ? ' · best: ' + best : '')));
      b.addEventListener('click', function () {
        start(t.id, t.title, t.qs ? shuffle(t.qs) : shuffle(allQuestions()).slice(0, MIXED_SIZE));
      });
      grid.appendChild(b);
    });
    root.appendChild(grid);
  }

  function start(id, title, qs) {
    var i = 0, correct = 0, missed = [];

    function render() {
      var q = qs[i];
      root.innerHTML = '';
      var head = el('div', 'quiz-head');
      head.appendChild(el('span', 'quiz-progress', title + ' · Question ' + (i + 1) + ' of ' + qs.length));
      var quit = el('button', 'secondary', 'Change topic');
      quit.type = 'button';
      quit.addEventListener('click', showMenu);
      head.appendChild(quit);
      root.appendChild(head);

      var bar = el('div', 'quiz-bar');
      var fill = el('span');
      fill.style.width = Math.round((i / qs.length) * 100) + '%';
      bar.appendChild(fill);
      root.appendChild(bar);

      var box = el('div', 'quiz');
      var qd = el('div', 'q');
      var qt = el('p', 'q-text', q.q);
      qt.tabIndex = -1;
      qd.appendChild(qt);
      var opts = el('div', 'q-options');
      var fb = el('p', 'q-feedback'); fb.setAttribute('aria-live', 'polite');
      var ex = el('p', 'q-explain'); ex.hidden = true;
      var next = el('button', null, i + 1 < qs.length ? 'Next question' : 'See my score');
      next.type = 'button'; next.hidden = true;

      // Show options in random order (unless q.fixed), keeping the original index for marking.
      var order = q.options.map(function (_, k) { return k; });
      if (!q.fixed) order = shuffle(order);
      order.forEach(function (k) {
        var text = q.options[k];
        var b = el('button', null, text);
        b.type = 'button';
        b.addEventListener('click', function () {
          var right = k === q.answer;
          if (right) correct++; else missed.push(q);
          opts.querySelectorAll('button').forEach(function (x, m) {
            x.disabled = true;
            if (order[m] === q.answer) x.classList.add('is-correct');
          });
          if (!right) b.classList.add('is-wrong');
          fb.textContent = right ? 'Correct.' : 'Not quite. The answer is: ' + q.options[q.answer];
          fb.className = 'q-feedback ' + (right ? 'good' : 'bad');
          ex.textContent = q.explain + ' ';
          if (q.page) {
            var a = el('a', null, 'Read the topic page');
            a.href = q.page;
            ex.appendChild(a);
          }
          ex.hidden = false;
          next.hidden = false;
          next.focus();
        });
        opts.appendChild(b);
      });
      qd.appendChild(opts); qd.appendChild(fb); qd.appendChild(ex); qd.appendChild(next);
      box.appendChild(qd);
      root.appendChild(box);
      next.addEventListener('click', function () {
        i++;
        if (i < qs.length) render(); else finish();
      });
      qt.focus();
    }

    function finish() {
      var pct = Math.round((correct / qs.length) * 100);
      var key = 'rl-quiz-best-' + id;
      var prev = store(key);
      var prevPct = prev ? parseInt(prev, 10) : -1;
      if (pct > prevPct) store(key, pct + '%');
      root.innerHTML = '';
      var h = el('h2', null, 'You scored ' + correct + ' out of ' + qs.length + ' (' + pct + '%)');
      h.tabIndex = -1;
      root.appendChild(h);
      var msg = pct >= 80 ? 'Great work. You have a solid grasp of this topic.'
        : pct >= 50 ? 'Good start. Revisit the pages below to fill the gaps.'
        : 'Worth another read. The pages below cover what you missed.';
      root.appendChild(el('p', null, msg));
      if (missed.length) {
        root.appendChild(el('h3', null, 'Pages to revisit'));
        var ul = el('ul');
        var seen = {};
        missed.forEach(function (q) {
          if (!q.page || seen[q.page]) return;
          seen[q.page] = true;
          var li = el('li'); var a = el('a', null, (window.QUIZ_PAGES && window.QUIZ_PAGES[q.page]) || q.page);
          a.href = q.page; li.appendChild(a); ul.appendChild(li);
        });
        root.appendChild(ul);
      }
      var row = el('div', 'quiz-actions');
      var again = el('button', null, 'Try again'); again.type = 'button';
      again.addEventListener('click', function () { start(id, title, shuffle(qs)); });
      var menu = el('button', 'secondary', 'Choose another topic'); menu.type = 'button';
      menu.addEventListener('click', showMenu);
      row.appendChild(again); row.appendChild(menu);
      root.appendChild(row);
      h.focus();
    }

    render();
  }

  showMenu();
})();
