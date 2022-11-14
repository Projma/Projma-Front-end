import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Workspace_management from "./pages/Workspace_management";
import logo from "./logo.svg";
import "./App.css";
import "./fonts/Vazir.ttf";
import ThemeHelper from "./pages/test";

function App() {
  // functional base component
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/workspace" element={<Workspace_management />} />
        <Route exact path="/test" element={<ThemeHelper />} />
      </Routes>
    </Router>
  );
}

export default App;
