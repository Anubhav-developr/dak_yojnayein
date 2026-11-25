import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { schemes } from '../data/schemes';
import { goals } from '../data/goals';

const validGoals = new Set(goals.map((g) => g.id));

// The selected goal lives in the URL (?goal=tax) so Hero chips and the
// scheme grid stay in sync and the filtered view can be shared.
export function useGoalFilter() {
  const [params, setParams] = useSearchParams();
  const raw = params.get('goal');
  const goal = validGoals.has(raw) ? raw : 'all';

  const setGoal = useCallback(
    (id) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (id === 'all') next.delete('goal');
          else next.set('goal', id);
          return next;
        },
        { replace: true, preventScrollReset: true },
      );
    },
    [setParams],
  );

  const visible = useMemo(
    () => (goal === 'all' ? schemes : schemes.filter((s) => s.goals.includes(goal))),
    [goal],
  );

  return { goal, setGoal, schemes: visible };
}
