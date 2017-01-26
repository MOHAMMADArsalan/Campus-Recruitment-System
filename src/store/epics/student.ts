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
                return this.af.database.list("/users", {
                    query: { orderByChild: 'type', equalTo: 3 }
                }).mergeMap((users) => {
                        if (users) {
                            return Observable.of({
                                type: StudentAction.GET_STUDENTS_SUCCESS,
                                payload: users
                            })
                        } else {
                            return Observable.of({
                                type: StudentAction.GET_STUDENTS_FAIL,
                                payload: []
                            })
                        }
                    })
            })
}