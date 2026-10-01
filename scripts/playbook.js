// Playbook checklists (/playbooks/): tick steps off, see progress, print. Ticks are saved in this
// browser only (localStorage), keyed by page.
(function () {
  var box = document.querySelector('.pb-progress');
  if (!box) return;
  var key = 'rl-pb:' + box.getAttribute('data-key');
  var checks = Array.prototype.slice.call(document.querySelectorAll('.pb-step input[data-step]'));
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch (e) {}
  checks.forEach(function (c) { c.checked = !!saved[c.getAttribute('data-step')]; });
  function update() {
    var done = 0, state = {};
    checks.forEach(function (c) {
      var s = c.getAttribute('data-step');
      if (c.checked) { done++; state[s] = 1; }
      c.closest('.pb-step').classList.toggle('done', c.checked);
    });
    box.querySelector('.pb-count').textContent = done + ' of ' + checks.length;
    box.querySelector('.pb-bar span').style.width = (checks.length ? 100 * done / checks.length : 0) + '%';
    try { localStorage.setItem(key, JSON.stringify(state)); } catch (e) {}
  }
  checks.forEach(function (c) { c.addEventListener('change', update); });
  box.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.getAttribute('data-pb') === 'print') window.print();
    if (b.getAttribute('data-pb') === 'reset') { checks.forEach(function (c) { c.checked = false; }); update(); }
  });
  update();
})();
