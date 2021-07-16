import { 
    WALK_CREATE_FAIL,
    WALK_CREATE_REQUEST, 
    WALK_CREATE_RESET, 
    WALK_CREATE_SUCCESS, 

    WALK_GET_BY_WALKER_FAIL,
    WALK_GET_BY_WALKER_REQUEST,
    WALK_GET_BY_WALKER_RESET,
    WALK_GET_BY_WALKER_SUCCESS,

    WALK_DELETE_FAIL, 
    WALK_DELETE_REQUEST, 
    WALK_DELETE_RESET, 
    WALK_DELETE_SUCCESS, 

    WALK_UPDATE_FAIL, 
    WALK_UPDATE_REQUEST,
    WALK_UPDATE_RESET,
    WALK_UPDATE_SUCCESS
} from "../constants/walkConstants";

export const createWalkReducer = (state = {}, action) => {
    switch (action.type) {
        case WALK_CREATE_REQUEST:
            return {
                loading: true
            }

        case WALK_CREATE_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case WALK_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case WALK_CREATE_RESET:
            return {}

        default:
            return state;
    }
}

export const getWalksByWalkerReducer = (state = {}, action) => {
    switch (action.type) {
        case WALK_GET_BY_WALKER_REQUEST:
            return {
                loading: true
            }

        case WALK_GET_BY_WALKER_SUCCESS:
            return {
                loading: false,
                walker: action.walker,
                walks: action.walks
            }

        case WALK_GET_BY_WALKER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case WALK_GET_BY_WALKER_RESET:
            return {}

        default:
            return state;
    }
}

export const updateWalkReducer = (state = {}, action) => {
    switch (action.type) {
        case WALK_UPDATE_REQUEST:
            return {
                loading: true
            }

        case WALK_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case WALK_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case WALK_UPDATE_RESET:
            return {}

        default:
            return state;
    }
}

export const deleteWalkReducer = (state = {}, action) => {
    switch (action.type) {
        case WALK_DELETE_REQUEST:
            return {
                loading: true
            }

        case WALK_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case WALK_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case WALK_DELETE_RESET:
            return {}

        default:
            return state;
    }
}