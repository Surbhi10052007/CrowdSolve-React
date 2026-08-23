/**
 * ====================================================================
 * CROWDSOLVE - EVAL 1
 * --------------------------------------------------------------------
 * File: main.jsx
 * Contributor: Member 1 (Surbhi - Project Lead)
 * Description: React root entry point that mounts the App component into the DOM.
 * ====================================================================
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
