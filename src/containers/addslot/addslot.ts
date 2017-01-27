import { Component, Input } from "@angular/core";
import { select, Observable, AuthActions } from "./../../store";
import { FirebaseService } from "./../../providers";
import { Router } from "@angular/router";

@Component({
    template: require("./addslot.html")
})
export class AddSlotContainer {
    @select(['auth', 'user']) user$: Observable<any>;
    @select(['parking', 'temp']) temp$: Observable<any>;
    
    @Input() pushKey: string;
    constructor(private fb: FirebaseService, private router: Router) { }
    getPushKeyHandler() {
        this.pushKey = this.fb.getPushRef('/user-parking').push().key;
    }
    saveMultipathEvent(multipath: any) {
        this.fb.saveMultipath(multipath).then(() => {
            this.router.navigate(['/dashboard']);

        }, (err) => { console.log("ERROR: ", err) })
    }
}