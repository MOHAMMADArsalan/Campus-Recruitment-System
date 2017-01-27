import { Component, Input, Output, EventEmitter } from "@angular/core";
import { select, Observable } from "./../../store/index";
declare var require: any;

@Component({
    selector: "data-table",
    template: require("./table.component.html"),
    styles: [require("../../config/root.scss")]
})

export class TableComponent {

    @select(['auth', 'user']) currentUser$: Observable<any>;
    @Input() data: any[];
    @Output() deleteData: EventEmitter<any>;
    @Output() saveMultipath: EventEmitter<any>;
    
    constructor() {
        this.deleteData = new EventEmitter();
        this.saveMultipath = new EventEmitter();
    }
    deleteDataHandler(event) {
        this.deleteData.emit(event)
    }
    saveMultipathHandler(event) { 
        this.saveMultipath.emit(event)
    }

}