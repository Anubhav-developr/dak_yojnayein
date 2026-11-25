import { formatINR } from '../../utils/format';
import './ResultCard.css';

/**
 * eyebrow / badge  : top row
 * headline         : { value, sub }   the one number that matters for this scheme
 * bar              : { principal, interest, principalLabel?, interestLabel? }  (optional)
 * stats            : [{ label, value, tone? }]  value = number (₹) or string
 * children         : scheme-specific extra block (info box, callout)
 */
export default function ResultCard({ eyebrow, badge, headline, bar, stats = [], children }) {
  const total = bar ? bar.principal + bar.interest : 0;
  const interestShare = bar && total > 0 ? (bar.interest / total) * 100 : 0;

  return (
    <div className="result" aria-live="polite">
      <div>
        <div className="result__head">
          <p className="result__eyebrow"><i aria-hidden="true" /> {eyebrow}</p>
          {badge && <span className="result__rate">{badge}</span>}
        </div>
        <p className="result__value">{typeof headline.value === 'number' ? formatINR(headline.value) : headline.value}</p>
        {headline.sub && <p className="result__sub">{headline.sub}</p>}

        {bar && (
          <>
            <div className="result__bar" role="img" aria-label={`${Math.round(100 - interestShare)}% मूल राशि, ${Math.round(interestShare)}% ब्याज`}>
              <span className="result__bar-principal" style={{ width: `${100 - interestShare}%` }} />
              <span className="result__bar-interest" style={{ width: `${interestShare}%` }} />
            </div>
            <div className="result__legend">
              <span className="result__legend-principal">{bar.principalLabel ?? 'मूल निवेश राशि'}</span>
              <span className="result__legend-interest">{bar.interestLabel ?? 'कुल अर्जित ब्याज'}</span>
            </div>
          </>
        )}
      </div>

      {children}

      <div className="result__boxes">
        {stats.map((s) => (
          <div key={s.label} className={s.tone === 'amber' ? 'result__box--amber' : ''}>
            <small>{s.label}</small>
            <strong>{typeof s.value === 'number' ? formatINR(s.value) : s.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
