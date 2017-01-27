import { Component, OnDestroy } from "@angular/core";
import { select, Observable, AuthActions } from "./../../store";
import { Router } from "@angular/router";
@Component({
    template: require("./addparking.html"),
    styles: [require("./addparking.scss")]
})

export class AddParkingContainer implements OnDestroy {
    registerSubscribe: any;
    errorSubscribe: any;
    @select(['auth', 'user']) user$: Observable<any>;
    @select(['auth', 'isRegistered']) isRegistered$: Observable<any>;
    constructor(private aa: AuthActions, private router: Router) {
        this.registerSubscribe = this.isRegistered$.subscribe((result) => {
            if (result) {
                // this.aa.makeRegisterFalse();
                this.router.navigate(['/dashboard']);
            }
        });
    }
    ngOnDestroy() {
        this.registerSubscribe.unsubscribe();
    }
    addCompany(company: any) {
        this.aa.register(company)
    }
}