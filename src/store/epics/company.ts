import { Injectable } from "@angular/core";
import { CompanyAction } from "./../actions";
import { AngularFire } from "angularfire2";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
@Injectable()

export class CompanyEpics {
    constructor(private af: AngularFire) { }

    getCompanies = (action$: ActionsObservable<any>) =>
        action$.ofType(CompanyAction.GET_COMPANY)
            .switchMap(() => {
                return this.af.database.list("/companies")
                    .mergeMap((company) => {
                        if (company) {
                            return company.map((_company) => {
                                delete _company['$exists']
                                return ({
                                    type: CompanyAction.GET_COMPANY_SUCCESS,
                                    payload: _company
                                })
                            })
                        } else {
                            return Observable.of({
                                type: CompanyAction.GET_COMPANY_FAIL,
                                payload: {}
                            })
                        }
                    })
            })

}