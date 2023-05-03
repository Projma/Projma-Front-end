import React from "react";
// import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import apiInstance from "../../../../../../utilities/axiosConfig";
import useBoard from "../../../../../../hooks/useBoard";

const CardHeader = ({ cardId }) => {
  const { setIsReq, removeCard } = useBoard();
  const reqDeleteCard = () => {
    setIsReq(true);
    apiInstance
      .delete(`task/delete-task/${cardId}/`)
      .then(() => {
        toast.success("کارت با موفقیت حذف شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        removeCard(cardId);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          toast.error("عملیات با خطا مواجه شد", {
            position: toast.POSITION.BOTTOM_LEFT,
            rtl: true,
          });
        }
      })
      .finally(() => {
        setIsReq(false);
      });
  };

  const handleDeleteCard = (e) => {
    e.stopPropagation();
    reqDeleteCard(cardId);
  };

  return (
    <div className="card_header">
      <div
        className="card_close-icon"
        onClick={(event) => handleDeleteCard(event)}
      >
        <CloseIcon sx={{ fontSize: "1.6rem" }} />
      </div>
      {/* <div
    className="card_edit-icon"
    onClick={(event) => handleEditCardName(event)}
  >
    <EditIcon sx={{ fontSize: "1.6rem" }} />
  </div> */}
    </div>
  );
};

export default CardHeader;