# Site graphics (3D renders)

The graphics in `/assets/img/` are our own abstract 3D studio renders ("glass and light"), made with three.js (MIT licence) in the local headless browser. There are no stock photos, so there are no licence or attribution issues.

Art direction: one or two simple objects per image (glass, frosted glass, brushed aluminium, matte ceramic), lots of space, a curved studio backdrop, soft light and one accent colour per piece. Hint at the topic; never draw literal icons.

- `studio.js`: the studio (lighting, backdrop, materials) and one function per scene.
- `render.html`: loads a scene. `shoot.js` screenshots it.

To re-render (from this folder):

1. `npm i three@0.170.0` (installs `node_modules/`, which is not committed).
2. `python3 -m http.server 8766 &`
3. `node shoot.js out <scene>:<bg hex>:<width>:<height>:<output name>:<zoom>:<accent hex>`, for example `node shoot.js out risk:f5f5f7:1600:1000:risk-management:1.25:ff453a`.
4. Convert each PNG to WebP at two widths (1600 and 800; the home hero uses 2400 and 1200) into `/assets/img/<name>-<width>.webp`.

Image edges fade softly into tiles (CSS masks), so backgrounds don't need to match exactly. Use `f5f5f7` for light and `000000` for dark pieces. Where each image is used is set by `IMAGES` in `_scripts/sync_layout.py`.

Current set (scene → image, accent):
hero → home-hero (blue); risk → risk-management (red); compliance (blue); governance (indigo); standards (teal); sectors (green); learn (orange); tools (blue, dark); news (pink); cases → case-studies (purple, dark); foundations (blue); glossary (purple); cyber (sky, dark); climate (green); play → videos (blue, dark); about (indigo); clock → breach-clock (orange); incident (orange); rings → third-party (blue); balance → appetite (red); discs → coins (gold); veil → privacy (blue); shelter → resilience (red); ripples → speak-up (indigo); weight → enforcement (red); colonnade → regulators (blue); cradle → super (teal).
