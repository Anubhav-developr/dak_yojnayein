import SchemeCard from './SchemeCard';
import './SchemeGrid.css';

export default function SchemeGrid({ schemes }) {
  return (
    <div className="scheme-grid">
      {schemes.map((s) => (
        <SchemeCard key={s.id} scheme={s} />
      ))}
    </div>
  );
}
