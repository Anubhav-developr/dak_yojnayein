import { goals } from '../../data/goals';
import Icon from '../../components/ui/Icon';
import './GoalFilter.css';

export default function GoalFilter({ goal, onChange }) {
  return (
    <div className="goal-filter" role="group" aria-label="लक्ष्य के अनुसार योजनाएं फ़िल्टर करें">
      {goals.map((g) => (
        <button
          key={g.id}
          type="button"
          className={`goal-filter__chip ${goal === g.id ? 'is-active' : ''}`}
          aria-pressed={goal === g.id}
          onClick={() => onChange(g.id)}
        >
          <Icon name={g.icon} size={15} />
          {g.label}
        </button>
      ))}
    </div>
  );
}
