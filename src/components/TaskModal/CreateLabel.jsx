import React from "react";
import { useEffect, useState } from "react";
import apiInstance from "../../utilities/axiosConfig";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StyledTextField from "../Shared/StyledTextField";
import PerTextField from "../Shared/PerTextField.js";
import "../../styles/TaskModal.css";
// persian num
import { convertNumberToPersian } from "../../utilities/helpers";

const CreateLabel = ({ setShowCreate, params, setAllLabels }) => {
  const [createdTitle, setCreatedTitle] = useState("");
  const [createdColor, setCreatedColor] = useState("#265D97");

  const createThisItem = (e) => {
    console.log("create this item");
    console.log(createdTitle);
    console.log(createdColor);
    if (createdTitle === "") {
      toast.error("عنوان برچسب نمیتواند خالی باشد", {
        position: toast.POSITION.BOTTOM_LEFT,
        rtl: true,
      });
      return;
    }
    apiInstance
      .post(`workspaces/board/${params.board_id}/create-label/`, {
        title: createdTitle,
        color: createdColor,
      })
      .then((res) => {
        console.log(res.data);
        const new_label = { ...res.data, checked: false };
        setAllLabels((prev) => [...prev, new_label]);
        toast.success("برچسب جدید با موفقیت ایجاد شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      });
    setShowCreate(false);
  };

  return (
    <>
      <div className="tm_create-labels-main-div">
        <button
          onClick={(e) => setShowCreate(false)}
          className="tm_labels-arrow-back"
        >
          <ArrowBackIcon
            sx={{
              direction: "rtl",
              color: "#fff",
              fontSize: "2rem",
            }}
          />
        </button>
        <header className="tm_labels-header">
          <h2 style={{ color: "#fff" }}>ایجاد برچسب</h2>
        </header>
        <div
          style={{
            backgroundColor: createdColor,
            width: "12rem",
            height: "3rem",
            borderRadius: "5px",
            margin: 0 + " auto",
            marginBottom: "2rem",
            marginTop: "2rem",
          }}
        ></div>
        <PerTextField>
          <div
            className="flex"
            style={{ marginRight: "1.4rem", marginTop: "2rem" }}
          >
            <div
              style={{
                height: "98px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                gap: "2.1rem",
              }}
            >
              <label
                style={{
                  fontFamily: "Vazir",
                  color: "#fff",
                  fontSize: "1.5rem",
                  display: "block",
                  marginBottom: "2%",
                }}
              >
                عنوان برچسب
              </label>
              <label
                style={{
                  fontFamily: "Vazir",
                  color: "#fff",
                  fontSize: "1.5rem",
                  display: "block",
                  marginTop: "5%",
                }}
              >
                رنگ برچسب
              </label>
            </div>
            <div
              style={{
                height: "98px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <StyledTextField
                value={createdTitle}
                onChange={(e) => setCreatedTitle(convertNumberToPersian(e.target.value))}
                sx={{
                  textAlign: "center",
                  fontFamily: "Vazir",
                  backgroundColor: "#265D97",
                  marginRight: "3rem",
                  display: "inline-block",
                }}
              />
              <input
                type="color"
                value={createdColor}
                onChange={(e) => setCreatedColor(e.target.value)}
                onClick={(e) => {
                  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$");
                }}
              />
            </div>
          </div>
        </PerTextField>
        <div className="flex" style={{ marginTop: "2.8rem" }}>
          <button
            class="labels_button-33"
            role="button"
            onClick={(e) => createThisItem(e)}
          >
            بساز
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateLabel;
