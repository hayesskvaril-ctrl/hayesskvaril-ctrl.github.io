const { chromium } = require('/opt/node22/lib/node_modules/playwright');
// usage: node shoot.js out_dir name:bg:w:h ...
(async () => {
  const [out, ...jobs] = process.argv.slice(2);
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  for (const j of jobs) {
    const [name, bg, w, h, file, zoom] = j.split(':');
    const p = await b.newPage({ viewport: { width: +w, height: +h } });
    const errs = []; p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(`http://localhost:8766/render.html?scene=${name}&bg=${bg}&w=${w}&h=${h}&zoom=${zoom || 1}`);
    await p.waitForFunction(() => window.DONE || window.ERR, null, { timeout: 180000 });
    const err = await p.evaluate(() => window.ERR);
    if (err) { console.log(name, 'ERROR', err); continue; }
    await p.locator('canvas').screenshot({ path: `${out}/${file || name + '-' + bg}.png` });
    console.log('ok', name, bg, errs.length ? errs.slice(0, 2) : '');
    await p.close();
  }
  await b.close();
})();
