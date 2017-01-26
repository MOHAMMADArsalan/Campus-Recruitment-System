import { Injectable } from "@angular/core";
import { NgRedux } from "ng2-redux";
import { IAppState } from "./../"
import { AngularFire } from "angularfire2";

@Injectable()

export class CompanyAction {
    static GET_COMPANY: string = 'GET_COMPANY';
    static GET_COMPANY_SUCCESS: string = 'GET_COMPANY_SUCCESS';
    static GET_COMPANY_FAIL: string = 'GET_COMPANY_FAIL';

    static UPDATE_COMPANY: string = 'UPDATE_COMPANY';
    static UPDATE_COMPANY_SUCCESS: string = 'UPDATE_COMPANY_SUCCESS';
    static UPDATE_COMPANY_FAIL: string = 'UPDATE_COMPANY_FAIL';

    static GET_POST: string = 'GET_POST';
    static GET_POST_SUCCESS: string = 'GET_POST_SUCCESS';
    static GET_POST_FAIL: string = 'GET_POST_FAIL';

    static GET_POST_BY_COMPANY: string = 'GET_POST_BY_COMPANY';
    static GET_POST_BY_COMPANY_SUCCESS: string = 'GET_POST_BY_COMPANY_SUCCESS';
    static GET_POST_BY_COMPANY_FAIL: string = 'GET_POST_BY_COMPANY_FAIL';

    static GET_ONE_POST_BY_COMPANY: string = 'GET_ONE_POST_BY_COMPANY';
    static GET_ONE_POST_BY_COMPANY_SUCCESS: string = 'GET_ONE_POST_BY_COMPANY_SUCCESS';
    static GET_ONE_POST_BY_COMPANY_FAIL: string = 'GET_ONE_POST_BY_COMPANY_FAIL';
    constructor(private ngRedux: NgRedux<IAppState>, private af: AngularFire) { }
    getCompany() {
        this.ngRedux.dispatch({
            type: CompanyAction.GET_COMPANY
        })
    }
    getPostByCompany(uid: string) {
        this.ngRedux.dispatch({
            type: CompanyAction.GET_POST_BY_COMPANY,
            payload: { uid }
        })
    }
    getPosts() {
        this.ngRedux.dispatch({
            type: CompanyAction.GET_POST
        })
    }
    getOnePostByCompany(coId: string, key: string) {
        this.ngRedux.dispatch({
            type: CompanyAction.GET_ONE_POST_BY_COMPANY,
            payload: { coId, key }
        })
    }
}

