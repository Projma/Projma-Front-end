import React from "react";
import Header from "../components/Header/Header";
import Board from "../components/Board/Board";
import { Helmet } from "react-helmet";
import { Provider } from "../context/board";

const BoardOverView = () => {
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

export default BoardOverView;