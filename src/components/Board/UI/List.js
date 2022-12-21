import React, { useState, useEffect } from 'react';
import './Styles/List.css';
import Card from './Card';
import PerTextField from '../../Shared/PerTextField';
import StyledTextField from '../../Shared/StyledTextField';
import Popover from '@mui/material/Popover';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import Loading from '../../Shared/Loading';
import { toast, ToastContainer } from 'react-toastify';
import '../../../styles/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputName from '../../Shared/InputName';
import apiInstance from '../../../utilities/axiosConfig';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

const List = (props) => {
  const [cards, setCards] = useState(props.card);
  const [addCard, setAddCard] = useState(false);
  const [cardName,setCardName] = useState("");
  const [req,setReq] = useState(false);

  useEffect(() => {
    setCards(props.card);
  },[])

  useEffect(() => {
    setCards(props.card);
  },[props])
  const reqCreateCard = async (data, id) =>
    await apiInstance
      .post(`workspaces/board/${id}/create-task/`, data)
      .then((response) => {
        toast.success("کارت با موفقیت ساخته شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        setCards((pervCards) => [...pervCards,response.data]);
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
        console.log("reqCreateCard Done");
        // props.onReq();
      });

  // const reqDeleteList = async (id) =>
  //   await apiInstance
  //     .delete(`workspaces/tasklist/${id}/delete-tasklist/`)
  //     .then(() => {
  //       setIsToast(true);
  //       toast.success("لیست با موفقیت حذف شد", {
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
  //       console.log("reqDeleteList Done");
  //       props.onPost(true);
  //     });

  // const reqEditListName = async (data, id) =>
  //   await apiInstance
  //     .patch(`workspaces/tasklist/${id}/update-tasklist/`, data)
  //     .then(() => {
  //       setIsToast(true);
  //       toast.success("اسم لیست با موفقیت عوض شد", {
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
  //       props.onPost(true);
  //     });

  const addCardClickHandler = () => {

  };
  const optionClickHandler = () => {

  };

  const handleRemoveCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  }

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    setAddCard(!addCard);
    setReq(true);
    const data = new FormData();
    data.append("title", cardName);
    reqCreateCard(data, props.id);
    setCardName("");
  }

  return (
    <Draggable draggableId={String(props.id) + props.name} index={props.index}>
      {(provided) => (
        <div
          className="list_container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {req ? <Loading /> : null}
          <ToastContainer autoClose={3000} style={{ fontSize: "1.2rem" }} />
          <div className="list_header-container">
            <div className="list_header">
              <div className="list_header-title">
                <InputName name={props.name}/>
              </div>
              <div className="list_header-add-card" onClick={() => setAddCard(!addCard)}>
                <AddIcon onClick={addCardClickHandler} sx={{ fontSize: '2.2rem' }}/>
              </div>
              <div className="list_header-option">
                <MoreVertIcon onClick={optionClickHandler} sx={{ fontSize: '2.2rem' }}/>
              </div>
            </div>
            {addCard && <div className="list_add-card">
              <form className="list_add-card-form" onSubmit={e => handleAddCardSubmit(e)}>
                <PerTextField>
                  <StyledTextField
                    margin="normal"
                    label="اسم کارت"
                    variant="filled"
                    required
                    fullWidth
                    autoFocus
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="اسم کارت را در این بخش بنویسید"
                    InputProps={{ disableUnderline: true }}
                    sx={{
                      backgroundColor: "var(--main-item-color)",
                      borderBottom: "0.2rem solid var(--minor-item-color)",
                      borderRadius: "0.5rem",
                      // borderRadius: "0.5rem",
                      "& input::placeholder": {
                        fontSize: "1.2rem"
                      },
                      margin: 0
                    }}
                  />
                </PerTextField>
                <Button type="submit" variant="contained">افزودن</Button>
              </form>
            </div>}
          </div>
          <Droppable droppableId={String(props.id)}>
            {(provided, snapshot) => (
              <div
                className="list_card-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={
                  snapshot.draggingOverWith
                    ? {
                      backgroundColor: 'var(--hover-color)',
                      borderRadius: '0.5rem',
                    }
                    : null
                }
              >
                {cards.map((card, index) => (
                  <Card
                    title={card.title}
                    key={card.id}
                    id={card.id}
                    index={index}
                    members={card.doers}
                    checkTotal={card.checklists_num}
                    checkDone={card.checked_checklists_num}
                    attachNum={card.attachments_num}
                    chatNum={card.comments_num}
                    labels={card.labels}
                    boardId={props.boardId}
                    remID={handleRemoveCard}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
