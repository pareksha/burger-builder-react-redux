import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    loading: false,
    userId: null,
    token: null,
    error: null,
};

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        userId: action.userId,
        token: action.token,
        error: null,
    });
};

const authFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {token: null, userId: null});
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILED: return authFailed(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    };
};

export default reducer;