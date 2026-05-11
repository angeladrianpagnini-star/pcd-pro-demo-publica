import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./modules/app/App.jsx";
import { I18nProvider } from "./shared/i18n/I18nContext.jsx";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>
);
