import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function RedirectLoggedInUser(props) {
    const state = useSelector((state) => state);
    const navigate = useNavigate();
    const params = useParams();

    // useEffect(() => {
    //     if (! state.isAuthenticated) {
    //         navigate('/signin/');
    //     }
    // }, [state.isAuthenticated]);

    // if (state.isAuthenticated) {
    //     return React.cloneElement(props.children, { key: params.id === undefined ? params.boardId : params.id });
    // }

    useEffect(() => {
        if (state.isAuthenticated) {
            navigate('/dashboard/');
        }
    }, [state.isAuthenticated]);

    if (! state.isAuthenticated) {
        return React.cloneElement(props.children, { key: params.id === undefined ? params.boardId : params.id });
    }
}
