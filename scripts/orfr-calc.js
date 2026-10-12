// ORFR calculator (SPS 114 page). Illustrative. The guidance percentages are read from the page's
// key-fact spans, so they follow the facts register.
(function () {
  var w = document.getElementById('orfr-calc');
  if (!w) return;
  function pct(id, dflt) {
    var f = document.querySelector('[data-fact="' + id + '"]'), t = f ? f.textContent.trim() : '', v = parseFloat(t);
    return isNaN(v) ? { v: parseFloat(dflt), t: dflt } : { v: v, t: t };
  }
  var tiers = { large: pct('orfr-min-large', '0.175%'), mid: pct('orfr-min-mid', '0.20%'), small: pct('orfr-min-small', '0.25%') };
  var el = {}; ['oc-fum', 'oc-target', 'oc-tol', 'oc-loss'].forEach(function (i) { el[i] = w.querySelector('#' + i); });
  var out = w.querySelector('.result');
  var money = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
  function m(x) { return money.format(Math.round(x * 1e6)); }
  function n(i) { var v = parseFloat(el[i].value); return isNaN(v) || v < 0 ? 0 : v; }
  function update() {
    var fum = n('oc-fum'), target = n('oc-target'), tol = Math.min(n('oc-tol'), 100), loss = n('oc-loss');
    if (!fum) { out.textContent = 'Enter the funds under management.'; return; }
    var band = fum > 165 ? 'large' : fum >= 30 ? 'mid' : 'small';
    var bandText = { large: 'more than $165 billion', mid: '$30 billion to $165 billion', small: 'less than $30 billion' }[band];
    var minM = fum * 1000 * tiers[band].v / 100;
    var h = 'Funds under management of ' + m(fum * 1000) + ' fall in the band for ' + bandText + (fum === 30 ? ' (APRA\'s table lists $30 billion in two bands)' : '') +
      '. APRA\'s guidance minimum is <strong>' + tiers[band].t + '</strong>, or about <strong>' + m(minM) + '</strong>.';
    if (target) {
      var limit = target * (1 - tol / 100);
      h += '<br>Your target of ' + m(target) + ' is ' + (target >= minM ? 'at or above' : '<strong>below</strong>') + ' that minimum. With a tolerance limit ' + tol + '% below target, the limit is <strong>' + m(limit) + '</strong>.';
      if (loss) {
        var after = target - loss;
        h += '<br>Paying ' + m(loss) + ' from a full reserve leaves ' + m(Math.max(after, 0)) + ': ' +
          (after < limit ? '<strong>below the tolerance limit</strong>, so a Board-approved replenishment plan is needed before it is put in place (paras 18 and 19).' : 'still above the tolerance limit, so SPS 114 does not require a replenishment plan.');
      }
    }
    out.innerHTML = h;
  }
  Object.keys(el).forEach(function (k) { el[k].addEventListener('input', update); });
  update();
})();
