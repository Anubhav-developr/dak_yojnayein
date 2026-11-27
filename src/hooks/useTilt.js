import { useRef } from 'react';

// Subtle 3D hover tilt (CSS perspective). Off on touch devices and for reduced-motion users.
export function useTilt(max = 6) {
  const ref = useRef(null);
  const canTilt =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onPointerMove = (e) => {
    const el = ref.current;
    if (!canTilt || !el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${px * max}deg`);
    el.style.setProperty('--rx', `${-py * max}deg`);
    el.style.setProperty('--lift', '-4px');
  };
  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    ['--rx', '--ry', '--lift'].forEach((k) => el.style.removeProperty(k));
  };
  return { ref, onPointerMove, onPointerLeave };
}
