import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function PrivateRoute(props) {
    const state = useSelector((state) => state);
    const navigate = useNavigate();
    useEffect(() => {
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