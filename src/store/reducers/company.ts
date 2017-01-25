import { CompanyAction } from "./../actions";

interface IInitailState {
    companies: Object;
    isLoading: boolean;
}
const InitailState: IInitailState = {
    companies: {},
    isLoading: false
}

export const companyReducer = (state: IInitailState = InitailState, action: any) => {
    let newState;
    switch (action.type) {
        case CompanyAction.GET_COMPANY:
            return Object.assign({}, state, { isLoading: true });
        case CompanyAction.GET_COMPANY_SUCCESS:
            newState = state;
            newState.companies = {};
            newState.companies[action.payload['$key']] = action.payload;
            newState.isLoading = false;
            delete newState.companies[action.payload['$key']]['$key'];
            console.log("Object.assign({}, state, newState)", Object.assign({}, state, newState))
            return Object.assign({}, state, newState)
        case CompanyAction.GET_COMPANY_FAIL:
            return Object.assign({}, state, { isLoading: false })
        default:
            return state;
    }
}