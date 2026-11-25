import { formatINR } from '../../utils/format';
import './Extras.css';

// columns: [{ key, label, fmt? }]  rows: array of objects
export default function YearTable({ title, columns, rows }) {
  return (
    <details className="extra">
      <summary>{title}</summary>
      <div className="extra__scroll" tabIndex={0}>
        <table className="extra__table">
          <thead>
            <tr>{columns.map((c) => <th key={c.key} scope="col">{c.label}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {columns.map((c, ci) => {
                  const raw = row[c.key];
                  const text = c.fmt ? c.fmt(raw) : typeof raw === 'number' ? formatINR(raw) : raw;
                  return ci === 0 ? <th key={c.key} scope="row">{text}</th> : <td key={c.key}>{text}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
