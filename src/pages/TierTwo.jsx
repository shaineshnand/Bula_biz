import { Link } from "react-router-dom";
import { useFund, useTitle } from "../context";
import Card from "../components/Card";

export default function TierTwo() {
  useTitle("Tier 2 — Back a business — BulaBiz");
  const { list } = useFund();
  const tier2 = list.filter((b) => b.tier === "scale");

  return (
    <div className="page">
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker tier-kicker t2">Tier 2 · Scale It Up</p>
          <h1>Open rounds. Back one from FJD 25.</h1>
          <p className="lede">
            These businesses already have the records. Neighbours here and overseas can back the next step, repaid from sales.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="grid">
            {tier2.map((b) => (
              <Card key={b.id} business={b} />
            ))}
          </div>
          <div className="section-more">
            <Link className="btn btn-coral" to="/fund?filter=scale">
              Filter the rounds
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
