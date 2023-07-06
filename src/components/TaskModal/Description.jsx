import * as React from "react";
import "../../styles/TaskModal.css";
import { useState } from "react";
import StyledTextField from "../Shared/StyledTextField";
import { Button , Box } from "@mui/material";
import apiInstance from "../../utilities/axiosConfig";

import Typography from "@mui/material/Typography";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { convertNumberToPersian } from "../../utilities/helpers";
import { toast } from "react-toastify";


export default function Description({ params, description, setDescription }) {
  const [showdescription, setShowDescription] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const handleSubmit = (event) => {
    setIsPost(true);
    event.preventDefault();
    setShowDescription(false);
    const formData = new FormData();
    formData.append("description", description);
    apiInstance
      .patch(`/task/${params.task_id}/update-task/`, formData)
      .then((res) => {
        toast.success("با موفقیت ثبت شد.", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      })
      .catch((err) => {
        toast.error("مشکلی پیش آمده است. دوباره تلاش کنید.", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      })
      .finally(() => setIsPost(null));
  };
  const handleDeleteDescription = () => {
    setIsPost(true);
    setDescription("");
    setShowDescription(false);
    apiInstance
      .patch(`/task/${params.task_id}/update-task/`, {
        description: "",
      })
      .then((res) => {})
      .finally(() => setIsPost(null));
  };
  return (
    <div>
      <div
        className="flex-row taskmodal--body-larger-description"
        style={{ gap: "3%", fontFamily: "Vazir" }}
      >
        <div className="flex-taskmodal">
          <DehazeIcon fontSize="large" sx={{ color: "white" }}></DehazeIcon>
        </div>
        <div className="flex-column" style={{ width: "90%" }}>
          <div
            className="neonText taskmodal--description-title"
            style={{ marginBottom: "2%" }}
          >
            توضیحات
          </div>
          <Box
            component="form"
            onSubmit={handleSubmit}
            className="taskmodal--body-larger-description-textbox"
          >
            {showdescription ? (
              <div>
                <StyledTextField
                  fullWidth
                  autoFocus
                  onChange={(e) =>
                    setDescription(convertNumberToPersian(e.target.value))
                  }
                  value={description}
                  multiline
                  sx={{ fontFamily: "Vazir", color: "white" }}
                  rows={2}
                  inputProps={{
                    style: {
                      padding: "1%",
                      fontFamily: "Vazir",
                      fontSize: "152%",
                    },
                  }}
                ></StyledTextField>
                <div dir="ltr" style={{ marginTop: "3%" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    className="taskmodal--button-setting"
                  >
                    ذخیره
                  </Button>
                  <Button
                    variant="outlined"
                    className="taskmodal--button-setting"
                    onClick={() => setShowDescription(false)}
                    style={{
                      marginLeft: "2%",
                    }}
                  >
                    لغو
                  </Button>
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: "2px" }}>
                {description == "" || description == null ? (
                  <Button
                    className="taskmodal--closeButton"
                    onClick={() => setShowDescription(true)}
                  >
                    اضافه کردن جزئیات بیشتر
                  </Button>
                ) : (
                  <div>
                    <Typography
                      className="taskmodal--description-showList-comment"
                      multiline
                      rows={2}
                      // defalutValue={description}
                    >
                      {description}
                    </Typography>
                    <div className="taskmodal--comment-button">
                      <Button
                        onClick={handleDeleteDescription}
                        className="taskmodal--comment-button-remove"
                      >
                        حذف
                      </Button>
                      <Button
                        className="taskmodal--comment-button-remove"
                        onClick={() => {
                          setShowDescription(true);
                        }}
                      >
                        ویرایش
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}
