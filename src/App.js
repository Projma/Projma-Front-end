import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { Dashborad } from "./pages/Dashborad";
import logo from "./logo.svg";
import "./App.css";
import "./fonts/Vazir.ttf";
import { Provider } from "react-redux";
import store from "./store";
// import { login, remove_token } from "../src/actions/authActions";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';

const theme = createTheme(
  {
    typography: {
      fontFamily: 'Vazir',
    },
  },
  faIR
);

function App() {
  // functional base component
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {/* https://www.freecodecamp.org/news/how-to-build-a-redux-powered-react-app/ */}
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/dashboard" element={<Dashborad />} />
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
