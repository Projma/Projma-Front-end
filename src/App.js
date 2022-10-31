import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import logo from "./logo.svg";
import "./App.css";
import "./fonts/Vazir.ttf";

function App() {
  // functional base component
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
