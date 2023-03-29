import { useContext } from "react";
import BoardContext from "../context/board";

function useBoard () {
  return useContext(BoardContext);
}

export default useBoard;