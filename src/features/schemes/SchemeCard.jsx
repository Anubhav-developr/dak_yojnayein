import { Link } from 'react-router';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import './SchemeCard.css';

export default function SchemeCard({ scheme }) {
  const { id, name, rate, tag, ribbon, highlighted, description, tenureLabel, minDeposit, taxStatus, taxExempt } = scheme;

  return (
    <article className={`scheme-card ${highlighted ? 'is-highlighted' : ''}`}>
      {ribbon && (
        <span className={`scheme-card__ribbon scheme-card__ribbon--${ribbon.tone}`}>
          <Icon name="star" size={11} /> {ribbon.label}
        </span>
      )}

      <div className="scheme-card__top">
        <div>
          <Badge tone="violet">{tag}</Badge>
          <h3>
            <Link to={`/schemes/${id}`}>{name}</Link>
          </h3>
        </div>
        <div className="scheme-card__rate">
          <strong>{rate}%</strong>
          <span>वार्षिक</span>
        </div>
      </div>

      <p className="scheme-card__desc">{description}</p>

      <dl className="scheme-card__facts">
        <div>
          <dt>अवधि</dt>
          <dd>{tenureLabel}</dd>
        </div>
        <div>
          <dt>न्यूनतम जमा</dt>
          <dd>{minDeposit}</dd>
        </div>
        <div className="scheme-card__tax">
          <dt>टैक्स स्थिति</dt>
          <dd className={taxExempt ? 'is-exempt' : ''}>
            {taxExempt && <Icon name="checkCircle" size={14} />}
            {taxStatus}
          </dd>
        </div>
      </dl>

      <Button
        to={`/calculator?scheme=${id}`}
        variant={highlighted ? 'amber' : 'soft'}
        block
        trailingIcon="arrowRight"
      >
        रिटर्न की गणना करें
      </Button>
    </article>
  );
}
