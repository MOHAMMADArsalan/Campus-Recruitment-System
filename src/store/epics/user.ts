import { Injectable } from "@angular/core";
import { UserAction } from "./../actions";
import { AngularFire } from "angularfire2";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
@Injectable()

export class UserEpics {
    constructor(private af: AngularFire) { }

    getFeedbacks = (action$: ActionsObservable<any>) =>
        action$.ofType(UserAction.GET_USER_FEEDBACK)
            .switchMap(() => {
                return this.af.database.list("/feedback").mergeMap((feedback) => {
                    if (feedback) {
                        return Observable.of({
                            type: UserAction.GET_USER_FEEDBACK_SUCCESS,
                            payload: feedback
                        })
                    } else {
                        return Observable.of({
                            type: UserAction.GET_USER_FEEDBACK_FAIL,
                            payload: []
                        })
                    }
                })
            })
}