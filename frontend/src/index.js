import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ✅ Ensure App.js exists in src/
import "./index.css"; // ✅ Ensure index.css exists in src/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
