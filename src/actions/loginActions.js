import axios from "axios";

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
} from "../constants/loginConstants";

import { BASE_URL } from "../constants";

// create axios client with base url
const client = axios.create({
  baseURL: BASE_URL,
});


export const actionUserLogin = (data) => async (dispatch) => {

    try {
        dispatch({ type: LOGIN_REQUEST })
        const response = await client.post(`/api/account/token/`, data);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })
    }
    catch(error){
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
}

export const actionUserLogout = () => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT_REQUEST })
        await client.post(`/api/account/logout/`);

        dispatch({
            type: LOGOUT_SUCCESS,
        })
    }
    catch(error){
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
}

export const actionValidateSession = () => async (dispatch) => {
    try {
        dispatch({ type: "VALIDATE_SESSION_REQUEST" })
        const response = await client.post(`/api/account/validate/`);

        dispatch({
            type: "VALIDATE_SESSION_SUCCESS",
            payload: response
        })
    }
    catch(error){
        dispatch({
            type: "VALIDATE_SESSION_FAIL",
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
}