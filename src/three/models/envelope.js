import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { paperMat } from '../materials';
import { envelopeFront, envelopeBack } from '../textures';

export function createEnvelope({ stamp, stampInk, w = 0.8, h = 0.53 } = {}) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(w, h, 0.016, 3, 0.006), paperMat());
  body.castShadow = true;
  g.add(body);

  const frontTex = envelopeFront({ stamp, stampInk });
  const backTex = envelopeBack();
  const mat = (map) => new THREE.MeshStandardMaterial({ map, roughness: 0.85 });
  const front = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.004, h - 0.004), mat(frontTex));
  front.position.z = 0.0086;
  const back = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.004, h - 0.004), mat(backTex));
  back.position.z = -0.0086;
  back.rotation.y = Math.PI;
  g.add(front, back);

  g.userData.textures = [frontTex, backTex];
  return g;
}
