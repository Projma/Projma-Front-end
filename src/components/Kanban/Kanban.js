import React from "react";
import Header from "../Header/Header";
import Board from "../Board/Board";
import { Helmet } from "react-helmet";
import { Provider } from "../../context/board";

const Kanban = () => {
  const baseLink = window.location.href;
  const getLinkInfo = (baseLink) => {
    return baseLink.split("kanban/")[1];
  };
  return (
    <div className="Kanban_main-page">
      <Helmet>
        <title>بورد</title>
      </Helmet>
      <Header />
      <Provider boardId={getLinkInfo(baseLink)}>
        <Board />
      </Provider>
      {/* <Footer /> */}
    </div>
  );
};

export default Kanban;
