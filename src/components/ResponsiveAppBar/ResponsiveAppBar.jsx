import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import "./ResponsiveAppBar.scss";
import avatar_photo from "../../static/images/dashboard/scrum_board.svg";
import { useNavigate } from 'react-router-dom';
import BasicMenu from './BasicMenu/BasicMenu';
import { useState } from "react";
import apiInstance from "../../utilities/axiosConfig";
import { useEffect } from "react";
// https://mui.com/#app-bar-with-responsive-menu
import { useSelector, useDispatch } from "react-redux";
// import { login } from "../../actions/authActions";
import { logout } from "../../actions/authActions";

function ResponsiveAppBar() {
    let [workspaces, setWorkspaces] = useState([])
    // let [owningWorkspaces, setOwningWorkspaces] = useState([])
    useEffect(() => {
        apiInstance.get("/workspaces/dashboard/myworkspaces/").then((response) => {
            setWorkspaces(response.data);
        }).catch((error) => {
            // console.log(error);
        });
        // apiInstance.get("/workspaces/dashboard/myowning-workspaces/").then((response) => {
        //     setOwningWorkspaces(response.data);
        //     // setWorkspaces(response.data);
        // }).catch((error) => {
        //     // console.log(error);
        // });
    }, [])

    const pages = ['ستاره دارها', 'فضای کارها', 'ایجاد']; // 'اخیرا دیده شده‌ها',
    let workspaces_id_to_name = workspaces.reduce((acc, workspace) => {
        acc[workspace.id] = workspace.name;
        return acc;
    }, {}); // {1: "workspace1", 2: "workspace2", ...} 

    const pages_map_to_links = {
        'فضای کار ها': workspaces_id_to_name,
        'ایجاد': {
            'فضای کار': '/workspaces/create-workspace', // basic modal
            'بورد': '/boards/create-board', // basic modal
        },
        'ستاره دارها': {
            'فضای کار': '/workspaces/starred-workspaces',
            'بورد': '/boards/starred-boards',
        },
    }

    let pages_map_to_items = []
    for (const id in workspaces_id_to_name) {
        if (Object.hasOwnProperty.call(workspaces_id_to_name, id)) {
            const name = workspaces_id_to_name[id];
            pages_map_to_items.push(
                // onclick={handlecolse}
                <MenuItem href={`/workspace/${id}`} key={id}>{name}</MenuItem>
            )
        }
    }
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    let settings = ['ورود', 'پروفایل', 'داشبورد', 'تغییر رمز عبور', 'خروج']; // حساب کاربری
    if (state.isAuthenticated === false) {
        // dispatch(setToken(localStorage.getItem("token")));
        settings = ['ورود'];
    }
    else {
        settings = ['پروفایل', 'داشبورد', 'تغییر رمز عبور', 'خروج'];
    }
    let settings_map_to_functions = {
        "ورود": '/signin/',
        "پروفایل": '/profile/',
        "داشبورد": '/dashboard/',
        "تغییر رمز عبور": '/changepassword/',
        "خروج": '/logout/',
    }

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate();

    const navigateToPage = (page) => {
        if (page === '/logout/') {
            // console.log('remove token');
            dispatch(logout());
            console.log(state);
            navigate('/'); // 
        }
        else {
            navigate(page);
        }
        // navigate(`/workspace/${workspaceId}`);
        handleCloseUserMenu();
    }

    return (
        <AppBar position="static" sx={{
            fontFamily: 'Vazir',
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Vazir',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        PROJMA
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', fontFamily: 'Vazir' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu style={{ fontFamily: 'Vazir' }}
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                fontFamily: 'Vazir',
                            }}
                        >

                            {
                                pages.map((page) => (
                                    <BasicMenu name={page} workspaces={workspaces_id_to_name} />
                                ))
                            }
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'Vazir',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        PROJMA
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {
                            pages.map((page) => (
                                <BasicMenu name={page} workspaces={workspaces_id_to_name} />
                            ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, fontFamily: 'Vazir' }}>
                        <Tooltip
                            // title="باز کردن تنظیمات" 
                            title={<h3 style={{ fontFamily: 'Vazir' }}>باز کردن تنظیمات</h3>}
                        >
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="عکس پروفایل" src={state.user.profile_pic ? state.user.profile_pic : avatar_photo} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => {
                                return (
                                        <MenuItem key={setting} onClick={() => navigateToPage(settings_map_to_functions[setting])}>
                                            <Typography textAlign="center" style={{ color: 'black', fontFamily: 'Vazir' }}>{setting}</Typography>
                                        </MenuItem>
                                    )
                            })}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
