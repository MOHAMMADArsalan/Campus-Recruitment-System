import { StudentAction } from "./../actions";

interface IInitailState {
    students: Object;
    isLoading: boolean;
}
const InitailState: IInitailState = {
    students: {},
    isLoading: false
}

export const studentReducer = (state: IInitailState = InitailState, action: any) => {
    let newState;
    switch (action.type) {
        case StudentAction.GET_STUDENTS:
            return Object.assign({}, state, { isLoading: true });
        case StudentAction.GET_STUDENTS_SUCCESS:
            newState = state;
            newState.students[action.payload['$key']] = action.payload;
            newState.isLoading = false;
            delete newState.students[action.payload['$key']]['$key'];
            return Object.assign({}, state, newState)
        case StudentAction.GET_STUDENTS_FAIL:
            console.log(action.payload)
            return Object.assign({}, state, { isLoading: false })
        default:
            return state;
    }
}