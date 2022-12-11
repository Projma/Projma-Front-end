import React from "react";
import Header from "../Header/Header";
import Board from "../Board/UI/Board";
import Footer from "../Shared/Footer";
// import "./Kanban.css";

const Kanban = () => {
  const baseLink = window.location.href;
  const getLinkInfo = (baseLink) => {
    return baseLink.split("kanban/")[1];
  };
  return (
    <div className="kanban_main-page">
      <Header className={"kanban_header"}/>
      <Board boardId={getLinkInfo(baseLink)} className={"kanban_board"}/>
      <Footer className={"kanban_footer"}/>
    </div>
  );
};

export default Kanban;