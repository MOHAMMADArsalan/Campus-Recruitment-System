import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, select, AuthActions } from '../../store';
@Component({
    selector: 'signup',
    template: require('./signup.html'),
    styles: [require("./signup.scss")]
})
export class SignupContainer {
    @select(['auth', 'isRegistered']) isRegistered$: Observable<boolean>;
    @select(['auth', 'isLoading']) isLoading$: Observable<boolean>;
    @select(['auth', 'isError']) isError$: Observable<any>;
    isError: string = "";
    registerSubscribe: any;
    errorSubscribe: any;

    constructor(private router: Router, private ae: AuthActions) {
        this.registerSubscribe = this.isRegistered$.subscribe((result) => {
            if (result) {
                // this.aa.makeRegisterFalse();
                this.router.navigate(['/signin']);
            }
        });

        this.errorSubscribe = this.isError$.subscribe((response) => {
            if (response.msg) {
                this.isError = response.msg;
            }
        })
    }
    ngOnDestroy() {
        this.registerSubscribe.unsubscribe();
        this.errorSubscribe.unsubscribe();
    }
    signup(form: any) {
        this.ae.register(form)
    }
}
