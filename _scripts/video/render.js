// Renders explainer videos from specs/<slug>.js to MP4 (H.264), a poster image and manifest data.
// Needs: a local server on port 8765 serving the repo root (python3 -m http.server 8765),
// Playwright (NODE_PATH or /opt/node22/lib/node_modules/playwright) and ffmpeg (FFMPEG env var, or
// `pip install imageio-ffmpeg`, which bundles one).
// Usage:  node _scripts/video/render.js [slug ...]            render all or the named videos
//         node _scripts/video/render.js --preview slug        write one PNG per scene to /tmp/rl-preview
const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');
const crypto = require('crypto');
let pw;
try { pw = require('playwright'); } catch (e) { pw = require('/opt/node22/lib/node_modules/playwright'); }

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'assets', 'video');
const MANIFEST = path.join(__dirname, 'manifest.json');
const FPS = 25;
const FFMPEG = process.env.FFMPEG || execSync('python3 -c "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"').toString().trim();

const args = process.argv.slice(2);
const preview = args[0] === '--preview';
const slugs = (preview ? args.slice(1) : args).length ? (preview ? args.slice(1) : args)
  : fs.readdirSync(path.join(__dirname, 'specs')).filter((f) => f.endsWith('.js')).map((f) => f.replace(/\.js$/, ''));

function encode(outFile) {
  const ff = spawn(FFMPEG, ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-tune', 'animation', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', outFile]);
  ff.stderr.on('data', (d) => process.stderr.write(d));
  return ff;
}
function write(stream, buf) {
  return new Promise((res) => { if (stream.write(buf)) res(); else stream.once('drain', res); });
}

(async () => {
  const browser = await pw.chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {};
  for (const slug of slugs) {
    await page.goto(`http://localhost:8765/_scripts/video/stage.html?v=${slug}`);
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
    const info = await page.evaluate(() => ({ duration: RLV.duration, warnings: RLV.warnings, transcript: RLV.transcript(), meta: RLV.meta() }));
    if (info.warnings.length) console.log(`  ${slug} warnings:\n    ` + info.warnings.join('\n    '));
    const stage = page.locator('#stage');
    if (preview) {
      const dir = '/tmp/rl-preview'; fs.mkdirSync(dir, { recursive: true });
      for (let i = 0; i < info.transcript.length; i++) {
        const sc = info.transcript[i];
        await page.evaluate((t) => RLV.renderAt(t), sc.start + (sc.end - sc.start) * 0.92);
        await stage.screenshot({ path: `${dir}/${slug}-${String(i).padStart(2, '0')}.png` });
      }
      console.log(`preview ${slug}: ${info.transcript.length} scenes, ${info.duration.toFixed(1)} s`);
      continue;
    }
    const file = path.join(OUT, `${slug}.mp4`);
    const ff = encode(file);
    const done = new Promise((res) => ff.on('close', res));
    const frames = Math.ceil(info.duration * FPS);
    let last = null;
    const t0 = Date.now();
    for (let f = 0; f < frames; f++) {
      const changed = await page.evaluate((t) => { RLV.renderAt(t); return RLV.changed; }, f / FPS);
      if (changed || !last) last = await stage.screenshot({ type: 'jpeg', quality: 93 });
      await write(ff.stdin, last);
    }
    ff.stdin.end();
    await done;
    // poster: the title scene once it has fully appeared
    const posterT = info.meta.posterAt != null ? info.meta.posterAt : Math.min(3.2, info.transcript[0].end - 0.2);
    await page.evaluate((t) => RLV.renderAt(t), posterT);
    await stage.screenshot({ path: path.join(OUT, `${slug}-poster.jpg`), type: 'jpeg', quality: 82 });
    const size = fs.statSync(file).size;
    const specHash = crypto.createHash('sha1').update(fs.readFileSync(path.join(__dirname, 'specs', slug + '.js'))).digest('hex').slice(0, 12);
    manifest[slug] = Object.assign({}, info.meta, { slug, specHash, duration: Math.round(info.duration), bytes: size, transcript: info.transcript });
    console.log(`rendered ${slug}: ${info.duration.toFixed(1)} s, ${(size / 1048576).toFixed(2)} MB, ${((Date.now() - t0) / 1000).toFixed(0)} s to render`);
  }
  if (!preview) fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1));
  await browser.close();
})();
