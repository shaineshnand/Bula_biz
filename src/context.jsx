import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { businesses as seed, decorate } from "./data";

const FundContext = createContext(null);

export function FundProvider({ children }) {
  const [pledges, setPledges] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(null), 4200);
    return () => clearTimeout(id);
  }, [toast]);

  const api = useMemo(() => {
    const list = seed.map((b) => decorate(b, pledges));
    const total = pledges.reduce((sum, p) => sum + p.amount, 0);

    function pledge(id, amount) {
      const business = list.find((b) => b.id === id);
      if (!business?.goal || business.funded) return { ok: false };
      const take = Math.min(amount, business.left);
      if (take <= 0) return { ok: false };
      setPledges((current) => [
        { id, amount: take, at: Date.now() },
        ...current,
      ]);
      setToast({
        id,
        name: business.name,
        amount: take,
      });
      return { ok: true, amount: take };
    }

    function removePledge(at) {
      setPledges((current) => current.filter((p) => p.at !== at));
    }

    return { list, pledges, total, pledge, removePledge, toast, setToast };
  }, [pledges, toast]);

  return <FundContext.Provider value={api}>{children}</FundContext.Provider>;
}

export function useFund() {
  const ctx = useContext(FundContext);
  if (!ctx) throw new Error("useFund must be used inside FundProvider");
  return ctx;
}

export function useTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
