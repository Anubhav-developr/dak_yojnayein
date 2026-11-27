import Reveal from '../../components/ui/Reveal';
import SchemeCard from './SchemeCard';
import './SchemeGrid.css';

export default function SchemeGrid({ schemes }) {
  return (
    <div className="scheme-grid">
      {schemes.map((s, i) => (
        <Reveal key={s.id} delay={(i % 3) * 90} className="scheme-grid__cell">
          <SchemeCard scheme={s} />
        </Reveal>
      ))}
    </div>
  );
}
