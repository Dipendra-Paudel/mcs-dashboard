import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/tailwind.css";
import "./assets/css/styles.css";
import "./assets/css/logo.css";
import RouteManagement from "./RouteManagement";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RouteManagement />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
