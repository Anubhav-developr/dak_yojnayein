import { formatINR } from '../../utils/format';
import './ResultPanel.css';

export default function ResultPanel({ scheme, result }) {
  const { principal, maturity, interest, interestShare } = result;

  return (
    <div className="result" aria-live="polite">
      <div>
        <div className="result__head">
          <p className="result__eyebrow">
            <i aria-hidden="true" /> अनुमानित परिपक्वता मूल्य (MATURITY VALUE)
          </p>
          <span className="result__rate">{scheme.rate}% वार्षिक</span>
        </div>
        <p className="result__value">{formatINR(maturity)}</p>

        <div
          className="result__bar"
          role="img"
          aria-label={`मूल राशि ${Math.round(100 - interestShare)}%, ब्याज ${Math.round(interestShare)}%`}
        >
          <span className="result__bar-principal" style={{ width: `${100 - interestShare}%` }} />
          <span className="result__bar-interest" style={{ width: `${interestShare}%` }} />
        </div>
        <div className="result__legend">
          <span className="result__legend-principal">मूल निवेश राशि</span>
          <span className="result__legend-interest">कुल अर्जित ब्याज</span>
        </div>
      </div>

      <div className="result__boxes">
        <div>
          <small>मूल राशि (Principal)</small>
          <strong>{formatINR(principal)}</strong>
        </div>
        <div className="result__box--interest">
          <small>कुल अर्जित ब्याज</small>
          <strong>{formatINR(interest)}</strong>
        </div>
      </div>
    </div>
  );
}
