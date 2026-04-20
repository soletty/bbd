import { motion } from 'framer-motion';
import { useMemo } from 'react';

type Props = {
  height: number;
};

const SEG_H = 800;
const SVG_W = 3000;
const DASH = 24;
const GAP = 18;

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 78.233 + 43.1) * 28461.7231;
  return x - Math.floor(x);
}

// Build ONE continuous path through the full height
function buildFullPath(height: number): string {
  const pointCount = Math.ceil(height / 600) + 1;

  // Generate waypoints the path passes through
  const points: [number, number][] = [];
  for (let i = 0; i < pointCount; i++) {
    const y = (i / (pointCount - 1)) * height;
    const x = SVG_W * (0.2 + seededRandom(i + 10) * 0.6);
    points.push([x, y]);
  }
  // Start from center
  points[0] = [SVG_W / 2, 0];
  // Add an extra point past the end so the last visible curve exits smoothly
  points.push([SVG_W / 2, height + 600]);

  // Build smooth cubic bezier spline through the points using Catmull-Rom → Bezier conversion
  let d = `M ${points[0][0]} ${points[0][1]}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    // Catmull-Rom to cubic bezier control points
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;

    d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2[0]} ${p2[1]}`;
  }

  return d;
}

export function Trail({ height }: Props) {
  const segCount = Math.ceil(height / SEG_H);
  const fullPath = useMemo(() => buildFullPath(height), [height]);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-visible"
      style={{ height }}
    >
      {Array.from({ length: segCount }, (_, i) => {
        const yOffset = i * SEG_H;

        return (
          <motion.svg
            key={i}
            viewBox={`0 ${yOffset} ${SVG_W} ${SEG_H}`}
            fill="none"
            className="block"
            style={{
              width: SVG_W,
              height: SEG_H,
              position: 'relative',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '200px' }}
            transition={{ duration: 0.6 }}
          >
            <path
              d={fullPath}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="5"
              strokeDasharray={`${DASH} ${GAP}`}
              strokeLinecap="round"
            />
            <path
              d={fullPath}
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="5"
              strokeDasharray={`${DASH} ${GAP}`}
              strokeLinecap="round"
            />
          </motion.svg>
        );
      })}
    </div>
  );
}
