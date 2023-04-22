import React from "react";
import Header from "../components/Header/Header";
import Board from "../components/Board/Board";
import { useParams, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Provider } from "../context/board";
import BoardSidebar from "../components/BoardSidebar/BoardSidebar";
import "../styles/BoardOverView.css";
const BoardOverView = () => {
  let params = useParams();
  return (
    <div className="boardoverview--main">
      <Helmet>
        <title>بورد</title>
      </Helmet>
      <Provider boardId={params.boardId} workspaceId={params.workspaceId}>
        <div className="boardoverview--container">
          <div className="boardoverview--sidebar">
            <BoardSidebar />
          </div>
          <div className="boardoverview--header">
            <Header />
          </div>
          <div className="boardoverview--section">
            <Outlet/>
          </div>
        </div>
      </Provider>
      {/* <Footer /> */}
    </div>
  );
};

export default BoardOverView;
