import { Injectable } from "@angular/core";
import { NgRedux } from "ng2-redux";
import { IAppState } from "./../"
import { AngularFire } from "angularfire2";

@Injectable()

export class StudentAction {

    static GET_STUDENTS: string = 'GET_STUDENTS';
    static GET_STUDENTS_SUCCESS: string = 'GET_STUDENTS_SUCCESS';
    static GET_STUDENTS_FAIL: string = 'GET_STUDENTS_FAIL';

    static UPDATE_STUDENTS: string = 'UPDATE_STUDENTS';
    static UPDATE_STUDENTS_SUCCESS: string = 'UPDATE_STUDENTS_SUCCESS';
    static UPDATE_STUDENTS_FAIL: string = 'UPDATE_STUDENTS_FAIL';

    static NULL: string = 'NULL'
    constructor(private ngRedux: NgRedux<IAppState>, private af: AngularFire) { }
    getStudentsList() {
        this.ngRedux.dispatch({
            type: StudentAction.GET_STUDENTS
        })
    }

}