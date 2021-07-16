import { 
    PET_CREATE_FAIL,
    PET_CREATE_REQUEST,
    PET_CREATE_RESET,
    PET_CREATE_SUCCESS,
    PET_DELETE_FAIL, 
    PET_DELETE_REQUEST, 
    PET_DELETE_RESET, 
    PET_DELETE_SUCCESS 
} from "../constants/petConstants";

export const petAddReducer = (state= {}, action) => {
    switch (action.type) {
        case PET_CREATE_REQUEST:
            return {
                loading: true
            }

        case PET_CREATE_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case PET_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case PET_CREATE_RESET:
            return {}

        default:
            return state;
    }
}

export const petDeleteReducer = (state= {}, action) => {
    switch (action.type) {
        case PET_DELETE_REQUEST:
            return {
                loading: true
            }

        case PET_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case PET_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case PET_DELETE_RESET:
            return {}

        default:
            return state;
    }
}