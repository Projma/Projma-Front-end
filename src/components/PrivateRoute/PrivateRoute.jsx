import * as React from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
// import Typography from '@mui/material/Typography';
// import BasicModal from '../../Dashboard/Modal/BasicModal';
// import { color } from '@mui/system';
// // import BasicModal from "../components/Workspace_management/BasicModal/CreateBoard"; create board modal
// // import { BasicModal as CreateBoard } from '../../Workspace_management/BasicModal/CreateBoard';
// import apiInstance from '../../../utilities/axiosConfig';
// import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function PrivateRoute(props) {
    const state = useSelector((state) => state);
    const navigate = useNavigate();
    useEffect(() => {
        console.log("isAuthenticated", state.isAuthenticated);
        if (! state.isAuthenticated) {
            navigate('/signin/');
        }
    }, [state.isAuthenticated]);

    if (state.isAuthenticated) {
        return <>
            {props.children}
        </>;
    }
    else {
        // navigate('/signin');
        // navigateSignIn();
        // return (
        //     <></>
        // );
    }
}