import { useSearchParams } from 'react-router';
import CalculatorSection from '../features/calculator/CalculatorSection';
import { usePageTitle } from '../hooks/usePageTitle';

export default function CalculatorPage() {
  usePageTitle('ब्याज कैलकुलेटर');
  const [params] = useSearchParams();
  const schemeId = params.get('scheme') ?? 'ppf';
  // key: re-initialise the calculator when a card links here with a different ?scheme=
  return <CalculatorSection key={schemeId} initialSchemeId={schemeId} index={null} />;
}
