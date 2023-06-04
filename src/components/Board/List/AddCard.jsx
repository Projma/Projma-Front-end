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
const AddCard = ({ handleAddCardSubmit, setCardName, cardName }) => {
  return (
    <div className="list_add-card">
      <form
        className="list_add-card-form"
        onSubmit={(e) => handleAddCardSubmit(e)}
      >
        <PerTextField>
          <StyledTextField
            margin="normal"
            label="اسم کارت"
            variant="filled"
            required
            fullWidth
            autoFocus
            onChange={(e) =>
              setCardName(convertNumberToPersian(e.target.value))
            }
            value={cardName}
            placeholder="اسم کارت را در این بخش بنویسید"
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
              // borderRadius: "0.5rem",
              "& input::placeholder": {
                fontSize: "1.2rem",
              },
              margin: 0,
            }}
          />
        </PerTextField>
        <Button type="submit" variant="contained">
          افزودن
        </Button>
      </form>
    </div>
  );
};

export default AddCard;
