import * as React from "react";
import { Button, Box } from "@mui/material";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import ClearTwoToneIcon from "@mui/icons-material/ClearTwoTone";
import apiInstance from "../../../../utilities/axiosConfig";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { deepOrange, green } from "@mui/material/colors";
import LinkSharpIcon from "@mui/icons-material/LinkSharp";
import { toast } from "react-toastify";
import "./ShareButton.scss";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Loading from "../../../Shared/Loading";
import {
  convertNumberToEnglish,
  convertNumberToPersian,
} from "../../../../utilities/helpers";
import useTheme from "../../../../hooks/useTheme";
import PerTextField from "../../../Shared/PerTextField";
import StyledTextField from "../../../Shared/StyledTextField";

const ShareButton = (props) => {
  const [open, setOpen] = React.useState(false);
  const [inviteLink, setinviteLink] = useState("");
  const [members, setMembers] = React.useState([]);
  const [inviteToken, setInviteToken] = React.useState("");
  const [search_text, setSearchText] = React.useState("");
  const [isPost, setIsPost] = useState(false);
  const [membersList, setMembersList] = React.useState([
    // { name: 'فرزان رحمانی', id: 1994 },
  ]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const params = useParams();
  const role_english_to_persian = {
    Admin: "ادمین",
    Member: "کاربر",
    Guest: "مهمان",
  };
  const { theme, getColor } = useTheme();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    width: "fit-content",
    height: "fit-content",
    // bgcolor: 'background.paper',
    bgcolor: theme.minorBg,
    border: `0.2rem solid ${theme.primary}`,
    borderRadius: "0.5rem",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    padding: "1%",
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    apiInstance.get(`board/${params.boardId}/members/`).then((res) => {
      setMembers(res.data);
    });
    apiInstance.get(`board/${params.boardId}/invite_link/`).then((res) => {
      // //console.log(res.data);
      setInviteToken(res.data);
    });
  }, []);

  const copy = async () => {
    const invite_link =
      "http://localhost:3000/borad_invitation/" +
      params.id +
      "/" +
      inviteToken +
      "/";
    setinviteLink(invite_link);
    while (inviteLink === "") {
      await new Promise((r) => setTimeout(r, 100));
    }
    await navigator.clipboard.writeText(inviteLink);
    // alert('Text copied');
    toast.success("لینک کپی شد.", {
      position: toast.POSITION.BOTTOM_LEFT,
      rtl: true,
    });
  };

  const inputSearchHandler = (event, value) => {
    setSearchText(convertNumberToPersian(event.target.value));
    setSelectedOptions(value);
    setMembersList([]);
    apiInstance
      .get("/accounts/profile/", {
        params: {
          search: convertNumberToEnglish(event.target.value),
        },
      })
      .then((res) => {
        setMembersList([]);
        for (let i = 0; i < res.data.length; i++) {
          // { title: 'فرزان رحمانی', year: 1994 }
          var temp = {};
          temp.name = convertNumberToPersian(
            res.data[i].user.first_name + " " + res.data[i].user.last_name
          );
          temp.id = res.data[i].user.id;
          setMembersList((membersList) => [...membersList, temp]);
        }
      });
  };

  const handleDisableButton = () => {
    if (selectedOptions === null) {
      return true;
    }
    // else if (selectedOptions.length === 0) {
    //     return true;
    // }
    return false;
  };

  const selectedOptionsChanged = (event, value) => {
    setSelectedOptions(value);
  };

  const handleAddUsers = (event) => {
    if (selectedOptions === null) {
      return; // no user selected
    }
    let count = 0;
    setIsPost(true);
    for (let index = 0; index < selectedOptions.length; index++) {
      const element = selectedOptions[index];
      let member_id = element.id;
      apiInstance
        .post(
          "board/" + params.boardId + "/add-user-to-board/" + member_id + "/"
        )
        .then((res) => {
          //console.log("success", res);
          // //console.log(res.data);
          apiInstance.get(`board/${params.boardId}/members/`).then((res) => {
            setMembers(res.data);
          });
          count++;
          toast.success("کاربر با موفقیت اضافه شد.", {
            position: toast.POSITION.BOTTOM_LEFT,
            rtl: true,
          });
        })
        .catch((error) => {
          // wasSuccessful = false;
          //console.log("error", error);
          toast.error("مشکلی پیش آمده است.", {
            position: toast.POSITION.BOTTOM_LEFT,
            rtl: true,
          });
        })
        .finally(() => setIsPost(null));
    }
    if (count === selectedOptions.length) {
      // all requests were successful
      toast.success("کاربر(ان) با موفقیت اضافه شدند.", {
        position: toast.POSITION.BOTTOM_LEFT,
        rtl: true,
      });
    } else {
      // toast.error("مشکلی پیش آمده است.", {
      //   position: toast.POSITION.BOTTOM_LEFT,
      //   rtl: true,
      // });
    }
  };

  return (
    <>
      {isPost ? <Loading /> : null}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <SendTwoToneIcon />
          <div>اشتراک</div>
        </div>
      </Button>
      <Modal
        aria-labelledby="spring-modal-title"
        // aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Button onClick={handleClose}>
              {" "}
              <ClearTwoToneIcon
                sx={{
                  // margin: "1%"
                  marginBottom: "9%",
                  // ":dir": "ltr"
                  // marginRight: "3800%",
                }}
              />{" "}
            </Button>
            <Typography
              id="spring-modal-title"
              variant="h5"
              component="h2"
              sx={{
                color: getColor(theme.minorBg),
                marginBottom: "2%",
                marginRight: "2%",
              }}
            >
              بورد را به اشتراک بگذارید
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                // justifyContent: "space-between",
                alignItems: "center",
                // marginBottom: "0%",
                // marginTop: "2%",
                marginRight: "2%",
                // marginLeft: "2%",
                color: getColor(theme.minorBg),
              }}
            >
              {/* https://mui.com/material-ui/react-autocomplete/#multiple-values */}
              {/* https://mui.com/material-ui/react-autocomplete/#load-on-open */}
              {/* https://mui.com/material-ui/react-autocomplete/#search-as-you-type */}
              <PerTextField>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={membersList}
                  fullWidth
                  inputValue={search_text}
                  getOptionLabel={(option) => option.name}
                  sx={{
                    width: "60%",
                    display: "block",
                    marginRight: "3%",
                    marginBottom: "2%",
                    marginLeft: "2%",
                    color: getColor(theme.minorBg),
                    ".MuiSvgIcon-root": {
                      fill: theme.primary,
                      marginLeft: "0.5rem",
                    },
                    ".MuiFormHelperText-root": {
                      color: getColor(theme.minorBg),
                      fontSize: "1rem",
                    },
                  }}
                  onChange={(event, value) =>
                    selectedOptionsChanged(event, value)
                  }
                  // defaultValue={[membersList[0]]}
                  filterSelectedOptions
                  filterOptions={(x) => x}
                  renderInput={(params) => (
                    <StyledTextField
                      {...params}
                      label="جستجو"
                      placeholder="آدرس ایمیل یا نام کاربری را وارد کنید."
                      helperText="فرد مورد نظر خود را جستجو کنید."
                      id="search_box"
                      name="search_box"
                      // onFocus={() => {
                      //     placeholder = "";
                      // }}
                      
                      onChange={(event, newValue) => {
                        inputSearchHandler(event, newValue);
                      }}
                      // onChange={(e) => serachUser(convertNumberToPersian(e.target.value))}
                    />
                  )}
                />
              </PerTextField>
              <Button
                variant="contained"
                // button-key="buttonAttribute"
                sx={{
                  // height: 54,
                  // width: 150,
                  // fontSize: 20,
                  // marginTop: "0%",
                  marginBottom: "5%",
                  padding: "1.35%",
                  // paddingTop: "5%",
                  width: "20%",
                  // height: "100%",
                  fontFamily: "Vazir",
                }}
                disabled={handleDisableButton()}
                onClick={handleAddUsers}
              >
                {/* {" "} */}
                اشتراک گذاری
              </Button>
            </Box>
            <MenuItem
              sx={{
                // marginLeft: "2%",
                color: getColor(theme.minorBg),
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  marginLeft: "2%",
                  marginBottom: "1.5%",
                  marginTop: "1.5%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: getColor(theme.minorBg),
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: deepOrange[500],
                    width: 56,
                    height: 56,
                    marginLeft: "10%",
                  }}
                  variant="rounded"
                >
                  <LinkSharpIcon
                    sx={{ width: 45, height: 45, color: "black" }}
                  />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ color: getColor(theme.minorBg), marginLeft: "10%" }}
                >
                  لینک بورد را به اشتراک بگذارید
                </Typography>
                <Button
                  variant="contained"
                  // button-key="buttonAttribute"
                  sx={{
                    // fullWidth: true,
                    // height: 54,
                    width: 300,
                    // width: "20%",
                    // fontSize: "90%",
                    // marginTop: "0%",
                    // marginBottom: "2.4%",
                    marginLeft: "2%",
                    // padding: "10%",
                    // paddingTop: "5%",
                    // width: "20%",
                    // height: "100%",
                    fontFamily: "Vazir",
                  }}
                  onClick={copy}
                >
                  {/* {" "} */}
                  کپی لینک
                </Button>
                {/* <ToastContainer /> */}
              </Box>
            </MenuItem>
            {members.map((member) => {
              return (
                <MenuItem
                  value={convertNumberToPersian(member.user.username)}
                  key={member.user.username}
                >
                  {" "}
                  {/* or menu item  */}
                  <Tooltip title={convertNumberToPersian(member.user.username)}>
                    <Box
                      sx={{
                        marginLeft: "2%",
                        color: getColor(theme.minorBg),
                      }}
                    >
                      <Avatar
                        key={member.id}
                        alt={(
                          member.user.first_name +
                          " " +
                          member.user.last_name
                        ).toString()}
                        src={member.profile_pic}
                        sx={{
                          color: getColor(theme.secondary),
                          backgroundColor: theme.secondary,
                        }}
                        className="board_avatar-profile-picture"
                        // sx={{ width: 56, height: 56 }}
                      >
                        {member.user.first_name.length != 0 &&
                          member.user.last_name.length != 0 &&
                          (
                            member.user.first_name[0] + member.user.last_name[0]
                          )?.toUpperCase()}
                      </Avatar>
                    </Box>
                  </Tooltip>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "2%",
                      color: getColor(theme.minorBg),
                    }}
                  >
                    <Typography>
                      {member.user.first_name + " " + member.user.last_name}
                    </Typography>
                    <Typography>
                      نقش:
                      {role_english_to_persian[member.role]}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "2%",
                      color: getColor(theme.minorBg),
                    }}
                  >
                    <Typography>ایمیل:</Typography>
                    <Typography>
                      {convertNumberToPersian(member.user.email)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "2%",
                      color: getColor(theme.minorBg),
                    }}
                  >
                    <Typography>نام کاربری:</Typography>
                    <Typography>
                      {convertNumberToPersian(member.user.username)}
                    </Typography>
                  </Box>
                </MenuItem>
              );
            })}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ShareButton;
