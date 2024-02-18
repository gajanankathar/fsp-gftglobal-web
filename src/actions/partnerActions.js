import axios from "axios";

import {
    PARTNER_ADD_REQUEST,
    PARTNER_ADD_SUCCESS,
    PARTNER_ADD_FAIL,
    PARTNER_DETAILS_REQUEST,
    PARTNER_DETAILS_SUCCESS,
    PARTNER_DETAILS_FAIL,
    PARTNER_UPDATE_REQUEST,
    PARTNER_UPDATE_SUCCESS,
    PARTNER_UPDATE_FAIL,
} from "../constants/partnerConstants";

import { BASE_URL } from "../constants";

// create axios client with base url
const client = axios.create({
  baseURL: BASE_URL,
});


export const actionPartnerCreate = (data) => async (dispatch) => {
    try {
        dispatch({ type: PARTNER_ADD_REQUEST })
        const response = await client.post(`/api/create/partner/`, data);

        dispatch({
            type: PARTNER_ADD_SUCCESS,
            payload: response.data
        })
    }
    catch(error){
        dispatch({
            type: PARTNER_ADD_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
}

export const actionPartnerDetails = (id, token) => async (dispatch) => {
    const headers = {
        'Authorization':'Bearer ' + String(token)
    }
    try {
        dispatch({ type: PARTNER_DETAILS_REQUEST })
        const { data } = await client.get(`/api/partners/${id}`, {headers: headers});

        dispatch({
            type: PARTNER_DETAILS_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: PARTNER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
}

export const actionPartnerUpdate = (id, token, payload) => async (dispatch) => {
    const headers = {
        'Authorization':'Bearer ' + String(token)
    }
    try {
        dispatch({ type: PARTNER_UPDATE_REQUEST })
        const { data } = await client.put(`/api/partners/${id}/`, payload, {headers: headers});

        dispatch({
            type: PARTNER_UPDATE_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: PARTNER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
}