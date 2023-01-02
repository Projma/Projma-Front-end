// import React from 'react';
import * as React from 'react';
import { Button } from '@mui/material';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import { Box } from "@mui/material";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import StyledTextField from '../../Dashboard/StyledTextField';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import apiInstance from '../../../utilities/axiosConfig';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { deepOrange, green } from '@mui/material/colors';
import LinkSharpIcon from '@mui/icons-material/LinkSharp';
import { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ShareButton.scss";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    width: "70%",
    height: "78%",
    // bgcolor: 'background.paper',
    bgcolor: '#265D97', // #5090D3 #1E4976
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
    padding: "1%"
};

// Create rtl cache
const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

const ShareButton = (props) => {
    const [open, setOpen] = React.useState(false);
    const [inviteLink, setinviteLink] = useState('');
    const [members, setMembers] = React.useState([]);
    const [inviteToken, setInviteToken] = React.useState('');
    const params = useParams();
    const role_english_to_persian = {
        "Admin": "ادمین",
        "Member": "کاربر",
        "Guest": "مهمان"
    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        apiInstance.get(`/workspaces/board/${params.id}/members/`).then((res) => {
            // apiInstance.get(`/workspaces/board/${2}/members/`).then((res) => {
            // console.log(res.data);
            setMembers(res.data);
            // array of members
            // "user": {
            //     "id": 1,
            //     "first_name": "",
            //     "last_name": "",
            //     "username": "superuser",
            //     "password": "pbkdf2_sha256$390000$KpLcn5HQQv28LKn5PcbOvQ$si5sOOcWlTO+3U2Gwu1TqldM9TQ/F44Z7VcQiDJwZD0=",
            //     "email": "superuser@gmail.com"
            //   },
            //   "birth_date": null,
            //   "bio": null,
            //   "phone": null,
            //   "profile_pic": null,
            //   "role": "Member"
            // }
        });
        apiInstance.get(`/workspaces/board/${params.id}/invite_link/`).then((res) => {
            // apiInstance.get(`/workspaces/board/${2}/invite/`).then((res) => {
            // console.log(res.data);
            setInviteToken(res.data);
        });
    }, []);


    const copy = async () => {
    const invite_link = "http://localhost:3000/borad_invitation/" + params.id + "/" + inviteToken + "/";
        setinviteLink(invite_link);
        // setinviteLink(`http://localhost:3000/board/${params.id}/`);
        // setinviteLink('این یک تست است.');
        await navigator.clipboard.writeText(inviteLink);
        // alert('Text copied');
        toast.success("لینک کپی شد.", {
            position: toast.POSITION.TOP_CENTER,
            rtl: true,
        });
    }

    return (
        <>
            <Button
                variant="contained"
                // button-key="buttonAttribute"
                // onClick={() => navigate("/signup/")}
                sx={{
                    // height: 54,
                    // width: 150,
                    // fontSize: "90%",
                    // width: "30%",
                    // height: "100%",
                    ml: "0.5rem",
                    mr: "1.3rem",
                    fontFamily: "Vazir",
                }}
                onClick={handleOpen}
            >
                <SendTwoToneIcon sx={{ ml: 1.5 }} />
                اشتراک
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
                        <Button onClick={handleClose}> <ClearTwoToneIcon sx={{
                            color: "tomato",
                            // margin: "1%"
                            marginBottom: "9%",
                            // ":dir": "ltr"
                            // marginRight: "3800%",
                        }} /> </Button>
                        <Typography id="spring-modal-title" variant="h5" component="h2" sx={{ color: "black", marginBottom: "2%", marginRight: "2%" }}>
                            بورد را به اشتراک بگذارید
                        </Typography>
                        {/* <Typography id="spring-modal-description" sx={{ mt: 2,marginBottom:2 }}>
                            اشتراک بورد
                        </Typography> */}
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            // justifyContent: "space-between",
                            alignItems: "center",
                            // marginBottom: "0%",
                            // marginTop: "2%",
                            marginRight: "2%",
                            // marginLeft: "2%",
                        }}>
                            {/* <CacheProvider value={cacheRtl}>
                                <ThemeProvider theme={theme}>
                                <StyledTextField
                                    // margin="normal"
                                    // required
                                    fullWidth
                                    id="search_box"
                                    label="جستجو"
                                    type="search" // debouncing (in react) or throttle (in JS)
                                    // onChange={inputHandler}
                                    placeholder="آدرس ایمیل یا نام را وارد کنید."
                                    helperText="فرد مورد نظر خود را جستجو کنید."
                                    name="search_box"
                                    autoComplete="search_box"
                                    autoFocus
                                    sx={{ width: "60%", display: "block", marginRight: "3%" }}
                                    InputLabelProps={{ style: { fontFamily: "Vazir" } }}
                                    InputProps={{ style: { fontFamily: "Vazir" } }}
                                    FormHelperTextProps={{ style: { fontFamily: "Vazir", color: "black" } }}
                                // error={errorWorkspaceName}
                                />
                                </ThemeProvider>
                            </CacheProvider> */}
                            {/* https://mui.com/material-ui/react-autocomplete/#multiple-values */}
                            {/* https://mui.com/material-ui/react-autocomplete/#load-on-open */}
                            {/* https://mui.com/material-ui/react-autocomplete/#search-as-you-type */}
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={top100Films}
                                fullWidth
                                getOptionLabel={
                                    (option) => option.title
                                    // (option) => {
                                    //     <MenuItem>
                                    //         {/* <ListItemText primary={option.title} /> */}
                                    //         {option.title}
                                    //     </MenuItem>
                                    // }

                                    }
                                sx={{
                                    width: "60%",
                                    display: "block",
                                    marginRight: "3%",
                                    marginBottom: "2%",
                                    marginLeft: "2%",
                                    //    color: "black"
                                    // backgroundColor: "#66B2FF",
                                }}
                                // defaultValue={[top100Films[13]]}
                                defaultValue={[top100Films[0]]}
                                filterSelectedOptions
                                filterOptions={(x) => x}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        sx={{
                                            color: "black",
                                            // backgroundColor: "#66B2FF",
                                        }}
                                        // label="filterSelectedOptions"
                                        // placeholder="Favorites"
                                        label="جستجو"
                                        placeholder="آدرس ایمیل یا نام کاربری را وارد کنید."
                                        helperText="فرد مورد نظر خود را جستجو کنید."
                                        FormHelperTextProps={{ style: { color: "black" } }}
                                        InputLabelProps={{ style: { color: "black" } }}

                                        // InputProps={{ style: { fontFamily: "Vazir", color: "black" } }}
                                        id="search_box"
                                        name='search_box'
                                    />

                                    // <StyledTextField
                                    //     {...params}
                                    //     // margin="normal"
                                    //     // required
                                    //     // fullWidth
                                    //     // id="search_box"
                                    //     label="جستجو"
                                    //     // type="search" // debouncing (in react) or throttle (in JS)
                                    //     // onChange={inputHandler}
                                    //     placeholder="آدرس ایمیل یا نام را وارد کنید."
                                    //     helperText="فرد مورد نظر خود را جستجو کنید."
                                    //     name="search_box"
                                    //     // autoComplete="search_box"
                                    //     // autoFocus
                                    //     sx={{ width: "60%", display: "block", marginRight: "3%" }}
                                    //     InputLabelProps={{ style: { fontFamily: "Vazir" } }}
                                    //     InputProps={{ style: { fontFamily: "Vazir" } }}
                                    //     FormHelperTextProps={{ style: { fontFamily: "Vazir", color: "black" } }}
                                    // // error={errorWorkspaceName}
                                    // />
                                )}
                            />
                            <Button
                                variant="contained"
                                // button-key="buttonAttribute"
                                sx={{
                                    // height: 54,
                                    // width: 150,
                                    // fontSize: 20,
                                    // marginTop: "0%",
                                    marginBottom: "2.4%",
                                    padding: "1.35%",
                                    // paddingTop: "5%",
                                    width: "20%",
                                    // height: "100%",
                                    fontFamily: "Vazir",
                                    backgroundColor: "#0A1929", // #132F4C
                                }}
                            // disabled={disableButton}
                            // onClick={this.isClicked}
                            // onClick={() => {
                            //     // let workspace_name = document.getElementById("workspace_name").value;
                            //     // let create_workspace_formdata = new FormData();
                            //     // create_workspace_formdata.append("name", workspace_name);
                            //     // create_workspace_formdata.append("type", type);
                            //     apiInstance.post('workspaces/dashboard/create-workspace/', create_workspace_formdata).then((response) => {
                            //         navigateToWorkspace(response.data.id);
                            //     })
                            //         .catch((error) => {
                            //             console.log(error);
                            //         });
                            // }}
                            >
                                {/* {" "} */}
                                اشتراک
                            </Button>
                        </Box>
                        <MenuItem sx={{
                            // marginLeft: "2%",
                        }}>
                            <Box sx={{
                                display: "flex",
                                marginLeft: "2%",
                                marginBottom: "1.5%",
                                marginTop: "1.5%",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}>
                                <Avatar sx={{ bgcolor: deepOrange[500], width: 56, height: 56, marginLeft: "10%" }} variant="rounded">
                                    <LinkSharpIcon sx={{ width: 45, height: 45, color: "black" }} />
                                </Avatar>
                                <Typography variant='h6' sx={{ color: "#000", marginLeft: "10%" }}>
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
                                        backgroundColor: "#132F4C", // #0A1929
                                    }}
                                    onClick={copy}
                                >
                                    {/* {" "} */}
                                    کپی لینک
                                </Button>
                                {/* <ToastContainer /> */}
                            </Box>
                        </MenuItem>
                        {
                            members.map((member) => {
                                return (
                                    <MenuItem value={member.user.username} key={member.user.username}>  {/* or menu item  */}
                                        <Tooltip title={member.user.username} >
                                            <Box sx={{
                                                // display: "flex",
                                                marginLeft: "2%",
                                            }}>
                                                <Avatar
                                                    key={member.id}
                                                    alt={(member.user.first_name + " " + member.user.last_name).toString()}
                                                    src={member.profile_pic !== null ? member.profile_pic : "none"}
                                                    {...stringAvatar((member.user.first_name + " " + member.user.last_name).toString())}
                                                    className="board_avatar-profile-picture"
                                                // sx={{ width: 56, height: 56 }}
                                                />
                                            </Box>
                                        </Tooltip>
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            marginLeft: "2%",
                                        }}>
                                            <Typography>
                                                {member.user.first_name + " " + member.user.last_name}
                                            </Typography>
                                            <Typography>
                                                نقش:
                                                {role_english_to_persian[member.role]}
                                            </Typography>
                                        </Box>
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            marginLeft: "2%",
                                        }}>
                                            <Typography>
                                                ایمیل:
                                            </Typography>
                                            <Typography>
                                                {member.user.email}
                                            </Typography>
                                        </Box>
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            marginLeft: "2%",
                                        }}>
                                            <Typography>
                                                نام کاربری:
                                            </Typography>
                                            <Typography>
                                                {member.user.username}
                                            </Typography>
                                        </Box>
                                    </MenuItem>
                                )
                            })
                        }
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default ShareButton

function stringToColor(string) {
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

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            width: 56,
            height: 56
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
    // return {
    //     children: `${name.split(" ")[0][0].toUpperCase()}${name
    //         .split(" ")[1][0]
    //         .toUpperCase()}`,
    // };
}


const top100Films = [
    { title: 'فرزان رحمانی', year: 1994 },
    { title: 'محمد اصولیان', year: 1972 },
    { title: 'نوید ابراهیمی', year: 1974 },
    { title: 'سینا علینژاد', year: 2008 },
    { title: 'وحید محمدی', year: 1957 },
    { title: "محمد حسین عباسپور", year: 1993 },
    { title: 'سینا علینژاد', year: 1974 },
    { title: 'محمد حسین عباسپور', year: 2008 },
    { title: 'وحید محمدی', year: 1957 },
    { title: "نوید ابراهیمی", year: 1993 },
    { title: 'افشین زنگنه', year: 1994 },
];
