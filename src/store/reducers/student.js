"use strict";
var actions_1 = require("./../actions");
var InitailState = {
    students: [],
    isLoading: false
};
exports.studentReducer = function (state, action) {
    if (state === void 0) { state = InitailState; }
    var newState;
    switch (action.type) {
        case actions_1.StudentAction.GET_STUDENTS:
            return Object.assign({}, state, { isLoading: true });
        case actions_1.StudentAction.GET_STUDENTS_SUCCESS:
            newState = state;
            newState.students = action.payload;
            newState.isLoading = false;
            return Object.assign({}, state, newState);
        case actions_1.StudentAction.GET_STUDENTS_FAIL:
            return Object.assign({}, state, { isLoading: false });
        default:
            return state;
    }
};
