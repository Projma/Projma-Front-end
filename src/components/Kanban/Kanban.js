import React from "react";
import Header from "../Header/Header";
import Board from "../Board/UI/Board";
import Footer from "../Shared/Footer";

const Kanban = () => {
  const baseLink = window.location.href;
  const getLinkInfo = (baseLink) => {
    return baseLink.split("kanban/")[1];
  };
  return (
    <div className="Kanban_main-page">
      <Header/>
      <Board boardId={getLinkInfo(baseLink)}/>
      <Footer/>
    </div>
  );
};

export default Kanban;