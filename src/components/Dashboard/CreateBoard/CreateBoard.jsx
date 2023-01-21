// import * as React from "react";
// import { useState, useSelector } from "react";
// import { Box } from "@mui/material";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import Avatar from "@mui/material/Avatar";
// import Modal from "@mui/material/Modal";
// import StyledTextField from "../../Shared/StyledTextField";
// import PerTextField from "../../Shared/PerTextField.js";
// import x from "../../../static/images/workspace_management/create_board/board.jpeg";
// // import file from "../../../static/images/workspace_management/create_board/board.jpeg";
// import "./CreateBoard.scss";
// import { ToastContainer, toast } from "react-toastify";
// import apiInstance from "../../../utilities/axiosConfig";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import Loading from "../../Shared/Loading";
// import MenuItem from "@mui/material/MenuItem";
// import {
//   convertNumberToPersian,
//   convertNumberToEnglish,
// } from "../../../utilities/helpers.js";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   // width: "38rem",
//   width: "42rem",
//   // height: "55rem",
//   height: "62rem",
//   backgroundColor: "#001E3C",
//   // bgcolor: "background.paper",
//   border: "2px solid #000",
//   // borderRadius: "1rem",
//   borderRadius: "10px",
//   boxShadow: 50,
//   p: 4,
//   fontFamily: "Vazir",
//   // overflow: 'hidden', scroll
//   overflow: "auto",
// };

// export default function CreateBoard({}) {
//   const navigate = useNavigate();
//   const navigateToBoard = (boardId) => {
//     // navigate(`/board/`);
//     navigate(`/kanban/${boardId}`);
//   };
//   const handleChange = (e) => {
//     const [file] = e.target.files;
//     setBinaryFile(e.target.files[0]);
//     if (file) {
//       setFile(URL.createObjectURL(file));
//     }
//   };
//   const [result, setResult] = useState("");
//   const [binaryFile, setBinaryFile] = useState(null);
//   const [open, setOpen] = React.useState(false);
//   const [workspaceId, setWorkspaceId] = React.useState(0);
//   const handleOpen = () => {
//     setWorkspaceId(-1);
//     setTitle("");
//     setDescription("");
//     setFile(x);
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setWorkspaceId(-1);
//     setTitle("");
//     setDescription("");
//     setFile(x);
//     setOpen(false);
//   };
//   const [title, setTitle] = React.useState("");
//   const [description, setDescription] = React.useState("");
//   const [file, setFile] = React.useState(null);
//   const [isPost, setIsPost] = useState(false);
//   const [errorBoardName, setErrorBoardName] = React.useState(false);
//   const [errorWorkspace, setErrorWorkspace] = React.useState(false);
//   const [disableButton, setDisableButton] = React.useState(false);
//   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
//   // const on_submit = (form_data, boards, setBoards) => {
//   const on_submit = (form_data) => {
//     console.log("here");
//     apiInstance
//       .post(
//         `/workspaces/workspaceowner/${workspaceId}/create-board/`,
//         form_data
//       )
//       .then((res) => {
//         console.log("here");
//         console.log(res.data);
//         console.log("here");
//         toast.success("بورد با موفقیت ساخته شد", {
//           // position: toast.POSITION.BOTTOM_LEFT,
//           position: toast.POSITION.TOP_CENTER,
//           rtl: true,
//         });

//         // navigateToBoard(res.data.id);
//         delay(6000).then(() => navigateToBoard(res.data.id));
//       })
//       .finally(() => {
//         setIsPost(null);
//       });
//   };
//   const create_board = (e) => {
//     e.preventDefault();
//     let board_name = document.getElementById("board_name").value;
//     let isValid = true;
//     //console.log(board_name);
//     //console.log("board name");
//     if (board_name === "") {
//       setErrorBoardName(true);
//       isValid = false;
//     } else {
//       setErrorBoardName(false);
//     }
//     if (workspaceId === -1) {
//       setErrorWorkspace(true);
//       isValid = false;
//     } else {
//       setErrorWorkspace(false);
//     }
//     if (isValid === false) {
//       //console.log("false");
//       return;
//     } else {
//       setDisableButton(true); // make text spinning and disable button
//     }

//     const form_data = new FormData();
//     form_data.append("name", title);
//     form_data.append("description", description);
//     form_data.append("type", "education");
//     on_submit(form_data);
//     handleClose();
//     // navigate to board page that created
//   };
//   let [workspaces, setWorkspaces] = useState([]);
//   useEffect(() => {
//     apiInstance
//       .get("/workspaces/dashboard/myworkspaces/")
//       .then((response) => {
//         setWorkspaces(response.data);
//       })
//       .catch((error) => {});
//   }, []);

