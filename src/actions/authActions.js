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
    // ////console.log("login action");
    let flag = false;
    const response = await apiInstance.get(`/accounts/profile/myprofile/`).catch((err) => {
        ////console.log("Error: ", err);
        flag = true;
    });
    if (flag) {
        return dispatch({
            type: LOGOUT,
        });
    }
    const userData = response.data
    //     {
    //     "user": {
    //         "id": 1,
    //         "first_name": "farzan",
    //         "last_name": "rahmani",
    //         "username": "farzan_rahmani",
    //         "password": "pbkdf2_sha256$390000$vm7qW45S3Cu7MwFURNKYGq$h96Mkwb+GmO15WkzLZn9Znft/Pw1gyXXG3FiVhl8Fv4=",
    //         "email": "superuser@gmail.com"
    //     },
    //     "birth_date": null,
    //     "bio": null,
    //     "phone": null,
    //     "profile_pic": null,
    //     "telegram_id": null
    // }
    // ////console.log("userData: ", userData);
    return dispatch({
        type: LOGIN,
        payload: userData
    });
};

export const remove_token = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // history.push("/login");
    // redirect("/login");
    // return <Redirect to="/login" />
    
    return {
        type: LOGOUT,
    };
};

export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return {
        type: LOGOUT,
    };
};