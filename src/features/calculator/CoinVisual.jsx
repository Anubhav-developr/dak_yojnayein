import { lazy, Suspense } from 'react';
import SafeBoundary from '../../components/ui/SafeBoundary';

const CoinStacks3D = lazy(() => import('./CoinStacks3D'));

// 3D companion to the principal/interest bar. Renders nothing if WebGL is unavailable.
export default function CoinVisual({ principal, interest }) {
  return (
    <div className="coin-visual">
      <SafeBoundary fallback={null}>
        <Suspense fallback={null}>
          <CoinStacks3D principal={principal} interest={interest} />
        </Suspense>
      </SafeBoundary>
    </div>
  );
}
