import "./CreateDialog.scss";
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import Modal from "../../Asset/Modal";
import { useState } from "react";
import CreateBoard from "../modal/CreateBoard";

const CreateDialog = () => {
  const [openBoard, setOpenBoard] = useState(false);
  const [openWorkspace, setOpenWorkspace] = useState(false);

  return ( <div className="create-dialog">
    <div className="create-button">
      <WorkspacesIcon/>
      <div className="create-title">ساخت فضای کاری</div>
    </div>
    <div className="create-button" onClick={() => setOpenBoard(!openBoard)}>
      <ViewKanbanIcon/>
      <div className="create-title">ساخت بورد</div>
      <Modal onClose={() => setOpenBoard(false)} open={openBoard}>
        <CreateBoard onClose={() => setOpenBoard(false)}/>
      </Modal>
    </div>
  </div> );
}
 
export default CreateDialog;