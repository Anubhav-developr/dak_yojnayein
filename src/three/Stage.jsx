import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import './Stage.css';

/**
 * Owns one WebGL canvas: renderer, studio lighting (HDR-style environment + key/rim lights),
 * soft shadows, resize/visibility handling, pointer + scroll state, and clean disposal.
 *
 * build({ scene, camera, renderer, invalidate, reduced }) -> { update(t, dt, state), dispose? }
 * state = { pointer:{x,y} (-1..1, smoothed), scroll (0..1), reduced, data }
 */
export default function Stage({ build, data, label, camera: camCfg, onUnsupported, interactive = true, className = '' }) {
  const hostRef = useRef(null);
  const dataRef = useRef(data);
  const invalidateRef = useRef(null);
  dataRef.current = data;

  // When props change while the loop is paused (reduced motion), draw one fresh frame.
  useEffect(() => {
    invalidateRef.current?.();
  });

  useEffect(() => {
    const host = hostRef.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (err) {
      onUnsupported?.();
      return undefined;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.domElement.className = 'stage__canvas';
    host.appendChild(renderer.domElement);

    // ---- studio look ----
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new RoomEnvironment();
    const envTex = pmrem.fromScene(envScene, 0.04).texture;
    scene.environment = envTex;
    scene.environmentIntensity = 0.85;
    envScene.dispose?.();
    pmrem.dispose();

    const key = new THREE.DirectionalLight('#fff1dc', 2.2);
    key.position.set(3.2, 5.5, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.radius = 6;
    key.shadow.bias = -0.0004;
    Object.assign(key.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 18 });
    key.shadow.camera.updateProjectionMatrix();
    const rim = new THREE.DirectionalLight('#8b7bff', 1.1);
    rim.position.set(-4, 3, -3);
    const fill = new THREE.HemisphereLight('#ffffff', '#e9defa', 0.5);
    scene.add(key, rim, fill);

    // ---- camera ----
    const cfg = { fov: 30, position: [0, 1.9, 8.6], target: [0, 0.8, 0], fitAspect: 1, ...camCfg };
    const camera = new THREE.PerspectiveCamera(cfg.fov, 1, 0.1, 60);
    const basePos = new THREE.Vector3(...cfg.position);
    const target = new THREE.Vector3(...cfg.target);

    const resize = () => {
      const w = Math.max(1, host.clientWidth);
      const h = Math.max(1, host.clientHeight);
      renderer.setSize(w, h, false);
      const aspect = w / h;
      const k = Math.max(1, cfg.fitAspect / aspect); // narrow containers: pull the camera back
      camera.position.copy(target).addScaledVector(basePos.clone().sub(target), k);
      camera.aspect = aspect;
      camera.lookAt(target);
      camera.updateProjectionMatrix();
    };

    // ---- loop ----
    let raf = 0;
    let running = false;
    let visible = true;
    let disposed = false;
    let t = reduced ? 8 : 0;
    const clock = new THREE.Clock();
    const ptr = { x: 0, y: 0 };
    const state = { pointer: { x: 0, y: 0 }, scroll: 0, reduced, data: dataRef.current };
    let built = null;

    const draw = (dt) => {
      state.data = dataRef.current;
      built?.update?.(t, dt, state);
      renderer.render(scene, camera);
    };
    const invalidate = () => {
      if (!running && !disposed && built) draw(10);
    };
    invalidateRef.current = invalidate;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.05);
      t += dt;
      const k = Math.min(1, dt * 4);
      state.pointer.x += (ptr.x - state.pointer.x) * k;
      state.pointer.y += (ptr.y - state.pointer.y) * k;
      state.scroll = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      draw(dt);
    };
    const start = () => {
      if (running || reduced || disposed) return;
      running = true;
      clock.getDelta();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const sync = () => (visible && !document.hidden ? start() : stop());

    built = build({ scene, camera, renderer, invalidate, reduced });
    resize();
    draw(10);

    const onMove = (e) => {
      ptr.x = (e.clientX / window.innerWidth) * 2 - 1;
      ptr.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    if (interactive && !reduced) window.addEventListener('pointermove', onMove, { passive: true });

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw(10);
    });
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(host);
    document.addEventListener('visibilitychange', sync);
    sync();

    return () => {
      disposed = true;
      invalidateRef.current = null;
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('pointermove', onMove);
      built?.dispose?.();
      scene.traverse((o) => {
        o.geometry?.dispose?.();
        const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
        mats.forEach((m) => {
          Object.values(m).forEach((v) => v?.isTexture && v.dispose());
          m.dispose();
        });
      });
      envTex.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={hostRef} className={`stage ${className}`.trim()} role="img" aria-label={label} />;
}
