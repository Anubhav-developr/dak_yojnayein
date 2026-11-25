import { useState } from 'react';
import SchemePicker from './SchemePicker';
import FYAccountPanel from './panels/FYAccountPanel';
import TimeDepositPanel from './panels/TimeDepositPanel';
import RecurringDepositPanel from './panels/RecurringDepositPanel';
import NSCPanel from './panels/NSCPanel';
import KVPPanel from './panels/KVPPanel';
import MonthlyIncomePanel from './panels/MonthlyIncomePanel';
import SeniorCitizenPanel from './panels/SeniorCitizenPanel';
import SavingsAccountPanel from './panels/SavingsAccountPanel';
import { calcConfig } from '../../data/calcConfig';

// Each scheme "kind" has its own inputs, formulas and result layout.
const panels = {
  fyAccount: FYAccountPanel, // PPF, SSY
  td: TimeDepositPanel,      // 1Y / 2Y / 3Y / 5Y
  rd: RecurringDepositPanel,
  nsc: NSCPanel,
  kvp: KVPPanel,
  pomis: MonthlyIncomePanel,
  scss: SeniorCitizenPanel,
  posa: SavingsAccountPanel,
};

export default function Calculator({ initialSchemeId = 'ppf' }) {
  const [schemeId, setSchemeId] = useState(calcConfig[initialSchemeId] ? initialSchemeId : 'ppf');
  const config = calcConfig[schemeId];
  const Panel = panels[config.kind];

  const handleChange = (id) => {
    setSchemeId(id);
    // The panel remounts for a new scheme; hand focus back to the select.
    requestAnimationFrame(() => document.getElementById('scheme-select')?.focus());
  };

  // key: reset all inputs when the scheme changes
  return <Panel key={schemeId} config={config} picker={<SchemePicker value={schemeId} onChange={handleChange} />} />;
}
