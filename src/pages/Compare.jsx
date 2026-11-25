import ComparisonSection from '../features/compare/ComparisonSection';
import { usePageTitle } from '../hooks/usePageTitle';

export default function Compare() {
  usePageTitle('योजनाओं की तुलना');
  return <ComparisonSection index={null} />;
}