//   return (
//     <div>
//       {isPost ? <Loading /> : null}
//       {/* <div className="workspace-modal--add-button-container">
//                 <button className="workspace-modal--add-button" onClick={handleOpen}>
//                     <p className="workspace-modal--add-button-title">+ افزودن بورد</p>
//                 </button>
//             </div> */}
//       <Button
//         onClick={handleOpen}
//         sx={{
//           // color: '#00bfff',
//           color: "#000",
//           ":hover": {
//             color: "#E2EDF8",
//             backgroundColor: "#007fff",
//             borderRadius: "5px",
//           },
//           // marginTop: '8%',
//           // padding: '10%',
//           // paddingTop: '1%',
//           // paddingBottom: '1%',
//           // margin: '10%',
//           // padding: '10%',
//           // paddingTop: '5%',
//           // marginTop: '5%',

//           fontFamily: "Vazir",
//           textDecoration: "none",
//           display: "block",
//           transition: "0.3s",
//           display: "flex",
//           alignItems: "center",
//         }}
//       >
//         <h4>بورد تو بساز!😁</h4>
//       </Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography
//             variant="h6"
//             id="modal-modal-title"
//             component="h2"
//             sx={{
//               textAlign: "center",
//               fontFamily: "Vazir",
//               color: "#fff",
//             }}
//           >
//             ساخت بورد جدید
//           </Typography>
//           <Divider
//             sx={{
//               backgroundColor: "#007fff",
//               marginTop: "0.5rem",
//               marginBottom: "0.75rem",
//             }}
//           />
//           <img src={x} className="workspace-modal--board-image" />
//           <form className="workspace-modal--board-form">
//             <PerTextField>
//               <StyledTextField
//                 className="workspace-modal--board-name"
//                 label="نام بورد"
//                 value={title}
//                 onChange={(e) => {
//                   setTitle(convertNumberToPersian(e.target.value));
//                 }}
//                 required
//                 sx={{ textAlign: "center", fontFamily: "Vazir" }}
//                 InputLabelProps={{
//                   style: { fontFamily: "Vazir", fontSize: "1.6rem" },
//                 }}
//                 inputProps={{
//                   style: {
//                     height: "50px",
//                     padding: "0 14px",
//                     fontFamily: "Vazir",
//                     fontSize: "1.7rem",
//                   },
//                 }}
//                 name="board_name"
//                 autoComplete="board_name"
//                 autoFocus
//                 FormHelperTextProps={{
//                   style: {
//                     fontFamily: "Vazir",
//                     color: "red",
//                     fontSize: "1.3rem",
//                   },
//                 }}
//                 error={errorBoardName}
//                 helperText={errorBoardName ? "نام بورد نمی تواند خالی باشد" : ""}
//               />
//               <StyledTextField
//                 className="workspace-modal--board-name"
//                 label="نام فضای کاری"
//                 // value={workspaceName}
//                 onChange={(e) => {
//                   setWorkspaceId(e.target.value);
//                 }}
//                 required
//                 sx={{
//                   fontFamily: "Vazir",
//                   fontSize: "1.7rem",
//                 }}
//                 InputLabelProps={{
//                   style: { fontFamily: "Vazir", fontSize: "1.6rem" },
//                 }}
//                 inputProps={{
//                   style: {
//                     height: "50px",
//                     padding: "0 14px",
//                     fontFamily: "Vazir",
//                     fontSize: "1.7rem",
//                   },
//                 }}
//                 SelectProps={{
//                   style: {
//                     fontFamily: "Vazir",
//                     fontSize: "1.6rem",
//                   },
//                 }}
//                 name="workspace_name"
//                 autoComplete="workspace_name"
//                 autoFocus
//                 FormHelperTextProps={{
//                   style: {
//                     fontFamily: "Vazir",
//                     color: "red",
//                     fontSize: "1.3rem",
//                   },
//                 }}
//                 error={errorWorkspace}
//                 helperText={
//                   errorWorkspace ? "نام فضای کاری نمی تواند خالی باشد" : ""
//                 }
//                 // change selected background color
//                 // margin="normal"
//                 // required
//                 // fullWidth
//                 // id="workspace_type"
//                 // label="نوع فضای کاری"
//                 select // https://mui.com/material-ui/react-text-field/#basic-textfield
//                 // placeholder="نوع فضای‌کاری خود را وارد کنید."
//                 // // helperText="انتخاب کنید."
//                 // onChange={handleChange}
//                 // name="workspace_type"
//                 // autoComplete="workspace_type"
//                 // autoFocus
//                 // sx={{ width: "60%", display: "block" }}
//                 // InputLabelProps={{ style: { fontFamily: "Vazir" } }}
//                 // InputProps={{ style: { fontFamily: "Vazir" } }}
//                 // FormHelperTextProps={{ style: { fontFamily: "Vazir", color: "black" } }}
//                 // error={errorWorkspaceType}
//                 // helperText={errorWorkspaceType ? "لطفا این فیلد را پر کنید." : ""}
//               >
//                 {workspaces.map((workspace) => (
//                   <MenuItem
//                     key={workspace.id}
//                     value={workspace.id}
//                     sx={{
//                       fontFamily: "Vazir",
//                       color: "#007fff", // #0A1929
//                       // backgroundColor: '#265D97',
//                       backgroundColor: "#001E3C",
//                       // margin: '0%',
//                       // padding: '3%',
//                       ":hover": {
//                         backgroundColor: "#132F4C",
//                         // borderRadius: '5px',
//                       },
//                       fontSize: "1.5rem",
//                     }}
//                   >
//                     {workspace.name}
//                   </MenuItem>
//                 ))}
//               </StyledTextField>

