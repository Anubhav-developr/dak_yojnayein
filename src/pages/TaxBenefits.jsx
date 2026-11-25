import SectionHeading from '../components/ui/SectionHeading';
import TaxBenefitGrid from '../features/tax/TaxBenefitGrid';
import { usePageTitle } from '../hooks/usePageTitle';

export default function TaxBenefits() {
  usePageTitle('कर लाभ (टैक्स छूट)');
  return (
    <section className="section section--tint">
      <div className="container">
        <SectionHeading
          eyebrow="कर लाभ"
          title="किस योजना में कितनी टैक्स छूट?"
          subtitle="धारा 80C की छूट और ब्याज पर कर की स्थिति एक नज़र में।"
        />
        <TaxBenefitGrid />
      </div>
    </section>
  );
}
