import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable, select, AuthActions } from '../../store';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidateEmail } from "./../../customValidators/customEmailValidation";
@Component({
    selector: 'signup',
    template: require('./signup.html'),
    styles: [require("./signup.scss")]
})
export class SignupContainer {
    @select(['auth', 'isRegistered']) isRegistered$: Observable<boolean>;
    @select(['auth', 'isLoading']) isLoading$: Observable<boolean>;
    @select(['auth', 'isError']) isError$: Observable<any>;
    signupForm: FormGroup;
    isError: string = "";
    registerSubscribe: any;
    constructor(private router: Router, private fb: FormBuilder, private ae: AuthActions) {
        this.registerSubscribe = this.isRegistered$.subscribe((result) => {
            if (result) {
                // this.aa.makeRegisterFalse();
                this.router.navigate(['/signin']);
            }
        });

        this.isError$.subscribe((response) => {
            if (response.msg) {
                this.isError = response.msg;
            }
        })
        this.signupForm = this.fb.group({
            username: [null, Validators.required],
            email: [null, Validators.compose([ValidateEmail, Validators.required])],
            password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
        })
    }
    signup(form: any) {
        if (form.valid) {
            form.value['type'] = 3;
            this.ae.register(form.value)
        }
    }
}
