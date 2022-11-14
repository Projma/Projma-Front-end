import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./components/Registration/Signin";
import SignUp from "./components/Registration/Signup";
import Profile from "./components/Profile/ProfilePage";
import Workspace_management from "./pages/Workspace_management";
import ResetPassword from "./components/Password/ResetPassword";
import ForgetPassword from "./components/Password/ForgetPassword";
import ProfileView from "./components/Profile/ProfilePageView";
import ChangePassword from "./components/Profile/ChangePassword";
import logo from "./logo.svg";
import "./App.css";
import "./fonts/Vazir.ttf";
import Board from "./components/Board/UI/Board";
import Workspace_management from "./pages/Workspace_management";

function App() {
  // functional base component
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/forget-password" element={<ForgetPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route path="workspace/:id/*" element={<Workspace_management />} />
        <Route exact path="/profileview/" element={<ProfileView />} />
        <Route exact path="/changepassword" element={<ChangePassword />} />
        <Route exact path="/board" element={<Board />} />
      </Routes>
    </Router>
  );
}

export default App;
