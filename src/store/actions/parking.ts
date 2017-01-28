import { Injectable } from "@angular/core";
import { NgRedux } from "ng2-redux";
import { IAppState } from "./../"
import { AngularFire } from "angularfire2";

@Injectable()

export class ParkingAction {
    static GET_PARKING_LOCATION: string = 'GET_PARKING_LOCATION';
    static GET_PARKING_LOCATION_SUCCESS: string = 'GET_PARKING_LOCATION_SUCCESS';
    static GET_PARKING_LOCATION_FAIL: string = 'GET_PARKING_LOCATION_FAIL';

    static GET_PARKING_DETAILS_BY_USER: string = 'GET_PARKING_DETAILS_BY_USER';
    static GET_PARKING_DETAILS_BY_USER_SUCCESS: string = 'GET_PARKING_DETAILS_BY_USER_SUCCESS';
    static GET_PARKING_DETAILS_BY_USER_FAIL: string = 'GET_PARKING_DETAILS_BY_USER_FAIL';

    static GET_ONE_PARKING_DATA: string = 'GET_ONE_PARKING_DATA';
    static GET_ONE_PARKING_DATA_SUCCESS: string = 'GET_ONE_PARKING_DATA_SUCCESS';
    static GET_ONE_PARKING_DATA_FAIL: string = 'GET_ONE_PARKING_DATA_FAIL';

    static GET_PARKING_LOCATION_AVAILABLITY: string = 'GET_PARKING_LOCATION_AVAILABLITY';
    static GET_PARKING_LOCATION_AVAILABLITY_SUCCESS: string = 'GET_PARKING_LOCATION_AVAILABLITY_SUCCESS';
    static GET_PARKING_LOCATION_AVAILABLITY_FAIL: string = 'GET_PARKING_LOCATION_AVAILABLITY_FAIL';

    constructor(private ngRedux: NgRedux<IAppState>, private af: AngularFire) { }
    getParking() {
        this.ngRedux.dispatch({
            type: ParkingAction.GET_PARKING_LOCATION
        })
    }
    getParkingDetailByUser(uid: string) {
        this.ngRedux.dispatch({
            type: ParkingAction.GET_PARKING_DETAILS_BY_USER,
            payload: { uid }
        })
    }
    getOneParkingData(locationId: string, slotId: string) {
        this.ngRedux.dispatch({
            type: ParkingAction.GET_ONE_PARKING_DATA,
            payload: { locationId, slotId }
        })
    }
    getParkingAvailablity(locationId: string, slotId: string, date: string) {
        this.ngRedux.dispatch({
            type: ParkingAction.GET_PARKING_LOCATION_AVAILABLITY,
            payload: { locationId, slotId, date }
        })
    }
}

