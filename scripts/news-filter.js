// Filter the news listing by article type. Buttons: [data-filter]; items: .news-item[data-type].
(function () {
  var buttons = document.querySelectorAll('.news-filter button');
  var items = document.querySelectorAll('.news-item');
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filter');
      buttons.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      items.forEach(function (it) { it.hidden = f !== 'all' && it.getAttribute('data-type') !== f; });
    });
  });
})();
