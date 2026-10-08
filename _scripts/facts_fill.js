// Fill {fact:ID} placeholders in HTML built from scripts/grc-builder-data.js (obligations library builders).
// Text gets a fact marker (<span class="fact" data-fact="ID">value</span>), which sync_layout.py keeps in step
// with the key facts register; attributes get the plain value (lower case inside data-text search attributes).
const fs = require('fs');
const path = require('path');
const FACTS = {};
JSON.parse(fs.readFileSync(path.join(__dirname, 'facts/facts.json'), 'utf8')).facts.forEach(f => { FACTS[f.id] = f.value; });
const PH = /\{fact:([a-z0-9-]+)\}/g;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function val(id) {
  if (!Object.prototype.hasOwnProperty.call(FACTS, id)) throw new Error('Unknown fact ID in placeholder: {fact:' + id + '}');
  return FACTS[id];
}
function fillHtml(html) {
  return html.replace(/<[^>]*>|[^<]+/g, chunk => {
    if (chunk.indexOf('{fact:') < 0) return chunk;
    if (chunk[0] === '<') {
      return chunk.replace(/(data-text=")([^"]*)/g, (m, a, b) => a + b.replace(PH, (x, id) => esc(val(id).toLowerCase())))
        .replace(PH, (x, id) => esc(val(id)));
    }
    return chunk.replace(PH, (x, id) => `<span class="fact" data-fact="${id}">${esc(val(id))}</span>`);
  });
}
module.exports = { fillHtml, FACTS };
