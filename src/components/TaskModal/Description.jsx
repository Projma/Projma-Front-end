import * as React from "react";
import "../../styles/TaskModal.scss";
import { useState } from "react";
import StyledTextField from "../Shared/StyledTextField";
import { Button, Box } from "@mui/material";
import apiInstance from "../../utilities/axiosConfig";
import Typography from "@mui/material/Typography";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { convertNumberToPersian } from "../../utilities/helpers";
import { toast } from "react-toastify";
import useTheme from "../../hooks/useTheme";

export default function Description({ params, description, setDescription }) {
  const [showdescription, setShowDescription] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const { theme, getColor } = useTheme();
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
    <>
      <div className="flex-row taskmodal--body-larger-description" >
        <div className="flex-taskmodal">
          <DehazeIcon
            fontSize="large"
            sx={{ fill: theme.primary }}
          ></DehazeIcon>
        </div>
        <div className="flex-column">
          <div style={{color: getColor(theme.minorBg)}}>توضیحات</div>
          <Box
            component="form"
            onSubmit={handleSubmit}
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
                  sx={{ fontFamily: "Vazir" }}
                  // inputProps={{
                  //   style: {
                  //     padding: "1%",
                  //     fontFamily: "Vazir",
                  //     fontSize: "152%",
                  //   },
                  // }}
                />
                <div dir="ltr" style={{ marginTop: "3%" }}>
                  <Button type="submit" variant="contained">
                    ذخیره
                  </Button>
                  <Button
                    variant="outlined"
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
                    onClick={() => setShowDescription(true)}
                    sx={{ color: theme.primary }}
                  >
                    اضافه کردن جزئیات بیشتر
                  </Button>
                ) : (
                  <div>
                    <Typography
                      multiline
                      // defalutValue={description}
                      style={{color: getColor(theme.minorBg)}}
                    >
                      {description}
                    </Typography>
                    <div className="">
                      <Button
                        onClick={handleDeleteDescription}
                        sx={{ color: theme.primary }}
                      >
                        حذف
                      </Button>
                      <Button
                        onClick={() => {
                          setShowDescription(true);
                        }}
                        sx={{ color: theme.primary }}
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
    </>
  );
}
