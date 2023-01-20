import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./Navbar.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function DeleteWorkspace({ workspace_id, removeWorkspace }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveWorkspace = (e, workspace_id) => {
    removeWorkspace(e, workspace_id);
    handleClose();
  };
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <button
        key={workspace_id}
        // id={member.userName}
        className="ws_workspace-remove-button"
        onClick={handleClickOpen}
      >
        <div className="ws_workspace-remove-button-div">
          <DeleteIcon sx={{ color: "rgb(45, 36, 36)" }} />
        </div>
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
            آیا مطمئن هستید که میخواهید این فضای کاری را حذف کنید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            خیر
          </Button>
          <Button
            onClick={(e) => handleRemoveWorkspace(e, workspace_id)}
            autoFocus
          >
            بله
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
