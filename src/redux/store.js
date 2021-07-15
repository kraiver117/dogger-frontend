import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
    userLoginReducer,
    usersListReducer,
    userDetailsReducer
} from './reducers/userReducer';

import {
    petAddReducer,
    petDeleteReducer
} from './reducers/petReducer';

const reducers = combineReducers({
    authUser: userLoginReducer,
    usersList: usersListReducer,
    userDetails: userDetailsReducer,

    petAdd: petAddReducer,
    petDelete: petDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null

const initialState = {
    authUser: { userInfo: userInfoFromStorage }
}

const middleware = [thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;