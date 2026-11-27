import * as THREE from 'three';
import { createCoinKit, COIN_HEIGHT } from '../models/coin';

const N = 14; // coins in the tallest stack

// Two stacks: silver = principal, gold = interest. Heights keep the real ratio.
// Coins drop in / lift out smoothly whenever the calculator values change.
export function buildCoinStacksScene({ scene, invalidate }) {
  const silver = createCoinKit({ light: '#f6f4fc', dark: '#b8b2d4', ink: '#6a6382' });
  const gold = createCoinKit();
  [silver, gold].forEach((k) => k.texture.userData.redraw?.(invalidate));

  const root = new THREE.Group();
  root.scale.setScalar(1.5);
  scene.add(root);

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), new THREE.ShadowMaterial({ opacity: 0.35 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  root.add(floor);

  const stacks = [
    { kit: silver, x: -0.5 },
    { kit: gold, x: 0.5 },
  ].map(({ kit, x }) => ({
    coins: Array.from({ length: N }, (_, i) => {
      const obj = kit.make();
      obj.rotation.y = ((i * 29) % 7) * 0.6;
      const rest = COIN_HEIGHT / 2 + i * COIN_HEIGHT;
      obj.position.set(x + (((i * 11) % 5) - 2) * 0.005, rest + 2.2, 0);
      obj.scale.setScalar(0.0001);
      root.add(obj);
      return { obj, rest, y: rest + 2.2, s: 0 };
    }),
  }));

  return {
    update(t, dt, s) {
      const d = s.data ?? { principal: 1, interest: 1 };
      const max = Math.max(d.principal, d.interest, 1);
      const counts = [d.principal, d.interest].map((v) => (v > 0 ? Math.max(1, Math.round((N * v) / max)) : 0));

      stacks.forEach((st, si) => {
        st.coins.forEach((c, i) => {
          const on = i < counts[si];
          const k = Math.min(1, dt * Math.max(3, 9 - i * 0.45)); // lower coins settle first
          c.y += ((on ? c.rest : c.rest + 2.2) - c.y) * k;
          c.s += ((on ? 1 : 0) - c.s) * k;
          c.obj.position.y = c.y;
          c.obj.scale.setScalar(Math.max(c.s, 0.0001));
          c.obj.visible = c.s > 0.01;
        });
      });

      root.rotation.y = Math.sin(t * 0.5) * 0.35 + s.pointer.x * 0.3;
    },
    dispose() {
      silver.dispose();
      gold.dispose();
    },
  };
}
