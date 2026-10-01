// Site-wide enhancements (loaded on every page via the shared footer):
// 1. Gentle fade-up of tiles, cards and graphics as they scroll into view (skipped if the reader prefers reduced motion).
// 2. An "On this page" bar on longer articles: a sticky row of section links that highlights where you are.
// Everything works without JavaScript; this only adds polish.
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- 1. Reveal on scroll ----------
  if (!reduce && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('.tile, .section-art, .hero-art, main .card, figure.diagram, .band .band-intro, .tile-links');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(targets, function (el) {
      // only animate things that start below the fold, so nothing visible on load ever flickers
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
        el.classList.add('reveal');
        io.observe(el);
      }
    });
  }

  // ---------- 2. "On this page" bar ----------
  var main = document.querySelector('main.article:not(.wide)');
  if (!main) return;
  var skip = '.pb-glance, .takeaways, .outcomes, .card, .widget, .video-block, figure, .quiz, details, .related, .sources, .references';
  var heads = Array.prototype.filter.call(main.querySelectorAll('h2'), function (h) {
    return !h.closest(skip) && h.textContent.trim();
  });
  if (heads.length < 4) return;
  var used = {};
  heads.forEach(function (h) {
    if (!h.id) {
      var base = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) || 'section';
      var id = base, n = 2;
      while (document.getElementById(id) || used[id]) id = base + '-' + n++;
      h.id = id;
    }
    used[h.id] = true;
  });
  var h1 = main.querySelector('h1');
  var nav = document.createElement('nav');
  nav.className = 'local-nav';
  nav.setAttribute('aria-label', 'On this page');
  var html = '<div class="inner"><a class="ln-title" href="#main">' + (h1 ? h1.textContent.trim().replace(/</g, '&lt;') : 'Top') + '</a><ul>';
  heads.forEach(function (h) {
    var label = h.textContent.trim().replace(/\s+/g, ' ');
    if (label.length > 34) label = label.slice(0, 32).replace(/\s+\S*$/, '') + '…';
    html += '<li><a href="#' + h.id + '">' + label.replace(/</g, '&lt;') + '</a></li>';
  });
  nav.innerHTML = html + '</ul></div>';
  // wide screens: the same links as a sticky sidebar in the left margin
  var side = document.createElement('aside');
  side.className = 'toc-side';
  side.setAttribute('aria-label', 'On this page (sidebar)');
  side.innerHTML = '<p class="toc-label">On this page</p><ol>' + heads.map(function (h) {
    return '<li><a href="#' + h.id + '">' + h.textContent.trim().replace(/\s+/g, ' ').replace(/</g, '&lt;') + '</a></li>';
  }).join('') + '</ol><p class="toc-top"><a href="#main">Back to top</a></p>';
  main.appendChild(side);
  var header = document.querySelector('.site-header');
  if (header && header.parentNode) header.parentNode.insertBefore(nav, header.nextSibling);
  function setTop() { if (header) nav.style.top = header.offsetHeight + 'px'; }
  setTop(); window.addEventListener('resize', setTop);

  // show the bar once the reader scrolls past the title
  var shown = false;
  function onScroll() {
    var past = h1 ? h1.getBoundingClientRect().bottom < 0 : window.scrollY > 300;
    if (past !== shown) { shown = past; nav.classList.toggle('show', past); side.classList.toggle('show', past); }
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // highlight the section in view
  var links = Array.prototype.slice.call(nav.querySelectorAll('ul a')).concat(Array.prototype.slice.call(side.querySelectorAll('ol a')));
  if ('IntersectionObserver' in window) {
    var current = null;
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) current = en.target.id;
      });
      Array.prototype.forEach.call(links, function (a) {
        var on = a.getAttribute('href') === '#' + current;
        a.classList.toggle('on', on);
        if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
        if (on && a.parentNode.parentNode.tagName === 'UL' && nav.classList.contains('show')) {
          var ul = a.parentNode.parentNode, l = a.offsetLeft;
          if (l < ul.scrollLeft || l > ul.scrollLeft + ul.clientWidth - 60) ul.scrollTo({ left: Math.max(0, l - 48), behavior: reduce ? 'auto' : 'smooth' });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    heads.forEach(function (h) { spy.observe(h); });
  }
})();
