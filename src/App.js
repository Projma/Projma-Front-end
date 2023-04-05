import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { Dashborad } from "./pages/Dashborad";
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
import BoardOverView from "./pages/BoardOverView";
import Email_verification_2 from "./components/Registration/EmailVerification";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { faIR } from "@mui/material/locale";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import BoardInvitation from "./pages/BoardInvitation";
import { Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Board from "./components/Board/Board";
import Calendar from "./components/Calendar/Calendar";

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
    <div className="styled-scrollbars">
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
              <Route
                exact
                path="/forget-password"
                element={<ForgetPassword />}
              />
              <Route
                exact
                path="/reset-password"
                // element={<PrivateRoute children={<ResetPassword />} />}
                element=<ResetPassword />
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
                path="kanban/:boardId"
                element={
                  <PrivateRoute
                    children={<PrivateRoute children={<BoardOverView />} />}
                  />
                }
              >
                <Route exact path="board" element={
                  <PrivateRoute
                    children={<PrivateRoute children={<Board />} />}
                  />
                }/>
                <Route exact path="calendar" element={
                  <PrivateRoute
                    children={<PrivateRoute children={<Calendar/>} />}
                  />
                }/>
              </Route>
              <Route
                exact
                path="/invite_page/:token"
                element={<InvitePage />}
              />
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
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate replace to="/404" />} />
            </Routes>
          </Router>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
