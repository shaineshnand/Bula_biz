import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { journey, fjd } from "../data";
import { useFund, useTitle } from "../context";
import Card from "../components/Card";

const LIVE = [
  { t: "Lunch plates × 12", a: 96 },
  { t: "Dalo and fish", a: -34 },
  { t: "Office catering", a: 140 },
  { t: "Cooking gas", a: -18 },
  { t: "Afternoon tea", a: 42 },
  { t: "Late rice plates", a: 64 },
];

export default function Home() {
  useTitle("BulaBiz — From the first receipt to the first backer");
  const { list } = useFund();
  const [tick, setTick] = useState(0);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("backer");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const id = setInterval(() => setTick((n) => n + 1), 2200);
    return () => clearInterval(id);
  }, []);

  const sai = list.find((b) => b.id === "sai");
  const tier2 = list.filter((b) => b.tier === "scale");
  const tier1 = list.filter((b) => b.tier === "start");
  const lines = [0, 1, 2, 3].map((offset) => LIVE[(tick + offset) % LIVE.length]);
  const running = lines.reduce((sum, line) => sum + line.a, 0);

  function join(e) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setJoined(true);
  }

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">
              <i /> Fiji · one profile, two tiers
            </p>
            <h1>
              From the first receipt
              <em> to the first backer.</em>
            </h1>
            <p className="lede">
              A new business writes the day. BulaBiz turns those lines into a profile a funder can trust: a statement,
              one grant form, and later a round that neighbours can back.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-coral" to="/start">
                Start your business
              </Link>
              <Link className="btn btn-ghost" to="/fund">
                Back a business
              </Link>
            </div>
            <p className="fine">Free for the shop. Backers join from FJD 25. A concept preview — no real money moves.</p>
          </div>

          <Link className="ledger" to="/business/sai" aria-label="Open Sai’s Harbour Canteen profile">
            <span className="sticker">Tier 2 · open round</span>
            <div className="ledger-top">
              <span className="avatar">S</span>
              <div>
                <strong>Sai · Harbour Canteen</strong>
                <span>Central Suva · logging today</span>
              </div>
              <img src="/photos/sai.jpg" alt="" />
            </div>
            <ul className="tx-list">
              {lines.map((line, i) => (
                <li key={`${tick}-${i}`} className={line.a > 0 ? "tx-in" : "tx-out"}>
                  <span>{line.t}</span>
                  <b>
                    {line.a > 0 ? "+" : "−"}
                    {Math.abs(line.a)}
                  </b>
                </li>
              ))}
            </ul>
            <div className="ledger-foot">
              <div>
                <span>Window</span>
                <strong className={running >= 0 ? "up" : "down"}>
                  {running >= 0 ? "+" : "−"}
                  {Math.abs(running)} FJD
                </strong>
              </div>
              <div>
                <span>To go</span>
                <strong>{sai ? fjd(sai.left) : "—"}</strong>
              </div>
              <div className={sai && sai.pct >= 85 ? "meter hot" : "meter"} aria-hidden="true">
                <span style={{ width: `${sai?.pct ?? 0}%` }} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="stats" aria-label="The shape of the product">
        <div className="wrap stats-grid">
          <div>
            <strong>3 steps</strong>
            <span>Write the day. See the books. Send one form. Free for the business.</span>
          </div>
          <div>
            <strong>1 profile</strong>
            <span>Sales, documents, applications, then the pitch. Nothing starts over.</span>
          </div>
          <div>
            <strong>0 collateral</strong>
            <span>Scale It Up is repaid from sales, held in trust.</span>
          </div>
          <div>
            <strong>12 months</strong>
            <span>A rough line for graduating from a grant into the crowd.</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker tier-kicker t1">Tier 1 · for the person starting</p>
              <h2>A new business. A simpler way in.</h2>
            </div>
            <p>
              For an entrepreneur opening a bay, a stall, or a kitchen. You write what happened today. BulaBiz turns that into the statement, the checklist, and one grant form.
            </p>
          </div>
          <ol className="plain-steps">
            <li>
              <span>1</span>
              <h3>Write the day</h3>
              <p>One line. A sale or a cost. No spreadsheet, no dossier.</p>
            </li>
            <li>
              <span>2</span>
              <h3>See where you stand</h3>
              <p>The statement and the checklist fill themselves in from those lines.</p>
            </li>
            <li>
              <span>3</span>
              <h3>Send one form</h3>
              <p>The grant that fits. A person decides. Next time you only update what changed.</p>
            </li>
          </ol>
          <div className="grid">
            {tier1.map((b) => (
              <Card key={b.id} business={b} />
            ))}
          </div>
          <div className="section-more">
            <Link className="btn btn-coral" to="/start">
              Try it as Peni, in Ba
            </Link>
            <Link className="text-link" to="/fund?view=offers">
              See the grants this can reach
            </Link>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker tier-kicker t2">Tier 2 · Scale It Up</p>
              <h2>Open rounds. Back one from FJD 25.</h2>
            </div>
            <p>
              These businesses already have the records. Neighbours here and overseas can back the next step, repaid from sales.
            </p>
          </div>
          <div className="grid">
            {tier2.map((b) => (
              <Card key={b.id} business={b} />
            ))}
          </div>
          <div className="section-more">
            <Link className="btn" to="/fund?filter=scale">
              All Tier 2 rounds
            </Link>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Teal, then dark, then coral</p>
              <h2>Six steps. The business never starts from scratch.</h2>
            </div>
            <Link className="text-link" to="/journey">
              Read the journey
            </Link>
          </div>
          <ol className="steps">
            {journey.map((step) => (
              <li key={step.n} className={`step ${step.phase}`}>
                <span>{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="tiers">
            <article className="tier start">
              <p className="kicker">Tier 1 · for entrepreneurs</p>
              <h2>BulaBiz Start</h2>
              <p>For someone opening a business. The process stays short: one book, one checklist, one form.</p>
              <ul>
                <li>Sales and expenses, recorded as the day happens</li>
                <li>A readiness checklist and statements generated from those records</li>
                <li>One application, with a live status</li>
                <li>Funding Finder: every grant and loan that might fit</li>
              </ul>
              <Link className="btn btn-small" to="/start">
                Start your business
              </Link>
            </article>
            <aside className="bridge">
              <p>The link</p>
              <strong>One business profile</strong>
              <span>Every sale, upload, and application stays put. The track record is the pitch.</span>
            </aside>
            <article className="tier scale">
              <p className="kicker">Tier 2 · phase two</p>
              <h2>Scale It Up</h2>
              <p>For a business that has outgrown grants and needs bigger capital.</p>
              <ul>
                <li>Crowd investment from Fiji and the diaspora</li>
                <li>Repayment that flexes with sales. No collateral.</li>
                <li>Backers flagged when a business already meets their criteria</li>
                <li>Money held in trust for the release and the repayments</li>
              </ul>
              <Link className="btn btn-small btn-ink" to="/fund">
                See open rounds
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap feature">
          <div className="feature-art">
            <img src="/photos/sai.jpg" alt="A plate from a busy lunch service" />
          </div>
          <div>
            <p className="kicker">The same shop, a year on</p>
            <blockquote>
              “I did not need a new identity to raise. I needed the year I had already worked, written down.”
            </blockquote>
            <p className="by">Sai · Harbour Canteen · Suva · concept profile</p>
            <dl className="facts">
              <div>
                <dt>Records</dt>
                <dd>14 months</dd>
              </div>
              <div>
                <dt>Grant</dt>
                <dd>Used on the pot and bench</dd>
              </div>
              <div>
                <dt>Sales</dt>
                <dd>Up four months running</dd>
              </div>
              <div>
                <dt>Round</dt>
                <dd>{sai ? `${fjd(sai.left)} to go` : ""}</dd>
              </div>
            </dl>
            <Link className="btn btn-coral" to="/business/sai">
              Back Sai’s window
            </Link>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <p className="kicker">What your money does, twice</p>
          <h2 className="display">Back. Get repaid as the shop sells. Back the next one.</h2>
          <div className="loop">
            <article>
              <span>01</span>
              <h3>You back from FJD 25</h3>
              <p>You choose the business. The story, the books, and the use of funds are on one page.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Trust holds the funds</h3>
              <p>A trustee releases the money for the purpose on the profile, and collects what comes back.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Sales set the week</h3>
              <p>A good week repays more. A thin week repays less. The term can stretch. The bill does not balloon.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap principles">
          <article>
            <h2>AI screens. People decide.</h2>
            <p>The model writes a short brief so a panel or a backer can read faster. It does not award the grant or pick the winner.</p>
          </article>
          <article>
            <h2>The records stay theirs.</h2>
            <p>Clear consent for the books and for M-PAiSA. Stored securely. Deleted when the owner asks.</p>
          </article>
          <article>
            <h2>Shops don’t pay to begin.</h2>
            <p>Grant programmes pay because applications arrive complete. A raise pays a small success fee. Advisory tools can be paid later.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="wrap join">
          <div>
            <p className="kicker">Pilot note</p>
            <h2>Tell us which door you walk in.</h2>
            <p>This form stays in your browser. It is here so the page can be tried, not to collect a list.</p>
          </div>
          {joined ? (
            <p className="thanks">
              Noted, on this device only. {role === "owner" ? "Start with the books." : "The open rounds are waiting."}{" "}
              <Link to={role === "owner" ? "/start" : "/fund"}>{role === "owner" ? "Open Start" : "Browse rounds"}</Link>
            </p>
          ) : (
            <form onSubmit={join}>
              <fieldset>
                <legend className="sr">I am here as</legend>
                <label className={role === "owner" ? "choice on" : "choice"}>
                  <input type="radio" name="role" value="owner" checked={role === "owner"} onChange={() => setRole("owner")} />
                  I run a business
                </label>
                <label className={role === "backer" ? "choice on" : "choice"}>
                  <input type="radio" name="role" value="backer" checked={role === "backer"} onChange={() => setRole("backer")} />
                  I want to back one
                </label>
              </fieldset>
              <label className="email-label" htmlFor="email">
                Email
              </label>
              <div className="email-row">
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <button className="btn btn-coral" type="submit">
                  Continue
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
