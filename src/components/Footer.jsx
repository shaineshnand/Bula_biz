import { Link } from "react-router-dom";
import { Mark } from "./Art";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Link className="logo" to="/">
            <Mark />
            <span>
              bula<em>biz</em>
            </span>
          </Link>
          <p>
            One profile for a Fiji business, from registration until it is operating, and on to people who can back it.
          </p>
        </div>
        <div>
          <h2>For shops</h2>
          <Link to="/start">Start a business</Link>
          <Link to="/fund?view=offers">Funding Finder</Link>
          <Link to="/journey">How graduation works</Link>
        </div>
        <div>
          <h2>For backers</h2>
          <Link to="/fund">Open rounds</Link>
          <Link to="/fund?filter=almost">Almost funded</Link>
          <Link to="/business/sai">Sai’s canteen</Link>
        </div>
        <div>
          <h2>The idea</h2>
          <Link to="/journey">Two tiers</Link>
          <Link to="/journey#trust">People decide</Link>
          <Link to="/journey#phase">Pilot, then scale</Link>
          <Link to="/present">Presentation</Link>
        </div>
      </div>
      <div className="wrap footer-note">
        <p>
          BulaBiz is a concept preview for Fiji’s micro, small, and medium businesses, prepared around the Creative HQ
          hackathon brief. Photographs are illustrative, not the owners. It is not a licensed lender, it does not move money, and it is not affiliated with Kiva.
          The marketplace here borrows Kiva’s idea — choose a real business, start small, watch the round fill — and
          pairs it with the records that make a Fijian business fundable. Crowd backing in the brief is a later phase,
          after the Business Funding Act, a regulator sandbox, and a trustee partner.
        </p>
        <p>© 2026 BulaBiz concept</p>
      </div>
    </footer>
  );
}
