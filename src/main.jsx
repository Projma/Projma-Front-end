import Header from "./components/Header/Header";
import "./App.scss";

const Main = ({ children }) => {
  return (
    <>
      <header><Header/></header>
      <section>{children}</section>
    </>
  );
};
 
export default Main;
