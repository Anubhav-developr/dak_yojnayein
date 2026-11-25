import SectionHeading from '../components/ui/SectionHeading';
import Icon from '../components/ui/Icon';
import { faqs } from '../data/faq';
import { usePageTitle } from '../hooks/usePageTitle';
import './Faq.css';

export default function Faq() {
  usePageTitle('अक्सर पूछे जाने वाले प्रश्न');
  return (
    <section className="section section--white">
      <div className="container faq">
        <SectionHeading eyebrow="सहायता" title="अक्सर पूछे जाने वाले प्रश्न" subtitle="डाक बचत योजनाओं से जुड़े सामान्य सवालों के जवाब।" />
        <div className="faq__list">
          {faqs.map((item) => (
            <details key={item.q} className="faq__item">
              <summary>
                {item.q}
                <Icon name="chevronDown" size={18} />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
