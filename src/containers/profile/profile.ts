import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { select, Observable, AuthActions } from "./../../store";
import { FirebaseService } from "./../../providers"
@Component({
    selector: 'profile',
    template: require('./profile.html'),
    styles: [require("./../signin/signin.scss"), require("./../signup/signup.scss"), require("./profile.scss")]
})
export class ProfileContainer implements OnInit {
    loginForm: FormGroup;
    @select(['auth', 'user']) user$: Observable<any>;
    constructor(private fb: FirebaseService, private router: Router, private aa: AuthActions) {

    }

    ngOnInit() { }
    saveMultipathHandler(multipathObj:any) {
        console.log("$444444444444444444444444444",multipathObj)
        this.fb.saveMultipath(multipathObj).then(() => {

        }, (err) => {
            console.log("Error: ", err)
        })
    }

}
