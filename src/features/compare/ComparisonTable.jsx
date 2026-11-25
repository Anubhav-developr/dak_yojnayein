import { Link } from 'react-router';
import Badge from '../../components/ui/Badge';
import { schemes } from '../../data/schemes';
import './ComparisonTable.css';

export default function ComparisonTable() {
  return (
    <div className="table-wrap" tabIndex={0} role="region" aria-label="योजना तुलना तालिका">
      <table className="compare">
        <thead>
          <tr>
            <th scope="col">योजना का नाम</th>
            <th scope="col">ब्याज दर</th>
            <th scope="col">लॉक-इन / अवधि</th>
            <th scope="col">कर लाभ</th>
            <th scope="col">भुगतान आवृत्ति</th>
          </tr>
        </thead>
        <tbody>
          {schemes.map((s) => (
            <tr key={s.id}>
              <th scope="row">
                <Link to={`/schemes/${s.id}`} className="compare__name">
                  <i className={`compare__dot compare__dot--${s.dot}`} aria-hidden="true" />
                  {s.name}
                </Link>
              </th>
              <td className="compare__rate">{s.rate}% वार्षिक</td>
              <td>{s.tenureLabel}</td>
              <td>
                <Badge tone={s.taxExempt ? 'green' : 'neutral'}>{s.tableTax}</Badge>
              </td>
              <td className="compare__payout">{s.payoutLabel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
