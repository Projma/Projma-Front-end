import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Landing from "./pages/Landing";
import { Dashborad } from "./pages/Dashborad";
import "./App.scss";
import "./fonts/Vazir.ttf";
import { Provider } from "react-redux";
import store from "./store";
import SignIn from "./components/Registration/Signin";
import SignUp from "./components/Registration/Signup";
import Profile from "./components/Profile/ProfilePage";
import WorkspaceManagement from "./pages/WorkspaceManagement";
import ResetPassword from "./components/Password/ResetPassword";
import ForgetPassword from "./components/Password/ForgetPassword";
import ProfileView from "./components/Profile/ProfilePageView";
import ChangePassword from "./components/Profile/ChangePassword";
import InvitePage from "./pages/InvitePage";
import BoardOverView from "./pages/BoardOverView";
import Email_verification_2 from "./components/Registration/EmailVerification";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
import Group from "./components/Retro/Group/Group";
import RealTest from "./components/RealTime/RealTest";
import WsBoard from "./components/WorkspaceManagement/Board/WsBoard";
import Members from "./components/WorkspaceManagement/Members/Members";
import Main from "./main";
import useTheme from "./hooks/useTheme";

function App() {
  const { theme, getColor } = useTheme();
  const muiTheme = createTheme({
    palette: {
      primary: {
        main: theme.primary,
      },
      secondary: {
        main: theme.secondary,
      },
    },
    typography: {
      fontFamily: "Vazir",
      htmlFontSize: 9, // 10 (1rem = 9px)
      allVariants: {
        color: getColor(theme.minorBg),
      },
    },
    text: {
      primary: getColor(theme.minorBg),
    },
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: theme.mainBg,
            border: `0.2rem solid ${theme.primary} !important`,
            fontSize: "1.3rem !important",
            color: getColor(theme.mainBg),
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            textAlign: "center",
            border: `none !important`,
          },
        },
      },
    },
  });
  return (
    <div
      className={"app styled-scrollbars"}
      style={{
        backgroundColor: theme.mainBg,
      }}
    >
      <ToastContainer
        autoClose={2500}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          fontSize: "1.2rem",
          backgroundColor: theme.mainBg,
          color: getColor(theme.minorBg),
          margin: "0.5rem"
        }}
      />
      <ThemeProvider theme={muiTheme}>
        <Provider store={store}>
          <Router>
            <Main>
              <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route exact path="/realtime" element={<RealTest />} />
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
                <Route
                  exact
                  path="/reset-password"
                  element={<ResetPassword />}
                />
                <Route
                  path="workspace/:id/dashboard/"
                  element={
                    <PrivateRoute>
                      <WorkspaceManagement />
                    </PrivateRoute>
                  }
                >
                  <Route
                    exact
                    path="board"
                    element={
                      <PrivateRoute>
                        <WsBoard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    exact
                    path="team"
                    element={
                      <PrivateRoute>
                        <Members />
                      </PrivateRoute>
                    }
                  />
                </Route>
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
                    element={
                      <PrivateRoute>
                        <Retro />
                      </PrivateRoute>
                    }
                  >
                    <Route
                      exact
                      path="reflect"
                      element={
                        <PrivateRoute>
                          <RetroReflect />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      exact
                      path="group"
                      element={
                        <PrivateRoute>
                          <Group />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      exact
                      path="vote"
                      element={
                        <PrivateRoute>
                          <Vote />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      exact
                      path="discuss"
                      element={
                        <PrivateRoute>
                          <Discuss />
                        </PrivateRoute>
                      }
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
                  element={
                    <PrivateRoute>
                      <DiscussPage />
                    </PrivateRoute>
                  }
                />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate replace to="/404" />} />
              </Routes>
            </Main>
          </Router>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
