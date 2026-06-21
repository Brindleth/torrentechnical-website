'use client';

/**
 * Discipline-specific animated technical schematics rendered as inline SVG.
 * Stroke-dash animation gives a "drawing / live signal" feel on hover.
 */
export default function Schematic({
  id,
  active,
}: {
  id: string;
  active: boolean;
}) {
  const stroke = active ? '#c9a961' : '#3f4f66';
  const props = {
    fill: 'none',
    stroke,
    strokeWidth: 1.2,
    vectorEffect: 'non-scaling-stroke' as const,
  };
  const dash = active ? 'animate-[dash_2s_linear_infinite]' : '';

  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full transition-colors duration-500"
      preserveAspectRatio="xMidYMid slice"
    >
      <style>{`@keyframes dash{to{stroke-dashoffset:-40}}@keyframes spin360{to{transform:rotate(360deg)}}`}</style>
      {id === 'electronics-embedded' && (
        <g {...props}>
          <path d="M20 60h40v-20h80v40h40" strokeDasharray="6 4" className={dash} />
          <path d="M20 120h60v40h60v-40h40" strokeDasharray="6 4" className={dash} />
          <rect x="80" y="80" width="40" height="40" rx="2" />
          <circle cx="100" cy="100" r="3" fill={stroke} />
          <circle cx="60" cy="40" r="3" fill={stroke} />
          <circle cx="180" cy="80" r="3" fill={stroke} />
          <circle cx="80" cy="160" r="3" fill={stroke} />
        </g>
      )}
      {id === 'automation-controls' && (
        <g {...props}>
          {[40, 80, 120, 160].map((y) => (
            <path key={y} d={`M20 ${y}h60M120 ${y}h60`} />
          ))}
          {[40, 80, 120, 160].map((y) => (
            <rect key={y} x="80" y={y - 10} width="40" height="20" rx="2" strokeDasharray="4 3" className={dash} />
          ))}
          <line x1="20" y1="20" x2="20" y2="180" />
          <line x1="180" y1="20" x2="180" y2="180" />
        </g>
      )}
      {id === 'defence-aerospace' && (
        <g {...props}>
          <circle cx="100" cy="100" r="30" />
          <circle cx="100" cy="100" r="60" strokeOpacity="0.5" />
          <circle cx="100" cy="100" r="85" strokeOpacity="0.3" />
          <line x1="100" y1="15" x2="100" y2="185" strokeOpacity="0.3" />
          <line x1="15" y1="100" x2="185" y2="100" strokeOpacity="0.3" />
          <g style={{ transformOrigin: '100px 100px', animation: active ? 'spin360 4s linear infinite' : 'none' }}>
            <path d="M100 100L100 20" />
            <path d="M100 20a80 80 0 0 1 50 18" strokeOpacity="0.6" />
          </g>
          <circle cx="100" cy="100" r="3" fill={stroke} />
        </g>
      )}
      {id === 'electrical-power' && (
        <g {...props}>
          <path d="M30 100h40l15-40 30 80 15-40h40" strokeDasharray="8 4" className={dash} />
          <path d="M100 20v30M100 150v30" />
          <polygon points="90,60 110,60 100,80" fill={stroke} fillOpacity="0.4" />
          <circle cx="30" cy="100" r="3" fill={stroke} />
          <circle cx="170" cy="100" r="3" fill={stroke} />
        </g>
      )}
      {id === 'software-industry' && (
        <g {...props} fontFamily="monospace" fontSize="11">
          <text x="25" y="55" fill={stroke}>{'{ }'}</text>
          <path d="M20 75h160M20 105h120M20 135h150" strokeDasharray="100 60" className={dash} />
          <rect x="20" y="25" width="160" height="150" rx="3" strokeOpacity="0.4" />
          <circle cx="35" cy="40" r="3" fill={stroke} />
          <circle cx="48" cy="40" r="3" fill={stroke} fillOpacity="0.5" />
        </g>
      )}
      {id === 'industrial-trades' && (
        <g {...props}>
          <circle cx="70" cy="100" r="35" strokeDasharray="6 6" className={dash} />
          <circle cx="70" cy="100" r="12" />
          <circle cx="140" cy="100" r="22" strokeDasharray="5 5" className={dash} />
          <circle cx="140" cy="100" r="7" />
          <path d="M70 65v-20M70 135v20M105 100h12" />
        </g>
      )}
    </svg>
  );
}
