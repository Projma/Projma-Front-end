import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
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
import NotFound from "./pages/NotFound";
import Board from "./components/Board/Board";
import Calendar from "./components/Calendar/Calendar";
import Poll from "./components/Poll/Poll";
import Retro from "./components/Retro/Retro";
import DiscussPage from "./pages/DiscussPage";
import RetroReflect from "./components/Retro/RetroReflect";
import Vote from "./components/Retro/Vote/Vote";
import Discuss from "./components/Retro/Discuss/Discuss";

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
                element={
                  <PrivateRoute>
                    <Dashborad />
                  </PrivateRoute>
                }
              />
              <Route exact path="/signin" element={<SignIn />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route
                exact
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/forget-password"
                element={<ForgetPassword />}
              />
              <Route exact path="/reset-password" element={<ResetPassword />} />
              <Route
                path="workspace/:id/dashboard/*"
                element={
                  <PrivateRoute>
                    <Workspace_management />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="workspace/:workspaceId/kanban/:boardId"
                element={
                  <PrivateRoute>
                    <BoardOverView />
                  </PrivateRoute>
                }
              >
                <Route
                  exact
                  path="board"
                  element={
                    <PrivateRoute>
                      <Board />
                    </PrivateRoute>
                  }
                />
                <Route
                  exact
                  path="calendar"
                  element={
                    <PrivateRoute>
                      <Calendar />
                    </PrivateRoute>
                  }
                />
                <Route
                  exact
                  path="poll"
                  element={
                    <PrivateRoute>
                      <Poll />
                    </PrivateRoute>
                  }
                />
                <Route
                  exact
                  path="retro"
                  element={<PrivateRoute><Retro /></PrivateRoute>}
                >
                  <Route
                    exact
                    path="reflect"
                    element={<PrivateRoute><RetroReflect /></PrivateRoute>}
                  />
                  <Route
                    exact
                    path="group"
                    element={<PrivateRoute><Retro /></PrivateRoute>}
                  />
                  <Route
                    exact
                    path="vote"
                    element={<PrivateRoute><Vote /></PrivateRoute>}
                  />
                  <Route
                    exact
                    path="discuss"
                    element={<PrivateRoute><Discuss /></PrivateRoute>}
                    // element={<PrivateRoute children={<DiscussPage />} />}
                  />
                </Route>
              </Route>
              <Route
                exact
                path="/profileview/:username"
                element={
                  <PrivateRoute>
                    <ProfileView />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/changepassword"
                element={
                  <PrivateRoute>
                    <ChangePassword />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/invite_page/:token"
                element={<InvitePage />}
              />
              <Route
                exact
                path="/borad_invitation/:id/:token"
                element={
                  <PrivateRoute>
                    <BoardInvitation />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/email-verification"
                element={<Email_verification_2 />}
              />
              <Route
                exact
                path="/:boardId/retro/discuss/*"
                // path="/:boardId/retro/discuss/:id"
                element={
                  <PrivateRoute>
                    <DiscussPage />
                  </PrivateRoute>
                }
              />

              {/* has to be last  */}
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
