import React, { useState, useEffect } from "react";
import PerTextField from "../../Shared/PerTextField";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../Shared/Loading";
import apiInstance from "../../../utilities/axiosConfig";
import AddIcon from "@mui/icons-material/Add";
import "./AddList.scss";
import {
  convertNumberToPersian,
  convertNumberToEnglish,
} from "../../../utilities/helpers";

const AddList = (props) => {
  const [req, setReq] = useState(false);
  const [listName, setListName] = useState("");
  const [click, setClick] = useState(false);
  // const [list,setList] = useState({});
  let list;
  const handleAddListSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", listName);
    postCreateList(data, props.boardId);
    setClick(!click);
  };
  const postCreateList = async (data, id) =>
    await apiInstance
      .post(`board/tasklist/${id}/create-tasklist/`, data)
      .then((response) => {
        toast.success("لیست با موفقیت ساخته شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        list = response.data;
        props.onCreateList(list);
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
        setReq(null);
        handleClick();
      });
  const handleClick = () => {
    setClick(!click);
    setListName(null);
  };
  return (
    <>
      {req ? <Loading /> : null}
      {click ? (
        <form
          className="baord_add-list-form"
          // onSubmit={(e) => handleAddListSubmit(e)}
        >
          
            <PerTextField
              margin="normal"
              label="اسم لیست"
              variant="filled"
              required
              fullWidth
              autoFocus
              onChange={(e) =>
                setListName(convertNumberToPersian(e.target.value))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddListSubmit(e);
                }
              }}
              value={listName}
              placeholder="اسم لیست را در این بخش بنویسید"
              InputProps={{
                disableUnderline: true,
                style: {
                  // height: "50px",
                  // padding: "0 14px",
                  fontFamily: "Vazir",
                  // fontSize: "1.7rem",
                },
              }}
              InputLabelProps={{
                style: {
                  fontFamily: "Vazir",
                  // fontSize: "1.6rem",
                },
              }}
              sx={{
                backgroundColor: "$secondary",
                borderBottom: "0.2rem solid $tertiary",
                borderRadius: "0.5rem",
                width: "30rem",
                height: "100%",
                // borderRadius: "0.5rem",
                "& input::placeholder": {
                  fontSize: "1.2rem",
                },
                margin: 0,
              }}
            />
          
          <Button
            type="submit"
            variant="contained"
            onClick={(e) => handleAddListSubmit(e)}
          >
            افزودن
          </Button>
          <Button type="button" variant="contained" onClick={handleClick}>
            لغو
          </Button>
        </form>
      ) : (
        <Button type="button" variant="contained" onClick={handleClick}>
          <AddIcon />
          ایجاد لیست
        </Button>
      )}
    </>
  );
};

export default AddList;
