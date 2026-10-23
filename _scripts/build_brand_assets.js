// Renders the share image, touch icon and favicon.ico from assets/brand/favicon.svg.
// Needs a local server on port 8765 (python3 -m http.server 8765) and Playwright.
// Run:  node _scripts/build_brand_assets.js
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || '/opt/node22/lib/node_modules/playwright');
const ROOT = path.resolve(__dirname, '..');
const BASE = 'http://localhost:8765';

const steps = `<svg class="art" viewBox="0 0 420 300"><rect x="20" y="200" width="110" height="80" rx="12" fill="#0b7a6b"/><rect x="150" y="150" width="110" height="130" rx="12" fill="#1d6fd1"/><rect x="280" y="90" width="110" height="190" rx="12" fill="#ffb020"/><path d="M335 90 V40" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M335 40 L374 53 L335 68 Z" fill="#fff"/><circle cx="62" cy="168" r="14" fill="#fff"/><path d="M62 184 V200" stroke="#fff" stroke-width="9" stroke-linecap="round"/><circle cx="52" cy="30" r="9" fill="#fff" opacity=".28"/><circle cx="176" cy="62" r="6" fill="#fff" opacity=".3"/><circle cx="252" cy="26" r="13" fill="#fff" opacity=".16"/></svg>`;
const card = `<!DOCTYPE html><html><head><link rel="stylesheet" href="${BASE}/styles.css"><style>
  body { margin:0; width:1200px; height:630px; overflow:hidden; background:#0b2a4a; }
  .c { position:relative; width:1200px; height:630px; box-sizing:border-box; padding:64px 72px; background:#0b2a4a; overflow:hidden; }
  .art { position:absolute; right:40px; bottom:56px; width:520px; height:auto; }
  .top { position:relative; display:flex; align-items:center; gap:16px; }
  .top img { width:56px; height:56px; }
  .name { font-family:Nunito, sans-serif; font-weight:900; font-size:36px; color:#fff; }
  .name span { color:#c9d5e8; font-weight:700; }
  h1 { position:relative; font-family:Nunito, sans-serif; font-weight:900; font-size:72px; line-height:1.06; letter-spacing:-1px; color:#fff; margin:56px 0 20px; max-width:640px; }
  p { position:relative; font-family:Lato, sans-serif; font-size:30px; line-height:1.3; color:#e3eaf5; margin:0; max-width:560px; }
  .tag { position:absolute; left:72px; bottom:58px; font-family:Lato, sans-serif; font-weight:900; font-size:24px; color:#ffb020; }
</style></head><body><div class="c">
  ${steps}
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
