import { Link } from "react-router-dom";
import { fjd } from "../data";

export default function Card({ business }) {
  const b = business;
  const open = Boolean(b.goal) && !b.funded;
  return (
    <article className="bcard">
      <Link className="bcard-media" to={`/business/${b.id}`} aria-label={`View ${b.name}, ${b.business}`}>
        <img src={`/photos/${b.id}.jpg`} alt="" />
        <span className={b.tier === "scale" ? "flag tier2" : "flag tier1"}>
          {b.tier === "scale" ? "Tier 2" : "Tier 1"}
        </span>
        {b.goal && b.pct >= 75 && !b.funded && <span className="flag almost">Almost there</span>}
        {b.funded && <span className="flag almost">Filled</span>}
        <span className="pin">{b.place}</span>
      </Link>
      <div className="bcard-body">
        <p className="kicker">
          {b.sector} · {b.womenLed ? "Woman-led" : "Owner-run"}
        </p>
        <h3>
          <Link to={`/business/${b.id}`}>{b.name}</Link>
        </h3>
        <p className="biz">{b.business}</p>
        <p className="blurb">{b.blurb}</p>
        <div className="pills">
          {b.diaspora && <span className="pill">Diaspora match</span>}
          <span className="pill">{b.tier === "scale" ? "Scale It Up" : "Starting up"}</span>
          {b.termMonths && <span className="pill">{b.termMonths} months</span>}
        </div>
        {b.goal ? (
          <>
            <div
              className={b.pct >= 85 ? "meter hot" : "meter"}
              role="progressbar"
              aria-valuenow={b.pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${b.name} is ${b.pct}% backed`}
            >
              <span style={{ width: `${b.pct}%` }} />
            </div>
            <div className="meter-row">
              <strong>{b.funded ? "Fully backed" : `${fjd(b.left)} to go`}</strong>
              <span>{b.pct}%</span>
            </div>
          </>
        ) : (
          <>
            <ol className="simple-rail" aria-label={`${b.name} is on step ${b.pace || 1} of 3`}>
              {["Register", "Ready to open", "Operate"].map((label, i) => (
                <li key={label} className={(b.pace || 1) > i ? "on" : ""}>
                  {label}
                </li>
              ))}
            </ol>
            <p className="meter-note">{b.paceNote}</p>
          </>
        )}
        <Link
          className={`btn btn-block ${open ? "btn-coral" : b.tier === "start" ? "" : "btn-ghost"}`}
          to={b.tier === "start" ? "/start" : `/business/${b.id}`}
        >
          {open ? `Back ${b.name}` : b.tier === "start" ? "Do the steps" : `View ${b.name}`}
        </Link>
      </div>
    </article>
  );
}
