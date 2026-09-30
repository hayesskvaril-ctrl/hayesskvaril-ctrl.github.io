// Videos: click-to-play YouTube embeds and lazy-loaded poster images.
// External videos use YouTube's privacy-enhanced mode (youtube-nocookie.com), and nothing is loaded
// from YouTube until the reader presses play. Without JavaScript the play link opens the video on YouTube.
(function () {
  Array.prototype.forEach.call(document.querySelectorAll('.yt-facade'), function (box) {
    var link = box.querySelector('.yt-play');
    if (!link) return;
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var id = box.getAttribute('data-yt'), list = box.getAttribute('data-list');
      var src = 'https://www.youtube-nocookie.com/embed/' +
        (list ? 'videoseries?list=' + encodeURIComponent(list) + '&' : encodeURIComponent(id) + '?') + 'autoplay=1&rel=0';
      var f = document.createElement('iframe');
      f.src = src;
      f.title = box.getAttribute('data-title') || 'Video';
      f.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen');
      f.setAttribute('allowfullscreen', '');
      f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      box.innerHTML = '';
      box.appendChild(f);
      f.focus();
    });
  });

  var vids = document.querySelectorAll('video[data-poster]');
  function show(v) { if (!v.getAttribute('poster')) v.setAttribute('poster', v.getAttribute('data-poster')); }
  if (!vids.length) return;
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { show(en.target); io.unobserve(en.target); } });
    }, { rootMargin: '400px 0px' });
    Array.prototype.forEach.call(vids, function (v) { io.observe(v); });
  } else {
    Array.prototype.forEach.call(vids, show);
  }
})();
