import { Injectable } from "@angular/core";
import { NgRedux } from "ng2-redux";
import { IAppState } from "./../"
import { AngularFire } from "angularfire2";

@Injectable()

export class UserAction {

    static GET_USER_FEEDBACK: string = 'GET_USER_FEEDBACK';
    static GET_USER_FEEDBACK_SUCCESS: string = 'GET_USER_FEEDBACK_SUCCESS';
    static GET_USER_FEEDBACK_FAIL: string = 'GET_USER_FEEDBACK_FAIL';
    static NULL: string = 'NULL'
    constructor(private ngRedux: NgRedux<IAppState>, private af: AngularFire) { }
    getFeedbacks() {
        this.ngRedux.dispatch({
            type: UserAction.GET_USER_FEEDBACK
        })
    }

}