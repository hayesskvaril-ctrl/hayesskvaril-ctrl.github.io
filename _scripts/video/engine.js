/* RiskLens explainer video engine.
   Renders a scene-based spec (specs/<slug>.js) to an SVG frame at any time t, deterministically,
   so render.js can capture frames and encode an MP4. Canvas is 1280 x 720, in the site's dark theme.
   Scene layouts: title, flow, cycle, stack, columns, timeline, bars, statement, custom, end. */
(function () {
  var W = 1280, H = 720;
  var C = {
    bg: '#05080f', panel: 'rgba(10,17,33,0.92)', heading: '#f2f7ff', text: '#d5e0f0', muted: '#93a4bf',
    border: 'rgba(125,211,252,0.22)', cyan: '#22d3ee', blue: '#3b82f6', blueBright: '#7cb7ff',
    violet: '#a78bfa', green: '#34d399', amber: '#fbbf24', red: '#f87171'
  };
  var TONES = {
    navy: { fill: '#0e1a31', accent: '#7cb7ff' }, blue: { fill: '#0f2447', accent: '#7cb7ff' },
    cyan: { fill: '#0a2833', accent: '#22d3ee' }, violet: { fill: '#1c1840', accent: '#a78bfa' },
    green: { fill: '#0c2a25', accent: '#34d399' }, amber: { fill: '#2a2310', accent: '#fbbf24' },
    red: { fill: '#2c1418', accent: '#f87171' }, grey: { fill: '#141c2c', accent: '#93a4bf' }
  };
  var FD = "'Space Grotesk', Inter, sans-serif", FB = 'Inter, sans-serif', FM = "'JetBrains Mono', monospace";
  var STAGE = { x: 70, w: 1140, top: 132, bottom: 548 };
  var CAP = { x: 60, y: 568, w: 1160, h: 124 };
  var spec = null, scenes = [], warnings = [];
  var cv = document.createElement('canvas').getContext('2d');

  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function ease(x) { x = clamp(x, 0, 1); return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
  function prog(t, a, d) { return ease((t - a) / (d || 0.6)); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function tone(n) { return TONES[n || 'navy'] || TONES.navy; }

  function measure(str, size, weight, family) {
    cv.font = (weight || 400) + ' ' + size + 'px ' + (family || FB);
    return cv.measureText(str).width;
  }
  function wrap(str, maxW, size, weight, family) {
    var out = [];
    String(str).split('\n').forEach(function (para) {
      var words = para.split(/\s+/).filter(Boolean), line = '';
      words.forEach(function (w) {
        var test = line ? line + ' ' + w : w;
        if (measure(test, size, weight, family) <= maxW || !line) line = test;
        else { out.push(line); line = w; }
      });
      out.push(line);
    });
    return out;
  }
  // Multi-line text. Returns {svg, h, lines}. y is the top of the block.
  function text(x, y, str, o) {
    o = o || {};
    var size = o.size || 18, lh = o.lh || Math.round(size * 1.32), weight = o.weight || 400, fam = o.family || FB;
    var lines = o.maxW ? wrap(str, o.maxW, size, weight, fam) : String(str).split('\n');
    if (o.maxLines && lines.length > o.maxLines) warnings.push('Text over ' + o.maxLines + ' lines: "' + String(str).slice(0, 60) + '"');
    var anchor = o.anchor || 'start';
    var s = '<text x="' + x + '" y="' + (y + size * 0.95) + '" font-family="' + fam + '" font-size="' + size + '" font-weight="' + weight +
      '" fill="' + (o.fill || C.text) + '" text-anchor="' + anchor + '"' + (o.opacity != null ? ' opacity="' + o.opacity + '"' : '') +
      (o.ls ? ' letter-spacing="' + o.ls + '"' : '') + '>';
    lines.forEach(function (l, i) { s += '<tspan x="' + x + '" dy="' + (i ? lh : 0) + '">' + esc(l) + '</tspan>'; });
    return { svg: s + '</text>', h: lines.length * lh, lines: lines.length };
  }
  function textH(str, maxW, size, weight, family, lh) {
    return wrap(str, maxW, size, weight, family).length * (lh || Math.round(size * 1.32));
  }
  function g(inner, o) {
    o = o || {};
    var tr = '';
    if (o.dx || o.dy) tr += 'translate(' + (o.dx || 0) + ',' + (o.dy || 0) + ') ';
    if (o.scale != null && o.scale !== 1) tr += 'translate(' + o.cx + ',' + o.cy + ') scale(' + o.scale + ') translate(' + (-o.cx) + ',' + (-o.cy) + ')';
    return '<g' + (tr ? ' transform="' + tr + '"' : '') + (o.opacity != null ? ' opacity="' + clamp(o.opacity, 0, 1).toFixed(3) + '"' : '') + '>' + inner + '</g>';
  }
  function card(x, y, w, h, tn, o) {
    o = o || {};
    var t = tone(tn);
    var s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="14" fill="' + t.fill + '" stroke="' + t.accent + '" stroke-opacity="' + (o.hi ? 0.95 : 0.45) + '" stroke-width="' + (o.hi ? 2.5 : 1.5) + '"/>';
    s += '<rect x="' + (x + 14) + '" y="' + y + '" width="' + Math.max(0, w - 28) + '" height="3" rx="1.5" fill="' + t.accent + '" opacity="0.9"/>';
    if (o.hi) s = '<rect x="' + (x - 6) + '" y="' + (y - 6) + '" width="' + (w + 12) + '" height="' + (h + 12) + '" rx="18" fill="' + t.accent + '" opacity="0.12"/>' + s;
    return s;
  }
  function arrow(x1, y1, x2, y2, p, col, wd) {
    p = p == null ? 1 : p;
    if (p <= 0) return '';
    var ex = x1 + (x2 - x1) * p, ey = y1 + (y2 - y1) * p, ang = Math.atan2(y2 - y1, x2 - x1), hl = 11;
    var s = '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + ex + '" y2="' + ey + '" stroke="' + (col || C.cyan) + '" stroke-width="' + (wd || 3) + '" stroke-linecap="round"/>';
    if (p > 0.85) s += '<path d="M' + ex + ',' + ey + ' L' + (ex - hl * Math.cos(ang - 0.45)) + ',' + (ey - hl * Math.sin(ang - 0.45)) +
      ' L' + (ex - hl * Math.cos(ang + 0.45)) + ',' + (ey - hl * Math.sin(ang + 0.45)) + ' Z" fill="' + (col || C.cyan) + '"/>';
    return s;
  }
  // reveal times for n items within a scene
  function reveals(scene, n) {
    var start = scene.revealStart != null ? scene.revealStart : 0.5;
    var span = scene.revealSpan != null ? scene.revealSpan : Math.min(Math.max(scene.dur * 0.62 - start, 0.8), n * 1.8);
    return (scene.at || []).length ? scene.at : Array.apply(null, Array(n)).map(function (_, i) { return start + (n > 1 ? i * span / (n - 1) : 0); });
  }
  function activeAt(scene, lt) {
    var a = -1;
    (scene.active || []).forEach(function (p) { if (lt >= p[0]) a = p[1]; });
    return a;
  }
  function stageTop(scene) { return scene.heading ? STAGE.top : 104; }
  function headingSvg(scene, lt) {
    if (!scene.heading) return '';
    var p = prog(lt, 0.1, 0.5);
    return g(text(STAGE.x, 78, scene.heading, { size: 30, weight: 700, family: FD, fill: C.heading }).svg +
      '<rect x="' + STAGE.x + '" y="120" width="' + (70 * p) + '" height="3" rx="1.5" fill="url(#grad)"/>', { opacity: p });
  }

  var L = {};
  L.title = function (sc, lt) {
    var s = '', p1 = prog(lt, 0.2, 0.8), p2 = prog(lt, 0.8, 0.8), p3 = prog(lt, 1.3, 0.8);
    var th0 = textH(sc.title, 1040, 58, 700, FD, 68), subH = sc.subtitle ? textH(sc.subtitle, 980, 26, 400, FB) + 30 : 0;
    var ty = 104 + (560 - 104 - (42 + th0 + 26 + subH)) / 2 + 42;
    if (sc.tag) s += g(text(640, ty - 42, sc.tag, { size: 16, weight: 600, family: FM, fill: C.cyan, anchor: 'middle', ls: 2 }).svg, { opacity: p1 });
    var tt = text(640, ty, sc.title, { size: 58, weight: 700, family: FD, fill: C.heading, anchor: 'middle', maxW: 1040, lh: 68 });
    s += g(tt.svg, { opacity: p1, dy: (1 - p1) * 20 });
    var ly = ty + tt.h + 22;
    s += '<rect x="' + (640 - 150 * p2) + '" y="' + ly + '" width="' + (300 * p2) + '" height="4" rx="2" fill="url(#grad)"/>';
    if (sc.subtitle) s += g(text(640, ly + 30, sc.subtitle, { size: 26, fill: C.muted, anchor: 'middle', maxW: 980 }).svg, { opacity: p3 });
    return s;
  };
  L.end = function (sc, lt) {
    var s = '', p1 = prog(lt, 0.2, 0.7), p2 = prog(lt, 0.7, 0.7), p3 = prog(lt, 1.2, 0.7);
    s += g(text(640, 150, 'Learn more on RiskLens Australia', { size: 22, weight: 600, family: FM, fill: C.cyan, anchor: 'middle', ls: 1 }).svg, { opacity: p1 });
    var t2 = text(640, 205, sc.page, { size: 40, weight: 700, family: FD, fill: C.heading, anchor: 'middle', maxW: 1040, lh: 50 });
    s += g(t2.svg, { opacity: p2, dy: (1 - p2) * 14 });
    s += g(text(640, 205 + t2.h + 22, 'hayesskvaril-ctrl.github.io' + sc.url, { size: 22, weight: 500, family: FM, fill: C.blueBright, anchor: 'middle' }).svg, { opacity: p2 });
    s += g(text(640, 420, 'General educational information only. Not legal, financial or compliance advice.\nAlways check the official legislation and regulator guidance.', { size: 20, fill: C.muted, anchor: 'middle', lh: 30 }).svg, { opacity: p3 });
    return s;
  };
  L.statement = function (sc, lt) {
    var p = prog(lt, 0.3, 0.8), p2 = prog(lt, 1.0, 0.8), top = stageTop(sc);
    var tt = text(640, 0, sc.text, { size: sc.size || 42, weight: 700, family: FD, fill: C.heading, anchor: 'middle', maxW: 980, lh: Math.round((sc.size || 42) * 1.25) });
    var sh = sc.small ? textH(sc.small, 940, 25, 400, FB) + 30 : 0;
    var y0 = top + (STAGE.bottom - top - tt.h - sh) / 2;
    var s = g(text(640, y0, sc.text, { size: sc.size || 42, weight: 700, family: FD, fill: C.heading, anchor: 'middle', maxW: 980, lh: Math.round((sc.size || 42) * 1.25) }).svg, { opacity: p, scale: 0.96 + 0.04 * p, cx: 640, cy: y0 + tt.h / 2 });
    if (sc.small) s += g(text(640, y0 + tt.h + 30, sc.small, { size: 25, fill: C.muted, anchor: 'middle', maxW: 940 }).svg, { opacity: p2 });
    return headingSvg(sc, lt) + s;
  };
  L.flow = function (sc, lt) {
    var items = sc.items, n = items.length, gap = sc.gap || 46, top = stageTop(sc);
    var w = (STAGE.w - (n - 1) * gap) / n, pad = 16;
    var hs = items.map(function (it) {
      return 26 + textH(it.h, w - 2 * pad, 26, 700, FD, 31) + (it.b ? 10 + textH(it.b, w - 2 * pad, 21, 400, FB, 27) : 0) + 24;
    });
    var bh = Math.max(sc.minH || 150, Math.max.apply(null, hs));
    var y = top + (STAGE.bottom - top - bh) / 2 + (sc.dy || 0), ts = reveals(sc, n), act = activeAt(sc, lt), s = '';
    items.forEach(function (it, i) {
      var x = STAGE.x + i * (w + gap), p = prog(lt, ts[i], 0.6);
      var inner = card(x, y, w, bh, it.tone, { hi: act === i });
      var th = text(x + pad, y + 24, it.h, { size: 26, weight: 700, family: FD, fill: tone(it.tone).accent, maxW: w - 2 * pad, lh: 31 });
      inner += th.svg;
      if (it.b) inner += text(x + pad, y + 24 + th.h + 10, it.b, { size: 21, fill: C.text, maxW: w - 2 * pad, lh: 27 }).svg;
      s += g(inner, { opacity: p, dy: (1 - p) * 18 });
      if (i < n - 1) {
        var op = (sc.ops && sc.ops[i]) || sc.connector || 'arrow', pn = prog(lt, ts[i + 1] - 0.2, 0.5), cx = x + w + gap / 2, cy = y + bh / 2;
        if (op === 'arrow') s += arrow(x + w + 6, cy, x + w + gap - 6, cy, pn, C.cyan, 3);
        else if (op !== 'none') s += g('<text x="' + cx + '" y="' + (cy + 14) + '" font-family="' + FD + '" font-size="40" font-weight="700" fill="' + C.cyan + '" text-anchor="middle">' + esc(op) + '</text>', { opacity: pn });
      }
    });
    if (sc.note) s += g(text(640, y + bh + 26, sc.note, { size: 19, fill: C.muted, anchor: 'middle', maxW: 1100 }).svg, { opacity: prog(lt, ts[n - 1] + 0.6, 0.6) });
    return headingSvg(sc, lt) + s;
  };
  L.cycle = function (sc, lt) {
    var items = sc.items, n = items.length, top = stageTop(sc);
    var cx = 640, cy = top + (STAGE.bottom - top) / 2 + 4, rx = sc.rx || 410, ry = sc.ry || Math.min(150, (STAGE.bottom - top) / 2 - 44);
    var nw = sc.nodeW || 290, ts = reveals(sc, n), act = activeAt(sc, lt), s = '';
    var ang = function (i) { return -Math.PI / 2 + i * 2 * Math.PI / n; };
    // arcs first
    items.forEach(function (it, i) {
      var a1 = ang(i) + 0.32, a2 = ang(i + 1) - 0.32, pn = prog(lt, ts[(i + 1) % n] - 0.3, 0.6);
      if (i === n - 1) pn = prog(lt, ts[n - 1] + 0.6, 0.8);
      if (pn <= 0) return;
      var steps = 24, pts = [];
      for (var k = 0; k <= steps * pn; k++) { var a = a1 + (a2 - a1) * k / steps; pts.push((cx + rx * Math.cos(a)).toFixed(1) + ',' + (cy + ry * Math.sin(a)).toFixed(1)); }
      if (pts.length > 1) s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + C.cyan + '" stroke-width="3" stroke-opacity="0.75" stroke-linecap="round"/>';
      if (pn > 0.95) {
        var ea = a2, ex = cx + rx * Math.cos(ea), ey = cy + ry * Math.sin(ea), da = 0.02, bx = cx + rx * Math.cos(ea - da), by = cy + ry * Math.sin(ea - da);
        s += arrow(bx, by, ex, ey, 1, C.cyan, 3);
      }
    });
    items.forEach(function (it, i) {
      var p = prog(lt, ts[i], 0.6), x = cx + rx * Math.cos(ang(i)), y = cy + ry * Math.sin(ang(i));
      var hh = textH(it.h, nw - 28, 24, 700, FD, 29) + (it.b ? 6 + textH(it.b, nw - 28, 19, 400, FB, 24) : 0) + 30;
      var inner = card(x - nw / 2, y - hh / 2, nw, hh, it.tone, { hi: act === i });
      var th = text(x, y - hh / 2 + 16, it.h, { size: 24, weight: 700, family: FD, fill: tone(it.tone).accent, anchor: 'middle', maxW: nw - 28, lh: 29 });
      inner += th.svg;
      if (it.b) inner += text(x, y - hh / 2 + 16 + th.h + 6, it.b, { size: 19, fill: C.text, anchor: 'middle', maxW: nw - 28, lh: 24 }).svg;
      s += g(inner, { opacity: p, scale: 0.9 + 0.1 * p, cx: x, cy: y });
    });
    if (sc.center) s += g(text(cx, cy - 20, sc.center, { size: 26, weight: 700, family: FD, fill: C.heading, anchor: 'middle', maxW: 320, lh: 32 }).svg, { opacity: prog(lt, ts[n - 1] + 0.8, 0.7) });
    return headingSvg(sc, lt) + s;
  };
  L.stack = function (sc, lt) {
    var items = sc.items, n = items.length, top = stageTop(sc), gap = 12;
    var avail = STAGE.bottom - top - 10, lh = Math.min(sc.rowH || 92, (avail - (n - 1) * gap) / n);
    var order = sc.order === 'up' ? items.map(function (_, i) { return n - 1 - i; }) : items.map(function (_, i) { return i; });
    var ts = reveals(sc, n), act = activeAt(sc, lt), s = '', y0 = top + (avail - (n * lh + (n - 1) * gap)) / 2;
    var sideW = sc.side ? 150 : 0;
    items.forEach(function (it, i) {
      var k = order.indexOf(i), p = prog(lt, ts[k], 0.6);
      var w = sc.pyramid ? 520 + (STAGE.w - sideW - 520) * (i / Math.max(1, n - 1)) : STAGE.w - sideW;
      var x = STAGE.x + (STAGE.w - sideW - w) / 2, y = y0 + i * (lh + gap);
      var inner = card(x, y, w, lh, it.tone, { hi: act === i });
      var hw = Math.min(w * 0.3, 300);
      inner += text(x + 22, y + (lh - textH(it.h, hw, 26, 700, FD, 30)) / 2 - 2, it.h, { size: 26, weight: 700, family: FD, fill: tone(it.tone).accent, maxW: hw, lh: 30 }).svg;
      if (it.b) inner += text(x + 40 + hw, y + (lh - textH(it.b, w - hw - 60, 21, 400, FB, 26)) / 2 - 2, it.b, { size: 21, fill: C.text, maxW: w - hw - 60, lh: 26 }).svg;
      s += g(inner, { opacity: p, dx: (1 - p) * (sc.order === 'up' ? 0 : -24), dy: (1 - p) * (sc.order === 'up' ? 18 : 0) });
    });
    if (sc.side) {
      var pS = prog(lt, ts[n - 1] + 0.6, 0.8), sx = STAGE.x + STAGE.w - sideW + 40, yT = y0 + 8, yB = y0 + n * lh + (n - 1) * gap - 8;
      var my = (yT + yB) / 2;
      if (sc.side.down) s += arrow(sx, yT, sx, yB, pS, C.cyan, 3) + g('<text transform="translate(' + (sx + 26) + ',' + my + ') rotate(90)" text-anchor="middle" font-family="' + FB + '" font-size="19" font-weight="600" fill="' + C.cyan + '">' + esc(sc.side.down) + '</text>', { opacity: pS });
      if (sc.side.up) s += arrow(sx + 78, yB, sx + 78, yT, pS, C.violet, 3) + g('<text transform="translate(' + (sx + 104) + ',' + my + ') rotate(-90)" text-anchor="middle" font-family="' + FB + '" font-size="19" font-weight="600" fill="' + C.violet + '">' + esc(sc.side.up) + '</text>', { opacity: pS });
    }
    return headingSvg(sc, lt) + s;
  };
  L.columns = function (sc, lt) {
    var cols = sc.items, n = cols.length, gap = 28, top = stageTop(sc), w = (STAGE.w - (n - 1) * gap) / n;
    var ts = reveals(sc, n), act = activeAt(sc, lt), s = '';
    var hs = cols.map(function (c) { var hh = 24 + textH(c.h, w - 44, 28, 700, FD, 33) + 16; (c.lines || []).forEach(function (ln) { hh += textH(ln, w - 66, 22, 400, FB, 28) + 12; }); return hh + 14; });
    var h = Math.min(STAGE.bottom - top - 8, Math.max(sc.minH || 200, Math.max.apply(null, hs))), y0 = top + (STAGE.bottom - top - 8 - h) / 2;
    cols.forEach(function (c, i) {
      var x = STAGE.x + i * (w + gap), p = prog(lt, ts[i], 0.6);
      var inner = card(x, y0, w, h, c.tone, { hi: act === i });
      var th = text(x + 22, y0 + 24, c.h, { size: 28, weight: 700, family: FD, fill: tone(c.tone).accent, maxW: w - 44, lh: 33 });
      inner += th.svg;
      var y = y0 + 24 + th.h + 16;
      (c.lines || []).forEach(function (ln, j) {
        var pl = prog(lt, ts[i] + 0.35 + j * 0.35, 0.5);
        var tl = text(x + 44, y, ln, { size: 22, fill: C.text, maxW: w - 66, lh: 28 });
        inner += g('<circle cx="' + (x + 29) + '" cy="' + (y + 14) + '" r="4.5" fill="' + tone(c.tone).accent + '"/>' + tl.svg, { opacity: pl });
        y += tl.h + 12;
      });
      s += g(inner, { opacity: p, dy: (1 - p) * 18 });
    });
    return headingSvg(sc, lt) + s;
  };
  L.timeline = function (sc, lt) {
    var ms = sc.items, n = ms.length, top = stageTop(sc), y = top + (STAGE.bottom - top) / 2 + (sc.dy || 0);
    var x1 = STAGE.x + 60, x2 = STAGE.x + STAGE.w - 60, ts = reveals(sc, n), s = '';
    var pa = prog(lt, 0.2, 1.0);
    s += '<line x1="' + x1 + '" y1="' + y + '" x2="' + (x1 + (x2 - x1) * pa) + '" y2="' + y + '" stroke="' + C.border + '" stroke-width="4" stroke-linecap="round"/>';
    if (sc.travel) {
      var pt = clamp((lt - 0.6) / Math.max(1, (ts[n - 1] + 0.4 - 0.6)), 0, 1), dx = x1 + (x2 - x1) * pt * (ms[n - 1].pos);
      s += '<line x1="' + x1 + '" y1="' + y + '" x2="' + dx + '" y2="' + y + '" stroke="url(#grad)" stroke-width="4" stroke-linecap="round"/>';
      s += '<circle cx="' + dx + '" cy="' + y + '" r="8" fill="' + C.heading + '"/>';
    }
    ms.forEach(function (m, i) {
      var p = prog(lt, ts[i], 0.6), x = x1 + (x2 - x1) * m.pos, up = m.above != null ? m.above : i % 2 === 0, t = tone(m.tone);
      var lw = m.w || 230, lab = text(x, 0, m.h, { size: 23, weight: 700, family: FD, anchor: 'middle', maxW: lw, lh: 28 });
      var subH = m.b ? textH(m.b, lw, 18, 400, FB, 23) + 4 : 0, blockH = lab.h + subH;
      var by = up ? y - 34 - blockH : y + 30;
      var inner = '<circle cx="' + x + '" cy="' + y + '" r="11" fill="' + t.fill + '" stroke="' + t.accent + '" stroke-width="3"/>';
      inner += '<line x1="' + x + '" y1="' + (up ? y - 12 : y + 12) + '" x2="' + x + '" y2="' + (up ? y - 28 : y + 26) + '" stroke="' + t.accent + '" stroke-width="2" opacity="0.6"/>';
      inner += text(x, by, m.h, { size: 23, weight: 700, family: FD, fill: t.accent, anchor: 'middle', maxW: lw, lh: 28 }).svg;
      if (m.b) inner += text(x, by + lab.h + 4, m.b, { size: 18, fill: C.text, anchor: 'middle', maxW: lw, lh: 23 }).svg;
      s += g(inner, { opacity: p, dy: (1 - p) * (up ? 10 : -10) });
    });
    if (sc.startLabel) s += g(text(x1, y + (sc.labelsBelow ? 60 : 30), sc.startLabel, { size: 15, fill: C.muted, anchor: 'middle', family: FM }).svg, { opacity: pa });
    return headingSvg(sc, lt) + s;
  };
  L.bars = function (sc, lt) {
    var it = sc.items, n = it.length, top = stageTop(sc), lx = STAGE.x + (sc.labelW || 380), bw = STAGE.w - (sc.labelW || 380) - 170;
    var rh = Math.min(sc.rowH || 70, (STAGE.bottom - top - 10) / n), max = sc.max || Math.max.apply(null, it.map(function (d) { return Math.abs(d.v); }));
    var ts = reveals(sc, n), s = '', y0 = top + (STAGE.bottom - top - n * rh) / 2;
    it.forEach(function (d, i) {
      var p = prog(lt, ts[i], 0.9), y = y0 + i * rh, t = tone(d.tone), w = bw * Math.abs(d.v) / max * p;
      var lab = text(lx - 18, y + (rh - 14 - textH(d.label, (sc.labelW || 380) - 30, 21, 600, FB, 25)) / 2, d.label, { size: 21, weight: 600, fill: C.text, anchor: 'end', maxW: (sc.labelW || 380) - 30, lh: 25 });
      var inner = lab.svg + '<rect x="' + lx + '" y="' + (y + 10) + '" width="' + Math.max(w, 2) + '" height="' + (rh - 26) + '" rx="6" fill="' + t.accent + '" opacity="0.85"/>';
      inner += '<text x="' + (lx + w + 12) + '" y="' + (y + rh / 2 + 3) + '" font-family="' + FD + '" font-size="23" font-weight="700" fill="' + C.heading + '">' + esc(d.vl || d.v) + '</text>';
      s += g(inner, { opacity: prog(lt, ts[i], 0.4) });
    });
    if (sc.note) s += g(text(640, y0 + n * rh + 8, sc.note, { size: 18, fill: C.muted, anchor: 'middle', maxW: 1100 }).svg, { opacity: prog(lt, ts[n - 1] + 0.9, 0.6) });
    return headingSvg(sc, lt) + s;
  };
  L.custom = function (sc, lt) { return headingSvg(sc, lt) + sc.draw(lt, API, sc); };

  var API = { C: C, W: W, H: H, STAGE: STAGE, prog: prog, ease: ease, clamp: clamp, esc: esc, text: text, textH: textH, g: g, card: card, arrow: arrow, tone: tone, FD: FD, FB: FB, FM: FM, stageTop: stageTop };

  function captionAt(sc, lt) {
    var caps = sc.captions || (sc.caption ? [[0, sc.caption]] : []), cur = null, start = 0;
    caps.forEach(function (c) { if (lt >= c[0]) { cur = c[1]; start = c[0]; } });
    return cur ? { text: cur, start: start } : null;
  }
  function frame(inner, sc, lt, gt) {
    var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '">';
    s += '<defs><linearGradient id="grad" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#22d3ee"/><stop offset="0.55" stop-color="#3b82f6"/><stop offset="1" stop-color="#a78bfa"/></linearGradient>' +
      '<radialGradient id="glow" cx="0.5" cy="0" r="0.7"><stop offset="0" stop-color="#22d3ee" stop-opacity="0.13"/><stop offset="1" stop-color="#22d3ee" stop-opacity="0"/></radialGradient>' +
      '<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="rgba(125,211,252,0.05)" stroke-width="1"/></pattern></defs>';
    s += '<rect width="' + W + '" height="' + H + '" fill="' + C.bg + '"/><rect width="' + W + '" height="' + H + '" fill="url(#grid)"/><rect width="' + W + '" height="' + (H * 0.8) + '" fill="url(#glow)"/>';
    // brand bar
    s += '<g><rect x="48" y="30" width="16" height="16" rx="3" transform="rotate(45 56 38)" fill="url(#grad)"/>' +
      '<text x="78" y="45" font-family="' + FD + '" font-size="19" font-weight="700" fill="' + C.heading + '">RiskLens <tspan fill="' + C.blueBright + '">Australia</tspan></text>' +
      '<text x="1232" y="44" text-anchor="end" font-family="' + FM + '" font-size="13" font-weight="600" letter-spacing="1.5" fill="' + C.muted + '">' + esc((spec.label || '').toUpperCase()) + '</text></g>';
    var fade = Math.min(prog(lt, 0, 0.35), sc._last ? 1 : 1 - prog(lt, sc.dur - 0.35, 0.35));
    s += g(inner, { opacity: fade });
    var cap = captionAt(sc, lt);
    if (cap) {
      var cp = prog(lt, cap.start + 0.05, 0.4) * fade;
      var tl = text(0, 0, cap.text, { size: 29, maxW: CAP.w - 56, lh: 38, maxLines: 2 });
      var ty = CAP.y + (CAP.h - tl.h) / 2 - 2;
      s += g('<rect x="' + CAP.x + '" y="' + CAP.y + '" width="' + CAP.w + '" height="' + CAP.h + '" rx="16" fill="' + C.panel + '" stroke="' + C.border + '" stroke-width="1.5"/>' +
        text(640, ty, cap.text, { size: 29, fill: C.heading, anchor: 'middle', maxW: CAP.w - 56, lh: 38 }).svg, { opacity: cp });
    }
    return s + '</svg>';
  }

  window.RLV = {
    load: function (sp) {
      spec = sp; warnings = []; scenes = []; var t = 0;
      sp.scenes.forEach(function (sc, i) { sc._start = t; t += sc.dur; sc._last = i === sp.scenes.length - 1; scenes.push(sc); });
      this.duration = t;
      // render every scene once to collect layout warnings
      scenes.forEach(function (sc) {
        var times = [sc.dur * 0.9].concat((sc.captions || []).map(function (c) { return c[0] + 0.1; }));
        times.forEach(function (tt) { frame((L[sc.type] || L.statement)(sc, tt), sc, tt); });
      });
      this.warnings = warnings;
    },
    renderAt: function (t) {
      var sc = scenes[scenes.length - 1];
      for (var i = 0; i < scenes.length; i++) { if (t < scenes[i]._start + scenes[i].dur) { sc = scenes[i]; break; } }
      var lt = Math.min(t - sc._start, sc.dur);
      var svg = frame((L[sc.type] || L.statement)(sc, lt), sc, lt, t);
      if (svg !== this._last) { document.getElementById('stage').innerHTML = svg; this._last = svg; this.changed = true; } else this.changed = false;
    },
    transcript: function () {
      return scenes.map(function (sc) {
        var caps = sc.captions || (sc.caption ? [[0, sc.caption]] : []);
        return { start: sc._start, end: sc._start + sc.dur, visual: sc.visual || '', captions: caps.map(function (c) { return c[1]; }) };
      });
    },
    meta: function () { var m = {}; for (var k in spec) if (k !== 'scenes') m[k] = spec[k]; return m; }
  };
})();
