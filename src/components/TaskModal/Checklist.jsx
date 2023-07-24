import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRef } from "react";
import apiInstance from "../../utilities/axiosConfig";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";
import { Input } from "@mui/material";
import "../../styles/TaskModal.scss";
import "./Checklist.scss";
import { toast } from "react-toastify";
import useTheme from "../../hooks/useTheme";
import Loading from "../Shared/Loading";
import { convertNumberToPersian } from "../../utilities/helpers";
import Modal from "../Asset/Modal";


export default function CheckList({ params, setAllChecklists }) {
  const [createdCheckTitle, setCreatedCheckTitle] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isPost, setIsPost] = React.useState(false);
  const add_section_ref = useRef(null);
  const add_button_ref = useRef(null);
  const { theme, getColor } = useTheme();
  const [open, setOpen] = React.useState(false);
  const createCheckList = (e) => {
    if (createdCheckTitle.length == 0) {
      e.preventDefault();
      toast.error("لطفا یک عنوان برای لیست کنترل خود انتخاب کنید", {
        position: toast.POSITION.BOTTOM_LEFT,
        rtl: true,
      });
      return;
    }
    setIsPost(true);
    const form_data = new FormData();
    form_data.append("text", createdCheckTitle);
    apiInstance
      .post(`task/checklist/${params.task_id}/create-checklist/`, form_data)
      .then((res) => {
        ////console.log("here2");
        ////console.log(res.data);
        toast.success("مورد لیست کنترل اضافه شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        setAllChecklists((prev) => [...prev, res.data]);
      })
      .finally(() => {
        setIsPost(null);
      });
    handleClose();
  };

  const handleClick = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setCreatedCheckTitle("");
    setOpen(false);
  };

  const id = open ? "simple-popover" : undefined;

  return (
    <div className="taskmodal-flexibale-icon" style={{ width: "100%" }}>
      {isPost ? <Loading /> : null}
      <Button
        aria-describedby={id}
        role="open_checklist"
        variant="outlined"
        onClick={handleClick}
        style={{ width: "100%" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
            width: "100%",
            
          }}
        >
          <ChecklistRtlIcon rotate="90"></ChecklistRtlIcon>{" "}
          <div>لیست کنترل</div>
        </div>
      </Button>
      <Modal id={id} open={open} onClose={handleClose}>
        <div className="tm_checklists-main-div">
          <header className="tm_checklists-header">
            <h2 style={{ color: getColor(theme.minorBg) }}>
              اضافه کردن لیست کنترل
            </h2>
          </header>
          <Divider sx={{}} />
          <div className="tm_checklists-body" ref={add_section_ref}>
            <Input
              value={createdCheckTitle}
              onChange={(e) =>
                setCreatedCheckTitle(convertNumberToPersian(e.target.value))
              }
              placeholder="عنوان"
              sx={{
                width: "100%",
                marginBottom: "1rem",
              }}
              style={{ color: getColor(theme.minorBg), marginLeft:"0.5rem" }}
            />
            <Button
              variant="contained"
              role="button"
              onClick={createCheckList}
              // style={{ color: getColor(theme.minorBg) }}
            >
              افزودن
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
