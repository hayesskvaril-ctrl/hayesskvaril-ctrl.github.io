// Mandatory climate reporting: which group (and first reporting year) an entity falls into.
(function () {
  var w = document.getElementById('cg-tool');
  if (!w) return;
  var rev = w.querySelector('#cg-rev'), ast = w.querySelector('#cg-assets'), emp = w.querySelector('#cg-emp');
  var nger = w.querySelector('#cg-nger'), owner = w.querySelector('#cg-owner'), out = w.querySelector('.result');
  function twoOf(r, a, e, R, A, E) { return (r >= R) + (a >= A) + (e >= E) >= 2; }
  function update() {
    var r = +rev.value || 0, a = +ast.value || 0, e = +emp.value || 0, n = nger.value, o = owner.checked;
    var group = null, why = '';
    if (twoOf(r, a, e, 500, 1000, 500)) { group = 1; why = 'meets two of the three Group 1 size tests'; }
    else if (n === 'publication') { group = 1; why = 'is an NGER reporter meeting the publication threshold'; }
    else if (twoOf(r, a, e, 200, 500, 250)) { group = 2; why = 'meets two of the three Group 2 size tests'; }
    else if (n === 'other') { group = 2; why = 'is an NGER reporter'; }
    else if (o) { group = 2; why = 'is an asset owner with assets of $5 billion or more'; }
    else if (twoOf(r, a, e, 50, 25, 100)) { group = 3; why = 'meets two of the three Group 3 size tests'; }
    var start = { 1: '1 January 2025', 2: '1 July 2026', 3: '1 July 2027' };
    out.textContent = group ?
      'Group ' + group + ': this entity ' + why + '. First sustainability report is for the first financial year starting on or after ' + start[group] + '.' +
      (group === 3 ? ' Group 3 entities with no material climate-related risks or opportunities can make a statement to that effect instead of full disclosures (with reasons).' : '') :
      'On these figures the entity does not meet any group threshold, so it would not need a sustainability report under this regime (it may still choose to report voluntarily).';
  }
  w.addEventListener('input', update);
  w.addEventListener('change', update);
  update();
})();
