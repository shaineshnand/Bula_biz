import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fjd } from "../data";
import { useFund, useTitle } from "../context";
import Card from "../components/Card";

export default function Start() {
  useTitle("Starting a business — BulaBiz");
  const { list, account } = useFund();
  const starters = list.filter((b) => b.tier === "start");

  const [step, setStep] = useState(1);
  const [owner, setOwner] = useState(account?.name || "");
  const [bizName, setBizName] = useState("");
  const [place, setPlace] = useState("");
  const [work, setWork] = useState("");
  const [rows, setRows] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("sale");
  const [mpaisa, setMpaisa] = useState(false);
  const [idOnFile, setIdOnFile] = useState(false);
  const [consent, setConsent] = useState(false);
  const [useOfFunds, setUseOfFunds] = useState("");
  const [grant, setGrant] = useState("Youth enterprise");
  const [sent, setSent] = useState(false);
  const [notice, setNotice] = useState("");

  const totals = useMemo(() => {
    const sales = rows.filter((r) => r.type === "sale").reduce((s, r) => s + r.amount, 0);
    const expenses = rows.filter((r) => r.type === "expense").reduce((s, r) => s + r.amount, 0);
    return { sales, expenses, net: sales - expenses };
  }, [rows]);

  const registered = owner.trim().length > 1 && bizName.trim().length > 1 && place.trim().length > 1 && work.trim().length >= 12;
  const readyToOpen = mpaisa && idOnFile && consent && useOfFunds.trim().length >= 24;
  const operating = rows.some((row) => row.type === "sale");
  const formReady = readyToOpen && rows.length >= 6 && totals.net > 0 && totals.sales > 0;

  const steps = [
    {
      n: 1,
      title: "Register",
      text: "Name, place, and what the business will do.",
      open: true,
      done: registered,
    },
    {
      n: 2,
      title: "Get ready to open",
      text: "The checklist, and one form if a grant opens the door.",
      open: registered,
      done: readyToOpen,
    },
    {
      n: 3,
      title: "Operate",
      text: "Sales and costs go in as the day happens.",
      open: registered && readyToOpen,
      done: operating,
    },
  ];

  function go(n) {
    const target = steps.find((item) => item.n === n);
    if (!target?.open) {
      setNotice(n === 2 ? "Register the business first." : "Finish getting ready before the doors open.");
      return;
    }
    setNotice("");
    setStep(n);
    document.getElementById("step-work")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function saveRegistration(e) {
    e.preventDefault();
    if (!registered) {
      setNotice("Add your name, the business, the place, and what it will do.");
      return;
    }
    setNotice("");
    setStep(2);
  }

  function saveReady(e) {
    e.preventDefault();
    if (!readyToOpen) {
      setNotice("Mark the checklist and write what the money is for.");
      return;
    }
    setNotice("");
    setStep(3);
  }

  function addRow(e) {
    e.preventDefault();
    const value = Math.round(Number(amount));
    if (!desc.trim() || !value || value <= 0) return;
    setRows((current) => [{ id: Date.now(), desc: desc.trim(), type, amount: value }, ...current]);
    setDesc("");
    setAmount("");
    setSent(false);
  }

  return (
    <div className="page">
      <header className="page-hero start-hero">
        <div className="wrap">
          <p className="kicker">Tier 1 · registration to operating</p>
          <h1>From registration to an open business.</h1>
          <p className="lede">
            The three steps below are the work. Register the business, get it ready to open, then write the days it operates.
          </p>
          <p className="fine">
            Already past the first year? <Link to="/fund?filter=scale">Scale it up instead.</Link>
          </p>
        </div>
      </header>

      <section className="section tight">
        <div className="wrap">
          <ol className="plain-steps">
            {steps.map((item) => (
              <li key={item.n} className={`${step === item.n ? "current" : ""} ${item.done ? "done" : ""} ${item.open ? "" : "wait"}`}>
                <button type="button" onClick={() => go(item.n)} aria-current={step === item.n ? "step" : undefined}>
                  <span>{item.n}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <em className="step-state">{item.done ? "Done" : item.open ? "Open" : "Locked"}</em>
                </button>
              </li>
            ))}
          </ol>
          {notice && <p className="join-error">{notice}</p>}

          <div id="step-work">
          {step === 1 && (
            <form className="step-panel" onSubmit={saveRegistration}>
              <p className="kicker">Step 1 · Register</p>
              <h2>Put the business on one profile.</h2>
              <div className="step-fields">
                <label>
                  Your name
                  <input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Peni" />
                </label>
                <label>
                  Business name
                  <input value={bizName} onChange={(e) => setBizName(e.target.value)} placeholder="Ba Mechanical" />
                </label>
                <label>
                  Place
                  <input value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Ba" />
                </label>
                <label>
                  What will it do?
                  <textarea rows={3} value={work} onChange={(e) => setWork(e.target.value)} placeholder="Repair bikes and small engines from a bay in town." />
                </label>
                <button className="btn" type="submit">
                  {registered ? "Saved. Get ready to open" : "Register this business"}
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form className="step-panel" onSubmit={saveReady}>
              <p className="kicker">Step 2 · Get ready to open</p>
              <h2>{bizName || "The business"} is registered. Finish the checklist.</h2>
              <p className="who">
                {owner} · {bizName} · {place}. {work}
              </p>
              <ul className="checks">
                <li className={idOnFile ? "ok" : ""}>
                  <span aria-hidden="true">{idOnFile ? "✓" : "○"}</span>
                  <div>
                    <strong>ID marked on the profile</strong>
                  </div>
                </li>
                <li className={mpaisa ? "ok" : ""}>
                  <span aria-hidden="true">{mpaisa ? "✓" : "○"}</span>
                  <div>
                    <strong>Consent to link M-PAiSA, or enter takings by hand</strong>
                  </div>
                </li>
                <li className={useOfFunds.trim().length >= 24 ? "ok" : ""}>
                  <span aria-hidden="true">{useOfFunds.trim().length >= 24 ? "✓" : "○"}</span>
                  <div>
                    <strong>Use of funds, in one or two sentences</strong>
                  </div>
                </li>
                <li className={consent ? "ok" : ""}>
                  <span aria-hidden="true">{consent ? "✓" : "○"}</span>
                  <div>
                    <strong>Consent to share this profile with the panel</strong>
                  </div>
                </li>
              </ul>
              <div className="toggles">
                <button type="button" className={idOnFile ? "on" : ""} onClick={() => setIdOnFile((v) => !v)} aria-pressed={idOnFile}>
                  {idOnFile ? "ID on the profile" : "Mark ID on the profile"}
                </button>
                <button type="button" className={mpaisa ? "on" : ""} onClick={() => setMpaisa((v) => !v)} aria-pressed={mpaisa}>
                  {mpaisa ? "M-PAiSA consent on" : "Mark M-PAiSA consent"}
                </button>
                <button type="button" className={consent ? "on" : ""} onClick={() => setConsent((v) => !v)} aria-pressed={consent}>
                  {consent ? "Panel may see this" : "Consent to share with the panel"}
                </button>
              </div>
              <label className="use-label" htmlFor="use">
                Use of funds
              </label>
              <textarea
                id="use"
                rows={4}
                value={useOfFunds}
                onChange={(e) => setUseOfFunds(e.target.value)}
                placeholder="A hoist and a lockable parts cupboard, so overnight jobs are not left in the yard."
              />
              <button className="btn" type="submit">
                {readyToOpen ? "Ready. Start operating" : "Finish the checklist to open"}
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="step-panel">
              <p className="kicker">Step 3 · Operate</p>
              <h2>Write the day for {bizName}.</h2>
              <p className="who">Each sale or cost is one line. The statement comes from those lines.</p>
              <form className="entry" onSubmit={addRow}>
                <label>
                  What happened
                  <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Puncture, bike" />
                </label>
                <label>
                  FJD
                  <input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="20" />
                </label>
                <div className="seg" role="group" aria-label="Sale or expense">
                  <button type="button" className={type === "sale" ? "on" : ""} onClick={() => setType("sale")}>
                    Sale
                  </button>
                  <button type="button" className={type === "expense" ? "on" : ""} onClick={() => setType("expense")}>
                    Expense
                  </button>
                </div>
                <button className="btn btn-small" type="submit">
                  Add line
                </button>
              </form>
              {rows.length === 0 ? (
                <p className="book-empty">Nothing in the book yet. Add the first sale or cost.</p>
              ) : (
                <ul className="book-rows">
                  {rows.map((row) => (
                    <li key={row.id} className={row.type === "sale" ? "tx-in" : "tx-out"}>
                      <span>{row.desc}</span>
                      <b>
                        {row.type === "sale" ? "+" : "−"}
                        {row.amount}
                      </b>
                      <button type="button" onClick={() => setRows((current) => current.filter((r) => r.id !== row.id))}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="statement">
                <div className="statement-top">
                  <strong>Statement</strong>
                  <span>{operating ? "The business is operating" : "Waiting for the first sale"}</span>
                </div>
                <p>
                  <span>Sales</span>
                  <b>{fjd(totals.sales)}</b>
                </p>
                <p>
                  <span>Expenses</span>
                  <b>{fjd(totals.expenses)}</b>
                </p>
                <p className="net">
                  <span>Net</span>
                  <b>{fjd(totals.net)}</b>
                </p>
              </div>

              <div className={`application ${formReady ? "open" : ""}`}>
                {!formReady && (
                  <p className="lock">
                    The grant form opens after six lines and a surplus. You have {rows.length} of 6
                    {totals.net > 0 ? `, and a surplus of ${fjd(totals.net)}` : ""}.
                  </p>
                )}
                {sent ? (
                  <ol className="timeline">
                    <li className="done">
                      <strong>Received</strong>
                      <span>{grant} · just now, in this preview</span>
                    </li>
                    <li className="done">
                      <strong>Summary prepared</strong>
                      <span>A short brief for the panel. Not a decision.</span>
                    </li>
                    <li>
                      <strong>Human panel</strong>
                      <span>Waiting. People award the grant.</span>
                    </li>
                  </ol>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (formReady) setSent(true);
                    }}
                  >
                    <label>
                      Programme
                      <select value={grant} onChange={(e) => setGrant(e.target.value)}>
                        <option>Youth enterprise</option>
                        <option>MSME Kickstart</option>
                        <option>Climate-smart agri loan</option>
                      </select>
                    </label>
                    <label>
                      Business
                      <input readOnly value={`${bizName} · ${owner} · ${place}`} />
                    </label>
                    <button className="btn btn-coral btn-block" type="submit" disabled={!formReady}>
                      Send to the panel
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
          </div>

          <div className="grid step-examples">
            {starters.map((b) => (
              <Card key={b.id} business={b} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
