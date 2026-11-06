import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { fjd } from "../data";
import { useFund } from "../context";
import { Mark } from "./Art";

export default function Nav() {
  const { pledges, total, removePledge, list, account } = useFund();
  const [menu, setMenu] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!menu) return undefined;
    function onKey(e) {
      if (e.key === "Escape") setMenu(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  function openBacks() {
    dialogRef.current?.showModal();
  }

  return (
    <header className="nav">
      <a className="skip" href="#content">
        Skip to content
      </a>
      <div className="wrap nav-bar">
        <Link className="logo" to="/" onClick={() => setMenu(false)}>
          <Mark />
          <span>
            bula<em>biz</em>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/" end>
            Platform
          </NavLink>
          <NavLink to="/home">Doors</NavLink>
          <NavLink to="/start">Starting</NavLink>
          <NavLink to="/fund?filter=scale">Scaling up</NavLink>
          <NavLink to="/journey">Journey</NavLink>
        </nav>

        <div className="nav-end">
          {account ? (
            <span className="backs-btn">In · {account.name.split(" ")[0]}</span>
          ) : (
            <Link className="btn btn-small" to="/#register">
              Register
            </Link>
          )}
          <button className="backs-btn" type="button" onClick={openBacks}>
            Your backs
            <span>{pledges.length}</span>
          </button>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={menu}
            aria-controls="mobile-nav"
            onClick={() => setMenu((v) => !v)}
          >
            <span className="sr">{menu ? "Close menu" : "Open menu"}</span>
            <i />
            <i />
          </button>
        </div>
      </div>

      {menu && (
        <div className="nav-panel" id="mobile-nav">
          <NavLink to="/" end onClick={() => setMenu(false)}>
            The platform
          </NavLink>
          <NavLink to="/home" onClick={() => setMenu(false)}>
            Both doors
          </NavLink>
          <NavLink to="/start" onClick={() => setMenu(false)}>
            Starting a business
          </NavLink>
          <NavLink to="/fund?filter=scale" onClick={() => setMenu(false)}>
            Scaling up
          </NavLink>
          <NavLink to="/fund?view=offers" onClick={() => setMenu(false)}>
            Funding Finder
          </NavLink>
          <NavLink to="/journey" onClick={() => setMenu(false)}>
            The journey
          </NavLink>
          <NavLink to="/#register" onClick={() => setMenu(false)}>
            {account ? "Your registration" : "Register"}
          </NavLink>
        </div>
      )}

      <dialog className="sheet" ref={dialogRef} aria-labelledby="backs-title">
        <div className="sheet-head">
          <div>
            <p className="kicker">Preview only</p>
            <h2 id="backs-title">Your backs</h2>
          </div>
          <button type="button" className="icon-x" onClick={() => dialogRef.current?.close()}>
            Close
          </button>
        </div>
        {pledges.length === 0 ? (
          <p className="sheet-empty">
            Nothing here yet. A back in this preview is a promise on paper — no money moves.
          </p>
        ) : (
          <ul className="sheet-list">
            {pledges.map((p) => {
              const b = list.find((item) => item.id === p.id);
              return (
                <li key={p.at}>
                  <div>
                    <strong>{b?.name}</strong>
                    <span>{b?.business}</span>
                  </div>
                  <div className="sheet-amt">
                    <b>{fjd(p.amount)}</b>
                    <button type="button" onClick={() => removePledge(p.at)}>
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <div className="sheet-foot">
          <span>Preview total</span>
          <strong>{fjd(total)}</strong>
        </div>
        <p className="fine">
          In the live product this would sit in a trust account and repay from sales. Here it is a design preview.
        </p>
      </dialog>
    </header>
  );
}
