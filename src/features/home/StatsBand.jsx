import { stats } from '../../data/stats';
import './StatsBand.css';

export default function StatsBand() {
  return (
    <section className="stats" aria-label="एक नज़र में">
      <dl className="container stats__grid">
        {stats.map((s) => (
          <div key={s.label} className="stats__item">
            <dd className={`stats__value stats__value--${s.tone}`}>{s.value}</dd>
            <dt className="stats__label">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
