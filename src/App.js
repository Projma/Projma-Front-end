import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Workspace_management from "./pages/Workspace_management";
import ResetPassword from "./components/Password/ResetPassword";
import logo from "./logo.svg";
import "./App.css";
import "./fonts/Vazir.ttf";

function App() {
  // functional base component
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/password" element={<ResetPassword />} />
        <Route path="workspace/:id/*" element={<Workspace_management />} />
        {/* <Route path="workspace/:id/members" element={<Members />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
