import { useMemo, useState } from 'react';
import { getScheme } from '../data/schemes';
import { calculateReturns } from '../utils/calc';

export const LIMITS = {
  amount: { min: 10000, max: 1500000, step: 10000 },
  years: { min: 1, max: 21, step: 1 },
};

export function useCalculator(initialSchemeId = 'ppf') {
  const [schemeId, setSchemeId] = useState(getScheme(initialSchemeId) ? initialSchemeId : 'ppf');
  const [amount, setAmount] = useState(150000);
  const [years, setYears] = useState(15);

  const scheme = getScheme(schemeId);
  const result = useMemo(
    () => calculateReturns({ principal: amount, ratePercent: scheme.rate, years, mode: scheme.calcMode }),
    [amount, years, scheme],
  );

  return { scheme, schemeId, setSchemeId, amount, setAmount, years, setYears, result };
}
