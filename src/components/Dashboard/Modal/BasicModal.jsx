import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./BasicModal.scss";
import scrum_board from "../../../static/images/dashboard/scrum_board.svg";
import Grid from "@mui/material/Grid"; // Grid version 1
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import StyledTextField from "../StyledTextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { json, redirect } from "react-router-dom";
// import { AddBox } from "@mui/icons-material";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import conversation from "../../../static/images/landing/conversation.svg";
import apiInstance from '../../../utilities/axiosConfig';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
// import {redirect} from 'react-router-dom';

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
    fontFamily: "Vazir",
    // overflow: 'hidden', scroll
    overflow: 'auto',
};

// const theme = createTheme({
//     direction: "rtl", // Both here and <body dir="rtl">
//     typography: {
//         fontFamily: "Vazir",
//         fontSize: '10px',
//     },
// });
// Create rtl cache
const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});


export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let width = window.innerWidth;
    let isMatch = width > 900 ? true : false;
    // const config = isMatch
    //     ? {
    //         background: "#076585" /* fallback for old browsers */,
    //         background: "-webkit-linear-gradient(to left, #076585, #fff)",
    //         background: "linear-gradient(to left, #076585, #fff)",
    //     }
    //     : {
    //         background: "#076585" /* fallback for old browsers */,
    //         background: "-webkit-linear-gradient(to top, #076585, #fff)",
    //         background: "linear-gradient(to top, #076585, #fff)",
    //     };
    // const matches = useMediaQuery("(max-width:900px)");

    // const [workspaceTypes, setWorkspaceTypes] = React.useState({});
    // const [types, setTypes] = React.useState([]);
    // apiInstance.get('/workspaces/workspaces/type/').then((res) => {
    //     // workspaceTypes = res.data
    //     // workspaceTypes = await res.data.json()
    //     // const boards = res.data.map((obj) => (
    //     // //     {
    //     // //     // id: obj.id,
    //     // //     // name: obj.name,
    //     // // }
    //     //     types.push(obj)
    //     // ));
    //     console.log(res.data)
    //     // console.log(res.data.keys())
    //     // res.data.length
    // }).catch((err) => {
    //     console.log(err)
    // })
    // console.log(workspaceTypes)
    // let response = await apiInstance.fetch('/workspaces/workspaces/type/')
    // workspaceTypes = await response.json()
    // console.log(workspaceTypes)
    // const [workspaceType, setWorkspaceType] = React.useState(workspaceTypes[0]);
    // console.log(workspaceTypes["education"])
    // console.log(workspaceTypes.length)
    // const map1 = new Map(workspaceTypes);
    // console.log(map1)
    // for (const [key, value] of workspaceTypes[0]) {
    //     types.push(
    //         {
    //             'value': key,
    //             'label': value,
    //         }
    //     )
    //     console.log(key)
    //     console.log(value)
    //     console.log("----------------")
    //     console.log(types)
    // }

    // setWorkspaceTypes({
    //     "education": "آموزشی",
    //     "marketing": "بازاریابی",
    //     "small business": "سرمایه گذاری کوچک",
    //     "operations": "عملیاتی",
    //     "engineering-it": "مهندسی و IT",
    //     "finance": "مالی",
    //     "human resources": "منابع انسانی",
    //     "other": "سایر"
    // })

    // for (const [key, value] of Object.entries(workspaceTypes)) {
    //     // types.push(
    //     //     {
    //     //         'value': key,
    //     //         'label': value,
    //     //     }
    //     // )
    //     setTypes([...types, {
    //         'value': key,
    //         'label': value,
    //     }])
    // }
    // workspaceTypes.forEach((value, key) => {
    //     // types.push(
    //     //     {
    //     //         'value': key,
    //     //         'label': value,
    //     //     }
    //     // )
    //     setTypes([...types, {
    //         'value': key,
    //         'label': value,
    //     }])
    // })
    const types = [
        {
            'value': 'education',
            'label': 'آموزشی',
        },
        {
            'value': 'marketing',
            'label': 'بازاریابی',
        },
        {
            'value': 'small business',
            'label': 'سرمایه گذاری کوچک',
        },
        {
            'value': 'operations',
            'label': 'عملیاتی',
        },
        {
            'value': 'engineering-it',
            'label': 'مهندسی و IT',
        },
        {
            'value': 'finance',
            'label': 'مالی',
        },
        {
            'value': 'human resources',
            'label': 'منابع انسانی',
        },
        {
            'value': 'other',
            'label': 'سایر',
        },
    ]
    const [type, setType] = React.useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };

    const [errorWorkspaceName, setErrorWorkspaceName] = React.useState(false);
    const [errorWorkspaceType, setErrorWorkspaceType] = React.useState(false);

    const navigate = useNavigate();

    const navigateToWorkspace = (workspaceId) => {
        navigate(`/workspace/${workspaceId}`);
    }

    return (
        <div style={{
            // hover: {
            //     color: '#E2EDF8',
            //     backgroundColor: '#007fff',
            //     borderRadius: '5px',
            // },
        }}>
            <Button onClick={handleOpen} sx={{
                color: '#00bfff',
                ":hover": {
                    color: '#E2EDF8',
                    backgroundColor: '#007fff',
                    borderRadius: '5px',
                },
                marginTop: '8%',
                padding: '5%',

                fontFamily: 'Vazir',
                textDecoration: 'none',
                display: 'block',
                transition: '0.3s',
                display: 'flex',
                alignItems: 'center',
            }}>+</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container columns={{ xs: 3, sm: 3, md: 6 }} >
                        <Grid item xs={3} sm={3} md={3}>

                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                                fontFamily: 'Vazir',
                                color: 'black', // #0A1929
                            }}>
                                بیا فضای کاری مونو بسازیم
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2, fontFamily: 'Vazir', color: '#E2EDF8' }}>
                                بهره وری خود را با آسان کردن دسترسی همه به بوردها در یک مکان افزایش دهید.
                            </Typography>

                            <Box
                                sx={{
                                    // padding: "10%",
                                    fontFamily: 'Vazir',
                                    fontSize: '1.5rem',
                                }}
                            >
                                <CacheProvider value={cacheRtl}>
                                    <ThemeProvider>
                                    {/* <ThemeProvider theme={theme}> */}
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
                                    </ThemeProvider>
                                </CacheProvider>
                                <CacheProvider value={cacheRtl}>
                                    <ThemeProvider >
                                    {/* <ThemeProvider theme={theme}> */}
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
                                    </ThemeProvider>
                                </CacheProvider>
                                <CacheProvider value={cacheRtl}>
                                    <ThemeProvider >
                                    {/* <ThemeProvider theme={theme}> */}
                                        <StyledTextField
                                            margin="normal"
                                            fullWidth
                                            multiline
                                            maxRows={4}
                                            id="workspace_description"
                                            label="شرح فضای کاری(اختیاری)  "
                                            placeholder="شرح فضای‌کاری خود را وارد کنید."
                                            helperText="اعضای خود را با چند کلمه در مورد فضای کاری خود همراه کنید."
                                            name="workspace_description"
                                            autoComplete="workspace_description"
                                            autoFocus
                                            sx={{ width: "60%", display: "block" }}
                                            InputLabelProps={{ style: { fontFamily: "Vazir" } }}
                                            InputProps={{ style: { fontFamily: "Vazir" } }}
                                            FormHelperTextProps={{ style: { fontFamily: "Vazir", color: "black" } }}
                                        />
                                    </ThemeProvider>
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
                            </Box>
                            {/* توصیف فضای کاری خود را وارد کنید (دلخواه) */}
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            justifyItems: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            // paddingTop: isMatch ? '11%' : '0%',
                            paddingTop: "11%",
                        }}>
                            <img src={scrum_board} className="responsive--height top-img" />
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}