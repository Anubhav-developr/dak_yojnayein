import { useMemo, useState } from 'react';
import Stage from '../../three/Stage';
import { buildCoinStacksScene } from '../../three/scenes/coinStacksScene';

const CAMERA = { fov: 28, position: [0, 1.15, 4.8], target: [0, 0.34, 0], fitAspect: 2.6 };

export default function CoinStacks3D({ principal, interest }) {
  const [failed, setFailed] = useState(false);
  const data = useMemo(() => ({ principal, interest }), [principal, interest]);
  if (failed) return null;
  return (
    <Stage
      className="coin-stage"
      build={buildCoinStacksScene}
      data={data}
      camera={CAMERA}
      label="सिक्कों के दो ढेर: चांदी के सिक्के मूल राशि और सोने के सिक्के ब्याज दर्शाते हैं"
      onUnsupported={() => setFailed(true)}
    />
  );
}
