import React from "react";
import ReactDOM from "react-dom/client";
import "./Editor/css/index.css";
import App from "./Editor/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

