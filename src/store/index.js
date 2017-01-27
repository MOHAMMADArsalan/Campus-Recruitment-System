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
var core_1 = require('@angular/core');
var ng2_redux_1 = require('ng2-redux');
var redux_observable_1 = require('redux-observable');
var redux_1 = require('redux');
// Reducers
var reducers_1 = require('./reducers');
// Actions
var actions_1 = require('./actions');
var actions_2 = require('./actions');
exports.AuthActions = actions_2.AuthActions;
exports.CompanyAction = actions_2.CompanyAction;
exports.StudentAction = actions_2.StudentAction;
var providers_1 = require('../providers');
var epics_1 = require('./epics');
var rxjs_1 = require('rxjs');
exports.Observable = rxjs_1.Observable;
var ng2_redux_2 = require('ng2-redux');
exports.select = ng2_redux_2.select;
exports.NgRedux = ng2_redux_2.NgRedux;
var redux_2 = require('redux');
exports.bindActionCreators = redux_2.bindActionCreators;
exports.AppReducer = redux_1.combineReducers({
    auth: reducers_1.authReducer,
    company: reducers_1.companyReducer,
    student: reducers_1.studentReducer
});
var StoreModule = (function () {
    function StoreModule(ngRedux, devTool, ae, ce, se) {
        this.ngRedux = ngRedux;
        this.devTool = devTool;
        this.ae = ae;
        this.ce = ce;
        this.se = se;
        var middleware = [
            redux_observable_1.createEpicMiddleware(this.ae.register),
            redux_observable_1.createEpicMiddleware(this.ae.login),
            redux_observable_1.createEpicMiddleware(this.ce.getCompanies),
            redux_observable_1.createEpicMiddleware(this.se.getStudents),
            redux_observable_1.createEpicMiddleware(this.ae.isLoggedIn),
            redux_observable_1.createEpicMiddleware(this.ae.getUserInfo),
            redux_observable_1.createEpicMiddleware(this.ae.logout),
            redux_observable_1.createEpicMiddleware(this.ce.getCompanyPost),
            redux_observable_1.createEpicMiddleware(this.ce.getPosts),
            redux_observable_1.createEpicMiddleware(this.ce.getOneCompanyPost)
        ];
        this.ngRedux.configureStore(exports.AppReducer, // Main Reducer
        {}, // Defailt State
        middleware, // Middlewares
        [devTool.isEnabled() ? devTool.enhancer() : function (f) { return f; }] // Enhancers
        );
    }
    StoreModule = __decorate([
        core_1.NgModule({
            providers: [
                // actions
                actions_1.AuthActions,
                actions_1.CompanyAction,
                actions_1.StudentAction,
                epics_1.AuthEpics,
                epics_1.CompanyEpics,
                epics_1.StudentEpics,
                providers_1.HttpService
            ]
        }), 
        __metadata('design:paramtypes', [ng2_redux_1.NgRedux, ng2_redux_1.DevToolsExtension, epics_1.AuthEpics, epics_1.CompanyEpics, epics_1.StudentEpics])
    ], StoreModule);
    return StoreModule;
}());
exports.StoreModule = StoreModule;
