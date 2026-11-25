// Placeholder illustration (passbook, pen, tea cup). Replace with a real photo by
// swapping this component for <img src="/passbook.jpg" alt="…" /> inside HeroCard.
export default function PassbookArt() {
  return (
    <svg
      viewBox="0 0 560 420"
      role="img"
      aria-label="डाकघर बचत पासबुक, कलम और चाय का कप"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="pa-table" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6dde8" />
          <stop offset="1" stopColor="#b8a6bd" />
        </linearGradient>
        <linearGradient id="pa-cover" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3d5cab" />
          <stop offset="1" stopColor="#24366f" />
        </linearGradient>
        <linearGradient id="pa-pen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f3d58a" />
          <stop offset="1" stopColor="#b8860b" />
        </linearGradient>
      </defs>
      <rect width="560" height="420" fill="url(#pa-table)" />
      <polygon points="300,0 560,0 560,220" fill="#fff" opacity=".18" />
      <ellipse cx="120" cy="112" rx="74" ry="64" fill="#f7f2ee" />
      <ellipse cx="120" cy="112" rx="48" ry="42" fill="#fff" />
      <ellipse cx="120" cy="112" rx="35" ry="29" fill="#6b4630" />
      <g transform="rotate(-12 300 250)">
        <rect x="180" y="164" width="260" height="170" rx="10" fill="#000" opacity=".16" />
        <rect x="170" y="150" width="260" height="170" rx="10" fill="url(#pa-cover)" />
        <rect x="170" y="150" width="14" height="170" fill="#1b2a5a" opacity=".6" />
        <circle cx="300" cy="215" r="26" fill="none" stroke="#e9c46a" strokeWidth="3" />
        <circle cx="300" cy="215" r="8" fill="#e9c46a" />
        <rect x="236" y="262" width="128" height="6" rx="3" fill="#e9c46a" opacity=".9" />
        <rect x="256" y="276" width="88" height="5" rx="2.5" fill="#e9c46a" opacity=".6" />
      </g>
      <g transform="rotate(-32 430 330)">
        <rect x="330" y="322" width="200" height="14" rx="7" fill="url(#pa-pen)" />
        <polygon points="330,322 304,329 330,336" fill="#2a2a2a" />
      </g>
    </svg>
  );
}
