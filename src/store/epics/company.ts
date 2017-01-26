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
                            return Observable.of({
                                type: CompanyAction.GET_COMPANY_SUCCESS,
                                payload: company
                            })
                            // return company.map((_company) => {
                            //     delete _company['$exists']

                            // })
                        } else {
                            return Observable.of({
                                type: CompanyAction.GET_COMPANY_FAIL,
                                payload: {}
                            })
                        }
                    })
            })
    getCompanyPost = (action$: ActionsObservable<any>) =>
        action$.ofType(CompanyAction.GET_POST_BY_COMPANY)
            .switchMap(({payload}) => {
                return this.af.database.list(`/company-posts/${payload.uid}`)
                    .mergeMap((posts) => {
                        if (posts) {
                            return Observable.of({
                                type: CompanyAction.GET_POST_BY_COMPANY_SUCCESS,
                                payload: posts
                            })
                        } else {
                            return Observable.of({
                                type: CompanyAction.GET_POST_BY_COMPANY_FAIL,
                                payload: []
                            })
                        }
                    })

            })
    getOneCompanyPost = (action$: ActionsObservable<any>) =>
        action$.ofType(CompanyAction.GET_ONE_POST_BY_COMPANY)
            .switchMap(({payload}) => {
                return this.af.database.object(`/company-posts/${payload.coId}/${payload.key}`)
                    .mergeMap((posts) => {
                        console.log("getOneCompanyPost", posts)
                        if (posts) {
                            return Observable.of({
                                type: CompanyAction.GET_ONE_POST_BY_COMPANY_SUCCESS,
                                payload: posts
                            })
                        } else {
                            return Observable.of({
                                type: CompanyAction.GET_ONE_POST_BY_COMPANY_FAIL,
                                payload: []
                            })
                        }
                    })
            })
    getPosts = (action$: ActionsObservable<any>) =>
        action$.ofType(CompanyAction.GET_POST)
            .switchMap(() => {
                return this.af.database.list("/posts")
                    .mergeMap((posts) => {
                        if (posts) {
                            return Observable.of({
                                type: CompanyAction.GET_POST_SUCCESS,
                                payload: posts
                            })
                            // return company.map((_company) => {
                            //     delete _company['$exists']

                            // })
                        } else {
                            return Observable.of({
                                type: CompanyAction.GET_POST_FAIL,
                                payload: []
                            })
                        }
                    })
            })
}