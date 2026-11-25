import { Link } from 'react-router';
import Badge from '../../components/ui/Badge';
import Icon from '../../components/ui/Icon';
import { schemes } from '../../data/schemes';
import './TaxBenefitGrid.css';

const Row = ({ label, yes, yesText, noText }) => (
  <div className="tax-card__row">
    <dt>{label}</dt>
    <dd className={yes ? 'is-yes' : ''}>
      {yes && <Icon name="checkCircle" size={14} />}
      {yes ? yesText : noText}
    </dd>
  </div>
);

export default function TaxBenefitGrid() {
  return (
    <div className="tax-grid">
      {schemes.map((s) => (
        <article key={s.id} className="tax-card">
          <header>
            <h3><Link to={`/schemes/${s.id}`}>{s.name}</Link></h3>
            <Badge tone={s.taxExempt ? 'green' : 'neutral'}>{s.taxStatus}</Badge>
          </header>
          <dl>
            <Row label="निवेश पर 80C छूट" yes={s.section80C} yesText="हाँ" noText="नहीं" />
            <Row label="ब्याज पर कर" yes={!s.interestTaxable} yesText="कर-मुक्त" noText="कर योग्य" />
          </dl>
        </article>
      ))}
    </div>
  );
}
