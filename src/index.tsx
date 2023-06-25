import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import NotFound from "./NotFound";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <HashRouter>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </HashRouter>
);
