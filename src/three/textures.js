import * as THREE from 'three';

const FONT = '"Noto Sans Devanagari", "Inter", system-ui, sans-serif';

function canvasTexture(w, h, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  const paint = () => {
    ctx.clearRect(0, 0, w, h);
    draw(ctx, w, h);
    tex.needsUpdate = true;
  };
  paint();
  // Re-paint once the web fonts (Devanagari) are ready, then ask the stage to redraw.
  const redraw = (cb) => {
    if (!document.fonts?.load) return;
    document.fonts.load(`700 40px ${FONT}`).then(() => { paint(); cb?.(); }).catch(() => {});
  };
  tex.userData.redraw = redraw;
  return tex;
}

// Airmail border + stamp + postmark: the classic "this is a letter" signal.
export function envelopeFront({ stamp = '#f59e0b', stampInk = '#7a4a05' } = {}) {
  return canvasTexture(640, 420, (ctx, w, h) => {
    ctx.fillStyle = '#fbf6ea';
    ctx.fillRect(0, 0, w, h);

    // diagonal red / blue airmail stripes
    const colors = ['#c8161d', '#fbf6ea', '#2b4fa0', '#fbf6ea'];
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.clip();
    for (let i = -h, c = 0; i < w + h; i += 28, c += 1) {
      ctx.fillStyle = colors[c % 4];
      ctx.beginPath();
      ctx.moveTo(i, 0); ctx.lineTo(i + 28, 0); ctx.lineTo(i + 28 - h * 0.6, h); ctx.lineTo(i - h * 0.6, h);
      ctx.closePath(); ctx.fill();
    }
    ctx.restore();
    ctx.fillStyle = '#fbf6ea';
    ctx.fillRect(22, 22, w - 44, h - 44);

    // stamp with perforated edge
    const sx = w - 190, sy = 52, sw = 118, sh = 146;
    ctx.fillStyle = '#fffdf7';
    ctx.fillRect(sx - 10, sy - 10, sw + 20, sh + 20);
    ctx.fillStyle = '#fbf6ea';
    for (let x = sx - 10; x <= sx + sw + 10; x += 14) {
      ctx.beginPath(); ctx.arc(x, sy - 10, 5, 0, 7); ctx.arc(x, sy + sh + 10, 5, 0, 7); ctx.fill();
    }
    for (let y = sy - 10; y <= sy + sh + 10; y += 14) {
      ctx.beginPath(); ctx.arc(sx - 10, y, 5, 0, 7); ctx.arc(sx + sw + 10, y, 5, 0, 7); ctx.fill();
    }
    ctx.fillStyle = stamp;
    ctx.fillRect(sx, sy, sw, sh);
    ctx.strokeStyle = stampInk; ctx.lineWidth = 3;
    ctx.strokeRect(sx + 8, sy + 8, sw - 16, sh - 16);
    ctx.fillStyle = stampInk;
    ctx.font = `800 64px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('₹', sx + sw / 2, sy + sh / 2 - 6);
    ctx.font = `700 15px ${FONT}`;
    ctx.fillText('INDIA POST', sx + sw / 2, sy + sh - 26);

    // postmark
    ctx.strokeStyle = 'rgba(30,20,70,0.5)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(sx - 56, sy + 74, 48, 0, 7); ctx.stroke();
    ctx.beginPath(); ctx.arc(sx - 56, sy + 74, 36, 0, 7); ctx.stroke();
    for (let k = 0; k < 4; k += 1) {
      ctx.beginPath();
      for (let x = sx - 4; x < sx + sw + 20; x += 6) {
        const y = sy + 52 + k * 16 + Math.sin((x + k * 9) / 7) * 4;
        x === sx - 4 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // address lines
    ctx.fillStyle = 'rgba(40,30,80,0.28)';
    [[70, 250, 300], [70, 292, 250], [70, 334, 200]].forEach(([x, y, lw]) => {
      ctx.fillRect(x, y, lw, 10);
    });
  });
}

export function envelopeBack() {
  return canvasTexture(640, 420, (ctx, w, h) => {
    ctx.fillStyle = '#f6efde';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(60,40,20,0.22)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(w / 2, h * 0.62); ctx.lineTo(w, 0); ctx.stroke();
    ctx.fillStyle = 'rgba(60,40,20,0.05)';
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(w / 2, h * 0.62); ctx.lineTo(w, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#c8161d';
    ctx.beginPath(); ctx.arc(w / 2, h * 0.62, 16, 0, 7); ctx.fill();
  });
}

// Lettering for the gold band around the pillar box.
export function bandText() {
  return canvasTexture(1024, 128, (ctx, w, h) => {
    ctx.fillStyle = '#7a0c10';
    ctx.font = `800 62px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('भारतीय डाक  •  INDIA POST', w / 2, h / 2 + 4);
  });
}

export function coinFace({ light = '#f7c548', dark = '#c98a10', ink = '#8a5a14' } = {}) {
  return canvasTexture(256, 256, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w * 0.4, h * 0.35, 10, w / 2, h / 2, w / 2);
    g.addColorStop(0, light); g.addColorStop(1, dark);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(w / 2, h / 2, w / 2, 0, 7); ctx.fill();
    ctx.strokeStyle = ink; ctx.globalAlpha = 0.55; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(w / 2, h / 2, w / 2 - 20, 0, 7); ctx.stroke();
    ctx.globalAlpha = 1; ctx.fillStyle = ink;
    ctx.font = `800 120px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('₹', w / 2, h / 2 + 6);
  });
}

export function passbookCover() {
  return canvasTexture(512, 700, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, '#4b3cb0'); g.addColorStop(1, '#2c2166');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#f2b632'; ctx.lineWidth = 5; ctx.strokeRect(28, 28, w - 56, h - 56);
    ctx.lineWidth = 2; ctx.strokeRect(40, 40, w - 80, h - 80);

    // chakra-style emblem
    const cx = w / 2, cy = 270;
    ctx.strokeStyle = '#f2b632'; ctx.fillStyle = '#f2b632';
    ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(cx, cy, 92, 0, 7); ctx.stroke();
    ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, 22, 0, 7); ctx.fill();
    for (let i = 0; i < 24; i += 1) {
      const a = (i / 24) * Math.PI * 2;
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 24, cy + Math.sin(a) * 24);
      ctx.lineTo(cx + Math.cos(a) * 88, cy + Math.sin(a) * 88); ctx.stroke();
    }

    ctx.fillStyle = '#fbf6ea'; ctx.textAlign = 'center';
    ctx.font = `800 52px ${FONT}`; ctx.fillText('डाक बचत', cx, 450);
    ctx.font = `700 40px ${FONT}`; ctx.fillText('पासबुक', cx, 506);
    ctx.fillStyle = '#f2b632'; ctx.font = `700 22px ${FONT}`;
    ctx.fillText('INDIA POST · SAVINGS', cx, 580);
  });
}
