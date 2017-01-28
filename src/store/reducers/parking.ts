import { ParkingAction } from "./../actions";
interface IInitailState {
    parkings: Object;
    isLoading: boolean;
    posts: any[],
    temp: Object;
    avail: any[];

    'post-detail': any[];
}
const InitailState: IInitailState = {
    parkings: {},
    posts: [],
    temp: {},
    avail: [],
    'post-detail': [],
    isLoading: false
}

export const parkingReducer = (state: IInitailState = InitailState, action: any) => {
    let newState;
    switch (action.type) {
        case ParkingAction.GET_PARKING_LOCATION:
            return Object.assign({}, state, { isLoading: true });
        case ParkingAction.GET_PARKING_LOCATION_SUCCESS:
            newState = state;
            newState.parkings[action.payload['$key']] = action.payload;
            newState.isLoading = false;
            return Object.assign({}, state, newState)
        case ParkingAction.GET_PARKING_LOCATION_FAIL:
            return Object.assign({}, state, { isLoading: false })

        case ParkingAction.GET_PARKING_DETAILS_BY_USER:
            return Object.assign({}, state, { isLoading: true });
        case ParkingAction.GET_PARKING_DETAILS_BY_USER_SUCCESS:
            newState = state;
            newState['post-detail'] = action.payload;
            newState.isLoading = false;
            return Object.assign({}, state, newState)
        case ParkingAction.GET_PARKING_DETAILS_BY_USER_FAIL:
            return Object.assign({}, state, { isLoading: false })

        case ParkingAction.GET_ONE_PARKING_DATA:
            return Object.assign({}, state, { isLoading: true });
        case ParkingAction.GET_ONE_PARKING_DATA_SUCCESS:
            newState = state;
            newState['temp'] = action.payload;
            newState.isLoading = false;
            return Object.assign({}, state, newState)
        case ParkingAction.GET_ONE_PARKING_DATA_FAIL:
            return Object.assign({}, state, { isLoading: false })

        case ParkingAction.GET_PARKING_LOCATION_AVAILABLITY:
            return Object.assign({}, state, { isLoading: true });
        case ParkingAction.GET_PARKING_LOCATION_AVAILABLITY_SUCCESS:
            newState = state;
            newState['avail'] = action.payload;
            newState.isLoading = false;
            return Object.assign({}, state, newState)
        case ParkingAction.GET_PARKING_LOCATION_AVAILABLITY_FAIL:
            return Object.assign({}, state, { isLoading: false })
        default:
            return state;
    }
}