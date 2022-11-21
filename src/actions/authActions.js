import apiInstance from '../utilities/axiosConfig';
// import {
//     // baseUrl,
//     history
// } from '../utilities/constants';
import {
    LOGIN,
    LOGOUT
} from "../actionTypes/actionTypes.js";
import { redirect } from 'react-router-dom';
import { Redirect, Route } from "react-router";
import { useNavigate } from "react-router-dom";

export const login = () => async (dispatch) => {
    // const response = await apiInstance.get(`${baseUrl}/accounts/users/me`, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    const response = await apiInstance.get(`accounts/users/me`)
    const userData = response.data
    return dispatch({
        type: LOGIN,
        payload: userData
    });
};

export const remove_token = () => {
    localStorage.removeItem('access_token');
    // history.push("/login");
    // redirect("/login");
    // return <Redirect to="/login" />
    
    return {
        type: LOGOUT,
    };
};

export const logout = () => {
    localStorage.removeItem('access_token');
    return {
        type: LOGOUT,
    };
};