//               <StyledTextField
//                 className="workspace-modal--board-name"
//                 label="توضیحات"
//                 value={description}
//                 onChange={(e) => {
//                   setDescription(convertNumberToPersian(e.target.value));
//                 }}
//                 sx={{ textAlign: "center", fontFamily: "Vazir" }}
//                 InputLabelProps={{
//                   style: { fontFamily: "Vazir", fontSize: "1.6rem" },
//                 }}
//                 inputProps={{
//                   style: {
//                     height: "50px",
//                     padding: "0 14px",
//                     fontFamily: "Vazir",
//                     fontSize: "1.7rem",
//                   },
//                 }}
//               />
//             </PerTextField>
//             <Avatar
//               src={file ? file : x}
//               alt="profile"
//               sx={{
//                 mt: 1,
//                 width: "11vmin",
//                 height: "11vmin",
//                 borderRadius: "50%",
//               }}
//             />

//             <Button
//               variant="contained"
//               component="label"
//               sx={{
//                 // backgroundColor: themeProps.primaryColor,
//                 color: "white",
//                 width: "120px",
//                 mt: 2,
//                 marginRight: "1.5rem",
//                 marginTop: 0,
//               }}
//             >
//               <p style={{ fontSize: "1.5rem" }}>انتخاب عکس</p>
//               <input
//                 type="file"
//                 hidden
//                 onChange={handleChange}
//                 accept=".jpg,.jpeg,.png"
//               />
//             </Button>
//             {/* <input
//                         type="file"
//                         // ref="file"
//                         onChange={handleChange}
//                         // name="user[image]"
//                         // multiple="true"
//                         // name="img"
//                         // id="img"
//                         /> */}
//             {/* <img src={this.state.imgSrc} alt="img" /> */}
//             {/* <label id="title">عنوان بورد</label>
//                         <input type="text" id="title" className="workspace-modal--title-inp" /> */}
//             {/* <button onClick={create_board}>submit</button> */}
//             <input
//               type="submit"
//               value="بساز"
//               className="workspace-modal--button-29"
//               onClick={create_board}
//               style={{ fontFamily: "Vazir" }}
//             />
//           </form>
//           {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </Typography> */}
//         </Box>
//       </Modal>
//     </div>
//   );
// }
import * as React from "react";
import { useState, useSelector } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import StyledTextField from "../../Shared/StyledTextField";
import PerTextField from "../../Shared/PerTextField.js";
import x from "../../../static/images/workspace_management/create_board/board.jpeg";
// import file from "../../../static/images/workspace_management/create_board/board.jpeg";
import "./CreateBoard.scss";
import { ToastContainer, toast } from "react-toastify";
import apiInstance from "../../../utilities/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import {
  convertNumberToPersian,
  convertNumberToEnglish,
} from "../../../utilities/helpers.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "38rem",
  width: "42rem",
  // height: "55rem",
  height: "62rem",
  backgroundColor: "#001E3C",
  // bgcolor: "background.paper",
  border: "2px solid #000",
  // borderRadius: "1rem",
  borderRadius: "10px",
  boxShadow: 50,
  p: 4,
  fontFamily: "Vazir",
  // overflow: 'hidden', scroll
  overflow: "auto",
};

