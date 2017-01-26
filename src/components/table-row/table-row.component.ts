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
    @Input() postslist: any[];

    @Input() type: string;
    @Output() deleteData: EventEmitter<any>;
    @Output() saveMultipath: EventEmitter<any>;
    constructor(private fb: FirebaseService) {
        this.deleteData = new EventEmitter();
        this.saveMultipath = new EventEmitter();

    }
    keys(object) {
        return object ? Object.keys(object) : [];
    }
    delete(key, id, type) {
        let multipath = {};
        multipath[`posts/${key}`] = null;
        multipath[`company-posts/${id}/${key}`] = null;
        this.deleteData.emit(multipath)
    }
    apply(key: string, companyId: string, count) {
        if (this.currentUser.status) {
            let multipath = {};
            let userObj = {};
            userObj['email'] = this.currentUser.email;
            userObj['name'] = this.currentUser.name;
            userObj['firstname'] = this.currentUser.firstname;
            userObj['lastname'] = this.currentUser.lastname;
            userObj['uid'] = this.currentUser.auth.uid;

            multipath[`posts/${key}/applied/${this.currentUser.auth.uid}`] = userObj;
            multipath[`company-posts/${companyId}/${key}/applied-count`] = count + 1;
            multipath[`company-posts/${companyId}/${key}/applied/${this.currentUser.auth.uid}`] = userObj
            multipath[`posts/${key}/applied-count`] = count + 1;

            this.saveMultipath.emit(multipath);
        }
    }
}
