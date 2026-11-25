import Badge from '../../components/ui/Badge';
import Icon from '../../components/ui/Icon';
import PassbookArt from './PassbookArt';
import './HeroCard.css';

export default function HeroCard() {
  return (
    <aside className="hero-card" aria-label="आधिकारिक बचत पासबुक">
      <div className="hero-card__head">
        <p><i aria-hidden="true" /> आधिकारिक बचत पासबुक</p>
        <Badge tone="amber">डाक विभाग 2025</Badge>
      </div>

      <div className="hero-card__art">
        <PassbookArt />
        <div className="hero-card__assure">
          <span><Icon name="trophy" size={16} /></span>
          <div>
            <small>सुरक्षा आश्वासन</small>
            <strong>100% सुरक्षित</strong>
          </div>
        </div>
      </div>

      <div className="hero-card__foot">
        <p><Icon name="shieldCheck" size={16} /> 100% संप्रभु गारंटी (सरकारी सुरक्षा)</p>
        <Badge tone="neutral">डाक विभाग, भारत सरकार</Badge>
      </div>
    </aside>
  );
}
