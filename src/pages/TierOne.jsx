import { Link } from "react-router-dom";
import { useFund, useTitle } from "../context";
import Card from "../components/Card";

export default function TierOne() {
  useTitle("Tier 1 — Start a business — BulaBiz");
  const { list } = useFund();
  const tier1 = list.filter((b) => b.tier === "start");

  return (
    <div className="page">
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker tier-kicker t1">Tier 1 · BulaBiz Start</p>
          <h1>A new business. A simpler way in.</h1>
          <p className="lede">
            For an entrepreneur opening a bay, a stall, or a kitchen. You write what happened today. BulaBiz turns that into the statement, the checklist, and one grant form.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
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
            <Link className="text-link" to="/">
              Choose again
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
