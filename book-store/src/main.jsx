import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <ToastProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </ToastProvider>
);
