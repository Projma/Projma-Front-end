import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { Dashborad } from "./pages/Dashborad";
import logo from "./logo.svg";
import "./App.css";
import "./fonts/Vazir.ttf";
import { Provider } from "react-redux";
import store from "./store";
import SignIn from "./components/Registration/Signin";
import SignUp from "./components/Registration/Signup";
import Profile from "./components/Profile/ProfilePage";
import Workspace_management from "./pages/Workspace_management";
import ResetPassword from "./components/Password/ResetPassword";
import ForgetPassword from "./components/Password/ForgetPassword";
import ProfileView from "./components/Profile/ProfilePageView";
import ChangePassword from "./components/Profile/ChangePassword";
import InvitePage from "./pages/InvitePage";
import Kanban from "./components/Kanban/Kanban";
import Email_verification_2 from "./components/Registration/EmailVerification";
// import { login, remove_token } from "../src/actions/authActions";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { faIR } from "@mui/material/locale";
import TaskModal from "./components/TaskModal/TaskModal";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import BoardInvitation from "./pages/BoardInvitation";
import { Navigate } from "react-router-dom";

const theme = createTheme(
  {
    typography: {
      fontFamily: "Vazir",
      htmlFontSize: 9, // 10 (1rem = 9px)
    },
  },
  faIR
);

function App() {
  // functional base component
  // const state = useSelector((state) => state);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {/* https://www.freecodecamp.org/news/how-to-build-a-redux-powered-react-app/ */}
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route
              exact
              path="/dashboard"
              element={<PrivateRoute children={<Dashborad />} />}
            />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route
              exact
              path="/profile"
              element={<PrivateRoute children={<Profile />} />}
            />
            <Route exact path="/forget-password" element={<ForgetPassword />} />
            <Route
              exact
              path="/reset-password"
              element={<PrivateRoute children={<ResetPassword />} />}
            />
            <Route
              path="workspace/:id/*"
              element={
                <PrivateRoute
                  children={
                    <PrivateRoute children={<Workspace_management />} />
                  }
                />
              }
            />
            <Route
              exact
              path="/profileview/:username"
              element={<ProfileView />}
            />
            <Route
              exact
              path="/changepassword"
              element={<PrivateRoute children={<ChangePassword />} />}
            />
            <Route
              exact
              path="/kanban/:id"
              element={
                <PrivateRoute
                  children={<PrivateRoute children={<Kanban />} />}
                />
              }
            />
            <Route exact path="/invite_page/:token" element={<InvitePage />} />
            <Route
              exact
              path="/borad_invitation/:id/:token"
              element={<PrivateRoute children={<BoardInvitation />} />}
            />
            <Route
              exact
              path="/email-verification"
              element={<Email_verification_2 />}
            />

            {/* has to be last  */}
            {/* <Route path='*' exact={true} component={My404Component} /> */}
            <Route path="/404" element={<Landing />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
