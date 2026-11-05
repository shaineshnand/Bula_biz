import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FundProvider } from "./context";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FundProvider>
        <App />
      </FundProvider>
    </BrowserRouter>
  </StrictMode>
);
