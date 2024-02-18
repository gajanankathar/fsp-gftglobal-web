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

export const partnerCreateReducers = (state = {partner: null}, action) => {
    switch(action.type){
        case PARTNER_ADD_REQUEST:
            return {
                error: null,
                loading: true,
                ...state
            }
        case PARTNER_ADD_SUCCESS:
            return {
                error: null,
                loading: false,
                partner: action.payload
            }
        case PARTNER_ADD_FAIL:
            return {
                loading:false,
                error: action.payload
            }
        default:
            return state
    }
}

export const partnerDetailsReducers = (state = {partner: null}, action) => {
    switch(action.type){
        case PARTNER_DETAILS_REQUEST:
            return {
                error: null,
                loading: true,
                ...state
            }
        case PARTNER_DETAILS_SUCCESS:
            return {
                error: null,
                loading: false,
                partner: action.payload

            }
        case PARTNER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const partnerUpdateReducers = (state = {partner: null}, action) => {
    switch(action.type){
        case PARTNER_UPDATE_REQUEST:
            return {
                error: null,
                loading: true,
                ...state
            }
        case PARTNER_UPDATE_SUCCESS:
            return {
                error: null,
                loading: false,
                partner: action.payload

            }
        case PARTNER_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
