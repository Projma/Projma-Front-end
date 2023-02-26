import React from "react";
import Header from "../Header/Header";
import Board from "../Board/Board";
import Footer from "../Shared/Footer";
import { Helmet } from "react-helmet";

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
      <Board boardId={getLinkInfo(baseLink)} />
      {/* <Footer /> */}
    </div>
  );
};

export default Kanban;
