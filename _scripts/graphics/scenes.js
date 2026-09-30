import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const q = new URLSearchParams(location.search);
const W = +q.get('w') || 1600, H = +q.get('h') || 1000, BG = '#' + (q.get('bg') || 'f5f5f7'), NAME = q.get('scene');
const dark = new THREE.Color(BG).getHSL({}).l < 0.3;
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1); renderer.setSize(W, H);
renderer.toneMapping = THREE.NeutralToneMapping; renderer.toneMappingExposure = dark ? 1.0 : 0.95;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene(); scene.background = new THREE.Color(BG);
const pm = new THREE.PMREMGenerator(renderer);
scene.environment = pm.fromScene(new RoomEnvironment(), 0.03).texture;
scene.environmentIntensity = dark ? 0.7 : 0.62;
const cam = new THREE.PerspectiveCamera(30, W / H, 0.1, 200);

// lights: soft key with shadow + rim
const key = new THREE.DirectionalLight(0xffffff, dark ? 1.4 : 1.8);
key.position.set(5, 10, 6); key.castShadow = true;
key.shadow.mapSize.set(4096, 4096); key.shadow.radius = 12; key.shadow.blurSamples = 25; key.shadow.bias = -0.0004;
Object.assign(key.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 0.5, far: 40 });
scene.add(key);
const rim = new THREE.DirectionalLight(dark ? 0x9ab8ff : 0xffffff, dark ? 1.6 : 0.6); rim.position.set(-6, 4, -8); scene.add(rim);
scene.add(new THREE.HemisphereLight(0xffffff, dark ? 0x111111 : 0xdddddd, dark ? 0.25 : 0.5));
// shadow catcher
const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.ShadowMaterial({ opacity: dark ? 0.6 : 0.24 }));
ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);

