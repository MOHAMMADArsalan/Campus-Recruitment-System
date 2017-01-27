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
var StudentEpics = (function () {
    function StudentEpics(af) {
        var _this = this;
        this.af = af;
        this.getStudents = function (action$) {
            return action$.ofType(actions_1.StudentAction.GET_STUDENTS)
                .switchMap(function () {
                return _this.af.database.list("/users", {
                    query: { orderByChild: 'type', equalTo: 3 }
                }).mergeMap(function (users) {
                    if (users) {
                        return rxjs_1.Observable.of({
                            type: actions_1.StudentAction.GET_STUDENTS_SUCCESS,
                            payload: users
                        });
                    }
                    else {
                        return rxjs_1.Observable.of({
                            type: actions_1.StudentAction.GET_STUDENTS_FAIL,
                            payload: []
                        });
                    }
                });
            });
        };
    }
    StudentEpics = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire])
    ], StudentEpics);
    return StudentEpics;
}());
exports.StudentEpics = StudentEpics;
