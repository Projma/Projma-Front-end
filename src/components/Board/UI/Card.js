import React, { useState, useEffect } from 'react';
import './Styles/Card.css';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Navigate, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Draggable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Loading from '../../Shared/Loading';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import apiInstance from '../../../utilities/axiosConfig';
import TaskModal from '../../TaskModal/TaskModal';
import { Modal } from '@mui/material';
import CardCover from '../Cards Item/CardCover';

const Card = (props) => {
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setClick(!click);

  useEffect(() => {
    setOpen(false);
  }, [click]);

  // const reqDeleteCard = async (id) =>
  //   await apiInstance
  //     .delete(`workspaces/task/${id}/`)
  //     .then(() => {
  //       setIsToast(true);
  //       toast.success("کارت با موفقیت حذف شد", {
  //         position: toast.POSITION.TOP_CENTER,
  //         rtl: true,
  //       });
  //     })
  //     .catch((error) => {
  //       if (error.response.status === 404) {
  //         setIsToast(true);
  //         toast.error("عملیات با خطا مواجه شد", {
  //           position: toast.POSITION.TOP_CENTER,
  //           rtl: true,
  //         });
  //       }
  //     })
  //     .finally(() => {
  //       setIsPost(null);
  //       console.log("reqDeleteCard Done");
  //       props.onPost(true);
  //     });

  // const modalOpenHandler = () => {
  //   isOpen = true;
  //   console.log('open moh: ', isOpen);
  // };
  //
  // const modalCloseHandler = () => {
  //   isOpen = false;
  //   console.log('open mch: ', isOpen);
  // };

  return (
    <Draggable draggableId={String(props.id)} index={props.index}>
      {(provided) => (
        <div
          className="card_container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleOpen}
        >
          {/* {isPost ? <Loading /> : null} */}
          {/* {isToast ? ( */}
          {/*   <ToastContainer autoClose={5000} style={{ fontSize: "1.2rem" }} /> */}
          {/* ) : null} */}
          <Modal open={open} onClose={handleClose} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
          }}>
            <TaskModal cardId={props.id}/>
          </Modal>
          <div className="card_header">
            <div className="card_close-icon">
              <CloseIcon sx={{ fontSize: '1.4rem' }}/>
            </div>
            <div className="card_edit-icon">
              <EditIcon sx={{ fontSize: '1.4rem' }}/>
            </div>
          </div>
          <div className="card_body">
            <div className="card_cover">
              <CardCover/>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

function stringToColor (string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar (name) {
  return {
    children: `${name.split(' ')[0][0].toUpperCase()}${name
      .split(' ')[1][0]
      .toUpperCase()}`,
  };
}

export default Card;
