import * as THREE from 'three';
import { coinFace } from '../textures';

const RIM = [
  new THREE.Vector2(0.0, -0.022), new THREE.Vector2(0.186, -0.022), new THREE.Vector2(0.2, -0.009),
  new THREE.Vector2(0.2, 0.009), new THREE.Vector2(0.186, 0.022), new THREE.Vector2(0.0, 0.022),
];

// Shared geometry; every coin lies flat (axis = +Y).
export function createCoinKit({ light, dark, ink, metal = '#ffffff' } = {}) {
  const rimGeo = new THREE.LatheGeometry(RIM, 64);
  const faceGeo = new THREE.CircleGeometry(0.172, 48);
  const faceTex = coinFace({ light, dark, ink });
  const rimMat = new THREE.MeshStandardMaterial({ color: dark ?? '#c98a10', metalness: 1, roughness: 0.3 });
  const faceMat = new THREE.MeshStandardMaterial({ map: faceTex, color: metal, metalness: 0.85, roughness: 0.32 });

  const make = () => {
    const c = new THREE.Group();
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.castShadow = true;
    const top = new THREE.Mesh(faceGeo, faceMat);
    top.rotation.x = -Math.PI / 2; top.position.y = 0.0225;
    const bottom = new THREE.Mesh(faceGeo, faceMat);
    bottom.rotation.x = Math.PI / 2; bottom.position.y = -0.0225;
    c.add(rim, top, bottom);
    return c;
  };
  return { make, texture: faceTex, dispose: () => { rimGeo.dispose(); faceGeo.dispose(); faceTex.dispose(); rimMat.dispose(); faceMat.dispose(); } };
}
export const COIN_HEIGHT = 0.046;
