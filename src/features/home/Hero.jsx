import { Link } from 'react-router';
import Badge from '../../components/ui/Badge';
import Icon from '../../components/ui/Icon';
import GoalFilter from '../schemes/GoalFilter';
import HeroCard from './HeroCard';
import { useGoalFilter } from '../../hooks/useGoalFilter';
import { scrollToId } from '../../utils/format';
import './Hero.css';

export default function Hero() {
  const { goal, setGoal } = useGoalFilter();

  const handleGoal = (id) => {
    setGoal(id);
    scrollToId('schemes');
  };

  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <div className="hero__badges">
            <span className="hero__trust">
              <span className="hero__trust-gov"><Icon name="checkCircle" size={15} /> 100% भारत सरकार की गारंटी</span>
              <span className="hero__trust-risk"><Icon name="shieldCheck" size={14} /> शून्य बाजार जोखिम</span>
            </span>
            <span className="hero__dept"><Icon name="landmark" size={14} /> डाक विभाग, संचार मंत्रालय</span>
          </div>

          <Badge tone="violet" className="hero__tag">सॉवरेन सेविंग्स • राष्ट्रीय धरोहर</Badge>

          <h1 className="hero__title">
            हर जीवन लक्ष्य के लिए <span className="hero__gold">संप्रभु-</span>
            <span className="hero__violet">सुरक्षित बचत</span>, नए रूप में।
          </h1>

          <p className="hero__lead">
            शून्य बाज़ार जोखिम के साथ वित्त मंत्रालय द्वारा अधिसूचित लघु बचत योजनाओं की तुलना करें। सुरक्षित चक्रवृद्धि,
            गारंटीड त्रैमासिक पेंशन और दीर्घकालिक पारिवारिक लक्ष्यों के लिए निर्मित।
          </p>

          <div className="hero__filter">
            <div className="hero__filter-head">
              <p><i aria-hidden="true" /> 01 / अपने लक्ष्य के अनुसार योजना चुनें</p>
              <small>फ़िल्टर करने के लिए टैप करें</small>
            </div>
            <GoalFilter goal={goal} onChange={handleGoal} />
          </div>

          <Link to="/calculator" className="hero__link">अपने निवेश का लाइव रिटर्न कैलकुलेट करें</Link>
        </div>

        <HeroCard />
      </div>
    </section>
  );
}
