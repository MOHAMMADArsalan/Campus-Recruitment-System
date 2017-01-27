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
    @Input() postDetail: any[];
    @Output() deleteData: EventEmitter<any>;
    @Output() saveMultipath: EventEmitter<any>;
    constructor(private fb: FirebaseService) {
        this.deleteData = new EventEmitter();
        this.saveMultipath = new EventEmitter();

    }
    keys(object) {
        return object ? Object.keys(object) : [];
    }
    delete(key, location, slotId) {
        let slot = slotId.split(" ")[1];
        let multipath = {};
        multipath[`user-parking/${this.currentUser.auth.uid}/${key}`] = null;
        multipath[`parking-location/${location}/${slot}/booked-by`] = "";
        multipath[`parking-location/${location}/${slot}/end-time`] = "";
        multipath[`parking-location/${location}/${slot}/start-time`] = "";
        multipath[`parking-location/${location}/${slot}/status`] = 0;
        multipath[`parking-location/${location}/${slot}/key`] = "";
        
        console.log("delete",multipath)
        this.deleteData.emit(multipath)
    }
}
