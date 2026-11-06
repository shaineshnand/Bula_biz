import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFund, useTitle } from "../context";
import { Mark } from "../components/Art";

const roles = [
  { id: "start", label: "I’m starting a business", dest: "/start" },
  { id: "scale", label: "My business is already operating", dest: "/fund?filter=scale" },
  { id: "capital", label: "I have capital to back a business", dest: "/fund?filter=scale" },
];

export default function Join() {
  const { account, register } = useFund();
  const navigate = useNavigate();
  useTitle("BulaBiz — Entrepreneurs and the people who have capital");

  const [name, setName] = useState(account?.name || "");
  const [email, setEmail] = useState(account?.email || "");
  const [role, setRole] = useState(account?.role || "");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("Add your name.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Add an email address.");
      return;
    }
    const chosen = roles.find((item) => item.id === role);
    if (!chosen) {
      setError("Choose how you are arriving.");
      return;
    }
    setError("");
    register({ name, email, role });
    navigate(chosen.dest);
  }

  return (
    <section className="signup">
      <div className="wrap">
        <figure className="landing-scene">
          <img src="/photos/josefa.jpg" alt="A palm-lined Fiji coast" />
          <figcaption>
            <p className="landing-brand">
              <Mark size={44} />
              <span>
                bula<em>biz</em>
              </span>
            </p>
            <h1>
              The platform that connects <em>entrepreneurs</em> who need capital with <em>people who have it</em>.
            </h1>
          </figcaption>
        </figure>

        <p className="lede">
          One profile. Register here, then move through the rest of the site with the menu. Tier 1 takes a business from registration until it is operating. Tier 2 is where people with capital can see the growth and back the next step.
        </p>

        <div className="join-points">
          <Link className="join-point" to="/start">
            <p className="kicker">Tier 1</p>
            <h2>Starting a business</h2>
            <p>Register, get ready to open, then operate. The books and one form live on this path.</p>
          </Link>
          <Link className="join-point" to="/fund?filter=scale">
            <p className="kicker">Tier 2</p>
            <h2>Scaling up</h2>
            <p>The business is already open. A green growth line is on the profile, so a backer can see it before they commit.</p>
          </Link>
          <Link className="join-point" to="/journey">
            <p className="kicker">The path</p>
            <h2>One profile, two doors</h2>
            <p>The same record carries a shop from the first registration line to the first backer.</p>
          </Link>
          <Link className="join-point" to="/home">
            <p className="kicker">Choose</p>
            <h2>Both doors</h2>
            <p>Already know which side you are on? Pick starting or scaling up.</p>
          </Link>
        </div>

        <form className="join-form" id="register" onSubmit={submit}>
          <p className="kicker">Register</p>
          <h2>{account ? `Welcome back, ${account.name.split(" ")[0]}.` : "Create your profile."}</h2>
          <p className="who">This preview keeps your name in this browser. It does not open a real account, and no money moves.</p>

          <label>
            Your name
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Mere Vuatalevu" />
          </label>
          <label>
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" placeholder="mere@shop.fj" />
          </label>
          <fieldset className="join-roles">
            <legend>How are you arriving?</legend>
            {roles.map((item) => (
              <label key={item.id}>
                <input
                  type="radio"
                  name="role"
                  value={item.id}
                  checked={role === item.id}
                  onChange={() => setRole(item.id)}
                />
                {item.label}
              </label>
            ))}
          </fieldset>
          {error && <p className="join-error">{error}</p>}
          <button className="btn btn-block" type="submit">
            {account ? "Update and continue" : "Register and continue"}
          </button>
        </form>
      </div>
    </section>
  );
}
