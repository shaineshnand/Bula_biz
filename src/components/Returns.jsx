import { fjd } from "../data";

function money(n) {
  const value = Number(n) || 0;
  if (Math.abs(value) > 0 && Math.abs(value) < 20) {
    return `FJD ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return fjd(value);
}

function rateOf(repay) {
  const match = String(repay).match(/(\d+(?:\.\d+)?)\s*%/);
  return match ? Number(match[1]) / 100 : 0;
}

export function outlook(business, amount) {
  const rate = rateOf(business.repay);
  const months = business.termMonths || 0;
  const weeks = (months * 52) / 12;
  const sales = business.sales || [];
  const avg = sales.reduce((sum, n) => sum + n, 0) / (sales.length || 1);
  const last = sales.at(-1) || 0;
  const share = business.goal ? amount / business.goal : 0;

  function project(weeklySales) {
    const perWeek = weeklySales * rate * share;
    const back = perWeek * weeks;
    return { perWeek, back, profit: back - amount };
  }

  const recent = project(last);
  const cautious = project(avg);
  const perMonth = months ? recent.back / months : 0;
  const series = Array.from({ length: months }, (_, i) => perMonth * (i + 1));
  const payback = series.findIndex((n) => n >= amount);

  return { rate, months, share, avg, last, recent, cautious, series, payback };
}

export default function Returns({ business, amount }) {
  const view = outlook(business, amount);
  const { recent, cautious, series } = view;
  const profitUp = recent.profit >= 0;
  const w = 640;
  const h = 220;
  const pad = { l: 52, r: 12, t: 16, b: 28 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const top = Math.max(amount, series.at(-1) || 0, 1) * 1.18;
  const x = (i) => pad.l + ((i + 0.5) / series.length) * innerW;
  const y = (n) => pad.t + (1 - Math.max(0, n) / top) * innerH;
  const barW = Math.min(28, (innerW / series.length) * 0.62);
  const lineY = y(amount);
  const summary = profitUp
    ? `${fjd(amount)} comes back as ${fjd(recent.back)}, a profit of ${fjd(recent.profit)}, if last week's takings hold for ${view.months} months.`
    : `${fjd(amount)} comes back as ${fjd(recent.back)}, short by ${fjd(Math.abs(recent.profit))}, if last week's takings hold for ${view.months} months.`;

  return (
    <section className="returns" id="investor-returns" aria-label="What this investment can return">
      <p className="kicker">Your investment</p>
      <h2>Figures you can get from {business.name}</h2>
      <p className="who">
        {Math.round(view.rate * 100)}% of weekly takings is shared across the round. Your {fjd(amount)} is{" "}
        {Math.round(view.share * 1000) / 10}% of it. Last week was {fjd(view.last)}.
      </p>
      <div className="return-stats">
        <article>
          <span>You put in</span>
          <strong>{fjd(amount)}</strong>
          <small>{Math.round(view.share * 1000) / 10}% of this round</small>
        </article>
        <article>
          <span>Back over {view.months} months</span>
          <strong>{fjd(recent.back)}</strong>
          <small>{money(recent.perWeek)} a week if last week holds</small>
        </article>
        <article className={profitUp ? "up" : "down"}>
          <span>{profitUp ? "Profit" : "Shortfall"}</span>
          <strong>{fjd(Math.abs(recent.profit))}</strong>
          <small>{profitUp ? "after your money is returned" : "if takings stay at last week"}</small>
        </article>
      </div>
      <figure className="return-chart">
        <figcaption>
          Money back, month by month, if takings stay at {fjd(view.last)}.
          {view.payback >= 0 ? ` Your money is back in month ${view.payback + 1}.` : " The term ends before your money is back."}
        </figcaption>
        <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={summary}>
          <line x1={pad.l} x2={w - pad.r} y1={lineY} y2={lineY} stroke="#c4491d" strokeWidth="1.5" strokeDasharray="6 5" />
          <text x={w - pad.r} y={lineY - 6} textAnchor="end" fill="#8d3014" fontSize="12" fontFamily="Outfit, sans-serif">
            Your {fjd(amount)}
          </text>
          {series.map((n, i) => (
            <g key={i}>
              <rect
                x={x(i) - barW / 2}
                y={y(n)}
                width={barW}
                height={Math.max(0, y(0) - y(n))}
                rx="5"
                fill={n >= amount ? "#1c8c4a" : "#0f6e66"}
              />
              {(series.length <= 10 || i % 2 === 0) && (
                <text x={x(i)} y={h - 8} textAnchor="middle" fill="#5d6f6a" fontSize="12" fontFamily="Outfit, sans-serif">
                  {i + 1}
                </text>
              )}
            </g>
          ))}
        </svg>
      </figure>
      <p className="fine">
        If takings stay at the six-week average of {fjd(view.avg)} instead, you get {fjd(cautious.back)} back
        {cautious.profit >= 0 ? `, a profit of ${fjd(cautious.profit)}` : `, short by ${fjd(Math.abs(cautious.profit))}`}. A thinner week pays less. Nothing is charged in this preview.
      </p>
    </section>
  );
}
