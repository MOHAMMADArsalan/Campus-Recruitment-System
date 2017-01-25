import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
export class RegisterContainer {
    signupForm: FormGroup;
    isError: string = "";
    registerSubscribe: any;
    isCompanyRoute: boolean = false;
    @Output() register: EventEmitter<any>;

    constructor(private router: Router, private fb: FormBuilder, private ae: AuthActions) {
        this.register = new EventEmitter();
        if (this.router.url == '/addcompany') {
            this.isCompanyRoute = true;
            this.signupForm = this.fb.group({
                name: [null, Validators.required],
                address: [null, Validators.required],
                email: [null, Validators.compose([ValidateEmail, Validators.required])],
                password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
            })
        } else {
            this.signupForm = this.fb.group({
                name: [null, Validators.required],
                firstname: [null, Validators.required],
                lastname: [null, Validators.required],
                email: [null, Validators.compose([ValidateEmail, Validators.required])],
                password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
            })
        }
    }
    add(form: any) {
        if (form.valid) {
            form.value['type'] = this.isCompanyRoute ? 2 : 3;
            this.register.emit(form.value)
            // this.ae.register(form.value)
        }
    }
}
