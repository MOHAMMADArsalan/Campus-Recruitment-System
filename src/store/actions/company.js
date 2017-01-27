"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ng2_redux_1 = require("ng2-redux");
var angularfire2_1 = require("angularfire2");
var CompanyAction = (function () {
    function CompanyAction(ngRedux, af) {
        this.ngRedux = ngRedux;
        this.af = af;
    }
    CompanyAction.prototype.getCompany = function () {
        this.ngRedux.dispatch({
            type: CompanyAction.GET_COMPANY
        });
    };
    CompanyAction.prototype.getPostByCompany = function (uid) {
        this.ngRedux.dispatch({
            type: CompanyAction.GET_POST_BY_COMPANY,
            payload: { uid: uid }
        });
    };
    CompanyAction.prototype.getPosts = function () {
        this.ngRedux.dispatch({
            type: CompanyAction.GET_POST
        });
    };
    CompanyAction.prototype.getOnePostByCompany = function (coId, key) {
        this.ngRedux.dispatch({
            type: CompanyAction.GET_ONE_POST_BY_COMPANY,
            payload: { coId: coId, key: key }
        });
    };
    CompanyAction.GET_COMPANY = 'GET_COMPANY';
    CompanyAction.GET_COMPANY_SUCCESS = 'GET_COMPANY_SUCCESS';
    CompanyAction.GET_COMPANY_FAIL = 'GET_COMPANY_FAIL';
    CompanyAction.UPDATE_COMPANY = 'UPDATE_COMPANY';
    CompanyAction.UPDATE_COMPANY_SUCCESS = 'UPDATE_COMPANY_SUCCESS';
    CompanyAction.UPDATE_COMPANY_FAIL = 'UPDATE_COMPANY_FAIL';
    CompanyAction.GET_POST = 'GET_POST';
    CompanyAction.GET_POST_SUCCESS = 'GET_POST_SUCCESS';
    CompanyAction.GET_POST_FAIL = 'GET_POST_FAIL';
    CompanyAction.GET_POST_BY_COMPANY = 'GET_POST_BY_COMPANY';
    CompanyAction.GET_POST_BY_COMPANY_SUCCESS = 'GET_POST_BY_COMPANY_SUCCESS';
    CompanyAction.GET_POST_BY_COMPANY_FAIL = 'GET_POST_BY_COMPANY_FAIL';
    CompanyAction.GET_ONE_POST_BY_COMPANY = 'GET_ONE_POST_BY_COMPANY';
    CompanyAction.GET_ONE_POST_BY_COMPANY_SUCCESS = 'GET_ONE_POST_BY_COMPANY_SUCCESS';
    CompanyAction.GET_ONE_POST_BY_COMPANY_FAIL = 'GET_ONE_POST_BY_COMPANY_FAIL';
    CompanyAction = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ng2_redux_1.NgRedux, angularfire2_1.AngularFire])
    ], CompanyAction);
    return CompanyAction;
}());
exports.CompanyAction = CompanyAction;
