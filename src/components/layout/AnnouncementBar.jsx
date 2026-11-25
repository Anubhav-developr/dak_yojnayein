import { schemes, tickerOrder, getScheme } from '../../data/schemes';
import { RATES_PERIOD_SHORT } from '../../data/calcConfig';
import './AnnouncementBar.css';

const ticker = tickerOrder.map(getScheme).filter(Boolean);

export default function AnnouncementBar() {
  return (
    <div className="announce">
      <div className="container announce__inner">
        <div className="announce__lead">
          <span className="announce__pill">
            <i aria-hidden="true" />
            भारत सरकार अधिसूचित
          </span>
          <span className="announce__text">लघु बचत योजनाएं {RATES_PERIOD_SHORT}</span>
        </div>
        <ul className="announce__rates" aria-label={`${schemes.length} योजनाओं की वर्तमान ब्याज दरें`}>
          {ticker.map((s) => (
            <li key={s.id}>
              {s.hindiShort} ({s.shortName}): <strong>{s.rate}%</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
