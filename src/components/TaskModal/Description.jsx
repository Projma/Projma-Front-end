import * as React from "react";
import "../../styles/TaskModal.css";
import { useState } from "react";
import StyledTextField from "../Shared/StyledTextField";
import { Button } from "@mui/material";
import apiInstance from "../../utilities/axiosConfig";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { convertNumberToPersian } from "../../utilities/helpers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      .patch(`/workspaces/task/${params.task_id}/update-task/`, formData)
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
      .patch(`/workspaces/task/${params.task_id}/update-task/`, {
        description: "",
      })
      .then((res) => {})
      .finally(() => setIsPost(null));
  };
  return (
    <div>
      <div
        className="flex-row taskmodal-body-larger-description"
        style={{ gap: "3%", fontFamily: "Vazir" }}
      >
        <div className="flex-taskmodal">
          <DehazeIcon fontSize="large" sx={{ color: "white" }}></DehazeIcon>
        </div>
        <div className="flex-column" style={{ width: "90%" }}>
          <div
            className="neonText taskmodal-description-title"
            style={{ marginBottom: "2%" }}
          >
            توضیحات
          </div>
          <Box
            component="form"
            onSubmit={handleSubmit}
            className="taskmodal-body-larger-description-textbox"
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
                    className="taskmodal-button-setting"
                    style={{ fontFamily: "Vazir" }}
                  >
                    ذخیره
                  </Button>
                  <Button
                    variant="outlined"
                    className="taskmodal-button-setting"
                    onClick={() => setShowDescription(false)}
                    style={{
                      fontFamily: "Vazir",
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
                    className="taskmodal-closeButton"
                    onClick={() => setShowDescription(true)}
                    sx={{
                      fontFamily: "Vazir",
                      color: "white",
                      fontSize: "100%",
                      bgcolor: "#1d4b7a",
                    }}
                  >
                    اضافه کردن جزئیات بیشتر
                  </Button>
                ) : (
                  <div>
                    <Typography
                      className="taskmodal-comment-showList-comment"
                      style={{
                        height: "70px",
                        // width: "100%",
                        padding: "5%",
                        borderRadius: "10px",
                        marginRight: "0px",
                        color: "white",
                        overflow: "auto",
                        fontFamily: "Vazir",
                        fontSize: "128%",
                      }}
                      multiline
                      rows={2}
                      // defalutValue={description}
                    >
                      {description}
                    </Typography>
                    <div className="taskmodal-comment-button">
                      <Button
                        onClick={handleDeleteDescription}
                        sx={{
                          fontFamily: "Vazir",
                          color: "white",
                          fontSize: "10px",
                          paddingRight: "0px",
                          textDecoration: "underline",
                        }}
                      >
                        حذف
                      </Button>
                      <Button
                        sx={{
                          fontFamily: "Vazir",
                          color: "white",
                          fontSize: "10px",
                          paddingLeft: "0px",
                          textDecoration: "underline",
                        }}
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
