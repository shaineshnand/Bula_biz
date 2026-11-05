import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fjd } from "../data";
import { useFund, useTitle } from "../context";
import Card from "../components/Card";

const seed = [
  { id: 1, desc: "Clutch repair", type: "sale", amount: 80 },
  { id: 2, desc: "Oil and plugs", type: "expense", amount: 22 },
  { id: 3, desc: "Two punctures", type: "sale", amount: 16 },
  { id: 4, desc: "Generator service", type: "sale", amount: 65 },
  { id: 5, desc: "Parts from town", type: "expense", amount: 40 },
];

export default function Start() {
  useTitle("Starting a business — BulaBiz");
  const { list } = useFund();
  const starters = list.filter((b) => b.tier === "start");
  const [rows, setRows] = useState(seed);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("sale");
  const [mpaisa, setMpaisa] = useState(false);
  const [idOnFile, setIdOnFile] = useState(false);
  const [consent, setConsent] = useState(false);
  const [useOfFunds, setUseOfFunds] = useState("");
  const [grant, setGrant] = useState("Youth enterprise");
  const [sent, setSent] = useState(false);

  const totals = useMemo(() => {
    const sales = rows.filter((r) => r.type === "sale").reduce((s, r) => s + r.amount, 0);
    const expenses = rows.filter((r) => r.type === "expense").reduce((s, r) => s + r.amount, 0);
    return { sales, expenses, net: sales - expenses };
  }, [rows]);

  const checks = [
    { ok: rows.length >= 6, label: "At least six transactions on the books", hint: `${rows.length} of 6` },
    { ok: totals.net > 0 && totals.sales > 0, label: "Statement shows a surplus", hint: fjd(totals.net) },
    { ok: mpaisa, label: "Consent to link M-PAiSA, or a note that you’ll enter by hand", hint: "Preview toggle" },
    { ok: idOnFile, label: "ID marked on the profile", hint: "Preview toggle" },
    { ok: useOfFunds.trim().length >= 24, label: "Use of funds, in one or two sentences", hint: "Write it below" },
    { ok: consent, label: "Consent to share this profile with the panel", hint: "Yours to withdraw" },
  ];
  const readyCount = checks.filter((c) => c.ok).length;
  const ready = readyCount === checks.length;

  function addRow(e) {
    e.preventDefault();
    const value = Math.round(Number(amount));
    if (!desc.trim() || !value || value <= 0) return;
    setRows((current) => [
      { id: Date.now(), desc: desc.trim(), type, amount: value },
      ...current,
    ]);
    setDesc("");
    setAmount("");
    setSent(false);
  }

  return (
    <div className="page">
      <header className="page-hero start-hero">
        <div className="wrap">
          <p className="kicker">Tier 1 · starting a business</p>
          <h1>Starting a business, made simple.</h1>
          <p className="lede">
            You are Peni, opening a bay in Ba. The same three steps work for a bakery or a corner shop. Write the day.
            The statement writes itself. One form opens when the checklist is honest.
          </p>
          <p className="fine">
            Already past the first year? <Link to="/fund?filter=scale">Scale it up instead.</Link>
          </p>
        </div>
      </header>

      <section className="section tight">
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
            {starters.map((b) => (
              <Card key={b.id} business={b} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap start-grid">
          <div className="books">
            <div className="books-head">
              <div>
                <p className="kicker">Ba Mechanical</p>
                <h2>Today’s book</h2>
              </div>
              <span className="pill">{rows.length} lines</span>
            </div>
            <form className="entry" onSubmit={addRow}>
              <label>
                What happened
                <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Puncture, bike" />
              </label>
              <label>
                FJD
                <input
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="20"
                />
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
            <ul className="book-rows">
              {rows.map((row) => (
                <li key={row.id} className={row.type === "sale" ? "tx-in" : "tx-out"}>
                  <span>{row.desc}</span>
                  <b>
                    {row.type === "sale" ? "+" : "−"}
                    {row.amount}
                  </b>
                  <button
                    type="button"
                    onClick={() => {
                      setRows((current) => current.filter((r) => r.id !== row.id));
                      setSent(false);
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="statement">
              <div className="statement-top">
                <strong>Statement</strong>
                <span>Generated from these lines</span>
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
              <em>{ready ? "Ready to attach to the application." : "Still building. The form waits."}</em>
            </div>
          </div>

          <div className="ready">
            <div className="ready-head">
              <p className="kicker">Funding readiness</p>
              <h2>
                {readyCount} of {checks.length}
              </h2>
              <div className="meter" aria-hidden="true">
                <span style={{ width: `${(readyCount / checks.length) * 100}%` }} />
              </div>
            </div>
            <ul className="checks">
              {checks.map((item) => (
                <li key={item.label} className={item.ok ? "ok" : ""}>
                  <span aria-hidden="true">{item.ok ? "✓" : "○"}</span>
                  <div>
                    <strong>{item.label}</strong>
                    <em>{item.hint}</em>
                  </div>
                </li>
              ))}
            </ul>

            <div className="toggles">
              <button type="button" className={mpaisa ? "on" : ""} onClick={() => setMpaisa((v) => !v)} aria-pressed={mpaisa}>
                {mpaisa ? "M-PAiSA consent on" : "Mark M-PAiSA consent"}
              </button>
              <button type="button" className={idOnFile ? "on" : ""} onClick={() => setIdOnFile((v) => !v)} aria-pressed={idOnFile}>
                {idOnFile ? "ID on the profile" : "Mark ID on the profile"}
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
              onChange={(e) => {
                setUseOfFunds(e.target.value);
                setSent(false);
              }}
              placeholder="A hoist and a lockable parts cupboard, so overnight jobs are not left in the yard."
            />

            <div className={`application ${ready ? "open" : ""}`}>
              {!ready && <p className="lock">Finish the checklist to open the single form.</p>}
              {sent ? (
                <ol className="timeline">
                  <li className="done">
                    <strong>Received</strong>
                    <span>Youth enterprise · just now, in this preview</span>
                  </li>
                  <li className="done">
                    <strong>Summary prepared</strong>
                    <span>A short brief for the panel. Not a decision.</span>
                  </li>
                  <li>
                    <strong>Human panel</strong>
                    <span>Waiting. People award the grant.</span>
                  </li>
                  <li>
                    <strong>If you apply again</strong>
                    <span>You only update what changed.</span>
                  </li>
                </ol>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (ready) setSent(true);
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
                    <input readOnly value="Ba Mechanical · Peni · Ba" />
                  </label>
                  <button className="btn btn-coral btn-block" type="submit" disabled={!ready}>
                    Send to the panel
                  </button>
                </form>
              )}
            </div>
            <p className="fine">
              Free for the business. A funder pays because this arrives complete.{" "}
              <Link to="/journey">What happens after a year.</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
