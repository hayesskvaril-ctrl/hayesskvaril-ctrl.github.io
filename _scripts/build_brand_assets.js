// Renders the share image, touch icon and favicon.ico from assets/brand/favicon.svg.
// Needs a local server on port 8765 (python3 -m http.server 8765) and Playwright.
// Run:  node _scripts/build_brand_assets.js
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '/opt/node22/lib/node_modules/playwright');
const ROOT = path.resolve(__dirname, '..');
const BASE = 'http://localhost:8765';

const card = `<!DOCTYPE html><html><head><link rel="stylesheet" href="${BASE}/styles.css"><style>
  body { margin:0; width:1200px; height:630px; overflow:hidden; background:#05080f; }
  .c { position:relative; width:1200px; height:630px; box-sizing:border-box; padding:72px 80px;
       background: radial-gradient(900px 500px at 85% 10%, rgba(59,130,246,.28), transparent 60%),
                   radial-gradient(700px 480px at 0% 100%, rgba(167,139,250,.22), transparent 60%),
                   linear-gradient(rgba(125,211,252,.06) 1px, transparent 1px) 0 0/48px 48px,
                   linear-gradient(90deg, rgba(125,211,252,.06) 1px, transparent 1px) 0 0/48px 48px, #05080f; }
  .top { display:flex; align-items:center; gap:22px; }
  .top img { width:84px; height:84px; }
  .name { font-family:"Space Grotesk"; font-weight:700; font-size:50px; color:#f2f7ff; letter-spacing:-.5px; }
  .name span { background:linear-gradient(135deg,#22d3ee,#3b82f6 55%,#a78bfa); -webkit-background-clip:text; background-clip:text; color:transparent; }
  h1 { font-family:"Space Grotesk"; font-weight:700; font-size:66px; line-height:1.08; color:#f2f7ff; margin:70px 0 22px; max-width:960px; }
  p { font-family:"Inter"; font-size:30px; color:#93a4bf; margin:0; }
  .tag { position:absolute; left:80px; bottom:64px; font-family:"JetBrains Mono"; font-size:22px; color:#22d3ee; letter-spacing:1px; }
  .bar { position:absolute; left:0; right:0; bottom:0; height:10px; background:linear-gradient(90deg,#22d3ee,#3b82f6 55%,#a78bfa); }
</style></head><body><div class="c">
  <div class="top"><img src="${BASE}/assets/brand/favicon.svg" alt=""><div class="name">RiskLens <span>Australia</span></div></div>
  <h1>Risk, compliance and governance, explained.</h1>
  <p>Free plain-English guides, diagrams, tools and training.</p>
  <div class="tag">FREE · NO LOGIN · AUSTRALIAN FOCUS</div>
  <div class="bar"></div>
</div></body></html>`;

function ico(pngs) {
  // ICO container holding PNG images (supported by all current browsers)
  const head = Buffer.alloc(6 + 16 * pngs.length);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(pngs.length, 4);
  let offset = head.length;
  pngs.forEach(([size, buf], i) => {
    const o = 6 + 16 * i;
    head.writeUInt8(size >= 256 ? 0 : size, o); head.writeUInt8(size >= 256 ? 0 : size, o + 1);
    head.writeUInt16LE(1, o + 4); head.writeUInt16LE(32, o + 6);
    head.writeUInt32LE(buf.length, o + 8); head.writeUInt32LE(offset, o + 12);
    offset += buf.length;
  });
  return Buffer.concat([head, ...pngs.map(p => p[1])]);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(BASE + '/robots.txt').catch(() => {});  // same origin, so the site's font URLs resolve
  await page.setContent(card, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(ROOT, 'assets/brand/share-card.png') });

  const svg = fs.readFileSync(path.join(ROOT, 'assets/brand/favicon.svg'), 'utf8');
  async function icon(size) {
    const p = await browser.newPage({ viewport: { width: size, height: size } });
    await p.setContent(`<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`);
    const buf = await p.screenshot({ omitBackground: true });
    await p.close();
    return buf;
  }
  fs.writeFileSync(path.join(ROOT, 'assets/brand/apple-touch-icon.png'), await icon(180));
  fs.writeFileSync(path.join(ROOT, 'favicon.ico'), ico([[16, await icon(16)], [32, await icon(32)], [48, await icon(48)]]));
  await browser.close();
  console.log('wrote assets/brand/share-card.png, assets/brand/apple-touch-icon.png, favicon.ico');
})();
