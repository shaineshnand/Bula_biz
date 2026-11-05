import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useFund } from "./context";
import { fjd } from "./data";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Fund from "./pages/Fund";
import Profile from "./pages/Profile";
import Start from "./pages/Start";
import Journey from "./pages/Journey";

function ScrollTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
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
  const toasted = toast ? list.find((b) => b.id === toast.id) : null;

  return (
    <>
      <ScrollTop />
      <Nav />
      <main id="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fund" element={<Fund />} />
          <Route path="/business/:id" element={<Profile />} />
          <Route path="/start" element={<Start />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </main>
      <Footer />
      {toast && (
        <button className="toast" type="button" onClick={() => setToast(null)}>
          <strong>
            Preview back · {toasted?.name} · {fjd(toast.amount)}
          </strong>
          <span>Nothing was charged. In the live product this sits in trust.</span>
        </button>
      )}
    </>
  );
}
