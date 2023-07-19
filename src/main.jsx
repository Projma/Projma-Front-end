import Header from "./components/Header/Header";
import "./App.scss";
import useTheme from "./hooks/useTheme";

const Main = ({ children }) => {
  const {theme} = useTheme();
  return (
    <>
      <header><Header/></header>
      <section style={{backgroundImage: theme.bg}}>{children}</section>
    </>
  );
};
 
export default Main;
