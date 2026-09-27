// Illustrative accountability map explorer (FAR page).
(function () {
  var w = document.getElementById('acc-map');
  if (!w) return;
  var PEOPLE = {
    ceo: { title: 'Chief Executive Officer', note: 'Overall management of the business, within the strategy set by the board.' },
    cfo: { title: 'Chief Financial Officer', note: 'Financial resources, financial reporting and, in this example, unit pricing.' },
    cro: { title: 'Chief Risk Officer', note: 'The risk management framework and the independent risk function.' },
    cco: { title: 'Head of Compliance (in some entities combined with the CRO)', note: 'Compliance framework and regulatory reporting, including breach reporting.' },
    cio: { title: 'Chief Investment Officer', note: 'Investment strategy and management of members\' savings.' },
    coo: { title: 'Chief Operating Officer', note: 'Member administration, technology and service providers in this example.' },
    cmo: { title: 'Chief Member Officer', note: 'Member experience, complaints, hardship and remediation in this example.' },
    hia: { title: 'Head of Internal Audit', note: 'The internal audit function, reporting to the board audit committee.' }
  };
  var ITEMS = [
    ['Management of the risk management framework', 'cro'],
    ['Management of the internal audit function', 'hia'],
    ['Management of breach reporting to regulators', 'cco'],
    ['Management of AML/CTF obligations', 'cco'],
    ['Investment of members\' savings', 'cio'],
    ['Member administration and contributions', 'coo'],
    ['Technology and information security', 'coo'],
    ['Management of material service providers', 'coo'],
    ['Complaints handling and hardship', 'cmo'],
    ['Customer remediation programs', 'cmo'],
    ['Financial resources and unit pricing', 'cfo'],
    ['Overall management of the entity\'s business', 'ceo']
  ];
  var select = w.querySelector('select');
  select.innerHTML = ITEMS.map(function (it, i) { return '<option value="' + i + '">' + it[0] + '</option>'; }).join('');
  var out = w.querySelector('.result');
  var grid = w.querySelector('.am-people');
  grid.innerHTML = Object.keys(PEOPLE).map(function (k) {
    return '<div class="am-person" data-k="' + k + '">' + PEOPLE[k].title + '</div>';
  }).join('');
  function update() {
    var it = ITEMS[+select.value], p = PEOPLE[it[1]];
    grid.querySelectorAll('.am-person').forEach(function (el) { el.classList.toggle('on', el.getAttribute('data-k') === it[1]); });
    out.innerHTML = '<strong>' + p.title + '</strong> is accountable for "' + it[0].toLowerCase() + '". ' + p.note;
  }
  select.addEventListener('change', update);
  update();
})();
