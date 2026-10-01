import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// "Glass and light" studio: abstract product-style renders with one accent colour per piece.
const q = new URLSearchParams(location.search);
const W = +q.get('w') || 1600, H = +q.get('h') || 1000, BG = '#' + (q.get('bg') || 'f5f5f7'), NAME = q.get('scene');
const ACC = new THREE.Color('#' + (q.get('acc') || '0071e3'));
const dark = new THREE.Color(BG).getHSL({}).l < 0.3;
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1); renderer.setSize(W, H);
renderer.toneMapping = THREE.NeutralToneMapping; renderer.toneMappingExposure = dark ? 1.0 : 1.0;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.VSMShadowMap;
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene(); scene.background = new THREE.Color(BG);

// custom studio environment: soft white dome, big overhead softbox, side strips, one accent panel
function studioEnv() {
  const env = new THREE.Scene();
  const dome = new THREE.Mesh(new THREE.SphereGeometry(50, 64, 32), new THREE.MeshBasicMaterial({ color: dark ? 0x0a0a0c : 0xd8d8de, side: THREE.BackSide }));
  env.add(dome);
  const panel = (w, h, col, int, pos, look) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(col).multiplyScalar(int), side: THREE.DoubleSide })); m.position.set(...pos); m.lookAt(...look); env.add(m); };
  panel(30, 30, 0xffffff, dark ? 3.0 : 3.0, [0, 30, 0], [0, 0, 0]);       // overhead softbox
  panel(dark ? 10 : 6, 40, 0xffffff, dark ? 9.0 : 4.0, [-28, 8, 6], [0, 0, 0]);   // left strip
  panel(dark ? 10 : 6, 40, 0xffffff, dark ? 6.0 : 2.5, [26, 6, 14], [0, 0, 0]);   // right strip
  panel(dark ? 8 : 4, 30, 0xffffff, dark ? 5.0 : 0, [0, 6, 30], [0, 0, 0]);       // front strip (dark only)
  panel(24, 16, ACC.getHex(), dark ? 7.0 : 3.0, [10, 6, -30], [0, 0, 0]); // accent panel behind
  panel(14, 10, ACC.getHex(), dark ? 3.5 : 1.2, [-18, 2, -20], [0, 0, 0]);
  const pm = new THREE.PMREMGenerator(renderer);
  return pm.fromScene(env, 0.02).texture;
}
scene.environment = studioEnv();
scene.environmentIntensity = dark ? 1.0 : 0.78;

const key = new THREE.DirectionalLight(0xffffff, dark ? 1.4 : 2.2);
key.position.set(-4, 12, 7); key.castShadow = true;
key.shadow.mapSize.set(4096, 4096); key.shadow.radius = 18; key.shadow.blurSamples = 30; key.shadow.bias = -0.0003;
Object.assign(key.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 0.5, far: 40 });
scene.add(key, key.target);
const rim = new THREE.DirectionalLight(ACC, dark ? 2.2 : 0.8); rim.position.set(6, 5, -9); scene.add(rim);
// cyclorama: a floor that curves up into a back wall, like a photo studio sweep
function cyc() {
  const shape = []; const R = 6, back = -14;
  for (let k = 0; k <= 40; k++) { const a = k / 40 * Math.PI / 2; shape.push(new THREE.Vector2(back + R - Math.sin(a) * R, R - Math.cos(a) * R)); }
  shape.push(new THREE.Vector2(back, 40));
  const pts = [new THREE.Vector2(40, 0), ...shape.reverse().reverse()];
  const geo = new THREE.BufferGeometry(); const pos = [], idx = []; const prof = [new THREE.Vector2(40, 0)].concat(shape);
  prof.forEach((p, i) => { pos.push(-60, p.y, p.x, 60, p.y, p.x); if (i) { const a = (i - 1) * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); } });
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setIndex(idx); geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: new THREE.Color(BG), roughness: 0.95, metalness: 0, envMapIntensity: dark ? 0.0 : 0.55, side: THREE.DoubleSide }));
  m.receiveShadow = true; return m;
}
const ground = cyc(); scene.add(ground);

