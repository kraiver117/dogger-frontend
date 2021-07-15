import { 
    PET_CREATE_FAIL,
    PET_CREATE_REQUEST,
    PET_CREATE_SUCCESS,
    PET_DELETE_FAIL, 
    PET_DELETE_REQUEST, 
    PET_DELETE_SUCCESS 
} from "../constants/petConstants";
import { doggerAPI } from '../api/doggerAPI';


export const addPet = (pet) => async (dispatch) => {
    try {
        dispatch({ type: PET_CREATE_REQUEST });

        await doggerAPI.post(`/pets`, pet);

        dispatch({
            type: PET_CREATE_SUCCESS
        });

    } catch (error) {
        dispatch({
            type: PET_CREATE_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        });
    }
}

export const deletePet = (petId) => async (dispatch) => {
    try {
        dispatch({ type: PET_DELETE_REQUEST });

        await doggerAPI.delete(`/pets/${petId}`);

        dispatch({
            type: PET_DELETE_SUCCESS
        });

    } catch (error) {
        dispatch({
            type: PET_DELETE_FAIL,
            payload: error.response && error.response.data.error
                ? error.response.data.error
                : error.message
        });
    }
}