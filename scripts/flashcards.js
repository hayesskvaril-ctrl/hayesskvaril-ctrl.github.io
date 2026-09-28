// Flashcards for /learn/flashcards.html. Reads window.GLOSSARY_CARDS (glossary-cards.js)
// and window.FLASH_DECKS (flashcards-data.js).
// Markup: <div class="widget flashcards" id="flashcards"></div>
// Keyboard: Space or Enter flips; 1 = "Again"; 2 = "Got it".
(function () {
  var root = document.getElementById('flashcards');
  if (!root) return;

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

  var glossary = (window.GLOSSARY_CARDS || []).map(function (g) {
    return { front: g.term + (g.abbr ? ' (' + g.abbr + ')' : ''), back: g.def, link: '/glossary/#' + g.slug };
  });
  var decks = [];
  if (glossary.length) {
    decks.push({ id: 'glossary-20', title: 'Glossary: 20 random terms', cards: glossary, sample: 20 });
    decks.push({ id: 'glossary', title: 'Glossary: all ' + glossary.length + ' terms', cards: glossary });
    var fresh = window.GLOSSARY_NEW || [];
    var freshCards = glossary.filter(function (c) { return fresh.indexOf(c.link.slice(11)) !== -1; });
    if (freshCards.length) decks.push({ id: 'glossary-new', title: 'Glossary: ' + freshCards.length + ' newer terms', cards: freshCards });
  }
  (window.FLASH_DECKS || []).forEach(function (d) { decks.push(d); });

  var keyHandler = null;

  function showMenu() {
    if (keyHandler) { document.removeEventListener('keydown', keyHandler); keyHandler = null; }
    root.innerHTML = '';
    root.appendChild(el('h2', null, 'Choose a deck'));
    var grid = el('div', 'quiz-topics');
    decks.forEach(function (d) {
      var b = el('button', 'quiz-topic'); b.type = 'button';
      b.appendChild(el('strong', null, d.title));
      b.appendChild(el('span', null, (d.sample || d.cards.length) + ' cards'));
      b.addEventListener('click', function () { start(d); });
      grid.appendChild(b);
    });
    root.appendChild(grid);
    var opt = el('p', 'fc-option');
    var lab = el('label');
    var cb = el('input'); cb.type = 'checkbox'; cb.id = 'fc-reverse';
    lab.appendChild(cb);
    lab.appendChild(document.createTextNode(' Reverse mode: show the answer side first and recall the term'));
    opt.appendChild(lab);
    root.appendChild(opt);
  }

  function start(deck) {
    var reverse = !!(document.getElementById('fc-reverse') || {}).checked;
    var queue = shuffle(deck.cards);
    if (deck.sample) queue = queue.slice(0, deck.sample);
    var total = queue.length, known = 0, flipped = false;

    root.innerHTML = '';
    var head = el('div', 'quiz-head');
    var progress = el('span', 'quiz-progress');
    head.appendChild(progress);
    var quit = el('button', 'secondary', 'Change deck'); quit.type = 'button';
    quit.addEventListener('click', showMenu);
    head.appendChild(quit);
    root.appendChild(head);
    var bar = el('div', 'quiz-bar'); var fill = el('span'); bar.appendChild(fill); root.appendChild(bar);

    var card = el('button', 'fc-card'); card.type = 'button';
    var side = el('span', 'fc-side');
    var text = el('span', 'fc-text');
    var hint = el('span', 'fc-hint');
    card.appendChild(side); card.appendChild(text); card.appendChild(hint);
    root.appendChild(card);
    var live = el('p', 'visually-hidden'); live.setAttribute('aria-live', 'polite'); root.appendChild(live);

    var more = el('p', 'fc-more small');
    root.appendChild(more);
    var row = el('div', 'quiz-actions fc-actions');
    var again = el('button', 'secondary', 'Again (1)'); again.type = 'button';
    var got = el('button', null, 'Got it (2)'); got.type = 'button';
    row.appendChild(again); row.appendChild(got);
    root.appendChild(row);

    function frontText(c) { return reverse ? c.back : c.front; }
    function backText(c) { return reverse ? c.front : c.back; }

    function show() {
      if (!queue.length) return done();
      var c = queue[0];
      flipped = false;
      card.classList.remove('flipped');
      side.textContent = reverse ? 'Definition' : 'Term';
      text.textContent = frontText(c);
      hint.textContent = 'Select the card (or press Space) to flip';
      more.innerHTML = '';
      row.hidden = true;
      progress.textContent = deck.title + ' · ' + known + ' of ' + total + ' known · ' + queue.length + ' left';
      fill.style.width = Math.round((known / total) * 100) + '%';
    }
    function flip() {
      if (!queue.length) return;
      var c = queue[0];
      flipped = !flipped;
      card.classList.toggle('flipped', flipped);
      side.textContent = flipped ? (reverse ? 'Term' : 'Answer') : (reverse ? 'Definition' : 'Term');
      text.textContent = flipped ? backText(c) : frontText(c);
      hint.textContent = flipped ? 'Did you know it?' : 'Select the card (or press Space) to flip';
      live.textContent = text.textContent;
      if (flipped) {
        row.hidden = false;
        more.innerHTML = '';
        if (c.link) { var a = el('a', null, 'Read more'); a.href = c.link; more.appendChild(a); }
      }
    }
    function answer(ok) {
      if (!flipped || !queue.length) return;
      var c = queue.shift();
      if (ok) known++;
      else queue.splice(Math.min(queue.length, 3 + Math.floor(Math.random() * 3)), 0, c);
      show();
      card.focus();
    }
    function done() {
      document.removeEventListener('keydown', keyHandler); keyHandler = null;
      root.innerHTML = '';
      var h = el('h2', null, 'Deck complete: all ' + total + ' cards known'); h.tabIndex = -1;
      root.appendChild(h);
      root.appendChild(el('p', null, 'Cards you marked "Again" came back until you knew them. Try reverse mode for a harder challenge.'));
      var r2 = el('div', 'quiz-actions');
      var a1 = el('button', null, 'Go again'); a1.type = 'button'; a1.addEventListener('click', function () { start(deck); });
      var a2 = el('button', 'secondary', 'Choose another deck'); a2.type = 'button'; a2.addEventListener('click', showMenu);
      r2.appendChild(a1); r2.appendChild(a2); root.appendChild(r2);
      h.focus();
    }

    card.addEventListener('click', flip);
    again.addEventListener('click', function () { answer(false); });
    got.addEventListener('click', function () { answer(true); });
    if (keyHandler) document.removeEventListener('keydown', keyHandler);
    keyHandler = function (e) {
      if (e.target && /INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
      if (e.key === '1') answer(false);
      else if (e.key === '2') answer(true);
      else if ((e.key === ' ' || e.key === 'Enter') && e.target !== card && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') { e.preventDefault(); flip(); }
    };
    document.addEventListener('keydown', keyHandler);
    show();
    card.focus();
  }

  showMenu();
})();
