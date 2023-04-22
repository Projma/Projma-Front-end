import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from './reportWebVitals';
import store from "./store";
import { login } from "../src/actions/authActions";
import { ProSidebarProvider } from "react-pro-sidebar";

const root = ReactDOM.createRoot(document.getElementById("root"));

const app = (
  // <React.StrictMode>
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  // </React.StrictMode>
);

let token = localStorage.getItem("access_token");
if (token) {
  store
    .dispatch(login())
    .then(() => {
      root.render(app);
    })
    .catch((error) => {
      root.render(app);
    });
} else {
  root.render(app);
}
