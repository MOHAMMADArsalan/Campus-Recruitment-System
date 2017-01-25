import { Injectable } from "@angular/core";
import { StudentAction } from "./../actions";
import { AngularFire } from "angularfire2";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
@Injectable()

export class StudentEpics {
    constructor(private af: AngularFire) { }

    getStudents = (action$: ActionsObservable<any>) =>
        action$.ofType(StudentAction.GET_STUDENTS)
            .switchMap(() => {
                return this.af.database.list("/users")
                    .mergeMap((users) => {
                        if (users) {
                            return users.map((_users) => {
                                delete _users['$exists']
                                if (_users.type === 3) {
                                    return ({
                                        type: StudentAction.GET_STUDENTS_SUCCESS,
                                        payload: _users
                                    })
                                } else {
                                    return ({
                                        type: StudentAction.NULL
                                    })
                                }
                            })
                        } else {
                            return Observable.of({
                                type: StudentAction.GET_STUDENTS_FAIL,
                                payload: {}
                            })
                        }
                    })
            })
}