import React, { useState, useEffect } from 'react';
import PerTextField from '../../Shared/PerTextField';
import StyledTextField from '../../Shared/StyledTextField';
import { Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../../Shared/Loading';
import apiInstance from '../../../utilities/axiosConfig';
import AddIcon from '@mui/icons-material/Add';
import "./AddList.css";

const AddList = (props) => {
  const [req, setReq] = useState(false);
  const [listName, setListName] = useState('');
  const [click, setClick] = useState(false);
  // const [list,setList] = useState({});
  let list;
  const handleAddListSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title",listName);
    postCreateList(data,props.boardId);
  };
  const postCreateList = async (data, id) =>
    await apiInstance
      .post(`workspaces/board/${id}/create-tasklist/`, data)
      .then((response) => {
        toast.success('لیست با موفقیت ساخته شد', {
          position: toast.POSITION.TOP_CENTER,
          rtl: true,
        });
        // setList(response.data);
        list = response.data;
        console.log(list);
        props.onCreateList(list);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          toast.error('عملیات با خطا مواجه شد', {
            position: toast.POSITION.TOP_CENTER,
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
  }
  return (
    <>
      {req ? <Loading/> : null}
      <ToastContainer autoClose={3000} style={{ fontSize: '1.2rem' }}/>
      {click ? <form className="baord_add-list-form" onSubmit={e => handleAddListSubmit(e)}>
        <PerTextField>
          <StyledTextField
            margin="normal"
            label="اسم لیست"
            variant="filled"
            required
            fullWidth
            autoFocus
            onChange={(e) => setListName(e.target.value)}
            placeholder="اسم لیست را در این بخش بنویسید"
            InputProps={{ disableUnderline: true }}
            sx={{
              backgroundColor: 'var(--main-item-color)',
              borderBottom: '0.2rem solid var(--minor-item-color)',
              borderRadius: '0.5rem',
              width: '30rem',
              height: '100%',
              // borderRadius: "0.5rem",
              '& input::placeholder': {
                fontSize: '1.2rem'
              },
              margin: 0
            }}
          />
        </PerTextField>
        <Button type="submit" variant="contained">افزودن</Button>
        <Button type="button" variant="contained" onClick={handleClick}>لفو</Button>
      </form> : <Button type="button" variant="contained" onClick={handleClick}>
        <AddIcon/>
        ایجاد لیست
      </Button>}
    </>
  );
};

export default AddList;
