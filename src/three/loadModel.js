import * as THREE from 'three';

// Loads a .glb lazily and scales it to `height`, with its base resting on y = 0.
export async function loadAndFit(url, height) {
  if (!url) return null;
  try {
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
    const gltf = await new GLTFLoader().loadAsync(url);
    const obj = gltf.scene;
    obj.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3());
    const s = height / (size.y || 1);
    obj.scale.setScalar(s);
    const fitted = new THREE.Box3().setFromObject(obj);
    const center = fitted.getCenter(new THREE.Vector3());
    obj.position.set(-center.x, -fitted.min.y, -center.z);
    const wrap = new THREE.Group();
    wrap.add(obj);
    return wrap;
  } catch (err) {
    console.warn('GLB load failed, using procedural model', err);
    return null;
  }
}
