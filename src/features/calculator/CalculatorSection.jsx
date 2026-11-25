import SectionHeading from '../../components/ui/SectionHeading';
import Calculator from './Calculator';
import { RATES_PERIOD } from '../../data/calcConfig';

export default function CalculatorSection({ initialSchemeId = 'ppf', index = '03' }) {
  return (
    <section id="calculator" className="section section--tint">
      <div className="container">
        <SectionHeading
          index={index}
          eyebrow="इंटरैक्टिव रिटर्न कैलकुलेटर"
          title="अपने रिटर्न का लाइव अनुमान लगाएं"
          subtitle={`हर योजना के अपने नियम (ब्याज की गणना, भुगतान और जमा सीमा) के अनुसार। दरें: ${RATES_PERIOD}।`}
        />
        <Calculator initialSchemeId={initialSchemeId} />
      </div>
    </section>
  );
}