const accHex = ACC.getHex();
const M = {
  glass: (tint = 0xffffff, rough = 0.02) => new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: rough, transmission: 1, thickness: 1.2, ior: 1.5, dispersion: 0.35, attenuationColor: new THREE.Color(tint), attenuationDistance: 2.2, specularIntensity: 1, envMapIntensity: 1.1 }),
  frost: (tint = 0xffffff) => new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0.38, transmission: 1, thickness: 1.0, ior: 1.45, attenuationColor: new THREE.Color(tint), attenuationDistance: 3, envMapIntensity: 1.0 }),
  ceramic: (c = 0xf7f7f9) => new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.55, metalness: 0, clearcoat: 0.25, clearcoatRoughness: 0.4, envMapIntensity: 0.8 }),
  alu: (c = 0xe3e4e8) => new THREE.MeshPhysicalMaterial({ color: c, metalness: 1, roughness: 0.32, envMapIntensity: 1.25 }),
  polished: (c = 0xf2f2f4) => new THREE.MeshPhysicalMaterial({ color: c, metalness: 1, roughness: 0.08, envMapIntensity: 1.3 }),
  graphite: () => new THREE.MeshPhysicalMaterial({ color: 0x2b2c30, metalness: 0.85, roughness: 0.38, clearcoat: 0.5, envMapIntensity: 1.0 }),
  accent: (c = accHex, rough = 0.3) => new THREE.MeshPhysicalMaterial({ color: c, metalness: 0.25, roughness: 0.42, clearcoat: 0.6, clearcoatRoughness: 0.3, sheen: 0.4, sheenRoughness: 0.6, sheenColor: new THREE.Color(0xffffff), envMapIntensity: 0.9 }),
  glow: (c = accHex, i = 1.6) => new THREE.MeshPhysicalMaterial({ color: c, emissive: c, emissiveIntensity: i, roughness: 0.4 }),
};
function add(g, m, pos = [0, 0, 0], rot = [0, 0, 0], parent = scene) { const o = new THREE.Mesh(g, m); o.position.set(...pos); o.rotation.set(...rot); o.castShadow = true; o.receiveShadow = true; parent.add(o); return o; }
const rbox = (w, h, d, r = 0.1) => new RoundedBoxGeometry(w, h, d, 10, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
const cam = new THREE.PerspectiveCamera(22, W / H, 0.1, 300);
function look(pos, target = [0, 0, 0], fov = 22) { cam.fov = fov; cam.position.set(...pos); cam.userData.target = new THREE.Vector3(...target); cam.lookAt(...target); cam.updateProjectionMatrix(); }
const rnd = (a) => { const x = Math.sin(a * 91.7 + 13.1) * 43758.5; return x - Math.floor(x); };

const SCENES = {
  hero() { // RiskLens: a thick glass lens refracting a row of spheres
    const lens = new THREE.Group(); scene.add(lens);
    const prof = [[0, -0.32], [1.9, -0.16], [2.05, 0], [1.9, 0.16], [0, 0.32]];
    const g = new THREE.LatheGeometry(prof.map(p => new THREE.Vector2(p[0], p[1])), 160);
    const disc = add(g, M.glass(0xeef4ff), [0, 0, 0], [Math.PI / 2, 0, 0], lens);
    add(new THREE.TorusGeometry(2.06, 0.07, 32, 200), M.polished(), [0, 0, 0], [0, 0, 0], lens);
    lens.position.set(0.2, 2.25, 1.2); lens.rotation.y = -0.38;
    const cols = [0x30b0c7, 0x0071e3, 0x5e5ce6, 0xbf5af2, 0xff375f];
    cols.forEach((c, k) => add(new THREE.SphereGeometry(0.34 + k * 0.1, 96, 64), M.accent(c, 0.25), [-2.3 + k * 1.15, 0.34 + k * 0.1, -1.4 - k * 0.05]));
    add(rbox(7.2, 0.12, 2.0, 0.06), M.ceramic(), [0, -0.06, -1.3]);
    look([1.5, 2.6, 13], [0, 1.5, 0], 22);
  },
  risk() { // a sphere resting near the edge of a cantilevered ledge
    add(rbox(4.2, 0.5, 2.2, 0.08), M.ceramic(), [-0.6, 1.7, 0]);
    add(rbox(1.1, 1.45, 1.6, 0.08), M.ceramic(0xececf0), [-2.0, 0.725, 0]);
    add(new THREE.SphereGeometry(0.55, 128, 96), M.accent(accHex, 0.22), [1.15, 2.5, 0.15]);
    add(new THREE.SphereGeometry(0.22, 64, 48), M.glass(0xffffff), [-1.4, 2.17, 0.5]);
    look([3, 3.4, 12], [0, 1.6, 0], 22);
  },
  compliance() { // precisely stacked glass panes, one accent
    for (let k = 0; k < 7; k++) add(rbox(3.2, 0.09, 2.2, 0.04), k === 4 ? M.glass(accHex) : M.glass(0xf2f6ff), [0, 0.05 + k * 0.2, 0], [0, k * 0.035, 0]);
    add(rbox(3.4, 0.1, 2.4, 0.04), M.alu(), [0, -0.05 + 1.5, 0], [0, 0.26, 0]);
    look([6, 5, 10], [0, 0.7, 0], 22);
  },
  governance() { // three glass panes in a row, receding
    [0, 1, 2].forEach(k => add(rbox(1.7, 3.0, 0.14, 0.05), k === 1 ? M.frost(accHex) : M.glass(0xf6f8ff), [k * 1.0 - 1.0, 1.5, -k * 1.4], [0, 0.55, 0]));
    add(new THREE.SphereGeometry(0.35, 96, 64), M.polished(), [-2.1, 0.35, 1.3]);
    look([6, 3, 11], [0, 1.4, -1.0], 22);
  },
  standards() { // cairn of polished discs
    const r = [1.6, 1.35, 1.1, 0.88, 0.66];
    let y = 0;
    r.forEach((rr, k) => { const h = 0.26; add(new THREE.CylinderGeometry(rr, rr, h, 128), k === 2 ? M.accent(accHex, 0.3) : (k % 2 ? M.ceramic() : M.alu()), [Math.sin(k) * 0.05, y + h / 2, 0]); y += h + 0.02; });
    add(new THREE.SphereGeometry(0.3, 96, 64), M.glass(0xffffff), [0, y + 0.3, 0]);
    look([4, 4.6, 10], [0, 0.9, 0], 22);
  },
  sectors() { // family of primitives
    add(rbox(6.2, 0.2, 2.0, 0.08), M.ceramic(), [0, 0.1, 0]);
    add(rbox(1.0, 1.0, 1.0, 0.12), M.ceramic(0xfafafc), [-2.2, 0.7, 0]);
    add(new THREE.CylinderGeometry(0.5, 0.5, 1.5, 96), M.alu(), [-0.9, 0.95, 0.1]);
    add(new THREE.SphereGeometry(0.62, 128, 96), M.accent(accHex, 0.25), [0.45, 0.82, 0]);
    add(new THREE.ConeGeometry(0.55, 1.3, 96), M.glass(0xffffff), [1.7, 0.85, -0.1]);
    add(new THREE.SphereGeometry(0.42, 96, 64), M.glass(0xffffff), [2.65, 0.62, 0.2]);
    look([2, 3, 13], [0.2, 0.7, 0], 22);
  },
  learn() {
    add(new THREE.CylinderGeometry(0.16, 0.16, 4.0, 64), M.polished(), [0, 2.0, 0]);
    for (let k = 0; k < 12; k++) { const g = new THREE.Group(); g.position.y = 0.2 + k * 0.32; g.rotation.y = -k * 0.5; scene.add(g);
      add(rbox(1.5, 0.2, 0.7, 0.06), k === 11 ? M.accent(accHex) : M.ceramic(k % 2 ? 0xfbfbfd : 0xefeff3), [0.9, 0, 0], [0, 0, 0], g); }
    look([4, 3.4, 10], [0, 1.9, 0], 22);
  },
  tools() { // precision knurled dial
    const g = new THREE.Group(); scene.add(g);
    add(new THREE.CylinderGeometry(1.9, 1.95, 0.5, 192), M.alu(), [0, 0.25, 0], [0, 0, 0], g);
    for (let k = 0; k < 120; k++) { const a = k / 120 * Math.PI * 2; add(rbox(0.05, 0.42, 0.06, 0.02), M.alu(0xd0d2d6), [Math.cos(a) * 1.95, 0.25, Math.sin(a) * 1.95], [0, -a, 0], g); }
    add(new THREE.CylinderGeometry(1.5, 1.5, 0.08, 160), M.graphite(), [0, 0.52, 0], [0, 0, 0], g);
    add(rbox(0.08, 0.04, 0.6, 0.02), M.glow(accHex, 2.5), [0, 0.57, -1.05], [0, 0, 0], g);
    for (let k = 0; k < 24; k++) { const a = k / 24 * Math.PI * 2; add(rbox(0.03, 0.02, k % 6 ? 0.1 : 0.2, 0.01), M.alu(), [Math.cos(a) * 1.35, 0.57, Math.sin(a) * 1.35], [0, -a + Math.PI / 2, 0], g); }
    g.rotation.y = 0.5;
    look([0, 5, 8.5], [0, 0.3, 0], 22);
  },
  news() { // a fanned stack of cards, the newest in the accent colour
    for (let k = 0; k < 5; k++) add(rbox(2.4, 0.06, 1.6, 0.06), k === 4 ? M.accent(accHex) : M.ceramic(k % 2 ? 0xfbfbfd : 0xededf1), [k * 0.1, 0.04 + k * 0.075, -k * 0.05], [0, 0.16 * k - 0.32, 0]);
    look([2.5, 3.6, 8], [0.2, 0.25, 0], 22);
  },
  cases() { // clear sphere on a plinth
    add(new THREE.CylinderGeometry(1.0, 1.0, 1.2, 128), M.ceramic(), [0, 0.6, 0]);
    add(new THREE.SphereGeometry(0.95, 160, 120), M.glass(0xffffff), [0, 2.15, 0]);
    add(new THREE.SphereGeometry(0.25, 64, 48), M.accent(accHex, 0.25), [-1.8, 0.25, 0.8]);
    look([2.5, 3, 11], [0, 1.4, 0], 22);
  },
  foundations() { // architectural stack of ceramic blocks
    add(rbox(3.4, 0.6, 2.0, 0.06), M.ceramic(), [0, 0.3, 0]);
    add(rbox(2.4, 0.6, 1.6, 0.06), M.ceramic(0xeeeef2), [0.3, 0.9, -0.1], [0, 0.18, 0]);
    add(rbox(1.4, 0.6, 1.2, 0.06), M.glass(0xffffff), [0.5, 1.5, -0.1], [0, 0.4, 0]);
    add(rbox(0.6, 0.6, 0.6, 0.06), M.accent(accHex, 0.3), [0.6, 2.1, 0], [0, 0.6, 0]);
    look([5, 4, 10], [0, 1.1, 0], 22);
  },
  async glossary() { // glass letterform
    const font = await new Promise(r => new FontLoader().load('./node_modules/three/examples/fonts/helvetiker_bold.typeface.json', r));
    const g = new TextGeometry('A', { font, size: 2.6, depth: 0.7, curveSegments: 32, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.04, bevelSegments: 10 });
    g.center(); add(g, M.glass(accHex), [0, 1.62, 0], [0, -0.35, 0]);
    add(new THREE.CylinderGeometry(1.8, 1.8, 0.2, 128), M.ceramic(), [0, 0.1, 0]);
    look([2, 3, 11], [0, 1.4, 0], 22);
  },
  cyber() { // glass cube guarding a glowing core
    add(rbox(2.2, 2.2, 2.2, 0.12), M.glass(0xffffff), [0, 1.1, 0], [0, 0.6, 0]);
    add(new THREE.SphereGeometry(0.55, 128, 96), M.glow(accHex, 1.2), [0, 1.1, 0]);
    look([4, 4, 10], [0, 1.1, 0], 22);
  },
  climate() { // frosted globe with an orbit
    add(new THREE.SphereGeometry(1.4, 160, 120), M.frost(accHex), [0, 1.6, 0]);
    add(new THREE.SphereGeometry(0.8, 96, 64), M.accent(accHex, 0.3), [0, 1.6, 0]);
    add(new THREE.TorusGeometry(2.1, 0.035, 24, 240), M.polished(), [0, 1.6, 0], [1.2, 0.25, 0]);
    look([1, 2.5, 11], [0, 1.6, 0], 22);
  },
  play() { // glass prism play shape
    const sh = new THREE.Shape(); sh.moveTo(-0.9, -1.1); sh.lineTo(1.25, 0); sh.lineTo(-0.9, 1.1); sh.closePath();
    const g = new THREE.ExtrudeGeometry(sh, { depth: 0.55, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.12, bevelSegments: 12 }); g.center();
    add(g, M.glass(accHex), [0, 1.35, 0], [0, -0.45, 0]);
    look([1.5, 2, 10], [0, 1.3, 0], 22);
  },
  about() { // three overlapping glass discs
    const cols = [0xffffff, accHex, 0xffffff];
    [0, 1, 2].forEach(k => add(new THREE.CylinderGeometry(1.15, 1.15, 0.14, 128), k === 1 ? M.glass(accHex) : M.glass(0xf4f7ff), [k * 1.1 - 1.1, 1.3 + (k === 1 ? 0.45 : 0), -k * 0.15], [Math.PI / 2 - 0.15, 0, 0]));
    look([1, 2.4, 11], [0, 1.4, 0], 22);
  },
  clock() { // concentric rings like a clock, with a single accent marker
    [2.0, 1.55, 1.1].forEach((r, k) => add(new THREE.TorusGeometry(r, 0.05 + k * 0.01, 32, 240), k === 1 ? M.ceramic() : M.polished(), [0, 1.9, 0], [0.2 + k * 0.12, -0.4 + k * 0.28, 0]));
    add(new THREE.SphereGeometry(0.2, 64, 48), M.accent(accHex, 0.25), [0.9, 3.15, 0.3]);
    add(new THREE.SphereGeometry(0.16, 64, 48), M.polished(), [0, 1.9, 0]);
    look([1, 2.6, 11], [0, 1.9, 0], 22);
  },
  incident() { // amber glass triangular prism
    const sh = new THREE.Shape(); sh.moveTo(0, 1.3); sh.lineTo(1.3, -0.95); sh.lineTo(-1.3, -0.95); sh.closePath();
    const g = new THREE.ExtrudeGeometry(sh, { depth: 0.9, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.08, bevelSegments: 8 }); g.center();
    add(g, M.glass(accHex), [0, 1.25, 0], [0, -0.5, 0]);
    add(rbox(3.2, 0.14, 2.2, 0.06), M.ceramic(), [0, 0.07, 0]);
    look([2, 3, 11], [0, 1.2, 0], 22);
  },
  rings() {
    add(new THREE.TorusGeometry(1.0, 0.14, 48, 160), M.polished(), [-0.9, 1.3, 0], [0, 0.5, 0]);
    add(new THREE.TorusGeometry(1.0, 0.14, 48, 160), M.accent(accHex), [0.15, 1.3, 0], [Math.PI / 2, 0.2, 0.4]);
    add(new THREE.TorusGeometry(1.0, 0.14, 48, 160), M.ceramic(0xfbfbfd), [1.15, 1.3, -0.1], [0, -0.5, 0]);
    look([1, 3.5, 11], [0, 1.3, 0], 22);
  },
  balance() {
    add(new THREE.ConeGeometry(0.42, 0.85, 96), M.ceramic(), [0, 0.425, 0]);
    add(rbox(4.4, 0.1, 0.36, 0.04), M.alu(), [0, 0.9, 0]);
    add(new THREE.SphereGeometry(0.5, 128, 96), M.accent(accHex), [-1.75, 1.45, 0]);
    add(rbox(0.75, 0.75, 0.75, 0.08), M.ceramic(0xfbfbfd), [1.75, 1.33, 0], [0, 0.4, 0]);
    look([1.5, 2.2, 11], [0, 0.9, 0], 22);
  },
  discs() {
    for (let k = 0; k < 8; k++) add(new THREE.CylinderGeometry(0.95, 0.95, 0.14, 128), k === 5 ? M.accent(accHex) : M.ceramic(k % 2 ? 0xfbfbfd : 0xeeeef2), [Math.sin(k * 1.9) * 0.06, 0.07 + k * 0.15, Math.cos(k * 1.3) * 0.06]);
    for (let k = 0; k < 4; k++) add(new THREE.CylinderGeometry(0.95, 0.95, 0.14, 128), M.alu(), [2.1, 0.07 + k * 0.15, -0.6]);
    look([3, 3.2, 11], [0.6, 0.7, 0], 22);
  },
  veil() {
    add(new THREE.SphereGeometry(1.0, 128, 96), M.accent(accHex), [0.7, 1.0, -0.9]);
    add(rbox(3.2, 3.6, 0.22, 0.1), M.frost(0xdfe6f2), [-0.2, 1.8, 0.4], [0, 0.25, 0]);
    add(rbox(3.4, 0.14, 0.6, 0.05), M.alu(), [-0.2, 0.07, 0.4], [0, 0.25, 0]);
    look([-3, 3.2, 12], [0, 1.4, 0], 22);
  },
  shelter() {
    add(new THREE.TorusGeometry(1.45, 0.5, 96, 200), M.frost(0xffffff), [0, 0.52, 0], [Math.PI / 2, 0, 0]);
    add(new THREE.SphereGeometry(0.62, 128, 96), M.accent(accHex), [0, 0.62, 0]);
    look([1, 4.2, 10], [0, 0.5, 0], 22);
  },
  ripples() { // speak up: rings spreading from a sphere
    add(new THREE.SphereGeometry(0.4, 96, 64), M.accent(accHex, 0.25), [0, 0.4, 0]);
    [0.9, 1.5, 2.1, 2.7].forEach((r, k) => add(new THREE.TorusGeometry(r, 0.04, 24, 240), k % 2 ? M.ceramic() : M.polished(), [0, 0.04 + k * 0.0, 0], [Math.PI / 2, 0, 0]));
    look([0, 4.5, 9], [0, 0.3, 0], 22);
  },
  weight() { // enforcement: a heavy monolith on a slab
    add(rbox(3.6, 0.2, 2.4, 0.06), M.ceramic(), [0, 0.1, 0]);
    add(rbox(1.5, 1.5, 1.5, 0.05), M.graphite(), [0, 0.95, 0], [0, 0.55, 0]);
    add(new THREE.SphereGeometry(0.18, 64, 48), M.accent(accHex, 0.25), [1.4, 0.38, 0.8]);
    look([3, 3, 11], [0, 0.9, 0], 22);
  },
  colonnade() {
    add(rbox(4.8, 0.22, 1.8, 0.05), M.ceramic(), [0, 0.11, 0]);
    for (let k = 0; k < 5; k++) add(new THREE.CylinderGeometry(0.2, 0.2, 2.2, 96), k === 2 ? M.accent(accHex) : M.ceramic(0xfbfbfd), [(k - 2) * 0.95, 1.32, 0]);
    add(rbox(4.8, 0.28, 1.8, 0.05), M.ceramic(), [0, 2.56, 0]);
    look([4, 2.6, 11], [0, 1.3, 0], 22);
  },
  cradle() { // super: a sphere cradled in a ceramic bowl
    const prof = []; for (let k = 0; k <= 24; k++) { const a = k / 24 * Math.PI / 2; prof.push(new THREE.Vector2(Math.sin(a) * 1.6 + 0.001, -Math.cos(a) * 0.9 + 0.9)); }
    for (let k = 24; k >= 0; k--) { const a = k / 24 * Math.PI / 2; prof.push(new THREE.Vector2(Math.sin(a) * 1.45 + 0.001, -Math.cos(a) * 0.78 + 0.95)); }
    add(new THREE.LatheGeometry(prof, 160), M.ceramic(), [0, 0, 0]);
    add(new THREE.SphereGeometry(0.85, 128, 96), M.accent(accHex, 0.22), [0, 1.05, 0]);
    look([1, 3.6, 10], [0, 0.8, 0], 22);
  },
};
function fit(zoom) {
  scene.updateMatrixWorld(true); const box = new THREE.Box3();
  scene.traverse(o => { if (o.isMesh && o !== ground) box.expandByObject(o); });
  const sph = box.getBoundingSphere(new THREE.Sphere());
  const tgt = cam.userData.target || new THREE.Vector3();
  const dir = cam.position.clone().sub(tgt).normalize();
  const vf = THREE.MathUtils.degToRad(cam.fov) / 2, hf = Math.atan(Math.tan(vf) * cam.aspect);
  const d = sph.radius / Math.sin(Math.min(vf, hf)) / zoom;
  cam.position.copy(sph.center).addScaledVector(dir, d); cam.lookAt(sph.center); cam.updateProjectionMatrix();
  key.target.position.copy(sph.center);
}
(async () => {
  await SCENES[NAME]();
  cam.aspect = W / H; fit(+(q.get('zoom') || 1.0));
  ground.position.z = Math.min(0, cam.userData.target ? cam.userData.target.z : 0);
  const comp = new EffectComposer(renderer);
  comp.addPass(new RenderPass(scene, cam));
  const ao = new GTAOPass(scene, cam, W, H); ao.output = GTAOPass.OUTPUT.Default;
  ao.updateGtaoMaterial({ radius: 0.6, distanceExponent: 1.5, thickness: 1.5, scale: 1.0, samples: 24 });
  ao.blendIntensity = dark ? 0.5 : 0.9;
  comp.addPass(ao); comp.addPass(new OutputPass());
  comp.render(); comp.render();
  window.DONE = true;
})().catch(e => { window.ERR = String(e.stack || e); });
