import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import LimitToaster from "./components/LimitToaster.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <LimitToaster />
  </StrictMode>,
);
