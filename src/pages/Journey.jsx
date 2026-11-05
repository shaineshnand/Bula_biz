import { Link } from "react-router-dom";
import { journey } from "../data";
import { useTitle } from "../context";

export default function Journey() {
  useTitle("The journey — BulaBiz");

  return (
    <div className="page">
      <header className="page-hero journey-hero">
        <div className="wrap">
          <p className="kicker">One platform, two tiers</p>
          <h1>The business keeps one story. The money changes shape.</h1>
          <p className="lede">
            Fiji’s small businesses have the ideas and the customers. What they often lack is a record a funder will
            read, and capital that does not demand a title deed. BulaBiz is the record. Start is the first grant.
            Scale It Up is the crowd.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <ol className="journey-list">
            {journey.map((step) => (
              <li key={step.n} className={step.phase}>
                <span>{step.n}</span>
                <div>
                  <h2>{step.title}</h2>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="section-more">
            <Link className="btn" to="/start">
              Try step one
            </Link>
            <Link className="btn btn-coral" to="/business/sai">
              Jump to Sai’s raise
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="trust">
        <div className="wrap trust-grid">
          <article>
            <p className="kicker">Decisions</p>
            <h2>Keep humans in the chair.</h2>
            <p>
              AI can screen, summarise, and point at what changed since last time. Panels award grants. Backers choose
              businesses. A model that says yes by itself is out of scope.
            </p>
          </article>
          <article>
            <p className="kicker">Data</p>
            <h2>Consent, then keep, then delete.</h2>
            <p>
              Records and any M-PAiSA link sit behind a clear yes. They are stored securely, shared only with the
              programme the owner applied to, and removed when the owner asks.
            </p>
          </article>
          <article>
            <p className="kicker">Names</p>
            <h2>Funding Finder, not Kiva.</h2>
            <p>
              Kiva is a global microlender. Using that name would confuse a judge and a shopkeeper. The marketplace in
              this product is Funding Finder. Kiva’s pattern — small amounts, a face, a bar, a story — is the reference.
              A partnership could come later. This site is not them.
            </p>
          </article>
        </div>
      </section>

      <section className="section band" id="phase">
        <div className="wrap phase">
          <div>
            <p className="kicker">Phase 1 · show this</p>
            <h2>The pilot is Start.</h2>
            <p>
              Records, the readiness checklist, one application form, and Funding Finder. It needs a single grant
              programme willing to accept BulaBiz books.
            </p>
            <Link className="btn btn-small" to="/start">
              Open the pilot
            </Link>
          </div>
          <div>
            <p className="kicker">Phase 2 · say this is next</p>
            <h2>The crowd waits on the rules.</h2>
            <p>
              Scale It Up needs the Business Funding Act 2025 path for peer-to-peer lending and crowdfunding, an RBF
              sandbox, a licensed bank or trustee, and a clear line on exchange control for diaspora backers.
            </p>
            <Link className="btn btn-small btn-coral" to="/fund">
              Preview the rounds
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap model">
          <div>
            <p className="kicker">Who pays</p>
            <h2>Free at the counter. Paid where the value lands.</h2>
          </div>
          <div>
            <h3>Shops</h3>
            <p>Tier 1 is free. A micro business should not pay a subscription to become legible.</p>
          </div>
          <div>
            <h3>Grant programmes</h3>
            <p>They pay because applications arrive complete, comparable, and quicker to screen.</p>
          </div>
          <div>
            <h3>A successful raise</h3>
            <p>A few percent of funds raised — think 3% to 5% — plus a small fee on the backer side.</p>
          </div>
          <div>
            <h3>Later tools</h3>
            <p>Bookkeeping depth and advisory, for businesses that want more than the free record.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
