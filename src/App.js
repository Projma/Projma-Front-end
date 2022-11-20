import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { Dashborad } from "./pages/Dashborad";
import logo from "./logo.svg";
import "./App.css";
import "./fonts/Vazir.ttf";
// import { Provider } from "react-redux";
// import store from "./store";

function App() {
  // functional base component
  return (
    // <Provider store={store}> // https://www.freecodecamp.org/news/how-to-build-a-redux-powered-react-app/
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/dashboard" element={<Dashborad />} />
        </Routes>
      </Router>
    // </Provider>
  );
}

export default App;
