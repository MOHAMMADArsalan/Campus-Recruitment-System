import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

import "rxjs/add/operator/take";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router, private af: AngularFire) { }

    canActivate() {
        if (localStorage.getItem("campus-recruitment-system")) {
            return true;
        } else {
            this.router.navigate(['/signin']);
            return false;
        }
        // return this.af.auth.take(1).map(authState => {
        //     if (authState) {
        //         console.log('authGuard: authenticated');
        //     } else {
        //         console.log('authGuard: not authenticated');
        //         return false;
        //     }
        // });
    }
}