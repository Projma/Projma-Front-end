import * as React from "react";
import "../../styles/TaskModal.css";
import { useState } from "react";
import { Button } from "@mui/material";
import apiInstance from "../../utilities/axiosConfig";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import "react-toastify/dist/ReactToastify.css";

export default function Taskmodal_Attachment({
  params,
  allAttachments,
  setAllAttachments,
}) {
  const [isPost, setIsPost] = useState(false);
  const handleRemoveAttachment = (id) => {
    setIsPost(true);
    setAllAttachments((prevState) => {
      return prevState.filter((item) => item.id !== id);
    });
    apiInstance
      .delete(`/workspaces/attachment/${id}/delete-attachment-from-task/`)
      .then((res) => {})
      .finally(() => setIsPost(null));
  };

  return (
    <div>
      <div className="taskmodal-body-attachment">
        <div className="flex-row taskmodal-body-attachment-header">
          <div className="flex-taskmodal taskmodal-body-attachment-icon">
            <AttachFileIcon
              fontSize="large"
              sx={{ color: "white" }}
            ></AttachFileIcon>
          </div>
          <div className="flex neonText taskmodal-description-title">پیوست</div>
        </div>
        <div>
          <div className="taskmodal-body-attachment-list">
            {allAttachments.map((item, i) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  // component={Link}
                  href={`${item.file}`}
                  className="taskmodal-attachment-link-btn"
                >
                  <div className="flex-taskmodal taskmodal-body-attachment-list-item-icon">
                    <AttachFileIcon
                      sx={{ color: "white", fontSize: "46px" }}
                    ></AttachFileIcon>
                  </div>
                  <div className="flex-row taskmodal-body-attachment-list-item">
                    <div className="flex-taskmodal taskmodal-body-attachment-list-item-title">
                      {item?.file?.toString()?.split("/")[5]}
                    </div>
                    <div className="flex-row">
                      <div className="flex-taskmodal taskmodal-body-attachment-list-item-createdTime">
                        <div style={{ width: "72px" }}>{item.created_at}</div>
                      </div>
                    </div>
                  </div>
                </Button>
                <Button
                  onClick={() => handleRemoveAttachment(item.id)}
                  sx={{
                    fontFamily: "Vazir",
                    fontSize: "10px",
                    display: "flex",
                    paddingTop: "0px",
                    marginLeft: "2%",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  حذف
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
