import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./components/Registration/Signin";
<<<<<<< HEAD
import SignUp from "./components/Registration/Signup";
import Profile from "./components/Profile/ProfilePage";
=======
>>>>>>> cb294d4 ([fix]: Add new Routers)
import logo from "./logo.svg";
import "./App.css";
import "./fonts/Vazir.ttf";

function App() {
  // functional base component
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
<<<<<<< HEAD
        <Route exact path="/test" element={<Landing />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/profile" element={<Profile />} />
=======
        <Route exact path="/signin" element={<SignIn />} />
>>>>>>> cb294d4 ([fix]: Add new Routers)
      </Routes>
    </Router>
  );
}

export default App;
