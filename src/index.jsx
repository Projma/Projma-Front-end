import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
// import reportWebVitals from './reportWebVitals';
import store from "./store";
import { login } from "../src/actions/authActions";
import { ProSidebarProvider } from "react-pro-sidebar";
import { ThemeProvider } from "./context/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));

const app = (
  <ThemeProvider>
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  </ThemeProvider>
);

let token = localStorage.getItem("access_token");
if (token) {
  store
    .dispatch(login())
    .then(() => {
      root.render(app);
    })
    .catch(() => {
      root.render(app);
    });
} else {
  root.render(app);
}
