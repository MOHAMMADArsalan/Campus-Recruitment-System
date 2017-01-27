import { UserAction } from "./../actions";

interface IInitailState {
    feedbacks: any[];
    isLoading: boolean;
}
const InitailState: IInitailState = {
    feedbacks: [],
    isLoading: false
}

export const userReducer = (state: IInitailState = InitailState, action: any) => {
    let newState;
    switch (action.type) {
        case UserAction.GET_USER_FEEDBACK:
            return Object.assign({}, state, { isLoading: true });
        case UserAction.GET_USER_FEEDBACK_SUCCESS:
            newState = state;
            newState.feedbacks = action.payload;
            newState.isLoading = false;
            return Object.assign({}, state, newState)
        case UserAction.GET_USER_FEEDBACK_SUCCESS:
            return Object.assign({}, state, { isLoading: false })
        default:
            return state;
    }
}