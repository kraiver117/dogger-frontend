import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_RESET,
    USER_LOGOUT,
    USERS_LIST_REQUEST,
    USERS_LIST_SUCCESS,
    USERS_LIST_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true
            }

        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }

        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case USER_LOGIN_RESET:
            return {
                ...state,
                loading: false,
                error: ''
            }

        case USER_LOGOUT:
            return {}

        default:
            return state;
    }
}

export const usersListReducer = (state = {}, action) => {
    switch (action.type) {
        case USERS_LIST_REQUEST:
            return {
                loading: true
            }

        case USERS_LIST_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }

        case USERS_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export const userDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                loading: true
            }

        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                userDetails: action.payload
            }

        case USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}