"use strict";
var actions_1 = require("./../actions");
var InitailState = {
    companies: [],
    posts: [],
    temp: {},
    isLoading: false
};
exports.companyReducer = function (state, action) {
    if (state === void 0) { state = InitailState; }
    var newState;
    switch (action.type) {
        case actions_1.CompanyAction.GET_COMPANY:
            return Object.assign({}, state, { isLoading: true });
        case actions_1.CompanyAction.GET_COMPANY_SUCCESS:
            newState = state;
            newState.companies = action.payload;
            newState.isLoading = false;
            return Object.assign({}, state, newState);
        case actions_1.CompanyAction.GET_COMPANY_FAIL:
            return Object.assign({}, state, { isLoading: false });
        case actions_1.CompanyAction.GET_POST_BY_COMPANY:
            return Object.assign({}, state, { isLoading: true });
        case actions_1.CompanyAction.GET_POST_BY_COMPANY_SUCCESS:
            newState = state;
            newState.posts = action.payload;
            newState.isLoading = false;
            // console.log("Object.assign({}, state, newState);",Object.assign({}, state, newState))
            return Object.assign({}, state, newState);
        case actions_1.CompanyAction.GET_POST_BY_COMPANY_FAIL:
            return Object.assign({}, state, { isLoading: false });
        case actions_1.CompanyAction.GET_POST:
            return Object.assign({}, state, { isLoading: true });
        case actions_1.CompanyAction.GET_POST_SUCCESS:
            newState = state;
            newState.posts = action.payload;
            newState.isLoading = false;
            // console.log("Object.assign({}, state, newState);",Object.assign({}, state, newState))
            return Object.assign({}, state, newState);
        case actions_1.CompanyAction.GET_POST_FAIL:
            return Object.assign({}, state, { isLoading: false });
        case actions_1.CompanyAction.GET_ONE_POST_BY_COMPANY:
            return Object.assign({}, state, { isLoading: true });
        case actions_1.CompanyAction.GET_ONE_POST_BY_COMPANY_SUCCESS:
            newState = state;
            newState.temp = action.payload;
            newState.isLoading = false;
            // console.log("Object.assign({}, state, newState);",Object.assign({}, state, newState))
            return Object.assign({}, state, newState);
        case actions_1.CompanyAction.GET_ONE_POST_BY_COMPANY_FAIL:
            return Object.assign({}, state, { isLoading: false });
        default:
            return state;
    }
};
