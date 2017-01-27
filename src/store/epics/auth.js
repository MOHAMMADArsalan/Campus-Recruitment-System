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
var rxjs_1 = require('rxjs');
var angularfire2_1 = require('angularfire2');
var actions_1 = require('../actions');
var providers_1 = require("./../../providers");
var AuthEpics = (function () {
    function AuthEpics(af, fb) {
        var _this = this;
        this.af = af;
        this.fb = fb;
        this.register = function (action$) {
            return action$.ofType(actions_1.AuthActions.SIGN_UP)
                .switchMap(function (_a) {
                var payload = _a.payload;
                return _this.af.auth.createUser({ email: payload.email, password: payload.password }).then(function (response) {
                    var multipath = {};
                    if (payload.type === 2) {
                        delete payload['password'];
                        multipath[("companies/" + response.uid)] = payload;
                        multipath[("users/" + response.uid)] = payload;
                        return _this.fb.saveMultipath(multipath).then(function () {
                            return {
                                type: actions_1.AuthActions.SIGN_UP_SUCCESS,
                                payload: response
                            };
                        }, function (err) {
                            return {
                                type: actions_1.AuthActions.SIGN_UP_FAIL,
                                payload: { isError: { status: false, msg: err.message } }
                            };
                        });
                    }
                    else {
                        var users = _this.af.database.object("users/" + response.uid);
                        delete payload['password'];
                        return users.set(payload).then(function () {
                            return {
                                type: actions_1.AuthActions.SIGN_UP_SUCCESS,
                                payload: response
                            };
                        }, function (err) {
                            return {
                                type: actions_1.AuthActions.SIGN_UP_FAIL,
                                payload: { isError: { status: false, msg: err.message } }
                            };
                        });
                    }
                }, function (err) {
                    return {
                        type: actions_1.AuthActions.SIGN_UP_FAIL,
                        payload: { isError: { status: false, msg: err.message } }
                    };
                });
            });
        };
        this.login = function (action$) {
            return action$.ofType(actions_1.AuthActions.LOGIN)
                .switchMap(function (_a) {
                var payload = _a.payload;
                return _this.af.auth.login({ email: payload.email, password: payload.password }, { provider: angularfire2_1.AuthProviders.Password, method: angularfire2_1.AuthMethods.Password }).then(function (auth) {
                    _this.setLocalStorage(auth);
                    return {
                        type: actions_1.AuthActions.GET_USER_INFO,
                        payload: auth
                    };
                }, function (err) {
                    return {
                        type: actions_1.AuthActions.LOGIN_FAIL,
                        payload: {}
                    };
                });
            });
        };
        this.getUserInfo = function (action$) {
            return action$.ofType(actions_1.AuthActions.GET_USER_INFO)
                .switchMap(function (_a) {
                var payload = _a.payload;
                return _this.af.database.object("/users/" + payload.uid)
                    .map(function (user) {
                    if (user) {
                        return {
                            type: actions_1.AuthActions.GET_USER_INFO_SUCCESS,
                            payload: Object.assign({}, payload, user)
                        };
                    }
                    else {
                        return rxjs_1.Observable.of({
                            type: actions_1.AuthActions.GET_USER_INFO_FAIL,
                            payload: {}
                        });
                    }
                });
            });
        };
        this.logout = function (action$) {
            return action$.ofType(actions_1.AuthActions.LOGOUT)
                .switchMap(function () {
                _this.af.auth.logout();
                _this.clearLocalStorage();
                return rxjs_1.Observable.of({
                    type: actions_1.AuthActions.LOGOUT_SUCCESS
                });
            });
        };
        this.isLoggedIn = function (action$) {
            return action$.ofType(actions_1.AuthActions.ISLOGGEDIN)
                .switchMap(function () {
                if (_this.getLocalStorage()) {
                    console.log('auth exists: ');
                    return rxjs_1.Observable.of({
                        type: actions_1.AuthActions.GET_USER_INFO,
                        payload: _this.getLocalStorage()
                    });
                }
                else {
                    console.log('auth not exists');
                    return rxjs_1.Observable.of({
                        type: actions_1.AuthActions.LOGIN_FAIL
                    });
                }
            });
        };
    }
    // getCurrentUserData = (action$) =>
    //   action$.ofType(AuthActions.LOGIN_SUCCESS)
    //     .switchMap(({payload}) => this.af.database.object(`users/${payload.userID}`)
    //       .catch(err => {
    //         console.log('users/ err ', err);
    //         return Observable.of(null)
    //       })
    //       .switchMap((user) => {
    //         if (user) {
    //           // console.log("Login", user);     
    //           return Observable.of({
    //             type: AuthActions.SETCURRENTUSERDATA,
    //             payload: user
    //           });
    //         } else {
    //           return Observable.of({
    //             type: AuthActions.NULL
    //           });
    //         }
    //       }));
    // UseCheckedIn = (action$) =>
    //   action$.ofType(AuthActions.LOGIN_SUCCESS)
    //     .switchMap(({payload}) => {
    //       return this.af.database.object(`subgroup-check-in-current-by-user/${payload.userID}`)
    //         .catch(err => {
    //           return Observable.of(null)
    //         })
    //         .map((checkedInObject) => {
    //           if (checkedInObject && checkedInObject.type == 1) {
    //             return {
    //               type: AuthActions.USERCHECKEDIN_SUCCESS,
    //               payload: checkedInObject
    //             };
    //           } else {
    //             return {
    //               type: AuthActions.USERCHECKEDIN_FAIL
    //             };
    //           }
    //         })
    //     }); firebase
    // UserOnline = (action$) =>
    //   action$.ofType(AuthActions.LOGIN_SUCCESS)
    //     .switchMap(() => this.af.database.object('.info/connected')
    //       .catch(err => {
    //         return Observable.of(null)
    //       })
    //       .switchMap((snapshot) => {
    //         let pushKey = null;
    //         if (snapshot && snapshot['$value'] == true && snapshot['$key'] == 'connected') {
    //           let userID = this.getLocalStorage().userID;
    //           // is online
    //           this.af.database.list('users-presence/' + this.getLocalStorage().userID + '/connections').push({})
    //             .then((item) => {
    //               pushKey = item.key;
    //               // console.log('key: ', pushKey);
    //               // update/add user-presence object
    //               let multipath = {}
    //               multipath[userID + "/last-modified"] = firebase.database['ServerValue'].TIMESTAMP;
    //               multipath[userID + "/defined-status"] = 1;
    //               multipath[userID + "/connections/" + item.key + "/type"] = 1;
    //               multipath[userID + "/connections/" + item.key + "/started"] = firebase.database['ServerValue'].TIMESTAMP;
    //               multipath[userID + "/connections/" + item.key + "/machineTitle"] = 'web';
    //               firebase.database().ref('/').child('users-presence').update(multipath);
    //               firebase.database().ref('/').child('users-presence/' + userID).onDisconnect().update({
    //                 'last-modified': firebase.database['ServerValue'].TIMESTAMP,
    //                 'defined-status': 0
    //               });
    //               firebase.database().ref('/').child('users-presence/' + userID + '/connections/' + item.key).onDisconnect().remove();
    //             }); // persence.push
    //           return Observable.of({
    //             type: AuthActions.USERONLINE_SUCCESS
    //           });
    //         } else {
    //           return Observable.of({
    //             type: AuthActions.USERONLINE_FAIL
    //           });
    //         }
    //       }));
    AuthEpics.prototype.setLocalStorage = function (userObj) {
        localStorage.setItem('campus-recruitment-system', JSON.stringify(userObj));
    };
    AuthEpics.prototype.clearLocalStorage = function () {
        localStorage.removeItem('campus-recruitment-system');
    };
    AuthEpics.prototype.getLocalStorage = function () {
        return JSON.parse(localStorage.getItem('campus-recruitment-system'));
    };
    AuthEpics = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire, providers_1.FirebaseService])
    ], AuthEpics);
    return AuthEpics;
}());
exports.AuthEpics = AuthEpics;
