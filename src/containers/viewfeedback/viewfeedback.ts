import { Component } from "@angular/core";
import { UserAction, select, Observable } from "./../../store";
import { FirebaseService } from "./../../providers/firebase";

@Component({
    template: require("./viewfeedback.html")
})

export class ViewFeedBackContainer {
    @select(['auth', 'user']) user$: Observable<any>;
    @select(['feedback', 'feedbacks']) feedbacks$: Observable<any>;
    constructor(private ua: UserAction, private fb: FirebaseService) {
        this.ua.getFeedbacks();
    }
    deleteFeedback(ev: any) {
        this.fb.saveMultipath(ev).then(() => {
            console.log("Save Multipath Data");
        }, (err) => {
            console.log("Error: ", err)
        })
    }
}