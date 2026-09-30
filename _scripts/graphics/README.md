# Site graphics (3D renders)

The section graphics in `/assets/img/` are our own 3D renders, made with three.js (MIT licence) in the local headless browser. There are no stock photos, so there are no licence or attribution issues.

- `scenes.js`: one function per scene (lens, heatmap, compliance, governance and so on).
- `render.html`: loads a scene. `shoot.js` screenshots it.

To re-render (from this folder):

1. `npm i three@0.170.0` (installs `node_modules/`, which is not committed).
2. `python3 -m http.server 8766 &`
3. `node shoot.js out <scene>:<bg hex>:<width>:<height>:<output name>:<zoom>`, for example `node shoot.js out heatmap:ffffff:1600:1000:risk-management:1.28`.
4. Convert each PNG to WebP at two widths (1600 and 800; the home hero uses 2400 and 1200) into `/assets/img/<name>-<width>.webp`.

The background colour of each render must match the tile or hero it sits on: `f5f5f7` (light grey), `ffffff` (white) or `000000` (black). The list is in `IMAGES` in `_scripts/sync_layout.py`.
