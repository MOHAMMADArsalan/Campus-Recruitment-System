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
var angularfire2_1 = require('angularfire2');
var AuthActions = (function () {
    function AuthActions(ngRedux, af) {
        this.ngRedux = ngRedux;
        this.af = af;
        this.ngRedux.dispatch({
            type: AuthActions.ISLOGGEDIN
        });
    }
    AuthActions.prototype.register = function (user) {
        this.ngRedux.dispatch({
            type: AuthActions.SIGN_UP,
            payload: user
        });
    };
    AuthActions.prototype.login = function (credentials) {
        this.ngRedux.dispatch({
            type: AuthActions.LOGIN,
            payload: credentials
        });
    };
    AuthActions.prototype.isLoggedIn = function () {
        this.ngRedux.dispatch({
            type: AuthActions.ISLOGGEDIN
        });
    };
    AuthActions.prototype.logout = function () {
        this.ngRedux.dispatch({
            type: AuthActions.LOGOUT
        });
    };
    AuthActions.REGISTER = 'REGISTER';
    AuthActions.ISLOGGEDIN = 'ISLOGGEDIN';
    AuthActions.LOGIN = 'LOGIN';
    AuthActions.LOGIN_SUCCESS = 'LOGIN_SUCCESS';
    AuthActions.LOGIN_FAIL = 'LOGIN_FAIL';
    AuthActions.SIGN_UP = 'SIGN_UP';
    AuthActions.SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
    AuthActions.SIGN_UP_FAIL = 'SIGN_UP_FAIL';
    AuthActions.LOGOUT = 'LOGOUT';
    AuthActions.LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
    AuthActions.LOGOUT_FAIL = 'LOGOUT_FAIL';
    AuthActions.GET_USER_INFO = 'GET_USER_INFO';
    AuthActions.GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
    AuthActions.GET_USER_INFO_FAIL = 'GET_USER_INFO_FAIL';
    AuthActions.NULL = 'NULL';
    AuthActions = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ng2_redux_1.NgRedux, angularfire2_1.AngularFire])
    ], AuthActions);
    return AuthActions;
}());
exports.AuthActions = AuthActions;
