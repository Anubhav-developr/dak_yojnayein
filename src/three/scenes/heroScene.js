import * as THREE from 'three';
import { createPillarBox } from '../models/pillarBox';
import { createEnvelope } from '../models/envelope';
import { createCoinKit, COIN_HEIGHT } from '../models/coin';
import { createPassbook } from '../models/passbook';
import { MODEL_URLS } from '../modelConfig';
import { loadAndFit } from '../loadModel';

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const easeOutBack = (x) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
const easeOutBounce = (x) => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) return n1 * x * x;
  if (x < 2 / d1) { const y = x - 1.5 / d1; return n1 * y * y + 0.75; }
  if (x < 2.5 / d1) { const y = x - 2.25 / d1; return n1 * y * y + 0.9375; }
  const y = x - 2.625 / d1;
  return n1 * y * y + 0.984375;
};
const grow = (obj, k) => obj.scale.setScalar(Math.max(0.0001, k));

const STAMPS = [
  ['#f59e0b', '#7a4a05'],
  ['#4f3fa6', '#e8e2ff'],
  ['#16a34a', '#dcfce7'],
  ['#c8161d', '#ffe4e4'],
  ['#0ea5e9', '#e0f2fe'],
];

/**
 * Minimal India Post still-life: red pillar box, a ring of airmail envelopes,
 * a savings passbook and gold ₹ coins. Everything enters with a staggered pop-in.
 */
export function buildHeroScene({ scene, invalidate }) {
  let disposed = false;
  const root = new THREE.Group();
  scene.add(root);

  // invisible floor that only catches soft shadows
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(18, 18), new THREE.ShadowMaterial({ opacity: 0.2 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  root.add(floor);

  // pillar box (optionally replaced by a Blender .glb)
  const boxHolder = new THREE.Group();
  let box = createPillarBox();
  boxHolder.add(box);
  root.add(boxHolder);
  box.userData.textTexture?.userData.redraw?.(invalidate);
  if (MODEL_URLS.postBox) {
    loadAndFit(MODEL_URLS.postBox, 1.85).then((m) => {
      if (!m || disposed) return;
      boxHolder.remove(box);
      box = m;
      boxHolder.add(m);
      invalidate();
    });
  }

  // passbook
  const bookHolder = new THREE.Group();
  let book = createPassbook();
  bookHolder.add(book);
  root.add(bookHolder);
  book.userData.textures?.forEach((tx) => tx.userData.redraw?.(invalidate));
  if (MODEL_URLS.passbook) {
    loadAndFit(MODEL_URLS.passbook, 0.95).then((m) => {
      if (!m || disposed) return;
      bookHolder.remove(book);
      book = m;
      m.position.y -= 0.475;
      bookHolder.add(m);
      invalidate();
    });
  }

  // coin stack + flying coins
  const goldKit = createCoinKit();
  goldKit.texture.userData.redraw?.(invalidate);
  const stack = Array.from({ length: 7 }, (_, i) => {
    const coin = goldKit.make();
    coin.rotation.y = ((i * 37) % 11) * 0.5;
    const rest = COIN_HEIGHT / 2 + i * COIN_HEIGHT;
    coin.position.set(1.3 + (((i * 13) % 5) - 2) * 0.006, rest, 0.95);
    root.add(coin);
    return { coin, rest, i };
  });
  const flyers = [
    { base: new THREE.Vector3(1.85, 1.3, 0.5), phase: 0 },
    { base: new THREE.Vector3(-0.95, 2.0, 0.7), phase: 2 },
    { base: new THREE.Vector3(0.55, 2.15, -0.4), phase: 4 },
  ].map((f) => {
    const spinner = new THREE.Group();
    const coin = goldKit.make();
    coin.rotation.z = Math.PI / 2; // stand the coin on its edge so it flips like a spinning coin
    spinner.add(coin);
    root.add(spinner);
    return { ...f, spinner };
  });

  // airmail envelopes orbiting the box
  const envs = STAMPS.map(([stamp, stampInk], i) => {
    const g = createEnvelope({ stamp, stampInk });
    g.userData.textures.forEach((tx) => tx.userData.redraw?.(invalidate));
    root.add(g);
    return { g, phase: (i / STAMPS.length) * Math.PI * 2 };
  });

  return {
    update(t, dt, s) {
      const ease = (delay, dur = 0.9) => clamp01((t - delay) / dur);

      // box rises in, then sways gently so the 3D form reads
      const bi = ease(0, 1.1);
      grow(boxHolder, easeOutBack(bi));
      boxHolder.position.y = (1 - bi) * -0.45;
      boxHolder.rotation.y = Math.sin(t * 0.45) * 0.28 - 0.18;

      // passbook floats on the left
      grow(bookHolder, easeOutBack(ease(0.35)));
      bookHolder.position.set(-1.4, 0.64 + 0.06 * Math.sin(t * 0.9), 0.9);
      bookHolder.rotation.set(0.05 * Math.sin(t * 0.7), 0.6 + 0.12 * Math.sin(t * 0.5), -0.06);

      // coins drop onto the stack with a bounce
      stack.forEach(({ coin, rest, i }) => {
        const d = clamp01((t - 0.7 - i * 0.12) / 0.75);
        coin.visible = d > 0;
        coin.position.y = rest + (1 - easeOutBounce(d)) * 2.6;
      });
      flyers.forEach((f, i) => {
        grow(f.spinner, easeOutBack(ease(1.0 + i * 0.15)));
        f.spinner.position.set(
          f.base.x + Math.sin(t * 0.8 + f.phase) * 0.1,
          f.base.y + Math.sin(t * 1.1 + f.phase) * 0.12,
          f.base.z,
        );
        f.spinner.rotation.y = t * 2.2 + f.phase;
      });

      // envelopes circle the box (faces turned outward, so the back flap shows behind it)
      envs.forEach(({ g, phase }, i) => {
        grow(g, easeOutBack(ease(0.5 + i * 0.14)) * 0.95);
        const a = phase + t * 0.32;
        const r = 1.62 + 0.1 * Math.sin(t * 0.8 + i);
        g.position.set(
          Math.cos(a) * r,
          1.05 + 0.42 * Math.sin(a + i * 1.3) + 0.07 * Math.sin(t * 1.4 + i * 2),
          Math.sin(a) * r * 0.72,
        );
        g.rotation.set(0.12 * Math.cos(t * 0.9 + i), Math.PI / 2 - a + 0.2 * Math.sin(t * 0.6 + i), 0.18 * Math.sin(t * 0.7 + i * 1.7));
      });

      // pointer parallax + scroll
      root.rotation.y = s.pointer.x * 0.35 + s.scroll * 0.7;
      root.rotation.x = -s.pointer.y * 0.06;
      root.position.y = s.scroll * 0.5;
    },
    dispose() {
      disposed = true;
      goldKit.dispose();
    },
  };
}
