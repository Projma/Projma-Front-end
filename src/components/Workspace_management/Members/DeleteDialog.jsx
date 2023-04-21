import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./Members.scss";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function DeleteDialog({ user_id, removeMember }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveMember = (e, user_id) => {
    removeMember(e, user_id);
    handleClose();
  };
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <button
        key={user_id}
        // id={member.userName}
        id="open_remove_dialog"
        className="ws_members-person-remove-button"
        onClick={handleClickOpen}
      >
        <PersonRemoveIcon sx={{ color: "#fff" }} />
      </button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {/* <DialogTitle id="responsive-dialog-title">{"حذف عضو"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText sx={{ color: "#fff" }}>
            آیا مطمئن هستید که میخواهید این عضو را از فضای کاری حذف کنید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            خیر
          </Button>
          <Button onClick={(e) => handleRemoveMember(e, user_id)} autoFocus>
            بله
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
