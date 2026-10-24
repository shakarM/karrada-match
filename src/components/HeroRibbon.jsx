/** Glossy liquid band inspired by the reference. Pure SVG, no image weight. */
export default function HeroRibbon({ className = "" }) {
  return (
    <svg viewBox="0 0 1200 440" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="band" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0" stopColor="#ff8a2a" />
          <stop offset="0.28" stopColor="#ff4f8b" />
          <stop offset="0.55" stopColor="#c04dff" />
          <stop offset="0.8" stopColor="#7b4dff" />
          <stop offset="1" stopColor="#cdbdff" />
        </linearGradient>
        <radialGradient id="glass" cx="0.45" cy="0.25" r="0.7">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffb36b" />
          <stop offset="0.5" stopColor="#ff6fb1" />
          <stop offset="1" stopColor="#e7dcff" />
        </linearGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <g className="ribbon">
        {/* back glow */}
        <ellipse cx="640" cy="360" rx="520" ry="200" fill="url(#band)" opacity="0.35" filter="url(#soft)" />
        {/* band body: outer ellipse minus inner ellipse */}
        <path
          fillRule="evenodd"
          fill="url(#band)"
          opacity="0.92"
          d="M80 380 C 120 200, 420 92, 700 98 C 980 104, 1180 230, 1150 420 L 1030 440 C 1060 330, 900 238, 700 236 C 500 234, 300 300, 240 440 Z"
        />
        {/* glass highlight */}
        <path
          fill="url(#glass)"
          d="M80 380 C 120 200, 420 92, 700 98 C 980 104, 1180 230, 1150 420 L 1030 440 C 1060 330, 900 238, 700 236 C 500 234, 300 300, 240 440 Z"
        />
        {/* inner fold */}
        <path
          d="M240 440 C 300 300, 500 234, 700 236 C 900 238, 1060 330, 1030 440"
          fill="none"
          stroke="#2b0b4a"
          strokeWidth="26"
          opacity="0.55"
          filter="url(#glow)"
        />
        {/* outer rim */}
        <path
          d="M80 380 C 120 200, 420 92, 700 98 C 980 104, 1180 230, 1150 420"
          fill="none"
          stroke="url(#rim)"
          strokeWidth="6"
          filter="url(#glow)"
        />
        <path
          d="M80 380 C 120 200, 420 92, 700 98 C 980 104, 1180 230, 1150 420"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          className="ribbon-sheen"
          opacity="0.9"
        />
        {/* internal light streaks */}
        <path d="M360 230 C 470 170, 610 150, 760 160" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.5" />
        <path d="M640 120 C 760 118, 880 140, 960 190" fill="none" stroke="#ffd1a6" strokeOpacity="0.8" strokeWidth="3" filter="url(#glow)" />
        <path d="M200 380 C 260 300, 330 260, 420 240" fill="none" stroke="#ffe0f0" strokeOpacity="0.6" strokeWidth="1.2" />
        <ellipse cx="780" cy="128" rx="70" ry="10" fill="#fff" opacity="0.35" filter="url(#glow)" />
      </g>
    </svg>
  );
}
