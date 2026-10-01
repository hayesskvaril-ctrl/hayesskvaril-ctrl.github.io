// Interactive GRC data model map (/grc/grc-data-model.html).
// Draws every object and relationship from window.GRC_MODEL. Select an object (click, Enter, or the list)
// to highlight what it links to and read each relationship in words. The full table below works without JavaScript.
(function () {
  var M = window.GRC_MODEL, box = document.getElementById('grc-map');
  if (!M || !box) return;
  var NS = 'http://www.w3.org/2000/svg', W = 1020, H = 600, NW = 172, NH = 50;
  var byId = {}; M.nodes.forEach(function (n) { byId[n.id] = n; n.cx = n.x - 40 + NW / 2; n.cy = n.y + 4; });
  var FILL = { gov: '#1b3a5c', org: '#e8f0fe', core: '#2563eb', act: '#ffffff' };
  var TXT = { gov: '#ffffff', org: '#0f2942', core: '#ffffff', act: '#0f2942' };
  function el(t, a) { var e = document.createElementNS(NS, t); for (var k in a) e.setAttribute(k, a[k]); return e; }
  var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'group', 'aria-label': 'GRC data model map. Use the list or Tab key to choose an object.' });
  svg.classList.add('grc-map-svg');
  var gE = el('g', {}), gL = el('g', {}), gN = el('g', {});
  svg.appendChild(gE); svg.appendChild(gL); svg.appendChild(gN);
  var edgeEls = M.edges.map(function (e) {
    var a = byId[e.a], b = byId[e.b], mx = (a.cx + b.cx) / 2, my = (a.cy + b.cy) / 2 - 14;
    var p = el('path', { d: 'M' + a.cx + ',' + a.cy + ' Q' + mx + ',' + my + ' ' + b.cx + ',' + b.cy, fill: 'none', stroke: '#9fb4d6', 'stroke-width': 1.4 });
    gE.appendChild(p);
    var t = el('text', { x: mx, y: my + 4, 'text-anchor': 'middle', 'font-size': 11, fill: '#0f2942' }); t.textContent = e.label;
    var bg = el('rect', { rx: 4, fill: '#ffffff', opacity: 0.92 });
    var lg = el('g', { visibility: 'hidden' }); lg.appendChild(bg); lg.appendChild(t); gL.appendChild(lg);
    return { e: e, path: p, label: lg, text: t, bg: bg };
  });
  var nodeEls = {};
  M.nodes.forEach(function (n) {
    var g = el('g', { tabindex: 0, role: 'button', 'aria-label': n.label + '. Show links.', 'class': 'grc-node' });
    g.appendChild(el('rect', { x: n.x - 40, y: n.y - 21, width: NW, height: NH, rx: 10, fill: FILL[n.group], stroke: n.group === 'act' ? '#2563eb' : 'none', 'stroke-width': 1.4 }));
    var words = n.label.split(' '), lines = [''], max = 22;
    words.forEach(function (w) { var l = lines[lines.length - 1]; if ((l + ' ' + w).trim().length > max) lines.push(w); else lines[lines.length - 1] = (l + ' ' + w).trim(); });
    lines.forEach(function (ln, i) {
      var t = el('text', { x: n.cx, y: n.cy + (i - (lines.length - 1) / 2) * 15 + 4, 'text-anchor': 'middle', 'font-size': 12.5, 'font-weight': 600, fill: TXT[n.group] });
      t.textContent = ln; g.appendChild(t);
    });
    g.addEventListener('click', function () { select(n.id); });
    g.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); select(n.id); } });
    gN.appendChild(g); nodeEls[n.id] = g;
  });
  box.appendChild(svg);

  var pick = document.getElementById('grc-pick'), out = document.getElementById('grc-detail');
  M.nodes.slice().sort(function (a, b) { return a.label.localeCompare(b.label); }).forEach(function (n) {
    var o = document.createElement('option'); o.value = n.id; o.textContent = n.label; pick.appendChild(o);
  });
  pick.addEventListener('change', function () { select(pick.value || null); });
  var reset = document.getElementById('grc-reset');
  if (reset) reset.addEventListener('click', function () { select(null); });

  function select(id) {
    pick.value = id || '';
    var near = {}; if (id) near[id] = true;
    edgeEls.forEach(function (x) {
      var on = id && (x.e.a === id || x.e.b === id);
      if (on) { near[x.e.a] = near[x.e.b] = true; }
      x.path.setAttribute('stroke', on ? '#2563eb' : '#9fb4d6');
      x.path.setAttribute('stroke-width', on ? 2.6 : 1.4);
      x.path.setAttribute('opacity', !id || on ? 1 : 0.12);
      x.label.setAttribute('visibility', on ? 'visible' : 'hidden');
      if (on) { var bb = x.text.getBBox(); x.bg.setAttribute('x', bb.x - 3); x.bg.setAttribute('y', bb.y - 1); x.bg.setAttribute('width', bb.width + 6); x.bg.setAttribute('height', bb.height + 2); }
    });
    Object.keys(nodeEls).forEach(function (k) { nodeEls[k].setAttribute('opacity', !id || near[k] ? 1 : 0.22); nodeEls[k].setAttribute('aria-pressed', k === id ? 'true' : 'false'); });
    if (!id) { out.innerHTML = '<p class="small">Choose an object on the map or from the list to see what it links to.</p>'; return; }
    var n = byId[id], lines = [];
    M.edges.forEach(function (e) {
      if (e.a === id) lines.push('<li><strong>' + n.label + '</strong> ' + e.label + ' <a href="#" data-go="' + e.b + '">' + byId[e.b].label + '</a></li>');
      else if (e.b === id) lines.push('<li><a href="#" data-go="' + e.a + '">' + byId[e.a].label + '</a> ' + e.label + ' <strong>' + n.label + '</strong></li>');
    });
    out.innerHTML = '<h3>' + n.label + '</h3><p>' + n.desc + '</p><p class="small">' + (M.groups[n.group] || '') + ' · ' + lines.length + ' links</p><ul>' + lines.join('') + '</ul>';
    Array.prototype.forEach.call(out.querySelectorAll('a[data-go]'), function (a) {
      a.addEventListener('click', function (ev) { ev.preventDefault(); select(a.getAttribute('data-go')); nodeEls[a.getAttribute('data-go')].focus(); });
    });
  }
  select(null);
})();
