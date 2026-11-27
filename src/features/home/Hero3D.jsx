import { useState } from 'react';
import Stage from '../../three/Stage';
import { buildHeroScene } from '../../three/scenes/heroScene';

const CAMERA = { fov: 30, position: [0, 1.9, 8.6], target: [0, 0.8, 0], fitAspect: 1 };

export default function Hero3D({ fallback }) {
  const [failed, setFailed] = useState(false);
  if (failed) return fallback;
  return (
    <Stage
      build={buildHeroScene}
      camera={CAMERA}
      label="भारतीय डाक का लाल पिलर बॉक्स, उसके चारों ओर घूमते लिफाफे, बचत पासबुक और सोने के सिक्के"
      onUnsupported={() => setFailed(true)}
    />
  );
}
