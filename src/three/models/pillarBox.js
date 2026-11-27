import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { lacquerRed, goldMetal, darkMat } from '../materials';
import { bandText } from '../textures';

// The iconic India Post pillar box. Body is a single revolved profile with soft chamfers
// (the same trick as a Blender Lathe + Bevel), so silhouette edges catch light nicely.
export function createPillarBox() {
  const g = new THREE.Group();

  const pts = [];
  const P = (r, y) => pts.push(new THREE.Vector2(r, y));
  P(0.001, 0); P(0.70, 0); P(0.72, 0.02); P(0.72, 0.10); P(0.66, 0.16); // plinth
  P(0.60, 0.20); P(0.58, 0.25);                                          // fillet into body
  P(0.58, 1.02);
  P(0.61, 1.05); P(0.63, 1.10); P(0.63, 1.18); P(0.60, 1.22); P(0.58, 1.25); // collar
  for (let i = 1; i <= 18; i += 1) {                                      // dome
    const t = (i / 18) * (Math.PI / 2);
    P(Math.max(0.0005, 0.58 * Math.cos(t)), 1.25 + 0.42 * Math.sin(t));
  }
  const body = new THREE.Mesh(new THREE.LatheGeometry(pts, 128), lacquerRed());
  body.castShadow = true; body.receiveShadow = true;
  g.add(body);

  const gold = goldMetal();

  // finial
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 0.08, 24), gold);
  neck.position.y = 1.69;
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.075, 32, 24), gold);
  ball.position.y = 1.78;
  g.add(neck, ball);

  // gold band + edge rings
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.586, 0.586, 0.2, 96, 1, true), gold);
  band.position.y = 0.55;
  g.add(band);
  [0.45, 0.65].forEach((y) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.587, 0.013, 12, 96), gold);
    ring.rotation.x = Math.PI / 2; ring.position.y = y; g.add(ring);
  });

  // lettering on the front arc of the band
  const text = bandText();
  const arc = 1.9;
  const label = new THREE.Mesh(
    new THREE.CylinderGeometry(0.589, 0.589, 0.15, 64, 1, true, -arc / 2, arc),
    new THREE.MeshStandardMaterial({ map: text, transparent: true, roughness: 0.5, metalness: 0.2, polygonOffset: true, polygonOffsetFactor: -2 }),
  );
  label.position.y = 0.55;
  g.add(label);

  // posting slot
  const frame = new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.15, 0.14, 4, 0.025), gold);
  frame.position.set(0, 0.9, 0.53);
  const slot = new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.058, 0.14, 3, 0.02), darkMat());
  slot.position.set(0, 0.9, 0.545);
  slot.scale.z = 1.0;
  frame.castShadow = true;
  g.add(frame, slot);

  g.userData.textTexture = text;
  return g;
}
