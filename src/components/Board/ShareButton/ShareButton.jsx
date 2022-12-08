// import React from 'react';
import * as React from 'react';
import { Button } from '@mui/material';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
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

const ShareButton = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button
                variant="contained"
                // button-key="buttonAttribute"
                // onClick={() => navigate("/signup/")}
                sx={{
                    margin: "1%",
                    // height: 54,
                    // width: 150,
                    // fontSize: "90%",
                    // width: "30%",
                    // height: "100%",
                    fontFamily: "Vazir",
                }}
                onClick={handleOpen}
            >
                <SendTwoToneIcon sx={{ ml: 1.5 }} />
                اشتراک
            </Button>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
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
                            color: "black",
                            // margin: "1%"
                            marginBottom: "9%",
                            // ":dir": "ltr"
                        }} /> </Button>
                        <Typography id="spring-modal-title" variant="h6" component="h2">
                            بورد را به اشتراک بگذارید
                        </Typography>
                        <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                            اشتراک بورد
                        </Typography>
                        {/* <Box
                            sx={{
                                // padding: "10%",
                                fontFamily: 'Vazir',
                                fontSize: '1.5rem',
                            }}
                        >
                            <CacheProvider value={cacheRtl}>
                                <StyledTextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="workspace_name"
                                    label="نام فضای‌کار"
                                    placeholder="نام فضای‌کار خود را وارد کنید."
                                    // helperText="این نام شرکت، تیم یا سازمان شما است."
                                    name="workspace_name"
                                    autoComplete="workspace_name"
                                    autoFocus
                                    sx={{ width: "60%", display: "block" }}
                                    InputLabelProps={{ style: { fontFamily: "Vazir" } }}
                                    InputProps={{ style: { fontFamily: "Vazir" } }}
                                    FormHelperTextProps={{ style: { fontFamily: "Vazir", color: "black" } }}
                                    error={errorWorkspaceName}
                                    helperText={errorWorkspaceName ? "نام فضای کار نمی‌تواند خالی باشد." : "این نام شرکت، تیم یا سازمان شما است."}
                                />
                            </CacheProvider>
                            <CacheProvider value={cacheRtl}>
                                <StyledTextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="workspace_type"
                                    label="نوع فضای کاری"
                                    select // https://mui.com/material-ui/react-text-field/#basic-textfield
                                    placeholder="نوع فضای‌کاری خود را وارد کنید."
                                    // helperText="انتخاب کنید."
                                    onChange={handleChange}
                                    name="workspace_type"
                                    autoComplete="workspace_type"
                                    autoFocus
                                    sx={{ width: "60%", display: "block" }}
                                    InputLabelProps={{ style: { fontFamily: "Vazir" } }}
                                    InputProps={{ style: { fontFamily: "Vazir" } }}
                                    FormHelperTextProps={{ style: { fontFamily: "Vazir", color: "black" } }}
                                    error={errorWorkspaceType}
                                    helperText={errorWorkspaceType ? "لطفا این فیلد را پر کنید." : ""}
                                >
                                    {types.map((option) => (
                                        <MenuItem key={option.value} value={option.value} sx={{
                                            fontFamily: 'Vazir',
                                            color: 'black', // #0A1929
                                            backgroundColor: '#265D97',
                                            margin: '0%',
                                            padding: '3%',
                                        }}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </StyledTextField>
                            </CacheProvider>
                            <Button
                                variant="contained"
                                // button-key="buttonAttribute"
                                sx={{
                                    // height: 54,
                                    // width: 150,
                                    // fontSize: "90%",
                                    width: "30%",
                                    height: "100%",
                                    fontFamily: "Vazir",
                                    backgroundColor: "#0A1929", // #132F4C
                                }}
                                disabled={disableButton}
                                // onClick={this.isClicked}
                                onClick={() => {
                                    let workspace_name = document.getElementById("workspace_name").value;
                                    if (workspace_name === "") {
                                        setErrorWorkspaceName(true);
                                    }
                                    else {
                                        setErrorWorkspaceName(false);
                                    }
                                    if (type == "") {
                                        setErrorWorkspaceType(true);
                                    }
                                    else {
                                        setErrorWorkspaceType(false);
                                    }
                                    if (errorWorkspaceName && errorWorkspaceType) {
                                        return;
                                    }

                                    let create_workspace_formdata = new FormData();
                                    create_workspace_formdata.append("name", workspace_name);
                                    create_workspace_formdata.append("type", type);
                                    create_workspace_formdata.append("description", document.getElementById("workspace_description").value);
                                    // console.log(create_workspace_formdata);
                                    // console.log("clicked");
                                    setDisableButton(true); // make text spinning and disable button
                                    apiInstance.post('workspaces/dashboard/create-workspace/', create_workspace_formdata).then((response) => {
                                        console.log(response);
                                        // console.log(response.data);
                                        // {
                                        //     "id": 11,
                                        //     "name": "تست 11",
                                        //     "description": "",
                                        //     "type": "other",
                                        //     "created_at": "2022-12-01T11:36:41.755515Z",
                                        //     "updated_at": "2022-12-01",
                                        //     "owner": 11,
                                        //     "members": [],
                                        //     "boards": []
                                        // }
                                        // console.log(response.data.id);
                                        // navigate to the new workspace
                                        // navigate(`/workspace/${response.data.id}`); // workspace/:id/*
                                        // useNavigate(`/workspace/${response.data.id}`);
                                        // return <Redirect to={`/workspace/${response.data.id}`} />;
                                        navigateToWorkspace(response.data.id);

                                    })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                }}
                            >
                                {" "}
                                ادامه
                            </Button>
                        </Box> */}
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default ShareButton
