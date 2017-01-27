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
var StudentAction = (function () {
    function StudentAction(ngRedux, af) {
        this.ngRedux = ngRedux;
        this.af = af;
    }
    StudentAction.prototype.getStudentsList = function () {
        this.ngRedux.dispatch({
            type: StudentAction.GET_STUDENTS
        });
    };
    StudentAction.GET_STUDENTS = 'GET_STUDENTS';
    StudentAction.GET_STUDENTS_SUCCESS = 'GET_STUDENTS_SUCCESS';
    StudentAction.GET_STUDENTS_FAIL = 'GET_STUDENTS_FAIL';
    StudentAction.UPDATE_STUDENTS = 'UPDATE_STUDENTS';
    StudentAction.UPDATE_STUDENTS_SUCCESS = 'UPDATE_STUDENTS_SUCCESS';
    StudentAction.UPDATE_STUDENTS_FAIL = 'UPDATE_STUDENTS_FAIL';
    StudentAction.NULL = 'NULL';
    StudentAction = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ng2_redux_1.NgRedux, angularfire2_1.AngularFire])
    ], StudentAction);
    return StudentAction;
}());
exports.StudentAction = StudentAction;
