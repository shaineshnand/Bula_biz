import { Link } from "react-router-dom";
import { useTitle } from "../context";

export default function Home() {
  useTitle("Choose a door — BulaBiz");

  return (
    <section className="landing">
      <div className="wrap">
        <h1>
          Where is the <em>business?</em>
        </h1>
        <p className="lede">
          Choose the door that matches today. Tier 1 takes a business from registration until it is operating. Tier 2 is for a business already open, when people with capital can back the next step.
        </p>

        <div className="doors">
          <Link className="door start" to="/start">
            <img src="/photos/alisi.jpg" alt="" />
            <div>
              <p className="kicker">Tier 1</p>
              <h2>Starting a business</h2>
              <p>From the day the business is registered, until the doors are open and the first sales are in. One profile carries the whole start. Free for the business.</p>
              <ul>
                <li>Register the business</li>
                <li>Get it ready to open</li>
                <li>Operate, and keep each day in the book</li>
              </ul>
              <span className="btn">I’m starting</span>
            </div>
          </Link>

          <Link className="door scale" to="/fund?filter=scale">
            <img src="/photos/sai.jpg" alt="" />
            <div>
              <p className="kicker">Tier 2</p>
              <h2>Scaling up</h2>
              <p>The year is already written down. A grant has been used. The same profile becomes a round neighbours here and overseas can back, repaid from sales.</p>
              <ul>
                <li>Open rounds from FJD 25</li>
                <li>No collateral. Repaid as the shop sells.</li>
                <li>Money held in trust.</li>
              </ul>
              <span className="btn btn-coral">I’m scaling up</span>
            </div>
          </Link>
        </div>

        <p className="landing-note">
          One profile carries a business from registration, through operating, to the first backer.{" "}
          <Link to="/journey">See how the two doors connect.</Link>
        </p>
      </div>
    </section>
  );
}
