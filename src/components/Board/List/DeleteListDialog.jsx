import "./List.scss";
import React, { useState, useEffect } from "react";
import useBoard from "../../../hooks/useBoard";
import Card from "./Card/Card";
import PerTextField from "../../Shared/PerTextField";
import StyledTextField from "../../Shared/StyledTextField";
import Popover from "@mui/material/Popover";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputName from "../../Shared/InputName";
import apiInstance from "../../../utilities/axiosConfig";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { convertNumberToPersian } from "../../../utilities/helpers";
import useTheme from "../../../hooks/useTheme";

const DeleteListDialog = ({ isOpen, handleClose, handleDeleteList }) => {
  const {theme, getColor} = useTheme();
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="alert-dialog-title" sx={{color: getColor(theme.minorBg)}}>
          {"آیا از حذف کردن لیست مطمئن هستید؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{color: getColor(theme.minorBg)}}
          >
            اخطار: با حذف کردن لیست تمام کارت های داخل آن نیز حذف میشود
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="List_dialog-button-container">
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                handleDeleteList();
              }}
              className="List_dialog-button"
            >
              تایید
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={handleClose}
              autoFocus
              className="List_dialog-button"
            >
              انصراف
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteListDialog;
