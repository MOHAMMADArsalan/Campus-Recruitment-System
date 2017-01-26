import { CompanyAction } from "./../actions";

interface IInitailState {
    companies: any[];
    isLoading: boolean;
    posts: any[],
    temp: Object;
}
const InitailState: IInitailState = {
    companies: [],
    posts: [],
    temp: {},
    isLoading: false
}

export const companyReducer = (state: IInitailState = InitailState, action: any) => {
    let newState;
    switch (action.type) {
        case CompanyAction.GET_COMPANY:
            return Object.assign({}, state, { isLoading: true });
        case CompanyAction.GET_COMPANY_SUCCESS:
            newState = state;
            newState.companies = action.payload;
            newState.isLoading = false;
            return Object.assign({}, state, newState)
        case CompanyAction.GET_COMPANY_FAIL:
            return Object.assign({}, state, { isLoading: false })
        case CompanyAction.GET_POST_BY_COMPANY:
            return Object.assign({}, state, { isLoading: true });
        case CompanyAction.GET_POST_BY_COMPANY_SUCCESS:
            newState = state;
            newState.posts = action.payload;
            newState.isLoading = false;
            // console.log("Object.assign({}, state, newState);",Object.assign({}, state, newState))
            return Object.assign({}, state, newState);
        case CompanyAction.GET_POST_BY_COMPANY_FAIL:
            return Object.assign({}, state, { isLoading: false });

        case CompanyAction.GET_POST:
            return Object.assign({}, state, { isLoading: true });
        case CompanyAction.GET_POST_SUCCESS:
            newState = state;
            newState.posts = action.payload;
            newState.isLoading = false;
            // console.log("Object.assign({}, state, newState);",Object.assign({}, state, newState))
            return Object.assign({}, state, newState);
        case CompanyAction.GET_POST_FAIL:
            return Object.assign({}, state, { isLoading: false });



        case CompanyAction.GET_ONE_POST_BY_COMPANY:
            return Object.assign({}, state, { isLoading: true });
        case CompanyAction.GET_ONE_POST_BY_COMPANY_SUCCESS:
            newState = state;
            newState.temp = action.payload;
            newState.isLoading = false;
            // console.log("Object.assign({}, state, newState);",Object.assign({}, state, newState))
            return Object.assign({}, state, newState);
        case CompanyAction.GET_ONE_POST_BY_COMPANY_FAIL:
            return Object.assign({}, state, { isLoading: false });


        default:
            return state;
    }
}