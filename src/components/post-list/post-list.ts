import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "parking-list",
    template: require("./post-list.html"),
    styles: [require("./post-list.scss")]
})

export class PostListComponent {
    @Input() locations: any;
    @Input() currentUser: any;

    @Output() saveMultipathEvent: EventEmitter<any>;
    constructor() {
        this.saveMultipathEvent = new EventEmitter();
    }
    keys(obj: Object) {
        return obj ? Object.keys(obj) : [];
    }
    delete(locationId: string, slotNo: number, uuid: string, key: string) {
        let multipath = {};
        multipath[`user-parking/${uuid}/${key}`] = null;
        multipath[`parking-location/${locationId}/${slotNo}/booked-by`] = "";
        multipath[`parking-location/${locationId}/${slotNo}/end-time`] = "";
        multipath[`parking-location/${locationId}/${slotNo}/start-time`] = "";
        multipath[`parking-location/${locationId}/${slotNo}/status`] = 0;
        multipath[`parking-location/${locationId}/${slotNo}/key`] = "";
        
        this.saveMultipathEvent.emit(multipath)
    }
}