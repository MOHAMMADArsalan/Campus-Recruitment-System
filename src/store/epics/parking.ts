import { Injectable } from "@angular/core";
import { ParkingAction } from "./../actions";
import { AngularFire } from "angularfire2";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
@Injectable()

export class ParkingEpics {
    constructor(private af: AngularFire) { }

    getParkingLocation = (action$: ActionsObservable<any>) =>
        action$.ofType(ParkingAction.GET_PARKING_LOCATION)
            .switchMap(() => {
                return this.af.database.list("/parking-location")
                    .mergeMap((location) => {
                        if (location) {
                            return location.map((locationArray) => {
                                return {
                                    type: ParkingAction.GET_PARKING_LOCATION_SUCCESS,
                                    payload: locationArray
                                }
                            })
                        } else {
                            return Observable.of({
                                type: ParkingAction.GET_PARKING_LOCATION_FAIL,
                                payload: []
                            })
                        }
                    })
            })

    getParkingDetailByUser = (action$: ActionsObservable<any>) =>
        action$.ofType(ParkingAction.GET_PARKING_DETAILS_BY_USER)
            .switchMap(({payload}) => {
                return this.af.database.list(`/user-parking/${payload.uid}`)
                    .mergeMap((details) => {
                        if (details) {
                            return Observable.of({
                                type: ParkingAction.GET_PARKING_DETAILS_BY_USER_SUCCESS,
                                payload: details
                            })
                            // return location.map((locationArray) => {
                            // })
                        } else {
                            return Observable.of({
                                type: ParkingAction.GET_PARKING_DETAILS_BY_USER_FAIL,
                                payload: []
                            })
                        }
                    })
            })
    getParkingAvailablity = (action$: ActionsObservable<any>) =>
        action$.ofType(ParkingAction.GET_PARKING_LOCATION_AVAILABLITY)
            .switchMap(({payload}) => {
                let availablityArray = [];
                return this.af.database.list(`/parking-availablity/${payload.locationId}/${payload.slotId}/${payload.date}`)
                    .mergeMap((details) => {
                        if (details) {
                            console.log("GET_PARKING_LOCATION_AVAILABLITY: ", details)
                            details.map((detail) => {
                                // if (detail['$key']) {
                                delete detail['$key'];
                                detail.map((a) => {
                                    availablityArray.push(a);
                                })
                            })
                            return Observable.of({
                                type: ParkingAction.GET_PARKING_LOCATION_AVAILABLITY_SUCCESS,
                                payload: availablityArray
                            })
                            // return location.map((locationArray) => {
                            // })
                        } else {
                            return Observable.of({
                                type: ParkingAction.GET_PARKING_LOCATION_AVAILABLITY_FAIL,
                                payload: []
                            })
                        }
                    })
            })
    getOneParkingData = (action$: ActionsObservable<any>) =>
        action$.ofType(ParkingAction.GET_ONE_PARKING_DATA)
            .switchMap(({payload}) => {
                return this.af.database.object(`/parking-location/${payload.locationId}/${payload.slotId}`)
                    .map((slot) => {
                        if (slot) {
                            return {
                                type: ParkingAction.GET_ONE_PARKING_DATA_SUCCESS,
                                payload: slot
                            }
                        } else {
                            return Observable.of({
                                type: ParkingAction.GET_ONE_PARKING_DATA_FAIL,
                                payload: {}
                            })
                        }
                    })
            })
}