import { StudentAction } from "./../actions";

interface IInitailState {
    students: any[];
    isLoading: boolean;
}
const InitailState: IInitailState = {
    students: [],
    isLoading: false
}

export const studentReducer = (state: IInitailState = InitailState, action: any) => {
    let newState;
    switch (action.type) {
        case StudentAction.GET_STUDENTS:
            return Object.assign({}, state, { isLoading: true });
        case StudentAction.GET_STUDENTS_SUCCESS:
            newState = state;
            newState.students = action.payload;
            newState.isLoading = false;
            return Object.assign({}, state, newState)
        case StudentAction.GET_STUDENTS_FAIL:
            return Object.assign({}, state, { isLoading: false })
        default:
            return state;
    }
}