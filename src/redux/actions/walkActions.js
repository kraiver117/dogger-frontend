import {
    WALK_CREATE_FAIL,
    WALK_CREATE_REQUEST,
    WALK_CREATE_SUCCESS,

    WALK_DELETE_FAIL,
    WALK_DELETE_REQUEST,
    WALK_DELETE_SUCCESS,

    WALK_GET_BY_WALKER_FAIL,
    WALK_GET_BY_WALKER_REQUEST,
    WALK_GET_BY_WALKER_SUCCESS,

    WALK_UPDATE_FAIL,
    WALK_UPDATE_REQUEST,
    WALK_UPDATE_SUCCESS

} from '../constants/walkConstants';
import { doggerAPI } from '../api/doggerAPI';

export const createWalk = (walk) => async (dispatch) => {
    try {
        dispatch({ type: WALK_CREATE_REQUEST});

        await doggerAPI.post(`/walks`, walk);

        dispatch({
            type: WALK_CREATE_SUCCESS
        });
    } catch (error) {
        dispatch({
            type: WALK_CREATE_FAIL,
            payload: error.response.data?.beginning || error.response.data?.end
                ? 'Fecha de comienzo y final son requeridas'
                : error.response.data?.error
        });
    }
}

export const getWalksByWalker = (walkerId) => async (dispatch) => {
    try {
        dispatch({ type: WALK_GET_BY_WALKER_REQUEST });

        const { data: { data } } = await doggerAPI.get(`/walks/walker/${walkerId}`);

        dispatch({
            type: WALK_GET_BY_WALKER_SUCCESS,
            walker: data.walker,
            walks: data.walks
        });
        
    } catch (error) {
        dispatch({
            type: WALK_GET_BY_WALKER_FAIL,
            payload: error.response || error.response.data
                ? error.response.data.error
                : error.response.data
        });
    }
}

export const updateWalk = (walkId, dataToUpdate) => async (dispatch) => {
    try {
        dispatch({ type: WALK_UPDATE_REQUEST });

        await doggerAPI.put(`/walks/${walkId}`, dataToUpdate);

        dispatch({
            type: WALK_UPDATE_SUCCESS
        });

    } catch (error) {
        dispatch({
            type: WALK_UPDATE_FAIL,
            payload: error.response || error.response.data
                ? error.response.data.error
                : error.response.data
        });
    }
}

export const deleteWalk = (walkId) => async (dispatch) => {
    try {
        dispatch({ type: WALK_DELETE_REQUEST });

        await doggerAPI.delete(`/walks/${walkId}`);

        dispatch({
            type: WALK_DELETE_SUCCESS
        });
        
    } catch (error) {
        dispatch({
            type: WALK_DELETE_FAIL,
            payload: error.response || error.response.data
                ? error.response.data.error
                : error.response.data
        });
    }
}