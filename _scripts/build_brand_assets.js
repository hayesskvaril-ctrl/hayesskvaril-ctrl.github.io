// Renders the share image, touch icon and favicon.ico from assets/brand/favicon.svg.
// Needs a local server on port 8765 (python3 -m http.server 8765) and Playwright.
// Run:  node _scripts/build_brand_assets.js
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '/opt/node22/lib/node_modules/playwright');
const ROOT = path.resolve(__dirname, '..');
const BASE = 'http://localhost:8765';

const card = `<!DOCTYPE html><html><head><link rel="stylesheet" href="${BASE}/styles.css"><style>
  body { margin:0; width:1200px; height:630px; overflow:hidden; background:#f5f5f7; }
  .c { position:relative; width:1200px; height:630px; box-sizing:border-box; padding:64px 72px; background:#f5f5f7; overflow:hidden; }
  .art { position:absolute; right:-150px; bottom:-40px; width:820px; height:auto; }
  .top { position:relative; display:flex; align-items:center; gap:16px; }
  .top img { width:56px; height:56px; }
  .name { font-family:-apple-system, Inter, sans-serif; font-weight:600; font-size:34px; color:#1d1d1f; letter-spacing:-.5px; }
  .name span { color:#6e6e73; font-weight:500; }
  h1 { position:relative; font-family:-apple-system, Inter, sans-serif; font-weight:700; font-size:68px; line-height:1.05; letter-spacing:-2px; color:#1d1d1f; margin:64px 0 20px; max-width:600px; }
  p { position:relative; font-family:-apple-system, Inter, sans-serif; font-size:28px; line-height:1.3; color:#6e6e73; margin:0; max-width:520px; }
  .tag { position:absolute; left:72px; bottom:58px; font-family:-apple-system, Inter, sans-serif; font-weight:600; font-size:22px; color:#0071e3; }
</style></head><body><div class="c">
  <img class="art" src="${BASE}/assets/img/home-hero-1200.webp" alt="">
  <div class="top"><img src="${BASE}/assets/brand/favicon.svg" alt=""><div class="name">RiskLens <span>Australia</span></div></div>
  <h1>Risk, compliance and governance. Made clear.</h1>
  <p>Free plain-English guides, diagrams, tools and training.</p>
  <div class="tag">Free · No login · Australian focus</div>
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
