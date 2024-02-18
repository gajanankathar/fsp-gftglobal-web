import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
} from "../constants/loginConstants";

export const loginReducers = (state = {authTokens: null}, action) => {
    switch(action.type){
        case LOGIN_REQUEST:
            return {
                error: null,
                loading: true,
                ...state
            }
        case LOGIN_SUCCESS:
            return {
                error: null,
                loading: false,
                authTokens: action.payload
            }
        case LOGIN_FAIL:
            return {
                loading:false,
                error: action.payload
            }
        default:
            return state
    }
}

export const logoutReducers = (state = {user: {}}, action) => {
    switch(action.type){
        case LOGOUT_REQUEST:
            return {
                loading: true,
                ...state
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                ...state
            }
        case LOGOUT_FAIL:
            return {
                loading:false,
                error: action.payload
            }
        default:
            return state
    }
}

export const validateSessionReducers = (state = {user: {}}, action) => {
    switch(action.type){
        case "VALIDATE_SESSION_REQUEST":
            return {
                loading: true,
                ...state
            }
        case "VALIDATE_SESSION_SUCCESS":
            return {
                loading: false,
                user: {
                    ...action.payload.data
                }
            }
        case "VALIDATE_SESSION_FAIL":
            return {
                loading:false,
                error: action.payload,
                ...state
            }
        default:
            return state
    }
}