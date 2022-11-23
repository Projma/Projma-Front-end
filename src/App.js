import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import logo from "./logo.svg";
import "./App.css";
import "./fonts/Vazir.ttf";
import ForgetPassword from "./components/Password/ForgetPassword";
import ResetPassword from "./components/Password/ResetPassword";

function App() {
  // functional base component
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/forget-password" element={<ForgetPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
