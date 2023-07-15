import "./CreateDialog.scss";
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

const CreateDialog = () => {
  return ( <div className="create-dialog">
    <div className="create-button">
      <WorkspacesIcon/>
      <div className="create-title">ساخت فضای کاری</div>
    </div>
    <div className="create-button">
      <ViewKanbanIcon/>
      <div className="create-title">ساخت بورد</div>
    </div>
  </div> );
}
 
export default CreateDialog;