export default function CreateBoardModal({}) {
  const navigate = useNavigate();
  const navigateToBoard = (boardId) => {
    // navigate(`/board/`);
    navigate(`/kanban/${boardId}`);
  };
  const handleChange = (e) => {
    const [file] = e.target.files;
    setBinaryFile(e.target.files[0]);
    if (file) {
      setFile(URL.createObjectURL(file));
    }
  };
  const [result, setResult] = useState("");
  const [binaryFile, setBinaryFile] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [workspaceId, setWorkspaceId] = React.useState(-1);
  const handleOpen = () => {
    setWorkspaceId(-1);
    setTitle("");
    setDescription("");
    setFile(x);
    setOpen(true);
  };
  const handleClose = () => {
    setWorkspaceId(-1);
    setTitle("");
    setDescription("");
    setFile(x);
    setOpen(false);
  };
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [errorBoardName, setErrorBoardName] = React.useState(false);
  const [errorWorkspace, setErrorWorkspace] = React.useState(false);
  const [disableButton, setDisableButton] = React.useState(false);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // const on_submit = (form_data, boards, setBoards) => {
  const on_submit = (form_data) => {
    //console.log("here");
    apiInstance
      .post(
        `/workspaces/workspaceowner/${workspaceId}/create-board/`,
        form_data
      )
      .then((res) => {
        //console.log("here");
        //console.log(res.data);
        //console.log("here");
        toast.success("بورد با موفقیت ساخته شد", {
          // position: toast.POSITION.BOTTOM_LEFT,
          position: toast.POSITION.TOP_CENTER,
          rtl: true,
        });

        // navigateToBoard(res.data.id);
        delay(6000).then(() => navigateToBoard(res.data.id));
      });
  };
  const create_board = (e) => {
    e.preventDefault();
    let board_name = document.getElementById("board_name").value;
    let isValid = true;
    //console.log(board_name);
    //console.log("board name");
    if (board_name === "") {
      setErrorBoardName(true);
      isValid = false;
    } else {
      setErrorBoardName(false);
    }
    if (workspaceId === -1) {
      setErrorWorkspace(true);
      isValid = false;
    } else {
      setErrorWorkspace(false);
    }
    if (isValid === false) {
      //console.log("false");
      return;
    } else {
      setDisableButton(true); // make text spinning and disable button
    }

    const form_data = new FormData();
    form_data.append("name", title);
    form_data.append("description", description);
    form_data.append("type", "education");
    on_submit(form_data);
    handleClose();
    // navigate to board page that created
  };
  let [workspaces, setWorkspaces] = useState([]);
  useEffect(() => {
    apiInstance
      .get("/workspaces/dashboard/myworkspaces/")
      .then((response) => {
        setWorkspaces(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <div>
      {/* <div className="workspace-modal--add-button-container">
                <button className="workspace-modal--add-button" onClick={handleOpen}>
                    <p className="workspace-modal--add-button-title">+ افزودن بورد</p>
                </button>
            </div> */}
      <Button
        onClick={handleOpen}
        sx={{
          // color: '#00bfff',
          color: "#000",
          ":hover": {
            color: "#E2EDF8",
            backgroundColor: "#007fff",
            borderRadius: "5px",
          },
          // marginTop: '8%',
          // padding: '10%',
          // paddingTop: '1%',
          // paddingBottom: '1%',
          // margin: '10%',
          // padding: '10%',
          // paddingTop: '5%',
          // marginTop: '5%',

          fontFamily: "Vazir",
          textDecoration: "none",
          display: "block",
          transition: "0.3s",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* <h2 
                // style={{color: 'black',}}
                >
                    افزودن بورد +
                </h2> */}

        <h3>بورد تو بساز!😁</h3>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            variant="h6"
            id="modal-modal-title"
            component="h2"
            sx={{
              textAlign: "center",
              fontFamily: "Vazir",
              color: "#fff",
              fontSize: "109px",
            }}
            className="neonText"
          >
            ساخت بورد جدید
          </Typography>
          <Divider
            sx={{
              backgroundColor: "#007fff",
              marginTop: "0.5rem",
              marginBottom: "0.75rem",
            }}
          />
          <img src={x} className="workspace-modal--board-image" />
          <form className="workspace-modal--board-form">
            <PerTextField>
              <StyledTextField
                className="workspace-modal--board-name"
                id="board_name"
                label="نام بورد"
                value={title}
                onChange={(e) => {
                  setTitle(convertNumberToPersian(e.target.value));
                }}
                required
                sx={{ textAlign: "center", fontFamily: "Vazir" }}
                InputLabelProps={{
                  style: { fontFamily: "Vazir", fontSize: "75%" },
                }}
                inputProps={{
                  style: {
                    height: "50px",
                    padding: "0 14px",
                    fontFamily: "Vazir",
                    fontSize: "1.7rem",
                  },
                }}
                name="board_name"
                autoComplete="board_name"
                autoFocus
                FormHelperTextProps={{
                  style: {
                    fontFamily: "Vazir",
                    color: "red",
                    fontSize: "1.3rem",
                  },
                }}
                error={errorBoardName}
                helperText={
                  errorBoardName ? "نام بورد نمی تواند خالی باشد" : ""
                }
              />
              <StyledTextField
                className="workspace-modal--board-name"
                label="نام فضای کاری"
                // value={workspaceName}
                onChange={(e) => {
                  setWorkspaceId(e.target.value);
                }}
                required
                sx={{
                  fontFamily: "Vazir",
                  fontSize: "1.7rem",
                }}
                InputLabelProps={{
                  style: { fontFamily: "Vazir", fontSize: "80%" },
                }}
                inputProps={{
                  style: {
                    height: "50px",
                    padding: "0 14px",
                    fontFamily: "Vazir",
                    fontSize: "1.7rem",
                  },
                }}
                SelectProps={{
                  style: {
                    fontFamily: "Vazir",
                    fontSize: "1.6rem",
                  },
                }}
                name="workspace_name"
                autoComplete="workspace_name"
                autoFocus
                FormHelperTextProps={{
                  style: {
                    fontFamily: "Vazir",
                    color: "red",
                    fontSize: "1.3rem",
                  },
                }}
                error={errorWorkspace}
                helperText={
                  errorWorkspace ? "نام فضای کاری نمی تواند خالی باشد" : ""
                }
                select // https://mui.com/material-ui/react-text-field/#basic-textfield
              >
                {workspaces.map((workspace) => (
                  <MenuItem
                    key={workspace.id}
                    value={workspace.id}
                    sx={{
                      fontFamily: "Vazir",
                      color: "#007fff", // #0A1929
                      // backgroundColor: '#265D97',
                      backgroundColor: "#001E3C",
                      // margin: '0%',
                      // padding: '3%',
                      ":hover": {
                        backgroundColor: "#132F4C",
                        // borderRadius: '5px',
                      },
                      fontSize: "1.5rem",
                    }}
                  >
                    {workspace.name}
                  </MenuItem>
                ))}
              </StyledTextField>

              <StyledTextField
                className="workspace-modal--board-name"
                label="توضیحات"
                value={description}
                onChange={(e) => {
                  setDescription(convertNumberToPersian(e.target.value));
                }}
                sx={{ textAlign: "center", fontFamily: "Vazir" }}
                InputLabelProps={{
                  style: { fontFamily: "Vazir", fontSize: "75%" },
                }}
                inputProps={{
                  style: {
                    height: "50px",
                    padding: "0 14px",
                    fontFamily: "Vazir",
                    fontSize: "1.7rem",
                  },
                }}
              />
            </PerTextField>
            <Avatar
              src={file ? file : x}
              alt="profile"
              className="workspace-modal--board-flexible"
              // sx={{
              //   mt: 1,
              //   width: "11vmin",
              //   height: "11vmin",
              //   borderRadius: "50%",
              // }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                rowGap: "1rem",
              }}
            >
              <Button
                variant="contained"
                component="label"
                sx={{
                  // backgroundColor: themeProps.primaryColor,
                  color: "white",
                  width: "120px",
                  mt: 2,
                  marginRight: "1.5rem",
                  marginTop: 0,
                }}
              >
                <p style={{ fontSize: "1.5rem" }}>انتخاب عکس</p>
                <input
                  type="file"
                  hidden
                  onChange={handleChange}
                  accept=".jpg,.jpeg,.png"
                />
              </Button>
            </div>
            {/* <input
              type="file"
              // ref="file"
              onChange={handleChange}
              // name="user[image]"
              // multiple="true"
              // name="img"
              // id="img"
            /> */}
            {/* <img src={this.state.imgSrc} alt="img" /> */}
            {/* <label id="title">عنوان بورد</label>
            <input type="text" id="title" className="workspace-modal--title-inp" /> */}
            {/* <button onClick={create_board}>submit</button> */}
            <input
              type="submit"
              value="بساز"
              className="workspace-modal--button-29"
              onClick={create_board}
              style={{ fontFamily: "Vazir", fontSize: "101%" }}
            />
          </form>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}
