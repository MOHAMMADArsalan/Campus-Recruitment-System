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
var actions_1 = require("./../actions");
var angularfire2_1 = require("angularfire2");
var rxjs_1 = require("rxjs");
var CompanyEpics = (function () {
    function CompanyEpics(af) {
        var _this = this;
        this.af = af;
        this.getCompanies = function (action$) {
            return action$.ofType(actions_1.CompanyAction.GET_COMPANY)
                .switchMap(function () {
                return _this.af.database.list("/companies")
                    .mergeMap(function (company) {
                    if (company) {
                        return rxjs_1.Observable.of({
                            type: actions_1.CompanyAction.GET_COMPANY_SUCCESS,
                            payload: company
                        });
                    }
                    else {
                        return rxjs_1.Observable.of({
                            type: actions_1.CompanyAction.GET_COMPANY_FAIL,
                            payload: {}
                        });
                    }
                });
            });
        };
        this.getCompanyPost = function (action$) {
            return action$.ofType(actions_1.CompanyAction.GET_POST_BY_COMPANY)
                .switchMap(function (_a) {
                var payload = _a.payload;
                return _this.af.database.list("/company-posts/" + payload.uid)
                    .mergeMap(function (posts) {
                    if (posts) {
                        return rxjs_1.Observable.of({
                            type: actions_1.CompanyAction.GET_POST_BY_COMPANY_SUCCESS,
                            payload: posts
                        });
                    }
                    else {
                        return rxjs_1.Observable.of({
                            type: actions_1.CompanyAction.GET_POST_BY_COMPANY_FAIL,
                            payload: []
                        });
                    }
                });
            });
        };
        this.getOneCompanyPost = function (action$) {
            return action$.ofType(actions_1.CompanyAction.GET_ONE_POST_BY_COMPANY)
                .switchMap(function (_a) {
                var payload = _a.payload;
                return _this.af.database.object("/company-posts/" + payload.coId + "/" + payload.key)
                    .mergeMap(function (posts) {
                    if (posts) {
                        return rxjs_1.Observable.of({
                            type: actions_1.CompanyAction.GET_ONE_POST_BY_COMPANY_SUCCESS,
                            payload: posts
                        });
                    }
                    else {
                        return rxjs_1.Observable.of({
                            type: actions_1.CompanyAction.GET_ONE_POST_BY_COMPANY_FAIL,
                            payload: []
                        });
                    }
                });
            });
        };
        this.getPosts = function (action$) {
            return action$.ofType(actions_1.CompanyAction.GET_POST)
                .switchMap(function () {
                return _this.af.database.list("/posts")
                    .mergeMap(function (posts) {
                    if (posts) {
                        return rxjs_1.Observable.of({
                            type: actions_1.CompanyAction.GET_POST_SUCCESS,
                            payload: posts
                        });
                    }
                    else {
                        return rxjs_1.Observable.of({
                            type: actions_1.CompanyAction.GET_POST_FAIL,
                            payload: []
                        });
                    }
                });
            });
        };
    }
    CompanyEpics = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire])
    ], CompanyEpics);
    return CompanyEpics;
}());
exports.CompanyEpics = CompanyEpics;
