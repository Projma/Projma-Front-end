import * as React from "react";
import "../../styles/TaskModal.scss";
import { useState } from "react";
import { Button } from "@mui/material";
import apiInstance from "../../utilities/axiosConfig";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import useTheme from "../../hooks/useTheme";

export default function Taskmodal_Attachment({
  params,
  allAttachments,
  setAllAttachments,
}) {
  const [isPost, setIsPost] = useState(false);
  const {theme,getColor} = useTheme();
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
      <div className="taskmodal--body-attachment">
        <div className="flex-row taskmodal--body-attachment-header">
          <div className="flex-taskmodal taskmodal--body-attachment-icon">
            <AttachFileIcon
              fontSize="large"
              sx={{ color: "white" }}
            ></AttachFileIcon>
          </div>
          <div style={{color: getColor(theme.minorBg)}}>
            پیوست
          </div>
        </div>
        <div>
          <div className="taskmodal--body-attachment-list">
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
                  className="taskmodal--attachment-link-btn"
                >
                  {/* <div className="flex-taskmodal taskmodal--body-attachment-list-item-icon">
                    <AttachFileIcon
                      sx={{ color: "white", fontSize: "46px" }}
                    ></AttachFileIcon>
                  </div> */}
                  <div className="flex-row taskmodal--body-attachment-list-item">
                    <div className="flex-taskmodal taskmodal--body-attachment-list-item-title">
                      {item?.file?.toString()?.split("/")[5]}
                    </div>
                    <div className="flex-row">
                      <div className="flex-taskmodal taskmodal--body-attachment-list-item-createdTime">
                        <div style={{ width: "72px" }}>{item.created_at}</div>
                      </div>
                    </div>
                  </div>
                </Button>
                <Button
                  onClick={() => handleRemoveAttachment(item.id)}
                  className="taskmodal--attachment-remove-btn"
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
