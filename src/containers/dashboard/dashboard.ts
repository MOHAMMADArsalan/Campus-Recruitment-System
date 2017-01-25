import { Component } from "@angular/core";
import { CompanyAction, select, Observable, StudentAction } from "./../../store";
import { FirebaseService } from "./../../providers/firebase";
@Component({
    selector: "dashboard",
    template: require("./dashboard.html"),
    styles: [require("./dashboard.scss")]

})

export class DashboardContainer {
    @select(['company', 'companies']) companies$: Observable<any>;
    @select(['student', 'students']) students$: Observable<any>;

    @select(['company', 'isLoading']) isLoading$: Observable<any>;

    constructor(private ca: CompanyAction, private se: StudentAction, private fb: FirebaseService) {
        this.ca.getCompany();
        this.se.getStudentsList()
    }
    deleteDataHandler(multipath: Object) {
        this.fb.saveMultipath(multipath).then(() => {
            console.log("delete Data")
        }, (err) => {
            console.log("Error: ", err)
        })
    }
}