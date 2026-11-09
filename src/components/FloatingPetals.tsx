import React, { useMemo } from 'react';

interface Petal {
  id: number;
  left: number;
  size: number;
  fallDuration: number;
  swayDuration: number;
  tumbleDuration: number;
  delay: number;
  sway: number;
  axis: string;
  blur: number;
  opacity: number;
  color: [string, string];
}

// [edge, base] — rose tones built around the invitation palette
const COLORS: [string, string][] = [
  ['#f6c9d3', '#c9577a'],
  ['#efb3c1', '#9b2f4d'],
  ['#f9dbe2', '#d27a93'],
  ['#e8a3b4', '#6A1E33'],
  ['#fbe4e9', '#b8486a'],
];

function getPetalCount() {
  if (typeof window === 'undefined') return 14;
  const narrow = window.innerWidth < 768;
  return narrow ? 14 : 24;
}

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export const FloatingPetals: React.FC = () => {
  const petals = useMemo<Petal[]>(() => {
    const count = getPetalCount();
    return Array.from({ length: count }, (_, i) => {
      // depth 0 = far away (small, soft, slow), 1 = close (large, crisp, faster)
      const depth = Math.random();
      const fallDuration = rand(16, 24) - depth * 6;
      return {
        id: i,
        left: rand(-5, 100),
        size: 7 + depth * 9,
        fallDuration,
        swayDuration: rand(3, 5.5),
        tumbleDuration: rand(4, 9),
        delay: -rand(0, fallDuration), // already mid-fall on page load
        sway: rand(20, 60),
        axis: `${rand(0.2, 1).toFixed(2)}, ${rand(0.2, 1).toFixed(2)}, ${rand(0, 0.5).toFixed(2)}`,
        blur: depth < 0.3 ? 1 : 0,
        opacity: 0.65 + depth * 0.35,
        color: COLORS[i % COLORS.length],
      };
    });
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-[40]"
      style={{ perspective: '800px' }}
      aria-hidden="true"
    >
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal-fall absolute top-0"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.fallDuration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <div
            className="petal-sway"
            style={{
              '--sway': `${p.sway}px`,
              animationDuration: `${p.swayDuration}s`,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties}
          >
            <div
              className="petal-tumble"
              style={{
                '--axis': p.axis,
                animationDuration: `${p.tumbleDuration}s`,
                animationDelay: `${p.delay}s`,
                opacity: p.opacity,
                filter: p.blur ? `blur(${p.blur}px)` : undefined,
              } as React.CSSProperties}
            >
              <svg width={p.size} height={p.size} viewBox="0 0 24 24" style={{ overflow: 'visible' }}>
                <defs>
                  <radialGradient id={`petal-body-${p.id}`} cx="50%" cy="85%" r="95%">
                    <stop offset="0%" stopColor={p.color[1]} />
                    <stop offset="70%" stopColor={p.color[0]} />
                    <stop offset="100%" stopColor={p.color[0]} />
                  </radialGradient>
                  <radialGradient id={`petal-shine-${p.id}`} cx="35%" cy="30%" r="45%">
                    <stop offset="0%" stopColor="#fff4ee" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#fff4ee" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* Petal body: notched rounded top, narrow base */}
                <path
                  d="M12 23 C 6.5 20.5 2 15 2.8 8.6 C 3.5 3.4 8 1.2 10.6 2.6 C 11.4 3 12 3.8 12 3.8 C 12 3.8 12.6 3 13.4 2.6 C 16 1.2 20.5 3.4 21.2 8.6 C 22 15 17.5 20.5 12 23 Z"
                  fill={`url(#petal-body-${p.id})`}
                />
                {/* Soft highlight for a cupped, 3D feel */}
                <path
                  d="M12 23 C 6.5 20.5 2 15 2.8 8.6 C 3.5 3.4 8 1.2 10.6 2.6 C 11.4 3 12 3.8 12 3.8 C 12 3.8 12.6 3 13.4 2.6 C 16 1.2 20.5 3.4 21.2 8.6 C 22 15 17.5 20.5 12 23 Z"
                  fill={`url(#petal-shine-${p.id})`}
                />
                {/* Faint centre vein */}
                <path d="M12 22 C 11.6 16 11.8 10 12 5" stroke={p.color[1]} strokeOpacity="0.35" strokeWidth="0.5" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
