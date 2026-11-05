import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { backers, fjd } from "../data";
import { useFund, useTitle } from "../context";
import Card from "../components/Card";

export default function Profile() {
  const { id } = useParams();
  const { list, pledge } = useFund();
  const business = list.find((b) => b.id === id);
  useTitle(business ? `${business.name} · ${business.business} — BulaBiz` : "Profile — BulaBiz");

  const [amount, setAmount] = useState(50);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(null);

  const maxSale = business ? Math.max(...business.sales) : 1;
  const others = useMemo(() => {
    if (!business) return [];
    if (business.tier === "start") return list.filter((b) => b.id !== business.id && b.tier === "start");
    return list.filter((b) => b.id !== business.id && b.goal).slice(0, 3);
  }, [list, business]);

  if (!business) {
    return (
      <div className="wrap page-miss">
        <h1>No profile under that name.</h1>
        <Link className="btn" to="/fund">
          Browse rounds
        </Link>
      </div>
    );
  }

  const b = business;
  const choices = [25, 50, 100, 250].filter((n) => b.left != null && n < b.left);
  const selected = b.left != null ? Math.min(amount, b.left) : 0;

  function back(e) {
    e.preventDefault();
    const result = pledge(b.id, selected);
    if (result.ok) {
      setDone(result.amount);
      setOpen(false);
    }
  }

  return (
    <article className="profile">
      <div className="wrap crumb">
        <Link to="/fund">All rounds</Link>
        <span aria-hidden="true">/</span>
        <span>
          {b.place} · {b.name}
        </span>
      </div>
      <div className="wrap profile-grid">
        <div>
          <div className="profile-hero">
            <img src={`/photos/${b.id}.jpg`} alt={`${b.business} in ${b.place}`} />
            <div className="profile-title">
              <p className="kicker">{b.tier === "scale" ? "Tier 2 · Scale It Up" : "Tier 1 · BulaBiz Start"}</p>
              <h1>{b.name}</h1>
              <p>
                {b.business} · {b.place}
              </p>
            </div>
          </div>
          <div className="pills profile-pills">
            <span className="pill">{b.sector}</span>
            {b.womenLed && <span className="pill">Woman-led</span>}
            {b.diaspora && <span className="pill">Diaspora match</span>}
            <span className="pill">{b.years ? `${b.years} years trading` : "First year"}</span>
            <span className="pill">{b.people}</span>
          </div>
          {b.story.map((para) => (
            <p key={para} className="story">
              {para}
            </p>
          ))}

          <h2>{b.tier === "start" ? "What a first grant would cover" : "What the money is for"}</h2>
          <ul className="use">
            {b.use.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>Last six weeks of takings</h2>
          <p className="who">Pulled from the same profile that would attach to a grant. Figures are part of the concept.</p>
          <div className="chart" aria-hidden="true">
            {b.sales.map((n, i) => (
              <div key={i} style={{ height: `${(n / maxSale) * 100}%` }}>
                <span>{n}</span>
              </div>
            ))}
          </div>
          <div className="chart-labels" aria-hidden="true">
            {["W1", "W2", "W3", "W4", "W5", "W6"].map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>

          {b.tier === "start" ? (
            <>
              <h2>Three steps, then you are done</h2>
              <ol className="use">
                <li>Write the sale or the cost, the day it happens.</li>
                <li>The statement and the checklist come from those lines. Nothing is retyped.</li>
                <li>One form goes to a person. The next time you apply, you only update what changed.</li>
              </ol>
            </>
          ) : (
            <>
              <h2>How repayment would work</h2>
              <p className="story">{b.repay}.</p>
              <p className="story">
                A thin week pays less and the term can run longer. Backers can lose money. This page does not offer a
                financial return, and this preview does not take a payment.
              </p>
            </>
          )}

          {b.matches.length > 0 && (
            <>
              <h2>Already a fit for these backers</h2>
              <ul className="matches">
                {b.matches.map((key) => {
                  const person = backers[key];
                  return (
                    <li key={key}>
                      <strong>
                        {person.name} · {person.where}
                      </strong>
                      <span>{person.wants}</span>
                      <em>{person.ticket}</em>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>

        <aside className={`pledge ${open ? "open" : ""}`}>
          <button type="button" className="pledge-tab" onClick={() => setOpen((v) => !v)}>
            {b.goal ? (b.funded ? "Round filled" : `Preview a back · ${fjd(b.left)} to go`) : "The simple path"}
          </button>
          <div className="pledge-card">
            <button type="button" className="pledge-close" onClick={() => setOpen(false)}>
              Close
            </button>
            {b.goal ? (
              <>
                <p className="kicker">{b.funded ? "Filled in this preview" : "Open round"}</p>
                <p className="pledge-left">{b.funded ? "Fully backed" : fjd(b.left)}</p>
                <p className="who">{b.funded ? "The bar is full." : `to go of ${fjd(b.goal)}`}</p>
                <div
                  className={b.pct >= 85 ? "meter hot" : "meter"}
                  role="progressbar"
                  aria-valuenow={b.pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${b.pct}% backed`}
                >
                  <span style={{ width: `${b.pct}%` }} />
                </div>
                <p className="meter-row">
                  <span>{fjd(b.raisedNow)} backed</span>
                  <span>{b.pct}%</span>
                </p>
                {!b.funded && (
                  <form onSubmit={back}>
                    <fieldset>
                      <legend>Choose an amount</legend>
                      <div className="amounts">
                        {choices.map((n) => (
                          <button
                            key={n}
                            type="button"
                            className={selected === n ? "on" : ""}
                            onClick={() => setAmount(n)}
                          >
                            {fjd(n)}
                          </button>
                        ))}
                        <button
                          type="button"
                          className={selected === b.left ? "on" : ""}
                          onClick={() => setAmount(b.left)}
                        >
                          {fjd(b.left)} the rest
                        </button>
                      </div>
                    </fieldset>
                    <button className="btn btn-coral btn-block" type="submit">
                      Preview {fjd(selected)} for {b.name}
                    </button>
                  </form>
                )}
                {done && <p className="thanks tight">Added to your backs. Nothing was charged.</p>}
                <dl className="pledge-meta">
                  <div>
                    <dt>Term</dt>
                    <dd>{b.termMonths} months, flexible</dd>
                  </div>
                  <div>
                    <dt>Repaid from</dt>
                    <dd>Sales, via trust</dd>
                  </div>
                  <div>
                    <dt>Collateral</dt>
                    <dd>None</dd>
                  </div>
                </dl>
              </>
            ) : (
              <>
                <p className="kicker">Tier 1 · starting up</p>
                <h2>Three steps. That is the whole process.</h2>
                <p>
                  {b.name} is on step {b.pace || 1} of 3. {b.paceNote} The same path fits a bay, a bakery, or a corner shop.
                </p>
                <Link className="btn btn-block" to="/start">
                  Try the simple books
                </Link>
              </>
            )}
            <p className="fine">
              {b.tier === "start"
                ? "Free for the business. This preview does not send a real application."
                : "Concept only. Backing a real round can mean late or lost money."}
            </p>
          </div>
        </aside>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>{b.tier === "start" ? "Others just starting" : "Others you can read"}</h2>
            <Link className="text-link" to="/fund">
              All rounds
            </Link>
          </div>
          <div className="grid">
            {others.map((item) => (
              <Card key={item.id} business={item} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
