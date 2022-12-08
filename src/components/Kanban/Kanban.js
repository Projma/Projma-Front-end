import React from "react";
import Header from "../Header/Header";
import Board from "../Board/UI/Board";
import Footer from "../Shared/Footer";

const Kanban = () => {
  return (
    <div className="Kanban_main-page">
      <Header/>
      <Board/>
      <Footer/>
    </div>
  );
};

export default Kanban;