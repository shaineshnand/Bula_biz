import { Link } from "react-router-dom";
import { useTitle } from "../context";
import { Mark } from "../components/Art";

export default function Home() {
  useTitle("BulaBiz — Starting, or scaling up");

  return (
    <section className="landing">
      <div className="wrap">
        <figure className="landing-scene">
          <img src="/photos/josefa.jpg" alt="A palm-lined Fiji coast, the kind of shore a new shop starts on" />
          <figcaption>
            <Mark size={56} />
            <span>
              bula<em>biz</em>
              <small>The platform that connects entrepreneurs who need capital with people who have it.</small>
            </span>
          </figcaption>
        </figure>
        <h1>
          Where is the <em>business?</em>
        </h1>
        <p className="lede">
          Choose the door that matches today. Starting means the books and one grant form. Scaling up means the record is already there, and neighbours can back the next step.
        </p>

        <div className="doors">
          <Link className="door start" to="/start">
            <img src="/photos/alisi.jpg" alt="" />
            <div>
              <p className="kicker">Tier 1</p>
              <h2>Starting a business</h2>
              <p>A bay, a stall, or a kitchen. Write what happened today. The statement and one grant form follow from those lines. Free for the shop.</p>
              <ul>
                <li>One book for sales and costs</li>
                <li>A checklist that fills itself in</li>
                <li>One form. A person decides.</li>
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
          One profile carries a business from the first receipt to the first backer.{" "}
          <Link to="/journey">See how the two doors connect.</Link>
        </p>
      </div>
    </section>
  );
}
