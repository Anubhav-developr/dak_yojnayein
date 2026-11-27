import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { violetCover, paperMat } from '../materials';
import { passbookCover } from '../textures';

export function createPassbook() {
  const g = new THREE.Group();
  const cover = violetCover();
  const board = (z) => {
    const m = new THREE.Mesh(new RoundedBoxGeometry(0.7, 0.95, 0.014, 3, 0.006), cover);
    m.position.z = z; m.castShadow = true; return m;
  };
  const spine = new THREE.Mesh(new RoundedBoxGeometry(0.03, 0.95, 0.08, 3, 0.012), cover);
  spine.position.x = -0.335;
  const pages = new THREE.Mesh(new RoundedBoxGeometry(0.66, 0.92, 0.056, 2, 0.004), paperMat());
  pages.position.x = 0.012;

  const tex = passbookCover();
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(0.7, 0.95),
    new THREE.MeshPhysicalMaterial({ map: tex, roughness: 0.45, clearcoat: 0.5, clearcoatRoughness: 0.35 }),
  );
  face.position.z = 0.0152;

  g.add(board(0.034), board(-0.034), spine, pages, face);
  g.userData.textures = [tex];
  return g;
}
