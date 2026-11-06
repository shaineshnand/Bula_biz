import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useFund } from "./context";
import { fjd } from "./data";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Join from "./pages/Join";
import Home from "./pages/Home";
import Fund from "./pages/Fund";
import Profile from "./pages/Profile";
import Start from "./pages/Start";
import Journey from "./pages/Journey";
import Present from "./pages/Present";

function ScrollTop() {
  const { pathname, search, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, search, hash]);
  return null;
}

function Missing() {
  return (
    <div className="wrap page-miss">
      <p className="kicker">Missing page</p>
      <h1>That page is not on the books.</h1>
      <a className="btn" href="/">
        Back home
      </a>
    </div>
  );
}

export default function App() {
  const { toast, setToast, list } = useFund();
  const { pathname } = useLocation();
  const presenting = pathname === "/present";
  const toasted = toast ? list.find((b) => b.id === toast.id) : null;

  return (
    <>
      <ScrollTop />
      {!presenting && <Nav />}
      <main id="content">
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/home" element={<Home />} />
          <Route path="/fund" element={<Fund />} />
          <Route path="/business/:id" element={<Profile />} />
          <Route path="/start" element={<Start />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/present" element={<Present />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </main>
      {!presenting && <Footer />}
      {toast && (
        <button className="toast" type="button" onClick={() => setToast(null)}>
          <strong>
            Invest in {toasted?.name} · {fjd(toast.amount)}
          </strong>
          <span>Nothing was charged. In the live product this sits in trust.</span>
        </button>
      )}
    </>
  );
}
