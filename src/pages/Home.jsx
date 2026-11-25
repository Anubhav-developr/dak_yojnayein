import Hero from '../features/home/Hero';
import StatsBand from '../features/home/StatsBand';
import SchemesSection from '../features/schemes/SchemesSection';
import CalculatorSection from '../features/calculator/CalculatorSection';
import ComparisonSection from '../features/compare/ComparisonSection';
import { usePageTitle } from '../hooks/usePageTitle';

export default function Home() {
  usePageTitle('');
  return (
    <>
      <Hero />
      <StatsBand />
      <SchemesSection />
      <CalculatorSection />
      <ComparisonSection />
    </>
  );
}
