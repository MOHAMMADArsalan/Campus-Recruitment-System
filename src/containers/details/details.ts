import { Component } from "@angular/core";
import { select, Observable, ParkingAction } from "./../../store";
import { ActivatedRoute } from "@angular/router";
import { FirebaseService } from "./../../providers"
@Component({
    selector: "post-details",
    template: require("./details.html")
})
export class DetailsContainer {
    @select(['auth', 'user']) user$: Observable<any>;
    @select(['parking', 'post-detail']) postDetail$: Observable<any>;

    constructor(private pa: ParkingAction, private fb: FirebaseService) {
        this.user$.subscribe((user) => {
            if (Object.keys(user).length) {
                this.pa.getParkingDetailByUser(user.uid)
                console.log("wwwwwwwwwwwwwwwwwwwwwwwwwww", user)
            }
        })
    }
    deleteDataHandler(multipath: any) {
        this.fb.saveMultipath(multipath).then(() => {
            console.log("Delete ")
        }, (err) => {
            console.log("ERRRRRRRRRRRRor", err)
        })
    }
}