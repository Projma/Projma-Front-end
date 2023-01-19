import React from "react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import apiInstance from "../../utilities/axiosConfig";
import StyledTextField from "../Shared/StyledTextField";
import Divider from "@mui/material/Divider";
import PerTextField from "../Shared/PerTextField.js";
import "../../styles/TaskModal.css";
import { convertNumberToPersian } from "../../utilities/helpers";

const EditLabel = ({ setShowEdit, item, set_task_labels, setAllLabels }) => {
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [editedColor, setEditedColor] = useState(item.color);
  const editThisItem = (e) => {
    console.log("edit this item");
    if (editedTitle === "") {
      toast.error("عنوان برچسب نمیتواند خالی باشد", {
        position: toast.POSITION.BOTTOM_LEFT,
        rtl: true,
      });
      return;
    }
    apiInstance
      .patch(`workspaces/label/${item.id}/update-label/`, {
        title: editedTitle,
        color: editedColor,
      })
      .then((res) => {
        console.log("in edit label");
        console.log(res.data);
        let flag = 0;
        set_task_labels((prevState) =>
          prevState.map((label) => {
            if (label.id === item.id) {
              return { ...label, title: res.data.title, color: res.data.color };
            } else {
              return label;
            }
          })
        );
        setAllLabels((prevState) =>
          prevState.map((label) => {
            if (label.id === item.id) {
              flag = 1;
              return { ...label, title: res.data.title, color: res.data.color };
            } else {
              return label;
            }
          })
        );
        toast.success("ویرایش برچسب با موفقیت انجام شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      });
    setShowEdit(false);
  };

  return (
    <>
      <button
        onClick={(e) => setShowEdit(false)}
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
      <header className="tm_edit-labels-header">
        <h2 className="tm_edit-labels-header-title">ویرایش برچسب</h2>
        <Divider sx={{ backgroundColor: "#fff", marginTop: "2%" }} />
      </header>
      <div className="tm_edit-labels-main-div">
        <div
          style={{
            backgroundColor: editedColor,
            width: "12rem",
            height: "3rem",
            borderRadius: "5px",
            margin: 0 + " auto",
            marginBottom: "2rem",
            marginTop: "2rem",
          }}
        ></div>
        <PerTextField>
          <div className="flex" style={{ marginRight: "1.4rem" }}>
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
                  color: "#000",
                  fontSize: "1.5rem",
                  display: "block",
                  // marginBottom: "20%",
                  color: "#fff",
                  alignSelf: "stretch",
                  flexBasis: "2rem",
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
                  // marginTop: "5%",
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
                value={editedTitle}
                onChange={(e) => setEditedTitle(convertNumberToPersian(e.target.value))}
                sx={{
                  textAlign: "center",
                  fontFamily: "Vazir",
                  backgroundColor: "#265D97",
                  marginRight: "3rem",
                  display: "inline-block",
                  marginBottom: "2rem",
                  fontSize: "1.5rem",
                }}
              />
              <input
                type="color"
                id={item.id}
                value={editedColor}
                onChange={(e) => setEditedColor(e.target.value)}
              />
            </div>
          </div>
        </PerTextField>
      </div>
      <div className="flex" style={{ marginTop: "2rem" }}>
        <button
          onClick={(e) => editThisItem(e)}
          className="tm_labels-edit-button"
        >
          ویرایش
        </button>
      </div>
    </>
  );
};

export default EditLabel;
