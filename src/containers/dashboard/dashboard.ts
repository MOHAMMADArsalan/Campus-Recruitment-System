import { Component } from "@angular/core";
import { ParkingAction, select, Observable, UserAction } from "./../../store";
import { FirebaseService } from "./../../providers/firebase";
import { Router } from "@angular/router";
@Component({
    selector: "dashboard",
    template: require("./dashboard.html"),
    styles: [require("./dashboard.scss")]

})

export class DashboardContainer {
    @select(['parking', 'parkings']) parkings$: Observable<any>;
    @select(['parking', 'posts']) posts$: Observable<any>;
    @select(['getFeedbacks', 'feedbacks']) feedbacks$: Observable<any>;
    @select(['auth', 'user']) user$: Observable<any>;
    @select(['parking', 'isLoading']) isLoading$: Observable<any>;
    postKey: string = "";
    isPosted: boolean = false;
    constructor(private router: Router, private pa: ParkingAction, private ue: UserAction, private fb: FirebaseService) {
        this.user$.subscribe((user) => {
            if (Object.keys(user).length > 0) {
                this.pa.getParking();
            } else {
                this.router.navigate(['/signin'])
            }
        })
    }
    saveMultipath(multipath: Object) {
        this.fb.saveMultipath(multipath).then(() => {
            console.log("Save Multipath Data");
            this.isPosted = true;
        }, (err) => {
            console.log("Error: ", err)
        })
    }
    getPostPushKey(event) {
        this.postKey = this.fb.getPushRef("/posts").key;
    }
}