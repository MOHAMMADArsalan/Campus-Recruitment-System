import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FirebaseService } from "./../../providers"
@Component({
    selector: "[table-row]",
    template: require("./table-row.component.html"),
    styles: [require("./table-row.component.scss")]
})

export class TableRowComponent {
    date: Date;
    @Input() currentUser: any;
    @Input() companylist: any[];
    @Input() studentslist: any[];
    @Input() isCompany: boolean;
    @Output() deleteData: EventEmitter<any>
    constructor(private fb: FirebaseService) {
        this.deleteData = new EventEmitter();
    }
    keys(object) {
        return object ? Object.keys(object) : [];
    }
    delete(key, isCompany) {
        let multipath = {};
        if (isCompany) {
            multipath[`companies/${key}`] = null;
        } else {
            multipath[`users/${key}`] = null;
        }
        this.deleteData.emit(multipath)
    }
}
