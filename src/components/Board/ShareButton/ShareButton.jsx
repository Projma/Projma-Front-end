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
                                defaultValue={[top100Films[13]]}
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
                                <ToastContainer />
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
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    {
        title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    {
        title: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
];
