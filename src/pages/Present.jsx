import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mark } from "../components/Art";
import { useTitle } from "../context";

const TOTAL = 8;

export default function Present() {
  useTitle("Presentation — BulaBiz");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    function onKey(event) {
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        setIndex((n) => Math.min(TOTAL - 1, n + 1));
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        setIndex((n) => Math.max(0, n - 1));
      }
      if (event.key === "Home") setIndex(0);
      if (event.key === "End") setIndex(TOTAL - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={`deck ${index === 0 || index === TOTAL - 1 ? "deck-dark" : ""}`}>
      <div className="deck-slide" aria-live="polite">
        {index === 0 && <Cover />}
        {index === 1 && <Problem />}
        {index === 2 && <Doors />}
        {index === 3 && <StartSteps />}
        {index === 4 && <Invest />}
        {index === 5 && <Figures />}
        {index === 6 && <Path />}
        {index === 7 && <Close />}
      </div>
      <div className="deck-bar">
        <Link className="deck-logo" to="/">
          <Mark size={28} />
          <span>
            bula<em>biz</em>
          </span>
        </Link>
        <div className="deck-dots" role="tablist" aria-label="Slides">
          {Array.from({ length: TOTAL }, (_, n) => (
            <button
              key={n}
              type="button"
              className={n === index ? "on" : ""}
              aria-label={`Slide ${n + 1}`}
              aria-current={n === index ? "true" : undefined}
              onClick={() => setIndex(n)}
            />
          ))}
        </div>
        <div className="deck-nav">
          <span>
            {index + 1} / {TOTAL}
          </span>
          <button type="button" onClick={() => setIndex((n) => Math.max(0, n - 1))} disabled={index === 0}>
            Back
          </button>
          <button type="button" onClick={() => setIndex((n) => Math.min(TOTAL - 1, n + 1))} disabled={index === TOTAL - 1}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function Cover() {
  return (
    <div className="deck-cover">
      <p className="kicker">Creative HQ · Fiji MSMEs · concept preview</p>
      <h1>
        The platform that connects <em>entrepreneurs</em> who need capital with <em>people who have it</em>.
      </h1>
      <p>One business profile. From the day it is registered, until neighbours and the diaspora can invest in it.</p>
    </div>
  );
}

function Problem() {
  return (
    <>
      <p className="kicker">The gap</p>
      <h1>The shop has customers. The funder needs a record.</h1>
      <div className="deck-split">
        <article>
          <h2>What is already there</h2>
          <p>A stall, a bay, a canteen. Daily sales. Family overseas who would help if they could see the week.</p>
        </article>
        <article>
          <h2>What stops the money</h2>
          <p>No books a panel will read. A loan that asks for a title deed. A new form every time the owner comes back.</p>
        </article>
      </div>
    </>
  );
}

function Doors() {
  return (
    <>
      <p className="kicker">One profile, two doors</p>
      <h1>Where is the business today?</h1>
      <div className="deck-split">
        <article className="deck-teal">
          <p className="kicker">Tier 1 · Start</p>
          <h2>From registration until it is operating.</h2>
          <p>Free for the business. Register, get ready to open, then write each sale and cost.</p>
        </article>
        <article className="deck-coral">
          <p className="kicker">Tier 2 · Scale It Up</p>
          <h2>Already open. People can invest.</h2>
          <p>From FJD 25. No collateral. Repaid from sales, held in trust. The growth chart is what the investor reads.</p>
        </article>
      </div>
    </>
  );
}

function StartSteps() {
  const steps = [
    ["1", "Register", "Name, place, and what the business will do."],
    ["2", "Get ready to open", "ID, M-PAiSA consent, and what the money is for."],
    ["3", "Operate", "Sales and costs, the day they happen. The grant form waits for six honest lines."],
  ];
  return (
    <>
      <p className="kicker">Tier 1</p>
      <h1>Click a step. Fill it. It is done.</h1>
      <ol className="deck-steps">
        {steps.map(([n, title, text]) => (
          <li key={n}>
            <span>{n}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

function Invest() {
  return (
    <>
      <p className="kicker">Tier 2</p>
      <h1>Invest in a business you can see.</h1>
      <div className="deck-split deck-invest">
        <article>
          <p className="kicker">Open round · Sereana · Levuka</p>
          <p className="deck-figure">FJD 260</p>
          <p>to go of FJD 1,900 · 86% invested</p>
          <p className="deck-up">Up 47% in six weeks</p>
          <p>Last week’s takings were FJD 470. That line is what repayment comes from.</p>
        </article>
        <article>
          <h2>The ask on the card</h2>
          <ul>
            <li>Choose an amount, from FJD 25.</li>
            <li>The button says invest in that owner.</li>
            <li>Term is flexible. A thin week pays less.</li>
            <li>Collateral: none. Funds sit in trust.</li>
          </ul>
        </article>
      </div>
    </>
  );
}

function Figures() {
  return (
    <>
      <p className="kicker">After you invest · Sereana, FJD 50</p>
      <h1>The investor sees the figures they can get.</h1>
      <div className="deck-stats">
        <article>
          <span>You put in</span>
          <strong>FJD 50</strong>
          <small>2.6% of the round</small>
        </article>
        <article>
          <span>Back over 8 months</span>
          <strong>FJD 51</strong>
          <small>FJD 1.48 a week if last week holds</small>
        </article>
        <article className="up">
          <span>Profit</span>
          <strong>FJD 1</strong>
          <small>Your money is back in month 8</small>
        </article>
      </div>
      <p className="deck-note">
        12% of weekly takings is shared across the round. If takings stay at the six-week average, the same FJD 50 comes back short by FJD 9. These figures follow the books in the preview. Nothing is charged.
      </p>
    </>
  );
}

function Path() {
  const steps = [
    ["01", "Record"],
    ["02", "Get ready"],
    ["03", "Apply"],
    ["04", "Graduate"],
    ["05", "Raise"],
    ["06", "Repay and grow"],
  ];
  return (
    <>
      <p className="kicker">One story</p>
      <h1>The business keeps the profile. The money changes shape.</h1>
      <ol className="deck-path">
        {steps.map(([n, title]) => (
          <li key={n} className={n < "04" ? "start" : n === "04" ? "graduate" : "scale"}>
            <span>{n}</span>
            <strong>{title}</strong>
          </li>
        ))}
      </ol>
      <p className="deck-note">About a year of records, a grant used, and growing sales unlock the crowd round. AI summarises. People award the grant and choose the business.</p>
    </>
  );
}

function Close() {
  return (
    <div className="deck-cover">
      <p className="kicker">What to show, and what comes next</p>
      <h1>Start is the pilot. The crowd waits on the rules.</h1>
      <div className="deck-split">
        <article>
          <h2>Show now</h2>
          <p>Registration, the book, one application, and Funding Finder. Free for the shop. A grant programme pays for cleaner applications.</p>
        </article>
        <article>
          <h2>Say this is next</h2>
          <p>Scale It Up needs the Business Funding Act 2025, an RBF sandbox, a licensed trustee, and a clear line for diaspora money. A raise would take about 3% to 5%.</p>
        </article>
      </div>
      <p className="deck-links">
        <Link to="/">Open the site</Link>
        <Link to="/start">Tier 1</Link>
        <Link to="/business/sereana">Invest in Sereana</Link>
      </p>
    </div>
  );
}
