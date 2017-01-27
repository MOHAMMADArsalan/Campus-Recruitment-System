import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable, select, AuthActions } from '../../store';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidateEmail } from "./../../customValidators/customEmailValidation";
@Component({
    selector: 'register',
    template: require('./register.component.html'),
    styles: [require("./register.component.scss")]
})
export class RegisterContainer implements OnChanges {
    signupForm: FormGroup;
    isError: string = "";
    registerSubscribe: any;
    isCompanyRoute: boolean = false;
    viewLoaded: boolean = false;
    @Input() isProfile: boolean;
    @Input() currentUser: any;
    @Output() register: EventEmitter<any>;
    @Output() saveMultipath: EventEmitter<any>;

    constructor(private router: Router, private fb: FormBuilder, private ae: AuthActions) {
        this.register = new EventEmitter();
        this.saveMultipath = new EventEmitter();
        this.signupForm = this.fb.group({
            name: [null, Validators.required],
            firstname: [null, Validators.required],
            lastname: [null, Validators.required],
            email: [null, Validators.compose([ValidateEmail, Validators.required])],
            password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
        })
    }
    ngOnChanges(changes) {
        // if (this.router.url == '/addcompany') {
        //     this.isCompanyRoute = true;
        //     this.signupForm = this.fb.group({
        //         name: [null, Validators.required],
        //         address: [null, Validators.required],
        //         email: [null, Validators.compose([ValidateEmail, Validators.required])],
        //         password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
        //     })
        // } else if (this.isProfile) {
        //     if (this.currentUser.type === 2) {
        //         this.signupForm = this.fb.group({
        //             name: [this.currentUser.name, Validators.required],
        //             address: [this.currentUser.address, Validators.required],
        //             email: [{ value: this.currentUser.email, disabled: true }]
        //         })
        //     } else if (this.currentUser.type === 3) {
        //         this.signupForm = this.fb.group({
        //             name: [this.currentUser.name, Validators.required],
        //             firstname: [this.currentUser.firstname, Validators.required],
        //             lastname: [this.currentUser.lastname, Validators.required],
        //             gpa: [this.currentUser.gpa, Validators.required],
        //             year: [this.currentUser.year, Validators.required],
        //             email: [{ value: this.currentUser.email, disabled: true }],
        //         })

        //     }
        // } else {

        // }
        // this.viewLoaded = true;
    }
    add(form: any) {
        event.preventDefault()
        if (form.valid) {
            let multipath = {}
            let obj = form.value;
            //     obj['type'] = this.currentUser.type;
            //     obj['email'] = this.currentUser.email;
            //     if (form.value.gpa && form.value.year) {
            //         obj['status'] = true;
            //     }
            //     if (this.currentUser.type == 2) {
            //         multipath[`companies/${this.currentUser.auth.uid}`] = obj;
            //     }
            //     this.saveMultipath.emit(multipath)
            // } else {
            //     if (this.isCompanyRoute) {
            //         form.value['type'] = 2;
            //     } else {
            //         form.value['type'] = 3;
            //         form.value['gpa'] = "";
            //         form.value['year'] = "";
            //         form.value['status'] = false;
            //     }
            obj['type'] = 2;
            this.register.emit(form.value)
            // this.ae.register(form.value)
        }
    }
}
