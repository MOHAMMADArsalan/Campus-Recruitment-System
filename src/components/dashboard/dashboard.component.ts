import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "dashboard-component",
    template: require("./dashboard.component.html"),
    styles: [require("./dashboard.component.scss"), require("./../../config/root.scss")]

})

export class DashboardComponent {
    @Input() companies: any;
    @Input() isLoading: boolean;
    @Input() students: any;
    @Input() currentUser: any;
    isCompany: boolean = true;

    @Output() deleteData: EventEmitter<any>;
    constructor() {
        this.deleteData = new EventEmitter();
    }
    checkLength(object) {
        return Object.keys(object).length === 0 ? true : false;
    }
    showData(tab: string) {
        this.isCompany = tab === 'students' ? false : true;
    }
    delete(event) {
        this.deleteData.emit(event);
    }
}