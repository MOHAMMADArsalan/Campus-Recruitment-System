"use strict";
var actions_1 = require('../actions');
var InitalState = {
    isLoading: false,
    isError: { status: false, msg: null },
    isLoggedin: false,
    user: {},
    isRegistered: false,
};
exports.authReducer = function (state, action) {
    if (state === void 0) { state = InitalState; }
    switch (action.type) {
        case actions_1.AuthActions.LOGIN:
            return Object.assign({}, state, { isLoading: true });
        case actions_1.AuthActions.LOGIN_FAIL:
            return Object.assign({}, state, { isLoading: false, isLoggedin: false, user: {} });
        case actions_1.AuthActions.LOGIN_SUCCESS:
            return Object.assign({}, state, { isLoading: false, isLoggedin: true, user: action.payload });
        case actions_1.AuthActions.LOGOUT_FAIL:
            return Object.assign({}, state, { isLoading: false });
        case actions_1.AuthActions.LOGOUT_SUCCESS:
            return Object.assign({}, state, { isLoading: false, isLoggedin: false, user: {} });
        // case AuthActions.SETCURRENTUSERDATA:
        //   return Object.assign({}, state, { user: Object.assign({}, state.user, action.payload) });
        case actions_1.AuthActions.SIGN_UP:
            return Object.assign({}, state, { isLoading: true, isRegistered: false });
        case actions_1.AuthActions.SIGN_UP_SUCCESS:
            return Object.assign({}, state, { isLoading: false, isRegistered: true });
        case actions_1.AuthActions.SIGN_UP_FAIL:
            return Object.assign({}, state, { isLoading: false, isError: action.payload.isError });
        case actions_1.AuthActions.GET_USER_INFO:
            return Object.assign({}, state, { isLoadding: true });
        case actions_1.AuthActions.GET_USER_INFO_SUCCESS:
            return Object.assign({}, state, { user: action.payload, isLoading: false });
        case actions_1.AuthActions.GET_USER_INFO_FAIL:
            return Object.assign({}, state, { isLoadding: false });
        default:
            return state;
    }
};
