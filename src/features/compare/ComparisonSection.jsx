import SectionHeading from '../../components/ui/SectionHeading';
import Badge from '../../components/ui/Badge';
import { RATES_PERIOD_SHORT } from '../../data/calcConfig';
import ComparisonTable from './ComparisonTable';

export default function ComparisonSection({ index = '04' }) {
  return (
    <section id="compare" className="section section--white">
      <div className="container">
        <SectionHeading
          index={index}
          eyebrow="संक्षिप्त तुलना तालिका"
          title="योजना तुलना तालिका"
          subtitle="ब्याज दर, लॉक-इन अवधि और आयकर लाभ का त्वरित विश्लेषण"
          aside={<Badge tone="outline">अद्यतन: {RATES_PERIOD_SHORT}</Badge>}
        />
        <ComparisonTable />
      </div>
    </section>
  );
}
