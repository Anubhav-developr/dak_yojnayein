import './Postmark.css';

// Slowly rotating circular postmark: a pure-CSS/SVG India Post cue on top of the 3D scene.
export default function Postmark() {
  return (
    <svg className="postmark" viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <path id="postmark-ring" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
      </defs>
      <circle cx="60" cy="60" r="57" className="postmark__disc" />
      <g className="postmark__ring">
        <text className="postmark__text">
          <textPath href="#postmark-ring" textLength="286" lengthAdjust="spacing">
            भारतीय डाक • INDIA POST • भारतीय डाक • INDIA POST •
          </textPath>
        </text>
      </g>
      <circle cx="60" cy="60" r="30" className="postmark__inner" />
      <text x="60" y="73" textAnchor="middle" className="postmark__rupee">₹</text>
    </svg>
  );
}
