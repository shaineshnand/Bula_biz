import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { filters, matchFilter, offers } from "../data";
import { useFund, useTitle } from "../context";
import Card from "../components/Card";

const sorts = [
  { id: "almost", label: "Closest to funded" },
  { id: "left", label: "Most still to raise" },
  { id: "new", label: "Newly opened" },
];

export default function Fund() {
  const { list } = useFund();
  const [params, setParams] = useSearchParams();
  const view = params.get("view") === "offers" ? "offers" : "rounds";
  useTitle(view === "rounds" ? "Scaling up — BulaBiz" : "Grants and loans — BulaBiz");
  const requested = params.get("filter") || "all";
  const filter = filters.some((item) => item.id === requested) ? requested : "all";
  const [sort, setSort] = useState("almost");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    let next = list.filter((b) => matchFilter(b, filter));
    if (q) {
      next = next.filter((b) =>
        `${b.name} ${b.business} ${b.place} ${b.sector} ${b.blurb}`.toLowerCase().includes(q)
      );
    }
    next = [...next].sort((a, b) => {
      if (sort === "left") return (b.left || 0) - (a.left || 0);
      if (sort === "new") return b.opened.localeCompare(a.opened);
      return (b.pct || 0) - (a.pct || 0);
    });
    return next;
  }, [list, filter, sort, query]);

  function setView(next) {
    const sp = new URLSearchParams(params);
    if (next === "offers") sp.set("view", "offers");
    else sp.delete("view");
    setParams(sp);
  }

  function setFilter(id) {
    const sp = new URLSearchParams(params);
    if (id === "all") sp.delete("filter");
    else sp.set("filter", id);
    setParams(sp, { replace: true });
  }

  return (
    <div className="page">
      <header className="page-hero">
        <div className="wrap">
          <p className="kicker">{view === "rounds" ? "Tier 2 · scaling up" : "Tier 1 · grants and loans"}</p>
          <h1>{view === "rounds" ? "Scaling up a business that already has a record." : "Every grant and loan, in one place."}</h1>
          <p className="lede">
            {view === "rounds"
              ? "Neighbours here and overseas back the next step. Repaid from sales, no collateral. Each card is a concept profile."
              : "A shop that is just starting should not have to guess which programme fits, or retell its story on five forms."}
          </p>
          <p className="fine">
            Still opening the doors? <Link to="/start">Start a business instead.</Link>
          </p>
          <div className="mode" role="tablist" aria-label="Funding Finder view">
            <button type="button" role="tab" aria-selected={view === "rounds"} className={view === "rounds" ? "on" : ""} onClick={() => setView("rounds")}>
              Open rounds
            </button>
            <button type="button" role="tab" aria-selected={view === "offers"} className={view === "offers" ? "on" : ""} onClick={() => setView("offers")}>
              Grants & loans
            </button>
          </div>
        </div>
      </header>

      {view === "rounds" ? (
        <section className="section">
          <div className="wrap">
            <div className="fund-tools">
              <label className="search">
                <span className="sr">Search businesses</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search a name, town, or trade"
                />
              </label>
              <label className="sort">
                Sort
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  {sorts.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="filters" role="toolbar" aria-label="Filter rounds">
              {filters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={filter === item.id ? "chip on" : "chip"}
                  aria-pressed={filter === item.id}
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="count">
              {shown.length} profile{shown.length === 1 ? "" : "s"}
            </p>
            {shown.length === 0 ? (
              <p className="empty">No profiles match. Clear the search or choose All.</p>
            ) : (
              <>
                {[
                  ["start", "Tier 1 · from registration to operating", "Register, get ready to open, then trade"],
                  ["scale", "Tier 2 · Scale It Up", "Crowd rounds, repaid from sales"],
                ].map(([tier, title, note]) => {
                  const items = shown.filter((b) => b.tier === tier);
                  if (!items.length) return null;
                  return (
                    <div key={tier} className="tier-block">
                      <div className="tier-band">
                        <h2>{title}</h2>
                        <p>{note}</p>
                      </div>
                      <div className="grid">
                        {items.map((b) => (
                          <Card key={b.id} business={b} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
            <div className="loop slim">
              <article>
                <span>01</span>
                <h3>Choose</h3>
                <p>Read the use of funds, the last six weeks, and who already matches.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Back from FJD 25</h3>
                <p>This preview records your amount locally. Nothing is charged.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Sales repay it</h3>
                <p>In the live product, a trust account releases funds and returns them as the shop sells.</p>
              </article>
            </div>
          </div>
        </section>
      ) : (
        <section className="section">
          <div className="wrap offers">
            {offers.map((offer) => (
              <article key={offer.id} className={`offer ${offer.type.toLowerCase()}`}>
                <div>
                  <p className="kicker">{offer.type}</p>
                  <h2>{offer.name}</h2>
                  <p className="who">{offer.who}</p>
                </div>
                <p className="amount">{offer.amount}</p>
                <div>
                  <p>{offer.need}</p>
                  <p className="who">{offer.time}</p>
                  <p className="suits">Suits {offer.suits}</p>
                </div>
                <Link className="btn btn-small" to={offer.type === "Crowd" ? "/fund" : "/start"}>
                  {offer.type === "Crowd" ? "See rounds" : "Check readiness"}
                </Link>
              </article>
            ))}
            <p className="fine offer-note">
              Returning applicants, in the full product, only update what changed. The rest of the profile is already there.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