// materials
const M = {
  alu: () => new THREE.MeshPhysicalMaterial({ color: 0xe8eaee, metalness: 1, roughness: 0.22, clearcoat: 0.4, envMapIntensity: 1.6 }),
  graphite: () => new THREE.MeshPhysicalMaterial({ color: 0x3a3b40, metalness: 0.9, roughness: 0.35, clearcoat: 0.4 }),
  white: () => new THREE.MeshPhysicalMaterial({ color: 0xfbfbfd, metalness: 0, roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.12 }),
  gloss: (c) => new THREE.MeshPhysicalMaterial({ color: c, metalness: 0.0, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.06, envMapIntensity: 0.55 }),
  anod: (c) => new THREE.MeshPhysicalMaterial({ color: c, metalness: 0.85, roughness: 0.3, clearcoat: 0.6, clearcoatRoughness: 0.2 }),
  glass: (tint = 0xffffff) => new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0.0, transmission: 1, thickness: 0.6, ior: 1.45, attenuationColor: new THREE.Color(tint), attenuationDistance: 12, specularIntensity: 1, envMapIntensity: 0.5 }),
};
const C = { blue: 0x0071e3, indigo: 0x5e5ce6, teal: 0x30b0c7, green: 0x34c759, mint: 0x63d8b0, yellow: 0xffcc00, orange: 0xff9500, red: 0xff3b30, pink: 0xff2d55, purple: 0xaf52de, sky: 0x64d2ff };
function mesh(g, m, pos = [0, 0, 0], rot = [0, 0, 0]) {
  const o = new THREE.Mesh(g, m); o.position.set(...pos); o.rotation.set(...rot); o.castShadow = true; o.receiveShadow = true; scene.add(o); return o;
}
const rbox = (w, h, d, r = 0.12) => new RoundedBoxGeometry(w, h, d, 8, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
function look(pos, target = [0, 0, 0], fov = 30) { cam.fov = fov; cam.position.set(...pos); cam.userData.target = new THREE.Vector3(...target); cam.lookAt(...target); cam.updateProjectionMatrix(); }
function lathe(pts, seg = 128) { return new THREE.LatheGeometry(pts.map(p => new THREE.Vector2(p[0], p[1])), seg); }
function heatColour(s) { // s 1..25
  if (s >= 15) return C.red; if (s >= 10) return C.orange; if (s >= 5) return C.yellow; return C.green;
}

const SCENES = {
  lens() { // glass lens over a heat map
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
      const s = (i + 1) * (j + 1), h = 0.25 + s * 0.07;
      mesh(rbox(0.82, h, 0.82, 0.14), M.gloss(heatColour(s)), [(i - 2) * 0.95, h / 2, (2 - j) * 0.95]);
    }
    const lens = new THREE.Group();
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 1.9, 0.28, 128), M.glass(0xeaf4ff)); disc.castShadow = true;
    const bezel = new THREE.Mesh(new THREE.TorusGeometry(1.95, 0.13, 48, 160), M.alu()); bezel.rotation.x = Math.PI / 2; bezel.castShadow = true;
    lens.add(disc, bezel); lens.position.set(0.4, 2.7, 1.2); lens.rotation.set(0.95, 0.25, -0.2); scene.add(lens);
    look([7.5, 7.2, 9.5], [0.3, 1.0, 0.2], 30);
  },
  heatmap() {
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
      const s = (i + 1) * (j + 1), h = 0.2 + s * 0.09;
      mesh(rbox(0.86, h, 0.86, 0.16), M.gloss(heatColour(s)), [(i - 2) * 0.98, h / 2, (2 - j) * 0.98]);
    }
    mesh(rbox(5.4, 0.12, 5.4, 0.06), M.white(), [0, -0.06, 0]);
    look([8.5, 7.5, 8.5], [0, 0.6, 0], 30);
  },
  compliance() {
    for (let k = 0; k < 4; k++) mesh(rbox(3.2, 0.16, 4.1, 0.07), M.white(), [k * 0.05, 0.08 + k * 0.17, -k * 0.04], [0, 0.03 * k - 0.05, 0]);
    const sh = new THREE.Shape(); sh.moveTo(-1.1, 0.1); sh.lineTo(-0.35, -0.65); sh.lineTo(1.25, 0.95); sh.lineTo(0.95, 1.25); sh.lineTo(-0.35, -0.05); sh.lineTo(-0.8, 0.4); sh.closePath();
    const g = new THREE.ExtrudeGeometry(sh, { depth: 0.35, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.08, bevelSegments: 10 }); g.center();
    mesh(g, M.gloss(C.blue), [0.1, 1.75, 0.3], [-0.12, 0.62, 0.05]);
    look([6, 6.2, 7.5], [0, 0.9, 0], 30);
  },
  governance() { // three lines: three slabs
    const cols = [M.alu(), M.gloss(C.blue), dark ? M.white() : M.graphite()];
    [0, 1, 2].forEach(i => mesh(rbox(1.0, 1.4 + i * 0.9, 1.0, 0.18), cols[i], [(i - 1) * 1.45, (1.4 + i * 0.9) / 2, (1 - i) * 0.4]));
    if (!dark) mesh(rbox(5.2, 0.14, 2.6, 0.07), M.white(), [0, -0.07, 0]);
    look([5.5, 4.8, 8.5], [0, 1.2, 0], 30);
  },
  standards() { // stack of books / plates
    const cols = [C.blue, 0xf2f2f5, C.indigo, 0xd9dbe0, C.teal, 0xf2f2f5];
    cols.forEach((c, k) => mesh(rbox(3.0, 0.32, 2.2, 0.1), c === 0xd9dbe0 ? M.alu() : M.gloss(c), [Math.sin(k * 1.7) * 0.15, 0.16 + k * 0.34, Math.cos(k * 1.3) * 0.12], [0, (k % 2 ? 1 : -1) * 0.08 * k, 0]));
    look([6, 5.5, 7], [0, 1.0, 0], 30);
  },
  sectors() { // city on a disc
    mesh(new THREE.CylinderGeometry(3.2, 3.2, 0.2, 128), M.white(), [0, -0.1, 0]);
    const rnd = (a) => { const x = Math.sin(a * 91.7) * 43758.5; return x - Math.floor(x); };
    let n = 0;
    for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) {
      const x = i * 0.78, z = j * 0.78; if (x * x + z * z > 6.8) continue;
      const h = 0.4 + rnd(++n) * 2.4 * Math.max(0.25, 1 - (x * x + z * z) / 8);
      const m = n % 7 === 0 ? M.gloss(C.blue) : n % 5 === 0 ? M.glass(0xdfefff) : n % 3 === 0 ? M.alu() : M.white();
      mesh(rbox(0.6, h, 0.6, 0.08), m, [x, h / 2, z]);
    }
    look([8, 6.5, 8.5], [0, 0.8, 0], 30);
  },
  learn() { // stairs with a sphere
    for (let k = 0; k < 5; k++) mesh(rbox(1.1, 0.4 + k * 0.45, 1.6, 0.12), k === 4 ? M.gloss(C.blue) : M.white(), [(k - 2) * 1.12, (0.4 + k * 0.45) / 2, 0]);
    mesh(new THREE.SphereGeometry(0.42, 96, 64), M.gloss(C.orange), [2.24, 2.4 + 0.42, 0]);
    look([3.5, 4.5, 10], [0, 1.2, 0], 30);
  },
  tools() { // gauge dial
    const g = new THREE.Group(); scene.add(g);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.4, 0.35, 128), dark ? M.graphite() : M.white()); base.castShadow = base.receiveShadow = true; g.add(base);
    const bez = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.12, 40, 160), M.alu()); bez.rotation.x = Math.PI / 2; bez.position.y = 0.18; g.add(bez);
    const segs = [[C.green, 0], [C.yellow, 1], [C.orange, 2], [C.red, 3]];
    segs.forEach(([c, k]) => { const a0 = Math.PI * (1.0 - k * 0.25) - 0.02, t = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.16, 32, 64, Math.PI * 0.25 - 0.04), M.gloss(c)); t.rotation.x = -Math.PI / 2; t.rotation.z = a0 - Math.PI * 0.25 + 0.04; t.position.y = 0.26; t.castShadow = true; g.add(t); });
    const needle = new THREE.Mesh(rbox(0.12, 0.1, 1.7, 0.04), M.graphite()); needle.geometry.translate(0, 0, -0.75); needle.position.y = 0.32; needle.rotation.y = -0.75; needle.castShadow = true; g.add(needle);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.2, 64), M.alu()); hub.position.y = 0.34; g.add(hub);
    g.rotation.x = 0.0; g.position.y = 0.18;
    look([0, 5.2, 7.5], [0, 0.2, 0], 30);
  },
  news() { // floating cards
    const cols = [C.blue, C.orange, C.green];
    cols.forEach((c, k) => {
      const card = mesh(rbox(3.4, 0.12, 2.0, 0.06), M.white(), [k * 0.35 - 0.35, 0.6 + k * 0.75, -k * 0.35], [0, -0.35 + k * 0.08, 0]);
      mesh(rbox(0.5, 0.06, 0.5, 0.05), M.gloss(c), [k * 0.35 - 0.35 - 1.05, 0.69 + k * 0.75, -k * 0.35 - 0.35], [0, -0.35 + k * 0.08, 0]);
      for (let l = 0; l < 3; l++) mesh(rbox(1.6 - l * 0.35, 0.03, 0.12, 0.02), new THREE.MeshPhysicalMaterial({ color: 0xc7c7cc, roughness: 0.5 }), [k * 0.35 - 0.35 + 0.35, 0.67 + k * 0.75, -k * 0.35 - 0.45 + l * 0.3], [0, -0.35 + k * 0.08, 0]);
    });
    look([5.5, 6.5, 7.5], [0, 1.2, 0], 30);
  },
  magnifier() {
    const g = new THREE.Group(); scene.add(g);
    const glass = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.35, 0.16, 128), M.glass(0xeaf4ff)); glass.rotation.x = Math.PI / 2; glass.castShadow = true;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.42, 0.14, 48, 160), M.alu()); ring.castShadow = true;
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.2, 2.3, 64), M.graphite()); handle.position.set(1.95, -1.95, 0); handle.rotation.z = Math.PI / 4; handle.castShadow = true;
    g.add(glass, ring, handle); g.position.set(-0.2, 2.6, 0); g.rotation.set(-0.15, 0.5, 0.15);
    // documents beneath
    [0, 1, 2].forEach(k => mesh(rbox(2.6, 0.08, 3.4, 0.05), M.white(), [0.3 + k * 0.2, 0.04 + k * 0.09, -0.2 - k * 0.1], [0, 0.2 - k * 0.15, 0]));
    for (let l = 0; l < 6; l++) mesh(rbox(1.8 - (l % 3) * 0.4, 0.02, 0.12, 0.02), M.gloss(l === 2 ? C.red : 0xc7c7cc), [0.5 - (l % 3) * 0.2, 0.28, -1.3 + l * 0.45], [0, -0.1, 0]);
    look([4.5, 7, 8], [0.2, 1.1, 0], 30);
  },
  foundations() {
    const b = (x, y, z, m) => mesh(rbox(1.2, 1.2, 1.2, 0.18), m, [x, y + 0.6, z]);
    b(-1.3, 0, 0, M.white()); b(0, 0, 0, M.white()); b(1.3, 0, 0, M.white());
    b(-0.65, 1.3, 0, M.gloss(C.blue)); b(0.65, 1.3, 0, M.alu());
    b(0, 2.6, 0, M.gloss(C.orange));
    look([4.5, 5, 9.5], [0, 1.6, 0], 30);
  },
  async glossary() {
    const font = await new Promise(r => new FontLoader().load('./node_modules/three/examples/fonts/helvetiker_bold.typeface.json', r));
    const g = new TextGeometry('Aa', { font, size: 2.2, depth: 0.6, curveSegments: 24, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.05, bevelSegments: 8 });
    g.center(); g.translate(0, 1.35, 0);
    mesh(g, M.alu(), [0, 0, 0], [0, -0.3, 0]);
    look([2.5, 3.2, 9.5], [0, 1.2, 0], 30);
  },
  cyber() { // padlock
    const body = mesh(rbox(2.2, 1.8, 0.9, 0.3), M.graphite(), [0, 0.9, 0], [0, -0.45, 0]);
    const shackle = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.16, 48, 128, Math.PI), M.alu()); shackle.position.set(0, 1.8, 0); shackle.castShadow = true;
    const legs = [-0.72, 0.72].map(x => { const l = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.5, 48), M.alu()); l.position.set(x, 1.8 - 0.25 + 0.001, 0); l.castShadow = true; return l; });
    const sg = new THREE.Group(); sg.add(shackle, ...legs); sg.rotation.y = -0.45; scene.add(sg); sg.position.y = 0.05;
    const kh = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.1, 48), M.gloss(C.blue)); kh.rotation.x = Math.PI / 2; kh.position.set(0, 0.95, 0.46); body.add(kh); kh.position.set(0, 0.05, 0.46);
    look([2.5, 3.2, 8], [0, 1.25, 0], 30);
  },
  climate() {
    mesh(new THREE.SphereGeometry(1.5, 128, 96), M.gloss(C.teal), [0, 1.8, 0]);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.06, 32, 200), M.alu()); ring.position.y = 1.8; ring.rotation.set(1.25, 0.3, 0); ring.castShadow = true; scene.add(ring);
    mesh(new THREE.SphereGeometry(0.22, 64, 48), M.gloss(C.green), [2.1, 2.5, 0.6]);
    look([0, 3.5, 9.5], [0, 1.6, 0], 30);
  },
  play() {
    const disc = mesh(new THREE.CylinderGeometry(1.8, 1.8, 0.4, 128), M.gloss(C.blue), [0, 1.9, 0], [Math.PI / 2 - 0.25, 0, 0]);
    const sh = new THREE.Shape(); sh.moveTo(-0.45, -0.6); sh.lineTo(0.75, 0); sh.lineTo(-0.45, 0.6); sh.closePath();
    const g = new THREE.ExtrudeGeometry(sh, { depth: 0.15, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 6 });
    const tri = new THREE.Mesh(g, M.white()); tri.position.set(0.05, -0.0, 0.2); tri.rotation.x = 0; disc.add(tri); tri.rotation.x = -Math.PI / 2; tri.position.set(0.05, 0.2, 0);
    look([1.5, 3.0, 8.5], [0, 1.7, 0], 30);
  },
  shield() {
    const sh = new THREE.Shape(); sh.moveTo(0, 1.4); sh.bezierCurveTo(0.6, 1.1, 1.0, 1.1, 1.3, 1.15); sh.bezierCurveTo(1.35, 0.1, 1.0, -0.9, 0, -1.5); sh.bezierCurveTo(-1.0, -0.9, -1.35, 0.1, -1.3, 1.15); sh.bezierCurveTo(-1.0, 1.1, -0.6, 1.1, 0, 1.4);
    const g = new THREE.ExtrudeGeometry(sh, { depth: 0.45, bevelEnabled: true, bevelThickness: 0.14, bevelSize: 0.12, bevelSegments: 12, curveSegments: 48 }); g.center();
    mesh(g, M.gloss(C.blue), [0, 1.75, 0], [0, -0.35, 0]);
    look([1.5, 2.6, 9], [0, 1.6, 0], 30);
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
  // move key light shadow camera with the subject
  key.target.position.copy(sph.center); scene.add(key.target);
}
(async () => {
  await SCENES[NAME]();
  cam.aspect = W / H; fit(+(q.get('zoom') || 1.0));
  renderer.render(scene, cam); renderer.render(scene, cam);
  window.DONE = true;
})().catch(e => { window.ERR = String(e.stack || e); });
