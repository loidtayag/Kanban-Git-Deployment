import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App";
import NotFound from "./components/invalid_page/NotFound";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
