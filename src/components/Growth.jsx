import { useId } from "react";
import { fjd } from "../data";

const WEEKS = ["W1", "W2", "W3", "W4", "W5", "W6"];

export function growthOf(sales) {
  const first = sales[0] || 0;
  const last = sales[sales.length - 1] || 0;
  if (!first) return 0;
  return Math.round(((last - first) / first) * 100);
}

export default function Growth({ sales }) {
  const grad = useId().replace(/:/g, "");
  const max = Math.max(...sales, 1);
  const growth = growthOf(sales);
  const w = 640;
  const h = 248;
  const pad = { l: 58, r: 18, t: 18, b: 34 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const x = (i) => pad.l + (i / (sales.length - 1)) * innerW;
  const y = (n) => pad.t + (1 - Math.max(0, Math.min(n, max)) / max) * innerH;
  const pts = sales.map((n, i) => [x(i), y(n)]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const base = pad.t + innerH;
  const area = `${line} L${pts.at(-1)[0].toFixed(1)} ${base.toFixed(1)} L${pts[0][0].toFixed(1)} ${base.toFixed(1)} Z`;

  const n = sales.length;
  const sumX = (n * (n - 1)) / 2;
  const sumY = sales.reduce((sum, value) => sum + value, 0);
  const sumXY = sales.reduce((sum, value, i) => sum + i * value, 0);
  const sumXX = ((n - 1) * n * (2 * n - 1)) / 6;
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX || 1);
  const intercept = (sumY - slope * sumX) / n;
  const trend = `M${x(0).toFixed(1)} ${y(intercept).toFixed(1)} L${x(n - 1).toFixed(1)} ${y(intercept + slope * (n - 1)).toFixed(1)}`;

  const grid = [1, 0.5, 0].map((t) => ({
    value: Math.round(max * t),
    yy: y(max * t),
  }));

  const summary = WEEKS.map((week, i) => `${week} ${fjd(sales[i])}`).join(", ");

  return (
    <figure className="growth">
      <figcaption>
        <span className="growth-up">
          {growth >= 0 ? "Up" : "Down"} {Math.abs(growth)}% in six weeks
        </span>
        <small>Weekly takings from the books. The dashed line is the direction.</small>
      </figcaption>
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`Sales growth. ${summary}. ${growth >= 0 ? "Up" : "Down"} ${Math.abs(growth)} percent from the first week.`}>
        <defs>
          <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f9d55" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#1f9d55" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {grid.map((row) => (
          <g key={row.value}>
            <line x1={pad.l} x2={w - pad.r} y1={row.yy} y2={row.yy} stroke="#e6dfd2" strokeWidth="1" />
            <text x={pad.l - 10} y={row.yy + 4} textAnchor="end" fill="#5d6f6a" fontSize="13" fontFamily="Outfit, sans-serif">
              {row.value}
            </text>
          </g>
        ))}
        <path d={area} fill={`url(#${grad})`} />
        <path d={trend} fill="none" stroke="#0e7a3d" strokeWidth="2" strokeDasharray="7 6" />
        <path d={line} fill="none" stroke="#1c8c4a" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
        {pts.map((p, i) => (
          <circle key={WEEKS[i]} cx={p[0]} cy={p[1]} r="5" fill="#fffdf8" stroke="#1c8c4a" strokeWidth="3" />
        ))}
        {WEEKS.map((label, i) => (
          <text key={label} x={x(i)} y={h - 8} textAnchor="middle" fill="#5d6f6a" fontSize="13" fontFamily="Outfit, sans-serif">
            {label}
          </text>
        ))}
      </svg>
    </figure>
  );
}
